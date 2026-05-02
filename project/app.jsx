const { useEffect: useE, useState: useS, useRef: useR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 152,
  "showGrid": true,
  "customCursor": true,
  "ambientGlow": true
}/*EDITMODE-END*/;

function applyAccent(hue) {
  document.documentElement.style.setProperty('--accent', `oklch(0.72 0.15 ${hue})`);
  document.documentElement.style.setProperty('--accent-soft', `oklch(0.72 0.15 ${hue} / 0.12)`);
}

function App() {
  const [theme, setTheme] = useS(() => {
    const s = localStorage.getItem('ar-theme');
    return s || 'dark';
  });
  const [tweaks, setTweaks] = (window.useTweaks || ((d) => {
    const [v, sv] = useS(d);
    return [v, (u) => sv((p) => ({ ...p, ...u }))];
  }))(TWEAK_DEFAULTS);

  // Theme toggle
  useE(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('ar-theme', theme);
  }, [theme]);

  // Accent hue live
  useE(() => {
    applyAccent(tweaks.accentHue);
  }, [tweaks.accentHue]);

  // Ambient glow tracks scroll
  useE(() => {
    if (!tweaks.ambientGlow) return;
    const el = document.querySelector('.ambient-glow');
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tweaks.ambientGlow]);

  // Reveal on scroll
  useE(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const {
    TweaksPanel, TweakSection, TweakSlider, TweakToggle,
  } = window;

  return (
    <>
      {/* SVG filter defs for organic blob */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="organic">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3">
              <animate attributeName="baseFrequency" dur="20s" values="0.02;0.04;0.02" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="18" />
          </filter>
        </defs>
      </svg>

      {tweaks.customCursor && <CustomCursor />}
      {tweaks.ambientGlow && <div className="ambient-glow" />}
      {tweaks.showGrid && <div className="fixed inset-0 grid-paper pointer-events-none" style={{ opacity: 0.4, zIndex: 0 }} />}

      <div className="relative" style={{ zIndex: 1 }}>
        <Nav theme={theme} setTheme={setTheme} />
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

      {TweaksPanel && (
        <TweaksPanel title="Tweaks" defaultOpen={false}>
          <TweakSection title="Theme">
            <TweakSlider
              label="Accent hue"
              min={0} max={360} step={1}
              value={tweaks.accentHue}
              onChange={(v) => setTweaks({ accentHue: v })}
            />
            <div className="flex gap-2 mt-2">
              {[{l: 'Emerald', h: 152}, {l: 'Indigo', h: 260}, {l: 'Amber', h: 60}, {l: 'Rose', h: 15}].map((p) => (
                <button
                  key={p.l}
                  className="flex-1 text-xs py-1.5 rounded border"
                  style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)', background: 'var(--bg-elev)' }}
                  onClick={() => setTweaks({ accentHue: p.h })}
                >
                  {p.l}
                </button>
              ))}
            </div>
          </TweakSection>
          <TweakSection title="Ambience">
            <TweakToggle
              label="Custom cursor"
              value={tweaks.customCursor}
              onChange={(v) => setTweaks({ customCursor: v })}
            />
            <TweakToggle
              label="Ambient glow"
              value={tweaks.ambientGlow}
              onChange={(v) => setTweaks({ ambientGlow: v })}
            />
            <TweakToggle
              label="Grid paper"
              value={tweaks.showGrid}
              onChange={(v) => setTweaks({ showGrid: v })}
            />
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
              >
                Dark
              </button>
              <button
                className="flex-1 text-xs py-2 rounded border"
                style={{
                  borderColor: theme === 'light' ? 'var(--accent)' : 'var(--border-strong)',
                  color: 'var(--text-primary)',
                  background: theme === 'light' ? 'var(--accent-soft)' : 'var(--bg-elev)',
                }}
                onClick={() => setTheme('light')}
              >
                Light
              </button>
            </div>
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
