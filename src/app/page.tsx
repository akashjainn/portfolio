import Link from 'next/link'
import '../styles/journal.css'
import { SiteNav } from '@/components/journal/SiteNav'
import { SiteFooter } from '@/components/journal/SiteFooter'
import { NowStrip } from '@/components/journal/NowStrip'
import { EntryRow } from '@/components/journal/EntryRow'
import { getAllJournalEntries } from '@/lib/journal'

export default async function Home() {
  const recentEntries = await getAllJournalEntries({ limit: 4 })

  return (
    <div className="journal-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteNav />
      <main id="main-content" style={{ flex: 1, padding: '0 var(--s-7)' }}>
        {/* Hero */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 240px',
            gap: 'var(--s-7)',
            padding: 'var(--s-8) 0 var(--s-7)',
            borderBottom: '1px solid var(--ink)',
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
              Atlanta, GA · Spring 2026 · Vol. I
            </p>
            <h1 className="masthead">
              A field journal of{' '}
              <em>software work</em>
            </h1>
          </div>
          <aside
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 13,
              color: 'var(--ink-2)',
              paddingBottom: 8,
            }}
          >
            <p style={{ margin: '0 0 var(--s-2)', color: 'var(--ink-3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Currently
            </p>
            <p style={{ margin: 0 }}>SpaceX / Starlink</p>
            <p style={{ margin: 'var(--s-1) 0 0', color: 'var(--ink-3)' }}>Reliability engineering</p>
          </aside>
        </section>

        {/* Now strip */}
        <NowStrip date="April 2026">
          Working on reliability tooling for satellite uplink scheduling. Writing about the gap between what latency graphs show and what users actually feel.
        </NowStrip>

        {/* Recent entries */}
        <section aria-labelledby="recent-entries-heading" style={{ marginBottom: 'var(--s-8)' }}>
          <h2
            id="recent-entries-heading"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              fontWeight: 400,
              color: 'var(--ink-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: '0 0 var(--s-4)',
            }}
          >
            Recent entries
          </h2>

          {recentEntries.map((entry) => (
            <EntryRow key={entry.frontmatter.slug} frontmatter={entry.frontmatter} />
          ))}

          <div style={{ marginTop: 'var(--s-6)' }}>
            <Link
              href="/journal"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 13,
                color: 'var(--terra-deep)',
                textDecoration: 'none',
              }}
            >
              See all entries →
            </Link>
          </div>
        </section>

        {/* Colophon */}
        <section
          aria-label="Colophon"
          className="grid-2 ruled"
          style={{ padding: 'var(--s-7) 0', borderTop: '1px solid var(--rule)' }}
        >
          <div
            style={{
              position: 'sticky',
              top: 'var(--s-7)',
              alignSelf: 'start',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 12,
              color: 'var(--ink-3)',
            }}
          >
            <p style={{ margin: '0 0 var(--s-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Colophon</p>
            <p style={{ margin: 0 }}>Source Serif 4 · JetBrains Mono</p>
            <p style={{ margin: 'var(--s-2) 0 0' }}>Next.js 14 · Deployed on Vercel</p>
          </div>
          <div>
            <p>
              I&apos;m a software engineer at Georgia Tech finishing a CS degree, spending most of my time thinking about systems that have to work when they can&apos;t afford not to — real-time messaging, satellite uplinks, distributed coordination.
            </p>
            <p>
              This journal is where I write down what I actually learned — including the three versions that failed before the one that shipped.
            </p>
            <p>
              If you want to see the work without reading about it, start with{' '}
              <Link href="/journal/statefarm-chat" style={{ color: 'var(--terra-deep)' }}>
                the State Farm entry
              </Link>
              {' '}or{' '}
              <Link href="/journal/propsage" style={{ color: 'var(--terra-deep)' }}>
                PropSage
              </Link>
              .
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 12,
                color: 'var(--ink-3)',
                marginTop: 'var(--s-6)',
              }}
            >
              — Akash Jain
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
