'use client';

import { TextKey } from '@/data/Texts';
import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';

type AsideProps = {
  heading: React.ReactNode;
  information: React.ReactNode;
  details?: React.ReactNode;
  /** Extra classes for the details block — e.g. `lg:hidden` when a page shows
   *  the same content as its own row at desktop widths. */
  detailsClassName?: string;
};

export default function Aside({ heading, information, details, detailsClassName }: AsideProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { t } = useLanguage();

  const [isXSmallScreen, setIsXSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsXSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <aside className="material-raised order-2 h-max space-y-6 rounded-3xl border border-black/10 p-6 shadow-lg dark:border-white/10 lg:order-none lg:float-right lg:ml-12 lg:w-[22rem] lg:max-w-full">
      {heading}
      <div className="border-t border-black/10 pt-4 dark:border-white/10">{information}</div>
      {details && (
        <div
          className={`border-t border-black/10 pt-4 dark:border-white/10 ${detailsClassName ?? ''}`}
        >
          {isXSmallScreen ? (
            <>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex w-full items-center justify-between text-left text-sm font-medium text-zinc-700 touch-manipulation transition duration-150 ease-out hover:text-zinc-900 active:opacity-60 dark:text-zinc-300 dark:hover:text-zinc-100"
                aria-expanded={isExpanded}
              >
                <span>{t(`aside.${isExpanded ? 'less_details' : 'more_details'}` as TextKey)}</span>
                <span
                  className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                  aria-hidden
                >
                  ↓
                </span>
              </button>
              {isExpanded && <div className="mt-4">{details}</div>}
            </>
          ) : (
            <div>{details}</div>
          )}
        </div>
      )}
    </aside>
  );
}
