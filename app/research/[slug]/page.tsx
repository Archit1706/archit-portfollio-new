import type { Metadata } from 'next';
import { RESEARCH, RESEARCH_BY_SLUG } from '@/lib/research-data';
import { SITE_URL, AUTHOR, DEFAULT_OG } from '@/lib/seo';
import { ResearchDetailClient } from './client';

export function generateStaticParams() {
  return RESEARCH.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = RESEARCH_BY_SLUG[slug];

  if (!r) return { title: 'Paper Not Found' };

  const url = `${SITE_URL}/research/${r.slug}`;
  const description =
    r.abstract.length > 160 ? `${r.abstract.slice(0, 157)}…` : r.abstract;

  return {
    title: r.shortTitle,
    description,
    keywords: [...r.keywords, r.venue, AUTHOR.name, 'research paper'],
    authors: r.authors.map((name) => ({ name })),
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${r.title} — ${AUTHOR.name}`,
      description,
      publishedTime: `${r.date}T00:00:00Z`,
      authors: r.authors,
      tags: r.keywords,
      images: [{ url: DEFAULT_OG.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      site: AUTHOR.handle,
      creator: AUTHOR.handle,
      title: `${r.shortTitle} — ${AUTHOR.name}`,
      description,
      images: [DEFAULT_OG.image],
    },
  };
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = RESEARCH_BY_SLUG[slug];

  const jsonLd = r
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': r.status === 'published' ? 'ScholarlyArticle' : 'TechArticle',
            '@id': `${SITE_URL}/research/${r.slug}#paper`,
            name: r.title,
            headline: r.title,
            abstract: r.abstract,
            author: r.authors.map((name) => ({ '@type': 'Person', name })),
            datePublished: r.date,
            inLanguage: 'en-US',
            keywords: r.keywords.join(', '),
            url: `${SITE_URL}/research/${r.slug}`,
            ...(r.publisher ? { publisher: { '@type': 'Organization', name: r.publisher } } : {}),
            ...(r.arxiv ? { sameAs: r.arxiv } : {}),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Research', item: `${SITE_URL}/#research` },
              { '@type': 'ListItem', position: 3, name: r.shortTitle, item: `${SITE_URL}/research/${r.slug}` },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ResearchDetailClient slug={slug} />
    </>
  );
}
