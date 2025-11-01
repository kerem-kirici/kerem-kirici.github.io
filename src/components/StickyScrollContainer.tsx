'use client';

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
  headerSelector = 'header', // Defaults to your semantic <header> tag
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
     * Applies all necessary sticky styles to the grid and cards.
     */
    const applyStickyStyles = () => {
      if (!containerRef.current || stickyTopOffset === fallbackOffset) return;

      // Find the title (Heading) element - it should be a direct child with class containing 'heading'
      const titleEl = containerRef.current.querySelector('h2') as HTMLElement;

      if (!titleEl) {
        console.warn('StickyScrollContainer: No h2 title found.');
      } else {
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

      const titleTopOffset = headerHeight + 16; // Add 16px gap for title

      // Apply sticky positioning to title at the very top
      if (titleEl) {
        titleEl.style.position = 'sticky';
        titleEl.style.top = `${titleTopOffset}px`;
        titleEl.style.zIndex = `${cards.length + 1}`;

        // Get computed background from body to prevent content bleeding through
        const bodyStyle = window.getComputedStyle(document.body);

        titleEl.style.backgroundColor = bodyStyle.backgroundColor;
      }

      // Wait a bit for the title to render with its new styles before measuring
      setTimeout(() => {
        if (!containerRef.current) return;

        const titleEl = containerRef.current.querySelector('h2') as HTMLElement;

        const gridContainer = containerRef.current.querySelector('.grid') as HTMLElement;

        if (!gridContainer) return;

        const cards = gridContainer.children;

        if (!cards || cards.length === 0) return;

        // Apply sticky positioning with progressive gap below the title
        // Each card gets a progressively higher top value to create gaps when they stack
        Array.from(cards).forEach((card, index) => {
          const cardElement = card as HTMLElement;

          // Calculate gap: 24px for each card index + 16px
          // The first card starts below the title, so we need to add title height + gap
          const cardGap = index * 24 + 16;

          // Get title height if it exists, otherwise 0
          const titleHeight = titleEl ? titleEl.getBoundingClientRect().height : 0;

          const titleBottomGap = 4; // Gap between title and first card

          const topPosition = `${titleTopOffset + titleHeight + titleBottomGap + cardGap}px`;

          cardElement.style.position = 'sticky';
          cardElement.style.top = topPosition;
          cardElement.style.zIndex = `${index + 1}`;
          cardElement.style.marginTop = ''; // Clear any margin
        });
      }, 10);
    };

    const handleScroll = () => {
      if (checkScreenSize()) {
        applyStickyStyles();
      }
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

    // This logic now runs when screen size changes
    // OR when the calculated header height changes
    const handleResize = () => {
      if (checkScreenSize()) {
        applyStickyStyles();
      } else {
        clearStickyStyles();
      }
    };

    // Run once stickyTopOffset is calculated
    handleResize();

    // Add scroll listener to update stuck card in real-time
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearStickyStyles();
    };
  }, [children, stickyTopOffset, fallbackOffset]); // Re-runs when header height is found

  return <div ref={containerRef}>{children}</div>;
}
