import Link from 'next/link'
import { SiteNav } from '@/components/journal/SiteNav'

export const metadata = {
  title: 'Contact — Akash Jain',
  description: 'Get in touch with Akash Jain.',
}

export default function ContactPage() {
  return (
    <main className="page ruled" id="main-content">
      <SiteNav />

      <header style={{ borderBottom: '1px solid var(--ink)', paddingBottom: 'var(--s-5)', marginBottom: 'var(--s-5)' }}>
        <div className="note" style={{ textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 'var(--s-3)' }}>
          Get in touch
        </div>
        <h1 className="masthead-title" style={{ fontSize: 'clamp(34px, 4.6vw, 56px)' }}>
          Let&apos;s talk about<br />the work.
        </h1>
      </header>

      <div className="grid-2">
        <aside className="gutter">
          Methods<br />
          <Link href="mailto:akashjain1311@gmail.com">Email</Link><br />
          <Link href="https://github.com/akashjainn" target="_blank" rel="noopener noreferrer">GitHub</Link><br />
          <Link href="https://www.linkedin.com/in/akash-jain-687673209/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
        </aside>
        <div>
          <p className="lede">
            I&apos;m interested in work where the details matter. Hiring for internships, full-time roles, contract projects, or just want to chat about code? Reach out.
          </p>
          <p>
            The fastest way is email. I usually reply within a day.
          </p>
          <p>
            You can also find me on <a href="https://github.com/akashjainn">GitHub</a> or <a href="https://www.linkedin.com/in/akash-jain-687673209/">LinkedIn</a> if you want to see what I&apos;ve been building.
          </p>
          <p className="note" style={{ marginTop: 'var(--s-6)' }}>
            &mdash; Akash
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
