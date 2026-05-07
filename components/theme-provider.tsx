'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextValue {
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  accentHue: number;
  setAccentHue: (h: number) => void;
  showGrid: boolean;
  setShowGrid: (v: boolean) => void;
  customCursor: boolean;
  setCustomCursor: (v: boolean) => void;
  ambientGlow: boolean;
  setAmbientGlow: (v: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
  accentHue: 152,
  setAccentHue: () => {},
  showGrid: true,
  setShowGrid: () => {},
  customCursor: true,
  setCustomCursor: () => {},
  ambientGlow: true,
  setAmbientGlow: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [accentHue, setAccentHueState] = useState(152);
  const [showGrid, setShowGrid] = useState(true);
  const [customCursor, setCustomCursor] = useState(true);
  const [ambientGlow, setAmbientGlow] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('ar-theme');
    const saved = raw === 'dark' || raw === 'light' ? raw : null;
    if (saved) setThemeState(saved);
    const savedHue = localStorage.getItem('ar-accent-hue');
    if (savedHue) setAccentHueState(Number(savedHue));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.body.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('light', theme === 'light');
    localStorage.setItem('ar-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', `oklch(0.72 0.15 ${accentHue})`);
    document.documentElement.style.setProperty('--accent-soft', `oklch(0.72 0.15 ${accentHue} / 0.12)`);
    localStorage.setItem('ar-accent-hue', String(accentHue));
  }, [accentHue]);

  const setTheme = (t: 'dark' | 'light') => setThemeState(t);
  const setAccentHue = (h: number) => setAccentHueState(h);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentHue, setAccentHue, showGrid, setShowGrid, customCursor, setCustomCursor, ambientGlow, setAmbientGlow }}>
      {children}
    </ThemeContext.Provider>
  );
}
