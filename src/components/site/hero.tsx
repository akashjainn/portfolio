"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRevealOnScroll, useMouseParallax } from "@/lib/animations"
import { KpiChip } from "@/components/ui/kpi-chip"

export function Hero() {
  const { elementRef, isVisible } = useRevealOnScroll()
  const parallaxRef1 = useMouseParallax(0.02)
  const parallaxRef2 = useMouseParallax(0.015)

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="container relative z-10">
        <div 
          ref={elementRef}
          className={`max-w-4xl transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h1 
            id="hero-title"
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold tracking-[-0.02em] leading-[0.95] mb-6 text-balance transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Building reliable, <span className="gradient-text">real-time</span> web systems
          </h1>
          
          <p 
            className={`text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed text-pretty transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Georgia Tech CS major crafting accessible, measurable Next.js apps with telemetry 
            and performance budgets.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Button asChild size="lg" className="btn-primary interactive shadow-elegant hover:shadow-elegant-lg group">
              <Link href="/projects" className="flex items-center">
                View case studies
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="interactive hover:bg-muted/50 shadow-elegant group">
              <Link href="/contact" className="flex items-center">
                Contact
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </Button>
          </div>

          {/* Proof chips */}
          <div 
            className={`mt-6 flex flex-wrap gap-2 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '800ms' }}
            aria-label="Key proof metrics"
          >
            <KpiChip label="Uptime" value="99.2" suffix="%" href="/projects" />
            <KpiChip label="Mobile LCP" value="1.6" suffix="s" href="/projects/stocksense" />
            <KpiChip label="Case studies" value={4} href="/projects" />
            <KpiChip label="A11y" value="WCAG 2.2 AA" href="/about" />
          </div>

          {/* Recruiter speed-run strip */}
          <div 
            className={`mt-4 text-sm text-muted-foreground transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            30s overview → 2‑min tour → 10‑min deep dive. Start with
            <Link href="/projects" className="ml-1 underline underline-offset-2">Featured Case Studies</Link>.
          </div>
        </div>
      </div>
      
      {/* Subtle background decoration with parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-background/50 pointer-events-none" />
      <div 
        ref={parallaxRef1}
        className="absolute top-1/2 -translate-y-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out"
      />
      <div 
        ref={parallaxRef2}
        className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out"
      />
    </section>
  )
}
