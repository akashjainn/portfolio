# GBA In-Portfolio Emulator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder `GBAViewport` component with a working self-hosted EmulatorJS GBA emulator that auto-loads on mount, shows a styled GBA shell, and displays touch controls on mobile or a button-tile keyboard guide on desktop.

**Architecture:** EmulatorJS data files are copied from `node_modules/@emulatorjs/emulatorjs/data/` to `public/emulatorjs/` via a `postinstall` script. `GBAViewport.tsx` initializes EmulatorJS by setting `window.EJS_*` globals and appending `loader.js` to `document.body` inside a `useEffect`, then cleans up both on unmount. Touch detection via `window.matchMedia('(pointer: coarse)')` gates the keyboard guide.

**Tech Stack:** Next.js 14, React 18, TypeScript, EmulatorJS v4 (`@emulatorjs/emulatorjs`), Jest + `@testing-library/react`

---

## File Map

| File | Action |
|---|---|
| `jest.config.js` | Create — Next.js jest config |
| `jest.setup.ts` | Create — jest-dom matchers |
| `scripts/copy-emulatorjs.js` | Create — postinstall copy script |
| `package.json` | Modify — add dep, postinstall, test deps |
| `.gitignore` | Modify — add `public/emulatorjs/` |
| `next.config.mjs` | Modify — remove `emulatorjs.com` from CSP |
| `src/components/journal/GBAViewport.tsx` | Replace — full rewrite |
| `src/components/journal/GBAEmulator.tsx` | Delete |
| `src/components/journal/__tests__/GBAViewport.test.tsx` | Create — component tests |

---

## Task 1: Configure Jest

**Files:**
- Create: `jest.config.js`
- Create: `jest.setup.ts`
- Modify: `package.json`

- [ ] **Step 1: Install test dependencies**

```bash
cd "C:/Users/akash/Documents/portfolio"
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/testing-library__jest-dom
```

Expected: packages installed, no errors.

- [ ] **Step 2: Create `jest.config.js`**

```js
// jest.config.js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
})
```

- [ ] **Step 3: Create `jest.setup.ts`**

```ts
// jest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Verify Jest runs without errors**

```bash
npm test -- --passWithNoTests
```

Expected output includes: `Test Suites: 0 passed` (no failures).

- [ ] **Step 5: Commit**

```bash
git add jest.config.js jest.setup.ts package.json package-lock.json
git commit -m "chore: configure jest with testing-library"
```

---

## Task 2: Install EmulatorJS + postinstall copy script

**Files:**
- Create: `scripts/copy-emulatorjs.js`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install EmulatorJS**

```bash
npm install --save-dev @emulatorjs/emulatorjs
```

Expected: package installed. `node_modules/@emulatorjs/emulatorjs/data/` directory now exists containing `loader.js` and a `cores/` directory.

- [ ] **Step 2: Create copy script at `scripts/copy-emulatorjs.js`**

```js
// scripts/copy-emulatorjs.js
const fs = require('fs')
const path = require('path')

const src = path.join(__dirname, '..', 'node_modules', '@emulatorjs', 'emulatorjs', 'data')
const dest = path.join(__dirname, '..', 'public', 'emulatorjs')

if (!fs.existsSync(src)) {
  console.error('ERROR: @emulatorjs/emulatorjs not found. Run: npm install --save-dev @emulatorjs/emulatorjs')
  process.exit(1)
}

if (fs.existsSync(dest)) {
  console.log('public/emulatorjs/ already exists, skipping copy')
  process.exit(0)
}

fs.cpSync(src, dest, { recursive: true })
console.log('EmulatorJS data copied to public/emulatorjs/')
```

- [ ] **Step 3: Add `postinstall` to `package.json` scripts block**

In `package.json`, add `"postinstall": "node scripts/copy-emulatorjs.js"` to the `"scripts"` object:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "lint:fix": "next lint --fix",
  "type-check": "tsc --noEmit",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:a11y": "playwright test tests/accessibility",
  "test:e2e": "playwright test tests/e2e",
  "lighthouse": "lighthouse http://localhost:3000 --output-path ./lighthouse-report.html --view",
  "lighthouse:ci": "lhci autorun",
  "analyze": "ANALYZE=true next build",
  "perf:audit": "npm run build && npm run lighthouse",
  "a11y:audit": "npm run test:a11y -- --headed",
  "postinstall": "node scripts/copy-emulatorjs.js"
},
```

- [ ] **Step 4: Add `public/emulatorjs/` to `.gitignore`**

Append to `.gitignore`:
```
public/emulatorjs/
```

- [ ] **Step 5: Run postinstall to populate the public directory**

```bash
node scripts/copy-emulatorjs.js
```

Expected: `EmulatorJS data copied to public/emulatorjs/` — then verify:

```bash
ls public/emulatorjs/
```

Expected: `loader.js` and `cores/` (and other assets) are present.

- [ ] **Step 6: Commit**

