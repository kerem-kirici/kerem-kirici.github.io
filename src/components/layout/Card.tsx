'use client';

import React from 'react';

type CardAs = 'div' | 'article' | 'section';

export type CardProps<T extends CardAs = 'div'> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * The raised content surface used for the standalone panels on the home and
 * about pages. It sits on the shared `material-raised` token, so the
 * reduced-transparency and increased-contrast preferences reach it too.
 */
export function Card<T extends CardAs = 'div'>({ as, className, children }: CardProps<T>) {
  const Component = (as || 'div') as CardAs;

  return (
    <Component
      className={classNames(
        'material-raised h-full rounded-3xl border border-black/10 p-6 shadow-lg dark:border-white/10',
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Card;
