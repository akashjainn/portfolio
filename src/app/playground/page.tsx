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
            
            {/* Finn's Quest Adventure Time Game Demo */}
            <div className="mb-12 bg-card border-2 border-border/40 rounded-2xl p-8 shadow-lg hover:border-[hsl(280_100%_70%)] hover:shadow-[0_0_20px_hsla(280,100%,70%,0.3)] transition-all duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-semibold mb-2 text-foreground">Finn&apos;s Quest - Adventure Time GBA Game</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A fully playable Game Boy Advance game featuring Finn from Adventure Time. 
                  Built with custom sprites, animations, and game mechanics.
                </p>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/sLqPrHasO4g"
                  title="Finn's Quest Adventure Time GBA Game Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4">
                <a
                  href="/projects/adventuretime-gba"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium shadow-elegant hover:shadow-elegant-lg"
                >
                  View Full Project
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Featured 3D Asset Showcase */}
            <div className="mb-16 bg-card border-2 border-border/40 rounded-2xl p-8 shadow-lg hover:border-[hsl(194_100%_50%)] hover:shadow-[0_0_20px_hsla(194,100%,50%,0.3)] transition-all duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-semibold mb-2 text-foreground">VR Game Assets - Interactive 3D Viewer</h2>
                <p className="text-muted-foreground leading-relaxed">
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
              <div className="mt-4">
                <a
                  href="/projects/vr-puzzle-game"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium shadow-elegant hover:shadow-elegant-lg"
                >
                  View Full Project
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
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