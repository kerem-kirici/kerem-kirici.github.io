import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function Home() {
  const deneme = 'deneme';

  return (
    <>
      <section className="py-16">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Building elegant experiences with React & Next.js
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          I’m Kerem, a frontend developer focused on crafting fast, accessible, and delightful web
          apps. Here are some projects I’ve been working on.
        </p>
        <div className="mt-8 flex gap-3">
          <a
            href="mailto:kerem.kirici36@gmail.com"
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
          >
            Get in touch
          </a>
          <a
            href="https://github.com/kerem-kirici"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/10 px-5 py-2 text-sm font-medium transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/5"
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="pb-20">
        <h2 className="text-xl font-semibold tracking-tight">Featured projects</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.slice(0, 4).map((p) => (
            <ProjectCard key={p.slug} {...p} href={`/project/${p.slug}`} />
          ))}
        </div>
      </section>
    </>
  );
}
