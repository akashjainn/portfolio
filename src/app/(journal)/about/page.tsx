export const metadata = {
  title: 'About',
  description: 'Akash Jain — software engineer, Georgia Tech CS, reliability engineering.',
}

export default function AboutPage() {
  return (
    <div style={{ padding: 'var(--s-8) var(--s-7)' }}>
      <p
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 var(--s-4)',
        }}
      >
        Atlanta, GA · Spring 2026
      </p>

      <h1 className="masthead" style={{ marginBottom: 'var(--s-8)' }}>
        On <em>making things work</em>
      </h1>

      <div
        className="grid-2 ruled"
        style={{ gap: 'var(--s-8)', alignItems: 'start' }}
      >
        <aside
          style={{
            position: 'sticky',
            top: 'var(--s-7)',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            color: 'var(--ink-3)',
          }}
        >
          <section style={{ marginBottom: 'var(--s-6)' }}>
            <p style={{ margin: '0 0 var(--s-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Typefaces
            </p>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              Source Serif 4<br />
              JetBrains Mono
            </p>
          </section>
          <section style={{ marginBottom: 'var(--s-6)' }}>
            <p style={{ margin: '0 0 var(--s-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Stack
            </p>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              Next.js 14<br />
              TypeScript<br />
              MDX<br />
              Vercel
            </p>
          </section>
          <section>
            <p style={{ margin: '0 0 var(--s-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Links
            </p>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              <a href="https://github.com/akashjainn" style={{ color: 'var(--terra-deep)' }}>
                GitHub
              </a>
              <br />
              <a href="https://linkedin.com/in/akashjainn" style={{ color: 'var(--terra-deep)' }}>
                LinkedIn
              </a>
              <br />
              <a href="/Akash-Jain-CV.pdf" style={{ color: 'var(--terra-deep)' }}>
                CV (PDF)
              </a>
            </p>
          </section>
        </aside>

        <div
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 18,
            lineHeight: 1.65,
            color: 'var(--ink)',
          }}
        >
          <p>
            I&apos;m a software engineer finishing a computer science degree at Georgia Tech. Most of my work sits at the edge where systems have to be reliable — messaging infrastructure that can&apos;t drop packets, satellite uplinks that have to stay up when the weather turns bad, real estate models that have to explain why they got it wrong.
          </p>
          <p>
            This journal started as a way to write down what I actually learned — not the final architecture, but the three versions that failed before it. A case study that only shows the shipped design is an advertisement, not an explanation.
          </p>
          <p>
            I&apos;m interested in the gap between what metrics say and what users feel. An uptime ribbon that shows 99.98% doesn&apos;t tell you whether the two-second reconnect during a claim submission cost someone their session. Writing helps me think about that gap carefully.
          </p>
          <p>
            Outside engineering: I read about information design, watch competitive chess, and occasionally attempt to debug my sourdough starter.
          </p>
          <p>
            If you want to work together or just argue about data visualization — the contact link is in the nav.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 12,
              color: 'var(--ink-3)',
              marginTop: 'var(--s-8)',
            }}
          >
            — Akash Jain, April 2026
          </p>
        </div>
      </div>
    </div>
  )
}
