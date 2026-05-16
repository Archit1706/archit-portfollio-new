'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import { IconSun, IconMoon, IconArrowUpRight } from '@/components/icons';
import type { BlogPost } from '@/lib/blog-utils';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/* ─── Featured card ──────────────────────────────────────────────────── */
function FeaturedCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/blogs/${post.slug}`} data-hover className="block group">
      <article
        className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
        style={{
          border: '1px solid var(--accent)',
          background: 'var(--accent-soft)',
          boxShadow: hovered
            ? '0 0 0 1px var(--accent), 0 8px 60px -10px var(--accent), 0 0 80px -20px var(--accent)'
            : '0 0 0 1px var(--accent), 0 4px 30px -12px var(--accent-soft)',
          transition: 'box-shadow 0.45s var(--ease)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Shimmer sweep on hover */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            borderRadius: 'inherit',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(105deg, transparent 35%, color-mix(in oklab, var(--accent) 10%, transparent) 50%, transparent 65%)',
              transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
              transition: hovered ? 'transform 0.65s ease' : 'none',
            }}
          />
        </div>

        {/* Watermark number */}
        <span
          aria-hidden="true"
          className="absolute right-6 top-4 font-serif select-none pointer-events-none"
          style={{
            fontSize: '120px',
            lineHeight: 1,
            color: 'var(--accent)',
            fontWeight: 600,
            opacity: hovered ? 0.13 : 0.07,
            transform: hovered ? 'scale(1.06) translateY(-4px)' : 'scale(1) translateY(0)',
            transition: 'opacity 0.4s ease, transform 0.45s var(--ease)',
          }}
        >
          01
        </span>

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              latest
            </span>
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <h2
            className="font-serif leading-tight"
            style={{
              fontSize: 'clamp(24px, 3.5vw, 48px)',
              maxWidth: '22ch',
              opacity: hovered ? 0.82 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            {post.title}
          </h2>

          <p
            className="mt-4 text-[15px] leading-relaxed max-w-[60ch]"
            style={{ color: 'var(--text-muted)' }}
          >
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
              {formatDate(post.date)} · {post.readingTime} min read
            </div>
            <span
              className="flex items-center font-mono text-[11px] uppercase tracking-[0.12em]"
              style={{
                color: 'var(--accent)',
                gap: hovered ? '10px' : '6px',
                transition: 'gap 0.3s var(--ease)',
              }}
            >
              read <IconArrowUpRight size={12} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ─── Regular post card ──────────────────────────────────────────────── */
function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const num = String(index + 1).padStart(2, '0');
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/blogs/${post.slug}`} data-hover className="block group">
      <article
        className="relative py-6 overflow-hidden"
        style={{ borderTop: '1px solid var(--border)' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Animated left accent bar */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--accent)',
            transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transition: 'transform 0.35s var(--ease)',
          }}
        />

        {/* Hover background wash */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--accent-soft)',
            opacity: hovered ? 1 : 0,
            borderRadius: '8px',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Watermark number */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-2 font-serif select-none pointer-events-none"
          style={{
            fontSize: '56px',
            lineHeight: 1,
            color: 'var(--text-faint)',
            fontWeight: 600,
            opacity: hovered ? 0.15 : 0.07,
            transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'opacity 0.35s ease, transform 0.35s var(--ease)',
          }}
        >
          {num}
        </span>

        <div
          className="relative pl-0 md:pl-16"
          style={{
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'transform 0.35s var(--ease)',
          }}
        >
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {post.tags.slice(0, 4).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <h2
            className="font-serif leading-snug"
            style={{
              fontSize: 'clamp(18px, 2.2vw, 26px)',
              maxWidth: '52ch',
              color: hovered ? 'var(--accent)' : 'var(--text-primary)',
              transition: 'color 0.3s ease',
            }}
          >
            {post.title}
          </h2>

          <p
            className="mt-2 text-[14px] leading-relaxed max-w-[64ch]"
            style={{ color: 'var(--text-muted)' }}
          >
            {post.excerpt}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <div className="font-mono text-[11px]" style={{ color: 'var(--text-faint)' }}>
              {formatDate(post.date)} · {post.readingTime} min read
            </div>
            <span
              className="flex items-center font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{
                color: hovered ? 'var(--accent)' : 'var(--text-muted)',
                gap: hovered ? '8px' : '4px',
                transition: 'color 0.3s ease, gap 0.3s var(--ease)',
              }}
            >
              read <IconArrowUpRight size={10} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export function BlogsClient({ posts, tags }: { posts: BlogPost[]; tags: string[] }) {
  const { theme, setTheme, showGrid } = useTheme();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchTag = !activeTag || p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchTag && matchSearch;
    });
  }, [posts, activeTag, search]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  /* Staggered entrance helper */
  const reveal = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s var(--ease) ${delay}ms`,
  });

  const isFiltering = !!(search || activeTag);

  return (
    <>
      {showGrid && (
        <div className="fixed inset-0 grid-paper pointer-events-none" style={{ opacity: 0.2, zIndex: 0 }} aria-hidden="true" />
      )}
      <div className="ambient-glow" aria-hidden="true" />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* ── Nav ── */}
        <nav
          className="px-6 md:px-10 py-5 flex items-center justify-between sticky top-0 backdrop-blur-md"
          style={{
            background: 'color-mix(in oklab, var(--bg) 80%, transparent)',
            borderBottom: '1px solid var(--border)',
            zIndex: 50,
          }}
        >
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: 'var(--text-muted)' }}
              data-hover
            >
              <span style={{ color: 'var(--accent)' }}>←</span> home
            </Link>
            <span style={{ color: 'var(--text-faint)' }}>/</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">field notes</span>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-3 py-1.5 rounded border smooth"
            style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            data-hover
          >
            {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
          </button>
        </nav>

        {/* ── Header ── */}
        <header className="px-6 md:px-10 max-w-[1200px] mx-auto pt-16 pb-10">
          <div
            className="font-mono text-[11px] uppercase tracking-[0.22em] mb-4"
            style={{ color: 'var(--accent)', ...reveal(0) }}
          >
            // field notes
          </div>

          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(48px, 8vw, 110px)',
              lineHeight: 0.95,
              fontWeight: 400,
              letterSpacing: '-0.03em',
              ...reveal(80),
            }}
          >
            thoughts.
          </h1>

          <p
            className="mt-6 max-w-[52ch] text-[16px] leading-relaxed"
            style={{ color: 'var(--text-muted)', ...reveal(160) }}
          >
            On ML fairness, systems design, explainable AI, and the questions engineers skip.{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{posts.length} posts</span> and counting.
          </p>

          {/* Search */}
          <div className="mt-8 relative max-w-[420px]" style={reveal(240)}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search posts..."
              className="w-full font-mono text-[12px] px-4 py-2.5 rounded-lg"
              style={{
                background: 'var(--bg-elev)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              aria-label="Search blog posts"
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-strong)';
                e.target.style.boxShadow = 'none';
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] smooth"
                style={{ color: 'var(--text-faint)' }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tag filters */}
          <div
            className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
            style={reveal(320)}
          >
            <button
              onClick={() => setActiveTag(null)}
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full"
              style={{
                background: !activeTag ? 'var(--accent)' : 'var(--bg-elev)',
                color: !activeTag ? 'var(--bg)' : 'var(--text-muted)',
                border: `1px solid ${!activeTag ? 'var(--accent)' : 'var(--border-strong)'}`,
                transform: !activeTag ? 'scale(1.05)' : 'scale(1)',
                transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s var(--ease)',
              }}
              data-hover
            >
              all · {posts.length}
            </button>
            {tags.map((tag) => {
              const count = posts.filter((p) =>
                p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
              ).length;
              const isActive = activeTag?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(isActive ? null : tag)}
                  className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full"
                  style={{
                    background: isActive ? 'var(--accent)' : 'var(--bg-elev)',
                    color: isActive ? 'var(--bg)' : 'var(--text-muted)',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-strong)'}`,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s var(--ease)',
                  }}
                  data-hover
                >
                  {tag} · {count}
                </button>
              );
            })}
          </div>
        </header>

        {/* ── Posts ── */}
        <main className="px-6 md:px-10 max-w-[1200px] mx-auto pb-32">
          {filtered.length === 0 ? (
            <div className="py-24 text-center" style={reveal(0)}>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
                style={{ color: 'var(--text-faint)' }}
              >
                no results
              </div>
              <p className="font-serif" style={{ fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--text-primary)' }}>
                nothing matches &ldquo;{search || activeTag}&rdquo;
              </p>
              <button
                onClick={() => { setSearch(''); setActiveTag(null); }}
                className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] px-5 py-2 rounded-full smooth"
                style={{ border: '1px solid var(--border-strong)', color: 'var(--text-muted)' }}
                data-hover
              >
                clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Filter result count */}
              {isFiltering && (
                <div
                  className="mb-6 font-mono text-[11px]"
                  style={{ color: 'var(--text-faint)', ...reveal(0) }}
                >
                  {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                  {activeTag && (
                    <> for <span style={{ color: 'var(--accent)' }}>{activeTag}</span></>
                  )}
                  {search && (
                    <> matching <span style={{ color: 'var(--accent)' }}>&ldquo;{search}&rdquo;</span></>
                  )}
                </div>
              )}

              {/* Featured */}
              {featured && (
                <div className="mb-10" style={reveal(isFiltering ? 0 : 80)}>
                  <FeaturedCard post={featured} />
                </div>
              )}

              {/* Rest */}
              <div className="space-y-0">
                {rest.map((post, i) => (
                  <div key={post.slug} style={reveal(isFiltering ? 0 : Math.min(130 + i * 50, 480))}>
                    <PostCard post={post} index={i + 1} />
                  </div>
                ))}
              </div>

              {rest.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border)', marginTop: 0 }} />
              )}
            </>
          )}
        </main>

        {/* ── Footer ── */}
        <footer className="px-6 md:px-10 py-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <div
            className="max-w-[1200px] mx-auto flex flex-wrap gap-4 justify-between font-mono text-[11px]"
            style={{ color: 'var(--text-muted)' }}
          >
            <span>archit rathod · field notes</span>
            <Link href="/" data-hover style={{ color: 'var(--text-muted)' }}>
              ← portfolio
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
