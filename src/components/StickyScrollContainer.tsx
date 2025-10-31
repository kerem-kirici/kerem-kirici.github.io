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

      const gridContainer = containerRef.current.querySelector('.grid') as HTMLElement;

      if (!gridContainer) {
        console.warn('StickyScrollContainer: No .grid child found.');

        return;
      }

      const cards = gridContainer.children;

      if (!cards || cards.length === 0) return;

      gridRef.current = gridContainer;
      cardsRef.current = cards;

      Array.from(cards).forEach((card, index) => {
        const cardElement = card as HTMLElement;

        cardElement.style.position = 'sticky';
        // Use the dynamically calculated header height
        cardElement.style.top = stickyTopOffset;
        cardElement.style.zIndex = `${index + 1}`;
      });
    };

    /**
     * Removes all inline styles added by this component.
     */
    const clearStickyStyles = () => {
      if (gridRef.current) {
        gridRef.current.style.paddingBottom = '';
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

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearStickyStyles();
    };
  }, [children, stickyTopOffset, fallbackOffset]); // Re-runs when header height is found

  return <div ref={containerRef}>{children}</div>;
}
