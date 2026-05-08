import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/projects-data';
import { RESEARCH } from '@/lib/research-data';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE_URL}/project/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p.featured ? 0.85 : 0.75,
  }));

  const researchRoutes: MetadataRoute.Sitemap = RESEARCH.map((r) => ({
    url: `${SITE_URL}/research/${r.slug}`,
    lastModified: new Date(r.date),
    changeFrequency: 'monthly' as const,
    priority: r.status === 'published' ? 0.85 : 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...researchRoutes];
}
