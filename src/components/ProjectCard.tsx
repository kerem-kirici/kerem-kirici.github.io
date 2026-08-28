'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { ButtonLink } from '@/components/links';
import { scrollWindowTo } from '@/components/StickyScrollStack';
import { DateText, Heading, Tag, Text } from '@/components/texts';
import type { Project } from '@/data/projects';
import { springRotate, springTilt } from '@/lib/motion';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const ROTATE_AMPLITUDE = 14;

const SCALE_ON_HOVER = 1.04;

/** How far the surface sinks under a press. Small, but it lands immediately. */
const SCALE_ON_PRESS = 0.985;

export default function ProjectCard({
  title,
  description,
  href,
  image,
  tags,
  slug,
  date,
}: Project) {
  const [imageSrc, imageOrientation] = image;

  const { t } = useLanguage();

  const reduceMotion = useReducedMotion();

  const [isFlipped, setFlipped] = useState(false);

  const [isXSmallScreen, setIsXSmallScreen] = useState(false);

  // Tilt is a pointer affordance. On a touch screen there is no hover state to
  // express it with, and on a device that reports coarse input the effect only
  // ever fires as a flicker at the end of a tap.
  const [canTilt, setCanTilt] = useState(false);

  const cardRef = useRef<HTMLElement>(null);

  const rotateX = useSpring(useMotionValue(0), springTilt);

  const rotateY = useSpring(useMotionValue(0), springTilt);

  const scale = useSpring(1, springTilt);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)');

    const small = window.matchMedia('(max-width: 639px)');

    const sync = () => {
      setIsXSmallScreen(small.matches);
      setCanTilt(!coarse.matches);
    };

    sync();
    coarse.addEventListener('change', sync);
    small.addEventListener('change', sync);

    return () => {
      coarse.removeEventListener('change', sync);
      small.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || !canTilt) {
      rotateX.jump(0);
      rotateY.jump(0);
      scale.jump(1);
    }
  }, [reduceMotion, canTilt, rotateX, rotateY, scale]);

  /**
   * Scrolls the card into view at its sticky position within the ScrollStack.
   * Walks the offsetParent chain to get the true layout position (unaffected by
   * CSS transforms applied by the scroll stack).
   */
  const scrollToCard = () => {
    if (!cardRef.current || typeof window === 'undefined') return;

    const stackCard = cardRef.current.closest('.scroll-stack-card') as HTMLElement | null;

    if (!stackCard) return;

    const header = document.querySelector('header') as HTMLElement | null;

    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    let documentTop = 0;

    let el: HTMLElement | null = stackCard;

    while (el) {
      documentTop += el.offsetTop;
      el = el.offsetParent as HTMLElement | null;
    }

    scrollWindowTo(Math.max(0, documentTop - headerHeight - 24));
  };

  const tiltEnabled = canTilt && !reduceMotion;

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (!tiltEnabled || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const offsetX = e.clientX - rect.left - rect.width / 2;

    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -ROTATE_AMPLITUDE);
    rotateY.set((offsetX / (rect.width / 2)) * ROTATE_AMPLITUDE);
  }

  function handlePointerEnter() {
    if (!tiltEnabled) return;
    scale.set(SCALE_ON_HOVER);
  }

  function handlePointerLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  // The press is acknowledged on pointer-down. Waiting for the click to fire is
  // the difference between a surface that feels touched and one that feels dead.
  function handlePointerDown() {
    if (reduceMotion) return;
    scale.set(SCALE_ON_PRESS);
  }

  function handlePointerUp() {
    scale.set(tiltEnabled ? SCALE_ON_HOVER : 1);
  }

  const toggleFlip = () => {
    scrollToCard();
    setFlipped((prev) => !prev);
  };

  const faceClasses =
    'absolute inset-0 w-full h-full overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-zinc-900';

  return (
    <figure
      ref={cardRef}
      className="relative w-full [perspective:800px]"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Tilt container */}
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, scale }}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ type: 'spring', ...springTilt }}
      >
        {/* Flip container — a real control, so the back of the card is
            reachable without a pointer. */}
        <motion.div
          role="button"
          tabIndex={0}
          aria-expanded={isFlipped}
          aria-label={title}
          onClick={toggleFlip}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleFlip();
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          animate={reduceMotion ? {} : { rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', ...springRotate }}
          className="relative w-full aspect-[3/4] cursor-pointer touch-manipulation rounded-3xl [transform-style:preserve-3d] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* === CARD FRONT === */}
          <motion.div
            className={`${faceClasses} border-black/10 dark:border-white/10 ${
              reduceMotion ? '' : '[backface-visibility:hidden] [transform:translateZ(0)]'
            }`}
            // With reduced motion the two faces cross-fade in place instead of
            // rotating through 3D space.
            initial={false}
            animate={reduceMotion ? { opacity: isFlipped ? 0 : 1 } : {}}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            aria-hidden={isFlipped}
            {...(isFlipped ? { inert: true } : {})}
          >
            {imageSrc ? (
              <div className="absolute inset-0">
                <Image
                  key={`${slug}-${imageSrc}`}
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={`object-cover ${imageOrientation === 'landscape' ? 'object-left' : 'object-center'}`}
                  priority={false}
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />
            )}
          </motion.div>

          {/* === CARD BACK === */}
          <motion.div
            className={`${faceClasses} border-black/10 shadow-lg dark:border-white/10 ${
              reduceMotion ? '' : '[backface-visibility:hidden] [transform:rotateY(180deg)]'
            }`}
            initial={false}
            animate={reduceMotion ? { opacity: isFlipped ? 1 : 0 } : {}}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            aria-hidden={!isFlipped}
            {...(isFlipped ? {} : { inert: true })}
          >
            <div className="flex flex-col h-full p-5">
              <Heading as="h3" size="md" weight="semibold" className="mb-2">
                {title}
              </Heading>
              <Text size="sm" leading="relaxed" tone="muted" className="flex-1 overflow-y-auto">
                {description}
              </Text>
              {isXSmallScreen && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <DateText value={date} size="xs" />
                <ButtonLink
                  href={href}
                  variant="secondary"
                  size="sm"
                  rounded="full"
                  newTab={href.startsWith('http')}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs"
                >
                  {t('projects.details')}
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating 3D overlay — arrow link to details page */}
        <motion.div
          className="absolute top-4 left-4 right-4 z-[2] pointer-events-none will-change-transform [transform:translateZ(30px)]"
          animate={{ opacity: isFlipped ? 0 : 1 }}
          transition={{ duration: 0.2, delay: isFlipped ? 0 : 0.3 }}
          {...(isFlipped ? { inert: true } : {})}
        >
          <Link
            href={href}
            onClick={(e) => e.stopPropagation()}
            className={`${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'} material-chrome inline-flex items-center gap-2.5 rounded-2xl px-5 py-3 group touch-manipulation transition duration-150 ease-out active:scale-[0.97] motion-reduce:active:scale-100`}
          >
            <span className="text-base text-zinc-900 dark:text-zinc-50 transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
            <Heading
              as="h3"
              size="md"
              weight="semibold"
              className="text-zinc-900 dark:text-zinc-50"
            >
              {title}
            </Heading>
          </Link>
        </motion.div>

        {/* Tag pills — inside tilt container for 3D parallax */}
        {!isXSmallScreen && tags.length > 0 && (
          <motion.div
            className="mt-3 will-change-transform [transform:translateZ(15px)]"
            animate={{ opacity: isFlipped ? 0 : 1 }}
            transition={{ duration: 0.2, delay: isFlipped ? 0 : 0.3 }}
          >
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </figure>
  );
}
