'use client';

import { springTilt, transitionMove } from '@/lib/motion';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  tilt?: boolean;
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
  tilt = true,
  priority = false,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  className,
}: ImageComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reduceMotion = useReducedMotion();

  // Tilt needs a hover state to live in; a coarse pointer has none.
  const [canTilt, setCanTilt] = useState(false);

  const cardRef = useRef<HTMLButtonElement>(null);

  const closeRef = useRef<HTMLButtonElement>(null);

  const rotateX = useSpring(useMotionValue(0), springTilt);

  const rotateY = useSpring(useMotionValue(0), springTilt);

  const tiltScale = useSpring(1, springTilt);

  const rotateAmplitude = 14;

  const scaleOnHover = 1.04;

  const tiltEnabled = tilt && canTilt && !reduceMotion;

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)');

    const sync = () => setCanTilt(!coarse.matches);

    sync();
    coarse.addEventListener('change', sync);

    return () => coarse.removeEventListener('change', sync);
  }, []);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (!tiltEnabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const offsetX = e.clientX - rect.left - rect.width / 2;

    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handlePointerEnter() {
    if (!tiltEnabled) return;
    tiltScale.set(scaleOnHover);
  }

  function handlePointerLeave() {
    tiltScale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  // Acknowledge the press itself, before the lightbox has had time to open.
  function handlePointerDown() {
    if (reduceMotion) return;
    tiltScale.set(0.985);
  }

  function handlePointerUp() {
    tiltScale.set(tiltEnabled ? scaleOnHover : 1);
  }

  // Handle ESC key and prevent background scrolling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
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
    // Never strand the keyboard: focus goes back to the thumbnail it came from.
    cardRef.current?.focus();
  };

  const imageContent = (
    <div
      className={classNames(
        'group relative overflow-hidden',
        roundedToClasses[rounded],
        shadowToClasses[shadow],
        border ? 'border border-black/10 dark:border-white/15' : undefined,
        'bg-white dark:bg-zinc-900',
        hover ? 'transition hover:shadow-lg' : undefined,
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
            hover && !tiltEnabled ? 'group-hover:scale-105' : undefined,
          )}
          sizes={sizes}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* A real button: the thumbnail opens a dialog, so it has to be
          reachable and announceable without a pointer. */}
      <button
        type="button"
        ref={cardRef}
        onClick={handleImageClick}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-label={alt}
        aria-haspopup="dialog"
        className={classNames(
          'block w-full cursor-pointer touch-manipulation text-left',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          roundedToClasses[rounded],
          tilt ? '[perspective:800px]' : undefined,
          className,
        )}
      >
        {tilt ? (
          <motion.div
            className="[transform-style:preserve-3d]"
            style={{ rotateX, rotateY, scale: tiltScale }}
          >
            {imageContent}
          </motion.div>
        ) : (
          imageContent
        )}
      </button>

      {/* Lightbox. The surface materialises — blur and scale arrive together —
          rather than fading in as a flat rectangle, and it leaves along the
          same path it came in on. */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: reduceMotion ? 0.15 : 0.25, ease: 'easeOut' }}
            onClick={handleClose}
            // The dialog holds a single control, so keeping Tab on it is a
            // complete focus trap: attention cannot fall through to the page
            // behind the lightbox.
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                closeRef.current?.focus();
              }
            }}
            style={{ touchAction: 'none' }}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-[90vw] overflow-auto"
              onClick={(e) => e.stopPropagation()}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              transition={reduceMotion ? { duration: 0.15 } : transitionMove}
              style={{ touchAction: 'auto' }}
            >
              <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                className="max-h-[90vh] w-auto max-w-full rounded-xl object-contain"
                draggable={false}
                unoptimized
              />
            </motion.div>

            <button
              type="button"
              ref={closeRef}
              onClick={handleClose}
              aria-label="Close image"
              autoFocus
              className="material-chrome absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-900 touch-manipulation transition duration-150 ease-out active:scale-[0.92] motion-reduce:active:scale-100 dark:text-zinc-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M6 6l12 12M18 6l-12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ImageComponent;
