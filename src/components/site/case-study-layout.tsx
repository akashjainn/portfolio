import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectFrontmatter } from "@/lib/mdx"

interface CaseStudyLayoutProps {
  children: React.ReactNode
  frontmatter: ProjectFrontmatter
  readingTime: number
}

export function CaseStudyLayout({ children, frontmatter, readingTime }: CaseStudyLayoutProps) {
  return (
    <article className="py-8">
      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link 
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Projects
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.1] mb-4">
            {frontmatter.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {frontmatter.summary}
          </p>

          {/* Executive Summary Box */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Executive Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">KEY ACHIEVEMENTS</h3>
                <ul className="space-y-1 text-sm">
                  {frontmatter.metrics?.lighthouse_mobile && (
                    <li>• {frontmatter.metrics.lighthouse_mobile}/100 Lighthouse Score</li>
                  )}
                  {frontmatter.metrics?.lcp_ms && (
                    <li>• {frontmatter.metrics.lcp_ms}ms LCP (Excellent)</li>
                  )}
                  {frontmatter.metrics?.a11y && (
                    <li>• {frontmatter.metrics.a11y}</li>
                  )}
                  {frontmatter.metrics?.uptime && (
                    <li>• {frontmatter.metrics.uptime} System Uptime</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">TECH HIGHLIGHTS</h3>
                <div className="flex flex-wrap gap-1">
                  {frontmatter.tech.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium bg-muted/50 text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {frontmatter.tech.length > 6 && (
                    <span className="text-xs text-muted-foreground">+{frontmatter.tech.length - 6} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-muted/30 rounded-lg">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <dt className="font-medium text-foreground">Role</dt>
                <dd className="text-muted-foreground">{frontmatter.role}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Period</dt>
                <dd className="text-muted-foreground">{frontmatter.period}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Read time</dt>
                <dd className="text-muted-foreground">{readingTime} min read</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Status</dt>
                <dd className="text-muted-foreground capitalize">{frontmatter.status}</dd>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            {frontmatter.links.demo && (
              <Button asChild>
                <Link 
                  href={frontmatter.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live Demo
                </Link>
              </Button>
            )}
            
            <Button asChild variant="outline">
              <Link 
                href={frontmatter.links.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code
              </Link>
            </Button>
          </div>

          {/* Tech stack */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-foreground mb-3">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {frontmatter.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium bg-background text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics (if available) */}
          {frontmatter.metrics && (
            <div className="mt-8 p-6 border rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {frontmatter.metrics.lcp_ms && (
                  <div>
                    <dt className="font-medium text-foreground">LCP</dt>
                    <dd className="text-muted-foreground">{frontmatter.metrics.lcp_ms}ms</dd>
                  </div>
                )}
                {frontmatter.metrics.tbt_ms && (
                  <div>
                    <dt className="font-medium text-foreground">TBT</dt>
                    <dd className="text-muted-foreground">{frontmatter.metrics.tbt_ms}ms</dd>
                  </div>
                )}
                {frontmatter.metrics.cls && (
                  <div>
                    <dt className="font-medium text-foreground">CLS</dt>
                    <dd className="text-muted-foreground">{frontmatter.metrics.cls}</dd>
                  </div>
                )}
                {frontmatter.metrics.a11y && (
                  <div>
                    <dt className="font-medium text-foreground">A11y</dt>
                    <dd className="text-muted-foreground">{frontmatter.metrics.a11y}</dd>
                  </div>
                )}
                {frontmatter.metrics.uptime && (
                  <div>
                    <dt className="font-medium text-foreground">Uptime</dt>
                    <dd className="text-muted-foreground">{frontmatter.metrics.uptime}</dd>
                  </div>
                )}
                {frontmatter.metrics.users && (
                  <div>
                    <dt className="font-medium text-foreground">Users</dt>
                    <dd className="text-muted-foreground">{frontmatter.metrics.users}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {children}
        </div>

        {/* Footer navigation */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Link 
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Projects
            </Link>
            
            <div className="flex gap-3">
              {frontmatter.links.demo && (
                <Button asChild variant="ghost" size="sm">
                  <Link 
                    href={frontmatter.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </Link>
                </Button>
              )}
              
              <Button asChild variant="ghost" size="sm">
                <Link 
                  href={frontmatter.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </Link>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </article>
  )
}