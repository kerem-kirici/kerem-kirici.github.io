'use client';

import Image from 'next/image';

type ImageRatio = '1/1' | '3/4' | '4/3' | '16/9' | '9/16' | '21/9' | 'auto';
type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
type ImageShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export type ImageComponentProps = {
  src: string;
  alt: string;
  ratio?: ImageRatio;
  rounded?: ImageRounded;
  shadow?: ImageShadow;
  fit?: ImageFit;
  border?: boolean;
  hover?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const ratioToClasses: Record<ImageRatio, string> = {
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-video',
  '9/16': 'aspect-[9/16]',
  '21/9': 'aspect-[21/9]',
  auto: 'aspect-auto',
};

const roundedToClasses: Record<ImageRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

const shadowToClasses: Record<ImageShadow, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

const fitToClasses: Record<ImageFit, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
};

export function ImageComponent({
  src,
  alt,
  ratio = '3/4',
  rounded = '2xl',
  shadow = 'md',
  fit = 'cover',
  border = true,
  hover = true,
  priority = false,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  className,
}: ImageComponentProps) {
  return (
    <figure
      className={classNames(
        'group relative overflow-hidden',
        roundedToClasses[rounded],
        shadowToClasses[shadow],
        border ? 'border border-black/10 dark:border-white/15' : undefined,
        'bg-white dark:bg-zinc-900',
        hover ? 'transition hover:shadow-lg' : undefined,
        className,
      )}
    >
      <div className={classNames('relative w-full', ratioToClasses[ratio])}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={classNames(
            fitToClasses[fit],
            'transition duration-300',
            hover ? 'group-hover:scale-105' : undefined,
          )}
          sizes={sizes}
        />
      </div>
    </figure>
  );
}

export default ImageComponent;
