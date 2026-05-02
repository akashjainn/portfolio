# Magnetic Tilt + Halo Cursor System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four-fang hover cursor with a magnetic 3D card tilt, aurora halo ring, and always-visible glowing dot cursor.

**Architecture:** All animation JS lives in `AuroraEffects.tsx` (existing React `useEffect` hook). CSS handles styles, transitions, and keyframes. The halo ring is a transient JS-injected `<span>` that removes itself on `animationend`. The 3D tilt is applied via inline `style.transform` on `mousemove`, disabled on `mouseleave` so the CSS spring-back transition takes over.

**Tech Stack:** Vanilla DOM APIs, CSS custom properties, `@keyframes`, React `useEffect` cleanup pattern. No new dependencies.

---

## File Map

| File | What changes |
|---|---|
| `src/styles/aurora.css` | Remove all fang rules; update cursor dot hover/bite; add tilt transition + specular `::after`; add `.halo` + `@keyframes halo-expand` |
| `src/components/journal/AuroraEffects.tsx` | Rewrite: remove svgDefs + fang DOM; cursor always tracks real pointer; add tilt delegation; add halo delegation |

---

### Task 1: CSS — Remove fangs, update cursor dot for hover and click

**Files:**
- Modify: `src/styles/aurora.css`

- [ ] **Step 1: Delete the fang comment block and all fang rules**

In `aurora.css`, find and delete this entire comment + all rules below it through `.cursor.bite .fang.br`:

```
/* ── Bite cursor — four aurora fangs frame the target ── */
```

Delete every rule that mentions `.fang` or `.cursor.bite .fang`. The kept `.cursor`, `.cursor::before`, and `@media (hover: hover)` rules stay. After deletion the cursor section should only contain:

```css
/* ── Bite cursor ── */
.cursor {
  position: fixed;
  left: 0; top: 0;
  pointer-events: none;
  z-index: 9999;
  width: 1px; height: 1px;
  transform: translate(-50%, -50%);
  will-change: transform;
}
.cursor::before {
  content: "";
  position: absolute;
  left: 50%; top: 50%;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--fg);
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 0 1px rgba(6,7,15,.55),
    0 0 8px rgba(255,255,255,.45),
    0 0 18px rgba(141,132,255,.35);
  transition: width .18s var(--ease), height .18s var(--ease),
              box-shadow .18s var(--ease), opacity .18s var(--ease);
}
.cursor.hover::before {
  width: 9px;
  height: 9px;
  box-shadow:
    0 0 0 1px rgba(6,7,15,.55),
    0 0 14px rgba(255,255,255,.65),
    0 0 28px rgba(141,132,255,.55),
    0 0 42px rgba(77,207,224,.30);
}
.cursor.bite::before {
  width: 5px;
  height: 5px;
  box-shadow:
    0 0 0 1px rgba(6,7,15,.55),
    0 0 6px rgba(255,255,255,.9),
    0 0 14px rgba(229,84,125,.8);
}

@media (hover: hover) and (pointer: fine) {
  html.js-ready, html.js-ready * { cursor: none !important; }
  html.js-ready input, html.js-ready textarea, html.js-ready [contenteditable] { cursor: text !important; }
}
@media (hover: none) { .cursor { display: none; } }
```

Note: the original `.cursor` had `will-change: transform, width, height` and a `transition` on width/height. Those were for the fang snap. The new `.cursor` only needs `will-change: transform` (dot never resizes the `.cursor` div itself — only `::before` changes size via CSS transition).

- [ ] **Step 2: Remove `transform: translateY(-2px)` from `a.entry:hover`**

The JS tilt handles the lift effect. Find `a.entry:hover` and remove the `transform: translateY(-2px)` line, leaving the other properties intact:

```css
a.entry:hover {
  background: var(--glass-2);
  border-color: var(--fg-3);
  color: var(--fg-1);
  -webkit-text-fill-color: var(--fg-1);
  border-bottom: .5px solid var(--fg-3);
}
```

- [ ] **Step 3: Verify no remaining fang references**

Run:
```bash
grep -n "fang\|bite" src/styles/aurora.css
```

