'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const LINKS = [
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
  { href: '/Akash-Jain-CV.pdf', label: 'CV', external: true },
  { href: 'mailto:akashjain1311@gmail.com', label: 'Contact', external: true, hideSmall: true },
] as const

export function NavPill() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const handler = () => {
      nav.style.top = window.scrollY > 80 ? '14px' : '22px'
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      ref={navRef}
      className="nav-pill"
      aria-label="primary"
    >
      <Link href="/" className="home" aria-label="Home">
        <svg viewBox="0 0 200 200" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M100 25 L114 72 L97 82 L121 92 L104 102 L127 112 L111 122 L134 132 L145 175 L55 175 Z M90 120 L110 120 L125 175 L75 175 Z"
          />
        </svg>
      </Link>
      <span className="sep" aria-hidden="true" />
      <span className="links">
        {LINKS.map((link) => {
          const { href, label } = link
          const external = 'external' in link ? link.external : false
          const isHide = 'hideSmall' in link && link.hideSmall
          const isCurrent = !external && pathname === href
          return (
            <Link
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-current={isCurrent ? 'page' : undefined}
              className={isHide ? 'hide-sm' : ''}
            >
              {label}
            </Link>
          )
        })}
      </span>
    </nav>
  )
}
