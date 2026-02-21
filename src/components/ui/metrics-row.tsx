import { MetricsBadge } from '@/components/ui/metrics-badge'

export type MetricItem = {
  label: string
  value: string | number
  unit?: string
  variant?: 'success' | 'warning' | 'error' | 'quality' | 'performance'
}

interface MetricsRowProps {
  metrics: MetricItem[]
  maxVisible?: number
  layout?: 'wrap' | 'grid'
  className?: string
}

/**
 * Unified metrics display component for both card variants
 * Renders metrics consistently using MetricsBadge component
 * - layout="wrap": flexible wrap for teaser cards
 * - layout="grid": fixed grid for executive summary
 */
export function MetricsRow({
  metrics,
  maxVisible = 4,
  layout = 'wrap',
  className = '',
}: MetricsRowProps) {
  if (!metrics || metrics.length === 0) {
    return null
  }

  const visibleMetrics = metrics.slice(0, maxVisible)
  const hasMoreMetrics = metrics.length > maxVisible

  const baseClasses = layout === 'wrap' 
    ? 'flex flex-wrap gap-2' 
    : 'grid grid-cols-2 gap-2'

  return (
    <div className={`${baseClasses} ${className}`}>
      {visibleMetrics.map((metric, idx) => (
        <MetricsBadge
          key={idx}
          label={metric.label}
          value={metric.value}
          unit={metric.unit}
          variant={metric.variant || 'quality'}
        />
      ))}
      {hasMoreMetrics && layout === 'wrap' && (
        <div className="inline-flex items-center rounded-full bg-muted/50 border border-border/50 px-3 py-1 text-xs font-medium text-foreground">
          +{metrics.length - maxVisible} more
        </div>
      )}
    </div>
  )
}
