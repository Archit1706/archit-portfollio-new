'use client';

import { useEffect } from 'react';
import { useTheme } from './theme-provider';

/**
 * Draws the "AR" monogram favicon on a canvas at runtime and swaps it into
 * <link rel="icon"> whenever the user changes accentHue or theme via the tweaks
 * panel. Runs purely on the client — the static app/icon.tsx still handles
 * first paint, social previews, and bookmarks.
 *
 * Canvas's color parser doesn't reliably accept oklch() across all browsers, so
 * we resolve oklch → rgb via a hidden DOM probe before drawing.
 */
export function DynamicFavicon() {
  const { accentHue, theme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    async function update() {
      // Wait for JetBrains Mono (loaded by next/font) to be ready before drawing.
      try {
        await document.fonts.ready;
      } catch {
        // ignore; fall through to system mono
      }
      if (cancelled) return;

      // Resolve oklch → rgb via a probe so canvas always gets a parseable color.
      const probe = document.createElement('span');
      probe.style.color = `oklch(0.72 0.15 ${accentHue})`;
      probe.style.position = 'absolute';
      probe.style.visibility = 'hidden';
      document.body.appendChild(probe);
      const accent = getComputedStyle(probe).color;
      document.body.removeChild(probe);

      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Rounded square background.
      const radius = 12;
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(size - radius, 0);
      ctx.quadraticCurveTo(size, 0, size, radius);
      ctx.lineTo(size, size - radius);
      ctx.quadraticCurveTo(size, size, size - radius, size);
      ctx.lineTo(radius, size);
      ctx.quadraticCurveTo(0, size, 0, size - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fill();

      // "AR" in JetBrains Mono. Foreground matches --bg so it inverts with theme.
      ctx.fillStyle = theme === 'dark' ? '#0D0D14' : '#FAFAF9';
      ctx.font = '600 30px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AR', size / 2, size / 2 + 2);

      const dataUrl = canvas.toDataURL('image/png');

      // Replace every existing icon link so the browser picks ours.
      document
        .querySelectorAll<HTMLLinkElement>('link[rel~="icon"]')
        .forEach((l) => l.remove());

      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = dataUrl;
      document.head.appendChild(link);
    }

    update();
    return () => {
      cancelled = true;
    };
  }, [accentHue, theme]);

  return null;
}
