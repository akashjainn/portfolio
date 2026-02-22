import { Navigation } from "@/components/site/navigation"
import { AnimatedBlobs } from "@/components/ui/animated-blobs"
import { WaveDivider } from "@/components/ui/wave-divider"
import { CommandPalette } from "@/components/ui/command-palette"

export const metadata = {
  title: "About",
  description: "Learn more about Akash Jain, a full-stack developer focused on building reliable, performant web systems."
}

export default function AboutPage() {
  return (
    <>
      <AnimatedBlobs />
      <Navigation />
      <CommandPalette />
      <main id="main-content" className="py-8">
        <div className="container max-w-4xl">
          <header className="mb-12">
            <h1 className="text-4xl font-display font-semibold tracking-[-0.02em] leading-[1.1] mb-6">About</h1>
          </header>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              I&apos;m Akash Jain, a full-stack developer focused on performant, accessible web systems.
              I build with Next.js/TypeScript, validate with telemetry and tests, and ship with a bias 
              for clarity, reliability, and measurable outcomes.
            </p>

            <WaveDivider variant="blue-purple" className="my-12" />

            <h2>Experience</h2>
            <div className="bg-card border-2 border-border/40 shadow-lg rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-2">State Farm</h3>
              <p className="text-muted-foreground mb-4">Software Engineering Intern</p>
              <ul className="space-y-2">
                <li>Built production systems serving <strong>2M+ monthly users</strong></li>
                <li>Achieved <strong>35% latency reduction</strong> in chat systems</li>
                <li>Increased platform engagement by <strong>22%</strong></li>
                <li>Maintained <strong>99.98% uptime</strong> across services</li>
                <li>Led microservices migration reducing infrastructure costs</li>
              </ul>
            </div>

            <WaveDivider variant="pink-orange" className="my-12" />

            <h2>Education</h2>
            <div className="bg-card border-2 border-border/40 shadow-lg rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-2">Georgia Institute of Technology</h3>
              <p className="text-muted-foreground mb-2">Bachelor of Science in Computer Science and Design</p>
              <p className="text-sm text-muted-foreground">GPA: 3.6</p>
            </div>

            <WaveDivider variant="mint-yellow" className="my-12" />

            <h2>Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card border-2 border-border/40 shadow-lg rounded-lg p-4">
                <h3 className="font-semibold mb-2">Clarity over cleverness</h3>
                <p className="text-sm text-muted-foreground">Code should be understandable first, performant second.</p>
              </div>
              <div className="bg-card border-2 border-border/40 shadow-lg rounded-lg p-4">
                <h3 className="font-semibold mb-2">Measurable outcomes</h3>
                <p className="text-sm text-muted-foreground">Every feature ships with telemetry and success metrics.</p>
              </div>
              <div className="bg-card border-2 border-border/40 shadow-lg rounded-lg p-4">
                <h3 className="font-semibold mb-2">Accessibility by default</h3>
                <p className="text-sm text-muted-foreground">WCAG 2.2 AA compliance isn&apos;t optional—it&apos;s foundational.</p>
              </div>
              <div className="bg-card border-2 border-border/40 shadow-lg rounded-lg p-4">
                <h3 className="font-semibold mb-2">Performance budgets</h3>
                <p className="text-sm text-muted-foreground">LCP ≤2.5s, CLS ≤0.05, enforced in CI.</p>
              </div>
            </div>

            <WaveDivider variant="rainbow" className="my-12" />

            <h2>Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                "Next.js", "React", "TypeScript", "JavaScript",
                "Node.js", "Express", "MongoDB", "PostgreSQL",
                "WebSockets", "REST APIs", "GraphQL", "tRPC",
                "Tailwind CSS", "Prisma", "Docker", "AWS"
              ].map((skill) => (
                <div 
                  key={skill}
                  className="bg-card border-2 border-border/40 shadow-lg rounded-lg p-3 text-center text-sm font-medium"
                >
                  {skill}
                </div>
              ))}
            </div>

            <WaveDivider variant="blue-purple" className="my-12" />

            <h2>Contact</h2>
            <p className="mb-4">
              Have a role where reliability and performance matter? Let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:akashjain1311@gmail.com" 
                className="inline-flex items-center justify-center text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(194_100%_50%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent border-2 border-vibrant-blue text-vibrant-blue hover:bg-vibrant-blue/10 hover:shadow-[0_0_20px_hsla(194,100%,50%,0.3)] h-11 rounded-md px-8"
              >
                Email me
              </a>
              <a 
                href="/resume" 
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8"
              >
                View resume
              </a>
              <a 
                href="https://github.com/akashjainn" 
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}