import Link from 'next/link'
import { NavPill } from '@/components/journal/NavPill'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Akash Jain.',
}

export default function ContactPage() {
  return (
    <main>
      <NavPill />
      <div className="about-page">

        <header style={{ borderBottom: '1px solid var(--line)', paddingBottom: 'var(--s-7)', marginBottom: 'var(--s-7)' }}>
          <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>
            Get in touch
          </div>
          <h1 style={{ fontWeight: 200, fontSize: 'clamp(34px, 4.6vw, 56px)', letterSpacing: '-.03em', lineHeight: 1.02, marginTop: 'var(--s-4)' }}>
            Let&apos;s talk about<br />the work.
          </h1>
        </header>

        <div className="about-grid">
          <aside className="about-gutter">
            Methods<br />
            <Link href="mailto:akashjain1311@gmail.com">Email</Link><br />
            <Link href="https://github.com/akashjainn" target="_blank" rel="noopener noreferrer">GitHub</Link><br />
            <Link href="https://www.linkedin.com/in/akash-jain-687673209/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
          </aside>
          <div>
            <p className="lede">
              I&apos;m interested in work where the details matter. Hiring for internships, full-time roles, or contract projects &mdash; reach out.
            </p>
            <p>
              The fastest way is email. I usually reply within a day.
            </p>
            <p>
              You can also find me on <Link href="https://github.com/akashjainn" target="_blank" rel="noopener noreferrer">GitHub</Link> or <Link href="https://www.linkedin.com/in/akash-jain-687673209/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>.
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
