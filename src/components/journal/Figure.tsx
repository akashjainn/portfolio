interface FigureProps {
  children: React.ReactNode
  caption: string
  figLabel?: string
  source?: string
  aspectRatio?: string
}

export function Figure({ children, caption, figLabel, source, aspectRatio }: FigureProps) {
  return (
    <figure
      className="figure"
      style={{
        margin: 'var(--s-5) 0',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {/* Media wrapper owns the aspect ratio, fills full width */}
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

      {/* Caption sits below with CSS styling */}
      <figcaption className="cap">
        {figLabel && <span>{figLabel} — {caption}</span>}
        {!figLabel && <span>{caption}</span>}
        {source && <span style={{ color: 'var(--ink-3)' }}>{source}</span>}
      </figcaption>
    </figure>
  )
}
