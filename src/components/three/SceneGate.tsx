"use client"

import Image from 'next/image'
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
        <Image
          src={posterSrc}
          alt="Hero poster"
          fill
          sizes="(max-width:768px) 100vw, 1200px"
          priority
          placeholder="blur"
          blurDataURL="/images/posters/hero-poster-blur.jpg"
          className="object-cover select-none pointer-events-none"
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={posterSrc} alt="Hero poster" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </noscript>
      </div>
    )
  }

  return <div className={className}>{children}</div>
}
