'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import TEXT_DICTIONARY, { TextKey, TextParams } from '@/data/Texts';

export type Lang = 'en' | 'tr';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: TextKey, params?: TextParams) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Session-only language; defaults to English on first render to match SSR
  const [lang, setLang] = useState<Lang>('tr');

  // Hyphenation and screen-reader pronunciation both key off this, and the
  // static export can only ship one value in the markup.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(
    () => (key: TextKey, params?: TextParams) =>
      TEXT_DICTIONARY[key]?.[lang]?.replace(/{(\w+)}/g, (match, p1) => params?.[p1] ?? match) ??
      TEXT_DICTIONARY[key]?.en?.replace(/{(\w+)}/g, (match, p1) => params?.[p1] ?? match) ??
      String(key).replace(/{(\w+)}/g, (match, p1) => params?.[p1] ?? match),
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
