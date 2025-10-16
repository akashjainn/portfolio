"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

// Lazy components (client-only heavy sections)
const SkillsConstellation = dynamic(() => import("@/components/ui/skills-constellation").then(m => m.SkillsConstellation), { ssr: false })
const Project3DShowcase = dynamic(() => import("@/components/ui/project-3d-preview").then(m => m.Project3DShowcase), { ssr: false })
const CodePlaygroundSection = dynamic(() => import("@/components/ui/live-code-playground").then(m => m.CodePlaygroundSection), { ssr: false })

function OnView({ children, rootMargin = "200px" }: { children: React.ReactNode; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      const entry = entries && entries[0]
      if (entry && entry.isIntersecting) setShow(true)
    }, { rootMargin })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [rootMargin])
  return <div ref={ref}>{show ? children : null}</div>
}

export function DeferredSections() {
  return (
    <>
      <OnView><SkillsConstellation /></OnView>
      <OnView><Project3DShowcase /></OnView>
      <OnView><CodePlaygroundSection /></OnView>
    </>
  )
}
