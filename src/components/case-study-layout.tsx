"use client"

import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CaseStudyLayoutProps {
  children: ReactNode
  title: string
  demoUrl?: string
  repoUrl?: string
  metadata: {
    role: string
    period: string
    tech: string[]
    metrics?: {
      lcp_ms?: number
      tbt_ms?: number
      cls?: number
      a11y?: string
      lighthouse_mobile?: number
    }
  }
}

interface TocItem {
  id: string
  title: string
  level: number
}

export function CaseStudyLayout({ children, title, demoUrl, repoUrl, metadata }: CaseStudyLayoutProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeSection, setActiveSection] = useState<string>('')

  // Generate table of contents from headings
  useEffect(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const tocItems: TocItem[] = []

    headings.forEach((heading) => {
      if (heading.id) {
        tocItems.push({
          id: heading.id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        })
      }
    })

    setToc(tocItems)
  }, [children])

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      let currentSection = ''

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 0) {
          currentSection = heading.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with title and action buttons */}
      <header className="mb-8 pb-8 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-[-0.02em] leading-[0.95] mb-4 text-balance">
              {title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Role:</span>
                <span>{metadata.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Period:</span>
                <span>{metadata.period}</span>
              </div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {metadata.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full bg-muted/50 border border-border/50 px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:bg-muted hover:border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:w-48">
            {demoUrl && (
              <Button asChild className="interactive shadow-elegant hover:shadow-elegant-lg group">
                <Link 
                  href={demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Demo
                </Link>
              </Button>
            )}
            
            {repoUrl && (
              <Button asChild variant="outline" className="interactive shadow-elegant group">
                <Link 
                  href={repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  View Code
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Performance metrics */}
        {metadata.metrics && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {metadata.metrics.lcp_ms && (
              <div className="text-center p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="text-lg font-semibold text-green-600">{metadata.metrics.lcp_ms}ms</div>
                <div className="text-xs text-muted-foreground">LCP</div>
              </div>
            )}
            {metadata.metrics.tbt_ms && (
              <div className="text-center p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="text-lg font-semibold text-blue-600">{metadata.metrics.tbt_ms}ms</div>
                <div className="text-xs text-muted-foreground">TBT</div>
              </div>
            )}
            {metadata.metrics.cls && (
              <div className="text-center p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="text-lg font-semibold text-purple-600">{metadata.metrics.cls}</div>
                <div className="text-xs text-muted-foreground">CLS</div>
              </div>
            )}
            {metadata.metrics.lighthouse_mobile && (
              <div className="text-center p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="text-lg font-semibold text-orange-600">{metadata.metrics.lighthouse_mobile}/100</div>
                <div className="text-xs text-muted-foreground">Mobile</div>
              </div>
            )}
            {metadata.metrics.a11y && (
              <div className="text-center p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="text-lg font-semibold text-emerald-600">✓</div>
                <div className="text-xs text-muted-foreground">A11y</div>
              </div>
            )}
          </div>
        )}
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Table of Contents */}
        {toc.length > 0 && (
          <aside className="lg:w-64 lg:sticky lg:top-24 lg:self-start">
            <nav className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4">
              <h2 className="font-semibold text-sm mb-3 text-foreground">Contents</h2>
              <ul className="space-y-1 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className={`block py-1 px-2 rounded transition-colors duration-200 ${
                        activeSection === item.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                      style={{ 
                        paddingLeft: `${(item.level - 1) * 12 + 8}px` 
                      }}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <article className="prose prose-gray max-w-none prose-headings:scroll-mt-24">
            {children}
          </article>
        </main>
      </div>
    </div>
  )
}