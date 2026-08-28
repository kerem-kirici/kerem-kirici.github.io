'use client';

import Link from 'next/link';
import React from 'react';

type IconVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type IconShape = 'square' | 'circle';
type IconSize = 'sm' | 'md' | 'lg';

export type IconButtonLinkProps = {
  href: string;
  children: React.ReactNode; // should be an icon
  shape?: IconShape;
  size?: IconSize;
  variant?: IconVariant;
  newTab?: boolean;
  ariaLabel: string;
  className?: string;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const sizeToClasses: Record<IconSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

function getVariantClasses(variant: IconVariant) {
  if (variant === 'primary')
    return 'bg-black text-white hover:opacity-90 dark:bg-white dark:text-black';
  if (variant === 'secondary')
    return 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700';
  if (variant === 'outline')
    return 'border border-black/10 text-zinc-900 hover:bg-black/5 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-white/5';

  return 'text-zinc-900 hover:bg-black/5 dark:text-zinc-50 dark:hover:bg-white/5';
}

export function IconButtonLink({
  href,
  children,
  shape = 'circle',
  size = 'md',
  variant = 'ghost',
  newTab,
  ariaLabel,
  className,
}: IconButtonLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className={classNames(
        'inline-flex items-center justify-center select-none touch-manipulation',
        'transition duration-150 ease-out active:scale-[0.92] motion-reduce:active:scale-100',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        sizeToClasses[size],
        shape === 'circle' ? 'rounded-full' : 'rounded-md',
        getVariantClasses(variant),
        className,
      )}
    >
      {children}
    </Link>
  );
}

export default IconButtonLink;
