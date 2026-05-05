'use client';

import { useState, useEffect, ReactNode } from 'react';

/* ---------- Shared chrome + helpers ---------- */
function Term({ title, children, height = 360 }: { title: string; children: ReactNode; height?: number }) {
  return (
    <div className="rounded-2xl overflow-hidden font-mono text-[12px]" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg)' }}>
      <div className="px-4 py-2 flex items-center gap-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'oklch(0.7 0.2 25)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'oklch(0.8 0.15 80)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'oklch(0.7 0.18 145)' }} />
        <span className="ml-3 text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>{title}</span>
      </div>
      <div className="p-5 overflow-hidden" style={{ minHeight: height }}>{children}</div>
    </div>
  );
}

interface LineItem { t: string; s: React.CSSProperties; inline?: string; pause?: number }

function useTypewriter(items: LineItem[], speed = 80): [number, () => void] {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= items.length) return;
    const delay = speed + (items[step]?.pause || 0);
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step, items, speed]);
  return [step, () => setStep(0)];
}

function Caret({ on = true }: { on?: boolean }) {
  return on ? <span className="inline-block w-2 h-3 align-middle ml-0.5" style={{ background: 'var(--accent)', animation: 'blink 1s steps(2) infinite' }} /> : null;
}

const C = {
  prompt: { color: 'var(--accent)' } as React.CSSProperties,
  user: { color: 'var(--text-primary)' } as React.CSSProperties,
  comment: { color: 'var(--text-faint)' } as React.CSSProperties,
  out: { color: 'var(--text-muted)' } as React.CSSProperties,
  ok: { color: 'oklch(0.75 0.18 145)' } as React.CSSProperties,
  warn: { color: 'oklch(0.8 0.15 80)' } as React.CSSProperties,
  err: { color: 'oklch(0.7 0.2 25)' } as React.CSSProperties,
};

/* =========================================================
   ATTIRE AI
   ========================================================= */
export function AttireAIWidget() {
  const lines: LineItem[] = [
    { t: '$ attire-ai chat', s: C.prompt },
    { t: 'attire ›', s: { color: 'var(--accent)' }, inline: 'how would you describe your style?' },
    { t: 'user  › minimal, off-white, smart-casual, weekend coffee', s: C.user, pause: 200 },
    { t: 'attire › routing → langchain · llama-3 8b · tools=[search,trends]', s: C.comment },
    { t: '         analyzing 28 saved items + 3 social signals…', s: C.out },
    { t: '         ✓ 24 candidates → ranking by fit-score', s: C.ok },
    { t: '', s: {} },
    { t: 'curated outfit · cohesion 0.92', s: { color: 'var(--accent)' }, pause: 200 },
  ];
  const [step] = useTypewriter(lines, 360);
  const showOutfit = step >= lines.length - 1;
  return (
    <Term title="attire-ai · style chat">
      {lines.slice(0, step).map((l, i) => <div key={i} style={l.s}>{l.t}{l.inline && <span style={{ color: 'var(--text-primary)' }}>  {l.inline}</span>}</div>)}
      {step < lines.length && <Caret />}
      {showOutfit && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[{ label: 'jacket', tone: 'oklch(0.5 0.04 60)', sub: 'oversized linen' }, { label: 'tee', tone: 'oklch(0.92 0.02 80)', sub: 'cream pima' }, { label: 'trouser', tone: 'oklch(0.45 0.04 250)', sub: 'pleated wool' }, { label: 'shoe', tone: 'oklch(0.85 0.06 75)', sub: 'leather sneaker' }].map((it) => (
            <div key={it.label} className="rounded-md overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div className="aspect-square" style={{ background: it.tone }} />
              <div className="p-2 text-[10px]"><div style={{ color: 'var(--text-primary)' }}>{it.label}</div><div style={{ color: 'var(--text-muted)' }}>{it.sub}</div></div>
            </div>
          ))}
        </div>
      )}
    </Term>
  );
}

/* =========================================================
   COUPON VAULT
   ========================================================= */
