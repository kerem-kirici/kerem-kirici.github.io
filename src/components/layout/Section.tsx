'use client';

import React from 'react';

type SectionAs = 'section' | 'div';

type SectionProps<T extends SectionAs = 'section'> = {
  as?: T;
  padding?: 'sm' | 'md' | 'lg';
  container?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const paddingToClasses = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
};

const containerToClasses = {
  none: '',
  sm: 'max-w-screen-sm mx-auto px-4',
  md: 'max-w-screen-md mx-auto px-4',
  lg: 'max-w-screen-lg mx-auto px-4',
  xl: 'max-w-screen-xl mx-auto px-4',
};

export function Section<T extends SectionAs = 'section'>({
  as,
  padding = 'lg',
  container = 'none',
  className,
  children,
}: SectionProps<T>) {
  const Component = (as || 'section') as SectionAs;

  return (
    <Component className={classNames(paddingToClasses[padding], className)}>
      {container === 'none' ? (
        children
      ) : (
        <div className={containerToClasses[container]}>{children}</div>
      )}
    </Component>
  );
}

export default Section;
