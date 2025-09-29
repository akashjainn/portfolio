import { Navigation } from "@/components/site/navigation"
import { Hero } from "@/components/site/hero"
import { ProjectCard } from "@/components/site/project-card"

// Temporary project data - will be loaded from MDX later
const featuredProjects = [
  {
    title: "PropSage",
    summary: "Real-time sports prop pricing with evidence-aware adjustments and edge broadcasts. Monte-Carlo engine with WS streaming.",
    tags: ["Next.js", "Express", "WebSocket", "Turborepo"],
    href: "/projects/propsage",
    demo: "#",
    repo: "https://github.com/akashjainn/PropSage"
  },
  {
    title: "StockSense",
    summary: "Portfolio analytics from CSV to live valuation. Live quotes via SSE, MongoDB transactions, and health checks.",
    tags: ["Next.js", "MongoDB", "Alpha Vantage", "SSE"],
    href: "/projects/stocksense",
    demo: "https://stocksense-taupe.vercel.app",
    repo: "https://github.com/akashjainn/stocksense"
  },
  {
    title: "LandSafe",
    summary: "Location safety toolkit with reliability focus and mapping UX. A11y and performance optimization planned.",
    tags: ["TypeScript", "Mapping", "Safety"],
    href: "/projects/landsafe",
    repo: "https://github.com/akashjainn/LandSafe"
  }
]

export default function Home() {
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
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
