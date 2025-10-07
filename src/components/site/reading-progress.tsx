"use client"

import { useEffect, useState } from 'react'

export function ReadingProgress({ targetId = 'main-content' }: { targetId?: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = document.getElementById(targetId)
      if (!el) return setProgress(0)
      const total = el.scrollHeight - window.innerHeight
      const current = Math.min(Math.max(window.scrollY, 0), total)
      setProgress(total > 0 ? (current / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [targetId])

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-40">
      <div
        className="h-full bg-primary transition-[width] duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden
      />
    </div>
  )
}
