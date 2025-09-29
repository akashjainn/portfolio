import { Navigation } from "@/components/site/navigation"
import { ProjectCard } from "@/components/site/project-card"
import { getAllProjects } from "@/lib/mdx"

export const metadata = {
  title: "Projects",
  description: "A collection of software projects showcasing full-stack development, real-time systems, and performance optimization."
}

export default async function ProjectsPage() {
  // Get all published projects, sorted by date
  const projects = await getAllProjects({ status: 'published' })
  
  return (
    <>
      <Navigation />
      <main id="main-content" className="py-8">
        <div className="container">
          <header className="mb-12">
            <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.1] mb-4">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A collection of software projects showcasing full-stack development, 
              real-time systems, performance optimization, and enterprise-grade solutions.
            </p>
          </header>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No projects available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
