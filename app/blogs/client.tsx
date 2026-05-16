'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import { IconSun, IconMoon, IconArrowUpRight } from '@/components/icons';
import type { BlogPost } from '@/lib/blog-utils';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function PostCard({ post, index, isFeatured }: { post: BlogPost; index: number; isFeatured: boolean }) {
  const num = String(index + 1).padStart(2, '0');

  if (isFeatured) {
    return (
      <Link href={`/blogs/${post.slug}`} data-hover className="block group">
        <article
          className="relative rounded-2xl p-8 md:p-10 smooth overflow-hidden"
          style={{
            border: '1px solid var(--accent)',
            background: 'var(--accent-soft)',
          }}
        >
          {/* Faint number watermark */}
          <span
            className="absolute right-6 top-4 font-serif select-none pointer-events-none"
            style={{ fontSize: '120px', lineHeight: 1, color: 'var(--accent)', opacity: 0.08, fontWeight: 600 }}
            aria-hidden="true"
          >
            {num}
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
              className="font-serif leading-tight smooth group-hover:opacity-80"
              style={{ fontSize: 'clamp(24px, 3.5vw, 48px)', maxWidth: '22ch' }}
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
                className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] smooth group-hover:gap-3"
                style={{ color: 'var(--accent)' }}
              >
                read <IconArrowUpRight size={12} />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blogs/${post.slug}`} data-hover className="block group">
      <article
        className="relative py-6 smooth"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {/* Faint number */}
        <span
          className="absolute left-0 top-2 font-serif select-none pointer-events-none smooth group-hover:opacity-20"
          style={{ fontSize: '56px', lineHeight: 1, color: 'var(--text-faint)', opacity: 0.1, fontWeight: 600 }}
          aria-hidden="true"
        >
          {num}
        </span>

        <div className="pl-0 md:pl-16">
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {post.tags.slice(0, 4).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <h2
            className="font-serif leading-snug smooth group-hover:opacity-70"
            style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', maxWidth: '52ch' }}
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
              className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] smooth group-hover:gap-2"
              style={{ color: 'var(--text-muted)' }}
            >
              read <IconArrowUpRight size={10} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function BlogsClient({ posts, tags }: { posts: BlogPost[]; tags: string[] }) {
  const { theme, setTheme, showGrid } = useTheme();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchTag = !activeTag || p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
      const q = search.toLowerCase();
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
      return matchTag && matchSearch;
    });
  }, [posts, activeTag, search]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      {showGrid && (
        <div className="fixed inset-0 grid-paper pointer-events-none" style={{ opacity: 0.2, zIndex: 0 }} aria-hidden="true" />
      )}
      <div className="ambient-glow" aria-hidden="true" />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Nav */}
        <nav
          className="px-6 md:px-10 py-5 flex items-center justify-between sticky top-0 backdrop-blur-md"
          style={{
            background: 'color-mix(in oklab, var(--bg) 80%, transparent)',
            borderBottom: '1px solid var(--border)',
            zIndex: 50,
          }}
        >
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }} data-hover>
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

        {/* Header */}
        <header className="px-6 md:px-10 max-w-[1200px] mx-auto pt-16 pb-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-4" style={{ color: 'var(--accent)' }}>
            // field notes
          </div>
          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.95, fontWeight: 400, letterSpacing: '-0.03em' }}
          >
            thoughts.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            On ML fairness, systems design, explainable AI, and the questions engineers skip. {posts.length} posts and counting.
          </p>

          {/* Search */}
          <div className="mt-8 relative max-w-[420px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search posts..."
              className="w-full font-mono text-[12px] px-4 py-2.5 rounded-lg smooth"
              style={{
                background: 'var(--bg-elev)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
              aria-label="Search blog posts"
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
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveTag(null)}
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full smooth"
              style={{
                background: !activeTag ? 'var(--accent)' : 'var(--bg-elev)',
                color: !activeTag ? 'var(--bg)' : 'var(--text-muted)',
                border: `1px solid ${!activeTag ? 'var(--accent)' : 'var(--border-strong)'}`,
              }}
              data-hover
            >
              all · {posts.length}
            </button>
            {tags.map((tag) => {
              const count = posts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())).length;
              const isActive = activeTag?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(isActive ? null : tag)}
                  className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full smooth"
                  style={{
                    background: isActive ? 'var(--accent)' : 'var(--bg-elev)',
                    color: isActive ? 'var(--bg)' : 'var(--text-muted)',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-strong)'}`,
                  }}
                  data-hover
                >
                  {tag} · {count}
                </button>
              );
            })}
          </div>
        </header>

        {/* Posts */}
        <main className="px-6 md:px-10 max-w-[1200px] mx-auto pb-32">
          {filtered.length === 0 ? (
            <div className="py-24 text-center font-mono text-[13px]" style={{ color: 'var(--text-faint)' }}>
              no posts match &ldquo;{search || activeTag}&rdquo;
            </div>
          ) : (
            <>
              {featured && (
                <div className="mb-10">
                  <PostCard post={featured} index={0} isFeatured />
                </div>
              )}

              <div className="space-y-0">
                {rest.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={i + 1} isFeatured={false} />
                ))}
              </div>

              {/* Last rule */}
              <div style={{ borderTop: '1px solid var(--border)', marginTop: 0 }} />
            </>
          )}
        </main>

        <footer className="px-6 md:px-10 py-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1200px] mx-auto flex flex-wrap gap-4 justify-between font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <span>archit rathod · field notes</span>
            <Link href="/" data-hover style={{ color: 'var(--text-muted)' }}>← portfolio</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
