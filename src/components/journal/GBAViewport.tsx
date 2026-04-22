'use client'

import { useEffect, useRef, useState } from 'react'
import type { JournalArtifact } from '@/lib/journal'

interface GBAViewportProps {
  artifact: JournalArtifact
}

const BUTTON_TILES = [
  { label: '↑↓←→', key: 'Arrows', bg: '#444' },
  { label: 'A', key: 'Z', bg: '#8B2E1A' },
  { label: 'B', key: 'X', bg: '#2B4A8A' },
  { label: 'START', key: 'Enter', bg: '#555' },
  { label: 'SELECT', key: 'Shift', bg: '#555' },
  { label: 'L', key: 'A', bg: '#555' },
  { label: 'R', key: 'S', bg: '#555' },
]

export function GBAViewport({ artifact }: GBAViewportProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)

    const w = window as unknown as Record<string, unknown>
    w.EJS_player = '#gba-player'
    w.EJS_core = 'gba'
    w.EJS_gameUrl = '/assets/adventuretime.gba'
    w.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/'
    w.EJS_VirtualGamepad = true
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
      for (const key of ['EJS_player', 'EJS_core', 'EJS_gameUrl', 'EJS_pathtodata', 'EJS_VirtualGamepad', 'EJS_Buttons']) {
        delete w[key]
      }
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* GBA shell — fills the figure's content width */}
      <div
        style={{
          width: '100%',
          background: '#B0A89A',
          borderRadius: '16px 16px 24px 24px',
          padding: '20px 20px 40px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          boxSizing: 'border-box',
        }}
        aria-label="Game Boy Advance"
      >
        {/* Screen bezel */}
        <div style={{ background: '#2A2A2A', borderRadius: 8, padding: 8, marginBottom: 16 }}>
          <div
            id="gba-player"
            style={{
              aspectRatio: '3/2',
              width: '100%',
              background: '#000',
              borderRadius: 4,
              overflow: 'hidden',
              display: 'block',
            }}
          />
        </div>

        {/* Controls row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
          <div style={{ width: 48, height: 48, background: '#888', borderRadius: 4, flexShrink: 0 }} aria-hidden="true" />
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
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }} aria-hidden="true">
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

      {/* Desktop keyboard guide */}
      {!isTouchDevice && (
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}
          aria-label="Keyboard controls"
        >
          {BUTTON_TILES.map(({ label, key, bg }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div
                style={{
                  background: bg,
                  color: 'white',
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono), monospace',
                  minWidth: 36,
                  textAlign: 'center',
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 9, color: 'var(--ink-3)' }}>{key}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
