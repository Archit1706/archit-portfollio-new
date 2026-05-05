'use client';

import { use } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import { CustomCursor } from '@/components/cursor';
import { PROJECTS, PROJECT_BY_SLUG, Project } from '@/lib/projects-data';
import { IconSun, IconMoon } from '@/components/icons';
import {
  OSMMapWidget,
  ChatAgentWidget,
  CycleGraphWidget,
  PanoramaWidget,
  TonePitchWidget,
  URLScannerWidget,
  PoseWidget,
  AudioSentWidget,
  NetworkWidget,
  AuctionWidget,
  TerminalFallbackWidget,
} from '@/components/widgets/project-widgets';
import {
  AttireAIWidget,
  CouponVaultWidget,
  ReflectionsWidget,
  PowerUpWidget,
  EduSysWidget,
  FirstPaperWidget,
  OneFinderWidget,
  HomeGinieWidget,
  MoviescapeWidget,
  EmojiNationWidget,
  HealthyMeWidget,
  ProctorItWidget,
  WeatherTodayWidget,
  RandomQuoteWidget,
} from '@/components/widgets/cli-widgets';

type WidgetComponent = React.ComponentType<{ project: Project }>;

const WIDGET_MAP: Record<string, WidgetComponent> = {
  osmMap: OSMMapWidget as WidgetComponent,
  chatAgent: ChatAgentWidget as WidgetComponent,
  cycleGraph: CycleGraphWidget as WidgetComponent,
  panorama: PanoramaWidget as WidgetComponent,
  tonePitch: TonePitchWidget as WidgetComponent,
  urlScanner: URLScannerWidget as WidgetComponent,
  pose: PoseWidget as WidgetComponent,
  audioSent: AudioSentWidget as WidgetComponent,
  network: NetworkWidget as WidgetComponent,
  auction: AuctionWidget as WidgetComponent,
  attireAi: AttireAIWidget as WidgetComponent,
  couponVault: CouponVaultWidget as WidgetComponent,
  reflections: ReflectionsWidget as WidgetComponent,
  powerUp: PowerUpWidget as WidgetComponent,
  edusys: EduSysWidget as WidgetComponent,
  firstPaper: FirstPaperWidget as WidgetComponent,
  oneFinder: OneFinderWidget as WidgetComponent,
  homeGinie: HomeGinieWidget as WidgetComponent,
  moviescape: MoviescapeWidget as WidgetComponent,
  emojiNation: EmojiNationWidget as WidgetComponent,
  healthyMe: HealthyMeWidget as WidgetComponent,
  proctorIt: ProctorItWidget as WidgetComponent,
  weatherToday: WeatherTodayWidget as WidgetComponent,
  randomQuote: RandomQuoteWidget as WidgetComponent,
  terminal: TerminalFallbackWidget,
};

