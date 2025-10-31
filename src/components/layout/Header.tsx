'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { TextLink } from '@/components/links/TextLink';
import { Switch } from '@/components/toggles';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Kerem Kırıcı
      </Link>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-2 text-sm">
        <div className="flex items-center gap-5">
          <TextLink href="/" underline="never" className="opacity-80 hover:opacity-100">
            {t('nav.home')}
          </TextLink>
          <TextLink href="/projects" underline="never" className="opacity-80 hover:opacity-100">
            {t('nav.projects')}
          </TextLink>
          <TextLink href="/about" underline="never" className="opacity-80 hover:opacity-100">
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
        <div className="flex items-center gap-2">
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

      {/* Mobile sidebar */}
      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 max-w-full bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800 p-6 flex flex-col gap-6 md:hidden">
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
                underline="never"
                className="opacity-80 hover:opacity-100"
                onClick={() => setOpen(false)}
              >
                {t('nav.home')}
              </TextLink>
              <TextLink
                href="/projects"
                underline="never"
                className="opacity-80 hover:opacity-100"
                onClick={() => setOpen(false)}
              >
                {t('nav.projects')}
              </TextLink>
              <TextLink
                href="/about"
                underline="never"
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
      ) : null}
    </header>
  );
}
