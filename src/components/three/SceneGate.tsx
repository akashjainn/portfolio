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
        {/* next/image for LCP */}
        {/* Poster expects /images/posters/hero-poster.jpg as src */}
        {/* If you want to pass alt, add prop; default is "Hero poster" */}
        {/* Remove placeholder/blurDataURL if not using blur */}
        {/* @ts-ignore: next/image import in client component is valid */}
        {(() => {
          try {
            // Dynamically import next/image to avoid SSR issues
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const Image = require('next/image').default;
            return (
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
            );
          } catch {
            // fallback if next/image fails
            return (
              <img src={posterSrc} alt="Hero poster" className="w-full h-full object-cover select-none pointer-events-none" />
            );
          }
        })()}
        {/* noscript fallback keeps SSR pristine */}
        <noscript>
          <img
            src={posterSrc}
            alt="Hero poster"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </noscript>
      </div>
    );
  }

  return <div className={className}>{children}</div>
}
