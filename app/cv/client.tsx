'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import {
  IconSun, IconMoon, IconMail, IconGithub, IconLinkedin,
  IconScholar, IconArrowUpRight,
} from '@/components/icons';
import type { ResearchPaper } from '@/lib/research-data';

/* ─── static data ─────────────────────────────────────────── */

const EXPERIENCES = [
  {
    when: 'Aug 2025 — Present',
    role: 'Research Assistant',
    org: 'Urban Transportation Center · UIC',
    bullets: [
      'Architected Python pipelines processing 8.5M+ OD pairs across 300 GB of freight data.',
      'Containerized routing engines via Docker across 2,926 zones.',
      'Built Next.js / FastAPI freight toolkit tracking crash metrics across 285+ municipalities.',
    ],
    stack: ['Python', 'Docker', 'Next.js', 'FastAPI', 'OSMnx'],
  },
  {
    when: 'May 2025 — Aug 2025',
    role: 'Software Engineer · GSoC',
    org: 'OpenStreetMap Foundation',
    bullets: [
      'Developed RESTful API (FastAPI + PostgreSQL/PostGIS) for real-time road closure management.',
      'Built React map interfaces with OpenLR linear-reference encoding.',
      'Automated CI/CD pipeline via GitHub Actions.',
    ],
    stack: ['FastAPI', 'PostgreSQL/PostGIS', 'React', 'Leaflet', 'OpenLR'],
  },
  {
    when: 'Feb 2025 — May 2025',
    role: 'Research Assistant',
    org: 'University of Illinois Chicago',
    bullets: [
      "Built geospatial analysis pipelines (OSMnx) mapping Chicago's full road network.",
      'Engineered graph-based cycle detection models to identify traffic congestion zones.',
    ],
    stack: ['OSMnx', 'NetworkX', 'GeoPandas', 'Shapely'],
  },
  {
    when: 'Mar 2023 — Jul 2024',
    role: 'Research & Web Engineer',
    org: 'SimPPL',
    bullets: [
      'Designed Next.js / FastAPI ethical-AI research platform.',
      'Scraped 2,300+ Stormfront threads into BigQuery for hate-speech analysis.',
      'Led data team analyzing 80M+ YouTube comments — cut analysis time by 30%.',
      'Built Neo4j graph visualizers with 20K+ nodes.',
    ],
    stack: ['Next.js', 'FastAPI', 'BigQuery', 'Neo4j', 'Python'],
  },
  {
    when: 'Dec 2023 — Jun 2024',
    role: 'Software Developer',
    org: 'DIRL · Boston University',
    bullets: [
      'Led 14 engineers building a gamified virtual-marketplace in React.',
      'Platform ran behavioral simulations with 2,000+ participants and autonomous LLM agents.',
    ],
    stack: ['React.js', 'LLM Agents', 'Behavioral Simulation'],
  },
];

