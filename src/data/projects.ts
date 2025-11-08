import { Lang } from '@/components/i18n/LanguageProvider';
import TEXT_DICTIONARY from './Texts';

export type Project = {
  slug: string;
  title: string;
  description: string;
  long_explanation: string;
  date: string;
  href: string;
  githubUrl: string;
  tags: string[];
  image: [string, 'portrait' | 'landscape'];
  gallery: [string, 'portrait' | 'landscape'][];
};

const projectGallery: Record<string, [string, 'portrait' | 'landscape'][]> = {
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
  sudokugenerator: [['/projects/sudokugenerator/image.png', 'landscape']],
};

export const projects = (language: Lang = 'en'): Project[] => {
  const projectSlugs = ['pokerist', 'sudokumobileapp', '2048-playing-algorithm', 'sudokugenerator'];

  const projectDates = {
    pokerist: '09/2025',
    sudokumobileapp: '07/2025',
    '2048-playing-algorithm': '04/2023',
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
      githubUrl: `https://github.com/kerem-kirici/${slug}`,
      tags,
      gallery,
    } satisfies Project;
  });
};

export function getProjectBySlug(slug: string, language: Lang = 'en'): Project | undefined {
  return projects(language).find((p) => p.slug === slug);
}
