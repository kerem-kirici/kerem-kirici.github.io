import { Lang } from '@/components/i18n/LanguageProvider';
import TEXT_DICTIONARY from './Texts';

export type Project = {
  slug: string;
  title: string;
  description: string;
  long_explanation: string;
  date: string;
  href: string;
  /** Null when the repository is private. */
  githubUrl: string | null;
  inProgress: boolean;
  tags: string[];
  image: [string, 'portrait' | 'landscape'];
  gallery: [string, 'portrait' | 'landscape'][];
};

const projectGallery: Record<string, [string, 'portrait' | 'landscape'][]> = {
  pulsewindow: [
    ['/projects/pulsewindow/image.png', 'landscape'],
    ['/projects/pulsewindow/image2.png', 'landscape'],
  ],
  pokerist: [
    ['/projects/pokerist/image.png', 'portrait'],
    ['/projects/pokerist/image2.png', 'portrait'],
    ['/projects/pokerist/image3.png', 'portrait'],
    ['/projects/pokerist/image4.png', 'portrait'],
    ['/projects/pokerist/image5.png', 'portrait'],
  ],
  '2048-playing-algorithm': [
    ['/projects/2048-playing-algorithm/image.png', 'landscape'],
    ['/projects/2048-playing-algorithm/image2.png', 'landscape'],
    ['/projects/2048-playing-algorithm/image3.png', 'landscape'],
  ],
  sudokumobileapp: [
    ['/projects/sudokumobileapp/image.png', 'portrait'],
    ['/projects/sudokumobileapp/image2.png', 'portrait'],
    ['/projects/sudokumobileapp/image3.png', 'portrait'],
    ['/projects/sudokumobileapp/image4.png', 'portrait'],
    ['/projects/sudokumobileapp/image5.png', 'portrait'],
  ],
  'arbitrage-alerts': [['/projects/arbitrage-alerts/image.png', 'landscape']],
  sudokugenerator: [['/projects/sudokugenerator/image.png', 'landscape']],
};

// Repositories that are private on GitHub, so the site shouldn't link to them.
const privateRepos = new Set(['pulsewindow']);

// Projects still being built.
const inProgressProjects = new Set(['pulsewindow']);

// Shown first on the home page: the work closest to full-stack and data engineering.
export const FEATURED_SLUGS = [
  'pulsewindow',
  'pokerist',
  '2048-playing-algorithm',
  'arbitrage-alerts',
] as const;

export const projects = (language: Lang = 'en'): Project[] => {
  const projectSlugs = [
    'pulsewindow',
    'pokerist',
    'sudokumobileapp',
    '2048-playing-algorithm',
    'arbitrage-alerts',
    'sudokugenerator',
  ];

  const projectDates = {
    pulsewindow: '10/2026',
    pokerist: '10/2025',
    sudokumobileapp: '06/2025',
    '2048-playing-algorithm': '04/2023',
    'arbitrage-alerts': '10/2021',
    sudokugenerator: '07/2021',
  };

  return projectSlugs.map((slug) => {
    const tags = TEXT_DICTIONARY[`projects.${slug}.tags` as keyof typeof TEXT_DICTIONARY][language]
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const gallery = projectGallery[slug] ?? [[`/projects/${slug}/image.png`, 'portrait']];

    return {
      slug,
      title: TEXT_DICTIONARY[`projects.${slug}.title` as keyof typeof TEXT_DICTIONARY][language],
      image:
        gallery[0] ??
        (['/projects/${slug}/image.png', 'portrait'] as [string, 'portrait' | 'landscape']),
      description:
        TEXT_DICTIONARY[`projects.${slug}.description` as keyof typeof TEXT_DICTIONARY][language],
      long_explanation:
        TEXT_DICTIONARY[`projects.${slug}.long_explanation` as keyof typeof TEXT_DICTIONARY][
          language
        ],
      date: projectDates[slug as keyof typeof projectDates],
      href: `/projects/${slug}`,
      githubUrl: privateRepos.has(slug) ? null : `https://github.com/kerem-kirici/${slug}`,
      inProgress: inProgressProjects.has(slug),
      tags,
      gallery,
    } satisfies Project;
  });
};

export function getProjectBySlug(slug: string, language: Lang = 'en'): Project | undefined {
  return projects(language).find((p) => p.slug === slug);
}
