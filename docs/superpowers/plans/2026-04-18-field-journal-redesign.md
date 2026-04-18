# Field Journal Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a Field Journal — a print-inspired publication centered on prose entries, replacing the current tech-dashboard aesthetic with a typographic system built around Source Serif 4 and JetBrains Mono.

**Architecture:** New routes `/journal` and `/journal/[slug]` are built alongside existing routes; redirects replace `/projects/*` once the journal routes are stable. All content moves to `content/journal/*.mdx` with an extended `JournalFrontmatter` interface. Pressed-specimen artifacts load as dynamic imports into server-rendered frames, keeping JS budgets tight.

**Tech Stack:** Next.js 14 App Router, TypeScript, next/font/google (Source Serif 4 + JetBrains Mono), CSS custom properties, D3 (dynamic, PropSage only), React Three Fiber (dynamic, vr-puzzle-game only). No Framer Motion, no AnimatedBlobs, no SkillCloud, no CommandPalette, no RoleProvider.

---

## File Map

### New files
- `src/styles/journal.css` — all journal design tokens (replaces design-system.css for new pages)
- `src/lib/journal.ts` — JournalFrontmatter interface + data-reading functions
- `content/journal/statefarm-chat.mdx`
- `content/journal/adventuretime-gba.mdx`
- `content/journal/propsage.mdx`
- `content/journal/vr-puzzle-game.mdx`
- `content/journal/starlink-redesign.mdx`
- `src/app/journal/page.tsx` — entry index
- `src/app/journal/[slug]/page.tsx` — entry detail
- `src/components/journal/WoodcutIcon.tsx` — inline SVG switcher, 10 marks
- `src/components/journal/SiteNav.tsx` — wordmark + 4 links
- `src/components/journal/SiteFooter.tsx` — static footer
- `src/components/journal/EntryRow.tsx` — single entry row for index + homepage
- `src/components/journal/EntryList.tsx` — wraps EntryRow list
- `src/components/journal/FilterChips.tsx` — client component, chip state
- `src/components/journal/NowStrip.tsx` — "Now" inset box
- `src/components/journal/EntryHead.tsx` — kicker + h1 + dl.kv
- `src/components/journal/Figure.tsx` — .figure frame + .cap bar
- `src/components/journal/PressedSpecimen.tsx` — server shell; dynamic() child
- `src/components/journal/PullQuote.tsx` — border-left terra block quote
- `src/components/journal/SectionHeading.tsx` — .num span + h2
- `src/components/journal/UptimeRibbon.tsx` — inline SVG artifact
- `src/components/journal/GBAViewport.tsx` — SVG shell + video iframe
- `src/components/journal/CSSHorizon.tsx` — pure CSS animation artifact
- `src/components/journal/EvidenceGraph.tsx` — D3 client component
- `src/components/journal/ARTriumModel.tsx` — R3F client component
- `src/app/(journal)/layout.tsx` — journal-scoped layout (journal.css, nav, footer)

### Modified files
- `src/app/layout.tsx` — remove RoleProvider, CommandPalette; add SourceSerif4 + JetBrainsMono fonts
- `src/app/page.tsx` — full rewrite to journal homepage
- `src/app/about/page.tsx` — rewrite to journal about layout
- `src/lib/mdx.ts` — add MDX components for journal (PressedSpecimen, Figure, etc.)
- `next.config.mjs` — add 301 redirects for /projects → /journal

---

## Task 1: Design System — CSS Tokens + Fonts

**Files:**
- Create: `src/styles/journal.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/styles/journal.css` with all tokens**

```css
/* =========================================================
   FIELD JOURNAL — Design System
   ========================================================= */

/* --- Fonts (loaded via next/font, CSS vars injected) --- */
/* --font-serif: set by layout.tsx via next/font/google     */
/* --font-mono:  set by layout.tsx via next/font/google     */

/* --- Spacing scale ---------------------------------------- */
:root {
  --s-1: 4px;
  --s-2: 8px;
  --s-3: 12px;
  --s-4: 16px;
  --s-5: 24px;
  --s-6: 32px;
  --s-7: 48px;
  --s-8: 72px;
  --s-9: 112px;
}

/* --- Color tokens — light mode (default) ----------------- */
:root {
  --cream:      #F4ECDC;
  --cream-2:    #EADFC9;
  --rule:       #D7C8AC;
  --ink:        #2B2118;
  --ink-2:      #4A3C2E;
  --ink-3:      #6B5A47;
  --terra:      #B95C2F;
  --terra-deep: #8F401E;
  --moss:       #56643A;
  --ochre:      #AE7A18;
  --focus:      #B95C2F;
  --danger:     #8B2E1A;
  --success:    #3F4A28;
}

/* --- Color tokens — dark mode ---------------------------- */
@media (prefers-color-scheme: dark) {
  :root {
    --cream:      #1C1811;
    --cream-2:    #24201A;
    --rule:       #3A3226;
    --ink:        #EEE3CE;
    --ink-2:      #C9BCA3;
    --ink-3:      #9A8D74;
    --terra:      #D2784C;
    --terra-deep: #C4633A;
    --moss:       #8CA05E;
    --ochre:      #D6A845;
    --focus:      #D2784C;
    --danger:     #D2694C;
    --success:    #9FB36E;
  }
}

/* dark-mode class override (for manual toggle if needed) */
.dark {
  --cream:      #1C1811;
  --cream-2:    #24201A;
  --rule:       #3A3226;
  --ink:        #EEE3CE;
  --ink-2:      #C9BCA3;
  --ink-3:      #9A8D74;
  --terra:      #D2784C;
  --terra-deep: #C4633A;
  --moss:       #8CA05E;
  --ochre:      #D6A845;
  --focus:      #D2784C;
  --danger:     #D2694C;
  --success:    #9FB36E;
}

/* --- Prose measure --------------------------------------- */
:root {
  --measure:        68ch;
  --measure-narrow: 52ch;
}

/* --- Motion tokens --------------------------------------- */
:root {
  --ease-journal: cubic-bezier(.2, .6, .2, 1);
  --t-fast:  200ms;
  --t-mid:   250ms;
  --t-slow:  300ms;
}

/* --- Reduce motion: zero everything --------------------- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
    animation-iteration-count: 1 !important;
  }
}

/* --- Base reset for journal pages ----------------------- */
.journal-root {
  background-color: var(--cream);
  color: var(--ink);
  font-family: var(--font-serif), Georgia, serif;
  -webkit-font-smoothing: antialiased;
}

/* --- Focus ring ----------------------------------------- */
.journal-root *:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}

/* --- Skip link ------------------------------------------ */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--s-4);
  padding: var(--s-2) var(--s-4);
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-mono), monospace;
  font-size: 14px;
  border: 1px solid var(--rule);
  z-index: 100;
}
.skip-link:focus {
  top: var(--s-4);
}

/* --- Typography scale ------------------------------------ */
.journal-root h1.masthead {
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 300;
  font-style: italic;
  font-variation-settings: 'opsz' 60;
  line-height: 1.05;
  color: var(--ink);
}

.journal-root h1.masthead em {
  font-style: normal;
  color: var(--terra);
}

.journal-root h1.entry-title {
  font-size: clamp(36px, 4.5vw, 54px);
  font-weight: 400;
  font-variation-settings: 'opsz' 48;
  line-height: 1.1;
}

.journal-root h1.entry-title em {
  font-style: normal;
  color: var(--terra);
}

.journal-root h2.phase {
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 400;
  font-variation-settings: 'opsz' 36;
}

.journal-root h3.entry-heading {
  font-size: clamp(22px, 2.5vw, 30px);
  font-weight: 500;
  font-style: italic;
  font-variation-settings: 'opsz' 24;
}

.journal-root h4 {
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 500;
  font-variation-settings: 'opsz' 18;
}

.journal-root p {
  font-size: 18px;
  font-weight: 400;
  font-variation-settings: 'opsz' 14;
  line-height: 1.65;
  max-width: var(--measure);
}

.journal-root .small, .journal-root small {
  font-size: 16px;
  font-variation-settings: 'opsz' 12;
  line-height: 1.5;
}

/* Mono elements */
.journal-root .mono, .journal-root code, .journal-root kbd {
  font-family: var(--font-mono), monospace;
  font-size: 14px;
}

/* --- Golden-ratio ruled margin -------------------------- */
.ruled {
  position: relative;
}

@media (min-width: 900px) {
  .ruled::before {
    content: '';
    position: absolute;
    top: 0;
    left: 38.2%;
    width: 1px;
    height: 100%;
    border-left: 1px dashed var(--rule);
    opacity: 0.7;
    pointer-events: none;
  }
}

/* --- Two-column grid helpers ---------------------------- */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-7);
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

/* --- Entry row ------------------------------------------ */
.entry-row {
  display: grid;
  grid-template-columns: 130px 1fr 200px;
  gap: var(--s-5);
  padding: var(--s-5) 0;
  border-bottom: 1px solid var(--rule);
  align-items: start;
  transition: background var(--t-mid) var(--ease-journal),
              padding-left var(--t-mid) var(--ease-journal);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.entry-row:hover {
  background: var(--cream-2);
  padding-left: var(--s-4);
}

@media (max-width: 700px) {
  .entry-row {
    grid-template-columns: 1fr;
    gap: var(--s-2);
  }
}

/* --- Figure / pressed-specimen box ---------------------- */
.figure {
  background: var(--cream-2);
  border: 1px solid var(--rule);
  overflow: hidden;
}

.figure .cap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--s-2) var(--s-4);
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  color: var(--ink-3);
  border-top: 1px solid var(--rule);
}

/* --- Pull quote ----------------------------------------- */
.pull-quote {
  border-left: 2px solid var(--terra);
  padding-left: var(--s-5);
  margin: var(--s-7) 0;
  font-size: clamp(20px, 2.5vw, 28px);
  font-style: italic;
  font-variation-settings: 'opsz' 24;
  max-width: var(--measure-narrow);
  color: var(--ink-2);
}

/* --- kv definition list --------------------------------- */
dl.kv {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--s-2) var(--s-5);
  font-family: var(--font-mono), monospace;
  font-size: 13px;
}

dl.kv dt { color: var(--ink-3); }
dl.kv dd { color: var(--ink-2); margin: 0; }

/* --- Section heading with number ------------------------ */
h2.numbered .num {
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  color: var(--ink-3);
  margin-right: var(--s-3);
  vertical-align: middle;
}

/* --- Filter chips --------------------------------------- */
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: var(--s-2) var(--s-4);
  border: 1px solid var(--rule);
  background: transparent;
  color: var(--ink-2);
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  cursor: pointer;
  transition: background var(--t-fast) var(--ease-journal),
              color var(--t-fast) var(--ease-journal),
              border-color var(--t-fast) var(--ease-journal);
}

.chip:hover {
  background: var(--cream-2);
  border-color: var(--ink-3);
  color: var(--ink);
}

.chip[aria-pressed="true"] {
  background: var(--terra);
  border-color: var(--terra);
  color: var(--cream);
}

/* --- Inset box (NowStrip) ------------------------------- */
.inset-box {
  background: var(--cream-2);
  border: 1px solid var(--rule);
  padding: var(--s-6);
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: var(--s-5);
}

@media (max-width: 600px) {
  .inset-box {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Update `src/app/layout.tsx` to load fonts and remove old providers**

Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import { Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://akashjain.dev'),
  title: {
    default: 'Akash Jain — Field Journal',
    template: '%s | Akash Jain',
  },
  description:
    'A field journal of software work by Akash Jain — case studies, specimens, and personal study.',
  authors: [{ name: 'Akash Jain', url: 'https://akashjain.dev' }],
  creator: 'Akash Jain',
  openGraph: {
    title: 'Akash Jain — Field Journal',
    description: 'Case studies, specimens, and personal study.',
    url: 'https://akashjain.dev',
    siteName: 'Akash Jain',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Jain — Field Journal',
    description: 'Case studies, specimens, and personal study.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sourceSerif4.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify fonts resolve at build time**

```bash
npm run type-check
```
Expected: no errors related to font imports.

- [ ] **Step 4: Commit**

```bash
git add src/styles/journal.css src/app/layout.tsx
git commit -m "feat: add journal design system tokens and update root font loading"
```

---

## Task 2: Journal Content Data Layer

**Files:**
- Create: `src/lib/journal.ts`
- Test: (type-check only — no unit tests needed for file-system readers in Next.js)

- [ ] **Step 1: Create `src/lib/journal.ts`**

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

export interface JournalArtifact {
  type: 'model' | 'graph' | 'ribbon' | 'viewport' | 'horizon' | 'none'
  src?: string
  caption: string
  aspectRatio?: string
}

export interface JournalFrontmatter {
  slug: string
  title: string
  summary: string
  tags: string[]
  status: 'published' | 'draft'
  entryNo: number
  kind: 'case' | 'specimen' | 'study' | 'playground'
  publishedAt: string
  updatedAt?: string
  artifact: JournalArtifact
}

export interface JournalEntry {
  frontmatter: JournalFrontmatter
  content: string
  compiledSource: React.ReactElement
  readingTime: number
}

const journalDir = path.join(process.cwd(), 'content/journal')

function readingTime(text: string): number {
  return Math.ceil(text.trim().split(/\s+/).length / 225)
}

export function getJournalSlugs(): string[] {
  if (!fs.existsSync(journalDir)) return []
  return fs
    .readdirSync(journalDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export async function getJournalEntry(
  slug: string,
  components: Record<string, React.ComponentType<any>> = {}
): Promise<JournalEntry | null> {
  const fullPath = path.join(journalDir, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  const { content: compiledSource } = await compileMDX({
    source: content,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  })

  return {
    frontmatter: data as JournalFrontmatter,
    content,
    compiledSource,
    readingTime: readingTime(content),
  }
}

export async function getAllJournalEntries({
  status = 'published',
  kind,
  limit,
}: {
  status?: 'published' | 'draft' | 'all'
  kind?: JournalFrontmatter['kind']
  limit?: number
} = {}): Promise<JournalEntry[]> {
  const slugs = getJournalSlugs()
  const entries: JournalEntry[] = []

  for (const slug of slugs) {
    const entry = await getJournalEntry(slug)
    if (!entry) continue
    if (status !== 'all' && entry.frontmatter.status !== status) continue
    if (kind !== undefined && entry.frontmatter.kind !== kind) continue
    entries.push(entry)
  }

  entries.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  )

  return limit ? entries.slice(0, limit) : entries
}
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```
Expected: no errors in `src/lib/journal.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/journal.ts
git commit -m "feat: add JournalFrontmatter type and journal data-reading functions"
```

