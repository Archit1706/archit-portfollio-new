# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build + type-check
npm run lint     # ESLint via next lint
npm run start    # serve production build
```

There are no tests. Type errors surface only at build time (`npm run build`).

## Architecture

Next.js 15 App Router portfolio (React 19). All interactive components are Client Components (`'use client'`). No server actions, no API routes, no database.

### Routing

| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/projects` | `app/projects/page.tsx` |
| `/project/[slug]` | `app/project/[slug]/page.tsx` |
| `/blogs` | `app/blogs/page.tsx` |
| `/blogs/[slug]` | `app/blogs/[slug]/page.tsx` |
| `/research/[slug]` | `app/research/[slug]/page.tsx` |
| `/agent-skills` | `app/agent-skills/page.tsx` |
| `/cv` | `app/cv/page.tsx` |

Every dynamic route follows the same server/client split: the `page.tsx` is an async Server Component that fetches data and generates metadata; it renders a `*Client` component (sibling `client.tsx`) that owns all interactivity.

`app/layout.tsx` wraps everything in `ThemeProvider` and loads three fonts via `next/font/google`.

### Content sources

**Projects** — hardcoded array in `lib/projects-data.ts`. Exports `Project` interface, `PROJECTS` (31 entries), and `PROJECT_BY_SLUG` (derived map). To add/edit a project, edit only `PROJECTS`.

**Blog posts** — Markdown files in `content/blogs/*.md`. Processed at request time by `lib/blog-utils.ts` using `gray-matter` + `remark` + `remark-gfm` + `remark-html`. Required frontmatter fields:

```yaml
title: "..."
slug: kebab-case-slug
date: YYYY-MM-DD
tags: [Tag1, Tag2]
excerpt: "..."
readingTime: 10       # minutes, integer
featured: false
```

Key functions: `getAllPosts()` (list, sorted by date desc), `getPostBySlug(slug)` (full HTML), `extractToc(html)` (TOC items from h1–h3), `getAllTags()`.

Heading IDs are injected automatically by `getPostBySlug`: `## My Section` becomes `<h2 id="my-section">`. The slug lookup first tries filename, then scans frontmatter `slug` fields, so filename and `slug` frontmatter don't need to match.

**Research papers** — hardcoded array in `lib/research-data.ts`. Exports `ResearchPaper` interface, `RESEARCH`, `RESEARCH_BY_SLUG`, `PUBLISHED`, and `REPORTS`. To add a paper, append to `RESEARCH`; the derived exports update automatically.

**Agent skills** — hardcoded array in `lib/skills-data.ts`. Exports `AgentSkill` interface, `SKILLS`, `SKILL_CATEGORIES`, and `SKILLS_BY_ID`. Each entry includes the full `skillMd` string (copyable SKILL.md content). To add a skill, append to `SKILLS`.

### SEO / metadata

`lib/seo.ts` exports the single source of truth for site-wide constants:
- `SITE_URL` — falls back to `https://architr.vercel.app`; override with `NEXT_PUBLIC_SITE_URL` env var
- `AUTHOR` — name, handle, title, bio, all social links
- `DEFAULT_OG` — title, description, og-image URL
- `KEYWORDS` — site-wide keyword array

All `generateMetadata()` functions import from here. `app/sitemap.ts` and `app/robots.ts` also consume `SITE_URL`.

### Favicons

Two-part system:

1. **`app/icon.tsx` (64×64) + `app/apple-icon.tsx` (180×180)** — server-rendered "AR" monogram via `next/og`'s `ImageResponse`. Auto-wired by Next; no `<link>` tags. Used for first paint, social previews, bookmarks, and iOS home screens. Color is baked at request time as a static hex (`#3ecf8e` ≈ `oklch(0.72 0.15 152)`).

2. **`components/dynamic-favicon.tsx`** — mounted inside `ThemeProvider` in `app/layout.tsx`. After hydration it draws the "AR" mark on a canvas using the live `accentHue` + `theme` from context, exports a PNG data URL, and replaces every `<link rel="icon">` in the head. Re-runs whenever the tweaks panel changes hue or theme. This is what gives the visible tab icon its dynamic color.

Non-obvious constraints in Satori (the engine behind `ImageResponse`):
1. **No `oklch()` or CSS custom properties** — server icons must use a static hex.
2. **Fonts must be loaded as ArrayBuffer** — both server files fetch the Google Fonts CSS endpoint, regex out the woff URL, and fetch the binary. Hardcoded gstatic URLs break when Google rotates them.

In the dynamic client favicon, canvas `fillStyle` parses oklch unreliably across browsers, so the component resolves the color via a hidden DOM probe (`getComputedStyle(...).color`) before drawing.

### Theme system

