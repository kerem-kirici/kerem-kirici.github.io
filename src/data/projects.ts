import { Lang } from '@/components/i18n/LanguageProvider';
import TEXT_DICTIONARY from './Texts';

export type Project = {
  slug: string;
  title: string;
  description: string;
  long_explanation: string;
  href: string;
  tags: string[];
  image?: string;
};

export const projects = (language: Lang = 'en') => {
  const projectSlugs = ['pokerist', 'sudokumobileapp', '2048-playing-algorithm', 'sudokugenerator'];

  return projectSlugs.reduce(
    (
      acc: {
        slug: string;
        title: string;
        image: string;
        description: string;
        long_explanation: string;
        href: string;
        tags: string[];
      }[],
      slug: string,
    ) => {
      return [
        ...acc,
        {
          slug,
          title:
            TEXT_DICTIONARY[`projects.${slug}.title` as keyof typeof TEXT_DICTIONARY][language],
          image: `/projects/${slug}/image.png`,
          description:
            TEXT_DICTIONARY[`projects.${slug}.description` as keyof typeof TEXT_DICTIONARY][
              language
            ],
          long_explanation:
            TEXT_DICTIONARY[`projects.${slug}.long_explanation` as keyof typeof TEXT_DICTIONARY][
              language
            ],
          href: `https://github.com/kerem-kirici/${slug}`,
          tags: TEXT_DICTIONARY[`projects.${slug}.tags` as keyof typeof TEXT_DICTIONARY][
            language
          ].split(','),
        },
      ];
    },
    [],
  );
};

export function getProjectBySlug(slug: string, language: Lang = 'en'): Project | undefined {
  return projects(language).find((p) => p.slug === slug);
}
