'use client';

import React from 'react';

type ActionsProps = {
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center';
  wrap?: boolean;
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const gapToClasses = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
};

export function Actions({
  gap = 'md',
  align = 'start',
  wrap = false,
  className,
  children,
}: ActionsProps) {
  return (
    <div
      className={classNames(
        'flex',
        gapToClasses[gap],
        align === 'center' ? 'items-center' : 'items-start',
        wrap ? 'flex-wrap' : '',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Actions;
