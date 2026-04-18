import type { JournalArtifact } from '@/lib/journal'

interface GBAViewportProps {
  artifact: JournalArtifact
}

export function GBAViewport({ artifact }: GBAViewportProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 'var(--s-5)',
        background: 'var(--cream-2)',
        minWidth: 0,
      }}
    >
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
          {/* Screen */}
          <div
            style={{
              aspectRatio: '3/2',
              background: '#000',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                color: '#EEE',
                fontSize: '14px',
                textAlign: 'center',
                padding: '20px',
              }}
            >
              <div>
                <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#999' }}>Playable GBA Emulator</p>
                <p style={{ margin: 0 }}>Visit{' '}<a href="https://github.com/akashjainn/adventureTimeGame" target="_blank" rel="noopener noreferrer" style={{ color: '#0ea' }}>github.com/akashjainn/adventureTimeGame</a></p>
                <p style={{ margin: '10px 0 0 0', fontSize: '12px' }}>to play in browser or on original hardware</p>
              </div>
            </div>
          </div>
        </div>

        {/* D-pad placeholder */}
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
              position: 'relative',
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
            {['B', 'A'].map((btn) => (
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

        <div
          style={{
            fontSize: 'var(--t-note)',
            color: 'var(--ink-3)',
            textAlign: 'center',
            marginTop: 'var(--s-3)',
          }}
        >
          Use arrow keys or WASD to move • Z to jump • X to interact
        </div>
      </div>
    </div>
  )
}
