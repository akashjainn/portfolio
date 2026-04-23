import Link from 'next/link'
import Image from 'next/image'
import '../styles/journal.css'
import { SiteNav } from '@/components/journal/SiteNav'
import { getAllJournalEntries } from '@/lib/journal'

export default async function Home() {
  const recentEntries = await getAllJournalEntries({ limit: 4 })

  return (
    <main className="page" id="main-content">
      <SiteNav />

      {/* Hero */}
      <section
        className="grid grid-cols-1 sm:grid-cols-[1fr_240px] gap-[var(--s-5)] sm:gap-[var(--s-7)]"
        style={{ alignItems: 'end', paddingBottom: 'var(--s-6)', borderBottom: '1px solid var(--ink)', marginBottom: 'var(--s-5)' }}
      >
        <div>
          <div className="note" style={{ textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 'var(--s-3)' }}>
            Atlanta, GA &middot; Spring 2026 &middot; Vol. I
          </div>
          <h1 className="masthead-title">
            I build <em>reliable</em> systems,<br />
            and I write down<br />
            what they taught me.
          </h1>
        </div>
        <aside style={{ textAlign: 'right', fontFamily: 'var(--mono)', fontSize: 'var(--t-note)', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.12em', lineHeight: 1.7 }}>
          Currently<br />
          <strong style={{ display: 'block', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--ink)', textTransform: 'none', letterSpacing: '-.005em', marginTop: 4, fontWeight: 400 }}>
            Interning at SpaceX
          </strong>
          on Starlink &middot; summer &apos;26
        </aside>
      </section>

      {/* Now strip */}
      <section style={{ padding: 'var(--s-5)', background: 'var(--cream-2)', border: '1px solid var(--ink)', display: 'grid', gridTemplateColumns: '140px 1fr', gap: 'var(--s-5)', marginBottom: 'var(--s-8)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--t-note)', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--terra)' }}>
          Now &middot; Apr 18
        </div>
        <div>
          <p>
            Rewriting <Link href="https://propsage-web.vercel.app/" target="_blank" rel="noopener noreferrer">PropSage</Link>&apos;s evidence overlay so the demo holds with the network cable unplugged. Reading about satellite routing on the side &mdash; partly because I&apos;ll be at SpaceX this summer, mostly because I&apos;ve found the subject fascinating for years.
          </p>
          <p className="note" style={{ margin: 0 }}>Updates weekly. If this line goes stale, the site is broken.</p>
        </div>
      </section>

      {/* Recent entries */}
      <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 28, margin: '0 0 var(--s-3)', letterSpacing: '-.005em' }}>
        Recent entries
      </h2>
      <div className="entries">
        {recentEntries.map((entry) => {
          const { frontmatter } = entry
          const dateStr = frontmatter.dateDisplay ?? new Date(frontmatter.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          const endStr = frontmatter.dateEnd ?? 'Present'
          const kindLabel = { case: 'Case study', specimen: 'Specimen', study: 'Personal study', playground: 'Playground' }[frontmatter.kind]
          return (
            <Link key={frontmatter.slug} className="entry" href={`/journal/${frontmatter.slug}`} style={{ display: 'grid', color: 'inherit', textDecoration: 'none', borderBottom: '1px solid var(--rule)' }}>
              <div className="dt">
                {dateStr} &mdash;<em>{endStr}</em>
              </div>
              <div className="hd">
                <h3>{frontmatter.headline ?? frontmatter.title.replace(/<[^>]+>/g, '')}</h3>
                <p>{frontmatter.summary}</p>
              </div>
              <div className="tags">
                <span>{kindLabel}</span>
                <span>{frontmatter.tags.slice(0, 2).join(' \u00B7 ')}</span>
                {frontmatter.tags[2] && <span>{frontmatter.tags[2]}</span>}
              </div>
            </Link>
          )
        })}
      </div>

      <p style={{ marginTop: 'var(--s-6)' }}>
        <Link href="/journal">See all entries &rarr;</Link>
      </p>

      {/* Colophon */}
      <section style={{ marginTop: 'var(--s-9)' }} className="ruled">
        <div className="grid-2">
          <aside className="gutter">
            Colophon<br />
            Source Serif 4<br />
            JetBrains Mono<br />
            Set on oak cream<br />
            Hand-lettered mark
          </aside>
          <div>
            <p className="lede">Written and built by Akash Jain in Atlanta. Source Serif 4 for prose, JetBrains Mono for metadata, a hand-lettered wordmark I drew myself. Everything here is a project, not a claim.</p>
            <p>
              Say hello: <Link href="mailto:akashjain1311@gmail.com">akashjain1311@gmail.com</Link>
              &nbsp;&middot;&nbsp;
              <Link href="https://github.com/akashjainn" target="_blank" rel="noopener noreferrer">github.com/akashjainn</Link>
              &nbsp;&middot;&nbsp;
              <Link href="https://www.linkedin.com/in/akash-jain-687673209/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
            </p>
          </div>
        </div>
      </section>

      <footer className="site-foot">
        <span>&copy; Akash Jain &middot; 2026</span>
        <span>Field Journal &middot; Vol. I</span>
        <span>Atlanta, GA</span>
      </footer>
    </main>
  )
}