Expected: zero matches (the `.bite` class on the cursor is now just for the `::before` dot compression — that's fine to keep; make sure `.cursor.bite` rule exists per Step 1).

- [ ] **Step 4: Commit**

```bash
git add src/styles/aurora.css
git commit -m "style: replace fang cursor with always-visible glowing dot"
```

---

### Task 2: CSS — Add magnetic tilt styles (transition + specular highlight)

**Files:**
- Modify: `src/styles/aurora.css`

- [ ] **Step 1: Confirm `a.entry` transition and add specular `::after`**

`a.entry` already has `transition: transform .5s var(--ease-soft), border-color .35s, background .35s`. This is used for the CSS spring-back when JS removes the inline transform on mouse leave — no change needed to that rule.

Add the specular highlight pseudo-element immediately after `a.entry:hover::before { opacity: .14; }`:

```css
a.entry::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    rgba(255,255,255,.10) 0%,
    transparent 60%
  );
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s var(--ease);
  z-index: 1;
}

a.entry:hover::after {
  opacity: 1;
}
```

`--mx` and `--my` are set inline by JS on each `mousemove`. When not set they default to `50% 50%` (center), so the specular starts centered and drifts to follow the cursor.

- [ ] **Step 2: Verify `::before` and `::after` don't conflict**

`a.entry::before` is the aurora overlay (mix-blend-mode overlay, opacity 0→0.14 on hover).
`a.entry::after` is the specular highlight (radial gradient, opacity 0→1 on hover).
Both are `pointer-events: none` and `position: absolute; inset: 0`. No conflict.

- [ ] **Step 3: Commit**

```bash
git add src/styles/aurora.css
git commit -m "style: add specular highlight pseudo-element to entry cards"
```

---

### Task 3: CSS — Add halo ring styles and keyframe

**Files:**
- Modify: `src/styles/aurora.css`

- [ ] **Step 1: Add halo styles after the `@media (hover: none)` cursor rule**

Insert after `@media (hover: none) { .cursor { display: none; } }`:

```css
/* ── Aurora halo ring ── */
@keyframes halo-expand {
  from { transform: translate(-50%, -50%) scale(0); opacity: .85; }
  to   { transform: translate(-50%, -50%) scale(1); opacity: 0;   }
}

.halo {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  animation: halo-expand 500ms ease-out forwards;
  /* aurora gradient ring: conic gradient masked to a ring shape */
  background: conic-gradient(
    from 0deg,
    #FACC92, #E5547D, #C73E8E, #6B4FBB, #4DCFE0, #FACC92
  );
  -webkit-mask:
    radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px));
  mask:
    radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px));
}
```

The mask technique: the radial gradient is transparent in the interior and white (opaque) in the outer 2px ring, revealing only the border of the conic gradient.

- [ ] **Step 2: Commit**

```bash
git add src/styles/aurora.css
git commit -m "style: add aurora halo ring keyframe and styles"
```

---

### Task 4: JS — Rewrite cursor (remove fangs, always follow pointer)

**Files:**
- Modify: `src/components/journal/AuroraEffects.tsx`

- [ ] **Step 1: Replace the file contents**

Replace `src/components/journal/AuroraEffects.tsx` entirely with:

```tsx
'use client'

import { useEffect } from 'react'

export function AuroraEffects() {
  useEffect(() => {
    document.documentElement.classList.add('js-ready')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleaners: Array<() => void> = []

    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
      // ── Cursor dot ──────────────────────────────────────────────────────────
      const cursorEl = document.createElement('div')
      cursorEl.className = 'cursor'
      document.body.appendChild(cursorEl)

      const interactive = 'a, button, [data-bite], input[type="submit"], input[type="button"], summary'
      let hovering = false

      const onMove = (e: PointerEvent) => {
        cursorEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }

      const onOver = (e: PointerEvent) => {
        const hit = !!(e.target as Element).closest(interactive)
        if (hit !== hovering) {
          hovering = hit
          cursorEl.classList.toggle('hover', hovering)
        }
      }

      const onOut = (e: PointerEvent) => {
        if (!hovering) return
        const movingTo = e.relatedTarget as Element | null
        if (!movingTo?.closest(interactive)) {
          hovering = false
          cursorEl.classList.remove('hover')
        }
      }

      const onDown  = () => cursorEl.classList.add('bite')
      const onUp    = () => cursorEl.classList.remove('bite')
      const onLeave = () => { cursorEl.style.opacity = '0' }
      const onEnter = () => { cursorEl.style.opacity = '1' }

      const opts = { passive: true } as const
      window.addEventListener('pointermove',   onMove,  opts)
      window.addEventListener('pointerover',   onOver,  opts)
      window.addEventListener('pointerout',    onOut,   opts)
      window.addEventListener('pointerdown',   onDown,  opts)
      window.addEventListener('pointerup',     onUp,    opts)
      window.addEventListener('pointercancel', onUp,    opts)
      window.addEventListener('pointerleave',  onLeave, opts)
      window.addEventListener('pointerenter',  onEnter, opts)

      cleaners.push(() => {
        window.removeEventListener('pointermove',   onMove)
        window.removeEventListener('pointerover',   onOver)
        window.removeEventListener('pointerout',    onOut)
        window.removeEventListener('pointerdown',   onDown)
        window.removeEventListener('pointerup',     onUp)
        window.removeEventListener('pointercancel', onUp)
        window.removeEventListener('pointerleave',  onLeave)
        window.removeEventListener('pointerenter',  onEnter)
        cursorEl.remove()
      })

      // ── Magnetic tilt — added in Task 5 ─────────────────────────────────────

      // ── Halo ring — added in Task 6 ─────────────────────────────────────────
    }

    return () => {
      cleaners.forEach(fn => fn())
      document.documentElement.classList.remove('js-ready')
    }
  }, [])

  return null
}
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Manual verify cursor**

Start the dev server (`npm run dev`). Open `localhost:3000`. Confirm:
- Cursor dot is always visible and follows the pointer exactly
- Hovering a link/card: dot grows and glows (no fangs)
- Clicking: dot briefly compresses
- Moving off all interactive elements: dot shrinks back

- [ ] **Step 4: Commit**

```bash
git add src/components/journal/AuroraEffects.tsx
git commit -m "refactor: rewrite cursor — dot always follows pointer, remove fangs"
```

---

### Task 5: JS — Add magnetic tilt to AuroraEffects

**Files:**
- Modify: `src/components/journal/AuroraEffects.tsx`

- [ ] **Step 1: Replace the tilt placeholder comment with the tilt block**

Find `// ── Magnetic tilt — added in Task 5 ─────────────────────────────────────` and replace it with:

```ts
      // ── Magnetic tilt ───────────────────────────────────────────────────────
      let tiltTarget: HTMLElement | null = null

      const onTiltMove = (e: MouseEvent) => {
        const card = (e.target as Element).closest('a.entry') as HTMLElement | null

        if (card !== tiltTarget) {
          // reset previous card immediately (CSS spring-back via transition)
          if (tiltTarget) {
            tiltTarget.style.transition = ''
            tiltTarget.style.transform  = ''
            tiltTarget.style.willChange = ''
          }
          tiltTarget = card
          if (card) {
            // disable transform transition while actively moving so it tracks instantly
            card.style.transition  = 'transform 0s, border-color .35s, background .35s'
            card.style.willChange  = 'transform'
          }
        }

        if (!card) return

        const rect  = card.getBoundingClientRect()
        const xNorm = ((e.clientX - rect.left) / rect.width  - 0.5) * 2  // -1 to 1
        const yNorm = ((e.clientY - rect.top)  / rect.height - 0.5) * 2  // -1 to 1
        card.style.transform = `perspective(800px) rotateY(${(xNorm * 6).toFixed(2)}deg) rotateX(${(-yNorm * 6).toFixed(2)}deg) scale(1.02)`
        card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width  * 100).toFixed(1)}%`)
        card.style.setProperty('--my', `${((e.clientY - rect.top)  / rect.height * 100).toFixed(1)}%`)
      }

      const onTiltReset = () => {
        if (!tiltTarget) return
        // restore CSS transition so spring-back animates over .5s
        tiltTarget.style.transition = ''
        tiltTarget.style.transform  = ''
        tiltTarget.style.willChange = ''
        tiltTarget = null
      }

      window.addEventListener('mousemove',  onTiltMove,  { passive: true })
      window.addEventListener('mouseleave', onTiltReset)

      cleaners.push(() => {
        window.removeEventListener('mousemove',  onTiltMove)
        window.removeEventListener('mouseleave', onTiltReset)
        if (tiltTarget) {
          tiltTarget.style.transition = ''
          tiltTarget.style.transform  = ''
          tiltTarget.style.willChange = ''
        }
      })
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Manual verify tilt**

