import type { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog-utils';
import { SITE_URL, AUTHOR, DEFAULT_OG } from '@/lib/seo';
import { BlogsClient } from './client';

export const metadata: Metadata = {
  title: 'Field Notes',
  description: 'Writing on ML fairness, systems design, explainable AI, and the questions worth asking. By Archit Rathod.',
  alternates: { canonical: `${SITE_URL}/blogs` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blogs`,
    title: `Field Notes — ${AUTHOR.name}`,
    description: 'Writing on ML fairness, systems design, and the questions worth asking.',
    images: [{ url: DEFAULT_OG.image, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: AUTHOR.handle,
    creator: AUTHOR.handle,
    title: `Field Notes — ${AUTHOR.name}`,
    description: 'Writing on ML fairness, systems design, and the questions worth asking.',
  },
};

export default function BlogsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <BlogsClient posts={posts} tags={tags} />;
}
