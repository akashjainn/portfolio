import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/journal/SiteNav'
import { getJournalEntry, getJournalSlugs } from '@/lib/journal'
import { PressedSpecimen } from '@/components/journal/PressedSpecimen'
import { PullQuote } from '@/components/journal/PullQuote'
import { Figure } from '@/components/journal/Figure'
import { SectionHeading } from '@/components/journal/SectionHeading'
import type { JournalKvPair } from '@/lib/journal'

// No-op stubs for legacy MDX components
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
  const { frontmatter: fm } = entry
  return {
    title: fm.headline ?? fm.title.replace(/<[^>]+>/g, ''),
    description: fm.summary,
  }
}

export default async function JournalEntryPage({ params }: { params: { slug: string } }) {
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

  const { frontmatter: fm, compiledSource, readingTime } = entry

  const kindLabel: Record<string, string> = {
    case: 'Case study',
    specimen: 'Specimen',
    study: 'Personal study',
    playground: 'Playground',
  }

  const footerLabel = `Entry No. ${String(fm.entryNo).padStart(2, '0')} · ${fm.headline ?? fm.title.replace(/<[^>]+>/g, '')}`

  return (
    <main className="page" id="main-content">
      <SiteNav />

      {/* proj-head */}
      <div className="proj-head">
        <div>
          <div className="kicker">
            {fm.kicker ?? `Entry No. ${String(fm.entryNo).padStart(2, '0')} · ${kindLabel[fm.kind]}`}
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: fm.titleHtml ?? fm.title }} />
        </div>
        <dl className="kv">
          {(fm.kvPairs ?? []).map((kv: JournalKvPair) => (
            <div key={kv.key}>
              <dt>{kv.key}</dt>
              <dd>
                {kv.href ? (
                  <Link href={kv.href} target="_blank" rel="noopener noreferrer">
                    {kv.value}
                  </Link>
                ) : kv.value}
              </dd>
            </div>
          ))}
          {!fm.kvPairs && (
            <>
              <div><dt>Published</dt><dd>{new Date(fm.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</dd></div>
              <div><dt>Reading</dt><dd>{readingTime} min</dd></div>
            </>
          )}
        </dl>
      </div>

      {/* proj-body */}
      <div className="proj-body">
        <aside className="gutter">
          {fm.contents && (
            <>
              <h5>Contents</h5>
              <p dangerouslySetInnerHTML={{ __html: fm.contents.replace(/\n/g, '<br/>') }} />
            </>
          )}
          {fm.atAGlance && (
            <>
              <h5 style={{ marginTop: fm.contents ? 'var(--s-5)' : 0 }}>At a glance</h5>
              <p>{fm.atAGlance}</p>
            </>
          )}
          {!fm.contents && !fm.atAGlance && (
            <p style={{ fontStyle: 'italic' }}>{fm.summary}</p>
          )}
        </aside>

        <div className="main">
          {compiledSource}
          <p style={{ marginTop: 'var(--s-6)' }}>
            <Link href="/journal">&larr; Back to the journal</Link>
          </p>
        </div>
      </div>

      <footer className="site-foot">
        <span>&copy; Akash Jain &middot; 2026</span>
        <span>{footerLabel}</span>
        <span>Atlanta, GA</span>
      </footer>
    </main>
  )
}
