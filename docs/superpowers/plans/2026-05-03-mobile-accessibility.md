# Mobile Accessibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all identified mobile layout and touch-accessibility issues across the journal portfolio via targeted, in-place CSS and component edits.

**Architecture:** Four independent fix groups — nav touch targets, GBA viewport scaling, grid breakpoints, and touch target sizes — each touching a small surface area with no shared state. All changes are reversible individually.

**Tech Stack:** Next.js 14, TypeScript, CSS (no CSS modules — plain class selectors in `aurora.css` and `journal.css`), React hooks for the GBA scale computation.

---

## File Map

| File | What changes |
|------|-------------|
| `src/styles/aurora.css` | NavPill `.home` size, `.links` min-height, 480px breakpoint, `.cov` 480px rule, `.plans` 640px+480px rules, `.chip` padding+min-height |
| `src/styles/journal.css` | SiteNav logo breakpoint 560px→480px, `.links a` min-height |
| `src/components/journal/GBAViewport.tsx` | `containerRef`, `scale` state, `useEffect` scale computation, transform on shell div |

---

## Task 1: NavPill touch targets

**Files:**
- Modify: `src/styles/aurora.css:138-158`

Current state of the relevant rules (for reference):
```css
/* line 138 */
.nav-pill .home {
  width: 28px; height: 28px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%;
  color: var(--fg);
  transition: transform .35s var(--ease);
  text-decoration: none;
  border-bottom: 0 !important;
}
/* line 149 */
.nav-pill .links { display: flex; gap: var(--s-5); padding-right: var(--s-3); }
.nav-pill a { color: var(--fg-2); text-decoration: none; border-bottom: 0; transition: color .25s; }
/* line 154 */
@media (max-width: 640px) {
  .nav-pill { gap: var(--s-3); padding: 8px 12px; }
  .nav-pill .links { gap: var(--s-3); }
  .nav-pill .hide-sm { display: none; }
}
```

- [ ] **Step 1: Update `.nav-pill .home` to 44×44px tap area**

Replace the `.nav-pill .home` rule (line 138) with:
```css
.nav-pill .home {
  width: 44px; height: 44px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%;
  color: var(--fg);
  transition: transform .35s var(--ease);
  text-decoration: none;
  border-bottom: 0 !important;
}
```

- [ ] **Step 2: Add min-height to nav links so full pill height is tappable**

Replace `.nav-pill .links` (line 149) with:
```css
.nav-pill .links { display: flex; gap: var(--s-5); padding-right: var(--s-3); }
.nav-pill a { color: var(--fg-2); text-decoration: none; border-bottom: 0; transition: color .25s; min-height: 44px; display: inline-flex; align-items: center; }
```

- [ ] **Step 3: Add 480px breakpoint for very small phones**

After the existing `@media (max-width: 640px)` block (line 154–158), add:
```css
@media (max-width: 480px) {
  .nav-pill { gap: var(--s-2); padding: 6px 10px; }
  .nav-pill .links { gap: var(--s-2); font-size: 10px; }
}
```

- [ ] **Step 4: Verify visually**

Run `npm run dev` and open `http://localhost:3000/journal/adventuretime-gba` in DevTools at 375px width. Confirm:
- Home icon tap area is visibly larger (44px square, centered SVG)
- All four nav links are on one line with no overflow
- At 320px width links still fit without wrapping

- [ ] **Step 5: Commit**

```bash
git add src/styles/aurora.css
git commit -m "fix(mobile): NavPill 44px home tap target + 480px breakpoint"
```

---

## Task 2: SiteNav touch targets & logo breakpoint

**Files:**
- Modify: `src/styles/journal.css:98-112`

Current state:
```css
/* line 98 */
.site-nav .brand img{ height: 80px; width: auto; display:block; }
@media (max-width: 560px){ .site-nav .brand img{ height: 52px; } }
/* line 107 */
.site-nav .links a{ border-bottom: 0; color: var(--ink-2); }
.site-nav .links a[aria-current="page"]{ color: var(--terra); }
@media (max-width: 560px){
  .site-nav .links{ gap: var(--s-2); flex-wrap: nowrap; }
  .site-nav .links a{ font-size: 11px; }
}
```

