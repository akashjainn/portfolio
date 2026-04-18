interface PullQuoteProps {
  children: React.ReactNode
}

export function PullQuote({ children }: PullQuoteProps) {
  return (
    <blockquote className="pull-quote">
      {children}
    </blockquote>
  )
}
