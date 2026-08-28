'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { TextLink } from '@/components/links/TextLink';
import { Switch } from '@/components/toggles';
import { projectMomentum, springSheet } from '@/lib/motion';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

/** Fallback until the panel has been measured (w-72 = 18rem). */
const DRAWER_WIDTH = 288;

/** Past this fraction of the panel width, a release commits to closing. */
const DISMISS_THRESHOLD = 0.4;

export default function Header() {
  const { lang, setLang, t } = useLanguage();

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const reduceMotion = useReducedMotion();

  const panelRef = useRef<HTMLElement>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const widthRef = useRef(DRAWER_WIDTH);

  // Mirrored in state because the drag constraints are read during render.
  const [drawerWidth, setDrawerWidth] = useState(DRAWER_WIDTH);

  // Carries the release velocity of a dismissing flick across the state change,
  // so the spring that finishes the gesture starts at the speed the finger left.
  const releaseVelocityRef = useRef(0);

  // 0 = fully open, panel width = fully closed. The drawer's position is a
  // single continuous value so a drag and an animation are the same thing —
  // either can take over from the other mid-flight without a jump.
  const x = useMotionValue(DRAWER_WIDTH);

  // The scrim tracks the panel 1:1 through the whole gesture rather than
  // fading only once the drag has been released.
  const scrimOpacity = useTransform(x, (value) =>
    Math.min(1, Math.max(0, 1 - value / widthRef.current)),
  );

  const settle = useCallback(
    (target: number, velocity = 0) => {
      if (reduceMotion) {
        x.set(target);

        return;
      }

      // Hand the release velocity straight to the spring so there is no seam
      // between the finger letting go and the animation taking over.
      animate(x, target, { type: 'spring', ...springSheet, velocity });
    },
    [reduceMotion, x],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Drive the panel toward its resting position whenever the open state flips.
  // Enter and exit run along the same path, so the drawer always leaves the way
  // it arrived.
  useEffect(() => {
    const measure = () => {
      const width = panelRef.current?.offsetWidth || DRAWER_WIDTH;

      widthRef.current = width;
      setDrawerWidth(width);

      return width;
    };

    const velocity = releaseVelocityRef.current;

    releaseVelocityRef.current = 0;

    settle(open ? 0 : measure(), velocity);

    const onResize = () => settle(open ? 0 : measure());

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [open, settle]);

  // Move focus into the drawer on open and hand it back to the trigger on
  // close, so a keyboard user is never stranded behind the panel.
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    } else if (wasOpenRef.current) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  // Lock scroll when mobile menu is open and restore on close (preserves position)
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const body = document.body;

    if (open) {
      // Save current scroll position and lock body
      scrollPositionRef.current = window.scrollY;
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.width = '100%';
      body.style.top = `-${scrollPositionRef.current}px`;
    } else {
      // Read and clear styles first to restore normal flow
      const savedY = scrollPositionRef.current;

      body.style.overflow = '';
      body.style.position = '';
      body.style.width = '';
      body.style.top = '';
      // Restore scroll position
      window.scrollTo(0, savedY);
    }

    return () => {
      body.style.overflow = '';
      body.style.position = '';
      body.style.width = '';
      body.style.top = '';
    };
  }, [open]);

  // Handle scroll detection
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Wrap with a React Fragment because we now have two sibling elements
    <>
      <header
        className="material-chrome scroll-edge sticky top-0 z-50 w-full"
        // A soft edge appears only once content is actually passing underneath;
        // an always-drawn rule separates the header from nothing.
        style={{ '--scroll-edge-opacity': scrolled ? 1 : 0 } as React.CSSProperties}
      >
        <div className="mx-auto max-w-4xl px-8 md:px-6 flex items-center justify-between py-8">
          <Link
            href="/"
            className="text-lg font-semibold type-subhead touch-manipulation transition-opacity duration-150 active:opacity-60"
          >
            Kerem Kırıcı
          </Link>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2 text-sm">
            <div className="flex items-center gap-5">
              <TextLink href="/" underline="always" className="opacity-80 hover:opacity-100">
                {t('nav.home')}
              </TextLink>
              <TextLink
                href="/projects"
                underline="always"
                className="opacity-80 hover:opacity-100"
              >
                {t('nav.projects')}
              </TextLink>
              <TextLink href="/about" underline="always" className="opacity-80 hover:opacity-100">
                {t('nav.about')}
              </TextLink>
            </div>
            <div
              className="flex items-center gap-5 pl-4 ml-2 border-l"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <TextLink
                href="https://github.com/kerem-kirici"
                underline="always"
                newTab
                className="opacity-80 hover:opacity-100"
              >
                {t('nav.github')}
              </TextLink>
              <TextLink
                href="https://www.linkedin.com/in/kerem-kırıcı-b191711b9/"
                underline="always"
                newTab
                className="opacity-80 hover:opacity-100"
              >
                {t('nav.linkedin')}
              </TextLink>
              <TextLink
                href="/resume.pdf"
                underline="always"
                newTab
                className="opacity-80 hover:opacity-100"
              >
                {t('nav.resume')}
              </TextLink>
            </div>
            <div
              className="flex items-center gap-2 pl-4 ml-2 border-l"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <span className="text-xs opacity-70">EN</span>
              <Switch
                ariaLabel="Toggle language"
                size="sm"
                checked={lang === 'tr'}
                onChange={(checked) => setLang(checked ? 'tr' : 'en')}
              />
              <span className="text-xs opacity-70">TR</span>
            </div>
          </nav>
          {/* Mobile menu button */}
          <button
            ref={triggerRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-zinc-900 touch-manipulation transition duration-150 ease-out hover:bg-black/5 active:scale-[0.92] motion-reduce:active:scale-100 dark:text-zinc-50 dark:hover:bg-white/10"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* The drawer lives outside <header> so it does not inherit its material. */}
      <>
        {/* A modal task dims what it covers, so attention lands on the panel. */}
        <motion.div
          className={`fixed inset-0 z-[1000] md:hidden bg-black/40 backdrop-blur-sm ${
            open ? '' : 'pointer-events-none'
          }`}
          style={{ opacity: scrimOpacity }}
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <motion.aside
          ref={panelRef}
          style={{ x }}
          drag={reduceMotion ? false : 'x'}
          dragDirectionLock
          dragConstraints={{ left: 0, right: drawerWidth }}
          // Dragging further open meets progressive resistance instead of a
          // hard stop; dragging closed is unresisted, because that direction
          // has somewhere to go.
          dragElastic={{ left: 0.55, right: 0, top: 0, bottom: 0 }}
          dragMomentum={false}
          onDragEnd={(_event, info) => {
            // Snap to where the flick is heading, not to where the finger
            // happened to stop.
            const projected = x.get() + projectMomentum(info.velocity.x);

            const shouldClose = projected > widthRef.current * DISMISS_THRESHOLD;

            if (shouldClose === open) {
              // The open state is about to change, so hand the velocity to the
              // effect that owns the animation rather than starting a second
              // one here that it would immediately override.
              releaseVelocityRef.current = info.velocity.x;
              setOpen(!shouldClose);

              return;
            }

            // The gesture did not change the state — finish it here.
            settle(shouldClose ? widthRef.current : 0, info.velocity.x);
          }}
          className="fixed inset-y-0 right-0 z-[1001] w-72 max-w-full touch-pan-y bg-white dark:bg-zinc-900 shadow-2xl p-6 flex flex-col gap-6 md:hidden"
          aria-label={t('nav.home')}
          {...(open ? {} : { inert: true })}
        >
          {/* Grab handle: the affordance that says this panel can be thrown away. */}
          <span
            className="absolute inset-y-0 left-1.5 my-auto h-10 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700"
            aria-hidden
          />
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold type-subhead"
              onClick={() => setOpen(false)}
            >
              Kerem Kırıcı
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-900 touch-manipulation transition duration-150 ease-out hover:bg-zinc-100 active:scale-[0.92] motion-reduce:active:scale-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6l12 12M18 6l-12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-sm">
            <TextLink
              href="/"
              underline="always"
              className="opacity-80 hover:opacity-100"
              onClick={() => setOpen(false)}
            >
              {t('nav.home')}
            </TextLink>
            <TextLink
              href="/projects"
              underline="always"
              className="opacity-80 hover:opacity-100"
              onClick={() => setOpen(false)}
            >
              {t('nav.projects')}
            </TextLink>
            <TextLink
              href="/about"
              underline="always"
              className="opacity-80 hover:opacity-100"
              onClick={() => setOpen(false)}
            >
              {t('nav.about')}
            </TextLink>
            <div className="h-px my-2" style={{ background: 'var(--hairline)' }} />
            <TextLink
              href="https://github.com/kerem-kirici"
              underline="always"
              newTab
              className="opacity-80 hover:opacity-100"
            >
              {t('nav.github')}
            </TextLink>
            <TextLink
              href="https://www.linkedin.com/in/kerem-kırıcı-b191711b9/"
              underline="always"
              newTab
              className="opacity-80 hover:opacity-100"
            >
              {t('nav.linkedin')}
            </TextLink>
            <TextLink
              href="/resume.pdf"
              underline="always"
              newTab
              className="opacity-80 hover:opacity-100"
            >
              {t('nav.resume')}
            </TextLink>
            <div className="h-px my-2" style={{ background: 'var(--hairline)' }} />
            <div className="flex items-center gap-3">
              <span className="text-xs opacity-70">EN</span>
              <Switch
                ariaLabel="Toggle language"
                size="sm"
                checked={lang === 'tr'}
                onChange={(checked) => setLang(checked ? 'tr' : 'en')}
              />
              <span className="text-xs opacity-70">TR</span>
            </div>
          </nav>
        </motion.aside>
      </>
    </> // Close the outer React Fragment
  );
}
