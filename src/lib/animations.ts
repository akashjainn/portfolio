"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Hook for reveal animations on scroll
 * Uses Intersection Observer for performance
 */
export function useRevealOnScroll(options?: IntersectionObserverInit) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry && entry.isIntersecting) {
          setIsVisible(true)
          // Once revealed, stop observing
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px",
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return { elementRef, isVisible }
}

/**
 * Hook for staggered animations
 * Useful for lists of items that should animate in sequence
 */
export function useStaggeredReveal(itemCount: number, delay: number = 100) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry && entry.isIntersecting) {
          // Animate items in sequence
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i])
            }, i * delay)
          }
          observer.unobserve(container)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px",
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [itemCount, delay])

  return { containerRef, visibleItems }
}

/**
 * Hook for smooth mouse parallax effect
 */
export function useMouseParallax(intensity: number = 0.5) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * intensity
      const deltaY = (e.clientY - centerY) * intensity
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }

    const handleMouseLeave = () => {
      element.style.transform = "translate(0px, 0px)"
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [intensity])

  return elementRef
}

/**
 * Hook for smooth cursor following effect
 */
export function useCursorFollow() {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      element.style.setProperty("--mouse-x", `${x}px`)
      element.style.setProperty("--mouse-y", `${y}px`)
    }

    element.addEventListener("mousemove", handleMouseMove)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return elementRef
}