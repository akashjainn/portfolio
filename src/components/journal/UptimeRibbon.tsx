'use client'

import type { JournalArtifact } from '@/lib/journal'

const UPTIME_DAYS: number[] = [
  1,1,1,1,1,1,1,1,1,1,
  1,1,1,0.5,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,1,
]

interface UptimeRibbonProps {
  artifact: JournalArtifact
}

export function UptimeRibbon({ artifact: _ }: UptimeRibbonProps) {
  const width = 800
  const height = 60
  const barW = Math.floor(width / UPTIME_DAYS.length) - 2
  const barH = 40

  return (
    <div style={{ padding: 'var(--s-5)', background: 'var(--cream-2)', height: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label="30-day uptime ribbon"
        role="img"
      >
        {UPTIME_DAYS.map((status, i) => {
          const x = i * (barW + 2)
          const color =
            status === 1
              ? 'var(--success)'
              : status === 0.5
              ? 'var(--ochre)'
              : 'var(--danger)'
          const label =
            status === 1 ? 'Up' : status === 0.5 ? 'Degraded' : 'Down'

          return (
            <rect
              key={i}
              x={x}
              y={(height - barH) / 2}
              width={barW}
              height={barH}
              fill={color}
              rx={2}
              aria-label={`Day ${i + 1}: ${label}`}
            />
          )
        })}
      </svg>
      <p
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 11,
          color: 'var(--ink-3)',
          margin: 'var(--s-2) 0 0',
          display: 'flex',
          gap: 'var(--s-5)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: 'var(--success)', display: 'inline-block', borderRadius: 2 }} />
          Operational
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: 'var(--ochre)', display: 'inline-block', borderRadius: 2 }} />
          Degraded
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: 'var(--danger)', display: 'inline-block', borderRadius: 2 }} />
          Outage
        </span>
      </p>
    </div>
  )
}
