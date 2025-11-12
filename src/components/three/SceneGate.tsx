"use client"

import dynamic from 'next/dynamic'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useWebGLPerf } from '@/hooks/useWebGLPerf'
import { useEffectsPrefs } from '@/context/EffectsPrefsContext'
import { useEffect, useState } from 'react'

interface SceneGateProps {
  posterSrc: string
  children: React.ReactNode
  className?: string
}

// Decides whether to render WebGL scene or fallback poster based on user prefs + perf.
export function SceneGate({ posterSrc, children, className }: SceneGateProps) {
  const { prefersReduced } = usePrefersReducedMotion()
  const perf = useWebGLPerf(1.5)
  const { reduceEffects } = useEffectsPrefs()
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    // simple heuristic: require FPS > 30 & not reduced
    if (!prefersReduced && !reduceEffects && perf.fps > 30) setShowScene(true)
  }, [prefersReduced, reduceEffects, perf.fps])

  if (!showScene) {
    return (
      <div className={className} aria-hidden="true">
        <img src={posterSrc} alt="" className="w-full h-full object-cover select-none pointer-events-none" />
      </div>
    )
  }

  return <div className={className}>{children}</div>
}
