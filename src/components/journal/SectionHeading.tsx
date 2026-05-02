interface SectionHeadingProps {
  /** aurora MDX uses n="01" */
  n?: string
  num?: string
  children: React.ReactNode
}

export function SectionHeading({ n, num, children }: SectionHeadingProps) {
  const numStr = n ?? num ?? ''
  return (
    <h2>
      {numStr && <span className="num">{numStr}</span>}
      {children}
    </h2>
  )
}
