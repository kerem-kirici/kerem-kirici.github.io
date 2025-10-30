import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kerem Kirici – Portfolio",
  description: "Projects, experiments, and notes by Kerem Kirici.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="mx-auto max-w-5xl px-6">
          <header className="flex items-center justify-between py-8">
            <a href="/" className="text-lg font-semibold tracking-tight">
              Kerem Kirici
            </a>
            <nav className="flex items-center gap-5 text-sm">
              <a href="/" className="opacity-80 hover:opacity-100">Home</a>
              <a href="/projects" className="opacity-80 hover:opacity-100">Projects</a>
              <a href="/about" className="opacity-80 hover:opacity-100">About</a>
              <a href="/contact" className="opacity-80 hover:opacity-100">Contact</a>
              <a
                href="https://github.com/kerem-kirici"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100"
              >
                GitHub
              </a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="py-10 text-sm opacity-70">
            © {new Date().getFullYear()} Kerem Kirici. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
