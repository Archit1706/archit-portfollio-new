'use client';

import { useState, ReactNode } from 'react';

interface TweaksPanelProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function TweaksPanel({ title, defaultOpen = false, children }: TweaksPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 font-mono"
      style={{ zIndex: 60 }}
    >
      {open && (
        <div
          className="mb-2 rounded-xl overflow-hidden"
          style={{
            background: 'var(--bg-elev)',
            border: '1px solid var(--border-strong)',
            width: 260,
            boxShadow: 'var(--shadow-glass)',
          }}
        >
          <div
            className="px-4 py-3 text-[11px] uppercase tracking-[0.18em] border-b"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            {title}
          </div>
          <div className="p-3 space-y-4 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[11px] uppercase tracking-[0.18em] smooth"
        style={{
          background: 'var(--bg-elev)',
          border: '1px solid var(--border-strong)',
          color: 'var(--text-muted)',
        }}
        data-hover
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
        {open ? 'close' : 'tweaks'}
      </button>
    </div>
  );
}

interface TweakSectionProps {
  title: string;
  children: ReactNode;
}

export function TweakSection({ title, children }: TweakSectionProps) {
  return (
    <div>
      <div
        className="text-[9px] uppercase tracking-[0.18em] mb-2"
        style={{ color: 'var(--text-faint)' }}
      >
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

interface TweakSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}

export function TweakSlider({ label, min, max, step, value, onChange }: TweakSliderProps) {
  return (
    <div>
      <div
        className="flex justify-between text-[10px] mb-1"
        style={{ color: 'var(--text-muted)' }}
      >
        <span>{label}</span>
        <span style={{ color: 'var(--accent)' }}>{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: 'var(--accent)' }}
      />
    </div>
  );
}

interface TweakToggleProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export function TweakToggle({ label, value, onChange }: TweakToggleProps) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <button
        onClick={() => onChange(!value)}
        className="relative w-8 h-4 rounded-full smooth"
        style={{
          background: value ? 'var(--accent)' : 'var(--border-strong)',
          border: '1px solid ' + (value ? 'var(--accent)' : 'var(--border-strong)'),
        }}
        data-hover
      >
        <span
          className="absolute top-0.5 w-3 h-3 rounded-full smooth"
          style={{
            background: 'var(--bg)',
            left: value ? '17px' : '1px',
            transition: 'left 0.3s var(--ease)',
          }}
        />
      </button>
    </div>
  );
}