const SKILLS = [
  { label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'Rust'] },
  { label: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Flask', 'PyTorch', 'TensorFlow'] },
  { label: 'Cloud / DevOps', items: ['GCP', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'] },
  { label: 'Databases', items: ['PostgreSQL', 'BigQuery', 'MongoDB', 'Neo4j', 'Redis'] },
];

const EDUCATION = [
  {
    degree: 'M.S. Computer Science',
    school: 'University of Illinois Chicago',
    period: 'Aug 2024 — May 2026',
    focus: 'NLP · Algorithmic Fairness · Responsible AI · Data Science',
    gpa: '',
  },
  {
    degree: 'B.E. Information Technology',
    school: 'TSEC · University of Mumbai',
    period: 'Feb 2021 — May 2024',
    focus: 'Machine Learning · Computer Networks · Data Mining',
    gpa: '9.26 / 10',
  },
];

const SELECTED_PROJECTS = [
  { name: 'FairLint-DL', desc: 'VS Code fairness debugger using PyTorch counterfactual search — cuts auditing time 40%.', tags: ['PyTorch', 'VS Code API', 'TypeScript'], href: '/project/fairlint-dl' },
  { name: 'Galaxy Morphology XAI', desc: 'Comparative study of post-hoc explainability across 4 CNN architectures on Rubin LSST datasets.', tags: ['Captum', 'Grad-CAM', 'PyTorch'], href: '/project/galaxy-morphology-xai' },
  { name: 'Keya AI', desc: 'Agentic real-estate assistant covering 1,000+ ZIP codes with LangChain + Azure OpenAI.', tags: ['LangChain', 'Azure OpenAI', 'Next.js'], href: '/project/keya-ai' },
  { name: 'OSM Road Closures', desc: 'RESTful API + React map interface for real-time road closure management (GSoC 2025).', tags: ['FastAPI', 'PostGIS', 'OpenLR'], href: '/project/osm-temporary-road-closures' },
];

/* ─── sub-components ─────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 mb-4"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <h2
        className="font-mono text-[10px] uppercase tracking-[0.22em] pb-2"
        style={{ color: 'var(--accent)' }}
      >
        {children}
      </h2>
    </div>
  );
}

/* ─── main component ─────────────────────────────────────── */

export function CVClient({
  research,
  publishedCount,
}: {
  research: ResearchPaper[];
  publishedCount: number;
}) {
  const { theme, setTheme } = useTheme();
  const [printing, setPrinting] = useState(false);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 80);
  };

  return (
    <>
      {/* ── Sticky nav bar ── */}
      <nav
        className="no-print sticky top-0 z-50 px-5 md:px-8 py-3 flex items-center justify-between backdrop-blur-md"
        style={{
          background: 'color-mix(in oklab, var(--bg) 85%, transparent)',
          borderBottom: '1px solid var(--border)',
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
          <span className="font-mono text-[11px] uppercase tracking-[0.18em]">cv</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            disabled={printing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-[10px] uppercase tracking-[0.12em] smooth"
            style={{
              background: 'var(--bg-elev)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-strong)',
              opacity: printing ? 0.5 : 1,
            }}
            data-hover
          >
            print / pdf
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

      {/* ── CV document ── */}
      <div
        id="cv-document"
        className="cv-root mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-12"
        style={{ maxWidth: 960 }}
      >

        {/* ══ HEADER ══════════════════════════════════════════ */}
        <header className="mb-8 pb-6" style={{ borderBottom: '2px solid var(--border-strong)' }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="font-serif tracking-tight"
                style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
              >
                Archit Rathod
              </h1>
              <p
                className="mt-1 font-mono text-[12px] md:text-[13px] uppercase tracking-[0.18em]"
                style={{ color: 'var(--accent)' }}
              >
                Software Engineer &amp; ML Fairness Researcher
              </p>
              <p
                className="mt-2 text-[13px] md:text-[14px] leading-relaxed max-w-[56ch]"
                style={{ color: 'var(--text-muted)' }}
              >
                MS Computer Science at University of Illinois Chicago. Building tools where scale and responsibility share the same codebase.
              </p>
            </div>

            {/* Contact block */}
            <div className="flex flex-col gap-1.5 font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
              <a
                href="mailto:architrathod77@gmail.com"
                className="flex items-center gap-2 smooth hover:opacity-70"
                style={{ color: 'var(--text-muted)' }}
                data-hover
              >
                <IconMail size={13} />
                architrathod77@gmail.com
              </a>
              <a
                href="https://github.com/Archit1706"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 smooth hover:opacity-70"
                style={{ color: 'var(--text-muted)' }}
                data-hover
              >
                <IconGithub size={13} />
                github.com/Archit1706
              </a>
              <a
                href="https://www.linkedin.com/in/archit-rathod/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 smooth hover:opacity-70"
                style={{ color: 'var(--text-muted)' }}
                data-hover
              >
                <IconLinkedin size={13} />
                linkedin.com/in/archit-rathod
              </a>
              <a
                href="https://scholar.google.com/citations?user=dgd_6_8AAAAJ&hl=en"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 smooth hover:opacity-70"
                style={{ color: 'var(--text-muted)' }}
                data-hover
              >
                <IconScholar size={13} />
                Google Scholar
              </a>
              <a
                href="https://architr.vercel.app"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 smooth hover:opacity-70"
                style={{ color: 'var(--text-muted)' }}
                data-hover
              >
                <IconArrowUpRight size={13} />
                architr.vercel.app
              </a>
            </div>
          </div>
        </header>

        {/* ══ TWO-COLUMN BODY ══════════════════════════════════ */}
        <div className="cv-body grid gap-8 md:gap-10" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,2.4fr)' }}>

          {/* ── LEFT SIDEBAR ─────────────────────────────────── */}
          <aside className="cv-sidebar space-y-8">

            {/* Education */}
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-5">
                {EDUCATION.map((e) => (
                  <div key={e.degree}>
                    <div
                      className="font-serif leading-snug"
                      style={{ fontSize: 'clamp(13px, 1.6vw, 15px)' }}
                    >
                      {e.degree}
                    </div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.12em] mt-1"
                      style={{ color: 'var(--accent)' }}
                    >
                      {e.school}
                    </div>
                    <div className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--text-faint)' }}>
                      {e.period}
                    </div>
                    <p className="text-[12px] mt-1.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {e.focus}
                    </p>
                    {e.gpa && (
                      <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
                        GPA {e.gpa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <SectionTitle>Skills</SectionTitle>
              <div className="space-y-4">
                {SKILLS.map((g) => (
                  <div key={g.label}>
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {g.label}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {g.items.map((t) => (
                        <span key={t} className="tag" style={{ fontSize: '10px', padding: '2px 6px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick stats */}
            <section>
              <SectionTitle>At a Glance</SectionTitle>
              <div className="space-y-2 font-mono text-[11px]">
                {[
                  ['Publications', `${publishedCount} peer-reviewed`],
                  ['Reports', `${research.length - publishedCount} technical`],
                  ['Projects', '24 shipped'],
                  ['GSoC', '2025 Contributor'],
                  ['Languages', '6 fluent'],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between py-1"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </section>

          </aside>

          {/* ── MAIN CONTENT ─────────────────────────────────── */}
          <main className="cv-main space-y-8">

            {/* Experience */}
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-6">
                {EXPERIENCES.map((e, i) => (
                  <div
                    key={i}
                    className="relative pl-4"
                    style={{ borderLeft: '2px solid var(--border)' }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 mb-1">
                      <h3
                        className="font-serif"
                        style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.2 }}
                      >
                        {e.role}
                      </h3>
                      <span className="font-mono text-[10px] shrink-0" style={{ color: 'var(--text-faint)' }}>
                        {e.when}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--accent)' }}>
                      {e.org}
                    </div>
                    <ul className="space-y-1 mb-2">
                      {e.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-[12px] leading-relaxed"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <span className="shrink-0" style={{ color: 'var(--border-strong)' }}>—</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1">
                      {e.stack.map((t) => (
                        <span key={t} className="tag" style={{ fontSize: '10px', padding: '1px 5px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Research */}
            <section>
              <SectionTitle>Research &amp; Publications</SectionTitle>
              <div className="space-y-4">
                {research.map((r) => (
                  <div
                    key={r.slug}
                    className="relative pl-4"
                    style={{ borderLeft: '2px solid var(--border)' }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-0.5 mb-0.5">
                      <p
                        className="font-serif leading-snug flex-1"
                        style={{ fontSize: 'clamp(12px, 1.5vw, 14px)' }}
                      >
                        {r.title}
                      </p>
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded shrink-0"
                        style={{
                          background: r.status === 'published' ? 'var(--accent)' : 'var(--bg-elev)',
                          color: r.status === 'published' ? 'var(--bg)' : 'var(--text-faint)',
                          border: r.status === 'published' ? 'none' : '1px solid var(--border)',
                        }}
                      >
                        {r.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      <span className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>
                        {r.venueShort} · {r.year}
                      </span>
                      <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>
                        {r.authors.join(', ')}
                      </span>
                    </div>
                    {(r.link || r.arxiv) && (
                      <a
                        href={r.link ?? r.arxiv}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[10px] mt-0.5 smooth hover:opacity-70"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <IconArrowUpRight size={10} /> view paper
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Selected Projects */}
            <section>
              <SectionTitle>Selected Projects</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-3">
                {SELECTED_PROJECTS.map((p) => (
                  <Link
                    key={p.name}
                    href={p.href}
                    className="block rounded-lg p-3 smooth hover:opacity-80"
                    style={{ border: '1px solid var(--border)', background: 'var(--bg-elev)' }}
                    data-hover
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="font-serif"
                        style={{ fontSize: 'clamp(12px, 1.4vw, 14px)' }}
                      >
                        {p.name}
                      </span>
                      <IconArrowUpRight size={11} />
                    </div>
                    <p className="text-[11px] leading-relaxed mb-2" style={{ color: 'var(--text-muted)' }}>
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <span key={t} className="tag" style={{ fontSize: '10px', padding: '1px 5px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-3">
                <Link
                  href="/projects"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] smooth hover:opacity-70"
                  style={{ color: 'var(--text-muted)' }}
                  data-hover
                >
                  view all 24 projects →
                </Link>
              </div>
            </section>

          </main>
        </div>

        {/* ── Footer note ── */}
        <footer
          className="no-print mt-10 pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px]"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-faint)' }}
        >
          <span>Last updated May 2026 · architr.vercel.app/cv</span>
          <Link href="/" style={{ color: 'var(--text-faint)' }} data-hover>← portfolio</Link>
        </footer>
      </div>

      {/* ── Print styles ── */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .cv-root {
            padding: 0.5cm 1cm !important;
            max-width: 100% !important;
          }
          .cv-body {
            grid-template-columns: minmax(0,1fr) minmax(0,2.4fr) !important;
          }
          body {
            background: white !important;
            color: #111 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        /* Responsive: stack sidebar below main on mobile */
        @media (max-width: 640px) {
          .cv-body {
            grid-template-columns: 1fr !important;
          }
          .cv-sidebar {
            order: 2;
          }
          .cv-main {
            order: 1;
          }
        }
      `}</style>
    </>
  );
}
