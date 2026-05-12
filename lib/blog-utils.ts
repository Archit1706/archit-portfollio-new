import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const BLOGS_DIR = path.join(process.cwd(), 'content/blogs');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: number;
  featured: boolean;
  content?: string; // HTML string, only loaded on detail page
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs.map((slug) => {
    const filePath = path.join(BLOGS_DIR, `${slug}.md`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return {
      slug: (data.slug as string) || slug,
      title: data.title as string,
      date: String(data.date).slice(0, 10),
      tags: (data.tags as string[]) || [],
      excerpt: data.excerpt as string,
      readingTime: (data.readingTime as number) || 5,
      featured: (data.featured as boolean) || false,
    } satisfies BlogPost;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Try filename-based lookup first, then scan for matching slug in frontmatter
  const candidates = getAllBlogSlugs();
  let filePath = path.join(BLOGS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    const match = candidates.find((c) => {
      const raw = fs.readFileSync(path.join(BLOGS_DIR, `${c}.md`), 'utf-8');
      const { data } = matter(raw);
      return data.slug === slug;
    });
    if (!match) return null;
    filePath = path.join(BLOGS_DIR, `${match}.md`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content: mdContent } = matter(raw);

  // Add IDs to headings for TOC anchoring
  const withIds = mdContent.replace(
    /^(#{1,3})\s+(.+)$/gm,
    (_, hashes: string, text: string) => `${hashes} ${text} {#${slugify(text)}}`
  );

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(withIds);

  // Post-process: inject IDs into heading tags
  const html = processed
    .toString()
    .replace(/<(h[1-3])>(.+?)\s*\{#([\w-]+)\}<\/\1>/g, '<$1 id="$3">$2</$1>');

  return {
    slug: (data.slug as string) || slug,
    title: data.title as string,
    date: String(data.date).slice(0, 10),
    tags: (data.tags as string[]) || [],
    excerpt: data.excerpt as string,
    readingTime: (data.readingTime as number) || 5,
    featured: (data.featured as boolean) || false,
    content: html,
  };
}

export function extractToc(html: string): TocItem[] {
  const headingRegex = /<h([1-3])\s+id="([\w-]+)">(.+?)<\/h[1-3]>/g;
  const toc: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    toc.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ''),
    });
  }
  return toc;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
