'use client';

import Link from 'next/link';
import React from 'react';

type Underline = 'hover' | 'always' | 'never';

export type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  underline?: Underline;
  tone?: 'default' | 'muted' | 'accent';
  weight?: 'regular' | 'medium';
  newTab?: boolean;
  prefetch?: boolean;
  iconRight?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function TextLink({
  href,
  children,
  underline = 'hover',
  tone = 'accent',
  weight = 'medium',
  newTab,
  prefetch,
  iconRight,
  onClick,
  className,
}: TextLinkProps) {
  const underlineClass =
    underline === 'always'
      ? 'underline'
      : underline === 'never'
        ? 'no-underline'
        : 'underline-offset-4 hover:underline';

  const toneClass =
    tone === 'muted'
      ? 'text-zinc-600 dark:text-zinc-400'
      : tone === 'accent'
        ? 'text-black hover:text-zinc-700 dark:text-white dark:hover:text-zinc-200'
        : 'text-zinc-900 dark:text-zinc-50';

  return (
    <Link
      href={href}
      prefetch={prefetch}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className={classNames(
        'inline-flex items-center gap-1',
        weight === 'medium' ? 'font-medium' : 'font-normal',
        underlineClass,
        toneClass,
        className,
      )}
    >
      <span>{children}</span>
      {iconRight}
    </Link>
  );
}

export default TextLink;
