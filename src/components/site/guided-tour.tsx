"use client"

import { createPortal } from "react-dom"
import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

type Step = {
  id: string
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
  const [missingTarget, setMissingTarget] = useState(false)

  const rafRef = useRef<number | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const lastFocusRef = useRef<HTMLElement | null>(null)
  const stepStartRef = useRef<number>(0)
  const missingTimerRef = useRef<number | null>(null)
  const pendingRouteRef = useRef<string | null>(null)

  const router = useRouter()
  const pathname = usePathname()

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

  // URL deep-link and session carryover
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const shouldStart = params.get('tour') === 'start' || params.get('tour') === 'again'
    const active = sessionStorage.getItem('tourActive') === 'true'
    const savedIndex = sessionStorage.getItem('tourIndex')
    if (active && savedIndex) {
      setIndex(Math.max(0, parseInt(savedIndex, 10) || 0))
      setOpen(true)
      return
    }
    if (shouldStart) {
      try { sessionStorage.setItem('tourActive', 'true'); sessionStorage.setItem('tourIndex', '0') } catch {}
      setIndex(0)
      setOpen(true)
    }
  }, [])

  // Track target rect + scroll into view + cross-page hop
  useEffect(() => {
    if (!open) return
    const step = steps[index]
    if (!step) return

    // Cross-page: navigate to /resume before resolving target
    if (step.id === 'resume' && pathname !== '/resume') {
      pendingRouteRef.current = '/resume'
      try { sessionStorage.setItem('tourActive', 'true'); sessionStorage.setItem('tourIndex', String(index)) } catch {}
      setMissingTarget(false)
      if (missingTimerRef.current) { clearTimeout(missingTimerRef.current); missingTimerRef.current = null }
      router.push('/resume?tour=again')
      return
    }

    const el = document.querySelector(step.selector) as HTMLElement | null
    if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })

    const update = () => setTargetRect(getRect(el))
    const onScroll = () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = requestAnimationFrame(update) }
    const onResize = () => onScroll()
    const ro = (typeof ResizeObserver !== 'undefined' && el) ? new ResizeObserver(onScroll) : null
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    ro?.observe(el as Element)

    // missing target fallback timer
    if (!el) {
      if (missingTimerRef.current) { clearTimeout(missingTimerRef.current); missingTimerRef.current = null }
      missingTimerRef.current = window.setTimeout(() => setMissingTarget(true), 2000)
    } else {
      setMissingTarget(false)
      if (missingTimerRef.current) { clearTimeout(missingTimerRef.current); missingTimerRef.current = null }
    }

    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro?.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      if (missingTimerRef.current) { clearTimeout(missingTimerRef.current); missingTimerRef.current = null }
    }
  }, [open, index, steps, reduceMotion, pathname, router])

  // Cross-page completion analytics: route matched expected
  useEffect(() => {
    if (!open) return
    if (pendingRouteRef.current && pathname === pendingRouteRef.current) {
      pendingRouteRef.current = null
      const now = Date.now()
      const dwell = stepStartRef.current ? now - stepStartRef.current : 0
      const payload = { to: pathname, fromIndex: index, dwellMs: dwell }
      window.dispatchEvent(new CustomEvent('tour_step_crosspage', { detail: payload }))
    }
  }, [pathname, open, index])

  // Global keys
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowRight') setIndex(i => Math.min(i + 1, steps.length - 1))
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(i - 1, 0))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, steps.length])

  // Focus trap + inert outside content
  useEffect(() => {
    if (!open) return
    lastFocusRef.current = (document.activeElement as HTMLElement) ?? null
    const overlay = overlayRef.current!
    const popover = popoverRef.current!

    const focusables = () => Array.from(popover.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1)
    setTimeout(() => { (focusables()[0] || popover).focus() }, 0)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const els = focusables()
      if (els.length === 0) { e.preventDefault(); popover.focus(); return }
      const first = els[0]
      const last = els[els.length - 1]
      if (!first || !last) return
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    }
    overlay.addEventListener('keydown', onKeyDown)

    const siblings = Array.from(document.body.children).filter(c => c !== overlay)
    siblings.forEach(el => { el.setAttribute('aria-hidden', 'true'); (el as any).inert = true })

    return () => {
      overlay.removeEventListener('keydown', onKeyDown)
      siblings.forEach(el => { el.removeAttribute('aria-hidden'); (el as any).inert = false })
      lastFocusRef.current?.focus()
    }
  }, [open])

  // Analytics helpers
  const emit = (name: string, detail?: any) => {
    const payload = { event: name, ts: Date.now(), stepIndex: index, ...detail }
    window.dispatchEvent(new CustomEvent(name, { detail: payload }))
    const w = window as any
    if (w?.dataLayer?.push) w.dataLayer.push(payload)
  }

  useEffect(() => { if (open) { emit('tour_started'); stepStartRef.current = Date.now() } }, [open])
  useEffect(() => {
    if (!open) return
    const now = Date.now()
    const dwell = stepStartRef.current ? now - stepStartRef.current : 0
    if (index > 0) emit('tour_step_dwell', { dwellMs: dwell, stepIndex: index - 1 })
    emit('tour_step_view', { stepId: steps[index]?.id })
    stepStartRef.current = now
    try { sessionStorage.setItem('tourIndex', String(index)); sessionStorage.setItem('tourActive', 'true') } catch {}
  }, [index, open, steps])

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
      <div className="absolute inset-0 bg-black/60" onClick={() => { emit('tour_dismissed', { stepIndex: index }); setOpen(false) }} />

      {/* Highlight ring */}
      {rect && (
        <div aria-hidden className="absolute pointer-events-none border-2 border-primary rounded-lg"
          style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height, boxShadow: '0 0 0 9999px rgba(0,0,0,0.4)', borderRadius: 12 }} />
      )}

      {/* Popover */}
      <div ref={popoverRef} className="absolute bg-card border border-border/50 rounded-lg shadow-elegant p-4 text-sm focus:outline-none" style={{ top: popoverTop, left: popoverLeft, maxWidth }} tabIndex={-1}>
        <div className="text-xs text-muted-foreground mb-1">Step {index + 1} of {steps.length}</div>
        <div className="text-base font-semibold mb-1">{step.title}</div>
        <p className="text-muted-foreground mb-3">{step.description}</p>

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
          <button className="px-3 py-1.5 rounded-md border border-border/60 hover:bg-muted/50 transition-colors" onClick={() => { emit('tour_dismissed', { stepIndex: index }); setOpen(false) }}>Skip</button>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-md border border-border/60 hover:bg-muted/50 transition-colors disabled:opacity-50" onClick={() => setIndex(i => Math.max(0, i - 1))} disabled={index === 0}>Back</button>
            {index < steps.length - 1 ? (
              <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity" onClick={() => setIndex(i => Math.min(steps.length - 1, i + 1))}>Next</button>
            ) : (
              <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity" onClick={() => { emit('tour_completed'); try { localStorage.setItem('tour_seen', 'true') } catch {} setOpen(false) }}>Finish</button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
