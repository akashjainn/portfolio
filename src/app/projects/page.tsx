import { Navigation } from "@/components/site/navigation"
import { ProjectCard } from "@/components/site/project-card"

// Temporary project data - will be loaded from MDX later
const allProjects = [
  {
    title: "PropSage",
    summary: "Real-time sports prop pricing with evidence-aware adjustments and edge broadcasts. Monte-Carlo engine, WS streaming, and offline demo mode.",
    tags: ["Next.js", "Express", "WebSocket", "Turborepo", "Monte Carlo"],
    href: "/projects/propsage",
    demo: "#",
    repo: "https://github.com/akashjainn/PropSage"
  },
  {
    title: "StockSense",
    summary: "Portfolio analytics from CSV to live valuation. Live quotes via SSE, MongoDB transactions, forward-filled historicals, and health checks.",
    tags: ["Next.js", "MongoDB", "Alpha Vantage", "Alpaca", "SSE"],
    href: "/projects/stocksense",
    demo: "https://stocksense-taupe.vercel.app",
    repo: "https://github.com/akashjainn/stocksense"
  },
  {
    title: "LandSafe",
    summary: "Location safety toolkit with reliability focus and mapping UX. Emphasizes real-world safety considerations and performance.",
    tags: ["TypeScript", "Mapping", "Safety", "Performance"],
    href: "/projects/landsafe",
    repo: "https://github.com/akashjainn/LandSafe"
  },
  {
    title: "MarketRoyale",
    summary: "Trading and market domain visualization with structure for releases. Focus on market data presentation and user experience.",
    tags: ["TypeScript", "Visualization", "Trading"],
    href: "/projects/marketroyale",
    repo: "https://github.com/akashjainn/marketroyale"
  },
  {
    title: "AdventureTime (GBA)",
    summary: "Low-level game development for constrained hardware. Assembly work showcasing systems thinking and memory/performance tradeoffs.",
    tags: ["Assembly", "Game Dev", "Performance", "Systems"],
    href: "/projects/adventuretime-gba",
    repo: "https://github.com/akashjainn/adventureTimeGame"
  }
]

export const metadata = {
  title: "Projects",
  description: "A collection of software projects showcasing full-stack development, real-time systems, and performance optimization."
}

export default function ProjectsPage() {
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}