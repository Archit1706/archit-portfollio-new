'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Project } from '@/lib/projects-data';

function Row({ k, v, accent }: { k: string; v: string | number | undefined; accent?: boolean }) {
  return (
    <div className="flex justify-between border-b py-1" style={{ borderColor: 'var(--border)' }}>
      <span style={{ color: 'var(--text-muted)' }}>{k}</span>
      <span style={{ color: accent ? 'var(--accent)' : 'var(--text-primary)' }}>{v}</span>
    </div>
  );
}

/* =========================================================
   1. OSM ROAD CLOSURE MAP
   ========================================================= */
export function OSMMapWidget() {
  const [closures, setClosures] = useState([
    { id: 'C-1042', x: 38, y: 42, status: 'active', cause: 'construction', minutes: 142 },
    { id: 'C-1058', x: 62, y: 58, status: 'active', cause: 'event', minutes: 36 },
    { id: 'C-1103', x: 55, y: 30, status: 'pending', cause: 'flood', minutes: 8 },
  ]);
  const [selected, setSelected] = useState(closures[0].id);
  const [routing, setRouting] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  const cur = closures.find((c) => c.id === selected);

  function moveClosure(e: React.MouseEvent<SVGElement | HTMLDivElement>) {
    if (!cur) return;
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setClosures((cs) => cs.map((c) => (c.id === selected ? { ...c, x, y } : c)));
  }

  const openlr = cur ? `Cw${(cur.x * 73).toString(36).padStart(4, '0').slice(0, 4).toUpperCase()}/${(cur.y * 119).toString(36).padStart(4, '0').slice(0, 4).toUpperCase()}` : '—';

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />closures.osm.ch · live
        </div>
        <div className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>chicago · zoom 12</div>
      </div>
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2 relative aspect-[4/3] cursor-crosshair select-none" onClick={moveClosure} style={{ background: 'var(--bg)' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 75" preserveAspectRatio="none">
            {Array.from({ length: 12 }).map((_, i) => <line key={'v' + i} x1={i * 100 / 12} y1="0" x2={i * 100 / 12} y2="75" stroke="var(--border)" strokeWidth="0.1" />)}
            {Array.from({ length: 9 }).map((_, i) => <line key={'h' + i} x1="0" y1={i * 75 / 9} x2="100" y2={i * 75 / 9} stroke="var(--border)" strokeWidth="0.1" />)}
            <path d="M 0 50 Q 25 40, 40 48 T 80 35 L 100 30" stroke="oklch(0.6 0.1 220)" strokeWidth="1.2" fill="none" opacity="0.4" />
            <path d="M 0 60 L 35 50 L 55 55 L 80 35 L 100 30" stroke="var(--text-muted)" strokeWidth="0.6" fill="none" opacity="0.7" />
            <path d="M 20 0 L 35 25 L 50 50 L 60 75" stroke="var(--text-muted)" strokeWidth="0.6" fill="none" opacity="0.7" />
            <path d="M 80 0 L 70 30 L 65 60 L 70 75" stroke="var(--text-muted)" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M 0 25 L 30 30 L 60 28 L 100 22" stroke="var(--text-muted)" strokeWidth="0.4" fill="none" opacity="0.5" />
            {Array.from({ length: 14 }).map((_, i) => {
              const t = ((tick + i * 17) % 200) / 200;
              const px = 0 + t * 100;
              const py = 60 - 30 * t * (1 - t) * 4;
              return <circle key={i} cx={px} cy={py} r="0.4" fill="var(--accent)" opacity="0.7" />;
            })}
            {routing && cur && (
              <path d={`M 5 70 Q ${cur.x - 12} ${cur.y - 8}, ${cur.x - 6} ${cur.y - 4} Q ${cur.x + 12} ${cur.y + 14}, 95 5`}
                stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="1.5 1" fill="none"
                style={{ filter: 'drop-shadow(0 0 4px var(--accent))' }}
              />
            )}
            {closures.map((c) => (
              <g key={c.id} onClick={(e) => { e.stopPropagation(); setSelected(c.id); }} style={{ cursor: 'pointer' }}>
                <circle cx={c.x} cy={c.y} r={c.id === selected ? 2.5 : 1.8} fill={c.status === 'active' ? 'oklch(0.7 0.2 25)' : 'oklch(0.75 0.15 80)'} opacity="0.25" />
                <circle cx={c.x} cy={c.y} r={c.id === selected ? 1.4 : 1} fill={c.status === 'active' ? 'oklch(0.7 0.2 25)' : 'oklch(0.75 0.15 80)'}>
                  <animate attributeName="r" values={`${c.id === selected ? 1.4 : 1};${c.id === selected ? 2 : 1.4};${c.id === selected ? 1.4 : 1}`} dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>
          <div className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-faint)' }}>click map → drag selected closure · click marker → select</div>
        </div>
        <div className="border-l" style={{ borderColor: 'var(--border)' }}>
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>active closure</div>
            <div className="font-serif text-2xl">{cur?.id}</div>
            <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
              status · <span style={{ color: cur?.status === 'active' ? 'oklch(0.75 0.2 25)' : 'oklch(0.75 0.15 80)' }}>{cur?.status}</span>
            </div>
          </div>
          <div className="p-4 space-y-2 font-mono text-[11px]">
            <Row k="cause" v={cur?.cause} />
            <Row k="duration" v={cur ? `${cur.minutes}m` : ''} />
            <Row k="lat,lng" v={cur ? `41.${(cur.y * 47).toFixed(0).padStart(4, '0')}, -87.${(cur.x * 53).toFixed(0).padStart(4, '0')}` : ''} />
            <Row k="openlr" v={openlr} accent />
          </div>
          <div className="p-4 border-t flex gap-2" style={{ borderColor: 'var(--border)' }}>
            <button onClick={() => setRouting((r) => !r)} className="flex-1 font-mono text-[10px] uppercase tracking-[0.18em] py-2 rounded smooth"
              style={{ background: routing ? 'var(--accent)' : 'transparent', color: routing ? 'var(--bg)' : 'var(--accent)', border: '1px solid var(--accent)' }} data-hover>
              {routing ? '✓ rerouting' : 'compute reroute'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   2. KEYA AI CHAT AGENT
   ========================================================= */
export function ChatAgentWidget() {
  const presets = [
    { q: 'find me a 2BR near U-Bahn in Berlin under €1800', tools: ['property_search', 'transit_lookup'] },
    { q: 'what schools are around 1600 N California Ave Chicago?', tools: ['geocode', 'great_schools'] },
    { q: 'compare commute from this listing to OpenAI HQ', tools: ['transit_lookup', 'distance_matrix'] },
  ];
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [chosen, setChosen] = useState(0);
  const allTools = ['property_search', 'transit_lookup', 'geocode', 'great_schools', 'distance_matrix', 'image_gen', 'memory_recall', 'serp'];
  const active = presets[chosen].tools;

  function run() {
    setRunning(true); setStep(0);
    let s = 0;
    const id = setInterval(() => { s += 1; setStep(s); if (s >= 5) { clearInterval(id); setRunning(false); } }, 700);
  }

  return (
    <div className="rounded-2xl overflow-hidden grid md:grid-cols-5" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="md:col-span-2 p-5 border-r" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--text-muted)' }}>agent · 8 tools registered</div>
        <div className="space-y-2">
          {allTools.map((t) => {
            const isActive = active.includes(t);
            const isFiring = isActive && step >= 1 && active.indexOf(t) <= step - 1;
            return (
              <div key={t} className="flex items-center gap-2 font-mono text-[11px]" style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-faint)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: isFiring ? 'var(--accent)' : isActive ? 'var(--text-muted)' : 'var(--text-faint)', boxShadow: isFiring ? '0 0 8px var(--accent)' : 'none', transition: 'all 0.3s' }} />
                {t}
                {isFiring && <span style={{ color: 'var(--accent)' }} className="ml-auto">●</span>}
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t font-mono text-[10px]" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          model · gpt-4o-mini<br />retrieval · pgvector (1536d)<br />context · 12 listings
        </div>
      </div>
      <div className="md:col-span-3 p-5 flex flex-col" style={{ minHeight: 380 }}>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {presets.map((p, i) => (
            <button key={i} onClick={() => { setChosen(i); setStep(0); }} className="font-mono text-[10px] px-2 py-1 rounded smooth"
              style={{ background: chosen === i ? 'var(--accent-soft)' : 'transparent', color: chosen === i ? 'var(--accent)' : 'var(--text-muted)', border: `1px solid ${chosen === i ? 'var(--accent)' : 'var(--border-strong)'}` }} data-hover>
              preset {i + 1}
            </button>
          ))}
        </div>
        <div className="flex-1 space-y-3 font-mono text-[12px] overflow-hidden">
          <div className="flex gap-2"><span style={{ color: 'var(--text-faint)' }}>user ›</span><span style={{ color: 'var(--text-primary)' }}>{presets[chosen].q}</span></div>
          {step >= 1 && <div className="pl-4 border-l-2" style={{ borderColor: 'var(--accent)' }}><div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>plan</div><div className="mt-1" style={{ color: 'var(--text-primary)' }}>i&apos;ll call <span style={{ color: 'var(--accent)' }}>{active[0]}</span> first, then <span style={{ color: 'var(--accent)' }}>{active[1]}</span></div></div>}
          {step >= 2 && <div className="rounded p-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}><div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>tool · {active[0]}</div><div className="mt-1" style={{ color: 'var(--text-primary)' }}>→ 24 results · top score 0.91</div></div>}
          {step >= 3 && <div className="rounded p-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}><div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>tool · {active[1]}</div><div className="mt-1" style={{ color: 'var(--text-primary)' }}>→ enriched 24 results in 312ms</div></div>}
          {step >= 4 && <div className="rounded p-3 flex gap-3" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)' }}><div className="w-12 h-12 rounded flex-shrink-0" style={{ background: 'linear-gradient(135deg, oklch(0.6 0.12 200), oklch(0.4 0.1 280))' }} /><div className="flex-1"><div style={{ color: 'var(--accent)' }}>Mitte · 2BR · €1,650/mo</div><div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>4 min walk → U-Rosenthaler Platz · score 0.93</div></div></div>}
        </div>
        <div className="mt-4 pt-3 border-t flex gap-2" style={{ borderColor: 'var(--border)' }}>
          <button onClick={run} disabled={running} className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-2 rounded smooth" style={{ background: 'var(--accent)', color: 'var(--bg)', opacity: running ? 0.6 : 1 }} data-hover>{running ? 'running…' : 'run agent'}</button>
          <button onClick={() => setStep(0)} className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-2 rounded smooth" style={{ border: '1px solid var(--border-strong)', color: 'var(--text-muted)' }} data-hover>reset</button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   3. CONGESTION ZONE GRAPH
   ========================================================= */
export function CycleGraphWidget() {
  const [thresh, setThresh] = useState(0.6);
  const nodes = useMemo(() => {
    const arr: { id: number; x: number; y: number }[] = [];
    let seed = 7;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < 32; i++) arr.push({ id: i, x: 8 + rand() * 84, y: 8 + rand() * 60 });
    return arr;
  }, []);
  const edges = useMemo(() => {
    const e: { a: number; b: number; w: number }[] = [];
    nodes.forEach((n, i) => {
      const others = nodes.map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) })).filter((o) => o.j !== i).sort((a, b) => a.d - b.d).slice(0, 3);
      others.forEach((o) => { if (i < o.j) e.push({ a: i, b: o.j, w: 0.3 + ((i + o.j) * 17 % 70) / 100 }); });
    });
    return e;
  }, [nodes]);

  const cx = 50, cy = 38;
  const inside = nodes.map((n) => Math.hypot(n.x - cx, n.y - cy) < 28 * thresh);
  const cutEdges = edges.filter((e) => inside[e.a] !== inside[e.b]);
  const insideCount = inside.filter(Boolean).length;
  const tripCoverage = (insideCount / nodes.length * 100).toFixed(0);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>cordon zone · cut-edge optimization</div>
        <div className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>32 nodes · {edges.length} edges</div>
      </div>
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2 aspect-[5/3] relative">
          <svg viewBox="0 0 100 75" className="w-full h-full">
            <circle cx={cx} cy={cy} r={28 * thresh} fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="1 0.8" />
            {edges.map((e, i) => {
              const a = nodes[e.a], b = nodes[e.b];
              const isCut = inside[e.a] !== inside[e.b];
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={isCut ? 'var(--accent)' : 'var(--border-strong)'} strokeWidth={isCut ? 0.5 : 0.2} opacity={isCut ? 1 : 0.5} />;
            })}
            {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={inside[i] ? 0.9 : 0.6} fill={inside[i] ? 'var(--accent)' : 'var(--text-muted)'} />)}
          </svg>
        </div>
        <div className="border-l p-4 space-y-4" style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>boundary radius</div>
            <input type="range" min="0.2" max="1.4" step="0.02" value={thresh} onChange={(e) => setThresh(parseFloat(e.target.value))} className="w-full" style={{ accentColor: 'var(--accent)' }} />
            <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--accent)' }}>r = {thresh.toFixed(2)}</div>
          </div>
          <div className="space-y-2 font-mono text-[11px]">
            <Row k="zone nodes" v={`${insideCount} / 32`} />
            <Row k="cut edges" v={cutEdges.length} accent />
            <Row k="trip coverage" v={`${tripCoverage}%`} />
            <Row k="monitor cost" v={`$${(cutEdges.length * 18).toLocaleString()}/mo`} />
          </div>
          <div className="pt-3 border-t font-mono text-[9px] uppercase tracking-[0.18em]" style={{ borderColor: 'var(--border)', color: 'var(--text-faint)' }}>↑ widen radius — higher coverage, more cameras</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   4. PANORAMA — drag-to-pan 360 room
   ========================================================= */
export function PanoramaWidget() {
  const [pan, setPan] = useState(180);
  const [drag, setDrag] = useState(false);
  const last = useRef(0);
  const rooms = ['kitchen', 'living', 'bath', 'bed', 'study', 'hall'];
  const sector = Math.floor((pan / 360) * rooms.length);

  function start(e: React.MouseEvent | React.TouchEvent) {
    setDrag(true);
    last.current = 'clientX' in e ? e.clientX : e.touches[0].clientX;
  }
  function move(e: React.MouseEvent | React.TouchEvent) {
    if (!drag) return;
    const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    setPan((p) => (p - (x - last.current) * 0.4 + 360) % 360);
    last.current = x;
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>360° tour · drag to pan</div>
        <div className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>{rooms[sector]} · {Math.round(pan)}°</div>
      </div>
      <div className="relative aspect-[16/8] overflow-hidden select-none" style={{ cursor: drag ? 'grabbing' : 'grab' }}
        onMouseDown={start} onMouseMove={move} onMouseUp={() => setDrag(false)} onMouseLeave={() => setDrag(false)}
        onTouchStart={start} onTouchMove={move} onTouchEnd={() => setDrag(false)}>
        <div className="absolute inset-0" style={{ transform: `translateX(${-pan * 4}px)`, transition: drag ? 'none' : 'transform 0.6s var(--ease)' }}>
          <div className="flex h-full" style={{ width: '1440px' }}>
            {[...rooms, ...rooms.slice(0, 2)].map((r, i) => (
              <div key={i} className="h-full relative" style={{ width: '240px', background: `linear-gradient(${i % 2 ? '135deg' : '45deg'}, oklch(0.${30 + i * 4} 0.${10 + i * 2} ${i * 60}), oklch(0.${50 + i * 3} 0.${8 + i * 2} ${i * 60 + 80}))` }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                  <rect x={20 + i * 4} y={30} width={20 + i * 2} height={20} fill="rgba(0,0,0,0.3)" rx="2" />
                  <rect x={55 - i} y={20 + i} width={15} height={30} fill="rgba(255,255,255,0.08)" rx="1" />
                  <circle cx={75} cy={45} r={i + 2} fill="rgba(0,0,0,0.4)" />
                </svg>
                <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.7)' }}>{r}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {rooms.map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full smooth" style={{ background: i === sector ? 'var(--accent)' : 'rgba(255,255,255,0.3)' }} />)}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   5. TONE/PITCH ANALYZER
   ========================================================= */
export function TonePitchWidget() {
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT((v) => v + 1), 60);
    return () => clearInterval(id);
  }, [running]);

  const emotions = ['calm', 'confident', 'nervous', 'enthused', 'flat', 'rushed', 'warm'];
  const vec = emotions.map((_, i) => 0.3 + 0.3 * Math.sin(t * 0.1 + i) + (i === 1 ? 0.2 : 0));
  const dom = vec.indexOf(Math.max(...vec));

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>real-time tone & pitch</div>
        <button onClick={() => setRunning(!running)} className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1 rounded smooth" style={{ background: running ? 'oklch(0.7 0.2 25)' : 'var(--accent)', color: 'var(--bg)' }} data-hover>
          {running ? '■ stop' : '● record'}
        </button>
      </div>
      <div className="grid md:grid-cols-5 gap-0">
        <div className="md:col-span-3 p-5 border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--text-muted)' }}>waveform · 16khz</div>
          <svg viewBox="0 0 200 60" className="w-full" style={{ height: 80 }}>
            {Array.from({ length: 60 }).map((_, i) => {
              const h = running ? 4 + Math.abs(Math.sin((t + i) * 0.4)) * 40 + Math.abs(Math.sin((t + i) * 0.13)) * 12 : 6;
              return <rect key={i} x={i * 3.3} y={30 - h / 2} width={2} height={h} fill="var(--accent)" opacity={running ? 1 : 0.3} />;
            })}
          </svg>
          <div className="grid grid-cols-3 gap-3 mt-5 font-mono text-[11px]">
            {[['pitch', running ? `${(180 + Math.sin(t * 0.1) * 30).toFixed(0)} hz` : '—'], ['tempo', running ? `${(140 + Math.sin(t * 0.07) * 20).toFixed(0)} wpm` : '—'], ['energy', running ? `${(0.6 + Math.sin(t * 0.13) * 0.2).toFixed(2)}` : '—']].map(([k, v]) => (
              <div key={k}><div className="text-[9px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>{k}</div><div className="mt-0.5" style={{ color: 'var(--accent)' }}>{v}</div></div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>emotion radar</div>
          <svg viewBox="-50 -50 100 100" className="w-full" style={{ aspectRatio: '1 / 1' }}>
            {[0.25, 0.5, 0.75, 1].map((r) => <circle key={r} r={r * 40} fill="none" stroke="var(--border)" strokeWidth="0.3" />)}
            {emotions.map((_, i) => { const a = (i / emotions.length) * Math.PI * 2 - Math.PI / 2; return <line key={i} x1="0" y1="0" x2={Math.cos(a) * 40} y2={Math.sin(a) * 40} stroke="var(--border)" strokeWidth="0.3" />; })}
            <polygon points={emotions.map((_, i) => { const a = (i / emotions.length) * Math.PI * 2 - Math.PI / 2; const r = vec[i] * 40; return `${Math.cos(a) * r},${Math.sin(a) * r}`; }).join(' ')} fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="0.6" />
            {emotions.map((e, i) => { const a = (i / emotions.length) * Math.PI * 2 - Math.PI / 2; return <text key={i} x={Math.cos(a) * 47} y={Math.sin(a) * 47} fill={i === dom ? 'var(--accent)' : 'var(--text-muted)'} fontSize="3.5" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-jetbrains-mono), monospace">{e}</text>; })}
          </svg>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mt-3 text-center" style={{ color: 'var(--accent)' }}>dominant · {emotions[dom]}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   6. URL SCANNER — phishing detection trace
   ========================================================= */
export function URLScannerWidget() {
  const samples = [
    { u: 'https://paypa1-secure.com/login', score: 0.91, verdict: 'phishing', flags: ['typosquat', 'no whois', 'self-signed cert', 'logo mismatch'] },
    { u: 'https://github.com/Archit1706', score: 0.04, verdict: 'safe', flags: ['known domain', 'valid cert', 'aged 8y'] },
    { u: 'https://amaz0n-prime-renew.shop', score: 0.97, verdict: 'phishing', flags: ['homoglyph', 'new tld', 'registered 2d ago', 'imitates brand'] },
    { u: 'https://openstreetmap.org', score: 0.02, verdict: 'safe', flags: ['known domain', 'whitelist', 'aged 21y'] },
  ];
  const [i, setI] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reveal, setReveal] = useState(true);
  const cur = samples[i];
  const checks = ['whois lookup', 'cert chain', 'visual hash', 'lightgbm score', 'typosquat dist', 'serp reputation'];

  function scan() {
    setScanning(true); setReveal(false); setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p += 6 + Math.random() * 8;
      if (p >= 100) { p = 100; clearInterval(id); setScanning(false); setReveal(true); }
      setProgress(p);
    }, 80);
  }

  useEffect(() => { scan(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [i]);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>phishfence · url scanner</div>
        <div className="flex gap-1.5">{samples.map((_, k) => <button key={k} onClick={() => setI(k)} className="w-1.5 h-1.5 rounded-full smooth" style={{ background: i === k ? 'var(--accent)' : 'var(--text-faint)' }} data-hover />)}</div>
      </div>
      <div className="p-5">
        <div className="font-mono text-[12px] px-3 py-2 rounded mb-4" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>→ {cur.u}</div>
        <div className="h-1 rounded mb-5 overflow-hidden" style={{ background: 'var(--border)' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.1s linear' }} />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>checks</div>
            <div className="space-y-1.5 font-mono text-[11px]">
              {checks.map((c, k) => {
                const done = progress > (k + 1) * (100 / checks.length);
                return <div key={c} className="flex justify-between"><span style={{ color: done ? 'var(--text-primary)' : 'var(--text-faint)' }}>{c}</span><span style={{ color: done ? 'var(--accent)' : 'var(--text-faint)' }}>{done ? '✓' : '·'}</span></div>;
              })}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>verdict</div>
            {reveal && !scanning ? (
              <>
                <div className="font-serif text-3xl" style={{ color: cur.verdict === 'phishing' ? 'oklch(0.7 0.2 25)' : 'var(--accent)' }}>{cur.verdict}</div>
                <div className="font-mono text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>confidence · {(cur.score * 100).toFixed(0)}%</div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {cur.flags.map((f) => <span key={f} className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)', color: 'var(--text-muted)' }}>{f}</span>)}
                </div>
              </>
            ) : <div className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>scanning…</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FALLBACK WIDGETS (pose, audio, network, auction, terminal)
   ========================================================= */
export function PoseWidget() {
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT((v) => v + 1), 90); return () => clearInterval(id); }, []);
  const phase = (t % 40) / 40;
  const squat = Math.sin(phase * Math.PI * 2);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>pose · squat · 17 keypoints</div>
        <div className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>rep {Math.floor(t / 40) + 1} · form 92%</div>
      </div>
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2 aspect-[4/3] relative" style={{ background: 'var(--bg)' }}>
          <svg viewBox="0 0 100 75" className="w-full h-full">
            {(() => {
              const head: [number, number] = [50, 18];
              const sh: [number, number][] = [[42, 30], [58, 30]];
              const elbow: [number, number][] = [[36, 38], [64, 38]];
              const hand: [number, number][] = [[34, 50], [66, 50]];
              const hip: [number, number][] = [[46, 45 + squat * 4], [54, 45 + squat * 4]];
              const knee: [number, number][] = [[44, 56 + squat * 2], [56, 56 + squat * 2]];
              const ankle: [number, number][] = [[44, 68], [56, 68]];
              const spine: [number, number] = [50, 28];
              const segs: [[number, number], [number, number]][] = [
                [head, spine], [spine, sh[0]], [spine, sh[1]], [spine, hip[0]], [spine, hip[1]],
                [sh[0], elbow[0]], [elbow[0], hand[0]], [sh[1], elbow[1]], [elbow[1], hand[1]],
                [hip[0], knee[0]], [knee[0], ankle[0]], [hip[1], knee[1]], [knee[1], ankle[1]],
              ];
              const pts = [head, spine, ...sh, ...elbow, ...hand, ...hip, ...knee, ...ankle];
              return <>
                {segs.map((s, i) => <line key={i} x1={s[0][0]} y1={s[0][1]} x2={s[1][0]} y2={s[1][1]} stroke="var(--accent)" strokeWidth="0.6" opacity="0.7" />)}
                {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="0.9" fill="var(--accent)" />)}
              </>;
            })()}
          </svg>
        </div>
        <div className="border-l p-4 space-y-2 font-mono text-[11px]" style={{ borderColor: 'var(--border)' }}>
          <Row k="depth" v={`${(70 + squat * 25).toFixed(0)}°`} />
          <Row k="back angle" v={`${(15 + Math.abs(squat) * 5).toFixed(0)}°`} />
          <Row k="symmetry" v="0.94" />
          <Row k="cadence" v="3.2 s/rep" accent />
        </div>
      </div>
    </div>
  );
}

export function AudioSentWidget() {
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT((v) => v + 1), 100); return () => clearInterval(id); }, []);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>call · agent ↔ caller · 04:21</div>
        <div className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>sentiment +0.42</div>
      </div>
      <div className="p-5">
        <svg viewBox="0 0 200 50" className="w-full" style={{ height: 70 }}>
          {Array.from({ length: 80 }).map((_, i) => {
            const h = 4 + Math.abs(Math.sin((t + i) * 0.18)) * 30;
            return <rect key={i} x={i * 2.5} y={25 - h / 2} width={1.5} height={h} fill={i < (t % 80) ? 'var(--accent)' : 'var(--text-faint)'} />;
          })}
        </svg>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {['joy', 'neutral', 'anger', 'sad'].map((e, i) => {
            const v = 0.3 + Math.abs(Math.sin(t * 0.1 + i)) * 0.6;
            return (
              <div key={e}>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>{e}</div>
                <div className="h-1 mt-1 rounded overflow-hidden" style={{ background: 'var(--border)' }}><div style={{ width: `${v * 100}%`, height: '100%', background: 'var(--accent)' }} /></div>
                <div className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--accent)' }}>{(v * 100).toFixed(0)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function NetworkWidget() {
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT((v) => v + 1), 80); return () => clearInterval(id); }, []);
  const nodes = useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
    x: 50 + 35 * Math.cos((i / 18) * Math.PI * 2 + (i % 3) * 0.3),
    y: 38 + 25 * Math.sin((i / 18) * Math.PI * 2 + (i % 4) * 0.4),
    cluster: i % 3,
  })), []);
  const colors = ['var(--accent)', 'oklch(0.7 0.2 25)', 'oklch(0.8 0.15 80)'];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>coordinated behavior · 3 clusters</div>
        <div className="font-mono text-[10px]" style={{ color: 'oklch(0.7 0.2 25)' }}>● cluster 1 · suspicious</div>
      </div>
      <div className="aspect-[16/8]">
        <svg viewBox="0 0 100 75" className="w-full h-full">
          {nodes.map((n, i) => nodes.slice(i + 1).map((m, j) => {
            if (n.cluster !== m.cluster) return null;
            return <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke={colors[n.cluster]} strokeWidth="0.15" opacity="0.4" />;
          }))}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="2" fill={colors[n.cluster]} opacity="0.2" />
              <circle cx={n.x} cy={n.y} r={1 + 0.3 * Math.sin((t + i * 4) * 0.2)} fill={colors[n.cluster]} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export function AuctionWidget() {
  const [bids, setBids] = useState([
    { user: 'k1ng_b1d', amt: 4200, t: -8 },
    { user: 'silent_ofr', amt: 4350, t: -5 },
    { user: 'mr.outbid', amt: 4500, t: -2 },
  ]);
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setT((v) => v + 1);
      if (Math.random() > 0.7) {
        setBids((b) => {
          const last = b[b.length - 1];
          const n = { user: ['ax3l', 'maya', 'kr00g', 'velvet', 'oss-fan'][Math.floor(Math.random() * 5)], amt: last.amt + Math.floor(50 + Math.random() * 200), t: 0 };
          return [...b.slice(-5), n];
        });
      }
    }, 1400);
    return () => clearInterval(id);
  }, []);
  const high = bids[bids.length - 1];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>live · 1962 jaguar e-type</div>
        <div className="font-mono text-[10px]" style={{ color: 'oklch(0.7 0.2 25)' }}>● {12 - (t % 12)}s left</div>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="p-5 border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>current high</div>
          <div className="font-serif text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>${high.amt.toLocaleString()}</div>
          <div className="font-mono text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>by @{high.user}</div>
          <button className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded smooth" style={{ background: 'var(--accent)', color: 'var(--bg)' }} data-hover>place bid +$100</button>
        </div>
        <div className="p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>activity</div>
          <div className="space-y-1.5 font-mono text-[11px]" style={{ maxHeight: 160, overflow: 'hidden' }}>
            {bids.slice().reverse().map((b, i) => <div key={i} className="flex justify-between" style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-muted)', opacity: 1 - i * 0.15 }}><span>@{b.user}</span><span>${b.amt.toLocaleString()}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GALAXY MORPHOLOGY XAI
   ========================================================= */
/* =========================================================
   GREENPIPE
   ========================================================= */
const GP_STAGES = [
  { id: 'build',   label: 'build',    duration: '2m 34s' },
  { id: 'unit',    label: 'test:unit',duration: '1m 48s' },
  { id: 'int',     label: 'test:int', duration: '2m 11s' },
  { id: 'deploy',  label: 'deploy',   duration: '0m 52s' },
  { id: 'agent',   label: '⬡ greenpipe', duration: '' },
];

const GP_LOG_LINES = [
  { delay: 0,    text: '→ GreenPipe agent triggered by pipeline #4821', kind: 'info' },
  { delay: 500,  text: '→ estimating energy via GSF Impact Framework (Teads curve)…', kind: 'info' },
  { delay: 1100, text: '  E = 0.0028 kWh  (CPU 38% util × 65W TDP × 7.63 min)', kind: 'dim' },
  { delay: 1700, text: '  I = 287 gCO₂e/kWh  (us-east1 · live grid intensity)', kind: 'dim' },
  { delay: 2200, text: '  M = 0.00038 gCO₂e  (embodied hardware share)', kind: 'dim' },
  { delay: 2700, text: '  SCI = ((E × I) + M) / R = 0.804 gCO₂e', kind: 'sci' },
  { delay: 3300, text: '→ classifying urgency via DistilBERT (INT8)…', kind: 'info' },
  { delay: 3900, text: '  "feat: add auth middleware"  →  LOW  (conf 94.2%)', kind: 'dim' },
  { delay: 4500, text: '→ scanning 5 regions for lowest carbon window…', kind: 'info' },
  { delay: 5100, text: '  europe-west1  03:00 UTC  →  71 gCO₂e/kWh  (−75.3%)', kind: 'ok' },
  { delay: 5700, text: '→ deferral decision: RECOMMEND  (mode: recommend-only)', kind: 'info' },
  { delay: 6200, text: '✓ MR comment posted  ·  leaderboard updated  ·  0.804 gCO₂e logged', kind: 'ok' },
];

export function GreenPipeWidget() {
  const [stageIdx, setStageIdx] = useState(-1);
  const [logIdx, setLogIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [logStarted, setLogStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = () => { setStageIdx(-1); setLogIdx(0); setRunning(false); setLogStarted(false); };

  const run = () => {
    reset();
    setRunning(true);
    GP_STAGES.forEach((_, i) => {
      timerRef.current = setTimeout(() => {
        setStageIdx(i);
        if (i === GP_STAGES.length - 1) {
          setTimeout(() => setLogStarted(true), 200);
        }
      }, i * 900 + 300);
    });
  };

  useEffect(() => {
    if (!logStarted) return;
    if (logIdx >= GP_LOG_LINES.length) { setRunning(false); return; }
    const delay = logIdx === 0 ? 0 : GP_LOG_LINES[logIdx].delay - GP_LOG_LINES[logIdx - 1].delay;
    const id = setTimeout(() => setLogIdx((n) => n + 1), delay);
    return () => clearTimeout(id);
  }, [logStarted, logIdx]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const done = logIdx >= GP_LOG_LINES.length;
  const LOG_COLOR: Record<string, string> = {
    info: 'var(--text-muted)', dim: 'var(--text-faint)',
    ok: '#4ade80', sci: 'var(--accent)',
  };

  return (
    <div className="glass rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-glass)' }}>
      {/* Chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
          </div>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>greenpipe · gitlab-duo-agent · pipeline #4821</span>
        </div>
        <button
          onClick={running ? reset : run}
          className="font-mono text-[10px] px-3 py-1.5 rounded-md smooth uppercase tracking-[0.12em]"
          style={{ background: running ? 'transparent' : 'var(--accent)', color: running ? 'var(--text-muted)' : 'var(--bg)', border: `1px solid ${running ? 'var(--border-strong)' : 'var(--accent)'}` }}
          data-hover>
          {running ? '■ stop' : stageIdx === -1 ? '▶ run pipeline' : '↺ re-run'}
        </button>
      </div>

      {/* Pipeline stages */}
      <div className="px-5 py-4 border-b flex items-center gap-1 overflow-x-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-elev)' }}>
        {GP_STAGES.map((s, i) => {
          const passed  = stageIdx > i;
          const active  = stageIdx === i;
          const pending = stageIdx < i;
          const isAgent = s.id === 'agent';
          return (
            <div key={s.id} className="flex items-center gap-1 flex-shrink-0">
              <div className="flex flex-col items-center gap-1">
                <div className="font-mono text-[9px] uppercase tracking-[0.12em] whitespace-nowrap"
                  style={{ color: passed ? '#4ade80' : active ? 'var(--accent)' : 'var(--text-faint)' }}>
                  {s.label}
                </div>
                <div className="px-3 py-1.5 rounded font-mono text-[9px] smooth"
                  style={{
                    background: passed ? 'rgba(74,222,128,0.12)' : active ? 'var(--accent-soft)' : 'var(--bg)',
                    border: `1px solid ${passed ? '#4ade80' : active ? 'var(--accent)' : 'var(--border)'}`,
                    color: passed ? '#4ade80' : active ? 'var(--accent)' : 'var(--text-faint)',
                    minWidth: isAgent ? 88 : 64, textAlign: 'center',
                  }}>
                  {passed ? `✓ ${s.duration}` : active ? (isAgent ? 'analyzing…' : 'running…') : s.duration || 'pending'}
                </div>
              </div>
              {i < GP_STAGES.length - 1 && (
                <div className="w-4 h-px mx-1 flex-shrink-0" style={{ background: stageIdx > i ? '#4ade80' : 'var(--border-strong)' }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-5 gap-0">
        {/* Agent log */}
        <div className="md:col-span-3 p-5 border-b md:border-b-0 md:border-r font-mono text-[11px] leading-[1.7]" style={{ borderColor: 'var(--border)', minHeight: 280 }}>
          {stageIdx === -1 && (
            <span style={{ color: 'var(--text-faint)' }}>Click <span style={{ color: 'var(--accent)' }}>run pipeline</span> to simulate a CI run with GreenPipe carbon analysis.</span>
          )}
          {stageIdx >= 0 && stageIdx < GP_STAGES.length - 1 && (
            <span style={{ color: 'var(--text-faint)' }}>Pipeline running — waiting for deploy to complete…</span>
          )}
          {logStarted && GP_LOG_LINES.slice(0, logIdx).map((l, i) => (
            <div key={i} style={{ color: LOG_COLOR[l.kind] }}>{l.text}</div>
          ))}
          {running && logStarted && logIdx < GP_LOG_LINES.length && (
            <span className="inline-block w-2 h-3.5 align-middle" style={{ background: 'var(--accent)', animation: 'blink 1s steps(2) infinite' }} />
          )}
        </div>

        {/* SCI breakdown + recommendation */}
        <div className="md:col-span-2 p-5 flex flex-col gap-4">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--text-muted)' }}>SCI Formula — ISO/IEC 21031:2024</div>
            <div className="font-mono text-[11px] p-3 rounded-lg mb-3" style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-faint)' }}>SCI = </span>
              <span style={{ color: 'var(--text-muted)' }}>((E × I) + M) / R</span>
            </div>
            {[
              ['E · energy', '0.0028 kWh'],
              ['I · carbon intensity', '287 gCO₂e/kWh'],
              ['M · embodied', '0.00038 gCO₂e'],
              ['R · functional unit', '1 pipeline run'],
            ].map(([k, v]) => (
              <div key={k as string} className="flex justify-between font-mono text-[10px] border-b py-1" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ color: done ? 'var(--text-primary)' : 'var(--text-faint)', transition: 'color 0.4s' }}>{v}</span>
              </div>
            ))}
            <div className="flex justify-between font-mono text-[11px] pt-2">
              <span style={{ color: 'var(--text-muted)' }}>SCI score</span>
              <span style={{ color: done ? 'var(--accent)' : 'var(--text-faint)', transition: 'color 0.4s', fontWeight: 600 }}>
                {done ? '0.804 gCO₂e' : '—'}
              </span>
            </div>
          </div>

          {done && (
            <div className="rounded-lg p-3 font-mono text-[10px] space-y-1" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.3)' }}>
              <div className="text-[9px] uppercase tracking-[0.14em] mb-2" style={{ color: '#4ade80' }}>Deferral Recommendation</div>
              <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>urgency</span><span>LOW (94.2%)</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>target region</span><span>europe-west1</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>target window</span><span>03:00 UTC</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>carbon savings</span><span style={{ color: '#4ade80' }}>−75.3%</span></div>
            </div>
          )}

          {!done && stageIdx === -1 && (
            <p className="font-mono text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              GreenPipe automatically posts a carbon report as a GitLab MR comment after every pipeline. No config needed beyond a webhook.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FAIRLEND MINERS
   ========================================================= */
const FAIRLEND_LINES = [
  { t: 0,    text: '$ spark-submit fairlend.py --dataset=hmda_2023.csv', kind: 'cmd' },
  { t: 400,  text: '[INFO] Loading 4 GB HMDA 2023 national dataset…', kind: 'info' },
  { t: 900,  text: '[INFO] Filtering to Chicago metro area', kind: 'info' },
  { t: 1300, text: '[OK]   103,481 applications retained after cleaning', kind: 'ok' },
  { t: 1800, text: '[INFO] Running equal-frequency binning on income…', kind: 'info' },
  { t: 2300, text: '[BIAS] Standard binning max deviation: 9.63%', kind: 'warn' },
  { t: 2700, text: '[INFO] Running ε-biased fair binning (Asudeh et al.)…', kind: 'info' },
  { t: 3300, text: '[BIAS] Fair binning max deviation: 8.00%', kind: 'ok' },
  { t: 3700, text: '[INFO] Price of Fairness: 29.4%', kind: 'info' },
  { t: 4100, text: '[INFO] Running FP-Growth association rule mining…', kind: 'info' },
  { t: 4600, text: '[RULE] high_DTI → denial  conf=0.672  lift=2.81', kind: 'ok' },
  { t: 5000, text: '[INFO] K-Means clustering audit (k=5)…', kind: 'info' },
  { t: 5500, text: '[FLAG] 10 cases of disparate impact (4/5ths rule)', kind: 'warn' },
  { t: 5900, text: '[INFO] Exporting 3 Parquet files (300K+ records)…', kind: 'info' },
  { t: 6300, text: '✓ Pipeline complete in 4m 12s', kind: 'ok' },
];

export function FairLendWidget() {
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = () => {
    setShown(0);
    setRunning(true);
  };

  useEffect(() => {
    if (!running || shown >= FAIRLEND_LINES.length) {
      if (shown >= FAIRLEND_LINES.length) setRunning(false);
      return;
    }
    const delay = shown === 0 ? 0 : FAIRLEND_LINES[shown].t - FAIRLEND_LINES[shown - 1].t;
    timerRef.current = setTimeout(() => setShown((s) => s + 1), delay);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [running, shown]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const done = shown >= FAIRLEND_LINES.length;
  const COLOR: Record<string, string> = {
    cmd: 'var(--accent)', info: 'var(--text-muted)', ok: '#4ade80', warn: '#fb923c',
  };

  return (
    <div className="glass rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-glass)' }}>
      {/* Chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
          </div>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>fairlend-miners · hmda-2023 · pyspark</span>
        </div>
        <button
          onClick={run}
          disabled={running}
          className="font-mono text-[10px] px-3 py-1.5 rounded-md smooth flex items-center gap-2 uppercase tracking-[0.12em]"
          style={{ background: running ? 'transparent' : 'var(--accent)', color: running ? 'var(--text-muted)' : 'var(--bg)', border: `1px solid ${running ? 'var(--border-strong)' : 'var(--accent)'}` }}
          data-hover>
          {running ? '● running…' : shown === 0 ? '▶ run pipeline' : '↺ re-run'}
        </button>
      </div>

      <div className="grid md:grid-cols-5 gap-0">
        {/* Terminal */}
        <div className="md:col-span-3 p-5 border-b md:border-b-0 md:border-r font-mono text-[11px] leading-6" style={{ borderColor: 'var(--border)', background: 'var(--bg)', minHeight: 320 }}>
          {shown === 0 && !running && (
            <span style={{ color: 'var(--text-faint)' }}>Click <span style={{ color: 'var(--accent)' }}>run pipeline</span> to execute the PySpark job.</span>
          )}
          {FAIRLEND_LINES.slice(0, shown).map((l, i) => (
            <div key={i} style={{ color: COLOR[l.kind] }}>{l.text}</div>
          ))}
          {running && shown < FAIRLEND_LINES.length && (
            <span className="inline-block w-2 h-3.5 align-middle ml-1" style={{ background: 'var(--accent)', animation: 'blink 1s steps(2) infinite' }} />
          )}
        </div>

        {/* Metrics panel */}
        <div className="md:col-span-2 p-5 flex flex-col gap-5">
          {/* Bias comparison */}
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--text-muted)' }}>Binning Bias — Max Demographic Deviation</div>
            <div className="space-y-3">
              {[
                { label: 'Standard Binning', value: 9.63, max: 12, color: '#fb923c' },
                { label: 'Fair Binning (ε-biased)', value: 8.00, max: 12, color: '#4ade80' },
              ].map(({ label, value, max, color }) => (
                <div key={label}>
                  <div className="flex justify-between font-mono text-[10px] mb-1">
                    <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                    <span style={{ color }}>{value.toFixed(2)}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elev)' }}>
                    <div className="h-full rounded-full" style={{
                      width: done ? `${(value / max) * 100}%` : '0%',
                      background: color,
                      transition: 'width 0.9s cubic-bezier(0.23,1,0.32,1) 0.2s',
                    }} />
                  </div>
                </div>
              ))}
              <div className="font-mono text-[10px] pt-1" style={{ color: 'var(--text-faint)' }}>
                Price of Fairness: <span style={{ color: 'var(--text-muted)' }}>29.4%</span> (unequal bin sizes)
              </div>
            </div>
          </div>

          <hr style={{ borderColor: 'var(--border)', borderTopWidth: 1 }} />

          {/* Key findings */}
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--text-muted)' }}>Key Findings</div>
            <div className="space-y-2 font-mono text-[11px]">
              {[
                ['FP-Growth top rule', 'High DTI → denial'],
                ['Confidence', '67.2%'],
                ['Lift', '2.81'],
                ['Disparate impact cases', '10 flagged'],
                ['Legal rule', '4/5ths threshold'],
              ].map(([k, v]) => (
                <div key={k as string} className="flex justify-between border-b py-1" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ color: done ? 'var(--accent)' : 'var(--text-faint)', transition: 'color 0.4s ease' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {done && (
            <div className="font-mono text-[10px] leading-relaxed p-3 rounded-lg" style={{ background: 'var(--accent-soft)', color: 'var(--text-muted)', border: '1px solid var(--accent)' }}>
              <span style={{ color: 'var(--accent)' }}>Finding: </span>
              Black applicants face significantly higher denial rates than White applicants even within financially similar K-Means clusters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function GalaxyXAIWidget() {
  const [method, setMethod] = useState<'gradcam' | 'lime' | 'ig' | 'shap'>('gradcam');
  const [arch, setArch] = useState<'resnet18' | 'vgg16' | 'effnet' | 'custom'>('resnet18');
  const [galaxyType, setGalaxyType] = useState<'featured' | 'smooth'>('featured');
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = () => {
    setPhase('running');
    setProgress(0);
    let p = 0;
    const tick = () => {
      p += Math.random() * 7 + 3;
      if (p >= 100) { setProgress(100); setPhase('done'); return; }
      setProgress(Math.min(p, 100));
      timerRef.current = setTimeout(tick, 70);
    };
    timerRef.current = setTimeout(tick, 80);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const { arm1, arm2 } = useMemo(() => {
    const cx = 190, cy = 125, a = 6, b = 0.22;
    const a1: { x: number; y: number; s: number }[] = [];
    const a2: { x: number; y: number; s: number }[] = [];
    for (let theta = 0.4; theta < 4.2 * Math.PI; theta += 0.18) {
      const r = a * Math.exp(b * theta);
      const s = Math.max(0.7, 2.8 - theta * 0.12);
      a1.push({ x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta), s });
      a2.push({ x: cx + r * Math.cos(theta + Math.PI), y: cy + r * Math.sin(theta + Math.PI), s });
    }
    return { arm1: a1, arm2: a2 };
  }, []);

  const stars = useMemo(() => [
    [12,8],[45,15],[78,23],[15,42],[190,8],[250,18],[320,12],[360,35],[28,70],[380,85],
    [5,110],[392,140],[18,165],[375,180],[35,210],[355,225],[20,245],[370,258],[65,248],
    [320,240],[280,10],[100,5],[155,242],[230,252],[295,235],[68,90],[340,95],[72,185],
    [330,175],[48,130],[348,130],[120,230],[280,228],[95,62],[305,62],[52,175],[348,175],
  ].map(([x, y], i) => ({ x, y, r: [0.8,1.2,0.6,1.0,0.7,1.4][i%6], o: [0.4,0.7,0.5,0.8,0.35,0.6][i%6] })), []);

  const HEATMAPS = {
    gradcam: [
      { cx:190, cy:125, rx:52, ry:40, color:'rgba(239,68,68,0.72)' },
      { cx:138, cy:75,  rx:28, ry:22, color:'rgba(251,146,60,0.60)' },
      { cx:248, cy:178, rx:26, ry:20, color:'rgba(251,146,60,0.55)' },
      { cx:190, cy:125, rx:95, ry:72, color:'rgba(99,102,241,0.18)' },
    ],
    lime: [
      { cx:162, cy:100, rx:42, ry:32, color:'rgba(239,68,68,0.65)' },
      { cx:218, cy:150, rx:42, ry:32, color:'rgba(239,68,68,0.60)' },
      { cx:138, cy:150, rx:36, ry:28, color:'rgba(251,146,60,0.50)' },
      { cx:244, cy:100, rx:36, ry:28, color:'rgba(251,146,60,0.45)' },
      { cx:190, cy:125, rx:24, ry:18, color:'rgba(250,204,21,0.62)' },
    ],
    ig: [
      { cx:190, cy:125, rx:28, ry:21, color:'rgba(239,68,68,0.82)' },
      { cx:168, cy:103, rx:15, ry:11, color:'rgba(239,68,68,0.72)' },
      { cx:213, cy:148, rx:15, ry:11, color:'rgba(239,68,68,0.68)' },
      { cx:148, cy:80,  rx:11, ry:9,  color:'rgba(251,146,60,0.58)' },
      { cx:234, cy:172, rx:11, ry:9,  color:'rgba(251,146,60,0.52)' },
      { cx:128, cy:58,  rx:9,  ry:7,  color:'rgba(251,146,60,0.42)' },
    ],
    shap: [
      { cx:190, cy:125, rx:72, ry:56, color:'rgba(239,68,68,0.45)' },
      { cx:162, cy:97,  rx:46, ry:36, color:'rgba(239,68,68,0.56)' },
      { cx:220, cy:156, rx:46, ry:36, color:'rgba(251,146,60,0.50)' },
      { cx:140, cy:148, rx:30, ry:24, color:'rgba(251,146,60,0.40)' },
      { cx:240, cy:106, rx:30, ry:24, color:'rgba(250,204,21,0.36)' },
      { cx:190, cy:125, rx:125, ry:95, color:'rgba(99,102,241,0.15)' },
    ],
  } as const;

  const SMOOTH_HEATMAPS = {
    gradcam: [{ cx:190, cy:125, rx:58, ry:44, color:'rgba(239,68,68,0.78)' }, { cx:190, cy:125, rx:95, ry:72, color:'rgba(251,146,60,0.28)' }],
    lime:    [{ cx:190, cy:125, rx:62, ry:48, color:'rgba(239,68,68,0.70)' }, { cx:190, cy:125, rx:105, ry:80, color:'rgba(99,102,241,0.22)' }],
    ig:      [{ cx:190, cy:125, rx:40, ry:30, color:'rgba(239,68,68,0.84)' }, { cx:190, cy:125, rx:68, ry:52, color:'rgba(251,146,60,0.48)' }],
    shap:    [{ cx:190, cy:125, rx:82, ry:62, color:'rgba(239,68,68,0.52)' }, { cx:190, cy:125, rx:135, ry:104, color:'rgba(99,102,241,0.18)' }],
  } as const;

  const METRICS: Record<string, Record<string, [number,number,number,number]>> = {
    gradcam: { resnet18:[0.32,0.71,0.97,0.61], vgg16:[0.38,0.68,0.94,0.58], effnet:[0.35,0.72,0.95,0.63], custom:[0.44,0.64,0.90,0.54] },
    lime:    { resnet18:[0.47,0.76,0.88,0.73], vgg16:[0.51,0.73,0.85,0.70], effnet:[0.45,0.78,0.86,0.75], custom:[0.56,0.70,0.81,0.68] },
    ig:      { resnet18:[0.41,0.82,0.92,0.68], vgg16:[0.45,0.79,0.89,0.65], effnet:[0.39,0.84,0.91,0.70], custom:[0.49,0.76,0.86,0.63] },
    shap:    { resnet18:[0.36,0.89,0.93,0.76], vgg16:[0.40,0.86,0.90,0.73], effnet:[0.34,0.91,0.92,0.78], custom:[0.45,0.83,0.87,0.71] },
  };

  const ACCURACY: Record<string, string> = { resnet18:'96.1%', vgg16:'93.4%', effnet:'94.8%', custom:'88.6%' };
  const METHOD_INFO: Record<string, string> = {
    gradcam: 'Grad-CAM backpropagates through the last conv layer to localize class-discriminative regions.',
    lime:    'LIME perturbs superpixel segments and fits a local linear surrogate model per prediction.',
    ig:      'Integrated Gradients accumulates gradients along the path from a baseline to the input.',
    shap:    'GradientSHAP combines SHAP values with expected gradient attribution for precise localization.',
  };

  const currentHeatmap = (galaxyType === 'smooth' ? SMOOTH_HEATMAPS : HEATMAPS)[method];
  const [del, ins, con, spa] = METRICS[method][arch];
  const statusColor = phase === 'idle' ? 'var(--text-muted)' : phase === 'running' ? 'var(--accent)' : '#4ade80';

  return (
    <div className="glass rounded-2xl overflow-hidden relative" style={{ boxShadow: 'var(--shadow-glass)' }}>
      {/* Chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
          </div>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>galaxy-xai · morphology-classifier · v1.0</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: statusColor, boxShadow: `0 0 8px ${statusColor}` }} />
          <span style={{ color: statusColor, letterSpacing: '0.06em' }}>
            {phase === 'idle' ? 'READY' : phase === 'running' ? 'CLASSIFYING' : 'EXPLAINED'}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-0">
        {/* Galaxy visualization */}
        <div className="md:col-span-3 relative border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)', background: '#040410' }}>
          <svg viewBox="0 0 380 250" className="w-full" style={{ maxHeight: 340 }}>
            <defs>
              <filter id="gxai-glow">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="gxai-hmap"><feGaussianBlur stdDeviation="13" /></filter>
              <radialGradient id="gxai-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,235,185,1)" />
                <stop offset="40%" stopColor="rgba(200,165,105,0.55)" />
                <stop offset="100%" stopColor="rgba(80,50,20,0)" />
              </radialGradient>
              <radialGradient id="gxai-smooth" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(235,225,205,1)" />
                <stop offset="35%" stopColor="rgba(185,165,135,0.5)" />
                <stop offset="100%" stopColor="rgba(80,70,50,0)" />
              </radialGradient>
            </defs>

            <rect width="380" height="250" fill="#040410" />
            {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={`rgba(255,255,255,${s.o})`} />)}

            {/* Heatmap */}
            {phase !== 'idle' && (
              <g filter="url(#gxai-hmap)">
                {currentHeatmap.map((h, i) => (
                  <ellipse key={i} cx={h.cx} cy={h.cy} rx={h.rx} ry={h.ry}
                    fill={h.color}
                    opacity={phase === 'running' ? (progress / 100) : 1}
                    style={{ transition: 'opacity 0.35s ease' }}
                  />
                ))}
              </g>
            )}

            {/* Spiral arms (featured) */}
            {galaxyType === 'featured' && arm1.map((p, i) => (
              <circle key={`a1-${i}`} cx={p.x} cy={p.y} r={p.s} fill={`rgba(205,175,120,${0.28 + (1 - i / arm1.length) * 0.42})`} />
            ))}
            {galaxyType === 'featured' && arm2.map((p, i) => (
              <circle key={`a2-${i}`} cx={p.x} cy={p.y} r={p.s} fill={`rgba(185,155,100,${0.28 + (1 - i / arm2.length) * 0.42})`} />
            ))}
            {galaxyType === 'smooth' && <ellipse cx="190" cy="125" rx="82" ry="56" fill="rgba(200,188,160,0.07)" />}

            {/* Core */}
            <ellipse cx="190" cy="125"
              rx={galaxyType === 'smooth' ? 56 : 22}
              ry={galaxyType === 'smooth' ? 38 : 14}
              fill={`url(#gxai-${galaxyType === 'smooth' ? 'smooth' : 'core'})`}
              filter="url(#gxai-glow)"
              style={{ transition: 'all 0.8s cubic-bezier(0.23,1,0.32,1)' }}
            />
            <ellipse cx="190" cy="125"
              rx={galaxyType === 'smooth' ? 20 : 7}
              ry={galaxyType === 'smooth' ? 14 : 5}
              fill="rgba(255,245,215,0.95)"
            />

            {/* Scan line */}
            {phase === 'running' && (
              <line x1="0" y1={250 * (1 - progress / 100)} x2="380" y2={250 * (1 - progress / 100)}
                stroke="var(--accent)" strokeWidth="1.5" opacity="0.6"
                style={{ transition: 'y1 0.15s ease, y2 0.15s ease' }}
              />
            )}

            {/* Done badge */}
            {phase === 'done' && (
              <g>
                <rect x="8" y="218" width="200" height="24" rx="3" fill="rgba(4,4,16,0.85)" />
                <text x="16" y="229" fontFamily="JetBrains Mono,monospace" fontSize="8.5" fill="#4ade80">
                  ✓ {galaxyType === 'featured' ? 'FEATURED · SPIRAL GALAXY' : 'SMOOTH · ELLIPTICAL GALAXY'}
                </text>
                <text x="16" y="238" fontFamily="JetBrains Mono,monospace" fontSize="7.5" fill="rgba(180,180,180,0.65)">
                  {ACCURACY[arch]} · {arch === 'resnet18' ? 'ResNet-18' : arch === 'vgg16' ? 'VGG-16' : arch === 'effnet' ? 'EfficientNet-B0' : 'Custom CNN'}
                </text>
              </g>
            )}
          </svg>

          {/* Heatmap scale */}
          {phase === 'done' && (
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <span className="font-mono text-[8px]" style={{ color: 'rgba(255,255,255,0.35)' }}>low</span>
              <div style={{ width: 56, height: 5, borderRadius: 3, background: 'linear-gradient(to right,rgba(99,102,241,0.7),rgba(251,146,60,0.85),rgba(239,68,68,0.95))' }} />
              <span className="font-mono text-[8px]" style={{ color: 'rgba(255,255,255,0.35)' }}>high</span>
            </div>
          )}
        </div>

        {/* Controls + metrics */}
        <div className="md:col-span-2 p-5 flex flex-col gap-4">
          {/* Galaxy type */}
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--text-muted)' }}>Galaxy Type</div>
            <div className="flex gap-1.5">
              {(['featured', 'smooth'] as const).map((t) => (
                <button key={t} onClick={() => { setGalaxyType(t); setPhase('idle'); setProgress(0); }}
                  className="flex-1 font-mono text-[10px] py-1.5 rounded-md uppercase tracking-[0.10em] smooth"
                  style={{ background: galaxyType === t ? 'var(--accent)' : 'var(--bg-elev)', color: galaxyType === t ? 'var(--bg)' : 'var(--text-muted)', border: `1px solid ${galaxyType === t ? 'var(--accent)' : 'var(--border-strong)'}` }}
                  data-hover>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--text-muted)' }}>Architecture</div>
            <div className="grid grid-cols-2 gap-1">
              {([['resnet18','ResNet-18'],['vgg16','VGG-16'],['effnet','EffNet-B0'],['custom','Custom CNN']] as [string,string][]).map(([k,label]) => (
                <button key={k} onClick={() => setArch(k as typeof arch)}
                  className="font-mono text-[10px] py-1.5 rounded-md smooth"
                  style={{ background: arch === k ? 'var(--accent-soft)' : 'var(--bg-elev)', color: arch === k ? 'var(--accent)' : 'var(--text-muted)', border: `1px solid ${arch === k ? 'var(--accent)' : 'var(--border)'}` }}
                  data-hover>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* XAI Method */}
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--text-muted)' }}>XAI Method</div>
            <div className="grid grid-cols-2 gap-1">
              {([['gradcam','Grad-CAM'],['lime','LIME'],['ig','Int. Grads'],['shap','Grad-SHAP']] as [string,string][]).map(([k,label]) => (
                <button key={k} onClick={() => setMethod(k as typeof method)}
                  className="font-mono text-[10px] py-1.5 rounded-md smooth"
                  style={{ background: method === k ? 'var(--accent-soft)' : 'var(--bg-elev)', color: method === k ? 'var(--accent)' : 'var(--text-muted)', border: `1px solid ${method === k ? 'var(--accent)' : 'var(--border)'}` }}
                  data-hover>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Run button */}
          <button
            onClick={phase !== 'running' ? run : undefined}
            disabled={phase === 'running'}
            className="w-full py-2.5 rounded-md font-mono text-[11px] uppercase tracking-[0.14em] smooth flex items-center justify-center gap-2"
            style={{ background: phase === 'running' ? 'var(--bg-elev)' : 'var(--accent)', color: phase === 'running' ? 'var(--text-muted)' : 'var(--bg)', border: `1px solid ${phase === 'running' ? 'var(--border-strong)' : 'var(--accent)'}` }}
            data-hover>
            {phase === 'running' ? `analyzing… ${Math.round(progress)}%` : phase === 'done' ? '↺ re-run explainer' : '▶ run explainer'}
          </button>

          {/* Metrics / idle hint */}
          {phase === 'done' ? (
            <div className="space-y-1">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] pb-1 border-b" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>Faithfulness Metrics</div>
              {([['Deletion AUC ↓', del.toFixed(2), del <= 0.36], ['Insertion AUC ↑', ins.toFixed(2), ins >= 0.86], ['Consistency ↑', con.toFixed(2), con >= 0.95], ['Sparsity ↑', spa.toFixed(2), spa >= 0.73]] as [string,string,boolean][]).map(([k,v,best]) => (
                <div key={k} className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.10em]" style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span className="font-mono" style={{ color: best ? '#4ade80' : 'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
              <p className="font-mono text-[9px] pt-1 leading-relaxed" style={{ color: 'var(--text-faint)' }}>
                {METHOD_INFO[method]}
              </p>
            </div>
          ) : (
            <p className="font-mono text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Select a galaxy type, architecture, and XAI method. Run the explainer to overlay attention heatmaps and see faithfulness scores.
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 w-full" style={{ background: 'var(--border)' }}>
        <div className="h-full" style={{
          width: `${phase === 'done' ? 100 : progress}%`,
          background: phase === 'done' ? '#4ade80' : 'var(--accent)',
          transition: 'width 0.2s ease, background 0.4s ease',
        }} />
      </div>
    </div>
  );
}

/* =========================================================
   RELFAIR — relationship-aware counterfactual fairness
   ========================================================= */
type RFNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  protected?: boolean;
  root?: boolean;
};

const RF_NODES: RFNode[] = [
  { id: 'sex',          label: 'sex',          x: 50,  y: 40,  protected: true, root: true },
  { id: 'age',          label: 'age',          x: 50,  y: 130, root: true },
  { id: 'relationship', label: 'relationship', x: 180, y: 40 },
  { id: 'occupation',   label: 'occupation',   x: 180, y: 130 },
  { id: 'hours',        label: 'hours/wk',     x: 180, y: 200 },
  { id: 'income',       label: 'income',       x: 310, y: 85 },
];

const RF_EDGES: [string, string][] = [
  ['sex', 'relationship'],
  ['sex', 'occupation'],
  ['age', 'occupation'],
  ['age', 'hours'],
  ['relationship', 'income'],
  ['occupation', 'income'],
  ['hours', 'income'],
];

const RF_DATASETS = {
  adult:    { label: 'Adult',         naive: 7.0,  rel: 24.3, lift: '+17.2 pp', n: '3,682 rows' },
  acs:      { label: 'ACS Income CA', naive: 7.5,  rel: 34.5, lift: '+27.0 pp (4.6×)', n: '5,241 rows' },
  german:   { label: 'German Credit', naive: 4.9,  rel: 13.2, lift: '+8.3 pp', n: '144 rows' },
} as const;
type RFDataset = keyof typeof RF_DATASETS;

const RF_SAMPLE_ROW = {
  sex: 'Male',
  age: 41,
  relationship: 'Husband',
  occupation: 'Exec-managerial',
  hours: 50,
  income: '>50K',
};

export function RelFairWidget() {
  const [dataset, setDataset] = useState<RFDataset>('adult');
  const [mode, setMode] = useState<'naive' | 'relaware'>('relaware');
  const [phase, setPhase] = useState<'idle' | 'flipping' | 'done'>('idle');
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('idle');
    setActiveNodes(new Set());
  };

  const flip = () => {
    reset();
    setPhase('flipping');
    const order = mode === 'naive'
      ? ['sex']
      : ['sex', 'relationship', 'occupation', 'income'];
    const activate = (i: number) => {
      if (i >= order.length) {
        setPhase('done');
        return;
      }
      setActiveNodes((prev) => new Set([...prev, order[i]]));
      timerRef.current = setTimeout(() => activate(i + 1), 550);
    };
    timerRef.current = setTimeout(() => activate(0), 250);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);
  useEffect(() => { reset(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [mode, dataset]);

  const ds = RF_DATASETS[dataset];

  const flipped = phase !== 'idle';
  const isNaive = mode === 'naive';

  const afterRow = (() => {
    if (!flipped) return null;
    if (isNaive) {
      return { ...RF_SAMPLE_ROW, sex: 'Female' };
    }
    return {
      ...RF_SAMPLE_ROW,
      sex: 'Female',
      relationship: activeNodes.has('relationship') ? 'Wife' : RF_SAMPLE_ROW.relationship,
      occupation: activeNodes.has('occupation') ? 'Adm-clerical' : RF_SAMPLE_ROW.occupation,
      income: activeNodes.has('income') ? '≤50K' : RF_SAMPLE_ROW.income,
    };
  })();

  const constraintViolation = isNaive && phase === 'done';

  return (
    <div className="glass rounded-2xl overflow-hidden relative" style={{ boxShadow: 'var(--shadow-glass)' }}>
      {/* Chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
          </div>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>relfair · counterfactual fairness · v0.1.0</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>
          <span>dataset · {ds.label}</span>
          <span style={{ color: 'var(--text-faint)' }}>·</span>
          <span>{ds.n}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-0">
        {/* Causal DAG */}
        <div className="md:col-span-3 relative border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          <svg viewBox="0 0 380 250" className="w-full" style={{ maxHeight: 340 }}>
            <defs>
              <marker id="rf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-strong)" />
              </marker>
              <marker id="rf-arrow-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
              </marker>
            </defs>

            {/* Edges */}
            {RF_EDGES.map(([a, b], i) => {
              const na = RF_NODES.find((n) => n.id === a)!;
              const nb = RF_NODES.find((n) => n.id === b)!;
              const isProp = mode === 'relaware' && activeNodes.has(a) && activeNodes.has(b);
              const isBlocked = mode === 'naive' && a === 'sex' && phase === 'done';
              return (
                <g key={i}>
                  <line
                    x1={na.x + 36} y1={na.y}
                    x2={nb.x - 36} y2={nb.y}
                    stroke={isProp ? 'var(--accent)' : isBlocked ? '#ef4444' : 'var(--border-strong)'}
                    strokeWidth={isProp ? 1.6 : 0.8}
                    strokeDasharray={isBlocked ? '3 2' : 'none'}
                    markerEnd={isProp ? 'url(#rf-arrow-active)' : 'url(#rf-arrow)'}
                    opacity={isBlocked ? 0.7 : 1}
                    style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                  />
                  {isBlocked && (
                    <text x={(na.x + nb.x) / 2} y={(na.y + nb.y) / 2 - 4}
                      fontFamily="JetBrains Mono,monospace" fontSize="7.5" fill="#ef4444" textAnchor="middle">
                      ✗ off-manifold
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {RF_NODES.map((n) => {
              const active = activeNodes.has(n.id);
              const fill = n.protected ? (active ? '#ef4444' : 'rgba(239,68,68,0.15)') : (active ? 'var(--accent)' : 'var(--bg-elev)');
              const stroke = n.protected ? '#ef4444' : (active ? 'var(--accent)' : 'var(--border-strong)');
              const textFill = active ? '#fff' : 'var(--text-primary)';
              return (
                <g key={n.id} style={{ transition: 'all 0.4s' }}>
                  {active && (
                    <ellipse cx={n.x} cy={n.y} rx="42" ry="20"
                      fill={n.protected ? 'rgba(239,68,68,0.18)' : 'var(--accent-soft)'}
                      style={{ animation: 'rf-pulse 1.4s ease-out infinite' }} />
                  )}
                  <rect x={n.x - 36} y={n.y - 13} width="72" height="26" rx="13"
                    fill={fill} stroke={stroke} strokeWidth={active ? 1.6 : 1}
                    style={{ transition: 'fill 0.4s, stroke 0.4s' }} />
                  <text x={n.x} y={n.y + 3.5}
                    fontFamily="JetBrains Mono,monospace" fontSize="9.5"
                    fill={textFill} textAnchor="middle"
                    style={{ transition: 'fill 0.3s' }}>
                    {n.label}
                  </text>
                </g>
              );
            })}

            <style>{`
              @keyframes rf-pulse {
                0%   { transform: scale(0.85); opacity: 0.7; transform-origin: center; }
                100% { transform: scale(1.25); opacity: 0; transform-origin: center; }
              }
            `}</style>
          </svg>

          {/* Row diff table */}
          <div className="px-4 pb-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>
              sample row · intervention: sex → Female
            </div>
            <div className="rounded-md overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div className="grid grid-cols-7 font-mono text-[9px] uppercase tracking-[0.10em] px-2 py-1.5" style={{ background: 'var(--bg-elev)', color: 'var(--text-muted)' }}>
                <span>row</span>
                <span>sex</span>
                <span>age</span>
                <span>relationship</span>
                <span>occupation</span>
                <span>hours</span>
                <span>income</span>
              </div>
              <div className="grid grid-cols-7 font-mono text-[10px] px-2 py-1.5 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                <span>original</span>
                <span>{RF_SAMPLE_ROW.sex}</span>
                <span>{RF_SAMPLE_ROW.age}</span>
                <span>{RF_SAMPLE_ROW.relationship}</span>
                <span>{RF_SAMPLE_ROW.occupation}</span>
                <span>{RF_SAMPLE_ROW.hours}</span>
                <span>{RF_SAMPLE_ROW.income}</span>
              </div>
              <div className="grid grid-cols-7 font-mono text-[10px] px-2 py-1.5 border-t items-center"
                style={{ borderColor: 'var(--border)', color: flipped ? 'var(--text-primary)' : 'var(--text-faint)', background: constraintViolation ? 'rgba(239,68,68,0.06)' : 'transparent' }}>
                <span style={{ color: flipped ? 'var(--accent)' : 'var(--text-faint)' }}>{isNaive ? 'naive' : 'rel-aware'}</span>
                <span style={{ color: flipped ? '#ef4444' : 'inherit' }}>{afterRow ? afterRow.sex : '—'}</span>
                <span>{afterRow ? afterRow.age : '—'}</span>
                <span style={{ color: afterRow && afterRow.relationship !== RF_SAMPLE_ROW.relationship ? 'var(--accent)' : (constraintViolation ? '#ef4444' : 'inherit') }}>
                  {afterRow ? afterRow.relationship : '—'}
                </span>
                <span style={{ color: afterRow && afterRow.occupation !== RF_SAMPLE_ROW.occupation ? 'var(--accent)' : 'inherit' }}>
                  {afterRow ? afterRow.occupation : '—'}
                </span>
                <span>{afterRow ? afterRow.hours : '—'}</span>
                <span style={{ color: afterRow && afterRow.income !== RF_SAMPLE_ROW.income ? 'var(--accent)' : 'inherit' }}>
                  {afterRow ? afterRow.income : '—'}
                </span>
              </div>
            </div>
            {constraintViolation && (
              <div className="font-mono text-[10px] mt-2 leading-relaxed" style={{ color: '#ef4444' }}>
                ✗ constraint violation · sex=Female + relationship=Husband never occurs in training data → prediction is off-manifold and silently absorbs bias.
              </div>
            )}
            {!isNaive && phase === 'done' && (
              <div className="font-mono text-[10px] mt-2 leading-relaxed" style={{ color: '#4ade80' }}>
                ✓ propagated through DAG · row stays on the data manifold · the model now sees a coherent counterfactual.
              </div>
            )}
          </div>
        </div>

        {/* Controls + metrics */}
        <div className="md:col-span-2 p-5 flex flex-col gap-4">
          {/* Dataset */}
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--text-muted)' }}>Dataset</div>
            <div className="grid grid-cols-3 gap-1">
              {(Object.entries(RF_DATASETS) as [RFDataset, typeof RF_DATASETS[RFDataset]][]).map(([k, v]) => (
                <button key={k} onClick={() => setDataset(k)}
                  className="font-mono text-[10px] py-1.5 rounded-md smooth"
                  style={{
                    background: dataset === k ? 'var(--accent-soft)' : 'var(--bg-elev)',
                    color: dataset === k ? 'var(--accent)' : 'var(--text-muted)',
                    border: `1px solid ${dataset === k ? 'var(--accent)' : 'var(--border)'}`,
                  }}
                  data-hover>
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--text-muted)' }}>Intervention Mode</div>
            <div className="grid grid-cols-2 gap-1">
              {(['naive', 'relaware'] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className="font-mono text-[10px] py-1.5 rounded-md smooth uppercase tracking-[0.10em]"
                  style={{
                    background: mode === m ? 'var(--accent)' : 'var(--bg-elev)',
                    color: mode === m ? 'var(--bg)' : 'var(--text-muted)',
                    border: `1px solid ${mode === m ? 'var(--accent)' : 'var(--border-strong)'}`,
                  }}
                  data-hover>
                  {m === 'naive' ? 'Naive Flip' : 'Rel-Aware'}
                </button>
              ))}
            </div>
            <p className="font-mono text-[9px] leading-relaxed mt-2" style={{ color: 'var(--text-faint)' }}>
              {mode === 'naive'
                ? 'Flips only the protected attribute. Downstream variables stay → row lands off the data manifold.'
                : 'Propagates the flip through the causal DAG. Downstream values update to stay coherent.'}
            </p>
          </div>

          {/* Run */}
          <button
            onClick={phase === 'flipping' ? undefined : flip}
            disabled={phase === 'flipping'}
            className="w-full py-2.5 rounded-md font-mono text-[11px] uppercase tracking-[0.14em] smooth"
            style={{
              background: phase === 'flipping' ? 'var(--bg-elev)' : 'var(--accent)',
              color: phase === 'flipping' ? 'var(--text-muted)' : 'var(--bg)',
              border: `1px solid ${phase === 'flipping' ? 'var(--border-strong)' : 'var(--accent)'}`,
            }}
            data-hover>
            {phase === 'flipping' ? 'propagating…' : phase === 'done' ? '↺ re-run intervention' : '▶ flip sex → female'}
          </button>

          {/* Stats */}
          <div className="rounded-lg p-3" style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-2.5" style={{ color: 'var(--text-muted)' }}>
              Flip rate · {ds.label}
            </div>
            {[
              { label: 'Naive', value: ds.naive, color: '#ef4444' },
              { label: 'Rel-aware', value: ds.rel, color: '#4ade80' },
            ].map(({ label, value, color }) => (
              <div key={label} className="mb-2 last:mb-0">
                <div className="flex justify-between font-mono text-[10px] mb-1">
                  <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                  <span style={{ color }}>{value.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg)' }}>
                  <div className="h-full rounded-full" style={{
                    width: `${(value / 40) * 100}%`,
                    background: color,
                    transition: 'width 0.9s cubic-bezier(0.23,1,0.32,1)',
                  }} />
                </div>
              </div>
            ))}
            <div className="flex justify-between font-mono text-[10px] pt-2 mt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Detection lift</span>
              <span style={{ color: 'var(--accent)' }}>{ds.lift}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LATTICE — venture intelligence graph + AI brief
   ========================================================= */
type LTNode = {
  id: string;
  label: string;
  kind: 'founder' | 'company' | 'investor' | 'lp';
  x: number;
  y: number;
};

const LT_NODES: LTNode[] = [
  { id: 'sarah',     label: 'Sarah Chen',     kind: 'founder', x: 70,  y: 130 },
  { id: 'inferon',   label: 'Inferon AI',     kind: 'company', x: 150, y: 90 },
  { id: 'helix',     label: 'Helix Bio',      kind: 'company', x: 150, y: 175 },
  { id: 'a16z',      label: 'a16z',           kind: 'investor', x: 250, y: 50 },
  { id: 'sequoia',   label: 'Sequoia',        kind: 'investor', x: 250, y: 130 },
  { id: 'lux',       label: 'Lux Capital',    kind: 'investor', x: 250, y: 210 },
  { id: 'marcus',    label: 'Marcus Liu',     kind: 'founder', x: 150, y: 30 },
  { id: 'ada',       label: 'Ada Park',       kind: 'founder', x: 70,  y: 60 },
  { id: 'norges',    label: 'Norges Bank',    kind: 'lp',      x: 340, y: 90 },
  { id: 'yale',      label: 'Yale Endow.',    kind: 'lp',      x: 340, y: 175 },
];

const LT_EDGES: { a: string; b: string; w: number; kind: string }[] = [
  { a: 'sarah',    b: 'inferon', w: 0.95, kind: 'founded' },
  { a: 'ada',      b: 'inferon', w: 0.85, kind: 'co-founded' },
  { a: 'marcus',   b: 'helix',   w: 0.92, kind: 'founded' },
  { a: 'a16z',     b: 'inferon', w: 0.88, kind: 'led seed' },
  { a: 'sequoia',  b: 'inferon', w: 0.72, kind: 'series A' },
  { a: 'sequoia',  b: 'helix',   w: 0.81, kind: 'led seed' },
  { a: 'lux',      b: 'helix',   w: 0.65, kind: 'series A' },
  { a: 'a16z',     b: 'marcus',  w: 0.55, kind: 'advisor' },
  { a: 'norges',   b: 'a16z',    w: 0.70, kind: 'LP' },
  { a: 'norges',   b: 'sequoia', w: 0.78, kind: 'LP' },
  { a: 'yale',     b: 'sequoia', w: 0.74, kind: 'LP' },
  { a: 'yale',     b: 'lux',     w: 0.68, kind: 'LP' },
  { a: 'sarah',    b: 'marcus',  w: 0.42, kind: 'stanford' },
];

const LT_COLORS = {
  founder:  '#a78bfa',
  company:  '#60a5fa',
  investor: '#fbbf24',
  lp:       '#34d399',
} as const;

const LT_BRIEF_LINES: { delay: number; text: string; kind: 'header' | 'body' | 'highlight' | 'q' }[] = [
  { delay: 0,    text: '## Meeting Brief — Sarah Chen × Inferon AI',                              kind: 'header' },
  { delay: 380,  text: '',                                                                         kind: 'body' },
  { delay: 420,  text: 'Background',                                                               kind: 'header' },
  { delay: 700,  text: 'Founder/CEO Inferon AI · Stanford ML PhD ·',                              kind: 'body' },
  { delay: 950,  text: 'prior: research scientist at DeepMind (2021–2024)',                       kind: 'body' },
  { delay: 1250, text: '',                                                                         kind: 'body' },
  { delay: 1320, text: 'Warm intro paths (2 found)',                                              kind: 'header' },
  { delay: 1620, text: '→ via Marcus Liu (Stanford ML cohort · advisor a16z)',                    kind: 'highlight' },
  { delay: 1900, text: '→ via a16z portfolio overlap (you co-invested seed)',                     kind: 'highlight' },
  { delay: 2200, text: '',                                                                         kind: 'body' },
  { delay: 2280, text: 'Portfolio overlap with our thesis',                                       kind: 'header' },
  { delay: 2580, text: '3 portfolio companies in inference infra · last 18mo',                    kind: 'body' },
  { delay: 2860, text: '',                                                                         kind: 'body' },
  { delay: 2920, text: 'Diligence questions',                                                     kind: 'header' },
  { delay: 3200, text: 'Q1. moat vs Modal/Replicate on cold-start latency?',                      kind: 'q' },
  { delay: 3520, text: 'Q2. unit economics at >100M token/day throughput?',                       kind: 'q' },
  { delay: 3820, text: 'Q3. retention risk if AWS Bedrock undercuts pricing?',                    kind: 'q' },
  { delay: 4180, text: '',                                                                         kind: 'body' },
  { delay: 4240, text: '✓ brief generated · 1,284 tokens · 1.7s',                                 kind: 'highlight' },
];

export function LatticeWidget() {
  const [selected, setSelected] = useState<string | null>('sarah');
  const [target, setTarget] = useState<string | null>(null);
  const [pathMode, setPathMode] = useState(false);
  const [briefIdx, setBriefIdx] = useState(0);
  const [briefRunning, setBriefRunning] = useState(false);
  const briefTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateBrief = () => {
    if (briefTimer.current) clearTimeout(briefTimer.current);
    setBriefIdx(0);
    setBriefRunning(true);
  };

  useEffect(() => {
    if (!briefRunning) return;
    if (briefIdx >= LT_BRIEF_LINES.length) {
      setBriefRunning(false);
      return;
    }
    const delay = briefIdx === 0 ? 100 : LT_BRIEF_LINES[briefIdx].delay - LT_BRIEF_LINES[briefIdx - 1].delay;
    briefTimer.current = setTimeout(() => setBriefIdx((n) => n + 1), delay);
    return () => { if (briefTimer.current) clearTimeout(briefTimer.current); };
  }, [briefIdx, briefRunning]);

  useEffect(() => () => { if (briefTimer.current) clearTimeout(briefTimer.current); }, []);

  // Compute BFS shortest path
  const shortestPath = useMemo<string[]>(() => {
    if (!pathMode || !selected || !target || selected === target) return [];
    const adj: Record<string, string[]> = {};
    LT_EDGES.forEach(({ a, b }) => {
      (adj[a] ||= []).push(b);
      (adj[b] ||= []).push(a);
    });
    const q: string[][] = [[selected]];
    const seen = new Set([selected]);
    while (q.length) {
      const path = q.shift()!;
      const last = path[path.length - 1];
      if (last === target) return path;
      for (const n of adj[last] || []) {
        if (!seen.has(n)) {
          seen.add(n);
          q.push([...path, n]);
        }
      }
    }
    return [];
  }, [pathMode, selected, target]);

  const pathSet = new Set(shortestPath);
  const pathEdges = new Set<string>();
  for (let i = 0; i < shortestPath.length - 1; i++) {
    pathEdges.add([shortestPath[i], shortestPath[i + 1]].sort().join('|'));
  }

  const handleNodeClick = (id: string) => {
    if (pathMode) {
      if (!selected) { setSelected(id); return; }
      if (selected === id) { setTarget(null); return; }
      setTarget(id);
    } else {
      setSelected(id);
      setTarget(null);
    }
  };

  const selectedNode = LT_NODES.find((n) => n.id === selected);
  const neighbors = LT_EDGES
    .filter((e) => e.a === selected || e.b === selected)
    .map((e) => ({ id: e.a === selected ? e.b : e.a, kind: e.kind, w: e.w }));

  const BRIEF_COLOR: Record<string, string> = {
    header: 'var(--accent)',
    body: 'var(--text-primary)',
    highlight: '#4ade80',
    q: 'var(--text-muted)',
  };

  return (
    <div className="glass rounded-2xl overflow-hidden relative" style={{ boxShadow: 'var(--shadow-glass)' }}>
      {/* Chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
          </div>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>lattice · venture intelligence · neo4j</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => { setPathMode(false); setTarget(null); }}
            className="font-mono text-[10px] px-2.5 py-1 rounded smooth uppercase tracking-[0.10em]"
            style={{
              background: !pathMode ? 'var(--accent-soft)' : 'transparent',
              color: !pathMode ? 'var(--accent)' : 'var(--text-muted)',
              border: `1px solid ${!pathMode ? 'var(--accent)' : 'var(--border)'}`,
            }} data-hover>
            explore
          </button>
          <button onClick={() => { setPathMode(true); setTarget(null); }}
            className="font-mono text-[10px] px-2.5 py-1 rounded smooth uppercase tracking-[0.10em]"
            style={{
              background: pathMode ? 'var(--accent-soft)' : 'transparent',
              color: pathMode ? 'var(--accent)' : 'var(--text-muted)',
              border: `1px solid ${pathMode ? 'var(--accent)' : 'var(--border)'}`,
            }} data-hover>
            warm intro
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-0">
        {/* Graph */}
        <div className="md:col-span-3 relative border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          <svg viewBox="0 0 400 260" className="w-full" style={{ maxHeight: 360 }}>
            <defs>
              <radialGradient id="lt-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Edges */}
            {LT_EDGES.map((e, i) => {
              const a = LT_NODES.find((n) => n.id === e.a)!;
              const b = LT_NODES.find((n) => n.id === e.b)!;
              const key = [e.a, e.b].sort().join('|');
              const onPath = pathEdges.has(key);
              const adjacent = !pathMode && (e.a === selected || e.b === selected);
              return (
                <line key={i}
                  x1={a.x} y1={a.y}
                  x2={b.x} y2={b.y}
                  stroke={onPath ? 'var(--accent)' : adjacent ? 'var(--accent)' : 'var(--border-strong)'}
                  strokeWidth={onPath ? 2.2 : adjacent ? 1.4 : e.w * 0.8}
                  opacity={onPath ? 1 : adjacent ? 0.9 : pathMode ? 0.25 : 0.45}
                  strokeDasharray={onPath ? '0' : 'none'}
                  style={{ transition: 'all 0.4s' }} />
              );
            })}

            {/* Animated path pulse */}
            {pathMode && shortestPath.length > 1 && (
              <g>
                {shortestPath.slice(0, -1).map((id, i) => {
                  const a = LT_NODES.find((n) => n.id === id)!;
                  const b = LT_NODES.find((n) => n.id === shortestPath[i + 1])!;
                  return (
                    <circle key={i} r="3" fill="var(--accent)">
                      <animateMotion dur="1.6s" repeatCount="indefinite"
                        path={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} />
                    </circle>
                  );
                })}
              </g>
            )}

            {/* Nodes */}
            {LT_NODES.map((n) => {
              const isSel = n.id === selected;
              const isTarget = n.id === target;
              const onPath = pathSet.has(n.id);
              const dim = pathMode && !onPath;
              const color = LT_COLORS[n.kind];
              const r = isSel || isTarget ? 9 : 7;
              return (
                <g key={n.id} style={{ cursor: 'pointer', opacity: dim ? 0.35 : 1, transition: 'opacity 0.4s' }}
                  onClick={() => handleNodeClick(n.id)}>
                  {(isSel || isTarget) && <circle cx={n.x} cy={n.y} r="22" fill="url(#lt-glow)" />}
                  <circle cx={n.x} cy={n.y} r={r}
                    fill={color}
                    stroke={isSel || isTarget ? 'var(--accent)' : 'rgba(0,0,0,0.4)'}
                    strokeWidth={isSel || isTarget ? 2 : 0.8}
                    style={{ transition: 'all 0.3s' }} />
                  <text x={n.x} y={n.y + r + 9}
                    fontFamily="JetBrains Mono,monospace" fontSize="8"
                    fill={isSel || isTarget ? 'var(--accent)' : 'var(--text-primary)'}
                    textAnchor="middle"
                    style={{ transition: 'fill 0.3s' }}>
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-2 left-3 flex items-center gap-3 font-mono text-[8.5px]" style={{ color: 'var(--text-muted)' }}>
            {(Object.entries(LT_COLORS) as [keyof typeof LT_COLORS, string][]).map(([k, c]) => (
              <span key={k} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-2 flex flex-col" style={{ minHeight: 360 }}>
          {/* Mode info */}
          {pathMode ? (
            <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>warm intro · shortest path</div>
              <div className="font-mono text-[11px] space-y-1">
                <div><span style={{ color: 'var(--text-muted)' }}>from</span> <span style={{ color: 'var(--accent)' }}>{selectedNode?.label || '—'}</span></div>
                <div><span style={{ color: 'var(--text-muted)' }}>to</span>   <span style={{ color: 'var(--accent)' }}>{target ? LT_NODES.find((n) => n.id === target)?.label : 'click target →'}</span></div>
                {shortestPath.length > 0 && (
                  <div className="pt-2 mt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className="text-[9px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--text-muted)' }}>path · {shortestPath.length - 1} hop{shortestPath.length === 2 ? '' : 's'}</div>
                    <div className="text-[10px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {shortestPath.map((id, i) => (
                        <span key={id}>
                          {LT_NODES.find((n) => n.id === id)?.label}
                          {i < shortestPath.length - 1 && <span style={{ color: 'var(--accent)' }}> → </span>}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>entity</div>
              <div className="flex items-baseline gap-2">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: selectedNode ? LT_COLORS[selectedNode.kind] : 'var(--text-faint)' }} />
                <span className="font-serif text-xl">{selectedNode?.label || '—'}</span>
              </div>
              <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
                {selectedNode?.kind} · {neighbors.length} connection{neighbors.length === 1 ? '' : 's'}
              </div>
              <div className="mt-3 space-y-1 max-h-[110px] overflow-y-auto">
                {neighbors.map((n) => {
                  const node = LT_NODES.find((x) => x.id === n.id)!;
                  return (
                    <button key={n.id} onClick={() => setSelected(n.id)}
                      className="w-full flex items-center justify-between font-mono text-[10px] px-2 py-1 rounded smooth"
                      style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)' }}
                      data-hover>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: LT_COLORS[node.kind] }} />
                        <span style={{ color: 'var(--text-primary)' }}>{node.label}</span>
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>{n.kind} · {n.w.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Brief */}
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>ai meeting brief</div>
              <button onClick={generateBrief}
                disabled={briefRunning}
                className="font-mono text-[9px] px-2 py-1 rounded smooth uppercase tracking-[0.10em]"
                style={{
                  background: briefRunning ? 'var(--bg-elev)' : 'var(--accent)',
                  color: briefRunning ? 'var(--text-muted)' : 'var(--bg)',
                  border: `1px solid ${briefRunning ? 'var(--border-strong)' : 'var(--accent)'}`,
                }} data-hover>
                {briefRunning ? 'generating…' : briefIdx === 0 ? '▶ generate' : '↺ re-gen'}
              </button>
            </div>
            <div className="font-mono text-[10px] leading-[1.6] flex-1 overflow-y-auto" style={{ maxHeight: 200 }}>
              {briefIdx === 0 && !briefRunning && (
                <span style={{ color: 'var(--text-faint)' }}>
                  Click <span style={{ color: 'var(--accent)' }}>generate</span> to stream an AI brief for the selected founder — background, warm intros, portfolio overlap, diligence questions.
                </span>
              )}
              {LT_BRIEF_LINES.slice(0, briefIdx).map((l, i) => (
                <div key={i} style={{
                  color: BRIEF_COLOR[l.kind],
                  fontWeight: l.kind === 'header' ? 600 : 400,
                  paddingLeft: l.kind === 'q' || l.kind === 'highlight' ? 8 : 0,
                  minHeight: l.text === '' ? '0.6em' : undefined,
                }}>
                  {l.text}
                </div>
              ))}
              {briefRunning && briefIdx < LT_BRIEF_LINES.length && (
                <span className="inline-block w-1.5 h-3 align-middle ml-0.5" style={{ background: 'var(--accent)', animation: 'blink 1s steps(2) infinite' }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FREIGHT TOOLKIT — CMAP regional freight dashboard
   ========================================================= */
type FTLayer = 'traffic' | 'landuse' | 'crash';

type FTMuni = {
  id: string;
  name: string;
  county: string;
  path: string;        // SVG path
  cx: number; cy: number;
  aadt: number;        // avg AADT k
  hcv: number;         // % heavy commercial
  pop: number;         // thousands
  industrialPct: number;
  commercialPct: number;
  residentialPct: number;
  tcuPct: number;
  crashes: number;
  noise: number;       // dB
  co2: number;         // mt/yr
};

const FT_MUNIS: FTMuni[] = [
  {
    id: 'chicago', name: 'Chicago', county: 'Cook',
    path: 'M 175 90 L 250 80 L 270 130 L 260 195 L 195 210 L 165 175 L 160 130 Z',
    cx: 210, cy: 145,
    aadt: 142, hcv: 11.4, pop: 2746,
    industrialPct: 14, commercialPct: 22, residentialPct: 48, tcuPct: 9,
    crashes: 8421, noise: 71, co2: 1280,
  },
  {
    id: 'naperville', name: 'Naperville', county: 'DuPage',
    path: 'M 85 145 L 145 135 L 160 175 L 130 200 L 90 195 L 75 170 Z',
    cx: 115, cy: 170,
    aadt: 38, hcv: 6.2, pop: 149,
    industrialPct: 8, commercialPct: 18, residentialPct: 64, tcuPct: 4,
    crashes: 612, noise: 58, co2: 184,
  },
  {
    id: 'schaumburg', name: 'Schaumburg', county: 'Cook',
    path: 'M 95 65 L 155 60 L 170 95 L 140 120 L 95 115 L 80 95 Z',
    cx: 122, cy: 90,
    aadt: 52, hcv: 8.1, pop: 78,
    industrialPct: 16, commercialPct: 28, residentialPct: 42, tcuPct: 7,
    crashes: 481, noise: 62, co2: 215,
  },
  {
    id: 'joliet', name: 'Joliet', county: 'Will',
    path: 'M 105 215 L 165 215 L 175 245 L 145 260 L 105 255 L 90 235 Z',
    cx: 130, cy: 235,
    aadt: 44, hcv: 18.7, pop: 150,
    industrialPct: 26, commercialPct: 14, residentialPct: 38, tcuPct: 14,
    crashes: 728, noise: 67, co2: 392,
  },
  {
    id: 'evanston', name: 'Evanston', county: 'Cook',
    path: 'M 215 50 L 260 55 L 265 80 L 235 90 L 210 80 Z',
    cx: 235, cy: 70,
    aadt: 28, hcv: 5.4, pop: 78,
    industrialPct: 5, commercialPct: 14, residentialPct: 71, tcuPct: 3,
    crashes: 256, noise: 56, co2: 92,
  },
  {
    id: 'cicero', name: 'Cicero', county: 'Cook',
    path: 'M 145 175 L 175 170 L 178 200 L 158 215 L 140 205 Z',
    cx: 158, cy: 190,
    aadt: 36, hcv: 9.8, pop: 81,
    industrialPct: 18, commercialPct: 16, residentialPct: 52, tcuPct: 8,
    crashes: 384, noise: 64, co2: 168,
  },
];

// Truck route polylines that thread through the region
const FT_TRUCK_ROUTES = [
  'M 30 100 L 95 95 L 165 90 L 240 95 L 280 110',     // I-90 NW
  'M 30 175 L 80 170 L 145 175 L 215 170 L 280 165',  // I-290 / I-294
  'M 60 260 L 130 235 L 200 215 L 250 200 L 295 175', // I-55
  'M 215 60 L 220 130 L 215 200 L 220 260',           // I-94 / Lake Shore
];

// Land-use parcel templates (relative offsets to muni center, color category)
const FT_PARCELS = [
  // x_off, y_off, w, h, category
  [-22, -16, 14, 10, 'I'], [-6, -18, 12, 9, 'C'], [8, -14, 11, 10, 'R'],
  [-26, 0, 12, 9, 'C'],   [-12, -2, 10, 8, 'R'], [2, 0, 13, 10, 'I'],
  [16, -2, 10, 9, 'TCU'], [-20, 12, 12, 10, 'R'], [-6, 14, 11, 9, 'R'],
  [6, 12, 12, 10, 'C'],   [18, 14, 10, 8, 'I'],
];

const FT_PARCEL_COLOR: Record<string, string> = {
  I:   '#ef4444',  // industrial — red
  C:   '#60a5fa',  // commercial — blue
  R:   '#a3e635',  // residential — green
  TCU: '#a78bfa',  // transport/comm/utilities — purple
};

const FT_LAYER_INFO: Record<FTLayer, { label: string; sub: string }> = {
  traffic: { label: 'Truck Traffic',       sub: 'AADT · HCV share · routes · NHFN' },
  landuse: { label: 'Land Use',            sub: 'CMAP 2020 LUI · server-clipped parcels' },
  crash:   { label: 'Crashes & Emissions', sub: 'IDOT 2024 · noise · EMME CO₂/NOₓ/PM2.5' },
};

export function FreightToolkitWidget() {
  const [selectedId, setSelectedId] = useState<string>('chicago');
  const [layer, setLayer] = useState<FTLayer>('traffic');
  const [compareId, setCompareId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // Subtle animation for crash density pulses
  useEffect(() => {
    if (layer !== 'crash') return;
    const id = setInterval(() => setTick((t) => t + 1), 90);
    return () => clearInterval(id);
  }, [layer]);

  const muni = FT_MUNIS.find((m) => m.id === selectedId)!;
  const compare = compareId ? FT_MUNIS.find((m) => m.id === compareId) : null;

  // Deterministic crash dots inside the selected muni's path bounding box
  const crashDots = useMemo(() => {
    const dots: { x: number; y: number; sev: number; phase: number }[] = [];
    let seed = muni.id.charCodeAt(0) * 31 + muni.id.length * 7;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const count = Math.min(60, Math.floor(muni.crashes / 12));
    for (let i = 0; i < count; i++) {
      dots.push({
        x: muni.cx + (rand() - 0.5) * 70,
        y: muni.cy + (rand() - 0.5) * 60,
        sev: 1 + rand() * 3,
        phase: rand() * Math.PI * 2,
      });
    }
    return dots;
  }, [muni]);

  const emissionsScale = (val: number) => Math.min(1, val / 1400);

  return (
    <div className="glass rounded-2xl overflow-hidden relative" style={{ boxShadow: 'var(--shadow-glass)' }}>
      {/* Chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
          </div>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>freight-toolkit · cmap · utc-uic</span>
        </div>
        <div className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>
          7-county region · {FT_MUNIS.length} of 285+ shown
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-0">
        {/* Map */}
        <div className="md:col-span-3 relative border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)', background: '#0b1220' }}>
          <svg viewBox="0 0 320 280" className="w-full" style={{ maxHeight: 380 }}>
            <defs>
              <linearGradient id="ft-lake" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
                <stop offset="100%" stopColor="rgba(29,78,216,0.55)" />
              </linearGradient>
              <radialGradient id="ft-crash-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(239,68,68,0.65)" />
                <stop offset="100%" stopColor="rgba(239,68,68,0)" />
              </radialGradient>
              <filter id="ft-shadow"><feDropShadow dx="0" dy="1" stdDeviation="0.8" floodOpacity="0.4" /></filter>
            </defs>

            {/* Background grid */}
            {Array.from({ length: 17 }).map((_, i) => (
              <line key={'gv' + i} x1={i * 20} y1="0" x2={i * 20} y2="280" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={'gh' + i} x1="0" y1={i * 20} x2="320" y2={i * 20} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            ))}

            {/* Lake Michigan */}
            <path d="M 280 0 L 320 0 L 320 280 L 285 280 Q 270 200, 285 120 Q 295 60, 280 0 Z" fill="url(#ft-lake)" />
            <text x="298" y="150" fontFamily="Fraunces,serif" fontSize="9"
              fill="rgba(147,197,253,0.7)" fontStyle="italic" textAnchor="middle"
              transform="rotate(90, 298, 150)">
              Lake Michigan
            </text>

            {/* County background labels */}
            <text x="40" y="30" fontFamily="JetBrains Mono,monospace" fontSize="7" fill="rgba(255,255,255,0.18)" letterSpacing="1.5">DUPAGE</text>
            <text x="180" y="30" fontFamily="JetBrains Mono,monospace" fontSize="7" fill="rgba(255,255,255,0.18)" letterSpacing="1.5">COOK</text>
            <text x="40" y="270" fontFamily="JetBrains Mono,monospace" fontSize="7" fill="rgba(255,255,255,0.18)" letterSpacing="1.5">WILL</text>

            {/* Truck routes (visible on traffic layer) */}
            {layer === 'traffic' && FT_TRUCK_ROUTES.map((d, i) => (
              <g key={i}>
                <path d={d} stroke="rgba(251,191,36,0.85)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d={d} stroke="rgba(251,191,36,0.25)" strokeWidth="4" fill="none" strokeLinecap="round" />
              </g>
            ))}

            {/* Municipality polygons */}
            {FT_MUNIS.map((m) => {
              const isSel = m.id === selectedId;
              const isCmp = m.id === compareId;
              const dim = !isSel && !isCmp && compareId !== null;
              return (
                <g key={m.id} style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (compareId === m.id) { setCompareId(null); return; }
                    if (m.id !== selectedId && (window.event as MouseEvent | undefined)?.shiftKey) { setCompareId(m.id); return; }
                    setSelectedId(m.id);
                  }}>
                  <path d={m.path}
                    fill={isSel ? 'rgba(96,165,250,0.22)' : isCmp ? 'rgba(168,85,247,0.22)' : 'rgba(148,163,184,0.08)'}
                    stroke={isSel ? '#60a5fa' : isCmp ? '#a855f7' : 'rgba(148,163,184,0.4)'}
                    strokeWidth={isSel ? 1.5 : isCmp ? 1.3 : 0.6}
                    opacity={dim ? 0.4 : 1}
                    style={{ transition: 'all 0.3s' }} />

                  {/* Layer-specific overlays per muni */}
                  {layer === 'traffic' && (
                    <g opacity={dim ? 0.3 : 1}>
                      <rect x={m.cx - 14} y={m.cy - 7} width="28" height="13" rx="2"
                        fill="rgba(11,18,32,0.85)" stroke={isSel ? '#fbbf24' : 'rgba(251,191,36,0.4)'} strokeWidth="0.7" />
                      <text x={m.cx} y={m.cy + 2.5} fontFamily="JetBrains Mono,monospace" fontSize="7.5"
                        fill={isSel ? '#fbbf24' : 'rgba(251,191,36,0.7)'} textAnchor="middle">
                        {m.aadt}k AADT
                      </text>
                    </g>
                  )}

                  {layer === 'landuse' && isSel && (
                    <g clipPath={`url(#ft-clip-${m.id})`}>
                      {FT_PARCELS.map((p, i) => {
                        const [dx, dy, w, h, cat] = p;
                        return (
                          <rect key={i}
                            x={m.cx + (dx as number)} y={m.cy + (dy as number)}
                            width={w as number} height={h as number}
                            fill={FT_PARCEL_COLOR[cat as string]}
                            opacity="0.78" rx="1" />
                        );
                      })}
                    </g>
                  )}

                  {/* Emissions stacked-bar effect on muni edges (crash layer) */}
                  {layer === 'crash' && (isSel || !compareId) && (
                    <g opacity={isSel ? 1 : 0.4}>
                      {(() => {
                        const scale = emissionsScale(m.co2);
                        const h = 4 + scale * 18;
                        return (
                          <g>
                            <rect x={m.cx - 22} y={m.cy + 14} width="6" height={h * 0.7} fill="rgba(239,68,68,0.85)" />
                            <rect x={m.cx - 14} y={m.cy + 14} width="6" height={h * 0.9} fill="rgba(251,146,60,0.85)" />
                            <rect x={m.cx - 6}  y={m.cy + 14} width="6" height={h}        fill="rgba(250,204,21,0.85)" />
                            <rect x={m.cx + 2}  y={m.cy + 14} width="6" height={h * 0.55} fill="rgba(99,102,241,0.85)" />
                          </g>
                        );
                      })()}
                    </g>
                  )}
                </g>
              );
            })}

            {/* Clip paths for landuse parcels */}
            <defs>
              {FT_MUNIS.map((m) => (
                <clipPath key={m.id} id={`ft-clip-${m.id}`}>
                  <path d={m.path} />
                </clipPath>
              ))}
            </defs>

            {/* Crash density dots — animated */}
            {layer === 'crash' && crashDots.map((d, i) => {
              const pulse = 0.5 + 0.5 * Math.sin((tick + i * 6) * 0.12 + d.phase);
              return (
                <g key={i}>
                  <circle cx={d.x} cy={d.y} r={4 + d.sev * 1.2} fill="url(#ft-crash-glow)" opacity={0.45 + pulse * 0.4} />
                  <circle cx={d.x} cy={d.y} r={1 + d.sev * 0.35} fill="#ef4444" opacity={0.85} />
                </g>
              );
            })}

            {/* Selected muni label */}
            <g filter="url(#ft-shadow)">
              <rect x={muni.cx - 28} y={muni.cy - 30} width="56" height="14" rx="2"
                fill="rgba(11,18,32,0.92)" stroke="#60a5fa" strokeWidth="0.8" />
              <text x={muni.cx} y={muni.cy - 20.5} fontFamily="JetBrains Mono,monospace" fontSize="8"
                fill="#60a5fa" textAnchor="middle" letterSpacing="0.5">
                {muni.name.toUpperCase()}
              </text>
            </g>
          </svg>

          {/* Layer legend */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[8.5px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {layer === 'traffic' && (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="w-3 h-0.5" style={{ background: '#fbbf24' }} /> truck route</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ background: 'rgba(251,191,36,0.4)', border: '1px solid #fbbf24' }} /> AADT badge</span>
              </div>
            )}
            {layer === 'landuse' && (
              <div className="flex items-center gap-3">
                {Object.entries(FT_PARCEL_COLOR).map(([k, c]) => (
                  <span key={k} className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ background: c }} />{k === 'I' ? 'industrial' : k === 'C' ? 'commercial' : k === 'R' ? 'residential' : 'TCU'}</span>
                ))}
              </div>
            )}
            {layer === 'crash' && (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }} /> crash</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-2.5" style={{ background: '#ef4444' }} /> CO₂</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-2.5" style={{ background: '#fb923c' }} /> NOₓ</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-2.5" style={{ background: '#facc15' }} /> PM2.5</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-2.5" style={{ background: '#6366f1' }} /> HC</span>
              </div>
            )}
            <span className="font-mono text-[8px]" style={{ color: 'rgba(255,255,255,0.35)' }}>shift+click → compare</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-2 flex flex-col" style={{ minHeight: 380 }}>
          {/* Layer toggle */}
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>Analysis Level</div>
            <div className="grid grid-cols-3 gap-1">
              {(['traffic', 'landuse', 'crash'] as FTLayer[]).map((l, i) => (
                <button key={l} onClick={() => setLayer(l)}
                  className="font-mono text-[10px] py-1.5 rounded-md smooth"
                  style={{
                    background: layer === l ? 'var(--accent)' : 'var(--bg-elev)',
                    color: layer === l ? 'var(--bg)' : 'var(--text-muted)',
                    border: `1px solid ${layer === l ? 'var(--accent)' : 'var(--border-strong)'}`,
                  }}
                  data-hover>
                  L{i + 1}
                </button>
              ))}
            </div>
            <div className="font-mono text-[10px] mt-2" style={{ color: 'var(--accent)' }}>{FT_LAYER_INFO[layer].label}</div>
            <div className="font-mono text-[9px]" style={{ color: 'var(--text-faint)' }}>{FT_LAYER_INFO[layer].sub}</div>
          </div>

          {/* Muni selector */}
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>Municipality</div>
              {compareId && (
                <button onClick={() => setCompareId(null)}
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                  style={{ color: '#a855f7', border: '1px solid rgba(168,85,247,0.4)' }} data-hover>
                  clear compare
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1">
              {FT_MUNIS.map((m) => {
                const isSel = m.id === selectedId;
                const isCmp = m.id === compareId;
                return (
                  <button key={m.id}
                    onClick={(e) => {
                      if (e.shiftKey && m.id !== selectedId) { setCompareId(isCmp ? null : m.id); return; }
                      setSelectedId(m.id);
                      if (isCmp) setCompareId(null);
                    }}
                    className="font-mono text-[10px] px-2 py-1.5 rounded smooth text-left"
                    style={{
                      background: isSel ? 'var(--accent-soft)' : isCmp ? 'rgba(168,85,247,0.15)' : 'var(--bg-elev)',
                      color: isSel ? 'var(--accent)' : isCmp ? '#a855f7' : 'var(--text-muted)',
                      border: `1px solid ${isSel ? 'var(--accent)' : isCmp ? '#a855f7' : 'var(--border)'}`,
                    }}
                    data-hover>
                    {m.name}<span className="opacity-60"> · {m.county}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metrics — change per layer */}
          <div className="p-4 flex-1">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] mb-2.5" style={{ color: 'var(--text-muted)' }}>
              {muni.name}{compare && <span style={{ color: '#a855f7' }}> · vs {compare.name}</span>}
            </div>
            <div className="space-y-1.5 font-mono text-[11px]">
              {layer === 'traffic' && (
                <>
                  <FTRow k="AADT (k veh/day)" a={muni.aadt} b={compare?.aadt} accent />
                  <FTRow k="HCV share" a={`${muni.hcv}%`} b={compare ? `${compare.hcv}%` : undefined} />
                  <FTRow k="Population" a={`${muni.pop}k`} b={compare ? `${compare.pop}k` : undefined} />
                  <FTRow k="On NHFN" a={muni.hcv > 10 ? 'yes' : 'partial'} b={compare ? (compare.hcv > 10 ? 'yes' : 'partial') : undefined} />
                </>
              )}
              {layer === 'landuse' && (
                <>
                  <FTRow k="Industrial" a={`${muni.industrialPct}%`} b={compare ? `${compare.industrialPct}%` : undefined} accent />
                  <FTRow k="Commercial" a={`${muni.commercialPct}%`} b={compare ? `${compare.commercialPct}%` : undefined} />
                  <FTRow k="Residential" a={`${muni.residentialPct}%`} b={compare ? `${compare.residentialPct}%` : undefined} />
                  <FTRow k="TCU" a={`${muni.tcuPct}%`} b={compare ? `${compare.tcuPct}%` : undefined} />
                  <div className="font-mono text-[9px] pt-2 leading-relaxed" style={{ color: 'var(--text-faint)' }}>
                    Parcels clipped server-side via Shapely · {((muni.industrialPct + muni.commercialPct + muni.tcuPct) / 100 * muni.pop * 12).toFixed(0)}k freight-relevant ft²
                  </div>
                </>
              )}
              {layer === 'crash' && (
                <>
                  <FTRow k="2024 crashes" a={muni.crashes.toLocaleString()} b={compare ? compare.crashes.toLocaleString() : undefined} accent />
                  <FTRow k="Noise (Lden)" a={`${muni.noise} dB`} b={compare ? `${compare.noise} dB` : undefined} />
                  <FTRow k="CO₂ (mt/yr)" a={muni.co2.toLocaleString()} b={compare ? compare.co2.toLocaleString() : undefined} />
                  <FTRow k="Crashes / 1k pop" a={(muni.crashes / muni.pop).toFixed(1)} b={compare ? (compare.crashes / compare.pop).toFixed(1) : undefined} />
                  <div className="font-mono text-[9px] pt-2 leading-relaxed" style={{ color: 'var(--text-faint)' }}>
                    EMME 6 species · IDOT 2024 records · noise quantiled to muni range
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FTRow({ k, a, b, accent }: { k: string; a: string | number; b?: string | number; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b py-1" style={{ borderColor: 'var(--border)' }}>
      <span style={{ color: 'var(--text-muted)' }}>{k}</span>
      <span className="flex items-center gap-2">
        <span style={{ color: accent ? 'var(--accent)' : 'var(--text-primary)' }}>{a}</span>
        {b !== undefined && <span style={{ color: '#a855f7' }}>· {b}</span>}
      </span>
    </div>
  );
}

export function TerminalFallbackWidget({ project }: { project: Project }) {
  const lines = [
    `$ git clone ${project.github || 'https://github.com/Archit1706/' + project.slug}`,
    `cloning into '${project.title.toLowerCase().replace(/\s+/g, '-')}'...`,
    `remote: enumerating objects ✓`,
    `$ cd ${project.title.toLowerCase().replace(/\s+/g, '-')}`,
    `$ ${project.tech.includes('Python') ? 'pip install -r requirements.txt' : project.tech.some((t) => t.includes('Node')) ? 'npm install' : 'pnpm install'}`,
    `dependencies resolved · ${project.tech.length} packages`,
    `$ ${project.tech.includes('Python') ? 'python app.py' : 'pnpm dev'}`,
    `▸ ready on http://localhost:3000`,
    `▸ ${project.features?.[0] || 'service running'}`,
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= lines.length) return;
    const id = setTimeout(() => setShown((s) => s + 1), 240);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  return (
    <div className="rounded-2xl overflow-hidden font-mono text-[12px]" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg)' }}>
      <div className="px-4 py-2 flex items-center gap-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'oklch(0.7 0.2 25)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'oklch(0.8 0.15 80)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'oklch(0.7 0.18 145)' }} />
        <span className="ml-3 text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>{project.slug}@local</span>
      </div>
      <div className="p-5 space-y-1" style={{ minHeight: 280 }}>
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} style={{ color: l.startsWith('$') ? 'var(--accent)' : l.startsWith('▸') ? 'var(--text-primary)' : 'var(--text-muted)' }}>{l}</div>
        ))}
        {shown < lines.length && <span className="inline-block w-2 h-3.5 align-middle" style={{ background: 'var(--accent)', animation: 'blink 1s steps(2) infinite' }} />}
      </div>
    </div>
  );
}
