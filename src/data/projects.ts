export type Project = {
  slug: string;
  title: string;
  description: string;
  href: string;
  tags: string[];
  image?: string;
};

export const projects: Project[] = [
  {
    slug: 'pokerist',
    title: 'Pokerist',
    image: '/projects/pokerist/Simulator Screenshot - iPhone 17 Pro - Dark Home.png',
    description:
      "A beautiful, modern Texas Hold'em poker hand analyzer and odds calculator for iOS built with SwiftUI.",
    href: 'https://github.com/kerem-kirici/Pokerist',
    tags: ['iOS', 'SwiftUI', 'Swift'],
  },
  {
    slug: 'pokerist222',
    title: 'Pokerist222',
    image: '/projects/pokerist/Simulator Screenshot - iPhone 17 Pro - Light Home.png',
    description:
      "A beautiful, modern Texas Hold'em poker hand analyzer and odds calculator for iOS built with SwiftUI.",
    href: 'https://github.com/kerem-kirici/Pokerist',
    tags: ['iOS', 'SwiftUI', 'Swift'],
  },
  {
    slug: 'pokerist11',
    title: 'Pokerist11',
    image: '/projects/pokerist/Simulator Screenshot - iPhone 17 Pro - Dark Home.png',
    description:
      "A beautiful, modern Texas Hold'em poker hand analyzer and odds calculator for iOS built with SwiftUI.",
    href: 'https://github.com/kerem-kirici/Pokerist',
    tags: ['iOS', 'SwiftUI', 'Swift'],
  },
  {
    slug: 'pokerist21122',
    title: 'Pokerist21122',
    image: '/projects/pokerist/Simulator Screenshot - iPhone 17 Pro - Light Home.png',
    description:
      "A beautiful, modern Texas Hold'em poker hand analyzer and odds calculator for iOS built with SwiftUI.",
    href: 'https://github.com/kerem-kirici/Pokerist',
    tags: ['iOS', 'SwiftUI', 'Swift'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
