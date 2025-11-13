import { Navigation } from "@/components/site/navigation"
import { ProjectCard } from "@/components/site/project-card"
import { getAllProjects } from "@/lib/mdx"
import { AnimatedBlobs } from "@/components/ui/animated-blobs"
import { WaveDivider } from "@/components/ui/wave-divider"
import { CommandPalette } from "@/components/ui/command-palette"
import dynamic from "next/dynamic"

const ModelViewer = dynamic(() => import("@/components/three/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gradient-to-b from-gray-900 to-black rounded-xl border border-gray-800 flex items-center justify-center">
      <div className="text-gray-400">Loading 3D viewer...</div>
    </div>
  )
})

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
      <CommandPalette />
      <main id="main-content" className="py-20">
        <div className="container">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-display font-semibold tracking-[-0.02em] leading-tight mb-6">
              Playground
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Experimental projects, game development, and creative explorations
            </p>
            
            {/* Featured 3D Asset Showcase */}
            <div className="mb-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-gray-800 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">VR Game Assets - Interactive 3D Viewer</h2>
                <p className="text-gray-400">
                  Custom vine and tree models created for the VR Bomb Defusal Puzzle game. 
                  Drag to rotate, scroll to zoom, right-click to pan.
                </p>
              </div>
              <ModelViewer 
                modelPath="/models/vine-trees.fbx"
                autoRotate={true}
                showControls={true}
                className="w-full h-[500px]"
              />
              <div className="mt-4 flex gap-3">
                <a
                  href="/projects/vr-puzzle-game"
                  className="inline-flex items-center gap-2 bg-primary-red text-white px-4 py-2 rounded-lg hover:bg-dark-red transition-colors text-sm font-medium"
                >
                  View Full Project →
                </a>
                <a
                  href="https://github.com/akashjainn/VR-Puzzle-Game"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  GitHub Repo
                </a>
              </div>
            </div>
            
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