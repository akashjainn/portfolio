"use client"

import { useEffect, useMemo, useState } from 'react'

type Heading = { id: string; text: string; level: number }

export function TableOfContents({ containerId = 'cs-content' }: { containerId?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const root = document.getElementById(containerId)
    if (!root) return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('h2, h3'))
    const list: Heading[] = nodes
      .filter((n) => n.id)
      .map((n) => ({ id: n.id, text: n.innerText, level: Number(n.tagName.replace('H', '')) }))
    setHeadings(list)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop)
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id)
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] }
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [containerId])

  const items = useMemo(() => headings, [headings])

  if (items.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="sticky top-24 max-h-[70vh] overflow-auto pr-2">
      <div className="text-xs font-semibold text-muted-foreground mb-2">On this page</div>
      <ul className="space-y-1">
        {items.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'ml-3' : ''}>
            <a
              href={`#${h.id}`}
              className={`block text-sm truncate hover:text-foreground transition-colors ${
                activeId === h.id ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
