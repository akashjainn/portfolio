# Mobile Compatibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio work well on phones (375px–428px) and tablets (768px) by fixing the viewport tag, navigation overflow, homepage grids, project-head breakpoint, and h2 typography.

**Architecture:** Targeted fixes only — no mobile-first rewrite. Three files touched: `layout.tsx` (viewport meta), `page.tsx` (inline grid → Tailwind responsive), `journal.css` (nav, breakpoints, clamp). Inline `style` props on the hero/now-strip grids are converted to Tailwind responsive classes because inline styles cannot respond to media queries.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS (arbitrary-value classes), CSS `clamp()`, CSS custom properties.

---

### Task 1: Viewport meta tag

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add the viewport export**

Open `src/app/layout.tsx`. The file currently starts with:

```ts
import type { Metadata } from 'next'
```

Change it to:

```ts
import type { Metadata, Viewport } from 'next'
```

Then, after the closing `}` of the `export const metadata` block (after line 63), add:

```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}
```

- [ ] **Step 2: Verify the build still passes**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add viewport meta tag for mobile rendering"
```

---

### Task 2: Hero grid — inline style → Tailwind responsive

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Convert the hero section's grid style**

In `src/app/page.tsx` line 15, the hero `<section>` currently has:

```tsx
<section style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 'var(--s-7)', alignItems: 'end', paddingBottom: 'var(--s-6)', borderBottom: '1px solid var(--ink)', marginBottom: 'var(--s-5)' }}>
```

Replace it with (grid/gap moved to className; non-responsive styles kept in style):

```tsx
<section
  className="grid grid-cols-1 sm:grid-cols-[1fr_240px] gap-[var(--s-5)] sm:gap-[var(--s-7)]"
  style={{ alignItems: 'end', paddingBottom: 'var(--s-6)', borderBottom: '1px solid var(--ink)', marginBottom: 'var(--s-5)' }}
>
```

- [ ] **Step 2: Verify visually at 375px**

```bash
npm run dev
```

Open `http://localhost:3000` in browser devtools at 375px width. Confirm:
- Headline and "Currently / Interning at SpaceX" aside stack vertically (1 column)
- No horizontal overflow

Open at ≥640px. Confirm:
- Two-column layout restored (headline left, aside right)

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: make hero grid responsive with Tailwind sm breakpoint"
```

---

### Task 3: Now-strip grid — inline style → Tailwind responsive

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Convert the now-strip's grid style**

In `src/app/page.tsx` line 36, the now-strip `<section>` currently has:

```tsx
<section style={{ padding: 'var(--s-5)', background: 'var(--cream-2)', border: '1px solid var(--ink)', display: 'grid', gridTemplateColumns: '140px 1fr', gap: 'var(--s-5)', marginBottom: 'var(--s-8)' }}>
```

Replace it with:

```tsx
<section
  className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-[var(--s-3)] sm:gap-[var(--s-5)]"
  style={{ padding: 'var(--s-5)', background: 'var(--cream-2)', border: '1px solid var(--ink)', marginBottom: 'var(--s-8)' }}
>
```

- [ ] **Step 2: Verify visually at 375px**

With `npm run dev` still running, check `http://localhost:3000` at 375px:
- "Now · Apr 18" label and paragraph stack vertically
- No horizontal overflow on the now strip

Check at ≥640px:
- Two-column layout (narrow date label left, text right)

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: make now-strip grid responsive with Tailwind sm breakpoint"
```

---

### Task 4: Navigation — prevent 2×2 wrap at 375px

**Files:**
- Modify: `src/styles/journal.css`

- [ ] **Step 1: Tighten the nav at ≤560px**

In `src/styles/journal.css`, find the existing `@media (max-width: 560px)` block (currently lines 107–109):

```css
@media (max-width: 560px){
  .site-nav .links{ gap: var(--s-3); flex-wrap: wrap; }
}
```

Replace it with:

```css
@media (max-width: 560px){
  .site-nav .links{ gap: 8px; flex-wrap: nowrap; }
  .site-nav .links a{ font-size: 11px; }
}
```

This keeps all four links (Journal · About · CV · Contact) on one row at 375px.

- [ ] **Step 2: Verify visually**

Open `http://localhost:3000` at 375px in devtools. Confirm:
- All nav links appear on a single row without wrapping
- Links are legible (11px monospace)

