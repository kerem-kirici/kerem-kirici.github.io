'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import TextLink from '../links/TextLink';

export default function Footer() {
  const { t } = useLanguage();

  const year = String(new Date().getFullYear());

  return (
    <footer className="py-10 text-sm">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <TextLink
            href="https://github.com/kerem-kirici"
            newTab
            underline="always"
            className="opacity-80 hover:opacity-100"
          >
            {t('footer.github')}
          </TextLink>
          <TextLink
            href="https://www.linkedin.com/in/kerem-kırıcı-b191711b9/"
            newTab
            underline="always"
            className="opacity-80 hover:opacity-100"
          >
            {t('footer.linkedin')}
          </TextLink>
          <TextLink
            href="mailto:kerem.kirici36@gmail.com"
            underline="always"
            className="opacity-80 hover:opacity-100"
          >
            {t('footer.email')}
          </TextLink>
        </div>
        <div className="opacity-70">{t('footer.copyright', { year })}</div>
      </div>
    </footer>
  );
}