export function CouponVaultWidget() {
  const lines: LineItem[] = [
    { t: '$ vault generate --type=dynamic --campaign=summer25', s: C.prompt },
    { t: 'building rule tree ▸ category=ALL ▸ min-cart=$40 ▸ max-uses=1/user', s: C.out },
    { t: 'minting 5 codes…', s: C.out, pause: 300 },
    { t: '', s: {} },
    { t: '┌──────────────┬──────┬──────────┬──────────┐', s: C.comment },
    { t: '│ code         │ disc │ expires  │ scope    │', s: C.comment },
    { t: '├──────────────┼──────┼──────────┼──────────┤', s: C.comment },
    { t: '│ SUM4F-K9XQ2  │ 25%  │ 30 days  │ apparel  │', s: C.user },
    { t: '│ SUM4F-7M3LN  │ 25%  │ 30 days  │ apparel  │', s: C.user },
    { t: '│ SUM4F-WPQ1A  │ 25%  │ 30 days  │ apparel  │', s: C.user },
    { t: '│ SUM4F-2HDY8  │ 25%  │ 30 days  │ apparel  │', s: C.user },
    { t: '│ SUM4F-RV6BC  │ 25%  │ 30 days  │ apparel  │', s: C.user },
    { t: '└──────────────┴──────┴──────────┴──────────┘', s: C.comment },
    { t: '✓ persisted to mongo · indexed on (code, scope)', s: C.ok },
    { t: '$ vault stats --campaign=summer25', s: C.prompt, pause: 200 },
    { t: 'redemptions 318 / 500  ·  revenue $24,180  ·  attach-rate 0.62', s: { color: 'var(--accent)' } },
  ];
  const [step] = useTypewriter(lines, 200);
  return (
    <Term title="coupon-vault · repl">
      {lines.slice(0, step).map((l, i) => <div key={i} style={l.s}>{l.t || ' '}</div>)}
      {step < lines.length && <Caret />}
    </Term>
  );
}

/* =========================================================
   REFLECTIONS
   ========================================================= */
export function ReflectionsWidget() {
  const draftWords = 'When the model writes the first paragraph for you, the cursor finally feels honest about where you actually paused.'.split(' ');
  const [n, setN] = useState(0);
  useEffect(() => { if (n >= draftWords.length) return; const t = setTimeout(() => setN(n + 1), 90); return () => clearTimeout(t); }, [n, draftWords.length]);
  return (
    <Term title="reflections · editor" height={300}>
      <div style={C.prompt}>$ reflections draft &quot;Why I stopped reading my own drafts&quot;</div>
      <div style={C.comment}>// embedding tone vector · pulling 3 similar passages from your archive</div>
      <div className="mt-4 p-4 rounded" style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}>
        <div className="text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>autocomplete · openai · tone=archit</div>
        <div className="font-serif text-[18px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          {draftWords.slice(0, n).join(' ')}<Caret />
        </div>
      </div>
      <div className="mt-3 flex gap-3 text-[10px] uppercase tracking-[0.18em]" style={C.out}>
        <span>↵ accept</span><span>tab → reject</span><span style={{ color: 'var(--accent)' }}>{n} / {draftWords.length} tokens</span>
      </div>
    </Term>
  );
}

/* =========================================================
   POWER UP
   ========================================================= */