---

## Task 3: Migrate MDX Content to `content/journal/`

**Files:**
- Create: `content/journal/statefarm-chat.mdx`
- Create: `content/journal/adventuretime-gba.mdx`
- Create: `content/journal/propsage.mdx`
- Create: `content/journal/vr-puzzle-game.mdx`
- Create: `content/journal/starlink-redesign.mdx`

Each file keeps the existing prose body from `content/projects/` but gets updated frontmatter.

- [ ] **Step 1: Create `content/journal/statefarm-chat.mdx`**

```mdx
---
slug: statefarm-chat
title: "The Chat Widget That Had to Work at <em>Two Million</em>"
summary: "Rebuilt State Farm's customer-facing chat widget serving 2M+ monthly users with 99.98% uptime, leveraging Angular, AWS Lambda, and fault-tolerant WebSocket infrastructure."
tags: ["Angular", "AWS Lambda", "WebSockets", "Amazon Connect"]
status: published
entryNo: 2
kind: case
publishedAt: "2024-06-15"
updatedAt: "2024-12-20"
artifact:
  type: ribbon
  caption: "FIG. 2 — 30-day uptime ribbon, production window"
  aspectRatio: "8/1"
---

{/* Paste the full prose body from content/projects/statefarm-chat.mdx here, starting after the frontmatter block */}
```

> **Note to implementor:** Copy the prose body (everything after the frontmatter `---` block) from `content/projects/statefarm-chat.mdx` verbatim into this file. Do not edit the prose — only the frontmatter changes.

- [ ] **Step 2: Create `content/journal/adventuretime-gba.mdx`**

```mdx
---
slug: adventuretime-gba
title: "Porting Adventure Time to <em>Hardware That Predates WiFi</em>"
summary: "A faithful GBA demake of Adventure Time built with C and GBA hardware — custom sprite engine, collision system, and original soundtrack."
tags: ["C", "GBA", "Game Development", "Assembly"]
status: published
entryNo: 3
kind: specimen
publishedAt: "2024-03-01"
artifact:
  type: viewport
  caption: "FIG. 3 — GBA viewport, playable build"
  aspectRatio: "3/2"
---

{/* Copy prose body from content/projects/adventuretime-gba.mdx */}
```

- [ ] **Step 3: Create `content/journal/propsage.mdx`**

```mdx
---
slug: propsage
title: "PropSage: When <em>Real Estate Data Lies</em>"
summary: "A full-stack real estate intelligence platform with ML-powered valuations, interactive evidence graphs, and ensemble model explainability."
tags: ["Next.js", "Python", "FastAPI", "PostgreSQL", "D3"]
status: published
entryNo: 4
kind: case
publishedAt: "2024-09-01"
artifact:
  type: graph
  caption: "FIG. 4 — Evidence graph, comparable-selection model"
  aspectRatio: "4/3"
---

{/* Copy prose body from content/projects/propsage.mdx */}
```

- [ ] **Step 4: Create `content/journal/vr-puzzle-game.mdx`**

```mdx
---
slug: vr-puzzle-game
title: "Building <em>Presence</em> in 60ms"
summary: "A VR puzzle game with procedurally generated vine-tree environments, custom physics, and a full asset pipeline from Blender to WebXR."
tags: ["WebXR", "Three.js", "Blender", "React Three Fiber"]
status: published
entryNo: 5
kind: specimen
publishedAt: "2024-01-15"
artifact:
  type: model
  src: "/models/vine-trees.fbx"
  caption: "FIG. 5 — Vine-tree environment, drag to inspect"
  aspectRatio: "4/3"
---

{/* Copy prose body from content/projects/vr-puzzle-game.mdx */}
```

- [ ] **Step 5: Create `content/journal/starlink-redesign.mdx`**

This entry has no existing MDX prose — author it from scratch.

```mdx
---
slug: starlink-redesign
title: "What the Starlink UI <em>Chose Not to Say</em>"
summary: "A personal redesign study of the Starlink app interface — examining information hierarchy, signal-strength communication, and the satellite pass animation."
tags: ["UI Design", "CSS", "Next.js", "Design Systems"]
status: published
entryNo: 7
kind: study
publishedAt: "2024-11-01"
artifact:
  type: horizon
  caption: "FIG. 7 — CSS satellite-pass horizon animation"
  aspectRatio: "16/5"
---

## Why the Starlink App Feels Incomplete

The Starlink app has one job: tell you whether the sky is clear enough to get a connection. It mostly fails at this, not because the engineering is bad, but because the information hierarchy treats signal strength as a secondary concern rather than the primary one.

## 01 — What the App Currently Shows

The home screen surfaces:
- A large dish illustration that animates when connected
- A connection status label ("CONNECTED" / "NO SIGNAL")
- A numeric download speed in Mbps

Signal obstruction — the most actionable metric for a user with a misaligned dish — is buried two taps deep under "Advanced."

## 02 — The Redesign Hypothesis

**Move the obstruction map to the home screen.** A user who installs Starlink on a cabin in the Appalachians needs to know if the pine tree at bearing 220° is blocking 40% of their sky coverage. That information should cost zero taps.

## 03 — The Horizon Artifact

The artifact below is the CSS animation I built to prototype the satellite-pass visualization — a simplified arc tracing the satellite's apparent path across the cleared sky window. No JavaScript. The timing function approximates the actual orbital speed curve of a LEO satellite at ~550km altitude.

<PressedSpecimen />

## 04 — What I Changed

1. **Obstruction map → first screen.** The sky clearance donut moved to the hero of the home card.
2. **Speed as context, not headline.** Mbps moved to a secondary data row beneath the sky graphic.
3. **Horizon arc on signal loss.** When the signal drops, the animation shows the last-known satellite arc fading — communicating "it will be back" rather than "something broke."

## 05 — What This Taught Me

The hardest part of interface design for infrastructure products is resisting the temptation to celebrate the engineering. Starlink is remarkable — but the user doesn't want to celebrate it. They want to watch a movie.

Information hierarchy should be organized by *user urgency*, not engineering pride.
```

