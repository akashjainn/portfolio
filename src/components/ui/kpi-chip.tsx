import { cn } from '@/lib/utils'

interface KpiChipProps {
  label: string
  value: string | number
  suffix?: string
  href?: string
  className?: string
}

export function KpiChip({ label, value, suffix, href, className }: KpiChipProps) {
  const content = (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium',
        'bg-background/70 backdrop-blur-sm border-border/60 text-foreground',
        'transition-colors hover:bg-muted/60',
        'kpi-chip'
      )}
      aria-label={`${label}: ${value}${suffix ?? ''}`}
    >
      <span className="font-semibold tabular-nums">
        {value}
        {suffix && <span className="ml-0.5">{suffix}</span>}
      </span>
      <span className="opacity-80">{label}</span>
    </span>
  )

  if (href) {
    return (
      <a href={href} className={cn('no-underline', className)} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}
