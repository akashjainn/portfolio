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
        </div>
      </div>
    </section>
  )
}