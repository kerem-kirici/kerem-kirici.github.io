'use client';

import { ButtonLink } from '@/components/links';
import { Heading, Text } from '@/components/texts';
import type { Project } from '@/data/projects';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ProjectCard({ title, description, href, image, tags }: Project) {
  const [isFlipped, setFlipped] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

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

  /**
   * Scrolls the card into view at its sticky position.
   * Calculates the proper scroll position based on the card's offset, header height, and sticky gap.
   */
  const scrollToCard = () => {
    if (!cardRef.current || typeof window === 'undefined') return;

    const header = document.querySelector('header') as HTMLElement;

    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    // Find the card's index in the grid
    const gridContainer = cardRef.current.closest('.grid');

    if (!gridContainer) return;

    const cards = Array.from(gridContainer.children);

    const cardIndex = cards.indexOf(cardRef.current);

    if (cardIndex === -1) return;

    // Calculate the sticky gap for this card (matches StickyScrollContainer formula)
    const stickyGap = cardIndex * 24 + 16;

    // Calculate card's position relative to grid
    // We need to account for vertical gaps between cards
    // The gap-y-80 class means 80 * 0.25rem = 20rem = 320px between cards on xsmall
    const verticalGap = window.innerWidth < 640 ? 320 : 20; // gap-y-80 on xsmall, gap-y-5 on larger

    // Get the card's position relative to the grid by summing previous cards' heights and gaps
    let cardTopInGrid = 0;

    for (let i = 0; i < cardIndex; i++) {
      const prevCard = cards[i] as HTMLElement;

      cardTopInGrid += prevCard.offsetHeight + verticalGap;
    }

    const gridTop = (gridContainer as HTMLElement).offsetTop;

    const cardOriginalTop = gridTop + cardTopInGrid;

    // Calculate scroll position so the card reaches its sticky position
    // The card should be at: headerHeight + stickyGap from the top of the viewport
    // So we need to scroll to: cardOriginalTop - (headerHeight + stickyGap)
    const scrollPosition = cardOriginalTop - headerHeight - stickyGap;

    window.scrollTo({
      top: Math.max(0, scrollPosition), // Ensure we don't scroll to negative position
      behavior: 'smooth',
    });
  };

  /**
   * Handles the click event on the root card.
   * - On xsmall screens (< 640px), it scrolls to the card's position and toggles the card flip.
   * - On small screens and above (>= 640px), it navigates to the project href
   * (respecting the original target="_blank").
   */
  const handleCardClick = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {
        // On xsmall screens, scroll to the card's position
        scrollToCard();
        setTimeout(() => {
          setFlipped((prev) => !prev);
        }, 50);
      } else {
        // Small screens and above - navigate to external link
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // --- FIX: Root <Link> is now a <div> ---
  // We add 'md:cursor-pointer' to replicate the link feel on desktop
  return (
    <div
      ref={cardRef}
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
            <Heading
              as="h3"
              size="md"
              weight="semibold"
              tracking="tight"
              className="relative text-white"
            >
              {title}
            </Heading>
          </div>

          {/* Hover Panel - visible on small screens and above (640px+) */}
          <div className="absolute bottom-0 left-0 right-0 z-20 hidden h-16 overflow-hidden transition-all duration-500 ease-in-out group-hover:h-2/3 sm:block">
            {/* ... (rest of desktop panel is identical) ... */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/40 to-black/30 backdrop-blur-sm dark:from-black/60 dark:via-black/50 dark:to-black/40" />
            <div className="relative flex h-full flex-col p-4 md:p-5">
              <Heading
                as="h3"
                size="md"
                weight="semibold"
                tracking="tight"
                className="mb-3 text-white md:text-xl"
              >
                {title}
              </Heading>
              <div className="flex flex-1 flex-col overflow-y-auto min-h-0">
                <div className="max-h-0 flex-1 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover:max-h-full group-hover:opacity-100">
                  <Text size="xs" leading="relaxed" className="text-white/90 md:text-sm">
                    {description}
                  </Text>
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
            <Heading as="h3" size="md" weight="semibold" tracking="tight" className="mb-2">
              {title}
            </Heading>
            <Text size="sm" leading="relaxed" tone="muted" className="flex-1 overflow-y-auto">
              {description}
            </Text>
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
            <ButtonLink
              href={href}
              variant="secondary"
              size="sm"
              rounded="full"
              newTab
              onClick={(e) => e.stopPropagation()}
              className="mt-4 ml-auto text-xs"
            >
              Details
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
