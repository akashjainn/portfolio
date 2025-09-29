"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/notes", label: "Writing" },
  { href: "/resume", label: "Resume" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav 
        className="container flex h-16 items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        <Link 
          href="/"
          className="font-semibold text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          aria-label="Akash Jain - Home"
        >
          AJ
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-2 py-1",
                pathname === href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">
              Contact
            </Link>
          </Button>
          
          {/* Theme toggle placeholder - will implement later */}
          <Button variant="ghost" size="sm" className="w-9 px-0">
            <span className="sr-only">Toggle theme</span>
            {/* Theme icon will be added later */}
            🌙
          </Button>
        </div>
      </nav>
    </header>
  )
}