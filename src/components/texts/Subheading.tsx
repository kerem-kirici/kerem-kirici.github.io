'use client';

import React from 'react';

type SubheadingAs = 'h2' | 'h3' | 'h4' | 'p';
type SubheadingSize = 'lg' | 'md' | 'sm';
type SubheadingWeight = 'semibold' | 'medium';
type SubheadingAlign = 'left' | 'center' | 'right';
type SubheadingTracking = 'tight' | 'normal' | 'wide';
type SubheadingGutter = 'none' | 'sm' | 'md' | 'lg';

export type SubheadingProps<T extends SubheadingAs = 'h3'> = {
  as?: T;
  size?: SubheadingSize;
  weight?: SubheadingWeight;
  align?: SubheadingAlign;
  tracking?: SubheadingTracking;
  clamp?: 1 | 2 | 3;
  muted?: boolean;
  gutter?: SubheadingGutter; // top spacing from previous element
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const sizeToClasses: Record<SubheadingSize, string> = {
  lg: 'text-xl',
  md: 'text-lg',
  sm: 'text-base',
};

const weightToClasses: Record<SubheadingWeight, string> = {
  semibold: 'font-semibold',
  medium: 'font-medium',
};

const trackingToClasses: Record<SubheadingTracking, string> = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
};

const alignToClasses: Record<SubheadingAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const gutterToClasses: Record<SubheadingGutter, string> = {
  none: '',
  sm: 'mt-2',
  md: 'mt-4',
  lg: 'mt-6',
};

export function Subheading<T extends SubheadingAs = 'h3'>({
  as,
  size = 'md',
  weight = 'semibold',
  align = 'left',
  tracking = 'normal',
  clamp,
  muted,
  gutter = 'md',
  className,
  children,
}: SubheadingProps<T>) {
  const Component = (as || 'h3') as SubheadingAs;

  return (
    <Component
      className={classNames(
        sizeToClasses[size],
        weightToClasses[weight],
        trackingToClasses[tracking],
        alignToClasses[align],
        gutterToClasses[gutter],
        muted ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-900 dark:text-zinc-50',
        clamp ? `line-clamp-${clamp}` : undefined,
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Subheading;
