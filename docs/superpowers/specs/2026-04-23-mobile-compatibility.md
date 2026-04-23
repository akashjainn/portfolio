# Mobile Compatibility — Design Spec
**Date:** 2026-04-23

## Overview

Comprehensive mobile pass to make the portfolio work well on phones (375px–428px) and tablets (768px). The site has good fundamentals — fluid images, overflow protection, working breakpoints on most layouts — but four areas are broken or degraded on mobile: the hero grid, the "now" strip, the navigation, and typography/spacing. This spec fixes all of them.

---

## Decisions

| Topic | Decision |
|---|---|
| Navigation approach | Keep inline links — tighten font/spacing so 4 links fit on one row at 375px, no hamburger |
| Hero/now-strip fix | Convert inline styles to Tailwind responsive classes (inline styles can't use media queries) |
| Breakpoint strategy | Targeted fixes to existing breakpoints, no mobile-first rewrite |
| Typography | Add `clamp()` to h2 only — body text is already acceptable at 16px |

---

## Section 1: Viewport Meta Tag

**File:** `src/app/layout.tsx`

Add the Next.js 14 `viewport` export. Without it, some Android browsers render at desktop width.

```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}
```

Import `Viewport` from `'next'`.

---

## Section 2: Navigation

**File:** `src/styles/journal.css`

The `.site-nav .links` block at the 560px breakpoint currently sets `gap: var(--s-3)` and `flex-wrap: wrap`. At 375px this causes the 4 links to stack 2×2.

**Changes at `max-width: 560px`:**
- Add `font-size: 11px` to `.site-nav .links a`
- Set `gap: 8px` on `.site-nav .links`
- Add `flex-wrap: nowrap` to `.site-nav .links`

At 375px with 11px text and 8px gaps, all four links (Journal · About · CV · Contact) fit comfortably on one row.

**No changes above 560px** — desktop nav is unchanged.

---

## Section 3: Homepage Grids

**File:** `src/app/page.tsx`

Both the hero and "now" strip use inline `style` props with hardcoded `gridTemplateColumns`. Inline styles cannot respond to media queries, so these are converted to Tailwind responsive utility classes.

### Hero section

Current:
```tsx
style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 'var(--s-7)' }}
```

New (Tailwind):
```tsx
className="grid grid-cols-1 sm:grid-cols-[1fr_240px] gap-[var(--s-5)] sm:gap-[var(--s-7)]"
```

- Stacks to 1 column below `sm` (640px)
- Gap reduces on mobile to avoid excessive spacing between stacked sections
- The right column (Three.js `HeroCanvas`) gets `className="max-h-48 sm:max-h-none"` to cap its height when stacked so it doesn't dominate the viewport

### "Now" strip

Current:
```tsx
style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 'var(--s-5)' }}
```

New (Tailwind):
```tsx
className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-[var(--s-3)] sm:gap-[var(--s-5)]"
```

- Stacks to 1 column below `sm` (640px)

---

## Section 4: Project Head Breakpoint

**File:** `src/styles/journal.css`

The `.proj-head` layout (`grid-template-columns: 1fr 280px`) currently collapses at `max-width: 900px`. On a 768px tablet the 280px sidebar takes 37% of the viewport.

**Change:** Move collapse breakpoint from `900px` → `720px`.

This makes the layout single-column on all phones and small tablets (up to 720px), giving more room for the main content.

---

## Section 5: Fluid Typography + Spacing

**File:** `src/styles/journal.css`

### h2.phase font size
- Current: `font-size: var(--t-h2)` (fixed 38px)
- New: `font-size: clamp(24px, 4vw, 38px)`
- At 375px: `4vw = 15px` → clamp floor kicks in → 24px (still readable, clearly a heading)
- At 600px: `4vw = 24px` → starts scaling up
- At 950px+: clamped at 38px (original desktop value)

### h2.phase top margin
- Current: `margin: var(--s-9) 0 var(--s-5)` — `--s-9` is 112px, which is a full third of a phone screen
- New: add at `max-width: 720px`:
  ```css
  h2.phase { margin-top: var(--s-6); }  /* 32px */
  ```

---

## File Changes Summary

| File | Change |
|---|---|
| `src/app/layout.tsx` | Add `viewport` export (`width=device-width, initialScale: 1`) |
| `src/app/page.tsx` | Hero + now-strip: inline styles → Tailwind responsive classes; hero canvas height cap |
| `src/styles/journal.css` | Nav: `font-size: 11px`, `gap: 8px`, `flex-wrap: nowrap` at ≤560px; `.proj-head` breakpoint 900px→720px; h2.phase `clamp(24px, 4vw, 38px)`; h2.phase `margin-top: var(--s-6)` at ≤720px |

---

## Out of Scope

- Hamburger/drawer navigation (user chose inline links)
- Fluid typography for h3, body text, or other elements
- Intermediate breakpoints (480px, 600px)
- About, Contact, Resume pages (already have working 900px breakpoints)
- Three.js scene mobile optimizations (SceneGate already handles this)
- Touch-specific interactions
