import { getAllJournalEntries } from '@/lib/journal'
import { FilterChips } from '@/components/journal/FilterChips'
import { EntryList } from '@/components/journal/EntryList'
import { JKNav } from '@/components/journal/JKNav'
import type { JournalFrontmatter } from '@/lib/journal'

export const metadata = {
  title: 'Journal',
  description: 'Case studies, specimens, and personal study by Akash Jain.',
}

export default async function JournalPage({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  const entries = await getAllJournalEntries()

  // Server-side zero-JS fallback: filter via URL param
  const filterParam = searchParams.filter as JournalFrontmatter['kind'] | 'all' | undefined
  const filtered =
    filterParam && filterParam !== 'all'
      ? entries.filter((e) => e.frontmatter.kind === filterParam)
      : entries

  const counts: Record<JournalFrontmatter['kind'], number> = {
    case: 0,
    specimen: 0,
    study: 0,
    playground: 0,
  }
  entries.forEach((e) => {
    counts[e.frontmatter.kind] = (counts[e.frontmatter.kind] ?? 0) + 1
  })

  return (
    <div style={{ padding: 'var(--s-8) var(--s-7)' }}>
      <JKNav />

      {/* Kicker with entry count */}
      <p
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 var(--s-4)',
        }}
      >
        <span id="entry-count-display">{filtered.length}</span> entries
        {filterParam && filterParam !== 'all' && ` · filtered by ${filterParam}`}
      </p>

      <h1
        className="masthead"
        style={{ marginBottom: 'var(--s-7)', fontSize: 'clamp(36px, 4vw, 54px)', fontStyle: 'normal' }}
      >
        Field Journal
      </h1>

      {/* Filter chips */}
      <div style={{ marginBottom: 'var(--s-6)' }}>
        <FilterChips totalCount={entries.length} counts={counts} />
      </div>

      {/* Entry list */}
      {filtered.length > 0 ? (
        <EntryList entries={filtered} />
      ) : (
        <p
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 22,
            fontStyle: 'italic',
            color: 'var(--ink-2)',
            marginTop: 'var(--s-8)',
          }}
        >
          No entries in this category yet.
        </p>
      )}
    </div>
  )
}
