import { SITE_URL, AUTHOR } from '@/lib/seo';
import { Project } from '@/lib/projects-data';

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Root — Person + WebSite. Add once in root layout. */
export function RootJsonLd() {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': PERSON_ID,
            name: AUTHOR.name,
            url: SITE_URL,
            email: AUTHOR.email,
            jobTitle: AUTHOR.title,
            description: AUTHOR.bio,
            image: `${SITE_URL}/og-image.png`,
            alumniOf: [
              {
                '@type': 'CollegeOrUniversity',
                name: 'University of Illinois Chicago',
                url: 'https://uic.edu',
              },
              {
                '@type': 'CollegeOrUniversity',
                name: 'Thadomal Shahani Engineering College, University of Mumbai',
              },
            ],
            knowsAbout: [
              'Machine Learning Fairness',
              'AI Explainability',
              'Algorithmic Fairness',
              'Data Engineering',
              'Computer Vision',
              'Natural Language Processing',
              'Full Stack Development',
              'Geospatial Systems',
              'PyTorch',
              'Next.js',
            ],
            sameAs: [AUTHOR.github, AUTHOR.linkedin, AUTHOR.twitter],
          },
          {
            '@type': 'WebSite',
            '@id': SITE_ID,
            name: `${AUTHOR.name} — Portfolio`,
            url: SITE_URL,
            author: { '@id': PERSON_ID },
            description: AUTHOR.bio,
            inLanguage: 'en-US',
          },
        ],
      }}
    />
  );
}

/** Home page */
export function HomeJsonLd() {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        name: `${AUTHOR.name} — ${AUTHOR.title}`,
        url: SITE_URL,
        description: AUTHOR.bio,
        mainEntity: { '@id': PERSON_ID },
        isPartOf: { '@id': SITE_ID },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          ],
        },
      }}
    />
  );
}

/** Projects archive page */
export function ProjectsJsonLd({ count }: { count: number }) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/projects#collectionpage`,
        name: `Projects by ${AUTHOR.name}`,
        url: `${SITE_URL}/projects`,
        description: `Archive of ${count} projects by ${AUTHOR.name} spanning AI/ML, full-stack web development, urban analytics, and research.`,
        author: { '@id': PERSON_ID },
        isPartOf: { '@id': SITE_ID },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
          ],
        },
      }}
    />
  );
}

function isResearch(p: Project) {
  const c = p.category.toLowerCase();
  return c.includes('research') || c.includes('xai') || c.includes('mining');
}

/** Per-project detail page */
export function ProjectJsonLd({ p, idx }: { p: Project; idx: number }) {
  const url = `${SITE_URL}/project/${p.slug}`;
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
      { '@type': 'ListItem', position: 3, name: p.title, item: url },
    ],
  };

  const base = {
    '@id': `${url}#project`,
    name: p.title,
    headline: p.subtitle,
    description: p.desc,
    url,
    author: { '@id': PERSON_ID },
    datePublished: `${p.year}-01-01`,
    inLanguage: 'en-US',
    isPartOf: { '@id': SITE_ID },
    position: idx + 1,
  };

  const mainEntity = isResearch(p)
    ? {
        '@type': 'ScholarlyArticle',
        ...base,
        about: p.tech?.map((t) => ({ '@type': 'Thing', name: t })),
      }
    : {
        '@type': 'SoftwareSourceCode',
        ...base,
        programmingLanguage: p.tech ?? [],
        codeRepository: p.github,
        runtimePlatform: p.tech?.join(', '),
        ...(p.link ? { installUrl: p.link, applicationCategory: 'DeveloperApplication' } : {}),
      };

  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@graph': [mainEntity, breadcrumb],
      }}
    />
  );
}