- [ ] **Step 6: Verify all five files exist and frontmatter parses**

```bash
node -e "
const matter = require('gray-matter');
const fs = require('fs');
const files = [
  'content/journal/statefarm-chat.mdx',
  'content/journal/adventuretime-gba.mdx',
  'content/journal/propsage.mdx',
  'content/journal/vr-puzzle-game.mdx',
  'content/journal/starlink-redesign.mdx',
];
files.forEach(f => {
  const { data } = matter(fs.readFileSync(f, 'utf8'));
  console.log(f, '→', data.entryNo, data.kind, data.artifact.type);
});
"
```
Expected output (one line per file): `entryNo`, `kind`, and `artifact.type` each match the frontmatter above.

- [ ] **Step 7: Commit**

```bash
git add content/journal/
git commit -m "feat: add content/journal/ with 5 entries and JournalFrontmatter"
```

---

## Task 4: WoodcutIcon SVG Component

**Files:**
- Create: `src/components/journal/WoodcutIcon.tsx`

- [ ] **Step 1: Create `src/components/journal/WoodcutIcon.tsx`**

All marks are on a 20×20 grid, single stroke ~1.5px, `currentColor`.

```tsx
type IconName =
  | 'external-link'
  | 'back-arrow'
  | 'case-study'
  | 'specimen'
  | 'personal-study'
  | 'playground'
  | 'filter-x'
  | 'inspect-hand'
  | 'cv-download'
  | 'journal'

interface WoodcutIconProps {
  name: IconName
  size?: number
  className?: string
  'aria-hidden'?: boolean
}

const paths: Record<IconName, React.ReactElement> = {
  'external-link': (
    <>
      <path d="M8 4H4v12h12v-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4h4v4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="4" x2="9" y2="11" strokeLinecap="round" />
    </>
  ),
  'back-arrow': (
    <>
      <line x1="16" y1="10" x2="4" y2="10" strokeLinecap="round" />
      <polyline points="8,6 4,10 8,14" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'case-study': (
    <>
      <rect x="4" y="3" width="12" height="15" rx="1" />
      <line x1="7" y1="7" x2="13" y2="7" strokeLinecap="round" />
      <line x1="7" y1="10" x2="13" y2="10" strokeLinecap="round" />
      <line x1="7" y1="13" x2="10" y2="13" strokeLinecap="round" />
    </>
  ),
  specimen: (
    <>
      <circle cx="10" cy="10" r="5" />
      <line x1="10" y1="3" x2="10" y2="5" strokeLinecap="round" />
      <line x1="10" y1="15" x2="10" y2="17" strokeLinecap="round" />
      <line x1="3" y1="10" x2="5" y2="10" strokeLinecap="round" />
      <line x1="15" y1="10" x2="17" y2="10" strokeLinecap="round" />
      <circle cx="10" cy="10" r="2" />
    </>
  ),
  'personal-study': (
    <>
      <circle cx="10" cy="10" r="7" />
      <line x1="10" y1="3" x2="10" y2="17" strokeLinecap="round" />
      <line x1="3" y1="10" x2="17" y2="10" strokeLinecap="round" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </>
  ),
  playground: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="0.5" />
      <rect x="11" y="3" width="6" height="6" rx="0.5" />
      <rect x="3" y="11" width="6" height="6" rx="0.5" />
      <rect x="11" y="11" width="6" height="6" rx="0.5" />
    </>
  ),
  'filter-x': (
    <>
      <line x1="4" y1="6" x2="16" y2="6" strokeLinecap="round" />
      <line x1="6" y1="10" x2="14" y2="10" strokeLinecap="round" />
      <line x1="8" y1="14" x2="12" y2="14" strokeLinecap="round" />
      <line x1="13" y1="13" x2="17" y2="17" strokeLinecap="round" />
      <line x1="17" y1="13" x2="13" y2="17" strokeLinecap="round" />
    </>
  ),
  'inspect-hand': (
    <>
      <path d="M8 12V6a1.5 1.5 0 013 0v4" strokeLinecap="round" />
      <path d="M11 10a1.5 1.5 0 013 0v1" strokeLinecap="round" />
      <path d="M14 11a1.5 1.5 0 013 0v3l-1 3H9l-3-4a1.5 1.5 0 012-2l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'cv-download': (
    <>
      <path d="M4 16v2h12v-2" strokeLinecap="round" />
      <line x1="10" y1="3" x2="10" y2="13" strokeLinecap="round" />
      <polyline points="6,9 10,13 14,9" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  journal: (
    <>
      <rect x="4" y="2" width="12" height="17" rx="1" />
      <line x1="7" y1="6" x2="13" y2="6" strokeLinecap="round" />
      <line x1="7" y1="9" x2="13" y2="9" strokeLinecap="round" />
      <line x1="7" y1="12" x2="10" y2="12" strokeLinecap="round" />
      <line x1="4" y1="2" x2="4" y2="19" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
}

export function WoodcutIcon({
  name,
  size = 20,
  className,
  'aria-hidden': ariaHidden = true,
}: WoodcutIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden={ariaHidden}
    >
      {paths[name]}
    </svg>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/journal/WoodcutIcon.tsx
git commit -m "feat: add WoodcutIcon SVG component with 10 marks"
```

---

## Task 5: SiteNav + SiteFooter

**Files:**
- Create: `src/components/journal/SiteNav.tsx`
- Create: `src/components/journal/SiteFooter.tsx`

- [ ] **Step 1: Create `src/components/journal/SiteNav.tsx`**

```tsx
import Link from 'next/link'
import { headers } from 'next/headers'

const NAV_LINKS = [
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
  { href: '/Akash-Jain-CV.pdf', label: 'CV', external: true },
  { href: 'mailto:akashjain1311@gmail.com', label: 'Contact', external: true },
] as const

export function SiteNav() {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') ?? ''

  return (
    <header
      style={{
        padding: 'var(--s-5) var(--s-7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <Link
        href="/"
        aria-label="Akash Jain — home"
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--ink)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
        }}
      >
        AJ
      </Link>

      <nav aria-label="Site navigation">
        <ul
          role="list"
          style={{
            display: 'flex',
            gap: 'var(--s-6)',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            flexWrap: 'wrap',
          }}
        >
          {NAV_LINKS.map(({ href, label, external }) => {
            const isCurrent = !external && pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-current={isCurrent ? 'page' : undefined}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isCurrent ? 'var(--terra)' : 'var(--ink-2)',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Create `src/components/journal/SiteFooter.tsx`**

```tsx
export function SiteFooter() {
  return (
    <footer
      style={{
        padding: 'var(--s-7)',
        borderTop: '1px solid var(--rule)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--s-4)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
        }}
      >
        © {new Date().getFullYear()} Akash Jain
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
        }}
      >
        Atlanta, GA · Vol. I
      </span>
    </footer>
  )
}
```

- [ ] **Step 3: Create `src/app/(journal)/layout.tsx`** (journal-scoped layout)

```tsx
import '../../styles/journal.css'
import { SiteNav } from '@/components/journal/SiteNav'
import { SiteFooter } from '@/components/journal/SiteFooter'

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="journal-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteNav />
      <main id="main-content" style={{ flex: 1 }}>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 4: Type-check**

```bash
npm run type-check
```
Expected: no errors.

- [ ] **Step 5: Start dev server and check nav renders at `/journal`**

```bash
npm run dev
```
Visit `http://localhost:3000/journal` (will 404 until Task 6 but the layout should render the nav shell).

- [ ] **Step 6: Commit**

```bash
git add src/components/journal/SiteNav.tsx src/components/journal/SiteFooter.tsx src/app/\(journal\)/layout.tsx
git commit -m "feat: add SiteNav, SiteFooter, and journal route-group layout"
```

---

## Task 6: Homepage Rebuild (`/`)

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)
- Create: `src/components/journal/NowStrip.tsx`
- Create: `src/components/journal/EntryRow.tsx`

- [ ] **Step 1: Create `src/components/journal/NowStrip.tsx`**

```tsx
interface NowStripProps {
  date: string
  children: React.ReactNode
}

export function NowStrip({ date, children }: NowStripProps) {
  return (
    <div className="inset-box" style={{ margin: 'var(--s-7) 0' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          paddingTop: '2px',
        }}
      >
        {date}
      </div>
      <div style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/journal/EntryRow.tsx`**

```tsx
import Link from 'next/link'
import { WoodcutIcon } from './WoodcutIcon'
import type { JournalFrontmatter } from '@/lib/journal'

type KindIconName = 'case-study' | 'specimen' | 'personal-study' | 'playground'

const KIND_ICONS: Record<JournalFrontmatter['kind'], KindIconName> = {
  case: 'case-study',
  specimen: 'specimen',
  study: 'personal-study',
  playground: 'playground',
}

const KIND_LABELS: Record<JournalFrontmatter['kind'], string> = {
  case: 'Case study',
  specimen: 'Specimen',
  study: 'Personal study',
  playground: 'Playground',
}

interface EntryRowProps {
  frontmatter: JournalFrontmatter
}

export function EntryRow({ frontmatter }: EntryRowProps) {
  const { slug, entryNo, kind, title, summary, publishedAt } = frontmatter
  const year = new Date(publishedAt).getFullYear()

  return (
    <Link href={`/journal/${slug}`} className="entry-row" style={{ display: 'grid' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          paddingTop: 4,
        }}
      >
        <span style={{ display: 'block' }}>No. {String(entryNo).padStart(2, '0')}</span>
        <span style={{ display: 'block', marginTop: 4 }}>{year}</span>
      </div>

      <div>
        <h3
          className="entry-heading"
          style={{ margin: '0 0 var(--s-2)' }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="small"
          style={{ color: 'var(--ink-2)', margin: 0, maxWidth: '54ch' }}
        >
          {summary}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--s-2)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          justifyContent: 'flex-end',
        }}
      >
        <WoodcutIcon name={KIND_ICONS[kind]} size={16} />
        <span>{KIND_LABELS[kind]}</span>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: Rewrite `src/app/page.tsx`**

The homepage lives outside the `(journal)` route group so it needs its own journal.css import and the `journal-root` class.

```tsx
import Link from 'next/link'
import '../styles/journal.css'
import { SiteNav } from '@/components/journal/SiteNav'
import { SiteFooter } from '@/components/journal/SiteFooter'
import { NowStrip } from '@/components/journal/NowStrip'
import { EntryRow } from '@/components/journal/EntryRow'
import { getAllJournalEntries } from '@/lib/journal'

