'use client';

import React from 'react';

type ProseProps = {
  size?: 'sm' | 'md';
  className?: string;
  children: React.ReactNode;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Prose({ size = 'md', className, children }: ProseProps) {
  return (
    <div
      className={classNames(
        'prose dark:prose-invert', // works if typography plugin is enabled; otherwise acts as a simple wrapper
        size === 'sm' ? 'prose-sm' : 'prose-base',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Prose;
