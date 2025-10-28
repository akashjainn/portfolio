import { Navigation } from "@/components/site/navigation"
import InteractiveHero from "@/components/InteractiveHero"
import { ProjectCard } from "@/components/site/project-card"
import { getAllProjects } from "@/lib/mdx"
import { WebsiteStructuredData, PersonStructuredData, PortfolioStructuredData } from "@/components/seo/structured-data"
import { Button } from "@/components/ui/button"
import { CommandPalette } from "@/components/ui/command-palette"
// Interactive timeline removed
import { ExecutiveSummarySection } from "@/components/ui/executive-summary"
import { DeferredSections } from "@/components/DeferredSections"
import { AnimatedBlobs } from "@/components/ui/animated-blobs"
import { WaveDivider } from "@/components/ui/wave-divider"
import Link from "next/link"
// Guided tour removed

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
      <AnimatedBlobs />
      <WebsiteStructuredData />
      <PersonStructuredData 
        name="Akash Jain"
        jobTitle="Full-stack Developer"
        worksFor="Georgia Institute of Technology"
        alumniOf="Georgia Institute of Technology"
        url="https://akashjain.dev"
        sameAs={[
          "https://github.com/akashjainn",
          "https://linkedin.com/in/akashjainn",
          "https://twitter.com/akashjainn"
        ]}
        address={{
          addressLocality: "Atlanta",
          addressRegion: "Georgia",
          addressCountry: "United States"
        }}
      />
      <PortfolioStructuredData projects={featuredProjects} />
      <Navigation />
      <main id="main-content">
        <InteractiveHero />
        
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
        
        <WaveDivider variant="blue-purple" className="my-0" />
        
  <section id="featured-projects-section" className="py-20" aria-labelledby="featured-projects">
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
                      metrics={project.frontmatter.metrics}
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
        
        

        {/* Interactive Skills Section, 3D Previews, Playground deferred to intersection */}
        <DeferredSections />

        {/* Executive Summary for Recruiters */}
        <ExecutiveSummarySection />
      </main>

      {/* Enhanced UI Components */}
      <CommandPalette />
    </>
  )
}