export default async function Home() {
  const recentEntries = await getAllJournalEntries({ limit: 4 })

  return (
    <div className="journal-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteNav />
      <main id="main-content" style={{ flex: 1, padding: '0 var(--s-7)' }}>
        {/* Hero */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 240px',
            gap: 'var(--s-7)',
            padding: 'var(--s-8) 0 var(--s-7)',
            borderBottom: '1px solid var(--ink)',
            alignItems: 'end',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 12,
                color: 'var(--ink-3)',
                margin: '0 0 var(--s-4)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Atlanta, GA · Spring 2026 · Vol. I
            </p>
            <h1 className="masthead">
              A field journal of{' '}
              <em>software work</em>
            </h1>
          </div>
          <aside
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 13,
              color: 'var(--ink-2)',
              paddingBottom: 8,
            }}
          >
            <p style={{ margin: '0 0 var(--s-2)', color: 'var(--ink-3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Currently
            </p>
            <p style={{ margin: 0 }}>SpaceX / Starlink</p>
            <p style={{ margin: 'var(--s-1) 0 0', color: 'var(--ink-3)' }}>Reliability engineering</p>
          </aside>
        </section>

        {/* Now strip */}
        <NowStrip date="April 2026">
          Working on reliability tooling for satellite uplink scheduling. Writing about the gap between what latency graphs show and what users actually feel.
        </NowStrip>

        {/* Recent entries */}
        <section aria-labelledby="recent-entries-heading" style={{ marginBottom: 'var(--s-8)' }}>
          <h2
            id="recent-entries-heading"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              fontWeight: 400,
              color: 'var(--ink-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: '0 0 var(--s-4)',
            }}
          >
            Recent entries
          </h2>

          {recentEntries.map((entry) => (
            <EntryRow key={entry.frontmatter.slug} frontmatter={entry.frontmatter} />
          ))}

          <div style={{ marginTop: 'var(--s-6)' }}>
            <Link
              href="/journal"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 13,
                color: 'var(--terra-deep)',
                textDecoration: 'none',
              }}
            >
              See all entries →
            </Link>
          </div>
        </section>

        {/* Colophon */}
        <section
          aria-label="Colophon"
          className="grid-2 ruled"
          style={{ padding: 'var(--s-7) 0', borderTop: '1px solid var(--rule)' }}
        >
          <div
            style={{
              position: 'sticky',
              top: 'var(--s-7)',
              alignSelf: 'start',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 12,
              color: 'var(--ink-3)',
            }}
          >
            <p style={{ margin: '0 0 var(--s-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Colophon</p>
            <p style={{ margin: 0 }}>Source Serif 4 · JetBrains Mono</p>
            <p style={{ margin: 'var(--s-2) 0 0' }}>Next.js 14 · Deployed on Vercel</p>
          </div>
          <div>
            <p>
              I&apos;m a software engineer at Georgia Tech finishing a CS degree, spending most of my time thinking about systems that have to work when they can&apos;t afford not to — real-time messaging, satellite uplinks, distributed coordination.
            </p>
            <p>
              This journal is where I write down what I actually learned — including the three versions that failed before the one that shipped.
            </p>
            <p>
              If you want to see the work without reading about it, start with{' '}
              <Link href="/journal/statefarm-chat" style={{ color: 'var(--terra-deep)' }}>
                the State Farm entry
              </Link>
              {' '}or{' '}
              <Link href="/journal/propsage" style={{ color: 'var(--terra-deep)' }}>
                PropSage
              </Link>
              .
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 12,
                color: 'var(--ink-3)',
                marginTop: 'var(--s-6)',
              }}
            >
              — Akash Jain
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
```

- [ ] **Step 4: Run dev server and verify homepage renders**

```bash
npm run dev
```
Visit `http://localhost:3000`. Verify: journal.css background (`#F4ECDC` in light mode), masthead with terra italic, NowStrip inset box, 4 entry rows, colophon with ruled margin.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/journal/NowStrip.tsx src/components/journal/EntryRow.tsx
git commit -m "feat: rebuild homepage as field journal with hero, now strip, recent entries, and colophon"
```

---

## Task 7: Journal Index Page (`/journal`)

**Files:**
- Create: `src/app/(journal)/journal/page.tsx`
- Create: `src/components/journal/FilterChips.tsx`
- Create: `src/components/journal/EntryList.tsx`

- [ ] **Step 1: Create `src/components/journal/FilterChips.tsx`**

This is a minimal client component — it only holds chip state. The entry list visibility is toggled via CSS `data-kind` attributes, not React re-render, keeping the JS footprint tiny.

```tsx
'use client'

import { useState, useRef } from 'react'
import { WoodcutIcon } from './WoodcutIcon'
import type { JournalFrontmatter } from '@/lib/journal'

type Kind = JournalFrontmatter['kind'] | 'all'

const CHIPS: { kind: Kind; label: string; icon: React.ComponentProps<typeof WoodcutIcon>['name'] }[] = [
  { kind: 'all',        label: 'All',            icon: 'journal' },
  { kind: 'case',       label: 'Case study',     icon: 'case-study' },
  { kind: 'specimen',   label: 'Specimen',       icon: 'specimen' },
  { kind: 'study',      label: 'Personal study', icon: 'personal-study' },
  { kind: 'playground', label: 'Playground',     icon: 'playground' },
]

interface FilterChipsProps {
  totalCount: number
  countRef?: React.RefObject<HTMLSpanElement>
  counts: Record<JournalFrontmatter['kind'], number>
}

export function FilterChips({ totalCount, counts }: FilterChipsProps) {
  const [active, setActive] = useState<Kind>('all')
  const counterRef = useRef<HTMLSpanElement>(null)

  function handleFilter(kind: Kind) {
    setActive(kind)

    // Toggle entry rows via CSS data attribute
    const rows = document.querySelectorAll<HTMLElement>('[data-entry-kind]')
    rows.forEach((row) => {
      if (kind === 'all' || row.dataset.entryKind === kind) {
        row.style.display = ''
      } else {
        row.style.display = 'none'
      }
    })

    // Update counter
    if (counterRef.current) {
      const count = kind === 'all' ? totalCount : (counts[kind as JournalFrontmatter['kind']] ?? 0)
      counterRef.current.textContent = String(count)
    }
  }

  return (
    <>
      <span
        ref={counterRef}
        id="entry-count"
        aria-live="polite"
        aria-atomic="true"
        style={{ display: 'none' }}
      >
        {totalCount}
      </span>
      <div className="chip-row" role="group" aria-label="Filter entries by kind">
        {CHIPS.map(({ kind, label, icon }) => (
          <button
            key={kind}
            className="chip"
            aria-pressed={active === kind}
            onClick={() => handleFilter(kind)}
          >
            <WoodcutIcon name={icon} size={14} />
            {label}
          </button>
        ))}
      </div>
    </>
  )
}
```

- [ ] **Step 2: Create `src/components/journal/EntryList.tsx`**

```tsx
import { EntryRow } from './EntryRow'
import type { JournalFrontmatter } from '@/lib/journal'

interface EntryListProps {
  entries: { frontmatter: JournalFrontmatter }[]
}

export function EntryList({ entries }: EntryListProps) {
  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.frontmatter.slug} data-entry-kind={entry.frontmatter.kind}>
          <EntryRow frontmatter={entry.frontmatter} />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Create `src/app/(journal)/journal/page.tsx`**

```tsx
import { getAllJournalEntries } from '@/lib/journal'
import { FilterChips } from '@/components/journal/FilterChips'
import { EntryList } from '@/components/journal/EntryList'
import type { JournalFrontmatter } from '@/lib/journal'

export const metadata = {
  title: 'Journal',
  description: 'Case studies, specimens, and personal study by Akash Jain.',
}

export default async function JournalPage({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  const entries = await getAllJournalEntries()

  // Server-side zero-JS fallback
  const filterParam = searchParams.filter as JournalFrontmatter['kind'] | undefined
  const filtered =
    filterParam && filterParam !== 'all'
      ? entries.filter((e) => e.frontmatter.kind === filterParam)
      : entries

  const counts: Record<JournalFrontmatter['kind'], number> = {
    case: 0,
    specimen: 0,
    study: 0,
    playground: 0,
  }
  entries.forEach((e) => {
    counts[e.frontmatter.kind] = (counts[e.frontmatter.kind] ?? 0) + 1
  })

  return (
    <div style={{ padding: 'var(--s-8) var(--s-7)' }}>
      {/* Kicker */}
      <p
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 var(--s-4)',
        }}
      >
        <span id="entry-count-display">{filtered.length}</span> entries
        {filterParam && filterParam !== 'all' && ` · filtered by ${filterParam}`}
      </p>

      <h1
        className="masthead"
        style={{ marginBottom: 'var(--s-7)', fontSize: 'clamp(36px, 4vw, 54px)' }}
      >
        Field Journal
      </h1>

      {/* Filter chips */}
      <div style={{ marginBottom: 'var(--s-6)' }}>
        <FilterChips totalCount={entries.length} counts={counts} />
      </div>

      {/* Entry list */}
      {filtered.length > 0 ? (
        <EntryList entries={filtered} />
      ) : (
        <p
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 22,
            fontStyle: 'italic',
            color: 'var(--ink-2)',
            marginTop: 'var(--s-8)',
          }}
        >
          No entries in this category yet.
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Add keyboard J/K navigation with a client component wrapper**

Create `src/components/journal/JKNav.tsx`:

```tsx
'use client'

