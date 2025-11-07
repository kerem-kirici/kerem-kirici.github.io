'use client';

import React from 'react';

type ArticleAs = 'article' | 'section' | 'div';
type ArticleWidth = 'full' | 'prose' | 'narrow' | 'wide';
type ArticleSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type ArticleProps<T extends ArticleAs = 'article'> = {
  as?: T;
  width?: ArticleWidth;
  spacing?: ArticleSpacing;
  centered?: boolean;
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const widthToClasses: Record<ArticleWidth, string> = {
  full: 'w-full',
  prose: 'max-w-prose',
  narrow: 'max-w-2xl',
  wide: 'max-w-5xl',
};

const spacingToClasses: Record<ArticleSpacing, string> = {
  none: 'space-y-0',
  sm: 'space-y-4',
  md: 'space-y-6',
  lg: 'space-y-8',
  xl: 'space-y-12',
};

export function Article<T extends ArticleAs = 'article'>({
  as,
  width = 'prose',
  spacing = 'md',
  centered = false,
  className,
  children,
}: ArticleProps<T>) {
  const Component = (as || 'article') as ArticleAs;

  return (
    <Component
      className={classNames(
        widthToClasses[width],
        spacingToClasses[spacing],
        centered ? 'mx-auto' : undefined,
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Article;
