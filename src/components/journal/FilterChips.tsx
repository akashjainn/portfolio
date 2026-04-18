'use client'

import { useState, useRef } from 'react'
import { WoodcutIcon } from './WoodcutIcon'
import type { JournalFrontmatter } from '@/lib/journal'

type Kind = JournalFrontmatter['kind'] | 'all'

const CHIPS: { kind: Kind; label: string; icon: React.ComponentProps<typeof WoodcutIcon>['name'] }[] = [
  { kind: 'all',        label: 'All',            icon: 'journal' },
  { kind: 'case',       label: 'Case study',     icon: 'case-study' },
  { kind: 'specimen',   label: 'Specimen',       icon: 'specimen' },
  { kind: 'study',      label: 'Personal study', icon: 'personal-study' },
  { kind: 'playground', label: 'Playground',     icon: 'playground' },
]

interface FilterChipsProps {
  totalCount: number
  counts: Record<JournalFrontmatter['kind'], number>
}

export function FilterChips({ totalCount, counts }: FilterChipsProps) {
  const [active, setActive] = useState<Kind>('all')
  const counterRef = useRef<HTMLSpanElement>(null)

  function handleFilter(kind: Kind) {
    setActive(kind)

    // Toggle entry rows via CSS data attribute — no React re-render of entries
    const rows = document.querySelectorAll<HTMLElement>('[data-entry-kind]')
    rows.forEach((row) => {
      if (kind === 'all' || row.dataset.entryKind === kind) {
        row.style.display = ''
      } else {
        row.style.display = 'none'
      }
    })

    // Update counter display
    if (counterRef.current) {
      const count = kind === 'all' ? totalCount : (counts[kind as JournalFrontmatter['kind']] ?? 0)
      counterRef.current.textContent = String(count)
    }
  }

  return (
    <>
      <span
        ref={counterRef}
        id="filter-count"
        aria-live="polite"
        aria-atomic="true"
        style={{ display: 'none' }}
      />
      <div className="chip-row" role="group" aria-label="Filter entries by kind">
        {CHIPS.map(({ kind, label, icon }) => (
          <button
            key={kind}
            className="chip"
            aria-pressed={active === kind}
            onClick={() => handleFilter(kind)}
          >
            <WoodcutIcon name={icon} size={14} />
            {label}
          </button>
        ))}
      </div>
    </>
  )
}
