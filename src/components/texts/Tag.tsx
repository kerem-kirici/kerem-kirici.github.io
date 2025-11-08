'use client';

import React from 'react';

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={classNames(
        'rounded-full border border-black/20 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-white/20 dark:bg-zinc-800 dark:text-zinc-300',
        className,
      )}
    >
      {children}
    </span>
  );
}
