"use client"

import { useEffect, useState } from "react"

type TocItem = { id: string; label: string }

export default function CaseStudyLayout({
  title,
  summary,
  role,
  timeframe,
  links,
  children,
}: {
  title: string
  summary: string
  role: string
  timeframe: string
  links?: { demo?: string; repo?: string }
  children: React.ReactNode
}) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const hs = Array.from(document.querySelectorAll("main h2[id], main h3[id]"))
    setItems(hs.map((h) => ({ id: (h as HTMLElement).id, label: h.textContent || "" })))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -80% 0px" }
    )

    hs.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-8">
        {/* Sticky TOC (desktop only) */}
        <nav aria-label="On this page" className="hidden lg:block sticky top-24 h-max">
          <p className="text-sm font-semibold mb-3">On this page</p>
          <ul className="space-y-2 text-sm border-l border-border">
            {items.map((i) => (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  className={`block pl-3 py-1 border-l-2 -ml-px transition-colors ${
                    activeId === i.id
                      ? "border-accent text-accent font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <article className="max-w-3xl">
          {/* Header (not prose styled) */}
          <header className="mb-8 pb-8 border-b border-border">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">{title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">{summary}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="font-semibold">Role:</span> <span className="text-muted-foreground">{role}</span>
              </div>
              <div>
                <span className="font-semibold">Timeframe:</span> <span className="text-muted-foreground">{timeframe}</span>
              </div>
            </div>
            {links && (
              <div className="flex gap-3 mt-4">
                {links.demo && (
                  <a
                    href={links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Live Demo →
                  </a>
                )}
                {links.repo && (
                  <a
                    href={links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
                  >
                    View Code →
                  </a>
                )}
              </div>
            )}
          </header>

          {/* MDX content (will be prose-styled) */}
          <main className="prose prose-invert max-w-none">{children}</main>
        </article>
      </div>
    </div>
  )
}
