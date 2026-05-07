'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import { PROJECTS, Project } from '@/lib/projects-data';
import { IconSun, IconMoon } from '@/components/icons';

const CATEGORIES = ['all', 'AI/ML', 'Full Stack', 'Web', 'Research', 'Urban Analytics'] as const;

function classify(p: Project): string {
  const c = p.category.toLowerCase();
  if (c.includes('ai') || c.includes('ml') || c.includes('nlp') || c.includes('cv') || c.includes('gen')) return 'AI/ML';
  if (c.includes('full')) return 'Full Stack';
  if (c.includes('urban')) return 'Urban Analytics';
  if (c.includes('research')) return 'Research';
  return 'Web';
}

function ProjectRow({ p, idx }: { p: Project; idx: number }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={`/project/${p.slug}`}
      className="group block py-5 border-b smooth relative"
      style={{ borderColor: 'var(--border)' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-hover
    >
      <div className="grid md:grid-cols-12 gap-4 items-baseline">
        <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-faint)' }}>
          {String(idx + 1).padStart(2, '0')}
        </div>
        <div className="md:col-span-5 flex items-baseline gap-3">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
            style={{ background: p.featured ? 'var(--accent)' : 'var(--border-strong)' }} />
          <h3
            className="font-serif text-[26px] tracking-tight smooth"
            style={{ color: hover ? 'var(--accent)' : 'var(--text-primary)' }}
          >
            {p.title}
          </h3>
        </div>
        <div className="md:col-span-4 text-[14px]" style={{ color: 'var(--text-muted)' }}>
          {p.subtitle}
        </div>
        <div
          className="md:col-span-2 font-mono text-[10px] uppercase tracking-[0.18em] flex justify-end items-baseline gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>{p.category.split('·')[0].trim()}</span>
          <span
            style={{
              color: 'var(--accent)',
              transform: hover ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.3s var(--ease)',
              display: 'inline-block',
            }}
          >→</span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  const { theme, setTheme, showGrid } = useTheme();
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const cat = classify(p);
      if (filter !== 'all' && cat !== filter) return false;
      if (query) {
        const q = query.toLowerCase();
        const blob = [p.title, p.subtitle, p.desc, ...(p.tech || [])].join(' ').toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [filter, query]);

  const grouped = useMemo(() => {
    const m: Record<string, Project[]> = {};
    filtered.forEach((p) => {
      m[p.year] = m[p.year] || [];
      m[p.year].push(p);
    });
    return Object.entries(m).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filtered]);

  return (
    <>
      {showGrid && (
        <div className="fixed inset-0 grid-paper pointer-events-none" style={{ opacity: 0.3, zIndex: 0 }} aria-hidden="true" />
      )}
      <div className="ambient-glow" aria-hidden="true" />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Nav */}
        <nav
          className="px-6 md:px-10 py-6 flex items-center justify-between sticky top-0 backdrop-blur-md"
          style={{
            background: 'color-mix(in oklab, var(--bg) 75%, transparent)',
            borderBottom: '1px solid var(--border)',
            zIndex: 50,
          }}
        >
          <Link
            href="/"
            className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em]"
            data-hover
          >
            <span style={{ color: 'var(--accent)' }}>←</span>
            <span style={{ color: 'var(--text-muted)' }}>archit rathod</span>
            <span style={{ color: 'var(--text-faint)' }}>/</span>
            <span>projects</span>
          </Link>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span style={{ color: 'var(--text-muted)' }}>{filtered.length} of {PROJECTS.length}</span>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-3 py-1.5 rounded border smooth"
              style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
              aria-label="Toggle light/dark theme"
              data-hover
            >
              {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
            </button>
          </div>
        </nav>

        {/* Header */}
        <header className="px-6 md:px-10 max-w-[1400px] mx-auto pt-20 pb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--accent)' }}>
            <span style={{ color: 'var(--text-muted)' }}>archive</span> /&nbsp; everything I&apos;ve built
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1, letterSpacing: '-0.025em' }}>
            <em style={{ fontStyle: 'italic' }}>{PROJECTS.length}</em> projects.
            <br />
            <span style={{ color: 'var(--text-muted)' }}>One <em className="font-serif" style={{ fontStyle: 'italic' }}>through-line</em>:</span>
          </h1>
          <p className="mt-6 font-serif text-[22px] leading-snug max-w-[42ch]" style={{ color: 'var(--text-muted)' }}>
            building tools where scale and responsibility have to live in the same codebase.
          </p>

          {/* Filter row */}
          <div className="mt-12 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.14em] smooth"
                style={{
                  background: filter === c ? 'var(--accent)' : 'var(--bg-elev)',
                  color: filter === c ? 'var(--bg)' : 'var(--text-muted)',
                  border: filter === c ? '1px solid var(--accent)' : '1px solid var(--border-strong)',
                }}
                data-hover
              >
                {c}
              </button>
            ))}
            <div className="flex-1" />
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'var(--bg-elev)', border: '1px solid var(--border-strong)' }}
            >
              <span style={{ color: 'var(--text-faint)' }}>⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="filter by title, tech…"
                className="bg-transparent outline-none font-mono text-[11px] w-48"
                style={{ color: 'var(--text-primary)' }}
                aria-label="Filter projects by title or technology"
              />
            </div>
          </div>
        </header>

        {/* Grouped project list */}
        <main className="px-6 md:px-10 max-w-[1400px] mx-auto pb-32">
          {grouped.map(([year, items]) => (
            <section key={year} className="mb-16">
              <div
                className="grid md:grid-cols-12 gap-6 mb-6 items-baseline border-b pb-3"
                style={{ borderColor: 'var(--border)' }}
              >
                <h2 className="md:col-span-2 font-serif text-3xl">{year}</h2>
                <div
                  className="md:col-span-10 font-mono text-[10px] uppercase tracking-[0.18em] flex justify-between"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span>{items.length} project{items.length === 1 ? '' : 's'}</span>
                  <span>shipped</span>
                </div>
              </div>
              <div className="space-y-1">
                {items.map((p, i) => <ProjectRow key={p.slug} p={p} idx={i} />)}
              </div>
            </section>
          ))}

          {!filtered.length && (
            <div className="py-32 text-center font-mono text-[12px]" style={{ color: 'var(--text-muted)' }}>
              no projects match those filters
            </div>
          )}
        </main>

        <footer className="px-6 md:px-10 py-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1400px] mx-auto flex flex-wrap gap-4 justify-between font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <span>archit rathod · 2025</span>
            <Link href="/" data-hover>← back to home</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
