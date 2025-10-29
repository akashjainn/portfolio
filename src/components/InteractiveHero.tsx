"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { CustomFontText } from "@/components/ui/custom-font-text"

/**
 * Minimal, high-performance hero:
 * - One LCP surface (poster can be added later)
 * - Masked text reveal via WAAPI (transform/opacity only)
 * - Honors prefers-reduced-motion
 * - Clear primary CTA to flagship case study
 */
export default function InteractiveHero() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const reduce = typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (reduce || !titleRef.current) return

    const anim = titleRef.current.animate(
      [
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0 0)" },
      ],
      { duration: 900, easing: "cubic-bezier(.22,.61,.36,1)", fill: "forwards" }
    )
    return () => anim.cancel()
  }, [])

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-[72vh] flex items-end overflow-hidden bg-gradient-to-br from-background via-background to-muted/30"
    >
      <div className="container pb-10 pt-20">
        <div className="max-w-4xl">
          <div className="mb-4">
            <CustomFontText 
              text="Akash Jain" 
              alt="Akash Jain"
              letterClassName="h-12 md:h-16 lg:h-20"
              className="gap-0.5 md:gap-1"
            />
          </div>
          <p className="text-sm md:text-base text-muted-foreground mb-2 font-medium">
            Full‑stack Developer
          </p>
          <h1
            id="hero-title"
            ref={titleRef}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-[1.1]"
          >
            Building reliable, <span className="text-gradient-vibrant">real-time</span> web systems
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Full-stack development with Next.js and TypeScript. Accessible by default, measured by telemetry, and shipped with performance budgets.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href="/projects/propsage"
              className="inline-flex items-center rounded-md px-6 py-3 text-sm font-semibold transition-all duration-300 bg-transparent border-2 border-vibrant-blue text-vibrant-blue hover:bg-vibrant-blue/10 hover:shadow-[0_0_20px_hsla(194,100%,50%,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-vibrant-blue"
            >
              View PropSage case study →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
