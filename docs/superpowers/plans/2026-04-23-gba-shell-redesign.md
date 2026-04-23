# GBA Shell Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `GBAViewport.tsx` to produce a taller, more accurate Arctic Silver GBA shell with a proper D-pad cross, large 3D A/B buttons, angled Start/Select pills, speaker grille, and a Clean Hardware keyboard guide with Inline Label key hints.

**Architecture:** All changes are in a single file — `src/components/journal/GBAViewport.tsx`. Three module-level helper components (`DPad`, `GameButton`, `KeyboardGuide`) are defined above the exported `GBAViewport`. The EmulatorJS initialization logic and `JournalArtifact` prop are preserved exactly; only the JSX and styles change.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, inline styles (no Tailwind in this component — matches existing pattern)

---

## File Map

| File | Action |
|---|---|
| `src/components/journal/GBAViewport.tsx` | Full rewrite |
| `src/components/journal/__tests__/GBAViewport.test.tsx` | Create — new test file |

---

### Task 1: Write failing tests for GBAViewport

**Files:**
- Create: `src/components/journal/__tests__/GBAViewport.test.tsx`

- [ ] **Step 1: Create the test file**

```tsx
import { render, screen } from '@testing-library/react'
import { GBAViewport } from '../GBAViewport'
import type { JournalArtifact } from '@/lib/journal'

const artifact: JournalArtifact = {
  type: 'viewport',
  caption: 'Adventure Time GBA',
}

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

describe('GBAViewport', () => {
  beforeEach(() => {
    mockMatchMedia(false)
  })

  it('renders the GBA shell with correct aria-label', () => {
    render(<GBAViewport artifact={artifact} />)
    expect(screen.getByLabelText('Game Boy Advance')).toBeInTheDocument()
  })

  it('renders the #gba-player element for EmulatorJS', () => {
    render(<GBAViewport artifact={artifact} />)
    expect(document.getElementById('gba-player')).toBeInTheDocument()
  })

  it('shows keyboard guide on non-touch devices', () => {
    mockMatchMedia(false)
    render(<GBAViewport artifact={artifact} />)
    expect(screen.getByLabelText('Keyboard controls')).toBeInTheDocument()
  })

  it('hides keyboard guide on touch devices', () => {
    mockMatchMedia(true)
    render(<GBAViewport artifact={artifact} />)
    expect(screen.queryByLabelText('Keyboard controls')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — expect failures**

```bash
npm test -- --testPathPattern=GBAViewport --no-coverage
```

Expected: 4 tests, some may pass (shell/player already exist), keyboard guide tests fail because current guide has no `aria-label`. Confirm the test file loads without syntax errors.

---

### Task 2: Implement helper sub-components

**Files:**
- Modify: `src/components/journal/GBAViewport.tsx` (add `DPad` and `GameButton` above the export)

- [ ] **Step 1: Replace the entire file content with the new version**

The new file has three module-level components (`DPad`, `GameButton`, `KeyboardGuide`) followed by the existing `GBAViewport` export. Write the full file:

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import type { JournalArtifact } from '@/lib/journal'

interface GBAViewportProps {
  artifact: JournalArtifact
}

function DPad({ variant }: { variant: 'shell' | 'guide' }) {
  const size = variant === 'guide' ? 42 : 36
  const isGuide = variant === 'guide'

  const armStyle: React.CSSProperties = {
    width: size,
    height: size,
    background: isGuide
      ? 'linear-gradient(180deg, #c0bdb5, #8a8880)'
      : 'linear-gradient(180deg, #2a2a2a, #1a1a1a)',
    border: isGuide ? '2px solid #777' : '1px solid #3a3a3a',
    boxShadow: isGuide ? '0 3px 0 #555' : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isGuide ? '#333' : '#888',
    fontSize: size * 0.45,
    userSelect: 'none',
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `${size}px ${size}px ${size}px`,
        gridTemplateRows: `${size}px ${size}px ${size}px`,
      }}
      aria-hidden="true"
    >
      <div />
      <div style={{ ...armStyle, borderRadius: isGuide ? '8px 8px 0 0' : '4px 4px 0 0' }}>▲</div>
      <div />
      <div style={{ ...armStyle, borderRadius: isGuide ? '8px 0 0 8px' : '4px 0 0 4px' }}>◀</div>
      <div style={{
        width: size,
        height: size,
        background: isGuide ? '#999' : '#1a1a1a',
        border: isGuide ? '2px solid #777' : '1px solid #3a3a3a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: size * 0.28,
          height: size * 0.28,
          borderRadius: '50%',
          background: isGuide ? '#777' : '#333',
        }} />
      </div>
      <div style={{ ...armStyle, borderRadius: isGuide ? '0 8px 8px 0' : '0 4px 4px 0' }}>▶</div>
      <div />
      <div style={{ ...armStyle, borderRadius: isGuide ? '0 0 8px 8px' : '0 0 4px 4px' }}>▼</div>
      <div />
    </div>
  )
}

function GameButton({ label, color, size }: { label: string; color: 'red' | 'blue'; size: number }) {
  const isRed = color === 'red'
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: isRed
          ? 'radial-gradient(circle at 35% 30%, #d94f3f, #8B2E1A)'
          : 'radial-gradient(circle at 35% 30%, #4080d0, #2B4A8A)',
        border: `2px solid ${isRed ? '#6a1a0a' : '#1a2a6a'}`,
        boxShadow: isRed
          ? '0 4px 0 #5a1208, 0 6px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,160,140,0.4)'
          : '0 4px 0 #162258, 0 6px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(140,170,255,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.35,
        color: 'white',
        fontWeight: 900,
        fontFamily: 'Arial, sans-serif',
        userSelect: 'none',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {label}
    </div>
  )
}

function KeyboardGuide() {
  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    color: '#444',
    letterSpacing: '0.5px',
    fontFamily: 'Arial, sans-serif',
  }

  const shoulderBtnStyle: React.CSSProperties = {
    padding: '10px 18px',
    background: 'linear-gradient(180deg, #d0cfc8, #a8a6a0)',
    borderRadius: '8px 8px 4px 4px',
    border: '2px solid #888',
    boxShadow: '0 4px 0 #666, 0 6px 8px rgba(0,0,0,0.2)',
    fontSize: 14,
    fontWeight: 700,
    color: '#333',
    letterSpacing: '1px',
    fontFamily: 'Arial, sans-serif',
  }

  const pillBtnStyle: React.CSSProperties = {
    padding: '8px 20px',
    background: 'linear-gradient(180deg, #b8b5ae, #888680)',
    borderRadius: 20,
    border: '2px solid #777',
    boxShadow: '0 4px 0 #555, 0 6px 8px rgba(0,0,0,0.2)',
    fontSize: 10,
    fontWeight: 700,
    color: '#333',
    letterSpacing: '2px',
    fontFamily: 'Arial, sans-serif',
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 520,
        background: '#f0ede8',
        borderRadius: 12,
        padding: '20px 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
      aria-label="Keyboard controls"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* L shoulder */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={shoulderBtnStyle}>L</div>
          <span style={labelStyle}>A key</span>
        </div>

        {/* D-pad */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <DPad variant="guide" />
          <span style={labelStyle}>Arrow keys</span>
        </div>

        {/* B (left) A (right) — matches real GBA layout */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <GameButton label="B" color="blue" size={52} />
            <span style={labelStyle}>X key</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <GameButton label="A" color="red" size={52} />
            <span style={labelStyle}>Z key</span>
          </div>
        </div>

        {/* R shoulder */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={shoulderBtnStyle}>R</div>
          <span style={labelStyle}>S key</span>
        </div>
      </div>

      {/* SELECT / START */}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={pillBtnStyle}>SELECT</div>
          <span style={labelStyle}>Shift</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={pillBtnStyle}>START</div>
          <span style={labelStyle}>Enter</span>
        </div>
      </div>
    </div>
  )
}

export function GBAViewport({ artifact }: GBAViewportProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    setIsTouchDevice(isTouch)

    const w = window as unknown as Record<string, unknown>
    w.EJS_player = '#gba-player'
    w.EJS_core = 'gba'
    w.EJS_gameUrl = '/assets/adventuretime.gba'
    w.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/'
    w.EJS_VirtualGamepad = isTouch
    w.EJS_startOnLoaded = true
    w.EJS_Buttons = { playPause: false, restart: true, mute: true, settings: false, fullscreen: false }

    const script = document.createElement('script')
    script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js'
    document.body.appendChild(script)
    scriptRef.current = script

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current)
        scriptRef.current = null
      }
      for (const key of ['EJS_player', 'EJS_core', 'EJS_gameUrl', 'EJS_pathtodata', 'EJS_VirtualGamepad', 'EJS_startOnLoaded', 'EJS_Buttons']) {
        delete w[key]
      }
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* GBA shell — Arctic Silver, max 520px */}
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          background: 'linear-gradient(160deg, #d0cfc8 0%, #b0aea5 100%)',
          borderRadius: '14px 14px 28px 28px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
        aria-label="Game Boy Advance"
      >
        {/* Shoulder tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              padding: '8px 24px',
              background: 'linear-gradient(160deg, #b8b5ae, #8a8880)',
              borderRadius: '14px 0 8px 0',
              fontSize: 12,
              fontWeight: 700,
              fontFamily: 'monospace',
              color: '#444',
              letterSpacing: '1px',
            }}
            aria-hidden="true"
          >L</div>
          <div
            style={{
              padding: '8px 24px',
              background: 'linear-gradient(160deg, #b8b5ae, #8a8880)',
              borderRadius: '0 14px 0 8px',
              fontSize: 12,
              fontWeight: 700,
              fontFamily: 'monospace',
              color: '#444',
              letterSpacing: '1px',
            }}
            aria-hidden="true"
          >R</div>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 20px 28px' }}>
          {/* Screen bezel */}
          <div
            style={{
              background: '#1e1e1e',
              borderRadius: 10,
              padding: 6,
              marginBottom: 18,
              boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.1)',
              border: '2px solid #111',
            }}
          >
            <div
              id="gba-player"
              style={{
                width: '100%',
                aspectRatio: '3/2',
                background: '#000',
                borderRadius: 4,
                display: 'block',
                position: 'relative',
              }}
            />
          </div>

          {/* Controls row: D-pad · brand · A/B */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 4px',
              marginBottom: 14,
            }}
          >
            <DPad variant="shell" />

            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 8,
                color: 'rgba(0,0,0,0.35)',
                textAlign: 'center',
                letterSpacing: '2px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              GAME BOY<br />ADVANCE
            </div>

            {/* B left/lower, A right/higher — matches real GBA diagonal layout */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ paddingTop: 14 }}>
                <GameButton label="B" color="blue" size={44} />
              </div>
              <div style={{ paddingBottom: 14 }}>
                <GameButton label="A" color="red" size={44} />
              </div>
            </div>
          </div>

          {/* Start / Select */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 18 }}>
            {(['SELECT', 'START'] as const).map((btn) => (
              <div key={btn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div
                  style={{
                    fontSize: 7,
                    fontFamily: 'monospace',
                    color: 'rgba(0,0,0,0.4)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {btn}
                </div>
                <div
                  style={{
                    width: 52,
                    height: 13,
                    background: 'linear-gradient(180deg, #999, #777)',
                    borderRadius: 20,
                    border: '1px solid #666',
                    boxShadow: '0 3px 0 #555',
                    transform: 'rotate(-15deg)',
                  }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          {/* Speaker grille */}
          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: 5, paddingRight: 4 }}
            aria-hidden="true"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.18)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {!isTouchDevice && <KeyboardGuide />}
    </div>
  )
}
```

