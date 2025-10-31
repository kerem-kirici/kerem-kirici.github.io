'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'en' | 'tr';

type Dict = Record<string, Record<Lang, string>>;

const dictionary: Dict = {
  'nav.home': { en: 'Home', tr: 'Ana Sayfa' },
  'nav.projects': { en: 'Projects', tr: 'Projeler' },
  'nav.about': { en: 'About', tr: 'Hakkımda' },
  'nav.contact': { en: 'Contact', tr: 'İletişim' },
  'nav.github': { en: 'GitHub', tr: 'GitHub' },
  'hero.title': {
    en: 'Building elegant experiences with React & Next.js',
    tr: 'React & Next.js ile zarif deneyimler inşa ediyorum',
  },
  'hero.cta': { en: 'Get in touch', tr: 'İletişime geç' },
  'hero.github': { en: 'GitHub', tr: 'GitHub' },
  'home.featured': { en: 'Featured projects', tr: 'Öne çıkan projeler' },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof dictionary) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem('lang') as Lang | null;

        if (saved === 'en' || saved === 'tr') return saved;
      } catch {}
    }

    return 'en';
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('lang', lang);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useMemo(
    () => (key: keyof typeof dictionary) =>
      dictionary[key]?.[lang] ?? dictionary[key]?.en ?? String(key),
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);

  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');

  return ctx;
}

export default LanguageProvider;