```bash
git add scripts/copy-emulatorjs.js package.json package-lock.json .gitignore
git commit -m "chore: add EmulatorJS self-hosted assets via postinstall"
```

---

## Task 3: Remove legacy code + update CSP

**Files:**
- Delete: `src/components/journal/GBAEmulator.tsx`
- Modify: `next.config.mjs`

- [ ] **Step 1: Delete `GBAEmulator.tsx`**

```bash
rm src/components/journal/GBAEmulator.tsx
```

- [ ] **Step 2: Remove `emulatorjs.com` from CSP in `next.config.mjs`**

Find the `frame-src` line in `next.config.mjs`:
```
"frame-src 'self' https://www.youtube.com https://player.mux.com https://propsage-web.vercel.app https://stocksense-taupe.vercel.app https://land-safe.vercel.app https://www.emulatorjs.com http://localhost:3000 http://localhost:3001",
```

Replace it with (removing `https://www.emulatorjs.com`):
```
"frame-src 'self' https://www.youtube.com https://player.mux.com https://propsage-web.vercel.app https://stocksense-taupe.vercel.app https://land-safe.vercel.app http://localhost:3000 http://localhost:3001",
```

- [ ] **Step 3: Verify TypeScript still compiles**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/journal/GBAEmulator.tsx next.config.mjs
git commit -m "chore: remove legacy GBAEmulator stub and emulatorjs.com CSP entry"
```

---

## Task 4: Write failing tests for GBAViewport

**Files:**
- Create: `src/components/journal/__tests__/GBAViewport.test.tsx`

- [ ] **Step 1: Create test file**

```tsx
// src/components/journal/__tests__/GBAViewport.test.tsx
import { render, screen } from '@testing-library/react'
import { GBAViewport } from '../GBAViewport'

const mockArtifact = {
  type: 'viewport' as const,
  caption: 'FIG. 3 — GBA viewport, playable build',
  aspectRatio: '3/2',
}

function mockPointer(coarse: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockReturnValue({ matches: coarse }),
  })
}

beforeEach(() => {
  jest.spyOn(document.body, 'appendChild')
  jest.spyOn(document.body, 'removeChild')
})

afterEach(() => {
  jest.restoreAllMocks()
  delete (window as any).EJS_core
  delete (window as any).EJS_gameUrl
  delete (window as any).EJS_player
  delete (window as any).EJS_pathtodata
  delete (window as any).EJS_VirtualGamepad
  delete (window as any).EJS_Buttons
})

it('renders the GBA shell', () => {
  mockPointer(false)
  render(<GBAViewport artifact={mockArtifact} />)
  expect(screen.getByLabelText('Game Boy Advance viewport')).toBeInTheDocument()
})

it('renders gba-screen div as emulator mount point', () => {
  mockPointer(false)
  render(<GBAViewport artifact={mockArtifact} />)
  expect(document.getElementById('gba-screen')).toBeInTheDocument()
})

it('shows keyboard guide on desktop (pointer: fine)', () => {
  mockPointer(false)
  render(<GBAViewport artifact={mockArtifact} />)
  expect(screen.getByLabelText('Keyboard controls')).toBeInTheDocument()
})

it('hides keyboard guide on touch device (pointer: coarse)', () => {
  mockPointer(true)
  render(<GBAViewport artifact={mockArtifact} />)
  expect(screen.queryByLabelText('Keyboard controls')).not.toBeInTheDocument()
})

it('keyboard guide contains all 6 button tiles', () => {
  mockPointer(false)
  render(<GBAViewport artifact={mockArtifact} />)
  const guide = screen.getByLabelText('Keyboard controls')
  expect(guide.querySelectorAll('[data-tile]')).toHaveLength(6)
})

it('sets EJS globals on mount', () => {
  mockPointer(false)
  render(<GBAViewport artifact={mockArtifact} />)
  expect((window as any).EJS_core).toBe('gba')
  expect((window as any).EJS_gameUrl).toBe('/assets/adventuretime.gba')
  expect((window as any).EJS_pathtodata).toBe('/emulatorjs/')
})

it('appends loader.js script to body on mount', () => {
  mockPointer(false)
  render(<GBAViewport artifact={mockArtifact} />)
  expect(document.body.appendChild).toHaveBeenCalledWith(
    expect.objectContaining({ tagName: 'SCRIPT' })
  )
})