- [ ] **Step 2: Run tests — expect all 4 to pass**

```bash
npm test -- --testPathPattern=GBAViewport --no-coverage
```

Expected output:
```
PASS src/components/journal/__tests__/GBAViewport.test.tsx
  GBAViewport
    ✓ renders the GBA shell with correct aria-label
    ✓ renders the #gba-player element for EmulatorJS
    ✓ shows keyboard guide on non-touch devices
    ✓ hides keyboard guide on touch devices

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

If the touch-device tests are flaky: the `matchMedia` mock must be set **before** `render()`. The `beforeEach` sets the default, but `mockMatchMedia(true)` in the individual test runs before render, so ordering is correct. If still failing, check that `useState(false)` reads from `matchMedia` inside `useEffect` (it does — that's the existing pattern).

- [ ] **Step 3: Run full type check**

```bash
npm run type-check
```

Expected: no errors. If `React.CSSProperties` causes issues on `userSelect`, change `userSelect: 'none'` to `userSelect: 'none' as const`.

- [ ] **Step 4: Commit**

```bash
git add src/components/journal/GBAViewport.tsx src/components/journal/__tests__/GBAViewport.test.tsx
git commit -m "feat: redesign GBA shell — Arctic Silver, larger buttons, D-pad cross, keyboard guide"
```

---

### Task 3: Visual verification

**Files:**
- Read: `src/components/journal/GBAViewport.tsx` (verify no regressions)

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Open `http://localhost:3000` and navigate to the Adventure Time GBA journal entry.

