import { Navigation } from "@/components/site/navigation"
import { Hero } from "@/components/site/hero"
import { ProjectCard } from "@/components/site/project-card"
import { getAllProjects } from "@/lib/mdx"
import { WebsiteStructuredData, PersonStructuredData, PortfolioStructuredData } from "@/components/seo/structured-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  // Get featured projects (limit to 3 for the homepage, excluding playground)
  const allFeaturedProjects = await getAllProjects({ 
    featured: true, 
    limit: 3,
    status: 'published'
  })
  const featuredProjects = allFeaturedProjects.filter(project => project.frontmatter.category !== 'playground')
  
  // Fallback to latest 3 projects if no featured ones (excluding playground)
  let displayProjects = featuredProjects
  if (featuredProjects.length === 0) {
    const allProjects = await getAllProjects({ limit: 6, status: 'published' })
    displayProjects = allProjects.filter(project => project.frontmatter.category !== 'playground').slice(0, 3)
  }

  return (
    <>
      <WebsiteStructuredData />
      <PersonStructuredData />
      <PortfolioStructuredData projects={featuredProjects} />
      <Navigation />
      <main id="main-content">
        <Hero />
        
        {/* Executive Summary Section */}
        <section className="py-16 border-b border-border/10" aria-labelledby="executive-summary">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 id="executive-summary" className="sr-only">Executive Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">99.2%</div>
                  <div className="text-sm text-muted-foreground">System Uptime</div>
                  <div className="text-xs text-muted-foreground">Production Grade</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">4+</div>
                  <div className="text-sm text-muted-foreground">Case Studies</div>
                  <div className="text-xs text-muted-foreground">Technical Depth</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">95+</div>
                  <div className="text-sm text-muted-foreground">Lighthouse Score</div>
                  <div className="text-xs text-muted-foreground">Performance</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20" aria-labelledby="featured-projects">
          <div className="container">
            <div className="text-center mb-16">
              <h2 id="featured-projects" className="text-3xl sm:text-4xl font-display font-semibold tracking-[-0.02em] leading-tight mb-4">
                Featured <span className="gradient-text">Case Studies</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Deep-dive technical case studies showcasing problem-solving, architecture decisions, and measurable outcomes.
              </p>
            </div>
            
            {displayProjects.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProjects.map((project) => (
                    <ProjectCard 
                      key={project.frontmatter.slug}
                      title={project.frontmatter.title}
                      summary={project.frontmatter.summary}
                      tags={project.frontmatter.tags}
                      href={`/projects/${project.frontmatter.slug}`}
                      demo={project.frontmatter.links.demo || undefined}
                      repo={project.frontmatter.links.repo}
                    />
                  ))}
                </div>
                
                <div className="text-center mt-12">
                  <a 
                    href="/projects" 
                    className="link text-lg font-medium"
                  >
                    View all projects →
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Projects coming soon!
                </p>
                <a 
                  href="/about" 
                  className="link text-lg font-medium"
                >
                  Learn more about me →
                </a>
              </div>
            )}
          </div>
        </section>
        
        <section className="py-20 bg-muted/30" aria-labelledby="about-preview">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="about-preview" className="text-3xl font-display font-semibold tracking-[-0.02em] leading-tight mb-4">
                  Technical <span className="gradient-text">Expertise</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Georgia Tech CS major focused on performant, accessible web systems with enterprise-grade reliability.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Frontend & Full-Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"].map((skill) => (
                      <span 
                        key={skill}
                        className="inline-flex items-center rounded-full border border-border/50 bg-background px-3 py-1 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Backend & Data</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "WebSockets"].map((skill) => (
                      <span 
                        key={skill}
                        className="inline-flex items-center rounded-full border border-border/50 bg-background px-3 py-1 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-card border border-border/50 rounded-lg p-6 max-w-2xl mx-auto">
                  <p className="text-muted-foreground mb-4">
                    "I validate with telemetry and tests, ship with performance budgets, and maintain 
                    99.2% system uptime through reliability engineering."
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/about">Full Story</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/contact">Let's Talk</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
