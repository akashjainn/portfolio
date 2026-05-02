import Link from 'next/link'
import { NavPill } from '@/components/journal/NavPill'
import { getAllJournalEntries } from '@/lib/journal'
import type { JournalFrontmatter } from '@/lib/journal'

export const metadata = {
  title: 'Journal',
  description: 'Case studies, specimens, and personal study by Akash Jain.',
}

export default async function JournalPage() {
  const entries = await getAllJournalEntries()

  const kindLabel: Record<JournalFrontmatter['kind'], string> = {
    case: 'Case study',
    specimen: 'Specimen',
    study: 'Personal study',
    playground: 'Playground',
  }

  return (
    <main>
      <NavPill />
      <div className="entry-page">

        <header style={{ borderBottom: '1px solid var(--line)', paddingBottom: 'var(--s-7)', marginBottom: 'var(--s-7)' }}>
          <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>
            The Journal &middot; Vol. II &middot; {entries.length} entries
          </div>
          <h1 style={{ fontWeight: 200, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-.03em', lineHeight: 1.02, marginTop: 'var(--s-4)' }}>
            Entries, in reverse<br />
            chronological order.
          </h1>
        </header>

        <div className="entries" id="entries">
          {entries.map((entry) => {
            const { frontmatter: fm } = entry
            const dateStr = fm.dateDisplay ?? new Date(fm.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            const endStr = fm.dateEnd ?? 'Present'
            return (
              <Link
                key={fm.slug}
                className="entry"
                href={`/journal/${fm.slug}`}
              >
                <div className="when">
                  {dateStr} &mdash; <em>{endStr}</em>
                </div>
                <div>
                  <h3>{fm.headline ?? fm.title.replace(/<[^>]+>/g, '')}</h3>
                  <p>{fm.summary}</p>
                  <p style={{ marginTop: 'var(--s-2)', fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '.12em' }}>
                    {kindLabel[fm.kind]} &middot; {fm.tags.slice(0, 2).join(' · ')}
                  </p>
                </div>
                <div className="arrow" aria-hidden="true">&rarr;</div>
              </Link>
            )
          })}
        </div>

        <footer className="foot" style={{ marginTop: 'var(--s-9)' }}>
          <span>&copy; Akash Jain &middot; 2026</span>
          <span>Aurora &middot; Vol. II</span>
          <span>Atlanta, GA</span>
        </footer>

      </div>
    </main>
  )
}
