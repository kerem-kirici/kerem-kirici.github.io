'use client';

import { getProjectBySlug } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';
// We no longer need useRouter since target="_blank" implies external links
import { useEffect, useState } from 'react';

type Project = {
  slug: string;
};

export default function ProjectCard({ slug }: Project) {
  const project = getProjectBySlug(slug);

  const [isFlipped, setFlipped] = useState(false);

  /**
   * Handles the click event on the root card.
   * - On xsmall screens (< 640px), it toggles the card flip.
   * - On small screens and above (>= 640px), it navigates to the project href
   * (respecting the original target="_blank").
   */
  const handleCardClick = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {
        setFlipped((prev) => !prev);
      } else {
        // Small screens and above - navigate to external link
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    }
  };

  /**
   * Resets the flip state if the user resizes
   * their window from xsmall to small screen or larger.
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setFlipped(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!project) {
    return null;
  }

  const { title, description, href, image, tags } = project;

  // --- FIX: Root <Link> is now a <div> ---
  // We add 'md:cursor-pointer' to replicate the link feel on desktop
  return (
    <div
      onClick={handleCardClick}
      className="group relative block w-full aspect-[9/16] [perspective:1000px] cursor-pointer"
    >
      {/* The Flipper Container */}
      <div
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
        className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-700 sm:!transform-none md:group-hover:scale-[1.02]"
      >
        {/* === CARD FRONT === */}
        {/* FIX: Added [transform:translateZ(0)] to fix the title "bleeding" through */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:translateZ(0)] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
          {/* Image */}
          {image ? (
            <div className="absolute inset-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 md:group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />
          )}

          {/* Xsmall-only Title (Front Side) */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="relative text-lg font-semibold tracking-tight text-white">{title}</h3>
          </div>

          {/* Hover Panel - visible on small screens and above (640px+) */}
          <div className="absolute bottom-0 left-0 right-0 z-20 hidden h-16 overflow-hidden transition-all duration-500 ease-in-out group-hover:h-2/3 sm:block">
            {/* ... (rest of desktop panel is identical) ... */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/40 to-black/30 backdrop-blur-sm dark:from-black/60 dark:via-black/50 dark:to-black/40" />
            <div className="relative flex h-full flex-col p-4 md:p-5">
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-white md:text-xl">
                {title}
              </h3>
              <div className="flex flex-1 flex-col overflow-y-auto min-h-0">
                <div className="max-h-0 flex-1 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover:max-h-full group-hover:opacity-100">
                  <p className="text-xs leading-relaxed text-white/90 md:text-sm">{description}</p>
                </div>
              </div>
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
        </div>

        {/* === CARD BACK === */}
        {/* This <Link> is now inside a <div>, so it's valid! */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-zinc-900 sm:hidden">
          <div className="flex flex-col h-full p-5">
            <h3 className="mb-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 overflow-y-auto">
              {description}
            </p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
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
            {/* Details Button */}
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Still crucial!
              className="mt-4 ml-auto rounded-full bg-zinc-800 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
