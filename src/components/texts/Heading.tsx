'use client';

import React from 'react';

type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingSize = '2xl' | 'xl' | 'lg' | 'md' | 'sm';
type HeadingWeight = 'bold' | 'semibold' | 'medium';
type HeadingAlign = 'left' | 'center' | 'right';
/**
 * `optical` (the default) lets the size decide its own tracking and leading —
 * a display line and a small section label want different values, and a single
 * `letter-spacing` is wrong at one end of the scale or the other. The other two
 * are deliberate overrides.
 */
type HeadingTracking = 'tight' | 'normal' | 'wide';

export type HeadingProps<T extends HeadingAs = 'h2'> = {
  as?: T;
  size?: HeadingSize;
  weight?: HeadingWeight;
  align?: HeadingAlign;
  tracking?: HeadingTracking;
  clamp?: 1 | 2 | 3;
  muted?: boolean;
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const sizeToClasses: Record<HeadingSize, string> = {
  '2xl': 'text-4xl sm:text-5xl type-display',
  xl: 'text-3xl type-title',
  lg: 'text-2xl type-heading',
  md: 'text-xl type-heading',
  sm: 'text-lg type-subhead',
};

const weightToClasses: Record<HeadingWeight, string> = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
};

const alignToClasses: Record<HeadingAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export function Heading<T extends HeadingAs = 'h2'>({
  as,
  size = 'lg',
  weight = 'semibold',
  align = 'left',
  tracking = 'tight',
  clamp,
  muted,
  className,
  children,
}: HeadingProps<T>) {
  const Component = (as || 'h2') as HeadingAs;

  return (
    <Component
      className={classNames(
        sizeToClasses[size],
        weightToClasses[weight],
        // `tight` defers to the size's optical tracking; the others override it.
        tracking === 'normal'
          ? 'tracking-normal'
          : tracking === 'wide'
            ? 'tracking-wide'
            : undefined,
        alignToClasses[align],
        muted ? 'text-zinc-600 dark:text-zinc-400' : undefined,
        clamp ? `line-clamp-${clamp}` : undefined,
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Heading;
