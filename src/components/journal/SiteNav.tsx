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
            width={93}
            height={34}
            priority
          />
        </Link>
      </div>
      <div className="links">
        {NAV_LINKS.map(({ href, label, ...rest }) => {
          const external = 'external' in rest && rest.external
          const isCurrent = !external && pathname === href
          return (
            <Link
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
