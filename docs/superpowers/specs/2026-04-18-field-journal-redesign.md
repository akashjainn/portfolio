# Field Journal Portfolio Redesign
**Date:** 2026-04-18  
**Status:** Approved — ready for implementation planning

---

## Positioning

**Angle:** "The Engineer Who Writes"  
**Single idea a visitor leaves with:** *This is someone who understands problems deeply enough to write about them clearly — which means he'll understand mine.*

The portfolio is built around the journal entry as the unit of trust. Most CS students show what they built. This site shows why the first three versions failed.

---

## Design Principles

1. **The entry is the unit of trust.** Every structural decision optimizes for a single entry being readable first, the index second.

2. **Artifacts are diegetic or absent.** The pressed-specimen slot exists only where the medium is native to the project. If it can't be explained as "this is a material output of the work," it doesn't ship.

3. **Prose carries the argument; chrome makes it findable.** The heading and the lede have to work without the custom component. Components are emphasis, not substitutes for conviction.

4. **Structure earns decoration.** The ruled margin, the golden-ratio grid column, the dashed rule — these are navigational instruments wearing period costume. Every "decorative" element must aid reading, establish hierarchy, or mark rhythm.

5. **Performance is editorial discipline.** A page that loads slowly didn't respect the reader's time. The performance budget is a design constraint. Each artifact has a cost in both kilobytes and attention; it ships only if the entry is better for it.

6. **Two papers, one hand.** Light mode is aged cream; dark mode is dark-stained walnut. Both feel like the same person made two versions of the same publication — not an inverted palette.

---

## Information Architecture

### Routes

```
/                    Home
/journal             Entry index
/journal/[slug]      Entry detail
/about               About + Colophon
/Akash-Jain-CV.pdf   Direct PDF link

Retired (301 redirects):
/projects            → /journal
/projects/[slug]     → /journal/[slug]
/contact             → dissolved into nav mailto + about footer
/resume              → dissolved into CV nav link
/notes               → folded into journal (kind: 'study')
/playground          → filter chip on /journal
```

### Entries (v1)

| Slug | Entry No. | Kind | Artifact |
|---|---|---|---|
| statefarm-chat | 02 | case | uptime-ribbon |
| adventuretime-gba | 03 | specimen | gba-viewport |
| propsage | 04 | case | evidence-graph |
| vr-puzzle-game | 05 | specimen | model (vine-trees.fbx) |
| starlink-redesign | 07 | study | css-horizon |

Excluded from v1: landsafe, stocksense.

### Homepage Narrative Arc