- [ ] **Step 3: Commit**

```bash
git add src/styles/journal.css
git commit -m "feat: prevent nav links from wrapping 2x2 on 375px screens"
```

---

### Task 5: Project head — tighten sidebar breakpoint

**Files:**
- Modify: `src/styles/journal.css`

- [ ] **Step 1: Move `.proj-head` collapse from 900px to 720px**

In `src/styles/journal.css`, find this line (currently line 252):

```css
@media (max-width: 900px){ .proj-head{ grid-template-columns: 1fr; } }
```

Change it to:

```css
@media (max-width: 720px){ .proj-head{ grid-template-columns: 1fr; } }
```

On tablets (768px), the `.proj-head` layout stays two-column. It only collapses below 720px.

- [ ] **Step 2: Verify on a project page**

Open any project detail page (e.g. `http://localhost:3000/journal/[any-slug]`) at 768px devtools width. Confirm:
- Two-column layout is visible (title + sidebar metadata)

At 600px:
- Single-column layout, metadata below title

- [ ] **Step 3: Commit**

```bash
git add src/styles/journal.css
git commit -m "feat: collapse proj-head sidebar at 720px instead of 900px"
```

---

### Task 6: h2.phase — fluid font size and reduced top margin on mobile

**Files:**
- Modify: `src/styles/journal.css`

- [ ] **Step 1: Add clamp() to h2.phase font-size**

In `src/styles/journal.css`, find the `h2.phase` rule (currently lines 123–131):

```css
h2.phase{
  font-family: var(--serif);
  font-weight: 400;
  font-size: var(--t-h2);
  line-height: 1.05;
  letter-spacing: -.01em;
  margin: var(--s-9) 0 var(--s-5);
  max-width: 22ch;
}
```

Change only the `font-size` line:

```css
h2.phase{
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(24px, 4vw, 38px);
  line-height: 1.05;
  letter-spacing: -.01em;
  margin: var(--s-9) 0 var(--s-5);
  max-width: 22ch;
}
```

- [ ] **Step 2: Add mobile margin-top reduction**

There is already an `@media (max-width: 720px)` block at line 74 (for `.page` padding). Add a **new** media query block for `h2.phase` margin, placed in the typography section near `h2.phase` (after the `h2.phase .no` rule, approximately line 138):

```css
@media (max-width: 720px){
  h2.phase{ margin-top: var(--s-6); }
}
```

`--s-6` is 32px. This replaces the 112px top margin (`--s-9`) on mobile so that section headings don't consume a third of the phone screen.

- [ ] **Step 3: Verify visually**

Open a project page at 375px devtools width. Confirm:
- Section headings (`h2.phase`) are readable (≥24px), not oversized
- Top spacing between sections is reasonable (≈32px), not a full-screen gap

Open at ≥950px. Confirm:
- h2.phase renders at 38px (original desktop size)

- [ ] **Step 4: Commit**

```bash
git add src/styles/journal.css
git commit -m "feat: fluid h2.phase font-size and reduced mobile margin"
```

---

## Self-Review

**Spec coverage:**
| Spec section | Plan task |
|---|---|
| §1 Viewport meta tag | Task 1 |
| §2 Navigation (11px, gap 8px, nowrap at ≤560px) | Task 4 |
| §3 Hero grid (inline → Tailwind responsive) | Task 2 |
| §3 Now-strip grid (inline → Tailwind responsive) | Task 3 |
| §4 proj-head breakpoint 900px→720px | Task 5 |
| §5 h2.phase clamp(24px, 4vw, 38px) | Task 6 |
| §5 h2.phase margin-top var(--s-6) at ≤720px | Task 6 |

**Notes:**
- The spec mentioned a `max-h-48 sm:max-h-none` cap on the hero's right column assuming it was a Three.js canvas. It is actually a plain `<aside>` with text — no height cap needed. The aside stacks naturally and no extra class is required.
- The spec says `grid-cols-[1fr_240px]` for the hero. Confirmed against `page.tsx` — the right column is 240px on desktop. Plan matches.
- `--s-3` is 12px; `--s-5` is 24px. Now-strip mobile gap uses `gap-[var(--s-3)]` (12px) per spec. Confirmed.
