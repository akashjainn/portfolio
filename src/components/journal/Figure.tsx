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
      style={{
        margin: 0,
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

      {/* Caption sits below with its own padding/styling */}
      <figcaption className="cap">
        {figLabel && <span>{figLabel} — {caption}</span>}
        {!figLabel && <span>{caption}</span>}
        {source && <span style={{ color: 'var(--ink-3)' }}>{source}</span>}
      </figcaption>
    </figure>
  )
}
