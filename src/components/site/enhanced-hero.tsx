"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRevealOnScroll, useMouseParallax } from "@/lib/animations"
import { KpiChip } from "@/components/ui/kpi-chip"
import { useState, useEffect } from 'react'
import { ChevronDown, Sparkles, Zap, Target } from 'lucide-react'

// Rotating taglines for dynamic content
const ROTATING_TAGLINES = [
  "Building reliable, real-time web systems",
  "Crafting performant, accessible experiences", 
  "Delivering enterprise-scale solutions",
  "Creating measurable digital impact"
]

// Floating particles component
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([])

  useEffect(() => {
    const newParticles = Array.from({length: 20}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  )
}

export function EnhancedHero() {
  const { elementRef, isVisible } = useRevealOnScroll()
  const parallaxRef1 = useMouseParallax(0.02)
  const parallaxRef2 = useMouseParallax(0.015)
  const [currentTagline, setCurrentTagline] = useState(0)
  const [isTaglineVisible, setIsTaglineVisible] = useState(true)

  // Rotate taglines every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTaglineVisible(false)
      setTimeout(() => {
        setCurrentTagline((prev) => (prev + 1) % ROTATING_TAGLINES.length)
        setIsTaglineVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('featured-projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
      aria-labelledby="hero-title"
    >
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Background Elements with Enhanced Parallax */}
      <div className="absolute inset-0">
        <div 
          ref={parallaxRef1}
          className="absolute top-1/4 -right-48 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl transition-transform duration-300 ease-out"
        />
        <div 
          ref={parallaxRef2}
          className="absolute bottom-1/4 -left-48 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-secondary/5 rounded-full blur-3xl transition-transform duration-300 ease-out"
        />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgb(0 0 0 / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgb(0 0 0 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container relative z-10">
        <div 
          ref={elementRef}
          className={`max-w-5xl mx-auto text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Status Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 bg-success-50 border border-success-200 rounded-full text-success-700 text-sm font-medium mb-8 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
            Available for new opportunities
            <Sparkles className="h-4 w-4" />
          </div>

          {/* Main Heading */}
          <h1 
            id="hero-title"
            className={`text-display text-foreground mb-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: '200ms',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              lineHeight: '1.1'
            }}
          >
            <span className="block">
              Hi, I&apos;m{' '}
              <span className="relative z-10">
                <span className="font-bold text-foreground">
                  Akash Jain
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 blur-lg -z-10" />
              </span>
            </span>
          </h1>

          {/* Rotating Tagline */}
          <div 
            className={`h-16 flex items-center justify-center mb-8 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <p 
              className={`text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl leading-relaxed transition-all duration-300 ${
                isTaglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {ROTATING_TAGLINES[currentTagline]}
            </p>
          </div>

          {/* Subtext */}
          <p 
            className={`text-lg sm:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            Experience developing full-stack projects with{' '}
            <span className="font-semibold text-foreground">Next.js and TypeScript</span>, 
            crafting accessible applications with performance budgets and telemetry.
          </p>
          
          {/* Action Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-elegant hover:shadow-primary group relative overflow-hidden"
            >
              <Link href="/projects" className="flex items-center relative z-10">
                <Target className="mr-2 h-5 w-5" />
                View Case Studies
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 shadow-elegant group"
            >
              <Link href="/contact" className="flex items-center">
                <Zap className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Let&apos;s Connect
              </Link>
            </Button>

            {/* Guided tour button removed */}
          </div>

          {/* Enhanced KPI Chips */}
          <div 
            className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '700ms' }}
            aria-label="Key achievements and metrics"
          >
            <KpiChip 
              label="System Uptime" 
              value="99.2" 
              suffix="%" 
              href="/projects/stocksense"
              className="hover:scale-105 transition-transform"
            />
            <KpiChip 
              label="Mobile LCP" 
              value="1.6" 
              suffix="s" 
              href="/projects/propsage"
              className="hover:scale-105 transition-transform" 
            />
            <KpiChip 
              label="Case Studies" 
              value={3} 
              href="/projects"
              className="hover:scale-105 transition-transform"
            />
            <KpiChip 
              label="Accessibility" 
              value="WCAG 2.2 AA" 
              href="/about"
              className="hover:scale-105 transition-transform"
            />
          </div>

          {/* Speed-run guide */}
          <div 
            className={`text-sm text-muted-foreground/70 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <span className="font-medium">Recruiter speed-run:</span>{' '}
            30s overview → 2‑min tour → 10‑min deep dive. Start with{' '}
            <Link 
              href="/projects" 
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Featured Case Studies
            </Link>
            .
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToProjects}
            className={`mt-16 text-muted-foreground hover:text-foreground transition-all duration-1000 ease-out group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '900ms' }}
            aria-label="Scroll to projects section"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-wide">Explore Work</span>
              <ChevronDown className="h-5 w-5 animate-bounce group-hover:animate-none group-hover:translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}