'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();

  const year = String(new Date().getFullYear());

  return <footer className="py-10 text-sm opacity-70">{t('footer.copyright', { year })}</footer>;
}
