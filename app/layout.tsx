import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { PageTransition } from '@/components/page-transition';
import { CursorWrapper } from '@/components/cursor-wrapper';
import { StarField } from '@/components/star-field';
import { RootJsonLd } from '@/components/json-ld';
import { SITE_URL, AUTHOR, DEFAULT_OG, KEYWORDS } from '@/lib/seo';

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_OG.title,
    template: `%s — ${AUTHOR.name}`,
  },
  description: DEFAULT_OG.description,
  keywords: KEYWORDS,
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: `${AUTHOR.name} — Portfolio`,
    title: DEFAULT_OG.title,
    description: DEFAULT_OG.description,
    images: [
      {
        url: DEFAULT_OG.image,
        width: 1200,
        height: 630,
        alt: `${AUTHOR.name} — ${AUTHOR.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: AUTHOR.handle,
    creator: AUTHOR.handle,
    title: DEFAULT_OG.title,
    description: DEFAULT_OG.description,
    images: [DEFAULT_OG.image],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'portfolio',
  verification: {
    // Add these values after registering with each service
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    // yandex: 'YOUR_YANDEX_CODE',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <RootJsonLd />
        <link rel="me" href={AUTHOR.github} />
        <link rel="me" href={AUTHOR.linkedin} />
        {/* AI model discovery */}
        <link rel="alternate" type="text/plain" title="LLMs.txt" href="/llms.txt" />
      </head>
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