import { useEffect } from 'react'

export function JKNav() {
  useEffect(() => {
    const rows = () =>
      Array.from(
        document.querySelectorAll<HTMLAnchorElement>('[data-entry-kind]:not([style*="display: none"]) a.entry-row')
      )

    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key !== 'j' && e.key !== 'k') return

      const list = rows()
      if (list.length === 0) return

      const focused = document.activeElement
      const currentIndex = list.indexOf(focused as HTMLAnchorElement)

      let next: HTMLAnchorElement | undefined
      if (e.key === 'j') {
        next = list[currentIndex + 1] ?? list[0]
      } else {
        next = list[currentIndex - 1] ?? list[list.length - 1]
      }
      next?.focus()
      e.preventDefault()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return null
}
```

Add `<JKNav />` inside `src/app/(journal)/journal/page.tsx`, right after the opening `<div>`:

```tsx
import { JKNav } from '@/components/journal/JKNav'
// inside the JSX:
<JKNav />
```

- [ ] **Step 5: Run dev server and verify `/journal`**

```bash
npm run dev
```
Visit `http://localhost:3000/journal`. Verify: all 5 entry rows render; clicking "Case study" chip hides non-case rows; J/K keys move focus between rows; "No entries in this category yet." appears for playground (0 entries); zero-JS fallback works at `?filter=case`.

- [ ] **Step 6: Commit**

```bash
git add src/app/\(journal\)/journal/ src/components/journal/FilterChips.tsx src/components/journal/EntryList.tsx src/components/journal/JKNav.tsx
git commit -m "feat: add journal index page with filter chips, entry list, and J/K keyboard nav"
```

---

## Task 8: Entry Detail Shell (`/journal/[slug]`)

**Files:**
- Create: `src/app/(journal)/journal/[slug]/page.tsx`
- Create: `src/components/journal/EntryHead.tsx`
- Create: `src/components/journal/Figure.tsx`
- Create: `src/components/journal/PressedSpecimen.tsx`
- Create: `src/components/journal/PullQuote.tsx`
- Create: `src/components/journal/SectionHeading.tsx`
- Modify: `src/lib/journal.ts` — pass MDX components

- [ ] **Step 1: Create `src/components/journal/Figure.tsx`**

```tsx
interface FigureProps {
  children: React.ReactNode
  caption: string
  figLabel?: string
  source?: string
  aspectRatio?: string
}

export function Figure({ children, caption, figLabel = 'FIG.', source, aspectRatio }: FigureProps) {
  return (
    <figure
      className="figure"
      style={{
        margin: 'var(--s-7) 0',
        aspectRatio: aspectRatio ?? undefined,
        position: 'relative',
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
      <figcaption className="cap">
        <span>{figLabel} — {caption}</span>
        {source && <span style={{ color: 'var(--ink-3)' }}>{source}</span>}
      </figcaption>
    </figure>
  )
}
```

- [ ] **Step 2: Create `src/components/journal/PressedSpecimen.tsx`**

The server shell renders the `.figure` frame immediately. The artifact child is dynamically imported per entry.

```tsx
import dynamic from 'next/dynamic'
import { Figure } from './Figure'
import type { JournalArtifact } from '@/lib/journal'

const ARTIFACT_COMPONENTS: Record<string, React.ComponentType<{ artifact: JournalArtifact }>> = {
  ribbon:   dynamic(() => import('./UptimeRibbon').then((m) => ({ default: m.UptimeRibbon })), { ssr: false }),
  viewport: dynamic(() => import('./GBAViewport').then((m) => ({ default: m.GBAViewport })), { ssr: false }),
  graph:    dynamic(() => import('./EvidenceGraph').then((m) => ({ default: m.EvidenceGraph })), { ssr: false }),
  model:    dynamic(() => import('./ARTriumModel').then((m) => ({ default: m.ARTriumModel })), { ssr: false }),
  horizon:  dynamic(() => import('./CSSHorizon').then((m) => ({ default: m.CSSHorizon })), { ssr: true }),
}

interface PressedSpecimenProps {
  artifact: JournalArtifact
}

export function PressedSpecimen({ artifact }: PressedSpecimenProps) {
  if (artifact.type === 'none') return null

  const ArtifactComponent = ARTIFACT_COMPONENTS[artifact.type]

  return (
    <Figure
      caption={artifact.caption}
      aspectRatio={artifact.aspectRatio}
    >
      {ArtifactComponent ? (
        <ArtifactComponent artifact={artifact} />
      ) : null}
    </Figure>
  )
}
```

- [ ] **Step 3: Create `src/components/journal/PullQuote.tsx`**

```tsx
interface PullQuoteProps {
  children: React.ReactNode
}

export function PullQuote({ children }: PullQuoteProps) {
  return (
    <blockquote className="pull-quote">
      {children}
    </blockquote>
  )
}
```

- [ ] **Step 4: Create `src/components/journal/SectionHeading.tsx`**

```tsx
interface SectionHeadingProps {
  num: string
  children: React.ReactNode
}

export function SectionHeading({ num, children }: SectionHeadingProps) {
  return (
    <h2 className="phase numbered" style={{ margin: 'var(--s-7) 0 var(--s-4)' }}>
      <span className="num">{num}</span>
      {children}
    </h2>
  )
}
```

- [ ] **Step 5: Create `src/components/journal/EntryHead.tsx`**

```tsx
import type { JournalFrontmatter } from '@/lib/journal'

interface EntryHeadProps {
  frontmatter: JournalFrontmatter
  readingTime: number
}

const KIND_LABELS: Record<JournalFrontmatter['kind'], string> = {
  case: 'Case study',
  specimen: 'Specimen',
  study: 'Personal study',
  playground: 'Playground',
}

export function EntryHead({ frontmatter, readingTime }: EntryHeadProps) {
  const { entryNo, kind, title, tags, publishedAt, updatedAt } = frontmatter
  const published = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <header
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        gap: 'var(--s-7)',
        padding: 'var(--s-8) 0 var(--s-7)',
        borderBottom: '1px solid var(--rule)',
        alignItems: 'end',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            color: 'var(--ink-3)',
            margin: '0 0 var(--s-4)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {KIND_LABELS[kind]} · No. {String(entryNo).padStart(2, '0')}
        </p>
        <h1
          className="entry-title"
          dangerouslySetInnerHTML={{ __html: title }}
          style={{ margin: 0 }}
        />
      </div>

      <dl className="kv" style={{ alignSelf: 'end' }}>
        <dt>Published</dt>
        <dd>{published}</dd>
        {updatedAt && (
          <>
            <dt>Updated</dt>
            <dd>
              {new Date(updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </dd>
          </>
        )}
        <dt>Reading time</dt>
        <dd>{readingTime} min</dd>
        {tags.slice(0, 4).map((tag) => (
          <dd
            key={tag}
            style={{
              gridColumn: '1 / -1',
              color: 'var(--ink-3)',
              fontSize: 11,
              paddingTop: 0,
            }}
          >
            #{tag}
          </dd>
        ))}
      </dl>
    </header>
  )
}
```

- [ ] **Step 6: Update `src/lib/journal.ts` to accept and pass MDX components**

The `getJournalEntry` function already accepts a `components` param. Update the default call signature to ensure TypeScript is satisfied — no code change needed. Just verify `compileMDX` receives the components map.

- [ ] **Step 7: Create `src/app/(journal)/journal/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import { getJournalEntry, getJournalSlugs } from '@/lib/journal'
import { EntryHead } from '@/components/journal/EntryHead'
import { PressedSpecimen } from '@/components/journal/PressedSpecimen'
import { PullQuote } from '@/components/journal/PullQuote'
import { Figure } from '@/components/journal/Figure'
import { SectionHeading } from '@/components/journal/SectionHeading'

export async function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = await getJournalEntry(params.slug)
  if (!entry) return { title: 'Entry Not Found' }
  return {
    title: entry.frontmatter.title.replace(/<[^>]+>/g, ''),
    description: entry.frontmatter.summary,
  }
}

export default async function JournalEntryPage({ params }: { params: { slug: string } }) {
  const entry = await getJournalEntry(params.slug, {
    PressedSpecimen: (props: object) => {
      // PressedSpecimen receives artifact from frontmatter injected below
      return null
    },
    PullQuote,
    Figure,
    SectionHeading,
  })

  if (!entry) notFound()

  const { frontmatter, compiledSource, readingTime } = entry

  const entryComponents = {
    PressedSpecimen: () => <PressedSpecimen artifact={frontmatter.artifact} />,
    PullQuote,
    Figure,
    SectionHeading,
  }

  // Re-compile with real components
  const { getJournalEntry: _get } = await import('@/lib/journal')
  const withComponents = await _get(params.slug, entryComponents)
  if (!withComponents) notFound()

  return (
    <article style={{ padding: '0 var(--s-7)' }}>
      <EntryHead frontmatter={frontmatter} readingTime={readingTime} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '38.2% 1fr',
          gap: 'var(--s-7)',
          padding: 'var(--s-7) 0',
        }}
      >
        {/* Left gutter — TOC */}
        <aside
          style={{
            position: 'sticky',
            top: 'var(--s-7)',
            alignSelf: 'start',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            color: 'var(--ink-3)',
          }}
        >
          <p style={{ margin: '0 0 var(--s-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            At a glance
          </p>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{frontmatter.summary}</p>
        </aside>

        {/* Right — prose */}
        <div
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 18,
            lineHeight: 1.65,
            color: 'var(--ink)',
          }}
        >
          {withComponents.compiledSource}
        </div>
      </div>
    </article>
  )
}
```

> **Note to implementor:** The double-compile pattern above is intentional but creates a performance cost in development. In production with static generation it compiles once per slug. A cleaner approach is to call `getJournalEntry` only once with the final components map. Refactor step 7 to call `getJournalEntry` once:

```tsx
export default async function JournalEntryPage({ params }: { params: { slug: string } }) {
  const { PressedSpecimen } = await import('@/components/journal/PressedSpecimen')
  const { PullQuote } = await import('@/components/journal/PullQuote')
  const { Figure } = await import('@/components/journal/Figure')
  const { SectionHeading } = await import('@/components/journal/SectionHeading')

  // We need the frontmatter first to get artifact type for PressedSpecimen
  const meta = await getJournalEntry(params.slug)
  if (!meta) notFound()

  const entry = await getJournalEntry(params.slug, {
    PressedSpecimen: () => <PressedSpecimen artifact={meta.frontmatter.artifact} />,
    PullQuote,
    Figure,
    SectionHeading,
  })
  if (!entry) notFound()

  const { frontmatter, compiledSource, readingTime } = entry

  return (
    <article style={{ padding: '0 var(--s-7)' }}>
      <EntryHead frontmatter={frontmatter} readingTime={readingTime} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '38.2% 1fr',
          gap: 'var(--s-7)',
          padding: 'var(--s-7) 0',
        }}
      >
        <aside
          style={{
            position: 'sticky',
            top: 'var(--s-7)',
            alignSelf: 'start',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            color: 'var(--ink-3)',
          }}
        >
          <p style={{ margin: '0 0 var(--s-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            At a glance
          </p>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{frontmatter.summary}</p>
        </aside>
        <div
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 18,
            lineHeight: 1.65,
            color: 'var(--ink)',
          }}
        >
          {compiledSource}
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 8: Run dev server and verify an entry detail page**

```bash
npm run dev
```
Visit `http://localhost:3000/journal/starlink-redesign`. Verify: EntryHead with kicker, h1 with terra em, definition list on right; two-column body layout; 38.2% gutter with "At a glance".

- [ ] **Step 9: Commit**

```bash
git add src/app/\(journal\)/journal/\[slug\]/ src/components/journal/EntryHead.tsx src/components/journal/Figure.tsx src/components/journal/PressedSpecimen.tsx src/components/journal/PullQuote.tsx src/components/journal/SectionHeading.tsx
git commit -m "feat: add journal entry detail page with EntryHead, PressedSpecimen, PullQuote, and SectionHeading"
```

---

## Task 9: UptimeRibbon Artifact (`statefarm-chat`)

**Files:**
- Create: `src/components/journal/UptimeRibbon.tsx`

The ribbon is an inline SVG bar chart showing 30-day uptime windows. Static data, no JS dependency at runtime.

- [ ] **Step 1: Create `src/components/journal/UptimeRibbon.tsx`**

```tsx
'use client'

import type { JournalArtifact } from '@/lib/journal'

// Simulated 30-day uptime data: 1 = up, 0 = down, 0.5 = degraded
const UPTIME_DAYS: number[] = [
  1,1,1,1,1,1,1,1,1,1,
  1,1,1,0.5,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,1,
]

interface UptimeRibbonProps {
  artifact: JournalArtifact
}

export function UptimeRibbon({ artifact: _ }: UptimeRibbonProps) {
  const width = 800
  const height = 60
  const barW = Math.floor(width / UPTIME_DAYS.length) - 2
  const barH = 40

  return (
    <div style={{ padding: 'var(--s-5)', background: 'var(--cream-2)', height: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label="30-day uptime ribbon"
        role="img"
      >
        {UPTIME_DAYS.map((status, i) => {
          const x = i * (barW + 2)
          const color =
            status === 1
              ? 'var(--success)'
              : status === 0.5
              ? 'var(--ochre)'
              : 'var(--danger)'
          const label =
            status === 1 ? 'Up' : status === 0.5 ? 'Degraded' : 'Down'

          return (
            <rect
              key={i}
              x={x}
              y={(height - barH) / 2}
              width={barW}
              height={barH}
              fill={color}
              rx={2}
              aria-label={`Day ${i + 1}: ${label}`}
            />
          )
        })}
      </svg>
      <p
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 11,
          color: 'var(--ink-3)',
          margin: 'var(--s-2) 0 0',
          display: 'flex',
          gap: 'var(--s-5)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: 'var(--success)', display: 'inline-block', borderRadius: 2 }} />
          Operational
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: 'var(--ochre)', display: 'inline-block', borderRadius: 2 }} />
          Degraded
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: 'var(--danger)', display: 'inline-block', borderRadius: 2 }} />
          Outage
        </span>
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Add `<PressedSpecimen />` to `content/journal/statefarm-chat.mdx`**

Find the "Live Widget" section heading in the prose body and insert `<PressedSpecimen />` immediately after it:

```mdx
## Live Widget

<PressedSpecimen />
```

- [ ] **Step 3: Run dev server and verify**

Visit `http://localhost:3000/journal/statefarm-chat`. Verify: SVG ribbon renders inside the `.figure` frame; caption bar shows "FIG. 2 — 30-day uptime ribbon, production window".

- [ ] **Step 4: Commit**

```bash
git add src/components/journal/UptimeRibbon.tsx content/journal/statefarm-chat.mdx
git commit -m "feat: add UptimeRibbon artifact for statefarm-chat entry"
```

---

## Task 10: GBAViewport Artifact (`adventuretime-gba`)

**Files:**
- Create: `src/components/journal/GBAViewport.tsx`

- [ ] **Step 1: Create `src/components/journal/GBAViewport.tsx`**

The GBA viewport is an SVG shell (the handheld form factor) with a screen area that shows a video embed. Pure HTML — no canvas, no JS.

```tsx
import type { JournalArtifact } from '@/lib/journal'

interface GBAViewportProps {
  artifact: JournalArtifact
}

export function GBAViewport({ artifact: _ }: GBAViewportProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 'var(--s-5)',
        background: 'var(--cream-2)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 320,
          background: '#B0A89A',
          borderRadius: '16px 16px 24px 24px',
          padding: '24px 20px 48px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}
        aria-label="Game Boy Advance viewport"
      >
        {/* Screen bezel */}
        <div
          style={{
            background: '#2A2A2A',
            borderRadius: 8,
            padding: 8,
            marginBottom: 16,
          }}
        >
          {/* Screen */}
          <div
            style={{
              aspectRatio: '3/2',
              background: '#000',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              aria-label="Adventure Time GBA gameplay footage"
            >
              <source src="/artifacts/adventuretime-gameplay.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* D-pad placeholder */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 8px',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              background: '#888',
              borderRadius: 4,
              position: 'relative',
            }}
            aria-hidden="true"
          />
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 9,
              color: '#888',
              textAlign: 'center',
              letterSpacing: '0.1em',
            }}
          >
            GAME BOY<br />ADVANCE
          </div>
          <div style={{ display: 'flex', gap: 8 }} aria-hidden="true">
            {['B', 'A'].map((btn) => (
              <div
                key={btn}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: btn === 'A' ? '#8B2E1A' : '#2B4A8A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9,
                  color: 'white',
                  fontFamily: 'var(--font-mono), monospace',
                }}
              >
                {btn}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Add a gameplay video placeholder**

The video file will need to be added to `public/artifacts/adventuretime-gameplay.mp4`. For now, add a placeholder note to the `adventuretime-gba.mdx` prose and ensure the `<PressedSpecimen />` tag is present.

In `content/journal/adventuretime-gba.mdx`, add `<PressedSpecimen />` at the appropriate location in the prose body (after the first section heading or wherever the build screenshot would logically go).

- [ ] **Step 3: Run dev server and verify**

Visit `http://localhost:3000/journal/adventuretime-gba`. Verify: GBA shell renders; if video is absent, black screen is shown (graceful). Caption bar shows "FIG. 3 — GBA viewport, playable build".

- [ ] **Step 4: Commit**

```bash
git add src/components/journal/GBAViewport.tsx content/journal/adventuretime-gba.mdx
git commit -m "feat: add GBAViewport artifact for adventuretime-gba entry"
```

---

## Task 11: CSSHorizon Artifact (`starlink-redesign`)

**Files:**
- Create: `src/components/journal/CSSHorizon.tsx`

The horizon is a pure CSS animation — no canvas, no JS. SSR-safe.

- [ ] **Step 1: Create `src/components/journal/CSSHorizon.tsx`**

```tsx
import type { JournalArtifact } from '@/lib/journal'

interface CSSHorizonProps {
  artifact: JournalArtifact
}

export function CSSHorizon({ artifact: _ }: CSSHorizonProps) {
  return (
    <div
      style={{
        background: 'var(--cream)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        padding: 'var(--s-6)',
      }}
    >
      <style>{`
        @keyframes satellite-arc {
          0%   { offset-distance: 0%;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }

        @keyframes satellite-fade {
          0%,100% { opacity: 0.15; }
          50%     { opacity: 0.6; }
        }

        .horizon-arc {
          offset-path: path('M 40 120 Q 200 20 360 120');
          animation: satellite-arc 4s cubic-bezier(.25,.6,.6,1) infinite;
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--terra);
        }

        .horizon-arc:nth-child(2) { animation-delay: -1.3s; }
        .horizon-arc:nth-child(3) { animation-delay: -2.6s; }

        .horizon-trail {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
        }
      `}</style>

      <svg
        viewBox="0 0 400 160"
        style={{ width: '100%', maxWidth: 600, display: 'block' }}
        aria-label="CSS satellite-pass horizon animation"
        role="img"
      >
        {/* Earth horizon */}
        <path
          d="M 0 120 Q 200 160 400 120"
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1"
        />
        {/* Sky clearance window */}
        <path
          d="M 60 120 Q 200 40 340 120"
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Coverage arc label */}
        <text
          x="200"
          y="30"
          textAnchor="middle"
          fontFamily="var(--font-mono), monospace"
          fontSize="10"
          fill="var(--ink-3)"
        >
          sky window · 47°
        </text>
        {/* Obstruction zone label */}
        <text
          x="24"
          y="138"
          fontFamily="var(--font-mono), monospace"
          fontSize="9"
          fill="var(--ink-3)"
        >
          bearing 220°
        </text>
        {/* Bearing tick */}
        <line
          x1="60" y1="110"
          x2="60" y2="130"
          stroke="var(--danger)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Animated satellites */}
      <div className="horizon-trail" aria-hidden="true">
        <div className="horizon-arc" />
        <div className="horizon-arc" />
        <div className="horizon-arc" />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify `<PressedSpecimen />` is placed in the starlink MDX**

The `starlink-redesign.mdx` body already contains `<PressedSpecimen />` from Task 3 Step 5. Confirm it's present.

- [ ] **Step 3: Run dev server and verify**

Visit `http://localhost:3000/journal/starlink-redesign`. Verify: three dots animate along the arc path; dots fade in and out; no JS in the network panel for this component; caption shows "FIG. 7 — CSS satellite-pass horizon animation".

- [ ] **Step 4: Check reduced motion**

In browser DevTools, emulate `prefers-reduced-motion: reduce`. Verify animation stops.

- [ ] **Step 5: Commit**

```bash
git add src/components/journal/CSSHorizon.tsx content/journal/starlink-redesign.mdx
git commit -m "feat: add CSSHorizon artifact for starlink-redesign entry"
```

---

## Task 12: EvidenceGraph Artifact (`propsage`)

**Files:**
- Create: `src/components/journal/EvidenceGraph.tsx`

D3 client component. Dynamic import keeps it out of the main bundle.

- [ ] **Step 1: Install D3 if not present**

```bash
npm list d3 2>/dev/null || npm install d3
npm install --save-dev @types/d3
```

- [ ] **Step 2: Create `src/components/journal/EvidenceGraph.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import type { JournalArtifact } from '@/lib/journal'

interface Node {
  id: string
  label: string
  type: 'subject' | 'comparable' | 'factor'
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface Link {
  source: string | Node
  target: string | Node
  strength: number
}

const NODES: Node[] = [
  { id: 'subject',   label: '123 Elm St',      type: 'subject' },
  { id: 'comp1',     label: '117 Oak Ave',      type: 'comparable' },
  { id: 'comp2',     label: '130 Maple Dr',     type: 'comparable' },
  { id: 'comp3',     label: '119 Pine Rd',      type: 'comparable' },
  { id: 'sqft',      label: 'Sq Footage',       type: 'factor' },
  { id: 'beds',      label: 'Bedrooms',         type: 'factor' },
  { id: 'dist',      label: 'Distance',         type: 'factor' },
  { id: 'school',    label: 'School Rating',    type: 'factor' },
]

const LINKS: Link[] = [
  { source: 'subject', target: 'comp1',  strength: 0.9 },
  { source: 'subject', target: 'comp2',  strength: 0.7 },
  { source: 'subject', target: 'comp3',  strength: 0.5 },
  { source: 'comp1',   target: 'sqft',   strength: 0.8 },
  { source: 'comp1',   target: 'beds',   strength: 0.6 },
  { source: 'comp2',   target: 'sqft',   strength: 0.7 },
  { source: 'comp3',   target: 'dist',   strength: 0.9 },
  { source: 'comp3',   target: 'school', strength: 0.4 },
]

interface EvidenceGraphProps {
  artifact: JournalArtifact
}

export function EvidenceGraph({ artifact: _ }: EvidenceGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let destroyed = false

    async function render() {
      const d3 = await import('d3')
      if (destroyed || !svgRef.current) return

      const svg = d3.select(svgRef.current)
      const width = svgRef.current.clientWidth || 560
      const height = svgRef.current.clientHeight || 340

      svg.selectAll('*').remove()

      const simulation = d3
        .forceSimulation<Node>(NODES)
        .force('link', d3.forceLink<Node, Link>(LINKS).id((d) => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide(32))

      const link = svg
        .append('g')
        .selectAll('line')
        .data(LINKS)
        .enter()
        .append('line')
        .attr('stroke', 'var(--rule)')
        .attr('stroke-width', (d) => d.strength * 2)
        .attr('stroke-opacity', 0.6)

      const nodeGroup = svg
        .append('g')
        .selectAll<SVGGElement, Node>('g')
        .data(NODES)
        .enter()
        .append('g')
        .attr('cursor', 'pointer')

      nodeGroup
        .append('circle')
        .attr('r', (d) => (d.type === 'subject' ? 14 : d.type === 'comparable' ? 10 : 7))
        .attr('fill', (d) =>
          d.type === 'subject'
            ? 'var(--terra)'
            : d.type === 'comparable'
            ? 'var(--ink-2)'
            : 'var(--cream-2)'
        )
        .attr('stroke', 'var(--rule)')
        .attr('stroke-width', 1)

      nodeGroup
        .append('text')
        .text((d) => d.label)
        .attr('dy', (d) => (d.type === 'subject' ? 28 : 22))
        .attr('text-anchor', 'middle')
        .attr('font-family', 'var(--font-mono), monospace')
        .attr('font-size', 10)
        .attr('fill', 'var(--ink-3)')

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => (d.source as Node).x ?? 0)
          .attr('y1', (d) => (d.source as Node).y ?? 0)
          .attr('x2', (d) => (d.target as Node).x ?? 0)
          .attr('y2', (d) => (d.target as Node).y ?? 0)

        nodeGroup.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`)
      })

      // Stop after settling
      setTimeout(() => simulation.stop(), 3000)
    }

    render()
    return () => { destroyed = true }
  }, [])

  return (
    <div style={{ height: '100%', background: 'var(--cream)', padding: 'var(--s-3)' }}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="PropSage evidence graph showing comparable property relationships"
        role="img"
      />
    </div>
  )
}
```

- [ ] **Step 3: Add `<PressedSpecimen />` to `content/journal/propsage.mdx`**

Insert `<PressedSpecimen />` at the appropriate location in the prose body (after the comparable-selection methodology section).

- [ ] **Step 4: Run dev server and verify**

Visit `http://localhost:3000/journal/propsage`. Verify: D3 graph renders with nodes and links; D3 is NOT in the main bundle (check Network tab — it should load lazily on scroll/render). Caption shows "FIG. 4 — Evidence graph, comparable-selection model".

