import type { Metadata } from 'next';
import { SITE_URL, AUTHOR, DEFAULT_OG } from '@/lib/seo';
import { RESEARCH, PUBLISHED } from '@/lib/research-data';
import { CVClient } from './client';

export const metadata: Metadata = {
  title: 'CV — Archit Rathod',
  description: 'Curriculum vitae of Archit Rathod — Software Engineer & ML Fairness Researcher. MS Computer Science at University of Illinois Chicago.',
  keywords: [
    'Archit Rathod CV',
    'Archit Rathod resume',
    'ML Fairness Researcher CV',
    'Software Engineer UIC',
    'University of Illinois Chicago CS',
    'ML research resume',
    'AI engineer CV',
  ],
  alternates: { canonical: `${SITE_URL}/cv` },
  openGraph: {
    title: 'CV — Archit Rathod',
    description: 'Software Engineer & ML Fairness Researcher · MS CS @ UIC',
    url: `${SITE_URL}/cv`,
    siteName: DEFAULT_OG.title,
    images: [{ url: DEFAULT_OG.image }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: AUTHOR.handle,
    creator: AUTHOR.handle,
    title: 'CV — Archit Rathod',
    description: 'Software Engineer & ML Fairness Researcher · MS CS @ UIC',
  },
};

export default function CVPage() {
  return <CVClient research={RESEARCH} publishedCount={PUBLISHED.length} />;
}
