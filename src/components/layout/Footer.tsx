'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();

  const year = String(new Date().getFullYear());

  return (
    <footer className="py-10 text-sm">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:kerem.kirici36@gmail.com"
            className="text-zinc-900 dark:text-zinc-50 underline underline-offset-4 hover:opacity-80"
          >
            Email
          </a>
          <a
            href="https://github.com/kerem-kirici"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-900 dark:text-zinc-50 underline underline-offset-4 hover:opacity-80"
          >
            GitHub
          </a>
        </div>
        <div className="opacity-70">{t('footer.copyright', { year })}</div>
      </div>
    </footer>
  );
}
