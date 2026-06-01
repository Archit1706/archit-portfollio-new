import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

async function loadJetBrainsMono() {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600&display=swap',
    { headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' } }
  ).then((r) => r.text());
  const match = css.match(/src:\s*url\((https:[^)]+)\)\s*format/);
  if (!match) throw new Error('Could not parse Google Fonts CSS');
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function Icon() {
  const fontData = await loadJetBrainsMono();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#3ecf8e',
          color: '#0D0D14',
          fontFamily: 'JetBrains Mono',
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          borderRadius: 12,
        }}
      >
        AR
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'JetBrains Mono', data: fontData, style: 'normal', weight: 600 }],
    }
  );
}