- [ ] **Step 2: Verify shell visual checklist**

- [ ] L/R shoulder tabs appear at top-left and top-right corners of shell
- [ ] Shell is taller than before — body padding + speaker grille row adds height
- [ ] Screen bezel is dark (`#1e1e1e`) with visible inner shadow/bevel
- [ ] Screen area is wider (fills bezel, less padding than before)
- [ ] D-pad is a proper cross/plus shape — 4 directional arms + center nub
- [ ] A button (red, right/higher) and B button (blue, left/lower) are 44px circles with depth shadow
- [ ] SELECT and START are slim angled pill shapes with labels above
- [ ] Speaker grille dots appear at bottom-right

- [ ] **Step 3: Verify keyboard guide checklist**

Resize browser to desktop width (>768px) — keyboard guide should appear below the shell.

- [ ] D-pad is the hardware-style cross (light grey, depth shadow), labeled "Arrow keys"
- [ ] A (red, 52px) labeled "Z key", B (blue, 52px) labeled "X key"
- [ ] L labeled "A key", R labeled "S key"
- [ ] SELECT labeled "Shift", START labeled "Enter"
- [ ] All labels are 11px dark text — clearly readable against the `#f0ede8` background
- [ ] No label is cut off or overflowing

- [ ] **Step 4: Verify touch layout**

Open DevTools → toggle device emulation (any mobile preset). Keyboard guide should disappear. EmulatorJS virtual gamepad should overlay the screen.

- [ ] **Step 5: Run lint**

```bash
npm run lint
```

Expected: no errors.
