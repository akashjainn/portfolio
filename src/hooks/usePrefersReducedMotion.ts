import { useEffect, useState } from 'react'

// Hook combining CSS media query with user override persisted in localStorage
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stored = localStorage.getItem('prefersReducedMotion')

    const getValue = () => {
      if (stored === 'true') return true
      if (stored === 'false') return false
      return media.matches
    }

    setPrefersReduced(getValue())
    setLoaded(true)

    const listener = () => {
      if (!stored) setPrefersReduced(media.matches)
    }
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const override = (value: boolean) => {
    localStorage.setItem('prefersReducedMotion', String(value))
    setPrefersReduced(value)
  }

  return { prefersReduced, override, loaded }
}
