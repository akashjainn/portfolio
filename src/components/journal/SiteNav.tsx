import Link from 'next/link'
import Image from 'next/image'
import { headers } from 'next/headers'

const NAV_LINKS = [
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
  { href: '/Akash-Jain-CV.pdf', label: 'CV', external: true },
  { href: '/contact', label: 'Contact' },
] as const

export function SiteNav() {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') ?? ''

  return (
    <nav className="site-nav" aria-label="primary">
      <div className="brand">
        <Link href="/" className="plain" aria-label="Akash Jain — home">
          <Image
            src="/assets/logo.svg"
            alt="Akash Jain"
            width={243}
            height={56}
            priority
            className="logo-light"
          />
          <Image
            src="/assets/logo-inverted.svg"
            alt="Akash Jain"
            width={243}
            height={56}
            priority
            className="logo-dark"
          />
        </Link>
      </div>
      <div className="links">
        {NAV_LINKS.map(({ href, label, ...rest }) => {
          const external = 'external' in rest && rest.external
          const isCurrent = !external && pathname === href
          if (external) {
            return (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            )
          }
          return (
            <Link key={href} href={href} aria-current={isCurrent ? 'page' : undefined}>
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
