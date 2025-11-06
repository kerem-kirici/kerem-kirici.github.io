import { Section } from '@/components/layout';
import { ButtonLink } from '@/components/links';
import { Heading, Text } from '@/components/texts';
import type { Project } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';

type ProjectDetailLayoutProps = {
  project: Project;
};

function splitParagraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function ProjectDetailLayout({ project }: ProjectDetailLayoutProps) {
  const paragraphs = splitParagraphs(project.long_explanation);

  return (
    <>
      <Section padding="lg" container="xl">
        <div className="space-y-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <span aria-hidden className="text-lg">
              ←
            </span>
            Back to projects
          </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-7">
              <header className="space-y-5">
                <Heading as="h1" size="xl" weight="semibold" tracking="tight">
                  {project.title}
                </Heading>
                <Text size="lg" leading="relaxed" tone="muted" className="max-w-4xl">
                  {project.description}
                </Text>

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-medium text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-zinc-100 shadow-lg dark:border-white/10 dark:bg-zinc-900">
                <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[16/9] w-full">
                  <Image
                    src={project.image}
                    alt={`${project.title} hero image`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 60vw, 100vw"
                  />
                </div>
              </div>
            </div>

            <aside className="h-max space-y-6 rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/70 lg:col-span-5 lg:col-start-8">
              <div className="space-y-3">
                <Heading as="h2" size="sm" weight="semibold" tracking="tight">
                  Project Snapshot
                </Heading>
                <Text size="sm" leading="relaxed" tone="muted">
                  A quick overview of the project details and relevant links.
                </Text>
              </div>

              <div className="space-y-4">
                <div>
                  <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                    Tech stack
                  </Text>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={`aside-${tag}`}
                        className="rounded-full border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                    Repository
                  </Text>
                  <ButtonLink
                    href={project.githubUrl}
                    variant="outline"
                    tone="inverse"
                    newTab
                    size="md"
                    className="mt-2 w-full"
                  >
                    View on GitHub
                  </ButtonLink>
                </div>

                <div>
                  <Text size="xs" tone="subtle" className="uppercase tracking-wider">
                    Share
                  </Text>
                  <div className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <p>Copy the link below to share this project.</p>
                    <code className="block truncate rounded-lg bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {`https://${process.env.NEXT_PUBLIC_DOMAIN ?? 'keremkirici.com'}${project.href}`}
                    </code>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      <Section padding="md" container="xl" className="pt-0">
        <div className="space-y-10">
          <article className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </article>

          {project.gallery.length > 1 && (
            <section className="space-y-5">
              <Heading as="h2" size="md" weight="semibold" tracking="tight">
                Gallery
              </Heading>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((imageSrc, index) => (
                  <figure
                    key={imageSrc}
                    className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-md transition hover:shadow-lg dark:border-white/15 dark:bg-zinc-900"
                  >
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={imageSrc}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>
      </Section>
    </>
  );
}
