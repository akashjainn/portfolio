import type { JournalArtifact } from '@/lib/journal'

interface GBAViewportProps {
  artifact: JournalArtifact
}

export function GBAViewport({ artifact: _ }: GBAViewportProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 'var(--s-5)',
        background: 'var(--cream-2)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 320,
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
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              aria-label="Adventure Time GBA gameplay footage"
            >
              <source src="/artifacts/adventuretime-gameplay.mp4" type="video/mp4" />
            </video>
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
      </div>
    </div>
  )
}
