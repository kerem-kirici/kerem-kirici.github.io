'use client';

import React from 'react';

type KickerAs = 'p' | 'span' | 'div';

type KickerProps<T extends KickerAs = 'p'> = {
  as?: T;
  size?: 'xs' | 'sm';
  upper?: boolean;
  tone?: 'default' | 'muted' | 'accent';
  align?: 'left' | 'center' | 'right';
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Kicker<T extends KickerAs = 'p'>({
  as,
  size = 'xs',
  upper = true,
  tone = 'muted',
  align = 'left',
  className,
  children,
}: KickerProps<T>) {
  const Component = (as || 'p') as KickerAs;

  return (
    <Component
      className={classNames(
        size === 'xs' ? 'text-xs' : 'text-sm',
        upper ? 'uppercase' : undefined,
        'font-medium',
        tone === 'muted'
          ? 'text-zinc-600 dark:text-zinc-400'
          : tone === 'accent'
            ? 'text-black dark:text-white'
            : 'text-zinc-900 dark:text-zinc-50',
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
        'tracking-wide',
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Kicker;