- [ ] **Step 1: Move logo breakpoint from 560px to 480px and update size**

Replace lines 98–99 with:
```css
.site-nav .brand img{ height: 80px; width: auto; display:block; }
@media (max-width: 480px){ .site-nav .brand img{ height: 48px; } }
```

- [ ] **Step 2: Add min-height to SiteNav links and move links breakpoint to 480px**

Replace lines 107–112 with:
```css
.site-nav .links a{ border-bottom: 0; color: var(--ink-2); min-height: 44px; display: inline-flex; align-items: center; }
.site-nav .links a[aria-current="page"]{ color: var(--terra); }
@media (max-width: 480px){
  .site-nav .links{ gap: var(--s-2); flex-wrap: nowrap; }
  .site-nav .links a{ font-size: 11px; }
}
```

- [ ] **Step 3: Verify visually**

Open `http://localhost:3000/journal` in DevTools at 375px. Confirm:
- Logo is 48px tall (not 80px) — no overflow with nav links
- Nav links are vertically centered with larger tap area

- [ ] **Step 4: Commit**

```bash
git add src/styles/journal.css
git commit -m "fix(mobile): SiteNav logo 480px breakpoint + 44px link tap targets"
```

---

## Task 3: GBA Viewport proportional scaling

**Files:**
- Modify: `src/components/journal/GBAViewport.tsx`

The shell div currently has `maxWidth: 520` but no floor. On 320px phones the container is ~295px wide but the shell tries to render at 520px.

- [ ] **Step 1: Add `containerRef` and `scale` state**

At the top of the `GBAViewport` function body, after the existing `useState`/`useRef` declarations, add:
```tsx
const containerRef = useRef<HTMLDivElement>(null)
const [scale, setScale] = useState(1)
```

- [ ] **Step 2: Compute scale in the existing `useEffect`**

Inside the existing `useEffect` (after `setIsTouchDevice`), add the scale computation and a resize observer:
```tsx
const updateScale = () => {
  if (containerRef.current) {
    setScale(Math.min(1, containerRef.current.offsetWidth / 520))
  }
}
updateScale()
const ro = new ResizeObserver(updateScale)
if (containerRef.current) ro.observe(containerRef.current)
```

And in the `useEffect` return (cleanup), add:
```tsx
ro.disconnect()
```

- [ ] **Step 3: Attach `containerRef` to the outer wrapper and constrain its width**

The outermost `<div>` in the component's return currently has `width: '100%'`. Change it to:
```tsx
<div
  ref={containerRef}
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    maxWidth: 520,
    margin: '0 auto',
    boxSizing: 'border-box',
  }}
>
```

- [ ] **Step 4: Apply scale transform to the GBA shell div**

The shell div (the one with `background: 'linear-gradient(160deg, #d0cfc8 ...'`) currently has no transform. Add `transform` and `transformOrigin` to its existing inline style:
```tsx
style={{
  width: '100%',
  maxWidth: 520,
  background: 'linear-gradient(160deg, #d0cfc8 0%, #b0aea5 100%)',
  borderRadius: '14px 14px 28px 28px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)',
  boxSizing: 'border-box',
  overflow: 'hidden',
  transform: `scale(${scale})`,
  transformOrigin: 'top center',
}}
```

The outer flex column handles vertical spacing — the shell shrinks in place and any gap below is harmless whitespace.

- [ ] **Step 5: Verify visually**

Open `http://localhost:3000/journal/adventuretime-gba` in DevTools. Test at widths:
- 520px+ — shell renders at full size, no scaling
- 375px (iPhone) — shell scales to ~0.72×, fully visible, no overflow
- 320px (small Android) — shell scales to ~0.57×, fully visible

Also verify the emulator still loads and runs on desktop.

- [ ] **Step 6: Commit**

```bash
git add src/components/journal/GBAViewport.tsx
git commit -m "fix(mobile): GBA shell scales proportionally on narrow screens"
```

---

## Task 4: Grid breakpoints

**Files:**
- Modify: `src/styles/aurora.css:847-850`

