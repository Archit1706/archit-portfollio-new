import type { Metadata } from 'next';
import { getAllBlogSlugs, getAllPosts, getPostBySlug, extractToc } from '@/lib/blog-utils';
import { SITE_URL, AUTHOR, DEFAULT_OG } from '@/lib/seo';
import { BlogPostClient } from './client';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const url = `${SITE_URL}/blogs/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: AUTHOR.name }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${post.title} — ${AUTHOR.name}`,
      description: post.excerpt,
      publishedTime: `${post.date}T00:00:00Z`,
      authors: [AUTHOR.name],
      tags: post.tags,
      images: [{ url: DEFAULT_OG.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      site: AUTHOR.handle,
      creator: AUTHOR.handle,
      title: post.title,
      description: post.excerpt,
      images: [DEFAULT_OG.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.content) notFound();

  const toc = extractToc(post.content);
  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === post.slug);
  const prev = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const next = idx > 0 ? allPosts[idx - 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/blogs/${post.slug}#post`,
        headline: post.title,
        description: post.excerpt,
        author: { '@type': 'Person', name: AUTHOR.name, url: SITE_URL },
        datePublished: `${post.date}T00:00:00Z`,
        keywords: post.tags.join(', '),
        url: `${SITE_URL}/blogs/${post.slug}`,
        timeRequired: `PT${post.readingTime}M`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Field Notes', item: `${SITE_URL}/blogs` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blogs/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} toc={toc} prev={prev ?? undefined} next={next ?? undefined} />
    </>
  );
}