`components/theme-provider.tsx` is a React context that owns: `theme` (dark/light), `accentHue` (0–360), `showGrid`, `customCursor`, `ambientGlow`. State is persisted to `localStorage` (keys `ar-theme`, `ar-accent-hue`). The provider writes to `document.documentElement` class and CSS custom properties directly — **do not** apply theme classes elsewhere.

Dark/light theming is done entirely with CSS custom properties in `app/globals.css` under `:root` (dark) and `html.light` (light). Tailwind `darkMode: 'class'` is configured but the design system relies on the CSS vars, not Tailwind dark variants.

Key CSS vars: `--bg`, `--bg-elev`, `--text-primary`, `--text-muted`, `--text-faint`, `--accent`, `--accent-soft`, `--border`, `--border-strong`, `--glass-bg`, `--ease`.

Accent color is always `oklch(0.72 0.15 <hue>)` — only the hue changes. Update via `setAccentHue()` from `useTheme()`.

### Widget system

Each project has a `widget` string key (e.g. `osmMap`, `freightToolkit`). The map from key → component lives in `WIDGET_MAP` inside `app/project/[slug]/client.tsx`, not the server `page.tsx`. Components are loaded via `next/dynamic` through three thin helpers in that file — `pw()` (project-widgets), `cw()` (cli-widgets), `fl()` (fairlint) — each of which lazy-imports its target file and surfaces a shared `WidgetLoading` skeleton.

Widget sources:
- `components/widgets/project-widgets.tsx` — 16 bespoke SVG/animated widgets (osmMap, chatAgent, cycleGraph, panorama, tonePitch, urlScanner, pose, audioSent, network, auction, galaxyXai, greenPipe, fairLend, relfair, lattice, freightToolkit) plus `TerminalFallbackWidget` used as the default
- `components/widgets/cli-widgets.tsx` — 14 terminal-style widgets sharing a `Term` wrapper and `useTypewriter` hook
- `components/fairlint.tsx` — `FairLintProjectWidget` (mounted via `fl('FairLintProjectWidget')` for the `fairlintDl` key)

Widget keys are camelCase strings and don't have to match the exported function name; the string passed to `pw()`/`cw()`/`fl()` is the function name to look up. All widgets accept `{ project: Project }` props.

**Adding a new project that needs a custom widget**: (1) append the entry to `PROJECTS` in `lib/projects-data.ts` with a unique `widget` key, (2) export a new component from one of the three widget files, (3) register the key in `WIDGET_MAP`. Forgetting step 3 silently falls back to `TerminalFallbackWidget`.

**Project count display**: most counts derive from `PROJECTS.length` automatically, but a few are hardcoded — the hero terminal line in `components/sections.tsx` (`TERMINAL_LINES`) and the CV's "At a Glance" stats + "view all N projects" link in `app/cv/client.tsx`. Update these when adding/removing projects.

### Cursor

`components/cursor.tsx` renders two DOM nodes (`.cursor-dot` and `.cursor-ring`). The ring spring-trails behind using `requestAnimationFrame` with lerp factor 0.12. Elements with `data-hover` attribute trigger a larger ring via `.hover` class. Hidden on mobile (`max-width: 900px`). Wrapped by `components/cursor-wrapper.tsx` which reads `customCursor` from context before rendering.

### Utility CSS classes (globals.css)

`.glass` — frosted glass card, `.smooth` — transition shorthand, `.tag` — pill badge, `.rule` — styled `<hr>`, `.grid-paper` — background dot grid, `.reveal` + `.in` — scroll-fade-in pattern, `.ambient-glow` — fixed radial gradient blob, `.noise` — SVG noise texture overlay.

Keyframe animations: `blink` (cursor caret), `pulse`, `marquee` (infinite scroll), `flag-pulse` (fairlint highlight).

### Home page sections (components/sections.tsx)

Exports: `Nav`, `Hero`, `Marquee`, `Work`, `Experience`, `Skills`, `Research`, `Contact`. All in one file, all client components sharing `useTheme()`. The `Hero` component uses `StreamText` (internal) for character-by-character text reveal.

### Other notable components

- `components/tweaks-panel.tsx` — floating panel for toggling theme, accent hue, grid, cursor, glow
- `components/fairlint.tsx` — animated code snippet showcase for the FairLint project
- `components/curiosity-spark.tsx` — sparkle/particle effect used on hover interactions
- `components/star-field.tsx` — animated star background canvas
- `components/page-transition.tsx` — route change animation wrapper
- `components/json-ld.tsx` — reusable JSON-LD script injector
- `components/icons.tsx` — SVG icon components

### Design prototype

`project/` contains the original HTML/JSX prototype from Claude Design — **reference only**, not imported by the app. The source of truth for visual design intent when making layout changes.
