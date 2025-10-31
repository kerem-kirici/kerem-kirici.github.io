import { getProjectBySlug } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';

type Project = {
  slug: string;
};

export default function ProjectCard({ slug }: Project) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return null;
  }

  const { title, description, href, image, tags } = project;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full aspect-[9/16] flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-white/10 dark:bg-zinc-900"
    >
      {/* Image covering entire card - visible on all screens */}
      {image ? (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />
      )}

      {/* Default content for small screens (original layout) */}
      <div className="relative z-10 flex flex-1 flex-col justify-center p-5 md:hidden">
        <h3 className="mb-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
      {tags.length > 0 && (
        <div className="relative z-10 mt-3 flex flex-wrap gap-2 p-5 md:hidden">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/10 px-2 py-0.5 text-xs text-zinc-700 dark:border-white/15 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Info panel for md and lg screens - default height fits title, expands on hover */}
      <div className="absolute bottom-0 left-0 right-0 z-20 hidden h-16 overflow-hidden transition-all duration-500 ease-in-out group-hover:h-2/3 md:block">
        {/* Tinted background gradient - more transparent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/40 to-black/30 backdrop-blur-sm dark:from-black/60 dark:via-black/50 dark:to-black/40" />

        {/* Content container - flex layout with title at top */}
        <div className="relative flex h-full flex-col p-4 md:p-5">
          {/* Title - always visible at top */}
          <h3 className="mb-3 text-lg font-semibold tracking-tight text-white md:text-xl">
            {title}
          </h3>

          {/* Description section - expands below title and fills available space */}
          <div className="flex flex-1 flex-col overflow-y-auto min-h-0">
            <div className="max-h-0 flex-1 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover:max-h-full group-hover:opacity-100">
              <p className="text-xs leading-relaxed text-white/90 md:text-sm">{description}</p>
            </div>
          </div>

          {/* Tags - at bottom, shown on hover */}
          {tags.length > 0 && (
            <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover:max-h-[200px] group-hover:opacity-100 mt-auto">
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
