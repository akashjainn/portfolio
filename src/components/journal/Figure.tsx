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
    <figure className="figure">
      <div
        className="frame"
        style={{
          aspectRatio: aspectRatio ?? undefined,
          background: background ?? undefined,
        }}
      >
        {children}
      </div>
      <figcaption className="cap">
        <span>{figLabel ? `${figLabel} — ${caption}` : caption}</span>
        {metaText && <span>{metaText}</span>}
      </figcaption>
    </figure>
  )
}
