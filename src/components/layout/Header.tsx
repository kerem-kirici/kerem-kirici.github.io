'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { TextLink } from '@/components/links/TextLink';
import { Switch } from '@/components/toggles';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
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

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Wrap with a React Fragment because we now have two sibling elements
    <>
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 transition-all duration-200 border-b border-white/20 dark:border-zinc-700/30"
        style={{
          boxShadow: scrolled
            ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
            : 'none',
        }}
      >
        <div className="mx-auto max-w-4xl px-8 md:px-6 flex items-center justify-between py-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
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
            <div className="flex items-center gap-5 pl-4 ml-2 border-l border-zinc-200 dark:border-zinc-800">
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
            <div className="flex items-center gap-2 pl-4 ml-2 border-l border-zinc-200 dark:border-zinc-800">
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
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded p-2 text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900"
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

      {/* FIX: The mobile sidebar is now OUTSIDE the <header> 
        so it does not inherit its transparency.
      */}
      <>
        <div
          className={`fixed inset-0 z-[1000] md:hidden bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out overscroll-behavior-none ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`fixed inset-y-0 right-0 z-[1001] w-72 max-w-full bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800 p-6 flex flex-col gap-6 md:hidden transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight"
              onClick={() => setOpen(false)}
            >
              Kerem Kırıcı
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded p-2 text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
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
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
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
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
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
        </aside>
      </>
    </> // Close the outer React Fragment
  );
}