- [ ] **Step 5: Commit**

```bash
git add src/components/journal/EvidenceGraph.tsx content/journal/propsage.mdx
git commit -m "feat: add D3 EvidenceGraph artifact for propsage entry"
```

---

## Task 13: ARTriumModel Artifact (`vr-puzzle-game`)

**Files:**
- Create: `src/components/journal/ARTriumModel.tsx`

React Three Fiber model viewer. Dynamic import with `ssr: false`.

- [ ] **Step 1: Verify R3F dependencies are installed**

```bash
npm list @react-three/fiber @react-three/drei three 2>/dev/null || echo "MISSING"
```
Expected: all three packages listed. If missing:
```bash
npm install @react-three/fiber @react-three/drei three
npm install --save-dev @types/three
```

- [ ] **Step 2: Create `src/components/journal/ARTriumModel.tsx`**

```tsx
'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import type { JournalArtifact } from '@/lib/journal'
import * as THREE from 'three'

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src)
  return <primitive object={scene} />
}

function DragHint() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'var(--s-4)',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 11,
        color: 'var(--ink-3)',
        pointerEvents: 'none',
        transition: 'opacity 300ms',
      }}
      aria-hidden="true"
    >
      Drag to inspect
    </div>
  )
}

interface ARTriumModelProps {
  artifact: JournalArtifact
}

export function ARTriumModel({ artifact }: ARTriumModelProps) {
  const [interacted, setInteracted] = useState(false)

  if (!artifact.src) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          background: 'var(--cream-2)',
        }}
      >
        3D model not available
      </div>
    )
  }

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        style={{ background: 'var(--cream)' }}
        onPointerDown={() => setInteracted(true)}
        aria-label="3D vine-tree environment model, drag to rotate"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Model src={artifact.src} />
          <Environment preset="forest" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          enablePan={false}
        />
      </Canvas>
      {!interacted && <DragHint />}
    </div>
  )
}
```