On `localhost:3000`, hover over journal entry cards:
- Card tilts toward cursor (max ~6° on each axis)
- Specular highlight drifts to follow cursor within the card
- Moving cursor away: card springs back smoothly over ~0.5s
- Moving quickly between cards: no transform stuck on previous card

- [ ] **Step 4: Commit**

```bash
git add src/components/journal/AuroraEffects.tsx
git commit -m "feat: add magnetic 3D tilt to journal entry cards"
```

---

### Task 6: JS — Add aurora halo ring to AuroraEffects

**Files:**
- Modify: `src/components/journal/AuroraEffects.tsx`

- [ ] **Step 1: Replace the halo placeholder comment with the halo block**

Find `// ── Halo ring — added in Task 6 ─────────────────────────────────────────` and replace it with:

```ts
      // ── Aurora halo ring ────────────────────────────────────────────────────
      const HALO_LARGE = 180  // px — for a.entry cards
      const HALO_SMALL = 50   // px — for nav links, chips, buttons

      const onHaloEnter = (e: PointerEvent) => {
        const target = (e.target as Element).closest(interactive)
        if (!target) return
        const size = target.matches('a.entry') ? HALO_LARGE : HALO_SMALL
        const halo = document.createElement('span')
        halo.className = 'halo'
        halo.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;`
        document.body.appendChild(halo)
        halo.addEventListener('animationend', () => halo.remove(), { once: true })
      }

      document.body.addEventListener('pointerenter', onHaloEnter, { passive: true, capture: true })
      cleaners.push(() => {
        document.body.removeEventListener('pointerenter', onHaloEnter, { capture: true })
        // remove any in-flight halos
        document.querySelectorAll('.halo').forEach(h => h.remove())
      })
