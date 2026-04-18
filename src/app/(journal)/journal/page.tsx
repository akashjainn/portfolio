import Link from 'next/link'
import { SiteNav } from '@/components/journal/SiteNav'
import { FilterChips } from '@/components/journal/FilterChips'
import { JKNav } from '@/components/journal/JKNav'
import { getAllJournalEntries } from '@/lib/journal'
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
  const filterParam = searchParams.filter as string | undefined
  const filtered =
    filterParam && filterParam !== 'all'
      ? entries.filter((e) => e.frontmatter.kind === (filterParam as JournalFrontmatter['kind']))
      : entries

  const counts: Record<JournalFrontmatter['kind'], number> = { case: 0, specimen: 0, study: 0, playground: 0 }
  entries.forEach((e) => { counts[e.frontmatter.kind] = (counts[e.frontmatter.kind] ?? 0) + 1 })

  const kindLabel: Record<JournalFrontmatter['kind'], string> = {
    case: 'Case study',
    specimen: 'Specimen',
    study: 'Personal study',
    playground: 'Playground',
  }

  return (
    <main className="page" id="main-content">
      <SiteNav />
      <JKNav />

      <header style={{ borderBottom: '1px solid var(--ink)', paddingBottom: 'var(--s-5)', marginBottom: 'var(--s-5)' }}>
        <div className="note" style={{ textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 'var(--s-3)' }}>
          The Field Journal &middot; Vol. I &middot; {entries.length} entries
        </div>
        <h1 className="masthead-title" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
          Entries, in reverse<br />chronological order.
        </h1>
      </header>

      <FilterChips totalCount={entries.length} counts={counts} />

      <div className="entries" id="entries">
        {filtered.map((entry) => {
          const { frontmatter: fm } = entry
          const dateStr = fm.dateDisplay ?? new Date(fm.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          const endStr = fm.dateEnd ?? 'Present'
          return (
            <Link
              key={fm.slug}
              className="entry"
              href={`/journal/${fm.slug}`}
              data-kind={fm.kind}
              style={{ display: 'grid', color: 'inherit', textDecoration: 'none' }}
              tabIndex={0}
            >
              <div className="dt">
                {dateStr} &mdash;<em>{endStr}</em>
              </div>
              <div className="hd">
                <h3>{fm.headline ?? fm.title.replace(/<[^>]+>/g, '')}</h3>
                <p>{fm.summary}</p>
              </div>
              <div className="tags">
                <span>{kindLabel[fm.kind]}</span>
                <span>{fm.tags.slice(0, 2).join(' · ')}</span>
                {fm.tags[2] && <span>{fm.tags[2]}</span>}
              </div>
            </Link>
          )
        })}
        {filtered.length === 0 && (
          <p style={{ fontFamily: 'var(--serif)', fontSize: 22, fontStyle: 'italic', color: 'var(--ink-2)', marginTop: 'var(--s-8)' }}>
            No entries in this category yet.
          </p>
        )}
      </div>

      <footer className="site-foot">
        <span>&copy; Akash Jain &middot; 2026</span>
        <span>Field Journal &middot; Vol. I</span>
        <span>Atlanta, GA</span>
      </footer>
    </main>
  )
}
