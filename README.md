# Archit Rathod — Portfolio

Personal portfolio and blog of Archit Rathod — MS Computer Science at UIC, software engineer and ML fairness researcher.

**Live:** [architr.vercel.app](https://architr.vercel.app)

## Stack

- **Framework:** Next.js 15 (App Router) · React 19
- **Styling:** Tailwind CSS v4 · CSS custom properties
- **Fonts:** Fraunces · Space Grotesk · JetBrains Mono
- **Blog:** Markdown files in `content/blogs/` processed by `remark`
- **Icons:** generated at request time via `next/og` (`app/icon.tsx`, `app/apple-icon.tsx`)
- **Deployment:** Vercel

## Routes

| Route | Purpose |
|---|---|
| `/` | Home — hero, work, experience, skills, research, contact |
| `/projects` | All projects (sourced from `lib/projects-data.ts`) |
| `/project/[slug]` | Project detail with per-project interactive widget |
| `/blogs`, `/blogs/[slug]` | Markdown blog from `content/blogs/` |
| `/research/[slug]` | Research papers (sourced from `lib/research-data.ts`) |
| `/agent-skills` | Browsable list of agent skills |
| `/cv` | Long-form CV |

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # production build + type-check
npm run lint     # ESLint
```

There are no tests; type errors surface at build time.

## Customization

- **Accent color & theme** — controlled in-app via the floating tweaks panel (theme, hue, grid, cursor, glow), persisted to `localStorage`
- **Site URL** — override default with `NEXT_PUBLIC_SITE_URL`; consumed by `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`

## Structure

```
app/              # Next.js App Router pages + favicons
components/       # Shared UI components and widgets
content/blogs/    # Markdown blog posts
lib/              # Data sources (projects, research, skills, seo) and utilities
public/           # Static assets
```

See [`CLAUDE.md`](./CLAUDE.md) for full architecture documentation — content sources, widget system, theme internals, and conventions for adding new projects/posts/papers.
