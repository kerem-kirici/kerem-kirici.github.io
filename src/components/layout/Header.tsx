'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { TextLink } from '@/components/links/TextLink';
import { Switch } from '@/components/toggles';
import Link from 'next/link';

export default function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Kerem Kırıcı
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <TextLink href="/" underline="never" className="opacity-80 hover:opacity-100">
          {t('nav.home')}
        </TextLink>
        <TextLink href="/projects" underline="never" className="opacity-80 hover:opacity-100">
          {t('nav.projects')}
        </TextLink>
        <TextLink href="/about" underline="never" className="opacity-80 hover:opacity-100">
          {t('nav.about')}
        </TextLink>
        <TextLink href="/contact" underline="never" className="opacity-80 hover:opacity-100">
          {t('nav.contact')}
        </TextLink>
        <TextLink
          href="https://github.com/kerem-kirici"
          underline="never"
          newTab
          className="opacity-80 hover:opacity-100"
        >
          {t('nav.github')}
        </TextLink>
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
    </header>
  );
}
