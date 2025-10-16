"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

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
          <h1
            id="hero-title"
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Building reliable, real-time web systems
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Full-stack development with Next.js and TypeScript. Accessible by default, measured by telemetry, and shipped with performance budgets.
          </p>
          <div className="mt-6">
            <Link
              href="/projects/propsage"
              className="inline-flex items-center rounded-md bg-primary px-4 py-3 text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-foreground"
            >
              View PropSage case study
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
