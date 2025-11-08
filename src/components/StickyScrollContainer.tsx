'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type StickyScrollContainerProps = {
  children: React.ReactNode;
  /**
   * A CSS selector for your sticky header.
   * The component will measure this element's height.
   * Defaults to 'header'.
   */
  headerSelector?: string;
  /**
   * A fallback offset in px, rem, etc., if the header
   * isn't found or you want to override it.
   */
  fallbackOffset?: string;
};

// Helper function to check screen size - only xsmall screens (< 640px)
const checkScreenSize = () => {
  if (typeof window === 'undefined') return false;

  return window.innerWidth < 640; // sm breakpoint - xsmall screens only
};

export default function StickyScrollContainer({
  children,
  headerSelector = 'header',
  fallbackOffset = '0px',
}: StickyScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef<HTMLElement | null>(null);

  const cardsRef = useRef<HTMLCollection | null>(null);

  const titleRef = useRef<HTMLElement | null>(null);

  // State to store the calculated header height
  const [stickyTopOffset, setStickyTopOffset] = useState(fallbackOffset);

  // Effect to find and measure the header
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measureHeader = () => {
      const headerEl = document.querySelector(headerSelector) as HTMLElement;

      if (headerEl) {
        const height = headerEl.getBoundingClientRect().height;

        setStickyTopOffset(`${height}px`);
      } else {
        console.warn(
          `StickyScrollContainer: Could not find header with selector '${headerSelector}'. Using fallback offset '${fallbackOffset}'.`,
        );
        setStickyTopOffset(fallbackOffset);
      }
    };

    // Run on mount after a short delay
    const timeoutId = setTimeout(measureHeader, 100);

    // Re-run on resize
    window.addEventListener('resize', measureHeader, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', measureHeader);
    };
  }, [headerSelector, fallbackOffset]);

  // Main effect to apply/clear styles
  useEffect(() => {
    /**
     * Applies all necessary sticky styles to the grid and cards with stacking animation.
     */
    const applyStickyStyles = () => {
      if (!containerRef.current || stickyTopOffset === fallbackOffset) return;

      // Find the title (Heading) element
      const titleEl = containerRef.current.querySelector('h2') as HTMLElement;

      const hasTitleElement = !!titleEl;

      if (hasTitleElement) {
        titleRef.current = titleEl;
      }

      const gridContainer = containerRef.current.querySelector('.grid') as HTMLElement;

      if (!gridContainer) {
        console.warn('StickyScrollContainer: No .grid child found.');

        return;
      }

      const cards = gridContainer.children;

      if (!cards || cards.length === 0) return;

      gridRef.current = gridContainer;
      cardsRef.current = cards;

      const headerHeight = parseFloat(stickyTopOffset.replace('px', '')) || 0;

      // Only add title offset if title exists
      const baseTopOffset = hasTitleElement ? headerHeight + 16 : headerHeight;

      // Apply sticky positioning to title only if it exists
      if (hasTitleElement && titleEl) {
        titleEl.style.position = 'sticky';
        titleEl.style.top = `${baseTopOffset}px`;
        titleEl.style.zIndex = `${cards.length + 1}`;

        // Make title background transparent
        titleEl.style.backgroundColor = 'transparent';
      }

      // Wait a bit for the title to render with its new styles before measuring
      setTimeout(() => {
        if (!containerRef.current) return;

        const titleEl = containerRef.current.querySelector('h2') as HTMLElement;

        const hasTitleElement = !!titleEl;

        const gridContainer = containerRef.current.querySelector('.grid') as HTMLElement;

        if (!gridContainer) return;

        const cards = gridContainer.children;

        if (!cards || cards.length === 0) return;

        // Apply sticky positioning with progressive gap - creating stacking effect
        Array.from(cards).forEach((card, index) => {
          const cardElement = card as HTMLElement;

          // Calculate gap: 24px for each card index + 16px base offset
          const cardGap = index * 24 + 16;

          // Get title height if it exists, otherwise 0
          const titleHeight =
            hasTitleElement && titleEl ? titleEl.getBoundingClientRect().height : 0;

          // Only add gap between title and first card if title exists
          const titleBottomGap = hasTitleElement ? 4 : 0;

          const topPosition = `${baseTopOffset + titleHeight + titleBottomGap + cardGap}px`;

          cardElement.style.position = 'sticky';
          cardElement.style.top = topPosition;
          cardElement.style.zIndex = `${index + 1}`; // Cards stack on top of previous ones
          cardElement.style.marginTop = ''; // Clear any margin
        });
      }, 10);
    };

    /**
     * Removes all inline styles added by this component.
     */
    const clearStickyStyles = () => {
      if (gridRef.current) {
        gridRef.current.style.paddingBottom = '';
      }

      if (titleRef.current) {
        titleRef.current.style.position = '';
        titleRef.current.style.top = '';
        titleRef.current.style.zIndex = '';
        titleRef.current.style.backgroundColor = '';
      }

      if (cardsRef.current) {
        Array.from(cardsRef.current).forEach((card) => {
          const cardElement = card as HTMLElement;

          cardElement.style.position = '';
          cardElement.style.top = '';
          cardElement.style.zIndex = '';
        });
      }
    };

    // This logic runs when screen size changes or when the calculated header height changes
    const handleResize = () => {
      const isXSmall = checkScreenSize();

      if (isXSmall) {
        applyStickyStyles();
      } else {
        clearStickyStyles();
      }
    };

    // Run once stickyTopOffset is calculated
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearStickyStyles();
    };
  }, [children, stickyTopOffset, fallbackOffset]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
