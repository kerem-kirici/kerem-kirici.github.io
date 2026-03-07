'use client';

import Lenis from 'lenis';
import type { ReactNode } from 'react';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface CardTransform {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
}

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-4 sm:my-8 p-4 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl lg:rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  desktopColumns?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
  desktopColumns = 1,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const stackCompletedRef = useRef(false);

  const animationFrameRef = useRef<number | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  const cardsRef = useRef<HTMLElement[]>([]);

  const cardOffsetsRef = useRef<number[]>([]);

  const endOffsetRef = useRef(0);

  const lastTransformsRef = useRef(new Map<number, CardTransform>());

  const isUpdatingRef = useRef(false);

  const columnCountRef = useRef(1);

  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const checkColumns = () => {
      const count = desktopColumns > 1 && window.innerWidth >= 768 ? desktopColumns : 1;

      columnCountRef.current = count;
      setColumnCount(count);
    };

    checkColumns();
    window.addEventListener('resize', checkColumns);

    return () => window.removeEventListener('resize', checkColumns);
  }, [desktopColumns]);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;

    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }

    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement,
      };
    } else {
      const scroller = scrollerRef.current;

      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller,
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();

        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll],
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);

    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElementTop = endOffsetRef.current;

    const cols = columnCountRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const rowIndex = cols > 1 ? Math.floor(i / cols) : i;

      const cardTop = cardOffsetsRef.current[i];

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * rowIndex;

      const triggerEnd = cardTop - scaleEndPositionPx;

      const pinStart = cardTop - stackPositionPx - itemStackDistance * rowIndex;

      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);

      const targetScale = baseScale + rowIndex * itemScale;

      const scale = 1 - scaleProgress * (1 - targetScale);

      const rotation = rotationAmount ? rowIndex * rotationAmount * scaleProgress : 0;

      let blur = 0;

      if (blurAmount) {
        let topCardRowIndex = 0;

        for (let j = 0; j < cardsRef.current.length; j++) {
          const jRowIndex = cols > 1 ? Math.floor(j / cols) : j;

          const jCardTop = cardOffsetsRef.current[j];

          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * jRowIndex;

          if (scrollTop >= jTriggerStart) {
            topCardRowIndex = jRowIndex;
          }
        }

        if (rowIndex < topCardRowIndex) {
          const depthInStack = topCardRowIndex - rowIndex;

          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;

      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * rowIndex;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * rowIndex;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);

      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;

        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };

      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;

      return lenis;
    } else {
      const scroller = scrollerRef.current;

      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };

      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;

      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    if (!useWindowScroll && !scrollerRef.current) return;

    const container = scrollerRef.current;

    const cards = Array.from(
      container?.querySelectorAll('.scroll-stack-card') ?? [],
    ) as HTMLElement[];

    const cols = columnCountRef.current;

    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      const lastRowStart =
        cols > 1 ? cards.length - (cards.length % cols || cols) : cards.length - 1;

      const isLastRow = i >= lastRowStart;

      if (!isLastRow) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    cardsRef.current = cards;
    cardOffsetsRef.current = cards.map((card) => getElementOffset(card));

    const endElement = container?.querySelector('.scroll-stack-end') as HTMLElement | null;

    endOffsetRef.current = endElement ? getElementOffset(endElement) : 0;

    setupLenis();

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardOffsetsRef.current = [];
      endOffsetRef.current = 0;
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    columnCount,
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    getElementOffset,
    setupLenis,
    updateCardTransforms,
  ]);

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position',
      }}
    >
      <div
        className={`scroll-stack-inner pt-[10vh] sm:pt-[15vh] lg:pt-[20vh] px-2 sm:px-6 lg:px-12 pb-[50rem] min-h-screen ${
          columnCount > 1 ? 'grid grid-cols-2 gap-x-20' : ''
        }`}
      >
        {children}
        <div className={`scroll-stack-end w-full h-px ${columnCount > 1 ? 'col-span-full' : ''}`} />
      </div>
    </div>
  );
};

export default ScrollStack;
