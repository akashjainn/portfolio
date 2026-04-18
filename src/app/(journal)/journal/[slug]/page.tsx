import { notFound } from 'next/navigation'
import { getJournalEntry, getJournalSlugs } from '@/lib/journal'
import { EntryHead } from '@/components/journal/EntryHead'
import { PressedSpecimen } from '@/components/journal/PressedSpecimen'
import { PullQuote } from '@/components/journal/PullQuote'
import { Figure } from '@/components/journal/Figure'
import { SectionHeading } from '@/components/journal/SectionHeading'

// No-op stubs for legacy MDX components that may appear in old content
function ModelViewer() { return null }
function VideoWithCaptions() { return null }
function Callout({ children }: { children: React.ReactNode }) { return <div>{children}</div> }
function Tldr({ children }: { children: React.ReactNode }) { return <div>{children}</div> }
function Diagram() { return null }
function MetricGrid() { return null }

export async function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = await getJournalEntry(params.slug)
  if (!entry) return { title: 'Entry Not Found' }
  return {
    title: entry.frontmatter.title.replace(/<[^>]+>/g, ''),
    description: entry.frontmatter.summary,
  }
}

export default async function JournalEntryPage({ params }: { params: { slug: string } }) {
  // Get metadata first to know the artifact type for PressedSpecimen
  const meta = await getJournalEntry(params.slug)
  if (!meta) notFound()

  const entry = await getJournalEntry(params.slug, {
    PressedSpecimen: () => <PressedSpecimen artifact={meta.frontmatter.artifact} />,
    PullQuote,
    Figure,
    SectionHeading,
    ModelViewer,
    VideoWithCaptions,
    Callout,
    Tldr,
    Diagram,
    MetricGrid,
  })
  if (!entry) notFound()

  const { frontmatter, compiledSource, readingTime } = entry

  return (
    <article style={{ padding: '0 var(--s-7)' }}>
      <EntryHead frontmatter={frontmatter} readingTime={readingTime} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '38.2% 1fr',
          gap: 'var(--s-7)',
          padding: 'var(--s-7) 0',
        }}
      >
        <aside
          style={{
            position: 'sticky',
            top: 'var(--s-7)',
            alignSelf: 'start',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            color: 'var(--ink-3)',
          }}
        >
          <p style={{ margin: '0 0 var(--s-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            At a glance
          </p>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{frontmatter.summary}</p>
        </aside>

        <div
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 18,
            lineHeight: 1.65,
            color: 'var(--ink)',
          }}
        >
          {compiledSource}
        </div>
      </div>
    </article>
  )
}
