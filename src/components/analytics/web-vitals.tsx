"use client"

import { useEffect } from 'react'

// Minimal RUM: send web vitals to an API or analytics endpoint
export function WebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Lazy-load the web-vitals library to avoid affecting TTI
  // @ts-ignore - type-only resolution not needed for dynamic import at runtime
  import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onINP, onFCP }) => {
      const report = (metric: any) => {
        try {
          // Send to a no-op endpoint for now; user can wire to analytics
          navigator.sendBeacon?.('/api/vitals', JSON.stringify(metric))
        } catch {}
      }
      onCLS(report)
      onFID(report)
      onLCP(report)
      onTTFB(report)
      onINP?.(report)
      onFCP?.(report)
    })
  }, [])
  return null
}
