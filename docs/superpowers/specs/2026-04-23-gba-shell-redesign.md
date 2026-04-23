# GBA Shell Redesign — Design Spec
**Date:** 2026-04-23

## Overview

Redesign `GBAViewport.tsx` to produce a more accurate, taller GBA shell with a retro hardware feel. Arctic Silver color scheme, larger buttons throughout, a proper D-pad cross, and a Clean Hardware keyboard guide with Inline Label key hints.

---

## Decisions

| Topic | Decision |
|---|---|
| Shell color | Arctic Silver — `linear-gradient(160deg, #d0cfc8, #b0aea5)` |
| Shell size | maxWidth 480px → 520px; increased vertical padding; bottom speaker grille row added |
| Shoulder tabs | L/R tabs rendered at top-left and top-right corners of shell |
| A/B in shell | Enlarged 20px → 44px circles with radial gradient and 3D depth shadow |
| D-pad in shell | Proper CSS cross/plus layout (three-column grid) replacing the plain square |
| Start/Select in shell | Pill-shaped, slightly angled, larger than current |
| Keyboard guide buttons | Clean Hardware style: light grey tones, 3D pressed-depth shadow |
| D-pad in keyboard guide | Full cross layout — 4 directional keys + center nub |
| A/B in keyboard guide | 52px circles with depth effect matching shell buttons |
| Key labels | Inline Label: 11px dark text, no badge background |
| Speaker grille | Dot-grid decorative row at bottom of shell |

---

## Shell Structure

```
┌──────────────────────────────────┐
│  [L tab]              [R tab]    │  ← shoulder tabs at top corners
│  ┌────────────────────────────┐  │
│  │  ╔══════════════════════╗  │  │
│  │  ║                      ║  │  │  ← screen bezel (dark, inner shadow)
│  │  ║   gba-player div     ║  │  │
│  │  ║   (3:2 aspect ratio) ║  │  │
│  │  ╚══════════════════════╝  │  │
│  └────────────────────────────┘  │
│                                  │
│  [D-pad]  GAME BOY ADVANCE  [AB] │  ← controls row
│                                  │
│       [SELECT]  [START]          │  ← pill buttons, angled
│                                  │
│  · · · · · · · · · · · · · · ·  │  ← speaker grille dots
└──────────────────────────────────┘
```

### Shell Styling
- Background: `linear-gradient(160deg, #d0cfc8 0%, #b0aea5 100%)`
- Border radius: `14px 14px 28px 28px`
- Padding: `0 0 28px` (shoulder tabs handle top spacing)
- Box shadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)`
- maxWidth: `520px`

### Shoulder Tabs (L / R)
- Rendered in a flex row at the very top of the shell: `justify-content: space-between`, each tab flush with the left/right edge
- Shape: wider on the outer edge — `border-radius: 8px 8px 0 0` on the outer corner, `0 0 0 0` on the inner corner (tabs butt against the shell body)
- Background: same shell gradient, 10% darker (`#b0ada5` → `#8a8880`)
- Box shadow: `0 -3px 6px rgba(0,0,0,0.15)` giving slight upward lift
- Text: "L" / "R" in 12px bold monospace, `color: #444`

### Screen Bezel
- Background: `#1e1e1e`
- Border radius: `10px`
- Padding: `6px` (reduced from 10px to give more screen real-estate)
- Box shadow: `inset 0 3px 8px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.1)`
- Inner bevel ring: `border: 2px solid #111` on the bezel div
- Screen div itself: `aspect-ratio: 3/2`, `width: 100%` — fills the full bezel width so it appears larger within the taller shell

### D-pad (in shell)
- Three-column CSS grid, 3×3 cells where corners are empty
- Each arm: `36px × 36px`, background `#222`, border `1px solid #3a3a3a`
- Radius per arm: rounded on the outer edge only
- Center cell: `#1a1a1a` with a small circle nub

### A/B Buttons (in shell)
- Size: `44px × 44px` circles
- A: `radial-gradient(circle at 35% 30%, #d94f3f, #8B2E1A)`, border `2px solid #6a1a0a`, `box-shadow: 0 4px 0 #5a1208, 0 6px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,160,140,0.4)`
- B: `radial-gradient(circle at 35% 30%, #4080d0, #2B4A8A)`, border `2px solid #1a2a6a`, `box-shadow: 0 4px 0 #162258, 0 6px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(140,170,255,0.4)`
- Letter: 16px bold white, centered

### Start/Select (in shell)
- Shape: pill (`border-radius: 20px`)
- Size: `~56px × 14px` — wide and slim
- Background: `linear-gradient(180deg, #999, #777)`
- Border: `1px solid #666`
- Box shadow: `0 3px 0 #555`
- Transform: `rotate(-15deg)` to match real GBA hardware angle
- Text label above each pill: "START" / "SELECT" in 7px monospace, muted

### Brand Text
- "GAME BOY" on line 1, "ADVANCE" on line 2
- Font: monospace, 8px, letter-spacing 2px
- Color: `rgba(0,0,0,0.35)`
- Position: centered between D-pad and A/B

### Speaker Grille
- Row of small dots at bottom of shell interior
- Dot: `5px × 5px`, `border-radius: 50%`, `background: rgba(0,0,0,0.2)`
- ~10 dots in a row with `gap: 5px`

---

## Keyboard Guide (desktop only)

Rendered below the shell. Background: `#f0ede8` (matches shell tone). Border radius `12px`. Padding `20px 24px`.

### Layout
```
[L]   [▲]          [A] [B]   [R]
    [◀][·][▶]
      [▼]
        [SELECT] [START]
```

All groups centered horizontally. L/R shoulder tabs flank the D-pad and A/B.

### D-pad
- Same three-column grid as shell D-pad but larger: `42px × 42px` arms
- Background: `linear-gradient(180deg, #c0bdb5, #8a8880)`
- Border: `2px solid #777`
- Box shadow (bottom): `0 3px 0 #555`
- Rounded outer corners per arm (`border-radius` on outer edge only)
- Center nub: `10px` circle in `#777`
- Label below: `"Arrow keys"` — 11px, `color: #444`, `font-weight: 700`

### A/B Buttons
- Size: `52px × 52px`
- Same radial gradient, border, and box-shadow as shell buttons (slightly larger)
- Bottom shadow: `0 5px 0 <darker>`
- Label below each: `"Z key"` / `"X key"` — 11px, `color: #444`, `font-weight: 700`

### L/R Shoulder Buttons
- Rectangular: `padding: 10px 18px`
- Background: `linear-gradient(180deg, #d0cfc8, #a8a6a0)`
- Border radius: `8px 8px 4px 4px`
- Box shadow: `0 4px 0 #666`
- Label below: `"A key"` / `"S key"` — 11px, `color: #444`, `font-weight: 700`

### SELECT / START
- Pill shape: `border-radius: 20px`, `padding: 8px 20px`
- Background: `linear-gradient(180deg, #b8b5ae, #888680)`
- Border: `2px solid #777`, box shadow: `0 4px 0 #555`
- Label below: `"Shift"` / `"Enter"` — 11px, `color: #444`, `font-weight: 700`

---

## File Changes

| File | Action |
|---|---|
| `src/components/journal/GBAViewport.tsx` | Full rewrite — shell + keyboard guide redesign |

No other files change. EmulatorJS init logic, cleanup, and `artifact` prop are preserved exactly.

---

## Out of Scope

- Touch/mobile virtual gamepad (unchanged — EmulatorJS handles it)
- Save states, fullscreen, audio controls
- Any other journal entries or components
