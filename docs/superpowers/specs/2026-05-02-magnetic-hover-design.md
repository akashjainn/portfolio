# Magnetic Tilt + Halo Cursor System

**Date:** 2026-05-02
**Status:** Approved

## Overview

Replace the current "bite cursor" (four corner fangs that frame the hovered element) with a magnetic 3D tilt system plus an aurora halo ring. The cursor remains a visible glowing dot at all times. Hover is communicated through element physics (tilt) and a transient ring animation rather than a persistent custom cursor overlay.

## 1. Cursor

**Current behavior to remove:**
- On hover: cursor snaps to element center, resizes to cover element bounds, four fang triangles appear
- On click: fangs close in ("bite")
- On non-hover: 5px dot follows pointer

**New behavior:**
- Dot always follows the actual pointer position — never snaps to element center
- Default state: 5px glowing white dot with aurora drop-shadow
- Hover state: dot scales to 9px, glow intensifies (box-shadow radius increases)
- Click state: dot briefly compresses to ~6px via a short CSS transition then springs back to 9px
- The four `.fang` span elements are removed from the DOM entirely
- All `.hover` and `.bite` fang CSS is removed; `.cursor.hover` only affects the dot scale/glow

**Implementation scope:**
- `AuroraEffects.tsx`: remove fang DOM creation, remove snap-to-element `setCursor` calls on hover, keep `onMove` always writing actual pointer coords, simplify `onOver`/`onOut` to only toggle a `.hover` class for dot scaling
- `aurora.css`: remove all `.cursor .fang` rules and `.cursor.hover .fang` rules; update `.cursor.hover::before` to scale + glow

## 2. Magnetic 3D Tilt (cards)

**Target elements:** `a.entry` (journal entry cards)

**Behavior:**
- On `mousemove` within a card: compute cursor position normalized to −1…+1 on both axes relative to card bounds
- Apply `perspective(800px) rotateY(xNorm * 6deg) rotateX(-yNorm * 6deg) scale(1.02)` to the card
- A specular highlight (radial gradient pseudo-element, white, low opacity ~0.08) is positioned via CSS custom properties `--mx` / `--my` set inline by JS, drifting to follow the cursor — simulates a light source
- On `mouseleave`: transition back to `rotateX(0) rotateY(0) scale(1)` over 400ms via CSS `transition: transform 0.4s ease`
- `transform-style: preserve-3d` is NOT needed (no 3D children); `will-change: transform` is set only while hovered, removed on leave to avoid layer promotion cost

**Implementation scope:**
- `AuroraEffects.tsx`: add `initTilt()` function, attach `mousemove` and `mouseleave` listeners to all `a.entry` elements via event delegation on the `#entries` container
- `aurora.css`: add `a.entry::after` specular highlight pseudo-element; add tilt transition

**Exclusions:** Nav links, chips, buttons — too small, tilt would look jittery.

## 3. Aurora Halo Ring

**Trigger:** `mouseenter` on any interactive element (`a`, `button`, `[data-bite]`, `.chip`)

**Behavior:**
- On entry: a `<span class="halo">` is injected into `document.body` at `position: fixed`, centered at the pointer's entry coordinates
- The span animates from `scale(0), opacity(0.9)` to `scale(1), opacity(0)` over 500ms via a CSS keyframe (`@keyframes halo-expand`)
- After the animation ends (`animationend` event), the span is removed from the DOM
- The ring visual: a circle with `border: 1.5px solid transparent`, `background: conic-gradient(aurora colors) border-box`, transparent fill — aurora colors rotating around the ring
- Size: `180px × 180px` for cards, `50px × 50px` for small targets (nav links, chips). Size is determined by checking if the target matches `a.entry`

**Implementation scope:**
- `AuroraEffects.tsx`: add `initHalo()` function, one `pointerenter` listener on `document.body` (event delegation)
- `aurora.css`: add `.halo` base styles and `@keyframes halo-expand`
- The CSS keyframe is added once; no per-element style injection

**Performance:** Halo spans exist in the DOM only during their 500ms animation. `pointer-events: none` always. No rAF loops.

## 4. Links, Nav, Chips

No changes to hover behavior beyond what already exists (aurora gradient text on hover for links). The halo ring fires on these elements at 50px size. No tilt applied.

## 5. Reduced Motion

All new animations (tilt, halo, cursor glow pulse) respect `prefers-reduced-motion: reduce`:
- Tilt: disabled entirely (no transform applied)
- Halo: disabled entirely (no span injected)
- Cursor: dot still follows pointer but no scale/glow transition

This is already handled by the existing `reduced` check in `AuroraEffects.tsx`.

## Files Changed

| File | Change |
|---|---|
| `src/components/journal/AuroraEffects.tsx` | Rewrite cursor logic; add tilt and halo init functions |
| `src/styles/aurora.css` | Remove fang rules; update cursor hover rules; add tilt + specular + halo styles |
