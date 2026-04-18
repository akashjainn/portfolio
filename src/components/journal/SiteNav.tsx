import Link from 'next/link'
import { headers } from 'next/headers'

const NAV_LINKS = [
  { href: '/journal', label: 'Journal', external: false },
  { href: '/about', label: 'About', external: false },
  { href: '/Akash-Jain-CV.pdf', label: 'CV', external: true },
  { href: 'mailto:akashjain1311@gmail.com', label: 'Contact', external: true },
] as const

export function SiteNav() {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') ?? ''

  return (
    <header
      style={{
        padding: 'var(--s-5) var(--s-7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <Link
        href="/"
        aria-label="Akash Jain — home"
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--ink)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
        }}
      >
        AJ
      </Link>

      <nav aria-label="Site navigation">
        <ul
          role="list"
          style={{
            display: 'flex',
            gap: 'var(--s-6)',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            flexWrap: 'wrap',
          }}
        >
          {NAV_LINKS.map(({ href, label, external }) => {
            const isCurrent = !external && pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-current={isCurrent ? 'page' : undefined}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isCurrent ? 'var(--terra)' : 'var(--ink-2)',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
