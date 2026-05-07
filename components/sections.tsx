'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IconArrowRight, IconArrowUpRight, IconArrowDown, IconSun, IconMoon,
  IconMapPin, IconSparkles, IconGlobe, IconBook, IconCode, IconLayers,
  IconCloud, IconDatabase, IconMail, IconCopy, IconCheck,
  IconLinkedin, IconGithub, IconScholar, IconTerminal, IconTwitter,
} from './icons';
import { FairLintWidget } from './fairlint';
import { GalaxyXAIWidget } from './widgets/project-widgets';
import { useTheme } from './theme-provider';

/* =========================================================
   STREAMING HERO TEXT
   ========================================================= */
function StreamText({ text, speed = 48, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= text.length) { onDone?.(); return; }
    const t = setTimeout(() => setI(i + 1), speed);
    return () => clearTimeout(t);
  }, [i, text, speed, onDone]);
  return <>{text.slice(0, i)}<span className="stream-caret" /></>;
}

/* =========================================================
   NAV
   ========================================================= */
export function Nav() {
  const { theme, setTheme } = useTheme();
  const links = [
    ['work', 'Work'], ['experience', 'Experience'], ['skills', 'Skills'],
    ['research', 'Research'], ['contact', 'Contact'],
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" data-hover>
          <span className="w-7 h-7 rounded-md flex items-center justify-center font-mono text-[11px] smooth" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>AR</span>
          <span className="font-serif text-[15px]">Archit Rathod</span>
          <span className="font-mono text-[10px] hidden md:inline" style={{ color: 'var(--text-muted)' }}>/ portfolio · 2026</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em]">
          {links.map(([id, label], idx) => (
            <a key={id} href={`#${id}`} className="nav-link" data-hover style={{ color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--text-faint)' }}>0{idx + 1}</span>&nbsp;&nbsp;{label}
            </a>
          ))}
        </nav>
        <button
          className="smooth flex items-center gap-2 px-3 py-2 rounded-md font-mono text-[11px]"
          style={{ border: '1px solid var(--border-strong)' }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          data-hover
        >
          {theme === 'dark' ? <IconSun size={13} /> : <IconMoon size={13} />}
          <span className="hidden sm:inline">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   HERO
   ========================================================= */
export function Hero() {
  const [streamDone, setStreamDone] = useState(false);
  return (
    <section id="top" className="relative pt-36 pb-28 px-6 md:px-10 max-w-[1400px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-10 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
            available · spring 2026
          </span>
          <span className="hidden md:inline" style={{ color: 'var(--text-faint)' }}>—</span>
          <span className="hidden md:flex items-center gap-1.5"><IconMapPin size={11} /> chicago, il · 41.8781°N</span>
        </div>
        <div className="flex items-center gap-4">
          <span>m.s. computer science · uic</span>
          <span style={{ color: 'var(--text-faint)' }}>—</span>
          <span>aug 2024 · may 2026</span>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-8">
          <div className="font-mono text-[11px] mb-5" style={{ color: 'var(--accent)' }}>
            <span style={{ color: 'var(--text-muted)' }}>01 /</span>&nbsp; archit rathod
          </div>
          <h1 className="font-serif tracking-tight" style={{ fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 1.02, fontWeight: 400, letterSpacing: '-0.02em' }}>
            <StreamText text="Architecting cloud-native systems. Debugging algorithmic fairness." speed={32} onDone={() => setStreamDone(true)} />
          </h1>
          <p className="mt-8 max-w-[620px]" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--text-muted)', opacity: streamDone ? 1 : 0, transform: streamDone ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.8s var(--ease)' }}>
            Bridging scalable data engineering with transparent, responsible AI. Specializing in{' '}
            <span style={{ color: 'var(--text-primary)' }}>Python</span>,{' '}
            <span style={{ color: 'var(--text-primary)' }}>TypeScript</span>,{' '}
            <span style={{ color: 'var(--text-primary)' }}>React</span>, and{' '}
            <span style={{ color: 'var(--text-primary)' }}>PyTorch</span>.
          </p>
          <div className="mt-10 flex flex-wrap gap-3" style={{ opacity: streamDone ? 1 : 0, transition: 'opacity 0.8s var(--ease) 0.2s' }}>
            <Link href="/projects" className="smooth px-5 py-3 rounded-md font-mono text-[12px] flex items-center gap-2 uppercase tracking-[0.12em]" style={{ background: 'var(--accent)', color: 'var(--bg)' }} data-hover>
              explore interactive projects <IconArrowRight size={14} stroke={2} />
            </Link>
            <a href="#contact" className="glass smooth px-5 py-3 rounded-md font-mono text-[12px] flex items-center gap-2 uppercase tracking-[0.12em]" data-hover>
              get in touch <IconArrowUpRight size={14} stroke={2} />
            </a>
          </div>
        </div>

        <div className="md:col-span-4 space-y-4" style={{ opacity: streamDone ? 1 : 0, transform: streamDone ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.9s var(--ease) 0.4s' }}>
          <div className="glass rounded-2xl overflow-hidden relative noise">
            <div className="relative">
              <Image src="/assets/archit.jpg" alt="Archit Rathod" width={400} height={500} className="w-full aspect-[4/5] object-cover" style={{ filter: 'grayscale(0.1) contrast(1.05)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(13,13,20,0.85), transparent 40%)' }} />
              <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] uppercase tracking-[0.18em] flex justify-between" style={{ color: 'rgba(232,232,240,0.85)' }}>
                <span>AR · 001</span><span>35mm · natural</span>
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-4 space-y-2 font-mono text-[11px]">
            <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>focus</span><span>ML fairness · distributed systems</span></div>
            <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>stack</span><span>py · ts · pytorch · gcp</span></div>
            <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>shipping</span><span style={{ color: 'var(--accent)' }}>● real-time</span></div>
          </div>
        </div>
      </div>

      <div className="mt-20 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)', opacity: streamDone ? 1 : 0, transition: 'opacity 1s var(--ease) 0.8s' }}>
        <span className="w-8 h-px" style={{ background: 'var(--border-strong)' }} />
        scroll · selected work below
        <IconArrowDown size={12} />
      </div>
    </section>
  );
}

/* =========================================================
   MARQUEE
   ========================================================= */
export function Marquee() {
  const items = ['PyTorch', 'Next.js', 'FastAPI', 'PostgreSQL', 'Kubernetes', 'BigQuery', 'Neo4j', 'Terraform', 'GCP', 'Docker', 'TypeScript', 'OpenStreetMap', 'Causal Inference', 'Counterfactuals', 'GSoC · 2025'];
  return (
    <div className="py-6 border-y overflow-hidden relative" style={{ borderColor: 'var(--border)' }}>
      <div className="marquee font-mono text-[13px]" style={{ color: 'var(--text-muted)' }}>
        {[...items, ...items].map((x, i) => (
          <span key={i} className="flex items-center gap-8 shrink-0">{x}<span style={{ color: 'var(--text-faint)' }}>◆</span></span>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
   ========================================================= */
function SectionHeader({ idx, kicker, title, subtitle }: { idx: string; kicker: string; title: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-14 grid md:grid-cols-12 gap-6 items-end">
      <div className="md:col-span-7">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent)' }}>
          <span style={{ color: 'var(--text-muted)' }}>{idx} /</span>&nbsp; {kicker}
        </div>
        <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>{title}</h2>
      </div>
      {subtitle && <p className="md:col-span-5 text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
    </div>
  );
}

/* =========================================================
   WORK
   ========================================================= */
function StatRow({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b py-1.5" style={{ borderColor: 'var(--border)' }}>
      <span style={{ color: 'var(--text-muted)' }}>{k}</span>
      <span style={{ color: accent ? 'var(--accent)' : 'var(--text-primary)' }}>{v}</span>
    </div>
  );
}

function ProjectCard({ kicker, title, body, tags, stats, icon }: { kicker: string; title: string; body: string; tags: string[]; stats: [string, string][]; icon: ReactNode }) {
  return (
    <div className="glass rounded-2xl p-7 smooth relative overflow-hidden" data-hover>
      <div className="flex items-start justify-between mb-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>{kicker}</span>
        <span style={{ color: 'var(--text-muted)' }}>{icon}</span>
      </div>
      <h3 className="font-serif text-2xl tracking-tight mb-2">{title}</h3>
      <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{body}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">{tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
      <div className="grid grid-cols-3 gap-0 font-mono text-[11px]" style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
        {stats.map(([k, v]) => (
          <div key={k}>
            <div className="text-[9px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>{k}</div>
            <div className="mt-0.5" style={{ color: 'var(--accent)' }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="relative px-6 md:px-10 max-w-[1400px] mx-auto py-24">
      <SectionHeader idx="02" kicker="featured work" title={<>Tools that <em className="font-serif" style={{ fontStyle: 'italic' }}>prove</em> the thesis.</>} subtitle="Four projects at the intersection of scalable systems and responsible AI — a VS Code fairness debugger, a galaxy morphology explainability study, a real-estate platform serving 1,000+ ZIPs, and a year of published research." />

      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-5">
          <div className="sticky top-28">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--text-muted)' }}>
              <span className="px-2 py-0.5 rounded" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>open source</span>
              <span>· case study</span>
            </div>
            <h3 className="font-serif text-4xl leading-tight tracking-tight mb-4">FairLint-DL</h3>
            <p className="text-[15px] leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
              A deep-learning-based fairness debugger that ships as a VS Code extension. It wraps a custom PyTorch DNN around a two-phase gradient-ascent counterfactual search, cutting auditing time by <span style={{ color: 'var(--text-primary)' }}>40%</span> via real-time causal analysis.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {['PyTorch', 'VS Code API', 'TypeScript', 'Causal DAGs', 'Gradient Ascent', 'Counterfactuals'].map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="space-y-1 font-mono text-[11px]">
              <StatRow k="auditing time" v="−40%" accent />
              <StatRow k="fairness metrics" v="12 supported" />
              <StatRow k="counterfactual samples" v="2,048 / run" />
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <FairLintWidget />
          <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <IconSparkles size={11} /> interactive demo · click the audit button to run
          </div>
        </div>
      </div>

      <hr className="rule my-16" />

      {/* Galaxy Morphology XAI */}
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-7">
          <GalaxyXAIWidget />
          <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <IconSparkles size={11} /> interactive demo · select method + architecture, then run
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="sticky top-28">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--text-muted)' }}>
              <span className="px-2 py-0.5 rounded" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>research</span>
              <span>· explainability</span>
            </div>
            <h3 className="font-serif text-4xl leading-tight tracking-tight mb-4">Galaxy Morphology XAI</h3>
            <p className="text-[15px] leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
              A systematic evaluation of post-hoc explainability for astronomical AI — comparing Grad-CAM, LIME, Integrated Gradients, and GradientSHAP across four CNN architectures on Rubin LSST-scale galaxy surveys. No single method wins universally; the right choice depends on architecture, dataset, and the faithfulness criterion the scientist prioritizes.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {['PyTorch', 'Captum', 'Grad-CAM', 'LIME', 'GradientSHAP', 'Rubin LSST'].map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="space-y-1 font-mono text-[11px]">
              <StatRow k="best accuracy" v="96.1% (ResNet-18)" accent />
              <StatRow k="best deletion AUC" v="0.32 (Grad-CAM)" />
              <StatRow k="best insertion AUC" v="0.89 (GradientSHAP)" />
              <StatRow k="images evaluated" v="10,758" />
            </div>
          </div>
        </div>
      </div>

      <hr className="rule my-16" />

      <div className="grid md:grid-cols-2 gap-6">
        <ProjectCard
          kicker="full-stack"
          title="RealEstateAI"
          body="Full-stack platform covering 1,000+ ZIP codes. Next.js + FastAPI, integrated with Google Maps and Zillow APIs, with reverse geocoding and persistent stateful UI."
          tags={['Next.js', 'Tailwind', 'FastAPI', 'Google Maps', 'Zillow API']}
          stats={[['zip codes', '1,000+'], ['apis integrated', '4'], ['latency', '<120ms']]}
          icon={<IconGlobe size={18} />}
        />
        <ProjectCard
          kicker="research · multi"
          title="Research Publications"
          body="Three peer-reviewed venues. Ascend.ai at ICDSA 2024, Automated Disaster Image Classification at ICSISCET 2023, Multi-Agent Simulators for Social Networks at NeurIPS 2023 MASec."
          tags={['NeurIPS 2023', 'ICDSA 2024', 'ICSISCET 2023']}
          stats={[['venues', '3'], ['best accuracy', '95%'], ['co-authors', '12+']]}
          icon={<IconBook size={18} />}
        />
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/projects" className="smooth glass px-6 py-4 rounded-md font-mono text-[12px] flex items-center gap-3 uppercase tracking-[0.12em]" data-hover>
          view all 24 projects <IconArrowUpRight size={14} stroke={2} />
        </Link>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE
   ========================================================= */
const experiences = [
  {
    when: 'aug 2025 — present',
    role: 'Research Assistant',
    org: 'Urban Transportation Center · UIC',
    bullets: [
      'Architected Python pipelines processing 8.5M+ OD pairs (300GB+ data).',
      'Containerized routing engines via Docker across 2,926 zones.',
      'Engineered Next.js/FastAPI freight toolkit tracking crash metrics across 285+ municipalities.',
    ],
    stack: ['Python', 'Docker', 'Next.js', 'FastAPI', 'OSMnx'],
  },
  {
    when: 'may 2025 — aug 2025',
    role: 'Software Engineer · GSoC',
    org: 'OpenStreetMap Foundation',
    bullets: [
      'Developed RESTful API via FastAPI and PostgreSQL/PostGIS for real-time road closures.',
      'Built React map interfaces with OpenLR encoding.',
      'Automated CI/CD via GitHub Actions.',
    ],
    stack: ['FastAPI', 'PostgreSQL/PostGIS', 'React', 'Leaflet', 'OpenLR'],
  },
  {
    when: 'feb 2025 — may 2025',
    role: 'Research Assistant',
    org: 'UIC',
    bullets: [
      "Constructed geospatial analysis pipelines (OSMnx) to map Chicago's road network.",
      'Engineered graph-based cycle detection models to identify traffic congestion zones.',
    ],
    stack: ['OSMnx', 'NetworkX', 'GeoPandas', 'Shapely'],
  },
  {
    when: 'mar 2023 — jul 2024',
    role: 'Research & Web Engineer',
    org: 'SimPPL',
    bullets: [
      'Designed Next.js/FastAPI ethical-AI platform.',
      'Scraped 2,300+ Stormfront threads into BigQuery.',
      'Led data team analyzing 80M+ YouTube comments for misinformation — cut analysis time by 30%.',
      'Built Neo4j graph visualizers (20K+ nodes).',
    ],
    stack: ['Next.js', 'FastAPI', 'BigQuery', 'Neo4j', 'Python'],
  },
  {
    when: 'dec 2023 — jun 2024',
    role: 'Software Developer',
    org: 'DIRL · Boston University',
    bullets: [
      'Led 14 engineers building a gamified virtual marketplace via React.',
      'Platform ran behavioral simulations with 2,000+ participants and autonomous LLM agents.',
    ],
    stack: ['React.js', 'LLM Agents', 'Behavioral Sim'],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 md:px-10 max-w-[1400px] mx-auto py-24">
      <SectionHeader idx="03" kicker="experience" title={<>Five roles. <em style={{ fontStyle: 'italic' }}>One</em> throughline.</>} subtitle="Research labs, open-source foundations, and a simulation company — all asking the same question: how do we build systems that stay accountable at scale?" />

      <div className="relative">
        <div className="absolute left-[11px] md:left-[80px] top-2 bottom-2 w-px" style={{ background: 'linear-gradient(to bottom, transparent, var(--border-strong) 10%, var(--border-strong) 90%, transparent)' }} />
        {experiences.map((e, i) => (
          <div key={i} className="relative pl-10 md:pl-[130px] pb-14 last:pb-0">
            <div className="absolute left-0 md:left-[69px] top-1 w-[22px] h-[22px] rounded-full flex items-center justify-center" style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)' }}>
              <span className="w-2 h-2 rounded-full node-dot relative" style={{ background: 'var(--accent)' }} />
            </div>
            <div className="hidden md:block absolute left-0 top-1 font-mono text-[10px] uppercase tracking-[0.14em] w-[56px] text-right" style={{ color: 'var(--text-muted)' }}>
              {e.when.split(' ')[0]}·{e.when.split(' ')[1]}
            </div>
            <div className="glass rounded-xl p-6 smooth" data-hover>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="font-serif text-2xl tracking-tight">{e.role}</h3>
                <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>{e.when}</span>
              </div>
              <div className="font-mono text-[12px] mb-4" style={{ color: 'var(--accent)' }}>{e.org}</div>
              <ul className="space-y-2 mb-4">
                {e.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    <span className="shrink-0 mt-2 w-3 h-px" style={{ background: 'var(--border-strong)' }} />
                    <span style={{ color: 'var(--text-primary)' }}>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">{e.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   SKILLS
   ========================================================= */
const skillGroups = [
  { icon: <IconCode size={16} />, label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'Rust', 'HTML', 'CSS'] },
  { icon: <IconLayers size={16} />, label: 'Frameworks', items: ['React.js', 'Next.js', 'Node.js', 'FastAPI', 'Flask', 'PyTorch', 'TensorFlow'] },
  { icon: <IconCloud size={16} />, label: 'Cloud / DevOps', items: ['GCP', 'AWS (EC2, Lambda)', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'] },
  { icon: <IconDatabase size={16} />, label: 'Databases', items: ['PostgreSQL', 'BigQuery', 'MongoDB', 'Neo4j', 'Redis', 'MySQL'] },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 md:px-10 max-w-[1400px] mx-auto py-24">
      <SectionHeader idx="04" kicker="skills matrix" title={<>A working vocabulary.</>} subtitle="Dense, terminal-style listing — because engineering starts with the primitives you can actually reach for at 2am." />
      <div className="grid md:grid-cols-2 gap-4">
        {skillGroups.map((g, i) => (
          <div key={i} className="glass rounded-xl p-5 smooth" data-hover>
            <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2">
                <span style={{ color: 'var(--accent)' }}>{g.icon}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em]">{g.label}</span>
              </div>
              <span className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>{String(g.items.length).padStart(2, '0')} entries</span>
            </div>
            <div className="flex flex-wrap gap-1.5">{g.items.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 glass rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>education · m.s. computer science</div>
          <div className="font-serif text-xl mt-1">University of Illinois Chicago · Aug 2024 — May 2026</div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['NLP', 'Data Science', 'Algorithmic Fairness', 'Responsible AI'].map((c) => <span key={c} className="tag accent">{c}</span>)}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   RESEARCH
   ========================================================= */
const research = [
  { year: '2025', venue: 'Technical Report · UIC 2025', title: 'Galaxy Morphology Classification with Explainable AI', desc: 'Systematic evaluation of Grad-CAM, LIME, Integrated Gradients, and GradientSHAP across four CNNs on Galaxy10 DECaLS and Galaxy Zoo Evo. Quantitative faithfulness metrics reveal no universal winner — architecture, dataset, and criterion jointly determine the best explanation method.' },
  { year: '2024', venue: 'ICDSA 2024 · Springer', title: 'Ascend.ai', desc: 'Technical exploration of facial expression, tone, and pitch analysis with chatbot guidance for interview preparation.' },
  { year: '2024', venue: 'ICSISCET 2023 · Springer', title: 'Automated Disaster Image Classification', desc: 'Stacked CNN + XGBoost ensemble for earthquake / flood / wildfire / volcano imagery. 95% accuracy, F1 up to 0.96.' },
  { year: '2023', venue: 'NeurIPS 2023 · MASec', title: 'Multi-Agent Simulators for Social Networks', desc: 'Position paper reviewing multiagent security via agent-based models of social networks, bridging public/private platform gaps.' },
];

export function Research() {
  return (
    <section id="research" className="relative px-6 md:px-10 max-w-[1400px] mx-auto py-24">
      <SectionHeader idx="05" kicker="research publications" title={<>Written down, peer-reviewed, <em style={{ fontStyle: 'italic' }}>shipped</em>.</>} subtitle="Four papers across explainable AI for astronomy, responsible AI, disaster response, and social-network simulation." />
      <div className="space-y-0">
        {research.map((r, i) => (
          <a key={i} href="#" className="smooth group grid md:grid-cols-12 gap-6 items-baseline py-7 relative" style={{ borderTop: '1px solid var(--border)' }} data-hover>
            <div className="md:col-span-1 font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>{r.year}</div>
            <div className="md:col-span-4 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--accent)' }}>{r.venue}</div>
            <div className="md:col-span-6">
              <h3 className="font-serif text-2xl tracking-tight mb-2 smooth group-hover:translate-x-1">{r.title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{r.desc}</p>
            </div>
            <div className="md:col-span-1 flex md:justify-end"><IconArrowUpRight size={18} /></div>
          </a>
        ))}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
   ========================================================= */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'arath21@uic.edu';
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const links = [
    { icon: <IconLinkedin size={16} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/archit-rathod/' },
    { icon: <IconGithub size={16} />, label: 'GitHub', href: 'https://github.com/Archit1706' },
    { icon: <IconScholar size={16} />, label: 'Scholar', href: '#' },
    { icon: <IconTerminal size={16} />, label: 'LeetCode', href: 'https://leetcode.com/Archit176/' },
    { icon: <IconTwitter size={16} />, label: 'Twitter', href: 'https://twitter.com/ArchitRathod_17' },
  ];

  return (
    <section id="contact" className="relative px-6 md:px-10 max-w-[1400px] mx-auto py-28">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--accent)' }}>
            <span style={{ color: 'var(--text-muted)' }}>06 /</span>&nbsp; let&apos;s talk
          </div>
          <h2 className="font-serif" style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            Hire a builder who <em style={{ fontStyle: 'italic' }}>questions</em> the model.
          </h2>
          <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            I&apos;m actively interviewing for summer / full-time roles in AI infrastructure, fairness tooling, and applied ML. Let&apos;s find a problem worth debugging together.
          </p>
          <button onClick={copy} className="glass smooth mt-8 rounded-xl flex items-center gap-4 p-5 group w-full max-w-[520px]" data-hover>
            <IconMail size={20} />
            <div className="flex-1 text-left">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>email · one-click copy</div>
              <div className="font-serif text-2xl">{email}</div>
            </div>
            <span className="font-mono text-[11px] px-3 py-1.5 rounded-md flex items-center gap-1.5 smooth" style={{ background: copied ? 'var(--accent)' : 'var(--bg-elev)', color: copied ? 'var(--bg)' : 'var(--text-primary)', border: '1px solid ' + (copied ? 'var(--accent)' : 'var(--border-strong)') }}>
              {copied ? <IconCheck size={12} stroke={2} /> : <IconCopy size={12} stroke={2} />}
              {copied ? 'COPIED' : 'COPY'}
            </span>
          </button>
        </div>
        <div className="md:col-span-5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--text-muted)' }}>elsewhere</div>
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="glass smooth rounded-lg flex items-center justify-between p-4 group" data-hover>
              <div className="flex items-center gap-3"><span style={{ color: 'var(--accent)' }}>{l.icon}</span><span className="font-serif text-lg">{l.label}</span></div>
              <IconArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-24 pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
        <span>© 2026 Archit Rathod · Chicago, IL</span>
        <span>designed &amp; coded · no templates · serif: Fraunces</span>
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--accent)' }} /> status · shipping</span>
      </div>
    </section>
  );
}
