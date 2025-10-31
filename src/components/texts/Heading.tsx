'use client';

import React from 'react';

type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingSize = '2xl' | 'xl' | 'lg' | 'md';
type HeadingWeight = 'bold' | 'semibold' | 'medium';
type HeadingAlign = 'left' | 'center' | 'right';
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
  '2xl': 'text-4xl sm:text-5xl',
  xl: 'text-3xl',
  lg: 'text-2xl',
  md: 'text-xl',
};

const weightToClasses: Record<HeadingWeight, string> = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
};

const trackingToClasses: Record<HeadingTracking, string> = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
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
  tracking = 'normal',
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
        trackingToClasses[tracking],
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
