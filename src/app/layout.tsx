import LanguageProvider from '@/components/i18n/LanguageProvider';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kerem Kırıcı – Portfolio',
  description: 'Projects, experiments, and notes by Kerem Kırıcı.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
          <div className="mx-auto max-w-5xl px-8 md:px-6">
            <main>{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </LanguageProvider>
  );
}
