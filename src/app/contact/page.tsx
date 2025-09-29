import { Navigation } from "@/components/site/navigation"

export const metadata = {
  title: "Contact",
  description: "Get in touch with Akash Jain for software engineering opportunities, collaborations, or questions."
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="py-8">
        <div className="container max-w-4xl">
          <header className="mb-12">
            <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.1] mb-6">Contact</h1>
            <p className="text-xl text-muted-foreground">
              Have a role where reliability and performance matter? Let&apos;s talk.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.01em] leading-tight mb-6">Get in touch</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a 
                      href="mailto:akashjain1311@gmail.com"
                      className="link"
                    >
                      akashjain1311@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a 
                      href="tel:+16786650467"
                      className="link"
                    >
                      (678) 665-0467
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <a 
                      href="https://linkedin.com/in/akashjain1311"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      linkedin.com/in/akashjain1311
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-xl">🐙</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">GitHub</h3>
                    <a 
                      href="https://github.com/akashjainn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      github.com/akashjainn
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">Atlanta, GA</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.01em] leading-tight mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <a 
                  href="mailto:akashjain1311@gmail.com?subject=Software Engineering Opportunity"
                  className="btn btn-primary w-full text-left justify-start"
                >
                  📧 Email about opportunities
                </a>
                
                <a 
                  href="/Akash_Jain_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full text-left justify-start"
                >
                  📄 Download resume
                </a>
                
                <a 
                  href="https://github.com/akashjainn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full text-left justify-start"
                >
                  💻 Browse code repositories
                </a>
                
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-semibold mb-2">Response Time</h3>
                  <p className="text-sm text-muted-foreground">
                    I typically respond to emails within 48 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 p-6 border rounded-lg bg-muted/30">
            <h2 className="text-lg font-semibold mb-4">What I&apos;m looking for</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Full-stack engineering roles</strong> with focus on Next.js/React/TypeScript</li>
              <li>• <strong>Performance-critical systems</strong> requiring telemetry and monitoring</li>
              <li>• <strong>Accessibility-first organizations</strong> committed to WCAG 2.2 AA compliance</li>
              <li>• <strong>Real-time applications</strong> using WebSockets, SSE, or similar technologies</li>
              <li>• <strong>Mentorship opportunities</strong> in enterprise-scale web development</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}