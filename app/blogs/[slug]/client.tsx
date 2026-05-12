'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import { IconSun, IconMoon, IconCopy, IconCheck, IconArrowUpRight } from '@/components/icons';
import type { BlogPost, TocItem } from '@/lib/blog-utils';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px]" style={{ background: 'var(--border)' }}>
      <div
        className="h-full smooth"
        style={{ width: `${progress}%`, background: 'var(--accent)', transition: 'width 0.1s linear' }}
      />
    </div>
  );
}

function TableOfContents({ toc, activeId }: { toc: TocItem[]; activeId: string }) {
  const listRef = useRef<HTMLUListElement>(null);

  // Keep active item scrolled into view inside the TOC panel
  useEffect(() => {
    if (!listRef.current || !activeId) return;
    const activeEl = listRef.current.querySelector(`[data-id="${activeId}"]`) as HTMLElement | null;
    activeEl?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeId]);

  if (toc.length === 0) return null;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const navHeight = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <nav aria-label="Table of contents">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--text-muted)' }}>
        contents
      </div>
      <ul ref={listRef} className="space-y-0.5 max-h-[60vh] overflow-y-auto scrollbar-hide">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} data-id={item.id} style={{ paddingLeft: item.level === 1 ? 0 : item.level === 2 ? 12 : 24 }}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="block font-mono text-[11px] leading-snug py-1 smooth"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-faint)',
                  borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  paddingLeft: 10,
                  background: isActive ? 'var(--accent-soft)' : 'transparent',
                  borderRadius: '0 4px 4px 0',
                  fontWeight: isActive ? 500 : 400,
                }}
                data-hover
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function CopyCodeButtons({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blocks = container.querySelectorAll('pre');
    const cleanups: (() => void)[] = [];

    blocks.forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return;

      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:relative';
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.style.cssText = `
        position:absolute;top:10px;right:10px;
        font-family:var(--font-jetbrains-mono);font-size:10px;
        padding:4px 8px;border-radius:4px;
        background:var(--bg-elev);color:var(--text-muted);
        border:1px solid var(--border-strong);cursor:pointer;
        text-transform:uppercase;letter-spacing:0.1em;
        transition:color 0.2s,background 0.2s;
      `;
      btn.textContent = 'copy';

      const onClick = async () => {
        const code = pre.querySelector('code')?.textContent ?? '';
        try {
          await navigator.clipboard.writeText(code);
          btn.textContent = 'copied!';
          btn.style.color = 'var(--accent)';
          btn.style.borderColor = 'var(--accent)';
          setTimeout(() => {
            btn.textContent = 'copy';
            btn.style.color = 'var(--text-muted)';
            btn.style.borderColor = 'var(--border-strong)';
          }, 1800);
        } catch (_) {}
      };
      btn.addEventListener('click', onClick);
      wrapper.appendChild(btn);
      cleanups.push(() => btn.removeEventListener('click', onClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [containerRef]);

  return null;
}

export function BlogPostClient({
  post,
  toc,
  prev,
  next,
}: {
  post: BlogPost;
  toc: TocItem[];
  prev?: BlogPost;
  next?: BlogPost;
}) {
  const { theme, setTheme, showGrid } = useTheme();
  const [activeId, setActiveId] = useState('');
  const [copied, setCopied] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track active heading by scroll position — always has an active item,
  // works correctly for headings near the bottom that can never reach the top.
  useEffect(() => {
    if (!contentRef.current || toc.length === 0) return;

    const NAV_OFFSET = 96; // sticky nav height + breathing room

    const updateActive = () => {
      const headings = Array.from(
        contentRef.current!.querySelectorAll<HTMLElement>('h1[id],h2[id],h3[id]')
      );
      if (headings.length === 0) return;

      const scrollY = window.scrollY + NAV_OFFSET;
      let current = headings[0];
      for (const h of headings) {
        if (h.offsetTop <= scrollY) current = h;
      }
      setActiveId(current.id);
    };

    updateActive(); // set on mount
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, [toc]);

  const copyUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, []);

  return (
    <>
      <ReadingProgress />
      <CopyCodeButtons containerRef={contentRef} />

      {showGrid && (
        <div className="fixed inset-0 grid-paper pointer-events-none" style={{ opacity: 0.2, zIndex: 0 }} aria-hidden="true" />
      )}
      <div className="ambient-glow" aria-hidden="true" />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Nav */}
        <nav
          className="px-6 md:px-10 py-5 flex items-center justify-between sticky top-[2px] backdrop-blur-md"
          style={{
            background: 'color-mix(in oklab, var(--bg) 80%, transparent)',
            borderBottom: '1px solid var(--border)',
            zIndex: 50,
          }}
        >
          <Link
            href="/blogs"
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]"
            data-hover
          >
            <span style={{ color: 'var(--accent)' }}>←</span>
            <span style={{ color: 'var(--text-muted)' }}>field notes</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={copyUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-[10px] smooth"
              style={{
                background: copied ? 'var(--accent-soft)' : 'var(--bg-elev)',
                color: copied ? 'var(--accent)' : 'var(--text-muted)',
                border: '1px solid var(--border-strong)',
              }}
              aria-label="Copy link"
              data-hover
            >
              {copied ? <><IconCheck size={11} /> copied</> : <><IconCopy size={11} /> share</>}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-3 py-1.5 rounded border smooth"
              style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              data-hover
            >
              {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
            </button>
          </div>
        </nav>

        {/* Hero */}
        <header className="px-6 md:px-10 max-w-[1200px] mx-auto pt-14 pb-10">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {post.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <h1
            className="font-serif leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 60px)', maxWidth: '20ch', letterSpacing: '-0.02em' }}
          >
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <span>Archit Rathod</span>
            <span style={{ color: 'var(--text-faint)' }}>·</span>
            <span>{formatDate(post.date)}</span>
            <span style={{ color: 'var(--text-faint)' }}>·</span>
            <span>{post.readingTime} min read</span>
          </div>

          {/* Mobile TOC toggle */}
          {toc.length > 0 && (
            <button
              onClick={() => setTocOpen((o) => !o)}
              className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] px-4 py-2 rounded-lg smooth md:hidden"
              style={{
                background: 'var(--bg-elev)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-muted)',
              }}
              aria-expanded={tocOpen}
              data-hover
            >
              {tocOpen ? '↑ hide' : '↓ contents'} · {toc.length} sections
            </button>
          )}
          {tocOpen && (
            <div className="mt-4 p-4 rounded-xl md:hidden" style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}>
              <TableOfContents toc={toc} activeId={activeId} />
            </div>
          )}
        </header>

        {/* Rule */}
        <div className="px-6 md:px-10 max-w-[1200px] mx-auto">
          <hr style={{ borderColor: 'var(--border)' }} />
        </div>

        {/* Body: prose + sidebar */}
        <div className="px-6 md:px-10 max-w-[1200px] mx-auto py-12 md:grid md:grid-cols-12 md:gap-12">
          {/* Prose */}
          <div className="md:col-span-8">
            <div
              ref={contentRef}
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.content! }}
            />
          </div>

          {/* Sticky sidebar */}
          {toc.length > 0 && (
            <aside className="hidden md:block md:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div
                  className="p-5 rounded-xl"
                  style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}
                >
                  <TableOfContents toc={toc} activeId={activeId} />
                </div>

                <div
                  className="p-5 rounded-xl space-y-3"
                  style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>tags</div>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <Link key={t} href={`/blogs?tag=${encodeURIComponent(t)}`} className="tag smooth hover:opacity-70" data-hover>
                        {t}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <section className="px-6 md:px-10 max-w-[1200px] mx-auto pb-20">
            <div className="grid md:grid-cols-2 gap-4 border-t pt-8" style={{ borderColor: 'var(--border)' }}>
              {prev ? (
                <Link href={`/blogs/${prev.slug}`} className="group block p-6 rounded-xl smooth" style={{ border: '1px solid var(--border)' }} data-hover>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>← older</div>
                  <div className="font-serif text-lg mt-2 leading-snug smooth">{prev.title}</div>
                  <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--text-faint)' }}>{prev.readingTime} min</div>
                </Link>
              ) : <div />}
              {next && (
                <Link href={`/blogs/${next.slug}`} className="group block p-6 rounded-xl smooth text-right" style={{ border: '1px solid var(--border)' }} data-hover>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>newer →</div>
                  <div className="font-serif text-lg mt-2 leading-snug smooth">{next.title}</div>
                  <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--text-faint)' }}>{next.readingTime} min</div>
                </Link>
              )}
            </div>
          </section>
        )}

        <footer className="px-6 md:px-10 py-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1200px] mx-auto flex flex-wrap gap-4 justify-between font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <span>archit rathod · 2025</span>
            <Link href="/blogs" data-hover>← all posts</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
