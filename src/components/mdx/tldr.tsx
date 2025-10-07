export function Tldr({ bullets }: { bullets: string[] }) {
  return (
    <div className="border rounded-lg p-4 bg-muted/40">
      <h3 className="text-sm font-semibold text-muted-foreground mb-2">TL;DR</h3>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  )
}
