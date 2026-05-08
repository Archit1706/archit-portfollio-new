import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { PageTransition } from '@/components/page-transition';
import { CursorWrapper } from '@/components/cursor-wrapper';
import { StarField } from '@/components/star-field';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-fraunces',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Archit Rathod — Software Engineer & ML Fairness Researcher',
  description:
    'Portfolio of Archit Rathod — bridging scalable data engineering with transparent, responsible AI. MS Computer Science @ UIC.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Archit Rathod — Software Engineer & ML Fairness Researcher',
    description:
      'Portfolio of Archit Rathod — bridging scalable data engineering with transparent, responsible AI. MS Computer Science @ UIC.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
      >
        <ThemeProvider>
          <StarField />
          <CursorWrapper />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
