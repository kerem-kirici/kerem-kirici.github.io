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

const colsClassMap = {
  base: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  },
  sm: {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
  },
  md: {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  },
  lg: {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  },
};

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
        colsClassMap.base[cols.base],
        cols.sm && colsClassMap.sm[cols.sm],
        cols.md && colsClassMap.md[cols.md],
        cols.lg && colsClassMap.lg[cols.lg],
        gapToClasses[gap],
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Grid;
