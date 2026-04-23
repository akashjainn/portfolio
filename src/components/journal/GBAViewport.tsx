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
    userSelect: 'none' as const,
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
        userSelect: 'none' as const,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {label}
    </div>
  )
}

const keyHint: React.CSSProperties = {
  fontSize: 9,
  fontFamily: 'monospace',
  color: 'rgba(0,0,0,0.38)',
  letterSpacing: '0.5px',
  userSelect: 'none' as const,
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
              padding: '6px 24px 8px',
              background: 'linear-gradient(160deg, #b8b5ae, #8a8880)',
              borderRadius: '14px 0 8px 0',
              fontFamily: 'monospace',
              color: '#444',
              letterSpacing: '1px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
            aria-hidden="true"
          >
            <span style={{ fontSize: 12, fontWeight: 700 }}>L</span>
            <span style={keyHint}>A key</span>
          </div>
          <div
            style={{
              padding: '6px 24px 8px',
              background: 'linear-gradient(160deg, #b8b5ae, #8a8880)',
              borderRadius: '0 14px 0 8px',
              fontFamily: 'monospace',
              color: '#444',
              letterSpacing: '1px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
            aria-hidden="true"
          >
            <span style={{ fontSize: 12, fontWeight: 700 }}>R</span>
            <span style={keyHint}>S key</span>
          </div>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <DPad variant="shell" />
              <span style={keyHint}>Arrows</span>
            </div>

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
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, marginTop: 14 }}>
                <GameButton label="B" color="blue" size={44} />
                <span style={keyHint}>X key</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <GameButton label="A" color="red" size={44} />
                <span style={keyHint}>Z key</span>
              </div>
            </div>
          </div>

          {/* Start / Select */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 18 }}>
            {([
              { btn: 'SELECT', key: 'Shift' },
              { btn: 'START', key: 'Enter' },
            ] as const).map(({ btn, key }) => (
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
                <span style={{ ...keyHint, marginTop: 4 }}>{key}</span>
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

    </div>
  )
}
