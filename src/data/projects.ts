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
    slug: "portfolio-website",
    title: "Elegant Portfolio",
    description:
      "This website – a minimalist, performant portfolio built with Next.js 16, React 19, and Tailwind v4.",
    href: "https://github.com/kerem-kirici/portfolio-website",
    tags: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    slug: "awesome-widget",
    title: "Awesome Widget",
    description:
      "A reusable UI widget exploring animations and accessibility best practices.",
    href: "https://github.com/kerem-kirici",
    tags: ["React", "UI", "A11y"],
  },
  {
    slug: "data-viz-experiments",
    title: "Data Viz Experiments",
    description: "Playground of charts and interactive visualizations.",
    href: "https://github.com/kerem-kirici",
    tags: ["D3", "Visualization", "Playground"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}


