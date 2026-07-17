# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Dev server at localhost:3000 (uses --webpack, not Turbopack)
npm run build         # Static export build (also --webpack); output goes to out/
npm run lint          # ESLint (Prettier violations are lint errors via eslint-plugin-prettier)
npm run lint:fix      # ESLint with autofix
npm run format        # Prettier write
```

There is no test suite.

Use the Context7 MCP server for library/API documentation and setup steps without being explicitly asked (from `.cursor/rules/`).

## Architecture

Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4, deployed as a **fully static export to GitHub Pages** (`output: 'export'` and `images.unoptimized` in `next.config.ts`; `.github/workflows/deploy.yml` builds and deploys on push to `main`). No server-side features (API routes, server actions, image optimizer) can be used. The working branch is `dev`; `main` is the deploy branch.

Path alias: `@/*` → `src/*`.

### Client-side i18n (drives most design decisions)

All user-facing text lives in `src/data/Texts.ts` as a flat `TEXT_DICTIONARY` of `{ en, tr }` entries with `{param}` interpolation. `src/components/i18n/LanguageProvider.tsx` (wrapping everything in `src/app/layout.tsx`) exposes `useLanguage()` → `{ lang, setLang, t }`. Language is session-only React state — because the site is a static export, translation happens at render time in the client, which is why nearly every page and component is `'use client'`. Never hardcode display strings in components; add a dictionary key instead.

### Project data flow

`src/data/projects.ts` is the single source of truth for projects. `projects(lang)` assembles `Project` objects by combining:
- a hardcoded slug list + dates in the function,
- localized strings looked up from `TEXT_DICTIONARY` by key convention (`projects.<slug>.title`, `.description`, `.long_explanation`, `.tags` — tags are a comma-separated string per language),
- a gallery map of images under `public/projects/<slug>/`, each tagged `'portrait' | 'landscape'`.

There is **no dynamic `[slug]` route**. Each project has its own hardcoded page at `src/app/projects/<slug>/page.tsx` — a small client component that calls `getProjectBySlug('<slug>', lang)` and renders the shared `src/components/projects/ProjectDetailLayout.tsx`. Adding a project means: dictionary entries, slug/date entries and gallery in `projects.ts`, images in `public/projects/<slug>/`, and a new page file copying the existing pattern.

### Components

`src/components/` is organized into barrel-exported groups: `layout/` (PageLayout, Section, Aside, Header, Footer, Grid, Actions), `texts/` (Heading, Text, Prose, Tag, DateText, ImageComponent, etc.), `links/` (ButtonLink, TextLink, IconButtonLink), `toggles/`. Pages compose these primitives rather than writing raw markup.

Animation: `ProjectCard.tsx` and `texts/ImageComponent.tsx` use `motion/react` (import from `'motion/react'`, not `framer-motion`) for pointer-tilt spring effects; `StickyScrollStack.tsx` uses Lenis for the scroll-driven card stack on the home page. GSAP is a dependency but currently unused in `src/`.

Theming is light/dark via `prefers-color-scheme` CSS variables in `src/app/globals.css` (Tailwind v4 `@theme inline`) — there is no manual theme toggle.
