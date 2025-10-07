"use client"

import { ProjectCard } from "@/components/site/project-card"
import { useStaggeredReveal, useRevealOnScroll } from "@/lib/animations"

interface ProjectFrontmatter {
  slug: string
  title: string
  summary: string
  tags: string[]
  links: {
    demo?: string
    repo: string
  }
  metrics?: {
    lcp_ms?: number
    tbt_ms?: number
    cls?: number
    a11y?: string
    uptime?: string
    users?: string
    performance_improvement?: string
    lighthouse_mobile?: number
  }
}

interface Project {
  frontmatter: ProjectFrontmatter
}

interface AnimatedProjectsGridProps {
  projects: Project[]
}

export function AnimatedProjectsGrid({ projects }: AnimatedProjectsGridProps) {
  const { elementRef: headerRef, isVisible: headerVisible } = useRevealOnScroll()
  const { containerRef, visibleItems } = useStaggeredReveal(projects.length, 150)

  return (
    <main id="main-content" className="py-8 page-transition">
      <div className="container">
        <header 
          ref={headerRef}
          className={`mb-16 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-[-0.02em] leading-[0.95] mb-6 text-balance">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl text-pretty leading-relaxed">
            A collection of software projects showcasing full-stack development, 
            real-time systems, performance optimization, and enterprise-grade solutions.
          </p>
          
          <div className="divider-elegant mt-8" />
        </header>
        
        {projects.length > 0 ? (
          <div 
            ref={containerRef}
            className="grid grid-auto-fit-md gap-6"
          >
            {projects.map((project, index) => (
              <div
                key={project.frontmatter.slug}
                className={`transition-all duration-500 ease-out ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProjectCard 
                  title={project.frontmatter.title}
                  summary={project.frontmatter.summary}
                  tags={project.frontmatter.tags}
                  href={`/projects/${project.frontmatter.slug}`}
                  demo={project.frontmatter.links.demo || undefined}
                  repo={project.frontmatter.links.repo}
                  metrics={project.frontmatter.metrics}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted/50 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No projects available yet</h3>
              <p className="text-muted-foreground">
                Check back soon for exciting new projects!
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}