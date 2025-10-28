import { Navigation } from "@/components/site/navigation"
import { ProjectCard } from "@/components/site/project-card"
import { getAllProjects } from "@/lib/mdx"
import { AnimatedBlobs } from "@/components/ui/animated-blobs"
import { WaveDivider } from "@/components/ui/wave-divider"

export default async function PlaygroundPage() {
  // Get playground projects (non-career-relevant projects)
  const playgroundProjects = await getAllProjects({ 
    category: 'playground',
    status: 'published'
  })

  return (
    <>
      <AnimatedBlobs />
      <Navigation />
      <main id="main-content" className="py-20">
        <div className="container">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-display font-semibold tracking-[-0.02em] leading-tight mb-12">
              Playground
            </h1>
            
            <WaveDivider variant="pink-orange" className="my-8" />
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
          </div>
        </div>
      </main>
    </>
  )
}