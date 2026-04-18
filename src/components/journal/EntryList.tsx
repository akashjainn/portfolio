import { EntryRow } from './EntryRow'
import type { JournalFrontmatter } from '@/lib/journal'

interface EntryListProps {
  entries: { frontmatter: JournalFrontmatter }[]
}

export function EntryList({ entries }: EntryListProps) {
  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.frontmatter.slug} data-entry-kind={entry.frontmatter.kind}>
          <EntryRow frontmatter={entry.frontmatter} />
        </div>
      ))}
    </div>
  )
}
