import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MetricsBadgeProps {
  label: string
  value: string | number
  unit?: string
  variant?: 'performance' | 'accessibility' | 'quality' | 'success' | 'warning' | 'error'
  icon?: ReactNode
  className?: string
  description?: string
}

const variantStyles = {
  performance: 'bg-blue-50 border-blue-200 text-blue-700',
  accessibility: 'bg-green-50 border-green-200 text-green-700',
  quality: 'bg-purple-50 border-purple-200 text-purple-700',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  warning: 'bg-amber-50 border-amber-200 text-amber-700',
  error: 'bg-red-50 border-red-200 text-red-700'
}

export function MetricsBadge({
  label,
  value,
  unit,
  variant = 'performance',
  icon,
  className,
  description
}: MetricsBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm',
        variantStyles[variant],
        className
      )}
      title={description}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <div className="flex flex-col items-center min-w-0">
        <div className="font-semibold tabular-nums">
          {value}
          {unit && <span className="font-normal ml-0.5">{unit}</span>}
        </div>
        <div className="text-xs opacity-80 truncate">{label}</div>
      </div>
    </div>
  )
}

// Specialized metric badges for common use cases
export function LighthouseMetricsBadge({ 
  performance, 
  accessibility, 
  bestPractices, 
  seo, 
  className 
}: {
  performance?: number
  accessibility?: number
  bestPractices?: number
  seo?: number
  className?: string
}) {
  const getVariant = (score: number) => {
    if (score >= 90) return 'success'
    if (score >= 50) return 'warning'
    return 'error'
  }

  const metrics = [
    { label: 'Performance', value: performance, key: 'perf' },
    { label: 'Accessibility', value: accessibility, key: 'a11y' },
    { label: 'Best Practices', value: bestPractices, key: 'bp' },
    { label: 'SEO', value: seo, key: 'seo' }
  ].filter(metric => metric.value !== undefined)

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {metrics.map(({ label, value, key }) => (
        <MetricsBadge
          key={key}
          label={label}
          value={value!}
          unit="/100"
          variant={getVariant(value!)}
        />
      ))}
    </div>
  )
}

export function CoreWebVitalsBadge({
  lcp,
  fid,
  cls,
  className
}: {
  lcp?: number
  fid?: number
  cls?: number
  className?: string
}) {
  const getLCPVariant = (value: number) => {
    if (value <= 2500) return 'success'
    if (value <= 4000) return 'warning'
    return 'error'
  }

  const getFIDVariant = (value: number) => {
    if (value <= 100) return 'success'
    if (value <= 300) return 'warning'
    return 'error'
  }

  const getCLSVariant = (value: number) => {
    if (value <= 0.1) return 'success'
    if (value <= 0.25) return 'warning'
    return 'error'
  }

  const metrics = [
    { 
      label: 'LCP', 
      value: lcp, 
      unit: 'ms', 
      variant: lcp ? getLCPVariant(lcp) : undefined,
      key: 'lcp'
    },
    { 
      label: 'FID', 
      value: fid, 
      unit: 'ms', 
      variant: fid ? getFIDVariant(fid) : undefined,
      key: 'fid'
    },
    { 
      label: 'CLS', 
      value: cls, 
      unit: '', 
      variant: cls ? getCLSVariant(cls) : undefined,
      key: 'cls'
    }
  ].filter(metric => metric.value !== undefined)

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {metrics.map(({ label, value, unit, variant, key }) => (
        <MetricsBadge
          key={key}
          label={label}
          value={value!}
          unit={unit}
          variant={variant as any}
        />
      ))}
    </div>
  )
}