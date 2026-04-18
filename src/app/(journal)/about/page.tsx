import Link from 'next/link'
import { SiteNav } from '@/components/journal/SiteNav'

export const metadata = {
  title: 'About — Akash Jain',
  description: 'Akash Jain — software engineer, Georgia Tech CS, reliability engineering.',
}

export default function AboutPage() {
  return (
    <main className="page ruled" id="main-content">
      <SiteNav />

      <header style={{ borderBottom: '1px solid var(--ink)', paddingBottom: 'var(--s-5)', marginBottom: 'var(--s-5)' }}>
        <div className="note" style={{ textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 'var(--s-3)' }}>
          Colophon &middot; who, where, what this is made of
        </div>
        <h1 className="masthead-title" style={{ fontSize: 'clamp(34px, 4.6vw, 56px)' }}>
          The short version is<br />on the CV. The long<br />version is <em>everywhere else</em>.
        </h1>
      </header>

      <div className="grid-2">
        <aside className="gutter">
          Colophon<br />
          Source Serif 4<br />
          JetBrains Mono<br />
          Inter Tight<br />
          Next.js &middot; Vercel<br />
          MDX content<br />
          &asymp;38kb JS on index<br />
          <br />
          Elsewhere<br />
          <Link href="mailto:akashjain1311@gmail.com">Email</Link><br />
          <Link href="https://github.com/akashjainn" target="_blank" rel="noopener noreferrer">GitHub</Link><br />
          <Link href="https://www.linkedin.com/in/akash-jain-687673209/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
        </aside>
        <div>
          <p className="lede">
            I&apos;m Akash. I study computer science at Georgia Tech. I write here about what it&apos;s actually like to build things &mdash; the problems before the solutions, the three versions I had to throw away, and the quiet decisions that added up to the one that shipped.
          </p>
          <p>
            I grew up building small things that were mostly broken. I still do. The difference now is that the broken ones are part of the method: I post them alongside the finished work and let you watch them converge, or not.
          </p>
          <p>
            I care about programs that feel hand-made at scale. Chat widgets that don&apos;t drop messages for two million people a month. Hackathon demos that still hold up when you unplug the network. Marketing pages that respect their subject enough to tell the truth about it.
          </p>
          <p>
            This summer I&apos;ll be interning at SpaceX on Starlink. Before that: State Farm, and now Georgia Tech&apos;s Office of Information Technology, where I&apos;m replacing legacy CMS templates with something closer to human.
          </p>
          <p>
            If you&apos;re hiring for something where that kind of work matters &mdash; send a note.
          </p>
          <p className="note" style={{ marginTop: 'var(--s-6)' }}>
            &mdash; Akash Jain, Atlanta, April 2026.
          </p>
        </div>
      </div>

      <footer className="site-foot">
        <span>&copy; Akash Jain &middot; 2026</span>
        <span>Field Journal &middot; Vol. I</span>
        <span>Atlanta, GA</span>
      </footer>
    </main>
  )
}
