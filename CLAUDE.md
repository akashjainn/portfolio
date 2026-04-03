# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run type-check   # TypeScript check without emit
npm run test         # Jest unit tests
npm run test:watch   # Jest in watch mode
npm run test:a11y    # Playwright accessibility tests (requires running dev server)
npm run test:e2e     # Playwright e2e tests (requires running dev server)
npm run analyze      # Bundle analyzer (sets ANALYZE=true)
```

Playwright tests require the dev server to be running first (`npm run dev`).

## Architecture

**Framework**: Next.js 14 App Router with TypeScript. MDX content is compiled server-side via `next-mdx-remote/rsc`.

### Content System (`content/` + `src/lib/mdx.ts`)
Projects and notes live as `.mdx` files in `content/projects/` and `content/notes/`. Frontmatter is parsed with `gray-matter` and compiled with `compileMDX`. The `ProjectFrontmatter` and `NoteFrontmatter` interfaces in `src/lib/mdx.ts` define the required fields. Projects use `status: 'published' | 'draft'` and `category` for filtering — playground projects are excluded from the main listing by filtering `category !== 'playground'`.

**MDX custom components** available in project files: `VideoWithCaptions`, `Callout`, `Tldr`, `Diagram`, `MetricGrid`, `ModelViewer`.

### App Routes (`src/app/`)
- `/` — homepage with featured projects (Server Component, async)
- `/projects` — full project listing
- `/projects/[slug]` — individual case study
- `/notes/[slug]` — individual note
- `/about`, `/contact`, `/resume`, `/playground` — static pages
- `/(marketing)/` — route group for marketing pages

### Key Providers (wrapping all pages in `layout.tsx`)
- `RoleProvider` — visitor role context (`recruiter | developer | manager | general`); currently defaults to `general` with personalization disabled
- `EffectsPrefsProvider` — controls `reduceEffects` and `pauseMotion` booleans, persisted to `localStorage`

### Component Conventions
- `src/components/site/` — layout-level components (Navigation, project cards, case study layout)
- `src/components/ui/` — reusable primitives (Radix UI + shadcn/ui pattern)
- `src/components/three/` — React Three Fiber scene components (`HeroCanvas`, `ModelViewer`, `SceneGate`, `SkillCloud`)
- `src/components/mdx/` — MDX-specific components (`Tldr`, `Diagram`, `MetricGrid`)
- `src/components/analytics/` and `src/components/seo/` — web vitals and structured data

Three.js components use `SceneGate` to guard rendering — check it before modifying 3D scenes.

### Styling
Tailwind CSS with CSS custom properties for theming (HSL variables defined in `src/styles/design-system.css`). The `cn()` utility from `src/lib/utils.ts` combines `clsx` + `tailwind-merge`. Custom font: SF Pro loaded via CSS when available, Inter as fallback.

### Performance Constraints
`next.config.mjs` enforces webpack bundle size warnings at 250KB (asset) / 500KB (entrypoint). Console logs are stripped in production. Images must use Next.js `<Image>` with AVIF/WebP formats.

The CSP in `next.config.mjs` explicitly allows specific external domains for frames, media, and connect — update it when adding new third-party integrations.
