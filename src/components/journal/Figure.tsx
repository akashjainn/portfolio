interface FigureProps {
  children: React.ReactNode
  caption: string
  figLabel?: string
  source?: string
  aspectRatio?: string
}

export function Figure({ children, caption, figLabel = 'FIG.', source, aspectRatio }: FigureProps) {
  return (
    <figure
      className="figure"
      style={{
        margin: 'var(--s-7) 0',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {/* Media wrapper owns the aspect ratio */}
      <div
        style={{
          width: '100%',
          aspectRatio: aspectRatio ?? undefined,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {children}
      </div>

      {/* Caption sits outside the ratio-controlled box */}
      <figcaption className="cap" style={{ marginTop: 'var(--s-3)' }}>
        <span>{figLabel} — {caption}</span>
        {source && <span style={{ color: 'var(--ink-3)' }}>{source}</span>}
      </figcaption>
    </figure>
  )
}
