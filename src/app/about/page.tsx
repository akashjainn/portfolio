import { Navigation } from "@/components/site/navigation"

export const metadata = {
  title: "About",
  description: "Learn more about Akash Jain, a Georgia Tech CS major focused on building reliable, performant web systems."
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="py-8">
        <div className="container max-w-4xl">
          <header className="mb-12">
            <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.1] mb-6">About</h1>
          </header>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              I&apos;m Akash Jain, a Georgia Tech CS major focused on performant, accessible web systems.
              I build with Next.js/TypeScript, validate with telemetry and tests, and ship with a bias 
              for clarity, reliability, and measurable outcomes.
            </p>

            <h2>Experience</h2>
            <div className="bg-muted/30 rounded-lg p-6 mb-8">
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

            <h2>Education</h2>
            <div className="bg-muted/30 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-2">Georgia Institute of Technology</h3>
              <p className="text-muted-foreground mb-2">Bachelor of Science in Computer Science</p>
              <p className="text-sm text-muted-foreground">GPA: 3.5</p>
            </div>

            <h2>Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Clarity over cleverness</h3>
                <p className="text-sm text-muted-foreground">Code should be understandable first, performant second.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Measurable outcomes</h3>
                <p className="text-sm text-muted-foreground">Every feature ships with telemetry and success metrics.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Accessibility by default</h3>
                <p className="text-sm text-muted-foreground">WCAG 2.2 AA compliance isn&apos;t optional—it&apos;s foundational.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Performance budgets</h3>
                <p className="text-sm text-muted-foreground">LCP ≤2.5s, CLS ≤0.05, enforced in CI.</p>
              </div>
            </div>

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
                  className="bg-muted/50 rounded-lg p-3 text-center text-sm font-medium"
                >
                  {skill}
                </div>
              ))}
            </div>

            <h2>Contact</h2>
            <p className="mb-4">
              Have a role where reliability and performance matter? Let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:akashjain1311@gmail.com" 
                className="btn btn-primary"
              >
                Email me
              </a>
              <a 
                href="/resume" 
                className="btn btn-outline"
              >
                View resume
              </a>
              <a 
                href="https://github.com/akashjainn" 
                className="btn btn-ghost"
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