- [ ] **Step 3: Add `<PressedSpecimen />` to `content/journal/vr-puzzle-game.mdx`**

Insert `<PressedSpecimen />` at the appropriate location in the prose body (after the environment-generation section).

- [ ] **Step 4: Run dev server and verify**

Visit `http://localhost:3000/journal/vr-puzzle-game`. Verify: Canvas renders (black if model file is absent is fine — model file is a separate asset); "Drag to inspect" hint shows; after dragging, hint disappears. Verify R3F is NOT in the main bundle — it loads only on this route.

- [ ] **Step 5: Check bundle size**

```bash
npm run build 2>&1 | grep -E "(route|chunk|kB)"
```
Expected: `/journal/vr-puzzle-game` route bundle under 380kB.

- [ ] **Step 6: Commit**

```bash
git add src/components/journal/ARTriumModel.tsx content/journal/vr-puzzle-game.mdx
git commit -m "feat: add R3F ARTriumModel artifact for vr-puzzle-game entry"
```

---

## Task 14: About Page Rebuild

**Files:**
- Modify: `src/app/about/page.tsx` (full rewrite)

The about page is inside the `(journal)` route group, so it automatically gets the journal layout. Move it there.

- [ ] **Step 1: Move `src/app/about/` into the journal route group**

```bash
mkdir -p src/app/\(journal\)/about
```

Then create `src/app/(journal)/about/page.tsx`:

```tsx
export const metadata = {
  title: 'About',
  description: 'Akash Jain — software engineer, Georgia Tech CS, reliability engineering.',
}

export default function AboutPage() {
  return (
    <div style={{ padding: 'var(--s-8) var(--s-7)' }}>
      {/* Kicker */}
      <p
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 var(--s-4)',
        }}
      >
        Atlanta, GA · Spring 2026
      </p>

      {/* Masthead */}
      <h1 className="masthead" style={{ marginBottom: 'var(--s-8)' }}>
        On <em>making things work</em>
      </h1>

      {/* Two-column body */}
      <div
        className="grid-2 ruled"
        style={{ gap: 'var(--s-8)', alignItems: 'start' }}
      >
        {/* Left sticky sidebar */}
        <aside
          style={{
            position: 'sticky',
            top: 'var(--s-7)',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            color: 'var(--ink-3)',
          }}
        >
          <section style={{ marginBottom: 'var(--s-6)' }}>
            <p style={{ margin: '0 0 var(--s-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Typefaces
            </p>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              Source Serif 4<br />
              JetBrains Mono
            </p>
          </section>
          <section style={{ marginBottom: 'var(--s-6)' }}>
            <p style={{ margin: '0 0 var(--s-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Stack
            </p>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              Next.js 14<br />
              TypeScript<br />
              MDX<br />
              Vercel
            </p>
          </section>
          <section>
            <p style={{ margin: '0 0 var(--s-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Links
            </p>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              <a href="https://github.com/akashjainn" style={{ color: 'var(--terra-deep)' }}>
                GitHub
              </a>
              <br />
              <a href="https://linkedin.com/in/akashjainn" style={{ color: 'var(--terra-deep)' }}>
                LinkedIn
              </a>
              <br />
              <a href="/Akash-Jain-CV.pdf" style={{ color: 'var(--terra-deep)' }}>
                CV (PDF)
              </a>
            </p>
          </section>
        </aside>

        {/* Right prose */}
        <div
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 18,
            lineHeight: 1.65,
            color: 'var(--ink)',
          }}
        >
          <p>
            I&apos;m a software engineer finishing a computer science degree at Georgia Tech. Most of my work sits at the edge where systems have to be reliable — messaging infrastructure that can&apos;t drop packets, satellite uplinks that have to stay up when the weather turns bad, real estate models that have to explain why they got it wrong.
          </p>
          <p>
            This journal started as a way to write down what I actually learned — not the final architecture, but the three versions that failed before it. A case study that only shows the shipped design is an advertisement, not an explanation.
          </p>
          <p>
            I&apos;m interested in the gap between what metrics say and what users feel. An uptime ribbon that shows 99.98% doesn&apos;t tell you whether the two-second reconnect during a claim submission cost someone their session. Writing helps me think about that gap carefully.
          </p>
          <p>
            Outside engineering: I read about information design, watch competitive chess, and occasionally attempt to debug my sourdough starter.
          </p>
          <p>
            If you want to work together or just argue about data visualization — the contact link is in the nav.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 12,
              color: 'var(--ink-3)',
              marginTop: 'var(--s-8)',
            }}
          >
            — Akash Jain, April 2026
          </p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Remove the old `src/app/about/page.tsx`** (only if it was moved, not if it's the same file)

If you created the file at `src/app/(journal)/about/page.tsx`, delete the old one:

```bash
rm src/app/about/page.tsx
```

Then remove the empty directory if needed.

- [ ] **Step 3: Run dev server and verify**

Visit `http://localhost:3000/about`. Verify: journal.css styles applied; two-column layout with sticky left sidebar; golden-ratio ruled margin visible at ≥900px.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(journal\)/about/
git commit -m "feat: rebuild about page with journal two-column ruled layout"
```

---

## Task 15: Redirects, Cleanup, and Final Wiring

**Files:**
- Modify: `next.config.mjs` — add 301 redirects
- Modify: `src/app/sitemap.ts` — add journal routes

- [ ] **Step 1: Add 301 redirects to `next.config.mjs`**

Open `next.config.mjs` and add an `async redirects()` function inside the `nextConfig` object (after the existing `headers()` function):

```js
async redirects() {
  return [
    {
      source: '/projects',
      destination: '/journal',
      permanent: true,
    },
    {
      source: '/projects/:slug',
      destination: '/journal/:slug',
      permanent: true,
    },
    {
      source: '/contact',
      destination: '/about',
      permanent: true,
    },
    {
      source: '/resume',
      destination: '/Akash-Jain-CV.pdf',
      permanent: true,
    },
    {
      source: '/notes/:slug*',
      destination: '/journal',
      permanent: true,
    },
    {
      source: '/playground',
      destination: '/journal?filter=playground',
      permanent: true,
    },
  ]
},
```

- [ ] **Step 2: Verify redirects in dev server**

```bash
npm run dev
```

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/projects
```
Expected: `308 http://localhost:3000/journal` (Next.js dev returns 308 for permanent; prod returns 301).

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/projects/statefarm-chat
```
Expected: `308 http://localhost:3000/journal/statefarm-chat`.

- [ ] **Step 3: Update `src/app/sitemap.ts` to include journal routes**

```ts
import { MetadataRoute } from 'next'
import { getJournalSlugs } from '@/lib/journal'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getJournalSlugs()

  const journalEntries = slugs.map((slug) => ({
    url: `https://akashjain.dev/journal/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://akashjain.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://akashjain.dev/journal',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://akashjain.dev/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...journalEntries,
  ]
}
```

- [ ] **Step 4: Run full build to catch type errors and bundle warnings**

```bash
npm run build 2>&1 | tail -40
```
Expected: build completes; no TypeScript errors; no entrypoint exceeds 500kB.

- [ ] **Step 5: Run lint**

```bash
npm run lint
```
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add next.config.mjs src/app/sitemap.ts
git commit -m "feat: add 301 redirects from /projects to /journal and update sitemap"
```

---

## Task 16: Remove Deleted Components

This task removes the components the spec explicitly marks for deletion. Only delete after Tasks 1–15 are complete and the build passes.

**Components to remove:**
- `src/components/ui/animated-blobs.tsx`
- `src/components/ui/wave-divider.tsx`
- `src/components/DeferredSections.tsx`
- `src/components/ui/executive-summary.tsx`
- `src/components/three/SkillCloud.tsx`
- `src/components/three/HeroCanvas.tsx`
- `src/components/InteractiveHero.tsx`
- `src/components/command-palette/command-palette.tsx`
- `src/components/ui/command-palette.tsx`
- `src/context/EffectsPrefsContext.tsx`
- `src/components/ui/role-personalization.tsx`

- [ ] **Step 1: Confirm no remaining imports before deleting**

```bash
grep -r "animated-blobs\|wave-divider\|DeferredSections\|executive-summary\|SkillCloud\|HeroCanvas\|InteractiveHero\|command-palette\|EffectsPrefsContext\|role-personalization" src/app/ src/components/ --include="*.tsx" --include="*.ts" -l
```
Expected: only the files themselves, no other files importing them.

- [ ] **Step 2: Delete the files**

```bash
rm src/components/ui/animated-blobs.tsx
rm src/components/ui/wave-divider.tsx
rm src/components/DeferredSections.tsx
rm src/components/ui/executive-summary.tsx
rm src/components/three/SkillCloud.tsx
rm src/components/three/HeroCanvas.tsx
rm src/components/InteractiveHero.tsx
rm src/components/command-palette/command-palette.tsx
rm src/components/ui/command-palette.tsx
rm src/context/EffectsPrefsContext.tsx
rm src/components/ui/role-personalization.tsx
```

- [ ] **Step 3: Run type-check to confirm no broken imports**

```bash
npm run type-check
```
Expected: no errors.

- [ ] **Step 4: Run full build**

```bash
npm run build 2>&1 | tail -20
```
Expected: clean build.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove AnimatedBlobs, WaveDivider, DeferredSections, SkillCloud, HeroCanvas, InteractiveHero, CommandPalette, EffectsPrefs, RoleProvider"
```

---

## Spec Coverage Check

| Spec requirement | Task |
|---|---|
| Design system tokens (cream, rule, ink, terra, moss, ochre, focus) | Task 1 |
| Source Serif 4 + JetBrains Mono via next/font | Task 1 |
| Type scale (masthead 72px, entry 54px, etc.) | Task 1 |
| Spacing scale --s-1 through --s-9 | Task 1 |
| Motion tokens + prefers-reduced-motion | Task 1 |
| Golden-ratio ruled margin (38.2%) | Task 1 |
| Three signature house moves | Task 1 (CSS), Task 4 (icons), Tasks 6-8 (layouts) |
| JournalFrontmatter (entryNo, kind, artifact) | Task 2 |
| getAllJournalEntries with kind filter | Task 2 |
| content/journal/*.mdx with new frontmatter | Task 3 |
| Starlink entry authored from scratch | Task 3 |
| WoodcutIcon (10 marks, currentColor) | Task 4 |
| SiteNav (wordmark + 4 links, terra active, mono 12px) | Task 5 |
| SiteFooter | Task 5 |
| Journal route-group layout | Task 5 |
| Homepage narrative arc (hero, now strip, entries, colophon) | Task 6 |
| Homepage AnimatedBlobs removed | Task 6 |
| Journal index entry count kicker | Task 7 |
| FilterChips (5 chips, terra active, woodcut icons) | Task 7 |
| CSS display toggle on filter (not React re-render) | Task 7 |
| Zero-JS fallback (?filter= URL params) | Task 7 |
| Empty filter state prose message | Task 7 |
| Keyboard J/K navigation | Task 7 |
| Entry detail 38.2% gutter layout | Task 8 |
| EntryHead (kicker, terra em h1, dl.kv) | Task 8 |
| PressedSpecimen server shell + dynamic() child | Task 8 |
| PullQuote (2px terra border-left) | Task 8 |
| SectionHeading (.num span pattern) | Task 8 |
| UptimeRibbon artifact (statefarm-chat) | Task 9 |
| GBAViewport artifact (adventuretime-gba) | Task 10 |
| CSSHorizon artifact, zero JS (starlink) | Task 11 |
| EvidenceGraph D3 artifact (propsage) | Task 12 |
| ARTriumModel R3F artifact (vr-puzzle-game) | Task 13 |
| Drag-to-inspect affordance, no auto-rotate | Task 13 |
| About page two-column ruled layout | Task 14 |
| 301 redirects /projects → /journal | Task 15 |
| /contact → /about, /resume → CV, /notes → /journal | Task 15 |
| Sitemap updated | Task 15 |
| Remove AnimatedBlobs, WaveDivider, DeferredSections, SkillCloud, HeroCanvas, InteractiveHero, CommandPalette, RoleProvider, EffectsPrefs | Task 16 |

All spec requirements are covered.