it('removes loader script and deletes EJS globals on unmount', () => {
  mockPointer(false)
  const { unmount } = render(<GBAViewport artifact={mockArtifact} />)
  unmount()
  expect(document.body.removeChild).toHaveBeenCalled()
  expect((window as any).EJS_core).toBeUndefined()
  expect((window as any).EJS_gameUrl).toBeUndefined()
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm test -- GBAViewport --no-coverage
```

Expected: FAIL — `Cannot find module '../GBAViewport'` or similar import error since the component doesn't have the new implementation yet.

- [ ] **Step 3: Commit failing tests**

```bash
git add src/components/journal/__tests__/GBAViewport.test.tsx
git commit -m "test: add failing tests for new GBAViewport emulator component"
```

---

## Task 5: Implement new GBAViewport

**Files:**
- Replace: `src/components/journal/GBAViewport.tsx`

- [ ] **Step 1: Overwrite `GBAViewport.tsx` with the new implementation**

```tsx
// src/components/journal/GBAViewport.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import type { JournalArtifact } from '@/lib/journal'

declare global {
  interface Window {
    EJS_player: string
    EJS_core: string
    EJS_gameUrl: string
    EJS_pathtodata: string
    EJS_VirtualGamepad: boolean
    EJS_Buttons: Record<string, boolean>
  }
}

interface GBAViewportProps {
  artifact: JournalArtifact
}

const BUTTON_TILES = [
  { label: '↑↓←→', sub: 'Arrow keys', bg: '#4a4a4a', fg: '#fff' },
  { label: 'A', sub: 'Z key', bg: '#8B2E1A', fg: '#fff' },
  { label: 'B', sub: 'X key', bg: '#2B4A8A', fg: '#fff' },
  { label: 'START', sub: 'Enter', bg: '#e0dbd4', fg: '#444' },
  { label: 'SELECT', sub: 'Shift', bg: '#e0dbd4', fg: '#444' },
  { label: 'L / R', sub: 'A / S keys', bg: '#e0dbd4', fg: '#444' },
]

export function GBAViewport({ artifact }: GBAViewportProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const [isTouch, setIsTouch] = useState<boolean | null>(null)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)

    window.EJS_player = '#gba-screen'
    window.EJS_core = 'gba'
    window.EJS_gameUrl = '/assets/adventuretime.gba'
    window.EJS_pathtodata = '/emulatorjs/'
    window.EJS_VirtualGamepad = true
    window.EJS_Buttons = {
      playPause: false,
      restart: true,
      mute: true,
      settings: false,
      fullscreen: false,
    }

    const script = document.createElement('script')
    script.src = '/emulatorjs/loader.js'
    document.body.appendChild(script)
    scriptRef.current = script

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current)
        scriptRef.current = null
      }
      delete (window as any).EJS_player
      delete (window as any).EJS_core
      delete (window as any).EJS_gameUrl
      delete (window as any).EJS_pathtodata
      delete (window as any).EJS_VirtualGamepad
      delete (window as any).EJS_Buttons
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 'var(--s-5)',
        background: 'var(--cream-2)',
        gap: 'var(--s-4)',
        minWidth: 0,
      }}
    >
      {/* GBA shell */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 360,
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
          <div
            id="gba-screen"
            style={{
              aspectRatio: '3/2',
              background: '#000',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          />
        </div>

        {/* D-pad + branding + face buttons row */}
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
            {(['B', 'A'] as const).map((btn) => (
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

      {/* Desktop keyboard guide — hidden on touch */}
      {isTouch === false && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
            maxWidth: 360,
          }}
          aria-label="Keyboard controls"
        >
          {BUTTON_TILES.map(({ label, sub, bg, fg }) => (
            <div
              key={label}
              data-tile={label}
              style={{
                background: bg,
                borderRadius: 4,
                padding: '6px 12px',
                textAlign: 'center',
                minWidth: 52,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-mono), monospace',
                  color: fg,
                  fontWeight: 'bold',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: 8,
                  fontFamily: 'var(--font-mono), monospace',
                  color: fg,
                  opacity: 0.7,
                  marginTop: 2,
                }}
              >
                {sub}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Run tests — confirm they pass**

```bash
npm test -- GBAViewport --no-coverage
```

Expected: all 8 tests PASS.

- [ ] **Step 3: Run type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/journal/GBAViewport.tsx
git commit -m "feat: implement GBAViewport with self-hosted EmulatorJS"
```

---

## Task 6: Manual browser verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Open the journal entry in browser**

Navigate to: `http://localhost:3000/journal/adventuretime-gba`

Scroll to the `PressedSpecimen` artifact section (after "Implementation Highlights").

- [ ] **Step 3: Verify emulator loads**

Expected:
- GBA shell renders immediately
- EmulatorJS loads inside `#gba-screen` (may take a few seconds for WASM to download)
- Game ROM loads and Adventure Time game starts
- On desktop: button tile keyboard guide is visible below the shell
- No console errors relating to CSP or missing assets

- [ ] **Step 4: Verify mobile layout (browser devtools)**

Open Chrome DevTools → toggle device toolbar → select a phone preset (e.g. iPhone 12 Pro).

Expected:
- Button tile guide is **not** visible
- EmulatorJS virtual gamepad (on-screen D-pad + buttons) overlays the screen

- [ ] **Step 5: Final commit**

```bash
git add -p  # stage any fixups
git commit -m "feat: GBA in-portfolio emulator — EmulatorJS self-hosted with GBA shell and adaptive controls"
```
