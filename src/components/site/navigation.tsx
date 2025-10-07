"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
  download?: boolean
}

const navItems: NavItem[] = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "/Akash_Jain_Resume.pdf", label: "Resume", download: true },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-elegant">
      <nav 
        className="container flex h-16 items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        <Link 
          href="/"
          className="font-display font-bold text-xl interactive hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 rounded-md transition-all duration-200"
          aria-label="Akash Jain - Home"
        >
          <span className="gradient-text">AJ</span>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map(({ href, label, download }) => (
            <Link
              key={href}
              href={href}
              {...(download && { target: "_blank", rel: "noopener noreferrer" })}
              className={cn(
                "relative text-sm font-medium transition-all duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 rounded-lg px-3 py-2 interactive",
                pathname === href
                  ? "text-foreground bg-muted/50"
                  : "text-muted-foreground hover:bg-muted/30"
              )}
              aria-current={pathname === href ? "page" : undefined}
            >
              <span className="flex items-center gap-1">
                {label}
                {download && (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </span>
              {pathname === href && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-fadeIn" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex interactive hover:bg-muted/50 group">
            <Link href="/contact" className="flex items-center gap-2">
              Contact
              <svg className="h-3 w-3 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </Button>
          
          {/* Theme toggle removed */}
        </div>
      </nav>
    </header>
  )
}
