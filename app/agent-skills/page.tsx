import type { Metadata } from 'next';
import { SKILLS, SKILL_CATEGORIES } from '@/lib/skills-data';
import { AgentSkillsClient } from './client';
import { SITE_URL, AUTHOR, DEFAULT_OG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Agent Skills — Archit Rathod',
  description: `A curated collection of ${SKILLS.length} Claude Code skills used by Archit Rathod. Copy the SKILL.md files and use them in your own Claude Code setup.`,
  openGraph: {
    title: 'Agent Skills — Archit Rathod',
    description: `${SKILLS.length} Claude Code skills, ready to copy and use.`,
    url: `${SITE_URL}/agent-skills`,
    siteName: DEFAULT_OG.title,
    images: [{ url: DEFAULT_OG.image }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Skills — Archit Rathod',
    description: `${SKILLS.length} Claude Code skills, ready to copy and use.`,
    creator: `@${AUTHOR.handle}`,
  },
};

export default function AgentSkillsPage() {
  return <AgentSkillsClient skills={SKILLS} categories={SKILL_CATEGORIES} />;
}
