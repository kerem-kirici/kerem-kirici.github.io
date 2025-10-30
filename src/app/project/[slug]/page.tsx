import Link from "next/link";
import { getProjectBySlug, projects } from "@/data/projects";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params) {
  const project = getProjectBySlug(params.slug);
  return {
    title: project ? `${project.title} – Kerem Kirici` : "Project – Kerem Kirici",
    description: project?.description ?? "Project details",
  };
}

export default function ProjectDetail({ params }: Params) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return (
      <section className="py-16">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The project you’re looking for doesn’t exist.
        </p>
        <Link href="/projects" className="mt-6 inline-block underline">
          Back to projects
        </Link>
      </section>
    );
  }

  return (
    <section className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href={project.href}
          target="_blank"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          View on GitHub
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-black/10 px-5 py-2 text-sm font-medium transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/5"
        >
          Back to projects
        </Link>
      </div>
    </section>
  );
}


