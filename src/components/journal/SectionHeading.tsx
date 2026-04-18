interface SectionHeadingProps {
  num: string
  children: React.ReactNode
}

export function SectionHeading({ num, children }: SectionHeadingProps) {
  return (
    <h2 className="phase numbered" style={{ margin: 'var(--s-7) 0 var(--s-4)' }}>
      <span className="num">{num}</span>
      {children}
    </h2>
  )
}
