import Link from 'next/link'
import { NavPill } from '@/components/journal/NavPill'
import { getAllJournalEntries } from '@/lib/journal'

export default async function Home() {
  const recentEntries = await getAllJournalEntries({ limit: 5 })

  return (
    <main>
      <NavPill />

      <div className="shell">

        {/* ── Hero ── */}
        <section className="hero">
          {/* Iridescent bitten-A, drifting */}
          <div className="hero-mark" aria-hidden="true">
            <svg viewBox="0 0 200 200" width="100%" height="100%">
              <defs>
                <linearGradient id="halo" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor="#FACC92" />
                  <stop offset="32%"  stopColor="#E5547D" />
                  <stop offset="56%"  stopColor="#C73E8E" />
                  <stop offset="78%"  stopColor="#6B4FBB" />
                  <stop offset="100%" stopColor="#4DCFE0" />
                </linearGradient>
              </defs>
              <path
                fill="url(#halo)"
                fillRule="evenodd"
                d="M100 25 L114 72 L97 82 L121 92 L104 102 L127 112 L111 122 L134 132 L145 175 L55 175 Z M90 120 L110 120 L125 175 L75 175 Z"
              />
            </svg>
          </div>

          <div className="hero-content">
            <div className="meta">
              <span className="eyebrow">Atlanta, GA &middot; Spring 2026 &middot; Vol. II</span>
              <span className="dots" aria-hidden="true">
                <i /><i /><i /><i /><i />
              </span>
            </div>

            <h1>
              I build <em className="aurora-text">reliable</em> systems,<br />
              and I write down<br />
              what they taught me.
            </h1>

            <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="currently">
                <span className="label">Currently</span>
                <span className="who">Interning at SpaceX</span>
                <span className="when">on Starlink &middot; summer &apos;26</span>
              </div>
              <div style={{ fontSize: 15, color: 'var(--fg-2)', maxWidth: '36ch' }}>
                Computer science at Georgia Tech, third year. I write down what each system teaches me &mdash; slowly, in the open.
              </div>
            </div>
          </div>
        </section>

        {/* ── Now strip ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="now glass">
            <div>
              <span className="when">Now &middot; May 02, 2026</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                <span className="pulse" aria-hidden="true" />
                <span className="note" style={{ color: 'var(--fg-2)', letterSpacing: '.1em' }}>Live &middot; weekly</span>
              </span>
            </div>
            <p>
              Wrapped <Link href="/journal/stupid-together">Stupid Together</Link>, an AI anime short I directed solo in ComfyUI &mdash; LoRA-trained characters, 90s OVA style, sixteen shots. Reading about satellite routing on the side &mdash; SpaceX internship starts in 2 weeks.
            </p>
            <div className="dots" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          </div>
        </section>

        {/* ── Journal entries ── */}
        <section id="journal" className="section">
          <div className="label-row">
            <span className="eyebrow">The Journal &middot; {recentEntries.length} entries</span>
            <span className="eyebrow">&#8595; scroll</span>
          </div>
          <h2 style={{ fontSize: 'var(--t-h2)', marginBottom: 'var(--s-7)', maxWidth: '22ch' }}>
            Entries, in reverse chronological order.
          </h2>

          <div className="entries" id="entries">
            {recentEntries.map((entry) => {
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
                  </div>
                  <div className="arrow" aria-hidden="true">&rarr;</div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── Colophon ── */}
        <section className="colophon">
          <aside className="gutter">
            <h5>Colophon</h5>
            Inter Tight &middot; 200<br />
            JetBrains Mono &middot; 11px<br />
            Aurora gradient<br />
            Built on glass<br />
            Vol. II &middot; 2026
          </aside>
          <div>
            <p className="lede">
              Written and built by Akash Jain in Atlanta. Aurora is the second volume of this journal &mdash; same words, lit differently. The bitten-A logo is mine; the aurora is borrowed from real ones, drifting low and slow over the polar circles.
            </p>
            <p style={{ color: 'var(--fg-2)' }}>
              Say hello: <Link href="mailto:akashjain1311@gmail.com">akashjain1311@gmail.com</Link>
              &nbsp;&middot;&nbsp;
              <Link href="https://github.com/akashjainn" target="_blank" rel="noopener noreferrer">github.com/akashjainn</Link>
              &nbsp;&middot;&nbsp;
              <Link href="https://www.linkedin.com/in/akash-jain-687673209/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
            </p>
          </div>
        </section>

        <footer className="foot">
          <span>&copy; Akash Jain &middot; 2026</span>
          <span>Aurora &middot; Vol. II</span>
          <span>Atlanta, GA</span>
        </footer>

      </div>
    </main>
  )
}
