import Link from 'next/link'
import { NavPill } from '@/components/journal/NavPill'

export const metadata = {
  title: 'About',
  description: 'Akash Jain — software engineer, Georgia Tech CS, reliability engineering.',
}

export default function AboutPage() {
  return (
    <main>
      <NavPill />
      <div className="about-page">

        <header style={{ borderBottom: '1px solid var(--line)', paddingBottom: 'var(--s-7)', marginBottom: 'var(--s-7)' }}>
          <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>
            Colophon &middot; who, where, what this is made of
          </div>
          <h1 style={{ fontWeight: 200, fontSize: 'clamp(34px, 4.6vw, 56px)', letterSpacing: '-.03em', lineHeight: 1.02, marginTop: 'var(--s-4)' }}>
            The short version is on the CV.<br />
            The long version is <em className="aurora-text">everywhere else</em>.
          </h1>
        </header>

        <div className="about-grid">
          <aside className="about-gutter">
            Colophon<br />
            Inter Tight<br />
            JetBrains Mono<br />
            Aurora gradient<br />
            Next.js &middot; Vercel<br />
            MDX content<br />
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
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '.04em', marginTop: 'var(--s-6)', borderTop: '1px solid var(--line)', paddingTop: 'var(--s-4)' }}>
              &mdash; Akash Jain, Atlanta, May 2026.
            </p>
          </div>
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
