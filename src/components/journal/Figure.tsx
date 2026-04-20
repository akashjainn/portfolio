interface FigureProps {
  children: React.ReactNode
  caption: string
  figLabel?: string
  source?: string
  meta?: string
  aspectRatio?: string
  background?: string
}

export function Figure({ children, caption, figLabel, source, meta, aspectRatio, background }: FigureProps) {
  const metaText = source ?? meta
  return (
    <figure className="figure" style={{ margin: 'var(--s-5) 0' }}>
      <div style={{
        width: '100%',
        aspectRatio: aspectRatio ?? undefined,
        background: background,
      }}>
        {children}
      </div>
      <figcaption className="cap">
        <span>{figLabel ? `${figLabel} — ${caption}` : caption}</span>
        {metaText && <span>{metaText}</span>}
      </figcaption>
    </figure>
  )
}
