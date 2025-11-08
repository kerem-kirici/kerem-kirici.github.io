'use client';

type DateTextProps = {
  value: string;
  as?: 'span' | 'div';
  size?: 'xs' | 'sm';
  tone?: 'muted' | 'default';
  className?: string;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function DateText({
  value,
  as = 'span',
  size = 'xs',
  tone = 'muted',
  className,
}: DateTextProps) {
  const Component = as;

  return (
    <Component
      className={classNames(
        size === 'xs' ? 'text-xs' : 'text-sm',
        'italic',
        tone === 'muted' ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-700 dark:text-zinc-300',
        className,
      )}
    >
      {value}
    </Component>
  );
}