```

`capture: true` on `pointerenter` is required because `pointerenter` does not bubble — capture phase lets us intercept it on `document.body` before it reaches the target.

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Manual verify halo**

On `localhost:3000`:
- Hover a journal card: a large (~180px) aurora ring expands from cursor entry point and fades in ~500ms
- Hover a nav link: a small (~50px) ring fires
- Hover rapidly between elements: each entry fires one ring; no DOM accumulation (open DevTools → Elements, confirm no `.halo` spans persist after 600ms)
- Check no ring appears on non-interactive surfaces (text, backgrounds)

- [ ] **Step 4: Commit**

```bash
git add src/components/journal/AuroraEffects.tsx
git commit -m "feat: add aurora halo ring on interactive element entry"
```

---

### Task 7: Final verification

**Files:** None modified.

- [ ] **Step 1: Type-check**

```bash
npm run type-check
```

Expected: zero errors.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: zero errors or warnings introduced by these changes.

- [ ] **Step 3: Reduced-motion check**

In browser DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Reload `localhost:3000`. Confirm:
- Cursor dot still follows pointer (cursor is not disabled, just no tilt/halo/glow)
- No halo rings fire
- No card tilt on hover
- Cards still show background/border hover state (CSS-only, unaffected)

- [ ] **Step 4: Mobile / touch check**

Open DevTools device emulator (or check on phone). Confirm:
- Custom cursor is hidden (`.cursor { display: none }` via `@media (hover: none)`)
- Cards show normal CSS hover states (none — touch has no hover, which is correct)
- No JS errors in console

- [ ] **Step 5: Remove spec placeholder comments from AuroraEffects.tsx**

The two `// ── ... added in Task N` placeholder comments should now be replaced by real code from Tasks 5 and 6. Confirm neither placeholder string remains:

```bash
grep -n "added in Task" src/components/journal/AuroraEffects.tsx
```

Expected: zero matches.
