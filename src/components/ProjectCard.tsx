import Image from "next/image";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  href: string;
  stars?: number;
  image?: string;
  tags?: string[];
};

export default function ProjectCard({
  title,
  description,
  href,
  image,
  tags = [],
}: Project) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/15 dark:bg-black"
    >
      <div className="flex items-start gap-4">
        {image ? (
          <div className="relative hidden h-16 w-16 overflow-hidden rounded-md sm:block">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        ) : (
          <div className="hidden h-16 w-16 rounded-md bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 sm:block" />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold tracking-tight">
            {title}
          </h3>
          <p className="mt-1 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
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
        </div>
      </div>
    </Link>
  );
}


