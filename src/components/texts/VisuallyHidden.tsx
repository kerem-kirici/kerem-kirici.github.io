'use client';

import React from 'react';

type VisuallyHiddenAs = 'span' | 'div';

type VisuallyHiddenProps<T extends VisuallyHiddenAs = 'span'> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function VisuallyHidden<T extends VisuallyHiddenAs = 'span'>({
  as,
  children,
  className,
}: VisuallyHiddenProps<T>) {
  const Component = (as || 'span') as VisuallyHiddenAs;

  return <Component className={classNames('sr-only', className)}>{children}</Component>;
}

export default VisuallyHidden;
