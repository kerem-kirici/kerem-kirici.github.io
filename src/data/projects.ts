import { Lang } from '@/components/i18n/LanguageProvider';
import TEXT_DICTIONARY from './Texts';

export type Project = {
  slug: string;
  title: string;
  description: string;
  long_explanation: string;
  href: string;
  githubUrl: string;
  tags: string[];
  image: string;
  gallery: string[];
};

const projectGallery: Record<string, string[]> = {
  pokerist: [
    '/projects/pokerist/Simulator Screenshot - iPhone 17 Pro - Dark Home.png',
    '/projects/pokerist/Simulator Screenshot - iPhone 17 Pro - Light Home.png',
    '/projects/pokerist/Simulator Screenshot - iPhone 17 Pro - Dark Sheet Full.png',
    '/projects/pokerist/Simulator Screenshot - iPhone 17 Pro - Light Sheet Half.png',
  ],
  '2048-playing-algorithm': [
    '/projects/2048-playing-algorithm/image.png',
    '/projects/2048-playing-algorithm/image2.png',
    '/projects/2048-playing-algorithm/image3.jpg',
  ],
  sudokumobileapp: ['/projects/sudokumobileapp/image.png'],
  sudokugenerator: ['/projects/sudokugenerator/image.png'],
};

export const projects = (language: Lang = 'en'): Project[] => {
  const projectSlugs = ['pokerist', 'sudokumobileapp', '2048-playing-algorithm', 'sudokugenerator'];

  return projectSlugs.map((slug) => {
    const tags = TEXT_DICTIONARY[`projects.${slug}.tags` as keyof typeof TEXT_DICTIONARY][language]
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const gallery = projectGallery[slug] ?? [`/projects/${slug}/image.png`];

    return {
      slug,
      title: TEXT_DICTIONARY[`projects.${slug}.title` as keyof typeof TEXT_DICTIONARY][language],
      image: gallery[0] ?? `/projects/${slug}/image.png`,
      description:
        TEXT_DICTIONARY[`projects.${slug}.description` as keyof typeof TEXT_DICTIONARY][language],
      long_explanation:
        TEXT_DICTIONARY[`projects.${slug}.long_explanation` as keyof typeof TEXT_DICTIONARY][
          language
        ],
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
