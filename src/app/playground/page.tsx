import { Navigation } from "@/components/site/navigation"
import { ProjectCard } from "@/components/site/project-card"
import { getAllProjects } from "@/lib/mdx"

export default async function PlaygroundPage() {
  // Get playground projects (non-career-relevant projects)
  const playgroundProjects = await getAllProjects({ 
    category: 'playground',
    status: 'published'
  })

  return (
    <>
      <Navigation />
      <main id="main-content" className="py-20">
        <div className="container">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-tight mb-6">
              Playground
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Experimental projects, creative explorations, and technical deep-dives 
              that showcase systems thinking and problem-solving beyond traditional web development.
            </p>
            
            {playgroundProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {playgroundProjects.map((project) => (
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
                <p className="text-muted-foreground mb-4">
                  Playground projects coming soon!
                </p>
                <a 
                  href="/projects" 
                  className="link text-lg font-medium"
                >
                  View main projects →
                </a>
              </div>
            )}
            
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="text-2xl font-semibold tracking-[-0.01em] leading-tight mb-6">
                About the Playground
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                  This section showcases projects that demonstrate technical depth, 
                  systems thinking, and creative problem-solving in domains outside 
                  traditional web development. These projects highlight:
                </p>
                <ul>
                  <li><strong>Low-level programming</strong> with memory and performance constraints</li>
                  <li><strong>Systems architecture</strong> for resource-constrained environments</li>
                  <li><strong>Creative applications</strong> of programming concepts</li>
                  <li><strong>Experimental technologies</strong> and unconventional approaches</li>
                </ul>
                <p>
                  While not directly career-relevant for web development roles, 
                  these projects demonstrate the breadth of technical skills and 
                  the ability to work across different programming paradigms and constraints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}