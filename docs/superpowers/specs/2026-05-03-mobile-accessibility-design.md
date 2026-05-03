# Mobile Accessibility — Design Spec
**Date:** 2026-05-03
**Approach:** Option A — targeted in-place fixes

---

## Scope

Fix all identified mobile layout and touch-accessibility issues across the journal portfolio. No structural component rewrites, no hamburger menu, no breakpoint system overhaul. Each fix is independent and reversible.

---

## Section 1 — Navigation touch targets & scaling

### NavPill (`src/components/journal/NavPill.tsx` + `src/styles/aurora.css`)

- Home icon: increase tap area to 44×44px via padding (SVG stays 22×22)
- Link items: add `min-height: 44px` and `display: flex; align-items: center` so the full row height is tappable
- Below 480px: tighten gap between links, reduce font-size from 11px → 10px so all four links fit on one line without wrapping

### SiteNav (`src/components/journal/SiteNav.tsx` + `src/styles/journal.css`)

- Move logo height breakpoint from 560px → 480px
- At 480px: logo height 80px → 48px. The existing 560px rule (52px) is removed and replaced with this single 480px rule.
- Links: add `min-height: 44px` alignment padding to each link item

---

## Section 2 — GBA Viewport scaling (`src/components/journal/GBAViewport.tsx`)

- Wrap the entire GBA shell in a `<div>` with `width: min(520px, 100%)` and `overflow: hidden`
- Compute a `--gba-scale` factor client-side in the existing `useEffect`:
  ```js
  const scale = Math.min(1, containerRef.current.offsetWidth / 520)
  ```
- Apply `transform: scale(scale) translateZ(0)` with `transform-origin: top center` to the inner shell div
- Add a ref to the outer wrapper div to read its `offsetWidth`
- Result: shell proportionally shrinks on screens narrower than 520px, preserving all visual detail
- Virtual gamepad (already enabled for touch devices) overlays the screen on mobile, so the scaled-down physical controls remain decorative

---

## Section 3 — Layout grid breakpoints (`src/styles/aurora.css`)

Two grids need additional breakpoints:

### `.cov` grid (skills/coverage, currently 4-col → 2-col at 720px)
- Add `@media (max-width: 480px)`: `grid-template-columns: 1fr` (single column)

### `.plans` grid (currently 3-col → 1-col at 720px)
- Add `@media (max-width: 640px)`: `grid-template-columns: repeat(2, 1fr)`
- Add `@media (max-width: 480px)`: `grid-template-columns: 1fr`

No changes to entry cards (820px collapse is correct), `.proj-body` (900px stack is correct), or `.proj-head dl` (78px dt is fine in the stacked layout).

---

## Section 4 — Touch targets (`src/styles/aurora.css` + `src/styles/journal.css`)

### Filter chips (`.chip`)
- Change padding: `6px 14px` → `10px 16px`
- Add `min-height: 40px` (pragmatic: 44px makes the chip row feel heavy for a secondary filter UI)

### Project CTA button (`.proj-cta`)
- Change padding: `8px 14px` → `12px 18px`

---

## Files Changed

| File | Change |
|------|--------|
| `src/styles/aurora.css` | NavPill touch targets, 480px nav breakpoint, `.cov` 480px grid rule, `.plans` 640px+480px grid rules, `.chip` padding+min-height, `.proj-cta` padding |
| `src/styles/journal.css` | SiteNav logo breakpoint moved 560→480px, link min-height |
| `src/components/journal/GBAViewport.tsx` | Scale wrapper + useEffect scale computation |

---

## Out of Scope

- Hamburger/drawer navigation (user confirmed inline-only)
- Breakpoint system consolidation (separate cleanup task)
- `.proj-head dl.kv dt` fixed width (fine in stacked layout)
- `.proj-body` sidebar (900px stack is sufficient)
- Entry card grid 640–820px (acceptable as-is)
