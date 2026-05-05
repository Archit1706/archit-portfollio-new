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

Next.js 14 App Router portfolio. All interactive components are Client Components (`'use client'`). No server actions, no API routes, no database.

### Routing

| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/projects` | `app/projects/page.tsx` |
| `/project/[slug]` | `app/project/[slug]/page.tsx` |

`app/layout.tsx` wraps everything in `ThemeProvider` and loads the three fonts via `next/font/google`.

### Theme system

`components/theme-provider.tsx` is a React context that owns: `theme` (dark/light), `accentHue` (0–360), `showGrid`, `customCursor`, `ambientGlow`. State is persisted to `localStorage` (keys `ar-theme`, `ar-accent-hue`). The provider writes to `document.documentElement` class and CSS custom properties directly — **do not** apply theme classes elsewhere.

Dark/light theming is done entirely with CSS custom properties defined in `app/globals.css` under `:root` (dark) and `html.light` (light). Tailwind `darkMode: 'class'` is configured but the design system relies on the CSS vars, not Tailwind dark variants.

Key CSS vars: `--bg`, `--bg-elev`, `--text-primary`, `--text-muted`, `--text-faint`, `--accent`, `--accent-soft`, `--border`, `--border-strong`, `--glass-bg`, `--ease`.

Accent color is always `oklch(0.72 0.15 <hue>)` — only the hue changes. Update via `setAccentHue()` from `useTheme()`.

### Data

`lib/projects-data.ts` exports:
- `Project` interface
- `PROJECTS` — array of 24 projects, each with a `widget` key
- `PROJECT_BY_SLUG` — lookup map

To add or edit a project, edit only `PROJECTS`. `PROJECT_BY_SLUG` is derived automatically.

### Widget system

Each project has a `widget` string key. `app/project/[slug]/page.tsx` contains `WIDGET_MAP` that maps every key to a React component. Two widget files:

- `components/widgets/project-widgets.tsx` — 10 bespoke SVG/animated widgets (osmMap, chatAgent, cycleGraph, panorama, tonePitch, urlScanner, pose, audioSent, network, auction) plus `TerminalFallbackWidget`
- `components/widgets/cli-widgets.tsx` — 14 terminal-style widgets sharing a `Term` wrapper and `useTypewriter` hook

All widgets accept `{ project: Project }` props (even if they don't use them) to satisfy the `WidgetComponent` type in the detail page.

### Cursor

`components/cursor.tsx` renders two DOM nodes (`.cursor-dot` and `.cursor-ring`). The ring spring-trails behind using `requestAnimationFrame` with lerp factor 0.12. Elements with `data-hover` attribute trigger a larger ring via `.hover` class. Hidden on mobile (`max-width: 900px`).

### Utility CSS classes (globals.css)

`.glass` — frosted glass card, `.smooth` — transition shorthand, `.tag` — pill badge, `.rule` — styled `<hr>`, `.grid-paper` — background dot grid, `.reveal` + `.in` — scroll-fade-in pattern, `.ambient-glow` — fixed radial gradient blob, `.noise` — SVG noise texture overlay.

Keyframe animations: `blink` (cursor caret), `pulse`, `marquee` (infinite scroll), `flag-pulse` (fairlint highlight).

### Home page sections (components/sections.tsx)

Exports: `Nav`, `Hero`, `Marquee`, `Work`, `Experience`, `Skills`, `Research`, `Contact`. All in one file, all client components sharing `useTheme()`. The `Hero` component uses `StreamText` (internal) for character-by-character text reveal.

### Design prototype

`project/` contains the original HTML/JSX prototype from Claude Design — **reference only**, not imported by the app. The source of truth for visual design intent when making layout changes.
