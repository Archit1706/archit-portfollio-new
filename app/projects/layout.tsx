import type { Metadata } from 'next';
import { SITE_URL, AUTHOR, DEFAULT_OG } from '@/lib/seo';
import { PROJECTS } from '@/lib/projects-data';
import { ProjectsJsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Archive of ${PROJECTS.length} projects by ${AUTHOR.name} — spanning AI/ML, full-stack web development, urban analytics, and research (2021–2026). FairLint DL, Galaxy Morphology XAI, OSM Road Closures, Keya AI, and more.`,
  keywords: [
    'Archit Rathod projects',
    'ML fairness projects',
    'AI explainability portfolio',
    'FairLint DL',
    'Galaxy Morphology XAI',
    'OSM temporary road closures',
    'Keya AI',
    'GreenPipe CI/CD',
    'FairLend Miners',
  ],
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/projects`,
    title: `Projects — ${AUTHOR.name}`,
    description: `${PROJECTS.length} projects spanning AI/ML, full-stack, and research.`,
    images: [{ url: DEFAULT_OG.image, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Projects — ${AUTHOR.name}`,
    description: `${PROJECTS.length} projects spanning AI/ML, full-stack, and research.`,
    images: [DEFAULT_OG.image],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectsJsonLd count={PROJECTS.length} />
      {children}
    </>
  );
}
