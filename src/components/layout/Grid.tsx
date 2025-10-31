'use client';

import React from 'react';

type GridCols = 1 | 2 | 3 | 4;

type GridProps = {
  cols?: { base: GridCols; sm?: GridCols; md?: GridCols; lg?: GridCols };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function colsClass(prefix: string, cols?: GridCols) {
  if (!cols) return '';

  return `${prefix}:grid-cols-${cols}`;
}

const gapToClasses = {
  sm: 'gap-3',
  md: 'gap-5',
  lg: 'gap-8',
};

export function Grid({ cols = { base: 1 }, gap = 'md', className, children }: GridProps) {
  return (
    <div
      className={classNames(
        'grid',
        `grid-cols-${cols.base}`,
        colsClass('sm', cols.sm),
        colsClass('md', cols.md),
        colsClass('lg', cols.lg),
        gapToClasses[gap],
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Grid;
