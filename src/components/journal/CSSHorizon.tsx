import type { JournalArtifact } from '@/lib/journal'

interface CSSHorizonProps {
  artifact: JournalArtifact
}

export function CSSHorizon({ artifact: _ }: CSSHorizonProps) {
  return (
    <div
      style={{
        background: 'var(--cream)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        padding: 'var(--s-6)',
      }}
    >
      <style>{`
        @keyframes satellite-arc {
          0%   { offset-distance: 0%;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }

        @keyframes satellite-fade {
          0%,100% { opacity: 0.15; }
          50%     { opacity: 0.6; }
        }

        .horizon-arc {
          offset-path: path('M 40 120 Q 200 20 360 120');
          animation: satellite-arc 4s cubic-bezier(.25,.6,.6,1) infinite;
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--terra);
        }

        .horizon-arc:nth-child(2) { animation-delay: -1.3s; }
        .horizon-arc:nth-child(3) { animation-delay: -2.6s; }

        .horizon-trail {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
        }
      `}</style>

      <svg
        viewBox="0 0 400 160"
        style={{ width: '100%', maxWidth: 600, display: 'block' }}
        aria-label="CSS satellite-pass horizon animation"
        role="img"
      >
        {/* Earth horizon */}
        <path
          d="M 0 120 Q 200 160 400 120"
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1"
        />
        {/* Sky clearance window */}
        <path
          d="M 60 120 Q 200 40 340 120"
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Coverage arc label */}
        <text
          x="200"
          y="30"
          textAnchor="middle"
          fontFamily="var(--font-mono), monospace"
          fontSize="10"
          fill="var(--ink-3)"
        >
          sky window · 47°
        </text>
        {/* Obstruction zone label */}
        <text
          x="24"
          y="138"
          fontFamily="var(--font-mono), monospace"
          fontSize="9"
          fill="var(--ink-3)"
        >
          bearing 220°
        </text>
        {/* Bearing tick */}
        <line
          x1="60" y1="110"
          x2="60" y2="130"
          stroke="var(--danger)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Animated satellites */}
      <div className="horizon-trail" aria-hidden="true">
        <div className="horizon-arc" />
        <div className="horizon-arc" />
        <div className="horizon-arc" />
      </div>
    </div>
  )
}
