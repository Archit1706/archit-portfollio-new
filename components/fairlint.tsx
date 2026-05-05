'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

function IconPlay({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function IconPause({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function LogLine({ show, delay, children }: { show: boolean; delay: number; children: ReactNode }) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(4px)',
        transition: `all 0.4s var(--ease) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

type Phase = 'idle' | 'scanning' | 'flagging' | 'done';

export function FairLintWidget() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scanStep, setScanStep] = useState(0);
  const [flagged, setFlagged] = useState<{ row: number; col: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = () => {
    setPhase('idle');
    setScanStep(0);
    setFlagged(null);
    setProgress(0);
  };

  const run = () => {
    reset();
    setPhase('scanning');
    let t = 0;
    const tick = () => {
      t += 1;
      setScanStep(t);
      setProgress(Math.min(100, t * 5));
      if (t < 20) {
        timerRef.current = setTimeout(tick, 90);
      } else {
        setPhase('flagging');
        setFlagged({ row: 2, col: 3 });
        timerRef.current = setTimeout(() => setPhase('done'), 800);
      }
    };
    timerRef.current = setTimeout(tick, 200);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const layers = [4, 6, 6, 3];
  const layerX = [40, 150, 260, 370];
  const nodeY = (count: number, i: number) => {
    const h = 200;
    const step = h / (count + 1);
    return 20 + step * (i + 1);
  };

  const edges: { l: number; i: number; j: number }[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (let i = 0; i < layers[l]; i++) {
      for (let j = 0; j < layers[l + 1]; j++) {
        edges.push({ l, i, j });
      }
    }
  }

  const rowLabels = ['18–25', '26–35', '36–50', '50+'];
  const colLabels = ['<30k', '30–60k', '60–100k', '>100k'];
  const baseMatrix = [
    [0.82, 0.79, 0.84, 0.88],
    [0.81, 0.80, 0.83, 0.87],
    [0.78, 0.76, 0.74, 0.69],
    [0.80, 0.82, 0.85, 0.89],
  ];

  const statusColor =
    phase === 'idle' ? 'var(--text-muted)' :
    phase === 'scanning' ? 'var(--accent)' :
    '#f472b6';
  const statusText =
    phase === 'idle' ? 'READY' :
    phase === 'scanning' ? 'SCANNING' :
    phase === 'flagging' ? 'FLAGGED' :
    'AUDIT COMPLETE';

  return (
    <div className="glass rounded-2xl overflow-hidden relative" style={{ boxShadow: 'var(--shadow-glass)' }}>
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
          </div>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            fairlint-dl · vscode-extension · v0.4.2
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: statusColor, boxShadow: `0 0 8px ${statusColor}` }} />
          <span style={{ color: statusColor, letterSpacing: '0.06em' }}>{statusText}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-0">
        <div className="md:col-span-3 p-5 border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
                Model · Credit-scoring DNN
              </div>
              <div className="font-serif text-lg mt-1">Gradient-ascent counterfactual search</div>
            </div>
            <button
              onClick={phase === 'idle' || phase === 'done' ? run : reset}
              className="smooth font-mono text-[11px] px-3 py-2 rounded-md flex items-center gap-2"
              style={{
                background: phase === 'scanning' ? 'transparent' : 'var(--accent)',
                color: phase === 'scanning' ? 'var(--text-primary)' : 'var(--bg)',
                border: `1px solid ${phase === 'scanning' ? 'var(--border-strong)' : 'var(--accent)'}`,
              }}
              data-hover
            >
              {phase === 'scanning' ? <><IconPause size={12} /> CANCEL</> : phase === 'done' ? <><IconPlay size={12} /> RE-RUN AUDIT</> : <><IconPlay size={12} /> RUN FAIRNESS AUDIT</>}
            </button>
          </div>

          <svg viewBox="0 0 410 220" className="w-full" style={{ maxHeight: 240 }}>
            {edges.map((e, idx) => {
              const x1 = layerX[e.l], y1 = nodeY(layers[e.l], e.i);
              const x2 = layerX[e.l + 1], y2 = nodeY(layers[e.l + 1], e.j);
              const active = phase === 'scanning' && scanStep >= e.l * 6 && scanStep <= (e.l + 1) * 8;
              const done = phase === 'flagging' || phase === 'done';
              return (
                <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={active ? 'var(--accent)' : done ? 'var(--border-strong)' : 'var(--border)'}
                  strokeWidth={active ? 1.2 : 0.6} opacity={active ? 0.9 : 0.55}
                  style={{ transition: 'all 0.3s var(--ease)' }}
                />
              );
            })}
            {layers.map((count, l) =>
              Array.from({ length: count }).map((_, i) => {
                const active = phase === 'scanning' && scanStep >= l * 6 && scanStep <= l * 6 + 8;
                const done = phase !== 'idle' && scanStep >= l * 6;
                return (
                  <g key={`${l}-${i}`}>
                    <circle cx={layerX[l]} cy={nodeY(count, i)} r={active ? 5 : 3.5}
                      fill={done ? 'var(--accent)' : 'var(--bg-elev)'}
                      stroke={done ? 'var(--accent)' : 'var(--border-strong)'}
                      strokeWidth={1} style={{ transition: 'all 0.3s var(--ease)' }}
                    />
                    {active && <circle cx={layerX[l]} cy={nodeY(count, i)} r={10} fill="none" stroke="var(--accent)" strokeWidth={0.8} opacity={0.6} />}
                  </g>
                );
              })
            )}
            {(['input', 'dense₁', 'dense₂', 'softmax'] as const).map((lab, l) => (
              <text key={lab} x={layerX[l]} y={215} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--text-muted)">{lab}</text>
            ))}
          </svg>

          <div className="mt-3 font-mono text-[11px] leading-5 rounded-md p-3" style={{ background: 'var(--bg-elev)', color: 'var(--text-muted)', minHeight: 110 }}>
            <LogLine show={phase !== 'idle'} delay={0}><span style={{ color: 'var(--accent)' }}>$</span> fairlint audit --model=credit_dnn --protected=age</LogLine>
            <LogLine show={phase !== 'idle' && scanStep >= 2} delay={0.1}>→ loading checkpoint · 4.2M params · 3 hidden layers</LogLine>
            <LogLine show={phase !== 'idle' && scanStep >= 6} delay={0.2}>→ phase 1: gradient ascent on latent perturbations ε ∈ [−0.3, 0.3]</LogLine>
            <LogLine show={phase !== 'idle' && scanStep >= 12} delay={0.3}>→ phase 2: counterfactual search · n=2048 synthetic samples</LogLine>
            <LogLine show={phase === 'flagging' || phase === 'done'} delay={0.4}><span style={{ color: '#f472b6' }}>!</span> edge case detected: age∈[36,50] × income∈[&gt;100k]</LogLine>
            <LogLine show={phase === 'done'} delay={0.5}><span style={{ color: 'var(--accent)' }}>✓</span> done in 1.2s · 40% faster than baseline</LogLine>
          </div>
        </div>

        <div className="md:col-span-2 p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>Counterfactual Matrix</div>
          <div className="font-serif text-lg mt-1 mb-3">Approval probability</div>

          <div className="grid gap-1 text-center" style={{ gridTemplateColumns: 'auto repeat(4, 1fr)' }}>
            <div />
            {colLabels.map((c) => <div key={c} className="font-mono text-[9px] pb-1" style={{ color: 'var(--text-muted)' }}>{c}</div>)}
            {baseMatrix.map((row, r) => [
              <div key={`l-${r}`} className="font-mono text-[9px] self-center pr-1 text-right" style={{ color: 'var(--text-muted)' }}>{rowLabels[r]}</div>,
              ...row.map((v, c) => {
                const isFlag = flagged && flagged.row === r && flagged.col === c;
                const visited = phase === 'scanning' && r * 4 + c < Math.floor((scanStep / 20) * 16);
                return (
                  <div key={`c-${r}-${c}`}
                    className={'fl-grid-cell font-mono text-[11px] py-2 rounded-sm ' + (isFlag ? 'fl-flag' : '')}
                    style={{
                      background: isFlag ? '#f472b6' : visited ? 'var(--accent-soft)' : 'var(--bg-elev)',
                      color: isFlag ? 'var(--bg)' : 'var(--text-primary)',
                      border: '1px solid ' + (isFlag ? '#f472b6' : 'var(--border)'),
                    }}
                  >
                    {v.toFixed(2)}
                  </div>
                );
              }),
            ])}
          </div>

          <hr className="rule my-4" />

          {phase === 'done' ? (
            <div className="space-y-2 text-[12px]">
              {[['Δ Approval', '−0.18', '#f472b6'], ['Disparate Impact', '0.79 ✗', '#f472b6'], ['p-value', '0.003', 'var(--text-primary)'], ['Suggested fix', 'reweigh(age)', 'var(--accent)']].map(([k, v, color]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span className="font-mono" style={{ color }}>{v}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="font-mono text-[11px]" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {phase === 'idle'
                ? <>Click <span style={{ color: 'var(--accent)' }}>Run Fairness Audit</span> to sweep 2,048 counterfactual samples and surface the discriminatory edge case.</>
                : <>Sweeping latent space… <span style={{ color: 'var(--accent)' }}>{progress}%</span></>
              }
            </div>
          )}
        </div>
      </div>

      <div className="h-0.5 w-full" style={{ background: 'var(--border)' }}>
        <div className="h-full" style={{
          width: `${phase === 'done' ? 100 : progress}%`,
          background: phase === 'flagging' || phase === 'done' ? '#f472b6' : 'var(--accent)',
          transition: 'width 0.3s var(--ease), background 0.3s var(--ease)',
        }} />
      </div>
    </div>
  );
}
