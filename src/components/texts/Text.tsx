'use client';

import React from 'react';

type TextAs = 'p' | 'span' | 'div';

type TextProps<T extends TextAs = 'p'> = {
  as?: T;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  tone?: 'default' | 'muted' | 'subtle';
  weight?: 'regular' | 'medium';
  leading?: 'tight' | 'normal' | 'relaxed';
  align?: 'left' | 'center' | 'right' | 'justify';
  clamp?: 1 | 2 | 3 | 4;
  preserveNewlines?: boolean;
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

// Body copy sits near zero tracking; small text gets a touch more to stay
// legible. `type-*` also sets `text-wrap: pretty`, which keeps orphans out of
// the last line.
const sizeToClasses = {
  lg: 'text-lg type-body',
  md: 'text-base type-body',
  sm: 'text-sm type-caption',
  xs: 'text-xs type-caption',
} as const;

export function Text<T extends TextAs = 'p'>({
  as,
  size = 'md',
  tone = 'default',
  weight = 'regular',
  leading = 'normal',
  // Left, not justified: without hyphenation the browser opens rivers of white
  // space between words to force the flush edge, which reads as sloppy at any
  // measure this site uses.
  align = 'left',
  clamp,
  preserveNewlines = true,
  className,
  children,
}: TextProps<T>) {
  const Component = (as || 'p') as TextAs;

  return (
    <Component
      className={classNames(
        sizeToClasses[size],
        tone === 'muted'
          ? 'text-zinc-600 dark:text-zinc-400'
          : tone === 'subtle'
            ? 'text-zinc-700 dark:text-zinc-300'
            : 'text-zinc-900 dark:text-zinc-50',
        weight === 'medium' ? 'font-medium' : 'font-normal',
        leading === 'tight'
          ? 'leading-tight'
          : leading === 'relaxed'
            ? 'leading-relaxed'
            : 'leading-normal',
        align === 'center'
          ? 'text-center'
          : align === 'right'
            ? 'text-right'
            : align === 'justify'
              ? 'text-justify'
              : 'text-left',
        clamp ? `line-clamp-${clamp}` : undefined,
        preserveNewlines ? 'whitespace-pre-line' : undefined,
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Text;
