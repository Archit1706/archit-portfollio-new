# Archit Rathod — Portfolio

Personal portfolio and blog of Archit Rathod — MS Computer Science at UIC, software engineer and ML fairness researcher.

**Live:** [architr.vercel.app](https://architr.vercel.app)

## Stack

- **Framework:** Next.js 15 (App Router) · React 19
- **Styling:** Tailwind CSS v4 · CSS custom properties
- **Fonts:** Fraunces · Space Grotesk · JetBrains Mono
- **Blog:** Markdown files in `content/blogs/` processed by `remark`
- **Deployment:** Vercel

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # production build + type-check
npm run lint     # ESLint
```

## Structure

```
app/              # Next.js App Router pages
components/       # Shared UI components
content/blogs/    # Markdown blog posts
lib/              # Data sources and utilities
public/           # Static assets
```

See [`CLAUDE.md`](./CLAUDE.md) for full architecture documentation.
