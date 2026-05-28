'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import { IconSun, IconMoon, IconCopy, IconCheck, IconTerminal } from '@/components/icons';
import type { AgentSkill } from '@/lib/skills-data';

const CATEGORY_LABEL: Record<string, string> = {
  design: 'Design',
  devops: 'DevOps',
  productivity: 'Productivity',
  research: 'Research',
};

const SOURCE_LABEL: Record<string, string> = {
  installed: 'installed',
  marketplace: 'marketplace',
};

function SkillCard({ skill }: { skill: AgentSkill }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(skill.skillMd);
    } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article
      className="glass rounded-2xl overflow-hidden smooth"
      style={{ border: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded"
              style={{
                background: skill.source === 'installed' ? 'var(--accent)' : 'var(--bg-elev)',
                color: skill.source === 'installed' ? 'var(--bg)' : 'var(--text-muted)',
                border: skill.source === 'installed' ? 'none' : '1px solid var(--border-strong)',
              }}
            >
              {SOURCE_LABEL[skill.source]}
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 rounded"
              style={{ background: 'var(--bg-elev)', color: 'var(--text-faint)', border: '1px solid var(--border)' }}
            >
              {CATEGORY_LABEL[skill.category]}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-[0.12em] smooth"
            style={{
              background: copied ? 'var(--accent-soft)' : 'var(--bg-elev)',
              color: copied ? 'var(--accent)' : 'var(--text-muted)',
              border: `1px solid ${copied ? 'var(--accent)' : 'var(--border-strong)'}`,
            }}
            aria-label={`Copy SKILL.md for ${skill.name}`}
            data-hover
          >
            {copied ? <><IconCheck size={11} /> copied</> : <><IconCopy size={11} /> copy</>}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span style={{ color: 'var(--accent)', flexShrink: 0, display: 'flex' }}><IconTerminal size={14} /></span>
          <h2 className="font-mono text-[13px] tracking-tight" style={{ color: 'var(--text-primary)' }}>
            /{skill.name}
          </h2>
        </div>

        <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {skill.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {skill.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Expandable SKILL.md preview */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <button
          onClick={() => setExpanded((o) => !o)}
          className="w-full flex items-center justify-between px-6 py-3 smooth hover:opacity-70"
          style={{ color: 'var(--text-faint)' }}
          aria-expanded={expanded}
          data-hover
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]">SKILL.md</span>
          <span className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>
            {expanded ? '↑ collapse' : '↓ preview'}
          </span>
        </button>

        {expanded && (
          <div
            className="relative"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <pre
              className="font-mono text-[11px] leading-relaxed p-5 overflow-x-auto scrollbar-hide"
              style={{
                background: 'var(--bg)',
                color: 'var(--text-muted)',
                maxHeight: '360px',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              <code>{skill.skillMd}</code>
            </pre>
            <div
              className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
            />
          </div>
        )}
      </div>
    </article>
  );
}

export function AgentSkillsClient({
  skills,
  categories,
}: {
  skills: AgentSkill[];
  categories: readonly { id: string; label: string }[];
}) {
  const { theme, setTheme, showGrid } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return skills;
    return skills.filter((s) => s.category === activeCategory);
  }, [skills, activeCategory]);

  const installedCount = skills.filter((s) => s.source === 'installed').length;

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
            <Link
              href="/#skills"
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: 'var(--text-muted)' }}
              data-hover
            >
              <span style={{ color: 'var(--accent)' }}>←</span> skills
            </Link>
            <span style={{ color: 'var(--text-faint)' }}>/</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">agent skills</span>
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
            // agent skills
          </div>
          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.95, fontWeight: 400, letterSpacing: '-0.03em' }}
          >
            skills.
          </h1>
          <p className="mt-6 max-w-[56ch] text-[16px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            My Claude Code skill collection — {skills.length} skills, {installedCount} installed.
            Each card includes the full <span className="font-mono text-[13px]" style={{ color: 'var(--text-primary)' }}>SKILL.md</span> so
            you can copy and drop it straight into your own setup.
          </p>

          {/* Install hint */}
          <div
            className="mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-[11px]"
            style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <span style={{ color: 'var(--accent)' }}>$</span>
            <span>Place SKILL.md in <code style={{ color: 'var(--text-primary)' }}>~/.claude/skills/&lt;name&gt;/SKILL.md</code></span>
          </div>

          {/* Category filters */}
          <div className="mt-6 flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory(null)}
              className="font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full smooth"
              style={{
                background: !activeCategory ? 'var(--accent)' : 'var(--bg-elev)',
                color: !activeCategory ? 'var(--bg)' : 'var(--text-muted)',
                border: `1px solid ${!activeCategory ? 'var(--accent)' : 'var(--border-strong)'}`,
              }}
              data-hover
            >
              all · {skills.length}
            </button>
            {categories.map((cat) => {
              const count = skills.filter((s) => s.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full smooth"
                  style={{
                    background: isActive ? 'var(--accent)' : 'var(--bg-elev)',
                    color: isActive ? 'var(--bg)' : 'var(--text-muted)',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-strong)'}`,
                  }}
                  data-hover
                >
                  {cat.label} · {count}
                </button>
              );
            })}
          </div>
        </header>

        {/* Skills grid */}
        <main className="px-6 md:px-10 max-w-[1200px] mx-auto pb-32">
          {filtered.length === 0 ? (
            <div className="py-24 text-center font-mono text-[13px]" style={{ color: 'var(--text-faint)' }}>
              no skills in this category
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {filtered.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="px-6 md:px-10 py-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1200px] mx-auto flex flex-wrap gap-4 justify-between font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <span>archit rathod · agent skills</span>
            <Link href="/" data-hover style={{ color: 'var(--text-muted)' }}>← portfolio</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
