'use client';

import { useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';
import { TweaksPanel, TweakSection, TweakSlider, TweakToggle } from '@/components/tweaks-panel';
import { Nav, Hero, Marquee, Work, Experience, Skills, Research, Contact } from '@/components/sections';

export default function Home() {
  const { theme, setTheme, showGrid, setShowGrid, ambientGlow, setAmbientGlow, customCursor, setCustomCursor, accentHue, setAccentHue } = useTheme();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!ambientGlow) return;
    const el = document.querySelector('.ambient-glow') as HTMLElement | null;
    if (!el) return;
    const onScroll = () => { el.style.transform = `translate3d(0, ${window.scrollY * -0.12}px, 0)`; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ambientGlow]);

  return (
    <>
      {ambientGlow && <div className="ambient-glow" aria-hidden="true" />}

      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="organic">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="18" />
          </filter>
        </defs>
      </svg>

      {showGrid && (
        <div className="fixed inset-0 grid-paper pointer-events-none" style={{ opacity: 0.4, zIndex: 0 }} aria-hidden="true" />
      )}

      <div className="relative" style={{ zIndex: 1 }}>
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <div className="reveal"><Work /></div>
          <div className="reveal"><Experience /></div>
          <div className="reveal"><Skills /></div>
          <div className="reveal"><Research /></div>
          <div className="reveal"><Contact /></div>
        </main>
      </div>

      <TweaksPanel title="Tweaks" defaultOpen={false}>
        <TweakSection title="Theme">
          <TweakSlider label="Accent hue" min={0} max={360} step={1} value={accentHue} onChange={setAccentHue} />
          <div className="flex gap-2 mt-2">
            {([['Emerald', 152], ['Indigo', 260], ['Amber', 60], ['Rose', 15]] as [string, number][]).map(([l, h]) => (
              <button
                key={l}
                className="flex-1 text-xs py-1.5 rounded border"
                style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)', background: 'var(--bg-elev)' }}
                onClick={() => setAccentHue(h)}
              >
                {l}
              </button>
            ))}
          </div>
        </TweakSection>
        <TweakSection title="Ambience">
          <TweakToggle label="Custom cursor" value={customCursor} onChange={setCustomCursor} />
          <TweakToggle label="Ambient glow" value={ambientGlow} onChange={setAmbientGlow} />
          <TweakToggle label="Grid paper" value={showGrid} onChange={setShowGrid} />
        </TweakSection>
        <TweakSection title="Mode">
          <div className="flex gap-2">
            <button
              className="flex-1 text-xs py-2 rounded border"
              style={{
                borderColor: theme === 'dark' ? 'var(--accent)' : 'var(--border-strong)',
                color: 'var(--text-primary)',
                background: theme === 'dark' ? 'var(--accent-soft)' : 'var(--bg-elev)',
              }}
              onClick={() => setTheme('dark')}
            >Dark</button>
            <button
              className="flex-1 text-xs py-2 rounded border"
              style={{
                borderColor: theme === 'light' ? 'var(--accent)' : 'var(--border-strong)',
                color: 'var(--text-primary)',
                background: theme === 'light' ? 'var(--accent-soft)' : 'var(--bg-elev)',
              }}
              onClick={() => setTheme('light')}
            >Light</button>
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}
