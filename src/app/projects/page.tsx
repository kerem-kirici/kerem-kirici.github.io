import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import Link from 'next/link';

export const metadata = {
  title: 'Projects – Kerem Kırıcı',
  description: 'A selection of work and experiments.',
};

export default function ProjectsPage() {
  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        A selection of things I’ve built. See more on my{' '}
        <Link
          href="https://github.com/kerem-kirici"
          target="_blank"
          className="underline decoration-black/30 underline-offset-4 dark:decoration-white/30"
        >
          GitHub
        </Link>
        .
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects('en').map((p) => (
          <ProjectCard key={p.slug} {...p} />
        ))}
      </div>
    </section>
  );
}
