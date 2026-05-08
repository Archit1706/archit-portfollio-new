import type { Metadata } from 'next';
import { PROJECTS, PROJECT_BY_SLUG } from '@/lib/projects-data';
import { SITE_URL, AUTHOR, DEFAULT_OG } from '@/lib/seo';
import { ProjectJsonLd } from '@/components/json-ld';
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

  if (!p) {
    return {
      title: 'Project Not Found',
      description: 'This project does not exist.',
    };
  }

  const url = `${SITE_URL}/project/${p.slug}`;
  const description = p.desc.length > 160 ? `${p.desc.slice(0, 157)}…` : p.desc;
  const title = p.title;

  return {
    title,
    description,
    keywords: [p.title, ...(p.tech ?? []), p.category, AUTHOR.name, 'portfolio project'],
    authors: [{ name: AUTHOR.name, url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${title} — ${AUTHOR.name}`,
      description,
      publishedTime: `${p.year}-01-01T00:00:00Z`,
      authors: [AUTHOR.name],
      tags: p.tech ?? [],
      images: [
        {
          url: DEFAULT_OG.image,
          width: 1200,
          height: 630,
          alt: `${title} — ${AUTHOR.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: AUTHOR.handle,
      creator: AUTHOR.handle,
      title: `${title} — ${AUTHOR.name}`,
      description,
      images: [DEFAULT_OG.image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PROJECT_BY_SLUG[slug];
  const idx = PROJECTS.findIndex((x) => x.slug === slug);

  return (
    <>
      {p && <ProjectJsonLd p={p} idx={idx} />}
      <ProjectDetailClient slug={slug} />
    </>
  );
}
