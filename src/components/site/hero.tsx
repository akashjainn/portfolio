"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative"
      aria-labelledby="hero-title"
    >
      <div className="container">
        <div className="max-w-4xl">
          <h1 
            id="hero-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.1] mb-6"
          >
            Building reliable, real-time web systems
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            Georgia Tech CS major crafting accessible, measurable Next.js apps with telemetry 
            and performance budgets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/projects">
                View case studies
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Contact
              </Link>
            </Button>
          </div>
          
          {/* Key metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
            <div>
              <div className="text-2xl font-semibold text-foreground">99.98%</div>
              <div className="text-sm text-muted-foreground">Uptime achieved</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground">2M+</div>
              <div className="text-sm text-muted-foreground">Monthly users served</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground">35%</div>
              <div className="text-sm text-muted-foreground">Latency reduction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}