'use client';

import { ButtonLink } from '@/components/links';
import { Heading, Text } from '@/components/texts';
import type { Project } from '@/data/projects';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ProjectCard({ title, description, href, image, tags, slug }: Project) {
  const [imageSrc, imageOrientation] = image;

  const [isFlipped, setFlipped] = useState(false);

  const [isXSmallScreen, setIsXSmallScreen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Check if we're on an xsmall screen
   */
  useEffect(() => {
    const checkScreenSize = () => {
      setIsXSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
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
    const stickyGap = (cardIndex + 1) * 24 + 16;

    // Calculate card's position relative to grid
    // We need to account for vertical gaps between cards
    // gap-y-10 on xsmall (2.5rem = 40px), gap-y-20 on sm and larger (5rem = 80px)
    const verticalGap = window.innerWidth < 640 ? 40 : 80; // gap-y-10 on xsmall, gap-y-20 on larger

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
   * - On xsmall screens (< 640px), it scrolls to the card's position first, then toggles flip.
   * - On all screen sizes, clicking toggles the card flip.
   */
  const handleCardClick = () => {
    if (typeof window !== 'undefined') {
      if (isXSmallScreen) {
        // On xsmall screens, scroll to the card's position before flipping
        scrollToCard();
        setTimeout(() => {
          setFlipped((prev) => !prev);
        }, 50);
      } else {
        // On larger screens, just flip the card
        setFlipped((prev) => !prev);
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative block w-full [perspective:1000px] cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* The Flipper Container with framer-motion */}
      <motion.div
        onClick={handleCardClick}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="relative w-full aspect-[3/4] [transform-style:preserve-3d]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* === CARD FRONT === */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:translateZ(0)] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
          {/* Image */}
          {imageSrc ? (
            <div className="absolute inset-0">
              <Image
                key={`${slug}-${imageSrc}`}
                src={imageSrc}
                alt={title}
                fill
                className={`object-cover ${imageOrientation === 'landscape' ? 'object-left' : 'object-center'}`}
                priority={false}
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />
          )}

          {/* Title Overlay (Front Side) - visible on all screens */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            {/* Glassy background extending from above title area to bottom - ensures coverage for 2-line titles */}
            <div className="absolute inset-x-0 bottom-0 top-[30%] backdrop-blur-md bg-white/50 dark:bg-zinc-900/50" />
            <div className="relative p-5 pt-7">
              <Heading
                as="h3"
                size="md"
                weight="semibold"
                tracking="tight"
                className="text-zinc-900 dark:text-zinc-50"
              >
                {title}
              </Heading>
            </div>
          </div>
        </div>

        {/* === CARD BACK === */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-zinc-900">
          <div className="flex flex-col h-full p-5">
            <Heading as="h3" size="md" weight="semibold" tracking="tight" className="mb-2">
              {title}
            </Heading>
            <Text
              size="sm"
              leading="relaxed"
              tone="muted"
              align="left"
              className="flex-1 overflow-y-auto"
            >
              {description}
            </Text>
            {isXSmallScreen && tags.length > 0 && (
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
              newTab={href.startsWith('http')}
              onClick={(e) => e.stopPropagation()}
              className="mt-4 ml-auto text-xs"
            >
              Details
            </ButtonLink>
          </div>
        </div>
      </motion.div>

      {/* Tags below card - visible on non-mobile devices */}
      {!isXSmallScreen && tags.length > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/20 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-white/20 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
