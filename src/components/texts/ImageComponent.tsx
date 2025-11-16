'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [zoom, setZoom] = useState(1);

  // Handle ESC key and prevent background scrolling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setZoom(1);
      }
    };

    // Prevent background scroll and touch events on mobile
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (isModalOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Prevent touch-based scrolling on mobile devices
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.touchAction = 'none';
      // Prevent touchmove events
      document.addEventListener('touchmove', preventScroll, { passive: false });

      // Cleanup function to restore scroll position
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('touchmove', preventScroll);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.touchAction = '';
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isModalOpen]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setZoom(1);
  };

  return (
    <>
      <figure
        onClick={handleImageClick}
        className={classNames(
          'group relative overflow-hidden cursor-pointer',
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

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={handleClose}
          style={{ touchAction: 'none' }}
        >
          {/* Image Container with Zoom */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ touchAction: 'auto' }}
          >
            <div
              style={{
                transform: `scale(${zoom})`,
                transition: 'transform 0.2s ease-in-out',
              }}
              className="relative w-full h-full min-w-[300px] min-h-[300px]"
            >
              <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                draggable={false}
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageComponent;
