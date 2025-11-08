import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This is the crucial line for GitHub Pages
  output: 'export',

  // This is required because GitHub Pages can't run
  // the server-side Next.js image optimizer.
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
