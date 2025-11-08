'use client';

import { useEffect, useState } from 'react';

type AsideProps = {
  heading: React.ReactNode;
  information: React.ReactNode;
  details?: React.ReactNode;
};

export default function Aside({ heading, information, details }: AsideProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
    <aside className="order-2 h-max space-y-6 rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/70 lg:order-none lg:float-right lg:ml-12 lg:w-[22rem] lg:max-w-full">
      {heading}
      <div className="border-t border-black/10 pt-4 dark:border-white/10">{information}</div>
      {details && (
        <div className="border-t border-black/10 pt-4 dark:border-white/10">
          {isXSmallScreen ? (
            <>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex w-full items-center justify-between text-left text-sm font-medium text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                aria-expanded={isExpanded}
              >
                <span>More details</span>
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
