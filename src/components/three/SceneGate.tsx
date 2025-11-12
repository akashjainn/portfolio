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
    // Start with optimistic render, then check perf
    // Initial FPS is 60 from useWebGLPerf, so show scene unless user prefers reduced motion
    const shouldShow = !prefersReduced && !reduceEffects
    console.log('SceneGate decision:', { prefersReduced, reduceEffects, fps: perf.fps, shouldShow })
    
    if (shouldShow) {
      setShowScene(true)
    }
    
    // Later, if perf drops below threshold, hide the scene
    if (showScene && perf.fps < 30 && perf.fps !== 60) {
      console.log('SceneGate: hiding scene due to low FPS')
      setShowScene(false)
    }
  }, [prefersReduced, reduceEffects, perf.fps, showScene])


  if (!showScene) {
    return (
      <div className={className} aria-hidden="true" style={{ background: '#0d0f11' }}>
        {/* Fallback solid color background if poster fails to load */}
        <Image
          src={posterSrc}
          alt="Hero poster"
          fill
          sizes="(max-width:768px) 100vw, 1200px"
          priority
          className="object-cover select-none pointer-events-none"
          onError={(e) => {
            console.warn('Hero poster failed to load:', posterSrc)
            // Hide the image on error, showing the dark background
            e.currentTarget.style.display = 'none'
          }}
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
