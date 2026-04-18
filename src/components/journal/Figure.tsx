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
        aspectRatio: aspectRatio ?? undefined,
        position: 'relative',
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
      <figcaption className="cap">
        <span>{figLabel} — {caption}</span>
        {source && <span style={{ color: 'var(--ink-3)' }}>{source}</span>}
      </figcaption>
    </figure>
  )
}
