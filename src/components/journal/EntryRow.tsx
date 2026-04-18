import Link from 'next/link'
import { WoodcutIcon } from './WoodcutIcon'
import type { JournalFrontmatter } from '@/lib/journal'

type KindIconName = 'case-study' | 'specimen' | 'personal-study' | 'playground'

const KIND_ICONS: Record<JournalFrontmatter['kind'], KindIconName> = {
  case: 'case-study',
  specimen: 'specimen',
  study: 'personal-study',
  playground: 'playground',
}

const KIND_LABELS: Record<JournalFrontmatter['kind'], string> = {
  case: 'Case study',
  specimen: 'Specimen',
  study: 'Personal study',
  playground: 'Playground',
}

interface EntryRowProps {
  frontmatter: JournalFrontmatter
}

export function EntryRow({ frontmatter }: EntryRowProps) {
  const { slug, entryNo, kind, title, summary, publishedAt } = frontmatter
  const year = new Date(publishedAt).getFullYear()

  return (
    <Link href={`/journal/${slug}`} className="entry-row" style={{ display: 'grid' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          paddingTop: 4,
        }}
      >
        <span style={{ display: 'block' }}>No. {String(entryNo).padStart(2, '0')}</span>
        <span style={{ display: 'block', marginTop: 4 }}>{year}</span>
      </div>

      <div>
        <h3
          className="entry-heading"
          style={{ margin: '0 0 var(--s-2)' }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="small"
          style={{ color: 'var(--ink-2)', margin: 0, maxWidth: '54ch' }}
        >
          {summary}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--s-2)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          justifyContent: 'flex-end',
        }}
      >
        <WoodcutIcon name={KIND_ICONS[kind]} size={16} />
        <span>{KIND_LABELS[kind]}</span>
      </div>
    </Link>
  )
}
