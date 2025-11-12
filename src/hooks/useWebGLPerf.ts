import { useEffect, useRef, useState } from 'react'

interface PerfSample {
  fps: number
  frameTime: number
}

// Lightweight FPS + frame time sampler. Stops after sample window to avoid overhead.
export function useWebGLPerf(sampleSeconds = 2) {
  const [sample, setSample] = useState<PerfSample>({ fps: 60, frameTime: 16 })
  const rafRef = useRef<number>()
  const startRef = useRef<number>()
  const framesRef = useRef(0)
  const activeRef = useRef(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const loop = (t: number) => {
      if (!startRef.current) startRef.current = t
      framesRef.current++
      const elapsed = t - startRef.current
      if (elapsed >= sampleSeconds * 1000) {
        const fps = framesRef.current / (elapsed / 1000)
        setSample({ fps, frameTime: elapsed / framesRef.current })
        activeRef.current = false
        return
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [sampleSeconds])

  return sample
}
