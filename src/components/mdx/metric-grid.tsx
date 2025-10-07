type Item = { label: string; before?: string | number; after?: string | number }

export function MetricGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      {items.map((it, i) => (
        <div key={i} className="rounded-lg border p-3 bg-background/60">
          <div className="text-sm text-muted-foreground">{it.label}</div>
          <div className="mt-1 flex items-center gap-3">
            {it.before !== undefined && (
              <span className="text-xs bg-muted px-2 py-0.5 rounded">Before: <span className="font-semibold tabular-nums">{it.before}</span></span>
            )}
            {it.after !== undefined && (
              <span className="text-xs bg-muted px-2 py-0.5 rounded">After: <span className="font-semibold tabular-nums">{it.after}</span></span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
