'use client'

import { useState } from 'react'
import type { JournalFrontmatter } from '@/lib/journal'

type Kind = JournalFrontmatter['kind'] | 'all'

const CHIPS: { kind: Kind; label: string }[] = [
  { kind: 'all',        label: 'All' },
  { kind: 'case',       label: 'Case study' },
  { kind: 'study',      label: 'Personal study' },
  { kind: 'specimen',   label: 'Specimen' },
]

interface FilterChipsProps {
  totalCount: number
  counts: Record<JournalFrontmatter['kind'], number>
}

export function FilterChips({ totalCount: _, counts: __ }: FilterChipsProps) {
  const [active, setActive] = useState<Kind>('all')

  function handleFilter(kind: Kind) {
    setActive(kind)
    const rows = document.querySelectorAll<HTMLElement>('#entries .entry')
    rows.forEach((row) => {
      const entryKind = row.getAttribute('data-kind')
      row.style.display = (kind === 'all' || entryKind === kind) ? '' : 'none'
    })
  }

  return (
    <div className="chips" role="group" aria-label="Filter entries">
      {CHIPS.map(({ kind, label }) => (
        <button
          key={kind}
          className="chip"
          aria-pressed={active === kind}
          onClick={() => handleFilter(kind)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