export function PowerUpWidget() {
  const [t, setT] = useState(0);
  useEffect(() => { const i = setInterval(() => setT((v) => v + 1), 220); return () => clearInterval(i); }, []);
  const hr = 72 + Math.round(Math.sin(t * 0.2) * 6);
  const steps = 6840 + t * 7;
  const cal = 1840 + Math.round(t * 1.4);
  return (
    <Term title="powerup · wear-os sync" height={320}>
      <div style={C.prompt}>$ powerup sync --device=pixel-watch-2</div>
      <div style={C.comment}>// pulling samples from google fit · last sync 12m ago</div>
      <div style={C.ok}>✓ synced 1,427 samples</div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[{ k: 'heart', v: hr, u: 'bpm', sym: '♥' }, { k: 'steps', v: steps.toLocaleString(), u: '/ 10,000', sym: '⌁' }, { k: 'kcal', v: cal, u: 'kcal', sym: '⚡' }].map((m) => (
          <div key={m.k} className="rounded p-3" style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}>
            <div className="text-[10px] uppercase tracking-[0.18em]" style={C.out}>{m.k} {m.sym}</div>
            <div className="text-2xl mt-1" style={{ color: 'var(--accent)', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>{m.v}</div>
            <div className="text-[10px]" style={C.out}>{m.u}</div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 200 30" className="w-full mt-4" style={{ height: 50 }}>
        <polyline points={Array.from({ length: 60 }).map((_, i) => `${i * 3.4},${15 - Math.sin((t + i) * 0.3) * 9 - Math.sin((t + i) * 0.13) * 4}`).join(' ')} fill="none" stroke="var(--accent)" strokeWidth="1" />
      </svg>
      <div style={{ ...C.prompt, marginTop: 8 }}>$ powerup chat &quot;what should I eat tonight?&quot;</div>
      <div style={C.user}>→ 540 kcal left · suggested · grilled salmon + quinoa + greens</div>
    </Term>
  );
}

/* =========================================================
   EDUSYS
   ========================================================= */
export function EduSysWidget() {
  const lines: LineItem[] = [
    { t: '$ edusys map --course=CS307', s: C.prompt },
    { t: 'loading rubric · CS307 · operating systems · 12 lectures', s: C.out },
    { t: 'mapping CO → PO → PSO matrix…', s: C.out, pause: 200 },
  ];
  const [step] = useTypewriter(lines, 280);
  const matrix = [
    ['CO1', 1, 2, 3, 0, 0, 1],
    ['CO2', 0, 3, 3, 2, 1, 0],
    ['CO3', 2, 0, 1, 3, 3, 2],
    ['CO4', 1, 2, 2, 1, 3, 3],
  ];
  return (
    <Term title="edusys · obe mapper" height={320}>
      {lines.slice(0, step).map((l, i) => <div key={i} style={l.s}>{l.t}</div>)}
      {step >= lines.length && (
        <div className="mt-3">
          <div className="grid grid-cols-7 gap-1 text-[11px]">
            <div style={C.out}></div>
            {['PO1', 'PO2', 'PO3', 'PSO1', 'PSO2', 'PSO3'].map((p) => <div key={p} style={C.out} className="text-center">{p}</div>)}
            {matrix.map((row) => (
              <React.Fragment key={String(row[0])}>
                <div style={{ color: 'var(--accent)' }}>{row[0]}</div>
                {(row.slice(1) as number[]).map((v, j) => (
                  <div key={j} className="text-center rounded" style={{ background: v === 0 ? 'transparent' : `oklch(0.${30 + v * 10} 0.${5 + v * 4} 152 / ${0.2 + v * 0.25})`, color: v === 0 ? 'var(--text-faint)' : 'var(--text-primary)', padding: '6px 0' }}>{v || '·'}</div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-3 text-[10px] uppercase tracking-[0.18em]" style={C.out}>scale: 0 (none) → 3 (strong) · auto-derived from rubric</div>
          <div className="mt-2" style={C.ok}>✓ matrix saved · ready for accreditation export</div>
        </div>
      )}
      {step < lines.length && <Caret />}
    </Term>
  );
}

import React from 'react';

/* =========================================================
   FIRST PAPER
   ========================================================= */
export function FirstPaperWidget() {
  const lines: LineItem[] = [
    { t: '$ firstpaper "ml fairness in tabular models" --year=>2022', s: C.prompt },
    { t: 'embedding query · 1536d · arxiv vector index', s: C.out },
    { t: 'retrieving 12 candidates · re-ranking by recency × novelty', s: C.out, pause: 250 },
    { t: '', s: {} },
  ];
  const [step] = useTypewriter(lines, 260);
  const papers = [
    { id: '2401.04135', t: 'Counterfactual Sampling for Fair Tabular Networks', a: 'Liu, Mehta · 2024', s: 0.93 },
    { id: '2308.11923', t: 'Group-DRO with Causal Constraints', a: 'Singh et al. · 2023', s: 0.88 },
    { id: '2306.02141', t: 'Calibrated Fairness via Gradient Reversal', a: 'Park, Wang · 2023', s: 0.81 },
    { id: '2302.07650', t: 'A Survey on Tabular Fairness Auditing', a: 'García · 2023', s: 0.74 },
  ];
  return (
    <Term title="first-paper · arxiv recommender">
      {lines.slice(0, step).map((l, i) => <div key={i} style={l.s}>{l.t || ' '}</div>)}
      {step >= lines.length && (
        <div className="space-y-2">
          {papers.map((p) => (
            <div key={p.id} className="grid grid-cols-12 gap-2 py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="col-span-2" style={C.comment}>{p.id}</div>
              <div className="col-span-7" style={C.user}>{p.t}</div>
              <div className="col-span-2" style={C.out}>{p.a}</div>
              <div className="col-span-1 text-right" style={{ color: 'var(--accent)' }}>{p.s.toFixed(2)}</div>
            </div>
          ))}
          <div className="mt-2 text-[10px] uppercase tracking-[0.18em]" style={C.out}>4 of 24 → continue with -n 24</div>
        </div>
      )}
      {step < lines.length && <Caret />}
    </Term>
  );
}

/* =========================================================
   THE ONE FINDER
   ========================================================= */
export function OneFinderWidget() {
  const [t, setT] = useState(0);
  useEffect(() => { const i = setInterval(() => setT((v) => v + 1), 700); return () => clearInterval(i); }, []);
  const candidates = [
    { name: 'maya · 27', score: 0.91, traits: ['outdoorsy', 'reads scifi', 'ENFP'] },
    { name: 'dev · 29', score: 0.84, traits: ['kotlin dev', 'climbs', 'INTJ'] },
    { name: 'nora · 26', score: 0.79, traits: ['art history', 'baking', 'INFJ'] },
  ];
  const cur = candidates[t % candidates.length];
  return (
    <Term title="one-finder · match engine" height={340}>
      <div style={C.prompt}>$ onefinder rank --tonight</div>
      <div style={C.comment}>// scoring 1,204 active profiles · sentiment analysis on bios · k=3</div>
      <div className="mt-3 rounded p-3 smooth" style={{ background: 'var(--bg-elev)', border: '1px solid var(--accent)' }} key={cur.name}>
        <div className="flex items-center justify-between">
          <div style={{ color: 'var(--accent)' }}>{cur.name}</div>
          <div style={C.out}>profile-score <span style={{ color: 'var(--accent)' }}>{cur.score.toFixed(2)}</span></div>
        </div>
        <div className="mt-2 flex gap-1.5 flex-wrap">
          {cur.traits.map((tr) => <span key={tr} className="text-[10px] px-2 py-0.5 rounded" style={{ background: 'var(--bg)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{tr}</span>)}
        </div>
      </div>
      <div className="mt-4" style={C.prompt}>$ onefinder chat --to={cur.name.split(' ')[0]} --e2e</div>
      <div style={C.comment}>// ratchet established · curve25519 · perfect forward secrecy</div>
      <div className="mt-2 space-y-1.5">
        <div><span style={C.out}>them →</span> <span style={C.user}>encoded: 9f3d…7b21</span> <span style={C.comment}>// hey, museum on saturday?</span></div>
        <div><span style={{ color: 'var(--accent)' }}>you  →</span> <span style={C.user}>encoded: 4a17…c89e</span> <span style={C.comment}>// counter: art institute, 2pm</span></div>
      </div>
    </Term>
  );
}

/* =========================================================
   HOME GINIE
   ========================================================= */
export function HomeGinieWidget() {
  const [income, setIncome] = useState(78000);
  const [age, setAge] = useState(7);
  const [rooms, setRooms] = useState(6);
  const price = Math.round((income * 3.4 - age * 4200 + rooms * 18000 + 42000) / 1000) * 1000;
  return (
    <Term title="home-ginie · regression" height={340}>
      <div style={C.prompt}>$ ginie predict --interactive</div>
      <div style={C.comment}>// model · LinearRegression · trained on 14k usa metro listings · R² 0.81</div>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[12px]">
        {[
          { l: 'avg income', v: income, set: setIncome, min: 30000, max: 200000, step: 1000, fmt: (v: number) => `$${v.toLocaleString()}` },
          { l: 'house age', v: age, set: setAge, min: 0, max: 60, step: 1, fmt: (v: number) => `${v} y` },
          { l: 'rooms', v: rooms, set: setRooms, min: 1, max: 12, step: 1, fmt: (v: number) => `${v}` },
        ].map((f) => (
          <div key={f.l}>
            <div className="flex justify-between"><span style={C.out}>{f.l}</span><span style={{ color: 'var(--accent)' }}>{f.fmt(f.v)}</span></div>
            <input type="range" min={f.min} max={f.max} step={f.step} value={f.v} onChange={(e) => f.set(Number(e.target.value))} className="w-full mt-1" style={{ accentColor: 'var(--accent)' }} />
          </div>
        ))}
      </div>
      <div className="mt-5 rounded p-4 flex items-baseline justify-between" style={{ background: 'var(--bg-elev)', border: '1px solid var(--accent)' }}>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em]" style={C.out}>predicted price</div>
          <div className="font-serif" style={{ color: 'var(--accent)', fontSize: 38, lineHeight: 1 }}>${price.toLocaleString()}</div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em]" style={C.out}>±$28k @ 95% ci</div>
      </div>
    </Term>
  );
}

/* =========================================================
   MOVIESCAPE
   ========================================================= */
export function MoviescapeWidget() {
  const movies = [
    { t: 'Past Lives', y: 2023, r: 7.9, g: 'Drama' },
    { t: 'Anatomy of a Fall', y: 2023, r: 7.7, g: 'Mystery' },
    { t: 'The Holdovers', y: 2023, r: 7.9, g: 'Drama' },
    { t: 'Killers of the Flower Moon', y: 2023, r: 7.6, g: 'Crime' },
    { t: 'Perfect Days', y: 2023, r: 7.9, g: 'Drama' },
  ];
  const [n, setN] = useState(0);
  useEffect(() => { if (n >= movies.length) return; const t = setTimeout(() => setN(n + 1), 320); return () => clearTimeout(t); }, [n, movies.length]);
  return (
    <Term title="moviescape · tmdb stream" height={340}>
      <div style={C.prompt}>$ moviescape search --query=&quot;quiet drama&quot; --year=2023</div>
      <div style={C.comment}>// GET https://api.themoviedb.org/3/search/movie?... 200 OK (412ms)</div>
      <div className="mt-3">
        <div className="grid grid-cols-12 gap-2 text-[10px] uppercase tracking-[0.18em] pb-1 border-b" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          <div className="col-span-6">title</div><div className="col-span-2">year</div><div className="col-span-2">genre</div><div className="col-span-2 text-right">rating</div>
        </div>
        {movies.slice(0, n).map((m, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="col-span-6" style={C.user}>{m.t}</div>
            <div className="col-span-2" style={C.out}>{m.y}</div>
            <div className="col-span-2" style={C.out}>{m.g}</div>
            <div className="col-span-2 text-right" style={{ color: 'var(--accent)' }}>★ {m.r}</div>
          </div>
        ))}
        {n < movies.length && <div className="py-1.5"><Caret /></div>}
      </div>
      {n >= movies.length && <div className="mt-2 text-[10px] uppercase tracking-[0.18em]" style={C.out}>{movies.length} of 184 results</div>}
    </Term>
  );
}

/* =========================================================
   EMOJI NATION
   ========================================================= */
export function EmojiNationWidget() {
  const [q, setQ] = useState('joy');
  const all: Record<string, string[]> = {
    joy: ['😂', '🤣', '😄', '😁', '😆', '😊', '🥳', '🎉', '🥰', '✨'],
    fire: ['🔥', '🔆', '🕯️', '🎆', '🎇', '💥', '♨️', '🌶️', '🚒', '🧨'],
    rain: ['🌧️', '☔', '💧', '🌫️', '🌊', '🌂', '⛈️', '💦', '🌦️', '🐸'],
    coffee: ['☕', '🥐', '🍩', '📰', '🥯', '🫖', '🥛', '🍵', '🧁', '🪴'],
  };
  const list = all[q] || all.joy;
  return (
    <Term title="emoji-nation · search" height={300}>
      <div className="flex items-center gap-2">
        <span style={C.prompt}>›</span>
        <input value={q} onChange={(e) => setQ(e.target.value.toLowerCase())} placeholder="joy / fire / rain / coffee" className="bg-transparent outline-none flex-1" style={{ color: 'var(--text-primary)' }} />
      </div>
      <div style={C.comment}>// querying emoji api · category=feeling · meaning enabled</div>
      <div className="grid grid-cols-10 gap-2 mt-4">
        {list.map((e, i) => <div key={i} className="aspect-square flex items-center justify-center rounded text-2xl smooth" style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}>{e}</div>)}
      </div>
      <div className="mt-4 text-[10px] uppercase tracking-[0.18em]" style={C.out}>{list.length} matches · hover any glyph for meaning</div>
    </Term>
  );
}

/* =========================================================
   HEALTHY ME
   ========================================================= */
export function HealthyMeWidget() {
  const lines: LineItem[] = [
    { t: '$ healthyme log breakfast', s: C.prompt },
    { t: '? oats + berries + honey', s: C.user },
    { t: '✓ 312 kcal · protein 8g · fiber 7g · sugar 16g', s: C.ok, pause: 200 },
    { t: '$ healthyme log water 500', s: C.prompt },
    { t: '✓ 500 ml logged · daily 1.4 / 2.5 L', s: C.ok, pause: 200 },
    { t: '$ healthyme summary', s: C.prompt },
  ];
  const [step] = useTypewriter(lines, 240);
  return (
    <Term title="healthy-me · daily log" height={320}>
      {lines.slice(0, step).map((l, i) => <div key={i} style={l.s}>{l.t}</div>)}
      {step >= lines.length && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[{ k: 'calories', v: 1480, max: 2200, u: 'kcal' }, { k: 'water', v: 1400, max: 2500, u: 'ml' }, { k: 'protein', v: 64, max: 110, u: 'g' }, { k: 'sugar', v: 38, max: 50, u: 'g' }].map((m) => {
            const pct = Math.min(1, m.v / m.max);
            return (
              <div key={m.k} className="rounded p-3" style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}>
                <div className="flex justify-between text-[11px]"><span style={C.out}>{m.k}</span><span style={{ color: 'var(--accent)' }}>{m.v} / {m.max} {m.u}</span></div>
                <div className="h-1.5 mt-2 rounded overflow-hidden" style={{ background: 'var(--border)' }}><div style={{ width: `${pct * 100}%`, height: '100%', background: 'var(--accent)' }} /></div>
              </div>
            );
          })}
        </div>
      )}
      {step < lines.length && <Caret />}
    </Term>
  );
}

/* =========================================================
   PROCTOR IT
   ========================================================= */
export function ProctorItWidget() {
  const [t, setT] = useState(0);
  useEffect(() => { const i = setInterval(() => setT((v) => v + 1), 90); return () => clearInterval(i); }, []);
  const eye = Math.sin(t * 0.07) * 4;
  const flag = Math.abs(eye) > 3.2;
  return (
    <Term title="proctor-it · cv invigilator" height={340}>
      <div style={C.prompt}>$ proctor start --exam=midterm-cs307</div>
      <div style={C.comment}>// opencv haar cascade · 30 fps · gaze tracking enabled</div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="aspect-[4/3] rounded relative overflow-hidden" style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}>
          <svg viewBox="0 0 100 75" className="w-full h-full">
            <ellipse cx="50" cy="40" rx="22" ry="28" fill="oklch(0.7 0.04 60)" opacity="0.3" />
            <ellipse cx="50" cy="40" rx="22" ry="28" fill="none" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="2 1" />
            <ellipse cx={42 + eye} cy="36" rx="2.5" ry="1.5" fill="var(--text-primary)" />
            <ellipse cx={58 + eye} cy="36" rx="2.5" ry="1.5" fill="var(--text-primary)" />
            <circle cx={42 + eye} cy="36" r="0.8" fill="var(--accent)" />
            <circle cx={58 + eye} cy="36" r="0.8" fill="var(--accent)" />
            <path d="M 44 50 Q 50 53, 56 50" stroke="var(--text-primary)" strokeWidth="0.5" fill="none" />
            {([[5, 5], [95, 5], [5, 70], [95, 70]] as [number, number][]).map(([x, y], i) => (
              <g key={i} stroke="var(--accent)" strokeWidth="0.5" fill="none">
                <line x1={x} y1={y} x2={x + (x < 50 ? 6 : -6)} y2={y} />
                <line x1={x} y1={y} x2={x} y2={y + (y < 50 ? 6 : -6)} />
              </g>
            ))}
          </svg>
          <div className="absolute bottom-2 left-2 text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>face · 1 detected</div>
        </div>
        <div className="space-y-2 text-[12px]">
          <div className="flex justify-between border-b py-1" style={{ borderColor: 'var(--border)' }}><span style={C.out}>gaze drift</span><span style={flag ? C.warn : C.ok}>{eye.toFixed(2)}°</span></div>
          <div className="flex justify-between border-b py-1" style={{ borderColor: 'var(--border)' }}><span style={C.out}>blink rate</span><span style={C.ok}>14 / min</span></div>
          <div className="flex justify-between border-b py-1" style={{ borderColor: 'var(--border)' }}><span style={C.out}>head pose</span><span style={C.ok}>0.94 forward</span></div>
          <div className="flex justify-between border-b py-1" style={{ borderColor: 'var(--border)' }}><span style={C.out}>focus score</span><span style={{ color: 'var(--accent)' }}>{flag ? '0.62 ⚠' : '0.91 ✓'}</span></div>
          {flag && <div style={C.warn} className="mt-2 text-[11px]">⚠ gaze drift &gt; threshold · flagged @ {(t / 11).toFixed(0)}s</div>}
        </div>
      </div>
    </Term>
  );
}

/* =========================================================
   WEATHER TODAY
   ========================================================= */
export function WeatherTodayWidget() {
  const lines: LineItem[] = [
    { t: '$ weather Chicago', s: C.prompt },
    { t: 'GET api.openweathermap.org/data/2.5/weather?q=Chicago,US', s: C.comment },
    { t: '200 OK · 142 ms', s: C.ok, pause: 200 },
  ];
  const [step] = useTypewriter(lines, 280);
  const days = [
    { d: 'mon', t: 14, lo: 4, i: '☁' }, { d: 'tue', t: 18, lo: 6, i: '☀' },
    { d: 'wed', t: 11, lo: 3, i: '⛅' }, { d: 'thu', t: 9, lo: 1, i: '🌧' },
    { d: 'fri', t: 13, lo: 4, i: '🌧' }, { d: 'sat', t: 17, lo: 7, i: '☀' },
    { d: 'sun', t: 19, lo: 9, i: '☀' },
  ];
  return (
    <Term title="weather-today · openweather" height={340}>
      {lines.slice(0, step).map((l, i) => <div key={i} style={l.s}>{l.t}</div>)}
      {step >= lines.length && (
        <>
          <div className="mt-3 flex items-baseline gap-4">
            <div className="font-serif" style={{ fontSize: 56, lineHeight: 1, color: 'var(--accent)' }}>14°</div>
            <div><div style={C.user}>partly cloudy</div><div style={C.out} className="text-[11px]">feels 12° · humidity 64% · wind 14 km/h NE</div></div>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1 text-center">
            {days.map((d) => (
              <div key={d.d} className="rounded p-2" style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}>
                <div className="text-[10px] uppercase" style={C.out}>{d.d}</div>
                <div className="text-2xl my-1">{d.i}</div>
                <div className="text-[11px]" style={{ color: 'var(--accent)' }}>{d.t}°</div>
                <div className="text-[10px]" style={C.out}>{d.lo}°</div>
              </div>
            ))}
          </div>
        </>
      )}
      {step < lines.length && <Caret />}
    </Term>
  );
}

/* =========================================================
   RANDOM QUOTE GENERATOR
   ========================================================= */
export function RandomQuoteWidget() {
  const quotes = [
    { q: 'Make it work, then make it right, then make it fast.', a: 'Kent Beck' },
    { q: 'Premature optimization is the root of all evil.', a: 'Donald Knuth' },
    { q: 'Simple things should be simple, complex things should be possible.', a: 'Alan Kay' },
    { q: 'The best way to predict the future is to invent it.', a: 'Alan Kay' },
    { q: 'Programs must be written for people to read.', a: 'Hal Abelson' },
  ];
  const [i, setI] = useState(0);
  const [hue, setHue] = useState(152);
  function next() { setI((prev) => (prev + 1) % quotes.length); setHue(Math.floor(Math.random() * 360)); }
  useEffect(() => { const id = setInterval(next, 3500); return () => clearInterval(id); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [i]);
  const cur = quotes[i];
  return (
    <Term title="random-quote · color shift" height={340}>
      <div style={C.prompt}>$ quote --random --tweet</div>
      <div style={C.comment}>// new quote every 3.5s · fresh color scheme</div>
      <div className="mt-4 rounded-xl p-6 smooth" style={{ background: `oklch(0.22 0.06 ${hue})`, border: `1px solid oklch(0.85 0.12 ${hue})`, transition: 'all 0.6s var(--ease)' }} key={i}>
        <div className="font-serif text-[22px] leading-snug" style={{ color: `oklch(0.85 0.12 ${hue})` }}>&ldquo;{cur.q}&rdquo;</div>
        <div className="mt-3 font-mono text-[11px]" style={{ color: `oklch(0.85 0.12 ${hue})`, opacity: 0.7 }}>— {cur.a}</div>
      </div>
      <div className="mt-3 flex items-center gap-3 text-[11px]">
        <button onClick={next} className="px-3 py-1 rounded uppercase tracking-[0.18em] text-[10px] smooth" style={{ background: 'var(--accent)', color: 'var(--bg)' }} data-hover>↻ new</button>
        <span style={C.out}>tweet · hue {hue}° · {i + 1} / {quotes.length}</span>
      </div>
    </Term>
  );
}
