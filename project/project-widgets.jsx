/* global React */
const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM } = React;

/* =========================================================
   1. OSM ROAD CLOSURE MAP — interactive vector map of Chicago
   with draggable closure markers, OpenLR-style location codes,
   and live re-routing visualization.
   ========================================================= */
function OSMMapWidget() {
  const [closures, setClosures] = uS([
    { id: 'C-1042', x: 38, y: 42, status: 'active', cause: 'construction', minutes: 142 },
    { id: 'C-1058', x: 62, y: 58, status: 'active', cause: 'event', minutes: 36 },
    { id: 'C-1103', x: 55, y: 30, status: 'pending', cause: 'flood', minutes: 8 },
  ]);
  const [selected, setSelected] = uS(closures[0].id);
  const [routing, setRouting] = uS(false);

  // animated traffic
  const [tick, setTick] = uS(0);
  uE(() => {
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  const cur = closures.find((c) => c.id === selected);

  function moveClosure(e) {
    if (!cur) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setClosures((cs) => cs.map((c) => (c.id === selected ? { ...c, x, y } : c)));
  }

  // build a fake but plausible OpenLR code from coords
  const openlr = cur ? `Cw${(cur.x * 73).toString(36).padStart(4, '0').slice(0, 4).toUpperCase()}/${(cur.y * 119).toString(36).padStart(4, '0').slice(0, 4).toUpperCase()}` : '—';

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
          closures.osm.ch · live
        </div>
        <div className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>
          chicago · zoom 12
        </div>
      </div>

      <div className="grid md:grid-cols-3">
        {/* Map canvas */}
        <div
          className="md:col-span-2 relative aspect-[4/3] cursor-crosshair select-none"
          onClick={(e) => moveClosure(e)}
          style={{ background: 'var(--bg)' }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 75" preserveAspectRatio="none">
            {/* grid */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={'v' + i} x1={i * 100 / 12} y1="0" x2={i * 100 / 12} y2="75" stroke="var(--border)" strokeWidth="0.1" />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={'h' + i} x1="0" y1={i * 75 / 9} x2="100" y2={i * 75 / 9} stroke="var(--border)" strokeWidth="0.1" />
            ))}
            {/* river */}
            <path d="M 0 50 Q 25 40, 40 48 T 80 35 L 100 30" stroke="oklch(0.6 0.1 220)" strokeWidth="1.2" fill="none" opacity="0.4" />
            {/* highways */}
            <path d="M 0 60 L 35 50 L 55 55 L 80 35 L 100 30" stroke="var(--text-muted)" strokeWidth="0.6" fill="none" opacity="0.7" />
            <path d="M 20 0 L 35 25 L 50 50 L 60 75" stroke="var(--text-muted)" strokeWidth="0.6" fill="none" opacity="0.7" />
            <path d="M 80 0 L 70 30 L 65 60 L 70 75" stroke="var(--text-muted)" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M 0 25 L 30 30 L 60 28 L 100 22" stroke="var(--text-muted)" strokeWidth="0.4" fill="none" opacity="0.5" />
            {/* moving traffic dots */}
            {Array.from({ length: 14 }).map((_, i) => {
              const t = ((tick + i * 17) % 200) / 200;
              const px = 0 + t * 100;
              const py = 60 - 30 * t * (1 - t) * 4;
              return <circle key={i} cx={px} cy={py} r="0.4" fill="var(--accent)" opacity="0.7" />;
            })}
            {/* re-route preview */}
            {routing && cur && (
              <path
                d={`M 5 70 Q ${cur.x - 12} ${cur.y - 8}, ${cur.x - 6} ${cur.y - 4} Q ${cur.x + 12} ${cur.y + 14}, 95 5`}
                stroke="var(--accent)"
                strokeWidth="0.6"
                strokeDasharray="1.5 1"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 4px var(--accent))' }}
              />
            )}
            {/* closures */}
            {closures.map((c) => (
              <g key={c.id} onClick={(e) => { e.stopPropagation(); setSelected(c.id); }} style={{ cursor: 'pointer' }}>
                <circle cx={c.x} cy={c.y} r={c.id === selected ? 2.5 : 1.8} fill={c.status === 'active' ? 'oklch(0.7 0.2 25)' : 'oklch(0.75 0.15 80)'} opacity="0.25" />
                <circle cx={c.x} cy={c.y} r={c.id === selected ? 1.4 : 1} fill={c.status === 'active' ? 'oklch(0.7 0.2 25)' : 'oklch(0.75 0.15 80)'}>
                  <animate attributeName="r" values={`${c.id === selected ? 1.4 : 1};${c.id === selected ? 2 : 1.4};${c.id === selected ? 1.4 : 1}`} dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>
          <div className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-faint)' }}>
            click map → drag selected closure · click marker → select
          </div>
        </div>

        {/* Side panel */}
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
            <Row k="duration" v={`${cur?.minutes}m`} />
            <Row k="lat,lng" v={`41.${(cur?.y * 47).toFixed(0).padStart(4,'0')}, -87.${(cur?.x * 53).toFixed(0).padStart(4,'0')}`} />
            <Row k="openlr" v={openlr} accent />
          </div>
          <div className="p-4 border-t flex gap-2" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={() => setRouting((r) => !r)}
              className="flex-1 font-mono text-[10px] uppercase tracking-[0.18em] py-2 rounded smooth"
              style={{ background: routing ? 'var(--accent)' : 'transparent', color: routing ? 'var(--bg)' : 'var(--accent)', border: '1px solid var(--accent)' }}
              data-hover
            >
              {routing ? '✓ rerouting' : 'compute reroute'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, accent }) {
  return (
    <div className="flex justify-between border-b py-1" style={{ borderColor: 'var(--border)' }}>
      <span style={{ color: 'var(--text-muted)' }}>{k}</span>
      <span style={{ color: accent ? 'var(--accent)' : 'var(--text-primary)' }}>{v}</span>
    </div>
  );
}

/* =========================================================
   2. KEYA AI CHAT AGENT — multi-tool agent simulator
   showing tool selection + reasoning + property card response
   ========================================================= */
function ChatAgentWidget() {
  const presets = [
    { q: 'find me a 2BR near U-Bahn in Berlin under €1800', tools: ['property_search', 'transit_lookup'] },
    { q: 'what schools are around 1600 N California Ave Chicago?', tools: ['geocode', 'great_schools'] },
    { q: 'compare commute from this listing to OpenAI HQ', tools: ['transit_lookup', 'distance_matrix'] },
  ];
  const [step, setStep] = uS(0);
  const [running, setRunning] = uS(false);
  const [chosen, setChosen] = uS(0);

  const allTools = ['property_search', 'transit_lookup', 'geocode', 'great_schools', 'distance_matrix', 'image_gen', 'memory_recall', 'serp'];
  const active = presets[chosen].tools;

  function run() {
    setRunning(true);
    setStep(0);
    let s = 0;
    const id = setInterval(() => {
      s += 1;
      setStep(s);
      if (s >= 5) { clearInterval(id); setRunning(false); }
    }, 700);
  }

  return (
    <div className="rounded-2xl overflow-hidden grid md:grid-cols-5" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      {/* Tools panel */}
      <div className="md:col-span-2 p-5 border-r" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--text-muted)' }}>
          agent · 8 tools registered
        </div>
        <div className="space-y-2">
          {allTools.map((t) => {
            const isActive = active.includes(t);
            const isFiring = isActive && step >= 1 && active.indexOf(t) <= step - 1;
            return (
              <div key={t} className="flex items-center gap-2 font-mono text-[11px]" style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-faint)' }}>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: isFiring ? 'var(--accent)' : isActive ? 'var(--text-muted)' : 'var(--text-faint)',
                    boxShadow: isFiring ? '0 0 8px var(--accent)' : 'none',
                    transition: 'all 0.3s',
                  }}
                />
                {t}
                {isFiring && <span style={{ color: 'var(--accent)' }} className="ml-auto">●</span>}
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t font-mono text-[10px]" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          model · gpt-4o-mini<br />
          retrieval · pgvector (1536d)<br />
          context · 12 listings
        </div>
      </div>

      {/* Chat */}
      <div className="md:col-span-3 p-5 flex flex-col" style={{ minHeight: 380 }}>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => { setChosen(i); setStep(0); }}
              className="font-mono text-[10px] px-2 py-1 rounded smooth"
              style={{
                background: chosen === i ? 'var(--accent-soft)' : 'transparent',
                color: chosen === i ? 'var(--accent)' : 'var(--text-muted)',
                border: `1px solid ${chosen === i ? 'var(--accent)' : 'var(--border-strong)'}`,
              }}
              data-hover
            >
              preset {i + 1}
            </button>
          ))}
        </div>
        <div className="flex-1 space-y-3 font-mono text-[12px] overflow-hidden">
          <div className="flex gap-2">
            <span style={{ color: 'var(--text-faint)' }}>user ›</span>
            <span style={{ color: 'var(--text-primary)' }}>{presets[chosen].q}</span>
          </div>
          {step >= 1 && (
            <div className="pl-4 border-l-2" style={{ borderColor: 'var(--accent)' }}>
              <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>plan</div>
              <div className="mt-1" style={{ color: 'var(--text-primary)' }}>i'll call <span style={{ color: 'var(--accent)' }}>{active[0]}</span> first, then <span style={{ color: 'var(--accent)' }}>{active[1]}</span></div>
            </div>
          )}
          {step >= 2 && (
            <div className="rounded p-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>tool · {active[0]}</div>
              <div className="mt-1" style={{ color: 'var(--text-primary)' }}>→ 24 results · top score 0.91</div>
            </div>
          )}
          {step >= 3 && (
            <div className="rounded p-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>tool · {active[1]}</div>
              <div className="mt-1" style={{ color: 'var(--text-primary)' }}>→ enriched 24 results in 312ms</div>
            </div>
          )}
          {step >= 4 && (
            <div className="rounded p-3 flex gap-3" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)' }}>
              <div className="w-12 h-12 rounded flex-shrink-0" style={{ background: 'linear-gradient(135deg, oklch(0.6 0.12 200), oklch(0.4 0.1 280))' }} />
              <div className="flex-1">
                <div style={{ color: 'var(--accent)' }}>Mitte · 2BR · €1,650/mo</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>4 min walk → U-Rosenthaler Platz · score 0.93</div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 pt-3 border-t flex gap-2" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={run}
            disabled={running}
            className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-2 rounded smooth"
            style={{ background: 'var(--accent)', color: 'var(--bg)', opacity: running ? 0.6 : 1 }}
            data-hover
          >
            {running ? 'running…' : 'run agent'}
          </button>
          <button
            onClick={() => setStep(0)}
            className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-2 rounded smooth"
            style={{ border: '1px solid var(--border-strong)', color: 'var(--text-muted)' }}
            data-hover
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   3. CONGESTION ZONE GRAPH — interactive cordon-cutting demo
   showing road-network graph, cycle detection, and cut-edge
   evaluation as user adjusts threshold
   ========================================================= */
function CycleGraphWidget() {
  const [thresh, setThresh] = uS(0.6);
  // generate static node positions (deterministic)
  const nodes = uM(() => {
    const arr = [];
    let seed = 7;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < 32; i++) {
      arr.push({ id: i, x: 8 + rand() * 84, y: 8 + rand() * 60 });
    }
    return arr;
  }, []);
  const edges = uM(() => {
    const e = [];
    nodes.forEach((n, i) => {
      const others = nodes
        .map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      others.forEach((o) => {
        if (i < o.j) e.push({ a: i, b: o.j, w: 0.3 + ((i + o.j) * 17 % 70) / 100 });
      });
    });
    return e;
  }, [nodes]);

  // boundary cycle: nodes whose centroid distance > thresh boundary
  const cx = 50, cy = 38;
  const inside = nodes.map((n) => Math.hypot(n.x - cx, n.y - cy) < 28 * thresh);
  const cutEdges = edges.filter((e) => inside[e.a] !== inside[e.b]);
  const insideCount = inside.filter(Boolean).length;
  const tripCoverage = (insideCount / nodes.length * 100).toFixed(0);
  const monitoring = cutEdges.length;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
          cordon zone · cut-edge optimization
        </div>
        <div className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>32 nodes · {edges.length} edges</div>
      </div>
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2 aspect-[5/3] relative">
          <svg viewBox="0 0 100 75" className="w-full h-full">
            {/* boundary halo */}
            <circle cx={cx} cy={cy} r={28 * thresh} fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="1 0.8" />
            {/* edges */}
            {edges.map((e, i) => {
              const a = nodes[e.a], b = nodes[e.b];
              const isCut = inside[e.a] !== inside[e.b];
              return (
                <line
                  key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={isCut ? 'var(--accent)' : 'var(--border-strong)'}
                  strokeWidth={isCut ? 0.5 : 0.2}
                  opacity={isCut ? 1 : 0.5}
                />
              );
            })}
            {/* nodes */}
            {nodes.map((n, i) => (
              <circle
                key={i}
                cx={n.x} cy={n.y}
                r={inside[i] ? 0.9 : 0.6}
                fill={inside[i] ? 'var(--accent)' : 'var(--text-muted)'}
              />
            ))}
          </svg>
        </div>
        <div className="border-l p-4 space-y-4" style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>
              boundary radius
            </div>
            <input
              type="range" min="0.2" max="1.4" step="0.02"
              value={thresh}
              onChange={(e) => setThresh(parseFloat(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--accent)' }}
            />
            <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--accent)' }}>r = {thresh.toFixed(2)}</div>
          </div>
          <div className="space-y-2 font-mono text-[11px]">
            <Row k="zone nodes" v={`${insideCount} / 32`} />
            <Row k="cut edges" v={monitoring} accent />
            <Row k="trip coverage" v={`${tripCoverage}%`} />
            <Row k="monitor cost" v={`$${(monitoring * 18).toLocaleString()}/mo`} />
          </div>
          <div className="pt-3 border-t font-mono text-[9px] uppercase tracking-[0.18em]" style={{ borderColor: 'var(--border)', color: 'var(--text-faint)' }}>
            ↑ widen radius — higher coverage, more cameras
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   4. PANORAMA — drag-to-pan 360 room
   ========================================================= */
function PanoramaWidget() {
  const [pan, setPan] = uS(180);
  const [drag, setDrag] = uS(false);
  const ref = uR(null);
  const last = uR(0);

  function start(e) {
    setDrag(true);
    last.current = e.clientX || e.touches?.[0]?.clientX || 0;
  }
  function move(e) {
    if (!drag) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    setPan((p) => (p - (x - last.current) * 0.4 + 360) % 360);
    last.current = x;
  }
  function end() { setDrag(false); }

  // build a stylized, parametric "room" using tilable hue arcs
  const rooms = ['kitchen', 'living', 'bath', 'bed', 'study', 'hall'];
  const sector = Math.floor((pan / 360) * rooms.length);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>360° tour · drag to pan</div>
        <div className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>{rooms[sector]} · {Math.round(pan)}°</div>
      </div>
      <div
        ref={ref}
        className="relative aspect-[16/8] overflow-hidden select-none"
        style={{ cursor: drag ? 'grabbing' : 'grab' }}
        onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
        onTouchStart={start} onTouchMove={move} onTouchEnd={end}
      >
        <div className="absolute inset-0" style={{ transform: `translateX(${-pan * 4}px)`, transition: drag ? 'none' : 'transform 0.6s var(--ease)' }}>
          <div className="flex h-full" style={{ width: '1440px' }}>
            {[...rooms, ...rooms.slice(0, 2)].map((r, i) => (
              <div
                key={i}
                className="h-full relative"
                style={{
                  width: '240px',
                  background: `linear-gradient(${i % 2 ? '135deg' : '45deg'}, oklch(0.${30 + i * 4} 0.${10 + i * 2} ${i * 60}), oklch(0.${50 + i * 3} 0.${8 + i * 2} ${i * 60 + 80}))`,
                }}
              >
                {/* "furniture" silhouettes */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                  <rect x={20 + i * 4} y={30} width={20 + i * 2} height={20} fill="rgba(0,0,0,0.3)" rx="2" />
                  <rect x={55 - i} y={20 + i} width={15} height={30} fill="rgba(255,255,255,0.08)" rx="1" />
                  <circle cx={75} cy={45} r={i + 2} fill="rgba(0,0,0,0.4)" />
                </svg>
                <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {r}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {rooms.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full smooth" style={{ background: i === sector ? 'var(--accent)' : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   5. TONE/PITCH ANALYZER — animated waveform + emotion radar
   ========================================================= */
function TonePitchWidget() {
  const [running, setRunning] = uS(false);
  const [t, setT] = uS(0);
  uE(() => {
    if (!running) return;
    const id = setInterval(() => setT((v) => v + 1), 60);
    return () => clearInterval(id);
  }, [running]);

  // synthetic emotion vector that drifts when running
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
            <Stat k="pitch" v={running ? `${(180 + Math.sin(t * 0.1) * 30).toFixed(0)} hz` : '—'} />
            <Stat k="tempo" v={running ? `${(140 + Math.sin(t * 0.07) * 20).toFixed(0)} wpm` : '—'} />
            <Stat k="energy" v={running ? `${(0.6 + Math.sin(t * 0.13) * 0.2).toFixed(2)}` : '—'} />
          </div>
        </div>
        <div className="md:col-span-2 p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>emotion radar</div>
          <svg viewBox="-50 -50 100 100" className="w-full" style={{ aspectRatio: '1 / 1' }}>
            {[0.25, 0.5, 0.75, 1].map((r) => (
              <circle key={r} r={r * 40} fill="none" stroke="var(--border)" strokeWidth="0.3" />
            ))}
            {emotions.map((_, i) => {
              const a = (i / emotions.length) * Math.PI * 2 - Math.PI / 2;
              return <line key={i} x1="0" y1="0" x2={Math.cos(a) * 40} y2={Math.sin(a) * 40} stroke="var(--border)" strokeWidth="0.3" />;
            })}
            <polygon
              points={emotions.map((_, i) => {
                const a = (i / emotions.length) * Math.PI * 2 - Math.PI / 2;
                const r = vec[i] * 40;
                return `${Math.cos(a) * r},${Math.sin(a) * r}`;
              }).join(' ')}
              fill="var(--accent-soft)"
              stroke="var(--accent)"
              strokeWidth="0.6"
            />
            {emotions.map((e, i) => {
              const a = (i / emotions.length) * Math.PI * 2 - Math.PI / 2;
              return <text key={i} x={Math.cos(a) * 47} y={Math.sin(a) * 47} fill={i === dom ? 'var(--accent)' : 'var(--text-muted)'} fontSize="3.5" textAnchor="middle" dominantBaseline="middle" fontFamily="JetBrains Mono">{e}</text>;
            })}
          </svg>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mt-3 text-center" style={{ color: 'var(--accent)' }}>
            dominant · {emotions[dom]}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>{k}</div>
      <div className="mt-0.5" style={{ color: 'var(--accent)' }}>{v}</div>
    </div>
  );
}

/* =========================================================
   6. URL SCANNER — phishing detection trace
   ========================================================= */
function URLScannerWidget() {
  const samples = [
    { u: 'https://paypa1-secure.com/login', score: 0.91, verdict: 'phishing', flags: ['typosquat', 'no whois', 'self-signed cert', 'logo mismatch'] },
    { u: 'https://github.com/Archit1706', score: 0.04, verdict: 'safe', flags: ['known domain', 'valid cert', 'aged 8y'] },
    { u: 'https://amaz0n-prime-renew.shop', score: 0.97, verdict: 'phishing', flags: ['homoglyph', 'new tld', 'registered 2d ago', 'imitates brand'] },
    { u: 'https://openstreetmap.org', score: 0.02, verdict: 'safe', flags: ['known domain', 'whitelist', 'aged 21y'] },
  ];
  const [i, setI] = uS(0);
  const [scanning, setScanning] = uS(false);
  const [progress, setProgress] = uS(0);
  const [reveal, setReveal] = uS(true);
  const cur = samples[i];

  function scan() {
    setScanning(true);
    setReveal(false);
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p += 6 + Math.random() * 8;
      if (p >= 100) { p = 100; clearInterval(id); setScanning(false); setReveal(true); }
      setProgress(p);
    }, 80);
  }

  uE(() => { scan(); /* eslint-disable-next-line */ }, [i]);

  const checks = ['whois lookup', 'cert chain', 'visual hash', 'lightgbm score', 'typosquat dist', 'serp reputation'];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', background: 'var(--bg-elev)' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>phishfence · url scanner</div>
        <div className="flex gap-1.5">
          {samples.map((_, k) => (
            <button key={k} onClick={() => setI(k)} className="w-1.5 h-1.5 rounded-full smooth" style={{ background: i === k ? 'var(--accent)' : 'var(--text-faint)' }} data-hover />
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="font-mono text-[12px] px-3 py-2 rounded mb-4" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          → {cur.u}
        </div>
        <div className="h-1 rounded mb-5 overflow-hidden" style={{ background: 'var(--border)' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.1s linear' }} />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>checks</div>
            <div className="space-y-1.5 font-mono text-[11px]">
              {checks.map((c, k) => {
                const done = progress > (k + 1) * (100 / checks.length);
                return (
                  <div key={c} className="flex justify-between">
                    <span style={{ color: done ? 'var(--text-primary)' : 'var(--text-faint)' }}>{c}</span>
                    <span style={{ color: done ? 'var(--accent)' : 'var(--text-faint)' }}>{done ? '✓' : '·'}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-muted)' }}>verdict</div>
            {reveal && !scanning ? (
              <>
                <div className="font-serif text-3xl" style={{ color: cur.verdict === 'phishing' ? 'oklch(0.7 0.2 25)' : 'var(--accent)' }}>
                  {cur.verdict}
                </div>
                <div className="font-mono text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>confidence · {(cur.score * 100).toFixed(0)}%</div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {cur.flags.map((f) => (
                    <span key={f} className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)', color: 'var(--text-muted)' }}>
                      {f}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>scanning…</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FALLBACK widgets (smaller projects)
   ========================================================= */
function TerminalWidget({ project }) {
  const lines = [
    `$ git clone ${project.github}`,
    `cloning into '${project.title.toLowerCase().replace(/\s+/g, '-')}'...`,
    `remote: enumerating objects ✓`,
    `$ cd ${project.title.toLowerCase().replace(/\s+/g, '-')}`,
    `$ ${project.tech.includes('Python') ? 'pip install -r requirements.txt' : project.tech.some(t => t.includes('Node')) ? 'npm install' : 'pnpm install'}`,
    `dependencies resolved · ${project.tech.length} packages`,
    `$ ${project.tech.includes('Python') ? 'python app.py' : 'pnpm dev'}`,
    `▸ ready on http://localhost:3000`,
    `▸ ${project.features?.[0] || 'service running'}`,
  ];
  const [shown, setShown] = uS(0);
  uE(() => {
    if (shown >= lines.length) return;
    const id = setTimeout(() => setShown((s) => s + 1), 240);
    return () => clearTimeout(id);
    /* eslint-disable-next-line */
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
          <div key={i} style={{ color: l.startsWith('$') ? 'var(--accent)' : l.startsWith('▸') ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            {l}
          </div>
        ))}
        {shown < lines.length && <span className="inline-block w-2 h-3.5 align-middle" style={{ background: 'var(--accent)', animation: 'blink 1s steps(2) infinite' }} />}
      </div>
    </div>
  );
}

function AuctionWidget() {
  const [bids, setBids] = uS([
    { user: 'k1ng_b1d', amt: 4200, t: -8 },
    { user: 'silent_ofr', amt: 4350, t: -5 },
    { user: 'mr.outbid', amt: 4500, t: -2 },
  ]);
  const [t, setT] = uS(0);
  uE(() => {
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
            {bids.slice().reverse().map((b, i) => (
              <div key={i} className="flex justify-between" style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-muted)', opacity: 1 - i * 0.15 }}>
                <span>@{b.user}</span>
                <span>${b.amt.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PoseWidget() {
  const [t, setT] = uS(0);
  uE(() => { const id = setInterval(() => setT((v) => v + 1), 90); return () => clearInterval(id); }, []);
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
              const cy = 35 + squat * 6;
              const head = [50, 18];
              const sh = [[42, 30], [58, 30]];
              const elbow = [[36, 38], [64, 38]];
              const hand = [[34, 50], [66, 50]];
              const hip = [[46, 45 + squat * 4], [54, 45 + squat * 4]];
              const knee = [[44, 56 + squat * 2], [56, 56 + squat * 2]];
              const ankle = [[44, 68], [56, 68]];
              const segs = [
                [head, [50, 28]], [[50, 28], sh[0]], [[50, 28], sh[1]], [[50, 28], hip[0]], [[50, 28], hip[1]],
                [sh[0], elbow[0]], [elbow[0], hand[0]], [sh[1], elbow[1]], [elbow[1], hand[1]],
                [hip[0], knee[0]], [knee[0], ankle[0]], [hip[1], knee[1]], [knee[1], ankle[1]],
              ];
              const pts = [head, [50, 28], ...sh, ...elbow, ...hand, ...hip, ...knee, ...ankle];
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

function AudioSentWidget() {
  const [t, setT] = uS(0);
  uE(() => { const id = setInterval(() => setT((v) => v + 1), 100); return () => clearInterval(id); }, []);
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
                <div className="h-1 mt-1 rounded overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div style={{ width: `${v * 100}%`, height: '100%', background: 'var(--accent)' }} />
                </div>
                <div className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--accent)' }}>{(v * 100).toFixed(0)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NetworkWidget() {
  const [t, setT] = uS(0);
  uE(() => { const id = setInterval(() => setT((v) => v + 1), 80); return () => clearInterval(id); }, []);
  const nodes = uM(() => Array.from({ length: 18 }).map((_, i) => ({
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

window.WIDGETS = {
  osmMap: OSMMapWidget,
  chatAgent: ChatAgentWidget,
  cycleGraph: CycleGraphWidget,
  panorama: PanoramaWidget,
  tonePitch: TonePitchWidget,
  urlScanner: URLScannerWidget,
  pose: PoseWidget,
  audioSent: AudioSentWidget,
  network: NetworkWidget,
  auction: AuctionWidget,
  terminal: TerminalWidget,
};
