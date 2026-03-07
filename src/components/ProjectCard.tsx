'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { ButtonLink } from '@/components/links';
import { DateText, Heading, Tag, Text } from '@/components/texts';
import type { Project } from '@/data/projects';
import type { SpringOptions } from 'motion/react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const tiltSpring: SpringOptions = {
  damping: 15,
  stiffness: 100,
  mass: 2,
};

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

  const [isFlipped, setFlipped] = useState(false);

  const [isXSmallScreen, setIsXSmallScreen] = useState(false);

  const cardRef = useRef<HTMLElement>(null);

  const rotateX = useSpring(useMotionValue(0), tiltSpring);

  const rotateY = useSpring(useMotionValue(0), tiltSpring);

  const scale = useSpring(1, tiltSpring);

  const rotateAmplitude = 14;

  const scaleOnHover = 1.05;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsXSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

    window.scrollTo({
      top: Math.max(0, documentTop - headerHeight - 24),
      behavior: 'smooth',
    });
  };

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const offsetX = e.clientX - rect.left - rect.width / 2;

    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  const handleCardClick = () => {
    if (typeof window !== 'undefined') {
      scrollToCard();
      setTimeout(() => setFlipped((prev) => !prev), 50);
    }
  };

  return (
    <figure
      ref={cardRef}
      className="relative w-full [perspective:800px] cursor-pointer"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tilt container */}
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, scale }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Flip container */}
        <motion.div
          onClick={handleCardClick}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="relative w-full aspect-[3/4] [transform-style:preserve-3d]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* === CARD FRONT === */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:translateZ(0)] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
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
          </div>

          {/* === CARD BACK === */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-zinc-900">
            <div className="flex flex-col h-full p-5">
              <Heading as="h3" size="md" weight="semibold" tracking="tight" className="mb-2">
                {title}
              </Heading>
              <Text
                size="sm"
                leading="relaxed"
                tone="muted"
                align="left"
                className="flex-1 overflow-y-auto"
              >
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
          </div>
        </motion.div>

        {/* Floating 3D overlay — arrow link to details page */}
        <motion.div
          className="absolute top-4 left-4 right-4 z-[2] pointer-events-none will-change-transform [transform:translateZ(30px)]"
          animate={{ opacity: isFlipped ? 0 : 1 }}
          transition={{ duration: 0.2, delay: isFlipped ? 0 : 0.3 }}
        >
          <Link
            href={href}
            onClick={(e) => e.stopPropagation()}
            className={`${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'} inline-flex items-center gap-2.5 backdrop-blur-md bg-white/60 dark:bg-zinc-900/60 rounded-2xl px-5 py-3 group transition-colors hover:bg-white/80 dark:hover:bg-zinc-900/80`}
          >
            <span className="text-base text-zinc-900 dark:text-zinc-50 transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
            <Heading
              as="h3"
              size="md"
              weight="semibold"
              tracking="tight"
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
                <span
                  key={tag}
                  className="rounded-full border border-black/20 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-white/20 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </figure>
  );
}
