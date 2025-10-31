'use client';

import Head from 'next/head';
import React from 'react';

type PageLayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <>
      <Head>
        {title ? <title>{title}</title> : null}
        {description ? <meta name="description" content={description} /> : null}
      </Head>
      {children}
    </>
  );
}
