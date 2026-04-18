interface NowStripProps {
  date: string
  children: React.ReactNode
}

export function NowStrip({ date, children }: NowStripProps) {
  return (
    <div className="inset-box" style={{ margin: 'var(--s-7) 0' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          paddingTop: '2px',
        }}
      >
        {date}
      </div>
      <div style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  )
}