function SidebarBlock({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-[15px]">{value}</div>
    </div>
  );
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { theme, setTheme, customCursor, showGrid } = useTheme();

  const p = PROJECT_BY_SLUG[slug];
  const idx = PROJECTS.findIndex((x) => x.slug === slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  if (!p) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-[12px]" style={{ color: 'var(--text-muted)' }}>
        project not found ·{' '}
        <Link href="/projects" className="ml-2" style={{ color: 'var(--accent)' }}>
          back to index
        </Link>
      </div>
    );
  }

  const Widget = WIDGET_MAP[p.widget] ?? WIDGET_MAP.terminal;

  return (
    <>
      {customCursor && <CustomCursor />}
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
            href="/projects"
            className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em]"
            data-hover
          >
            <span style={{ color: 'var(--accent)' }}>←</span>
            <span style={{ color: 'var(--text-muted)' }}>archive</span>
            <span style={{ color: 'var(--text-faint)' }}>/</span>
            <span>{p.title.toLowerCase()}</span>
          </Link>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <Link href="/" className="px-3 py-1.5" style={{ color: 'var(--text-muted)' }} data-hover>
              home
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-3 py-1.5 rounded border smooth"
              style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
              data-hover
            >
              {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
            </button>
          </div>
        </nav>

        {/* Hero */}
        <header className="px-6 md:px-10 max-w-[1400px] mx-auto pt-16 pb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] mb-6" style={{ color: 'var(--accent)' }}>
            <span style={{ color: 'var(--text-muted)' }}>{String(idx + 1).padStart(2, '0')} / {PROJECTS.length}</span>
            &nbsp;·&nbsp;{p.category}
            {p.featured && <>&nbsp;·&nbsp;<span>featured</span></>}
          </div>
          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(40px, 7vw, 96px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
          >
            {p.title}
          </h1>
          <p
            className="mt-6 font-serif text-[24px] md:text-[28px] leading-snug max-w-[42ch]"
            style={{ color: 'var(--text-muted)' }}
          >
            {p.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="smooth px-4 py-2.5 rounded-md font-mono text-[11px] flex items-center gap-2 uppercase tracking-[0.12em]"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                data-hover
              >
                live ↗
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="smooth px-4 py-2.5 rounded-md font-mono text-[11px] flex items-center gap-2 uppercase tracking-[0.12em]"
                style={{ border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}
                data-hover
              >
                source ↗
              </a>
            )}
          </div>
        </header>

        {/* Interactive widget */}
        <section className="px-6 md:px-10 max-w-[1400px] mx-auto mb-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            interactive demo
          </div>
          <Widget project={p} />
        </section>

        {/* Body grid */}
        <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-20 grid md:grid-cols-12 gap-10">
          {/* About */}
          <div className="md:col-span-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--text-muted)' }}>about</div>
            <p className="font-serif text-[20px] leading-relaxed">{p.desc}</p>

            {p.features && (
              <div className="mt-12">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--text-muted)' }}>
                  what it does
                </div>
                <ul className="space-y-2">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex gap-3 text-[16px]" style={{ color: 'var(--text-primary)' }}>
                      <span className="font-mono text-[11px] mt-1" style={{ color: 'var(--accent)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-5 md:pl-6 md:border-l space-y-6" style={{ borderColor: 'var(--border)' }}>
            <SidebarBlock label="role" value={p.role} />
            <SidebarBlock label="timeline" value={p.timeline} />
            <SidebarBlock label="year" value={p.year} />

            {p.tech && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--text-muted)' }}>stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2 py-1 rounded"
                      style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {p.metrics && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--text-muted)' }}>numbers</div>
                <div className="space-y-2 font-mono text-[12px]">
                  {p.metrics.map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b py-1.5" style={{ borderColor: 'var(--border)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                      <span style={{ color: 'var(--accent)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </section>

        {/* Adjacent navigation */}
        <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-32">
          <div className="grid md:grid-cols-2 gap-4 border-t pt-8" style={{ borderColor: 'var(--border)' }}>
            <Link
              href={`/project/${prev.slug}`}
              className="group block p-6 rounded-xl smooth"
              style={{ border: '1px solid var(--border)' }}
              data-hover
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>← previous</div>
              <div className="font-serif text-2xl mt-2 smooth" style={{ color: 'var(--text-primary)' }}>{prev.title}</div>
              <div className="font-mono text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>{prev.subtitle}</div>
            </Link>
            <Link
              href={`/project/${next.slug}`}
              className="group block p-6 rounded-xl smooth text-right"
              style={{ border: '1px solid var(--border)' }}
              data-hover
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>next →</div>
              <div className="font-serif text-2xl mt-2 smooth" style={{ color: 'var(--text-primary)' }}>{next.title}</div>
              <div className="font-mono text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>{next.subtitle}</div>
            </Link>
          </div>
        </section>

        <footer className="px-6 md:px-10 py-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1400px] mx-auto flex flex-wrap gap-4 justify-between font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <span>archit rathod · 2025</span>
            <Link href="/projects" data-hover>view all projects ↗</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
