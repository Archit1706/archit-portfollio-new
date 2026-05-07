import type { Metadata } from 'next';
import { PROJECTS, PROJECT_BY_SLUG } from '@/lib/projects-data';
import { ProjectDetailClient } from './client';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECT_BY_SLUG[slug];
  if (!p) return { title: 'Project Not Found — Archit Rathod' };
  return {
    title: `${p.title} — Archit Rathod`,
    description: p.desc.slice(0, 160),
    openGraph: {
      title: `${p.title} — Archit Rathod`,
      description: p.desc.slice(0, 160),
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
