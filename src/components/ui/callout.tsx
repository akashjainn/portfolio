import { cn } from '@/lib/utils'

type CalloutType = 'info' | 'success' | 'warning' | 'danger' | 'decision'

export function Callout({ type = 'info', title, children }: { type?: CalloutType; title?: string; children: React.ReactNode }) {
  const styles: Record<CalloutType, string> = {
    info: 'border-blue-200 bg-blue-50 text-blue-800',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    warning: 'border-amber-200 bg-amber-50 text-amber-900',
    danger: 'border-red-200 bg-red-50 text-red-800',
    decision: 'border-purple-200 bg-purple-50 text-purple-800'
  }

  return (
    <div className={cn('border rounded-lg p-4 my-4', styles[type])}>
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