1. **Nav** — wordmark + 4 links
2. **Hero** — masthead h1 + "Currently" aside (answers recruiter's first question)
3. **Now strip** — dated paragraph, proves site is maintained
4. **Recent entries** — 4 entry rows
5. **"See all entries →"**
6. **Colophon** — golden-ratio grid, prose about who I am
7. **Footer**

Removed from current homepage: AnimatedBlobs, WaveDivider, ExecutiveSummarySection (99.2% uptime metrics), DeferredSections, SkillCloud, CommandPalette.

---

## Design System

### Typefaces

Two families only:

| Face | Weights | Role |
|---|---|---|
| Source Serif 4 (variable, 8–60pt opsz) | 300–500 + italic | Mastheads, headings, all prose |
| JetBrains Mono | 400, 500 | All metadata, UI controls, nav links, chips, captions |

Loaded via `next/font/google`, `display: swap`. Source Serif 4 uses `opsz` axis matched to rendered size.

### Type Scale (1.333 ratio)

| Step | Size | opsz | Weight | Use |
|---|---|---|---|---|
| h1 masthead | 72px | 60 | 300 italic | Homepage, section mastheads |
| h1 entry | 54px | 48 | 400 | Entry detail headlines |
| h2 | 40px | 36 | 400 | Phase headings |
| h3 | 30px | 24 | 500 italic | Entry list headings |
| h4 | 22px | 18 | 500 | Sidebar headings |
| body | 18px | 14 | 400 | All prose |
| small | 16px | 12 | 400 | Captions, secondary prose |

### Color Tokens

| Token | Light | Dark | WCAG on bg |
|---|---|---|---|
| `--cream` | `#F4ECDC` | `#1C1811` | — (background) |
| `--cream-2` | `#EADFC9` | `#24201A` | — (surface) |
| `--rule` | `#D7C8AC` | `#3A3226` | — (borders only) |
| `--ink` | `#2B2118` | `#EEE3CE` | ~12.4:1 — AAA |
| `--ink-2` | `#4A3C2E` | `#C9BCA3` | ~7.8:1 — AAA |
| `--ink-3` | `#6B5A47` | `#9A8D74` | ~4.6:1 — AA (metadata only) |
| `--terra` | `#B95C2F` | `#D2784C` | ~4.5:1 — AA (large/UI only) |
| `--terra-deep` | `#8F401E` | `#C4633A` | ~7:1+ — AA (body-size links) |
| `--moss` | `#56643A` | `#8CA05E` | — (specimen entries) |
| `--ochre` | `#AE7A18` | `#D6A845` | — (data artifacts) |
| `--focus` | 2px outline `--terra`, 2px `--cream` offset | same | replaces browser default |
| `--danger` | `#8B2E1A` | `#D2694C` | ~7:1+ — AA |
| `--success` | `#3F4A28` | `#9FB36E` | ~7:1+ — AA |

**Rule:** `--terra` is reserved for the italic heading move and large/UI surfaces. Any terra at body size uses `--terra-deep`.

### Spacing Scale

```
--s-1: 4px   --s-2: 8px   --s-3: 12px  --s-4: 16px
--s-5: 24px  --s-6: 32px  --s-7: 48px  --s-8: 72px  --s-9: 112px
```

### Prose Measure

```css
--measure: 68ch;         /* body paragraphs */
--measure-narrow: 52ch;  /* lede, pull quotes */
```

### Motion

```css
--ease-journal: cubic-bezier(.2, .6, .2, 1);

Entry hover:    background 250ms + padding-left 250ms (--ease-journal)
Link hover:     color + border-color 200ms (--ease-journal)
Artifact load:  opacity 300ms (--ease-journal), IntersectionObserver trigger
Chip filter:    background + color 200ms (--ease-journal)
```

`prefers-reduced-motion: reduce` zeroes all transitions and animations via a single CSS rule. No conditional JS.

### Three Signature House Moves

**1. The golden-ratio ruled margin.** A dashed vertical rule at exactly 38.2% on two-column `.ruled` layouts. `::before` pseudo-element, `pointer-events: none`, `opacity: 0.7`. Disappears below 900px. Navigational instrument dressed as decoration.

**2. The terra italic.** In every masthead h1, one phrase in `<em>` renders `font-style: normal; color: var(--terra)`. The only place color appears in headings. Consistent reading beat: italic signals the crux; color makes it findable. Every entry headline must be writable in this form.

**3. Custom woodcut SVG icon set.** 10–15 marks on a 20×20 grid, single stroke weight (~1.5px) matching Source Serif 4 hairline. All marks use `currentColor`. Needed: external-link arrow, back arrow, case-study document, specimen microscope, personal-study compass, playground grid, filter ×, drag-inspect hand, CV download. Recolored via CSS, no image requests.

---

## Key Screens

### Homepage (`/`)

Nav: wordmark SVG + four links (Journal · About · CV · Contact). JetBrains Mono 12px uppercase. Active page: `--terra`. Below 560px links wrap.

Hero: `1fr 240px` grid, `gap: --s-7`, aligned to baseline. Left: kicker ("Atlanta, GA · Spring 2026 · Vol. I") + 72px italic masthead with terra em. Right: "Currently" aside in mono — SpaceX/Starlink. Section ends with 1px `--ink` border-bottom.

Now strip: `--cream-2` inset box, 140px mono sidebar + prose right.

Recent entries: four `.entry` rows, `130px | 1fr | 200px` grid. Hover: background shift + padding-left shift at 250ms.

Colophon: `.grid-2.ruled` — golden-ratio rule present. Left gutter sticky.

### Entry Detail (`/journal/[slug]`)

Entry head: `1fr 280px`. Left: kicker + 54px h1. Right: `dl.kv` definition list.

Entry body: `38.2% | 1fr`. Left gutter sticky with TOC + "At a glance". Right: prose with section h2s using `.num` span pattern.

**Pressed-specimen slot:** `.figure` box (background `--cream-2`, border `--rule`) containing the artifact at explicit aspect ratio. `.cap` bar beneath: JetBrains Mono, `space-between`, FIG. label left + date/source right.

Artifact idle behavior: **drag-to-inspect only, no auto-rotate.** "Drag to inspect" affordance in mono ink-3 beneath canvas, fades after first interaction.

Pull quotes: border-left 2px `--terra`, Source Serif 4 italic 28px, `--measure-narrow`.

### About (`/about`)

Kicker + 54px masthead. `.grid-2.ruled`. Left gutter sticky: typefaces, stack, links. Right: 5 prose paragraphs. Closing signature in JetBrains Mono 12px ink-3.

### Journal Index (`/journal`)

Kicker with live entry count (updates on filter). 54px masthead (no terra italic — this is a list, not a thesis).

Filter chips: All · Case study · Specimen · Personal study · Playground. Each chip has a woodcut SVG icon. Active: `--terra` background. Chip row is where all three house moves meet.

Entry count in kicker updates when filter is active. Only the counter span is a client component — entry list visibility toggled via CSS `display`, not React re-render.

Keyboard J/K navigation: `useEffect` on entry list, `tabIndex={0}` on each entry. Standard `--focus` ring only.

Empty filter state: Source Serif 4 italic 22px ink-2 — *"No entries in this category yet."* No illustration.

Zero-JS fallback: chips degrade to `?filter=` URL params, handled server-side.

---

## Implementation Plan

### Stack

Keep: Next.js 14 App Router, TypeScript, MDX, React Three Fiber (ARTrium only), Tailwind (design tokens only).  
Add: D3 (dynamic import, PropSage only).  
Remove: Framer Motion, AnimatedBlobs, WaveDivider, CommandPalette, RoleProvider, InteractiveHero, HeroCanvas, ExecutiveSummarySection, DeferredSections, SkillCloud.

### Performance Budget

| Page | JS target |
|---|---|
| Homepage | < 80kb |
| Journal index | < 85kb |
| Entry (no artifact / CSS artifact) | < 95kb |
| Entry (SVG artifact) | < 110kb |
| Entry (3D artifact — ARTrium only) | < 380kb |
| Entry (GBA viewport) | < 100kb |

### Frontmatter Extension

```typescript
interface JournalFrontmatter {
  // existing
  slug: string; title: string; summary: string; tags: string[]; status: 'published' | 'draft';
  // new
  entryNo: number;
  kind: 'case' | 'specimen' | 'study' | 'playground';
  artifact: {
    type: 'model' | 'graph' | 'ribbon' | 'viewport' | 'horizon' | 'none';
    src?: string;
    caption: string;
    aspectRatio?: string;
  };
}
```

### Key Components

| Component | Type | Notes |
|---|---|---|
| `SiteNav` | Server | Reads path for aria-current |
| `SiteFooter` | Server | Static |
| `EntryList` | Server | Renders entry rows |
| `FilterChips` | Client (minimal) | Chip state + counter ref only |
| `EntryHead` | Server | kicker + h1 + dl.kv |
| `NowStrip` | Server | Inset box |
| `PressedSpecimen` | Server | Container; dynamic() imports child |
| `UptimeRibbon` | Server | Inline SVG, data from frontmatter |
| `EvidenceGraph` | Client | D3, dynamic import |
| `ARTriumModel` | Client | R3F, dynamic import |
| `GBAViewport` | Server | SVG shell + video |
| `CSSHorizon` | Server | Zero JS |
| `WoodcutIcon` | Server | Inline SVG switcher, 15 marks |
| `Figure` | Server | .figure box + .cap bar |
| `PullQuote` | Server | Border-left terra |
| `SectionHeading` | Server | .num + h2 pattern |

`PressedSpecimen` renders the `.figure` frame and `.cap` bar server-side (immediately visible). Only `EvidenceGraph` and `ARTriumModel` are loaded client-side via `dynamic()` with `ssr: false` — the artifact interior loads into an already-visible frame.

### v1 Scope

- All 5 entries with final content (Starlink MDX authored from HTML source)
- Complete design system (tokens, fonts, light/dark)
- All 5 pressed-specimen artifacts
- Custom SVG icon set (10 marks minimum)
- Keyboard J/K navigation
- Full accessibility (focus ring, skip link, ARIA)
- Redirects from /projects/* → /journal/*

### v2 Deferred

- Per-entry OG image generation (@vercel/og)
- Print stylesheet
- RSS feed
- Scroll-progress indicator on long entries
- "Next entry →" navigation at entry bottom