Current state of the relevant media query block (line 847):
```css
@media (max-width: 720px) {
  .three-up, .plans { grid-template-columns: 1fr; }
  .cov { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 1: Add intermediate breakpoints for `.plans` and final breakpoints for `.cov` and `.plans`**

Replace the entire `@media (max-width: 720px)` block with:
```css
@media (max-width: 720px) {
  .three-up { grid-template-columns: 1fr; }
  .plans { grid-template-columns: repeat(2, 1fr); }
  .cov { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .plans { grid-template-columns: 1fr; }
  .cov { grid-template-columns: 1fr; }
}
```

Note: `.three-up` still goes to 1-col at 720px as before. `.plans` now goes 3→2 at 720px, 2→1 at 480px. `.cov` goes 4→2 at 720px (unchanged), 2→1 at 480px (new).

- [ ] **Step 2: Verify visually**

Open any journal page that renders `.cov` or `.plans` (e.g. the journal home or about page) in DevTools. Test at:
- 720px — `.plans` should be 2-col, `.cov` should be 2-col
- 480px — both should be 1-col
- 375px — both 1-col, no overflow

- [ ] **Step 3: Commit**

```bash
git add src/styles/aurora.css
git commit -m "fix(mobile): .cov and .plans grid — add 480px single-column breakpoints"
```

---

## Task 5: Touch targets — chips and proj-cta

**Files:**
- Modify: `src/styles/aurora.css:513-524` (`.chip`)
- Modify: `src/styles/journal.css:250-258` (`.proj-cta`)

Current `.chip` (line 513):
```css
.chip {
  font-family: var(--mono); font-size: var(--t-note);
  text-transform: uppercase; letter-spacing: .14em;
  padding: 6px 14px;
  border: .5px solid var(--line);
  color: var(--fg-3);
  background: var(--glass);
  border-radius: 999px;
  cursor: pointer;
  transition: all .2s var(--ease);
  text-decoration: none;
  border-bottom: .5px solid var(--line);
}
```

Current `.proj-cta` (line 250):
```css
.proj-cta{
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: var(--t-note);
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--terra); border: 1px solid var(--terra);
  padding: 8px 14px; margin-top: var(--s-4);
  text-decoration: none;
  transition: background .15s ease, color .15s ease;
}
```

- [ ] **Step 1: Increase `.chip` padding and add `min-height`**

Replace the `padding` line inside `.chip` and add `min-height`:
```css
.chip {
  font-family: var(--mono); font-size: var(--t-note);
  text-transform: uppercase; letter-spacing: .14em;
  padding: 10px 16px;
  min-height: 40px;
  border: .5px solid var(--line);
  color: var(--fg-3);
  background: var(--glass);
  border-radius: 999px;
  cursor: pointer;
  transition: all .2s var(--ease);
  text-decoration: none;
  border-bottom: .5px solid var(--line);
  display: inline-flex; align-items: center;
}
```

- [ ] **Step 2: Increase `.proj-cta` padding**

Replace `padding: 8px 14px` with `padding: 12px 18px`:
```css
.proj-cta{
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: var(--t-note);
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--terra); border: 1px solid var(--terra);
  padding: 12px 18px; margin-top: var(--s-4);
  text-decoration: none;
  transition: background .15s ease, color .15s ease;
}
```

- [ ] **Step 3: Verify visually**

Open `http://localhost:3000/journal` in DevTools at 375px. Confirm:
- Filter chips are visibly taller — comfortable to tap
- Open any journal entry with a `.proj-cta` button — confirm it's taller and easier to tap

- [ ] **Step 4: Commit**

```bash
git add src/styles/aurora.css src/styles/journal.css
git commit -m "fix(mobile): increase chip and proj-cta touch targets"
```

---

## Final verification

- [ ] Run `npm run lint` — expect no errors
- [ ] Run `npm run type-check` — expect no errors
- [ ] Run `npm run build` — expect clean build, no bundle size warnings
- [ ] Open on a real mobile device (or BrowserStack) at 375px and 320px — walk through: journal home, a journal entry, the GBA entry. Confirm no horizontal overflow anywhere.
