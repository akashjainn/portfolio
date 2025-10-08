"use client"

import { createPortal } from "react-dom"
import { useEffect, useMemo, useRef, useState } from "react"

type Ste string
  selector: string
  title: string
  description: string
  placement?: "top" | "bottom" | "left" | "right"
}

function getRect(el: Element | null) {
  if (!el) return null
  const rect = (el as HTMLElement).getBoundingClientRect()
  const scrollX = window.scrollX || window.pageXOffset
  const scrollY = window.scrollY || window.pageYOffset
  return {
    top: rect.top + scrollY,
    left: rect.left + scrollX,
    width: rect.width,
    height: rect.height,
    right: rect.left + scrollX + rect.width,
    bottom: rect.top + scrollY + rect.height,
  }
}

export function GuidedTour() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [targetRect, setTargetRect] = useState<ReturnType<typeof getRect>>(null)
  const [reduceMotion, setReduceMotion] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  )
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  const steps: Step[] = useMemo(
    () => [
      { id: 'hero', selector: '#hero', title: 'Welcome', description: 'This is the hero. In 30 seconds you’ll know who I am, what I build, and where to go next.', placement: 'bottom' },
      { id: 'featured-projects', selector: '#featured-projects-section', title: 'Featured Case Studies', description: 'Deep dives with architecture, tradeoffs, and measurable impact. Recruiters often start here.', placement: 'top' },
      { id: 'resume', selector: '#resume-viewer', title: 'Resume', description: 'My latest resume opens inline here. Use it alongside the case studies for quick context.', placement: 'bottom' },
    ],
    []
  )

  // Start via custom event
  useEffect(() => {
    const handler = () => {
      try { sessionStorage.setItem('tourActive', 'true'); sessionStorage.setItem('tourIndex', '0') } catch {}
      setIndex(0); setOpen(true)
    }
    window.addEventListener('start-tour', handler as EventListener)
    return () => window.removeEventListener('start-tour', handler as EventListener)
  }, [])

  // Initialize tour from URL params
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const params = new URLSearchParams(window.location.search)
    if (params.get('tour') === 'start' || params.get('tour') === 'again') {
      console.log('Starting tour from URL:', window.location.search)
      setOpen(true)
      setIndex(0)
    }
  }, [])
  
  // Simple test effect to verify the component is working
  useEffect(() => {
    console.log('GuidedTour state:', { open, index, step: steps[index]?.title })
  }, [open, index, steps])

  // Track target element and update position
  useEffect(() => {
    if (!open) return
    const step = steps[index]
    if (!step) return

    const el = document.querySelector(step.selector) as HTMLElement | null
    console.log('Looking for element:', step.selector, 'found:', !!el)
    
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTargetRect(getRect(el))
    } else {
      setTargetRect(null)
    }
  }, [open, index, steps])

  // Simple keyboard navigation
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null
  const step = steps[index]
  const rect = targetRect
  if (!step) return null

  // Popover placement
  let popoverTop = (rect?.bottom ?? 0) + 12
  let popoverLeft = (rect?.left ?? 0)
  const maxWidth = 360
  if (step.placement === 'top' && rect) popoverTop = rect.top - 12
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  if (popoverLeft + maxWidth > viewportWidth - 16) popoverLeft = Math.max(16, viewportWidth - maxWidth - 16)

  return createPortal(
    <div ref={overlayRef} className="fixed inset-0 z-[1000]" role="dialog" aria-modal="true" aria-label="Guided tour">
      <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />

      {/* Highlight ring */}
      {rect && (
        <div aria-hidden className="absolute pointer-events-none border-2 border-red-500 rounded-lg"
          style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height, boxShadow: '0 0 0 9999px rgba(0,0,0,0.4)', borderRadius: 12 }} />
      )}

      {/* Popover */}
      <div ref={popoverRef} className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm focus:outline-none" style={{ top: popoverTop, left: popoverLeft, maxWidth }} tabIndex={-1}>
        <div className="text-xs text-gray-500 mb-1">Step {index + 1} of {steps.length}</div>
        <div className="text-base font-semibold mb-1 text-black">{step.title}</div>
        <p className="text-gray-600 mb-3">{step.description}</p>

        {missingTarget && (
          <div className="mb-3 text-xs text-muted-foreground">
            Couldn’t find the target on this page. You can continue the tour manually.
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={reduceMotion} onChange={(e) => setReduceMotion(e.target.checked)} />
            Skip animations
          </label>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-black bg-white" onClick={() => setOpen(false)}>Skip</button>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 text-black bg-white" onClick={() => setIndex(i => Math.max(0, i - 1))} disabled={index === 0}>Back</button>
            {index < steps.length - 1 ? (
              <button className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-opacity" onClick={() => setIndex(i => Math.min(steps.length - 1, i + 1))}>Next</button>
            ) : (
              <button className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-opacity" onClick={() => setOpen(false)}>Finish</button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
