'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import { RESEARCH, RESEARCH_BY_SLUG } from '@/lib/research-data';
import { IconSun, IconMoon, IconCopy, IconCheck, IconArrowUpRight } from '@/components/icons';

const STATUS_LABEL: Record<string, string> = {
  published: 'Published',
  preprint: 'Preprint',
  report: 'Technical Report',
};

const STATUS_COLOR: Record<string, string> = {
  published: 'var(--accent)',
  preprint: 'oklch(0.72 0.15 60)',
  report: 'var(--text-muted)',
};

export function ResearchDetailClient({ slug }: { slug: string }) {
  const { theme, setTheme, showGrid } = useTheme();
  const [copied, setCopied] = useState(false);

  const p = RESEARCH_BY_SLUG[slug];
  const idx = RESEARCH.findIndex((r) => r.slug === slug);
  const prev = RESEARCH[(idx - 1 + RESEARCH.length) % RESEARCH.length];
  const next = RESEARCH[(idx + 1) % RESEARCH.length];

  async function copyBibtex() {
    if (!p?.bibtex) return;
    try { await navigator.clipboard.writeText(p.bibtex); } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  if (!p) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-[12px]" style={{ color: 'var(--text-muted)' }}>
        paper not found ·{' '}
        <Link href="/#research" className="ml-2" style={{ color: 'var(--accent)' }}>
          back to research
        </Link>
      </div>
    );
  }

  return (
    <>
      {showGrid && (
        <div className="fixed inset-0 grid-paper pointer-events-none" style={{ opacity: 0.25, zIndex: 0 }} aria-hidden="true" />
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
            href="/#research"
            className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em]"
            data-hover
          >
            <span style={{ color: 'var(--accent)' }}>←</span>
            <span style={{ color: 'var(--text-muted)' }}>research</span>
            <span style={{ color: 'var(--text-faint)' }}>/</span>
            <span>{p.shortTitle.toLowerCase()}</span>
          </Link>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <Link href="/" className="px-3 py-1.5" style={{ color: 'var(--text-muted)' }} data-hover>home</Link>
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

        {/* Hero */}
        <header className="px-6 md:px-10 max-w-[1400px] mx-auto pt-16 pb-12">
          {/* Status + venue row */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] mb-6">
            <span
              className="px-2 py-0.5 rounded"
              style={{
                background: `color-mix(in oklab, ${STATUS_COLOR[p.status]} 12%, transparent)`,
                color: STATUS_COLOR[p.status],
                border: `1px solid color-mix(in oklab, ${STATUS_COLOR[p.status]} 30%, transparent)`,
              }}
            >
              {STATUS_LABEL[p.status]}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{p.venue}</span>
            <span style={{ color: 'var(--text-faint)' }}>·</span>
            <span style={{ color: 'var(--text-faint)' }}>{p.year}</span>
          </div>

          {/* Title */}
          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(28px, 4.5vw, 68px)', lineHeight: 1.05, letterSpacing: '-0.025em', maxWidth: '22ch' }}
          >
            {p.title}
          </h1>

          {/* Authors */}
          <div className="mt-8 flex flex-wrap gap-2">
            {p.authors.map((a) => (
              <span
                key={a}
                className="font-mono text-[11px] px-2.5 py-1 rounded"
                style={{
                  background: a === 'Archit Rathod' ? 'var(--accent-soft)' : 'var(--bg-elev)',
                  color: a === 'Archit Rathod' ? 'var(--accent)' : 'var(--text-muted)',
                  border: `1px solid ${a === 'Archit Rathod' ? 'color-mix(in oklab, var(--accent) 30%, transparent)' : 'var(--border)'}`,
                }}
              >
                {a}
              </span>
            ))}
          </div>

          {/* External links */}
          <div className="mt-6 flex flex-wrap gap-2">
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer"
                className="smooth px-4 py-2.5 rounded-md font-mono text-[11px] flex items-center gap-2 uppercase tracking-[0.12em]"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }} data-hover>
                paper <IconArrowUpRight size={12} />
              </a>
            )}
            {p.arxiv && (
              <a href={p.arxiv} target="_blank" rel="noreferrer"
                className="smooth px-4 py-2.5 rounded-md font-mono text-[11px] flex items-center gap-2 uppercase tracking-[0.12em]"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }} data-hover>
                arXiv <IconArrowUpRight size={12} />
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer"
                className="smooth px-4 py-2.5 rounded-md font-mono text-[11px] flex items-center gap-2 uppercase tracking-[0.12em]"
                style={{ border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} data-hover>
                code <IconArrowUpRight size={12} />
              </a>
            )}
          </div>
        </header>

        {/* Body */}
        <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-20 grid md:grid-cols-12 gap-10">
          {/* Abstract */}
          <div className="md:col-span-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--text-muted)' }}>abstract</div>
            <p className="font-serif text-[19px] leading-relaxed">{p.abstract}</p>

            {/* Keywords */}
            {p.keywords.length > 0 && (
              <div className="mt-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--text-muted)' }}>keywords</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.keywords.map((k) => (
                    <span key={k} className="tag">{k}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-5 md:pl-6 md:border-l space-y-6" style={{ borderColor: 'var(--border)' }}>
            {/* Metadata */}
            <div className="space-y-4">
              {[
                { label: 'status', value: STATUS_LABEL[p.status] },
                { label: 'venue', value: p.venue },
                { label: 'year', value: p.year },
                ...(p.publisher ? [{ label: 'publisher', value: p.publisher }] : []),
                ...(p.pages ? [{ label: 'pages', value: p.pages }] : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
                  <div className="text-[15px]">{value}</div>
                </div>
              ))}
            </div>

            {/* BibTeX */}
            {p.bibtex && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>cite</div>
                  <button
                    onClick={copyBibtex}
                    className="flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[10px] smooth"
                    style={{
                      background: copied ? 'var(--accent-soft)' : 'var(--bg-elev)',
                      color: copied ? 'var(--accent)' : 'var(--text-muted)',
                      border: '1px solid var(--border-strong)',
                    }}
                    aria-label="Copy BibTeX citation"
                    data-hover
                  >
                    {copied ? <><IconCheck size={11} /> copied</> : <><IconCopy size={11} /> bibtex</>}
                  </button>
                </div>
                <pre
                  className="rounded-lg p-3 text-[11px] leading-relaxed overflow-x-auto"
                  style={{
                    background: 'var(--bg-elev)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-jetbrains-mono)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {p.bibtex}
                </pre>
              </div>
            )}
          </aside>
        </section>

        {/* Adjacent navigation */}
        <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-32">
          <div className="grid md:grid-cols-2 gap-4 border-t pt-8" style={{ borderColor: 'var(--border)' }}>
            <Link href={`/research/${prev.slug}`} className="group block p-6 rounded-xl smooth"
              style={{ border: '1px solid var(--border)' }} data-hover>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>← previous</div>
              <div className="font-serif text-xl mt-2 smooth">{prev.shortTitle}</div>
              <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{prev.venueShort}</div>
            </Link>
            <Link href={`/research/${next.slug}`} className="group block p-6 rounded-xl smooth text-right"
              style={{ border: '1px solid var(--border)' }} data-hover>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>next →</div>
              <div className="font-serif text-xl mt-2 smooth">{next.shortTitle}</div>
              <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{next.venueShort}</div>
            </Link>
          </div>
        </section>

        <footer className="px-6 md:px-10 py-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1400px] mx-auto flex flex-wrap gap-4 justify-between font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <span>archit rathod · 2025</span>
            <Link href="/#research" data-hover>← all research</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
