'use client';

import Link from 'next/link';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonTone = 'default' | 'inverse' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonRounded = 'sm' | 'md' | 'full';

export type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  newTab?: boolean;
  prefetch?: boolean;
  ariaLabel?: string;
  className?: string;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const baseClasses =
  'inline-flex items-center justify-center font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const sizeToClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

const roundedToClasses: Record<ButtonRounded, string> = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  full: 'rounded-full',
};

function getVariantClasses(variant: ButtonVariant, tone: ButtonTone) {
  if (variant === 'primary') {
    return tone === 'inverse'
      ? 'bg-white text-black hover:opacity-90'
      : tone === 'accent'
        ? 'bg-blue-600 text-white hover:bg-blue-500'
        : 'bg-black text-white hover:opacity-90 dark:bg-white dark:text-black';
  }
  if (variant === 'secondary') {
    return tone === 'inverse'
      ? 'bg-zinc-100 text-black hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800'
      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700';
  }
  if (variant === 'outline') {
    return tone === 'inverse'
      ? 'border border-white/20 text-white hover:bg-white/10'
      : 'border border-black/10 text-zinc-900 hover:bg-black/5 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-white/5';
  }

  // ghost
  return tone === 'inverse'
    ? 'text-white hover:bg-white/10'
    : 'text-zinc-900 hover:bg-black/5 dark:text-zinc-50 dark:hover:bg-white/5';
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  tone = 'default',
  size = 'sm',
  rounded = 'full',
  iconLeft,
  iconRight,
  fullWidth,
  loading,
  disabled,
  newTab,
  prefetch,
  ariaLabel,
  className,
}: ButtonLinkProps) {
  const content = (
    <span className="inline-flex items-center gap-2">
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </span>
  );

  return (
    <Link
      href={href}
      prefetch={prefetch}
      aria-label={ariaLabel}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className={classNames(
        baseClasses,
        sizeToClasses[size],
        roundedToClasses[rounded],
        getVariantClasses(variant, tone),
        fullWidth ? 'w-full' : undefined,
        loading ? 'aria-busy' : undefined,
        className,
      )}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
    >
      {content}
    </Link>
  );
}

export default ButtonLink;
