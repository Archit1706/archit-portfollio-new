'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './theme-provider';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const isDark = theme === 'dark';
    const starColor = isDark ? '255,255,255' : '30,30,50';
    const isMobile = W < 768;

    // Fewer particles on mobile to reduce paint load
    const COUNT = isMobile
      ? Math.min(60, Math.floor((W * H) / 12000))
      : Math.min(120, Math.floor((W * H) / 9000));

    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * (0.05 + depth * 0.2),
        vy: (Math.random() - 0.5) * (0.05 + depth * 0.2),
        size: 0.4 + depth * 1.4,
        opacity: isDark ? 0.15 + depth * 0.55 : 0.06 + depth * 0.2,
        twinkleOffset: Math.random() * Math.PI * 2,
      };
    });

    const shootingStars: ShootingStar[] = [];
    let shootTimer = 0;
    const SHOOT_EVERY = 360;

    let frame = 0;
    let raf: number;
    let paused = false;

    function draw() {
      if (paused) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx!.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const twinkle = 0.8 + 0.2 * Math.sin(frame * 0.018 + p.twinkleOffset);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${starColor},${(p.opacity * twinkle).toFixed(3)})`;
        ctx!.fill();
      }

      shootTimer++;
      if (shootTimer >= SHOOT_EVERY + Math.random() * 120) {
        shootTimer = 0;
        const fromTop = Math.random() > 0.3;
        const life = 50 + Math.random() * 35;
        shootingStars.push({
          x: fromTop ? Math.random() * W * 0.75 : -10,
          y: fromTop ? Math.random() * H * 0.45 : Math.random() * H * 0.5,
          vx: 7 + Math.random() * 6,
          vy: 2.5 + Math.random() * 4,
          life,
          maxLife: life,
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const progress = 1 - s.life / s.maxLife;

        let alpha: number;
        if (progress < 0.15) {
          alpha = progress / 0.15;
        } else if (s.life < 12) {
          alpha = s.life / 12;
        } else {
          alpha = 1;
        }
        alpha *= isDark ? 0.85 : 0.35;

        const tailLen = 20 + progress * 50;
        const tx = s.x - s.vx * (tailLen / 10);
        const ty = s.y - s.vy * (tailLen / 10);

        const grad = ctx!.createLinearGradient(s.x, s.y, tx, ty);
        grad.addColorStop(0, `rgba(${starColor},${alpha.toFixed(3)})`);
        grad.addColorStop(1, `rgba(${starColor},0)`);
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(tx, ty);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.2;
        ctx!.stroke();

        s.x += s.vx;
        s.y += s.vy;
        s.life--;
        if (s.life <= 0 || s.x > W + 50 || s.y > H + 50) {
          shootingStars.splice(i, 1);
        }
      }

      frame++;
      raf = requestAnimationFrame(draw);
    }

    // Pause when tab is hidden to save CPU
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    // Defer start until after page is interactive
    const startId = setTimeout(() => {
      raf = requestAnimationFrame(draw);
    }, 500);

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      clearTimeout(startId);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
        willChange: 'transform',
      }}
    />
  );
}
