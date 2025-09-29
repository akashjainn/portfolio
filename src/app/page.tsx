import { Navigation } from "@/components/site/navigation"
import { Hero } from "@/components/site/hero"
import { ProjectCard } from "@/components/site/project-card"
import { getAllProjects } from "@/lib/mdx"

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
      <Navigation />
      <main id="main-content">
        <Hero />
        
        <section className="py-20" aria-labelledby="featured-projects">
          <div className="container">
            <h2 id="featured-projects" className="text-2xl font-semibold tracking-[-0.01em] leading-tight mb-12 text-center">
              Featured Projects
            </h2>
            
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
        
        <section className="py-20 bg-muted/50" aria-labelledby="about-preview">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 id="about-preview" className="text-2xl font-semibold tracking-[-0.01em] leading-tight mb-6">
                About
              </h2>
              <p className="text-body text-muted-foreground mb-8">
                I&apos;m Akash Jain, a Georgia Tech CS major focused on performant, accessible web systems.
                I build with Next.js/TypeScript, validate with telemetry and tests, and ship with a bias 
                for clarity, reliability, and measurable outcomes.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Next.js", "TypeScript", "React", "Node.js", "MongoDB", "PostgreSQL", "WebSockets", "REST APIs"].map((skill) => (
                  <span 
                    key={skill}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-background text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
