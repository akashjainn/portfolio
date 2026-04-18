import type { JournalFrontmatter } from '@/lib/journal'

interface EntryHeadProps {
  frontmatter: JournalFrontmatter
  readingTime: number
}

const KIND_LABELS: Record<JournalFrontmatter['kind'], string> = {
  case: 'Case study',
  specimen: 'Specimen',
  study: 'Personal study',
  playground: 'Playground',
}

export function EntryHead({ frontmatter, readingTime }: EntryHeadProps) {
  const { entryNo, kind, title, tags, publishedAt, updatedAt } = frontmatter
  const published = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <header
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        gap: 'var(--s-7)',
        padding: 'var(--s-8) 0 var(--s-7)',
        borderBottom: '1px solid var(--rule)',
        alignItems: 'end',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            color: 'var(--ink-3)',
            margin: '0 0 var(--s-4)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {KIND_LABELS[kind]} · No. {String(entryNo).padStart(2, '0')}
        </p>
        <h1
          className="entry-title"
          dangerouslySetInnerHTML={{ __html: title }}
          style={{ margin: 0 }}
        />
      </div>

      <dl className="kv" style={{ alignSelf: 'end' }}>
        <dt>Published</dt>
        <dd>{published}</dd>
        {updatedAt && (
          <>
            <dt>Updated</dt>
            <dd>
              {new Date(updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </dd>
          </>
        )}
        <dt>Reading time</dt>
        <dd>{readingTime} min</dd>
        {tags.slice(0, 4).map((tag) => (
          <dd
            key={tag}
            style={{
              gridColumn: '1 / -1',
              color: 'var(--ink-3)',
              fontSize: 11,
              paddingTop: 0,
            }}
          >
            #{tag}
          </dd>
        ))}
      </dl>
    </header>
  )
}
