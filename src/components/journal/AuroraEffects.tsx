'use client'

import { useEffect } from 'react'

export function AuroraEffects() {
  useEffect(() => {
    document.documentElement.classList.add('js-ready')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleaners: Array<() => void> = []

    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
      // ── Cursor dot ──────────────────────────────────────────────────────────
      const cursorEl = document.createElement('div')
      cursorEl.className = 'cursor'
      document.body.appendChild(cursorEl)

      const interactive = 'a, button, [data-bite], input[type="submit"], input[type="button"], summary'
      let hovering = false

      const onMove = (e: PointerEvent) => {
        cursorEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }

      const onOver = (e: PointerEvent) => {
        const hit = !!(e.target as Element).closest(interactive)
        if (hit !== hovering) {
          hovering = hit
          cursorEl.classList.toggle('hover', hovering)
        }
      }

      const onOut = (e: PointerEvent) => {
        if (!hovering) return
        const movingTo = e.relatedTarget instanceof Element ? e.relatedTarget : null
        if (!movingTo?.closest(interactive)) {
          hovering = false
          cursorEl.classList.remove('hover')
        }
      }

      const onDown  = () => cursorEl.classList.add('bite')
      const onUp    = () => cursorEl.classList.remove('bite')
      const onLeave = () => { cursorEl.style.opacity = '0' }
      const onEnter = () => { cursorEl.style.opacity = '1' }

      const opts = { passive: true } as const
      window.addEventListener('pointermove',   onMove,  opts)
      window.addEventListener('pointerover',   onOver,  opts)
      window.addEventListener('pointerout',    onOut,   opts)
      window.addEventListener('pointerdown',   onDown,  opts)
      window.addEventListener('pointerup',     onUp,    opts)
      window.addEventListener('pointercancel', onUp,    opts)
      window.addEventListener('pointerleave',  onLeave, opts)
      window.addEventListener('pointerenter',  onEnter, opts)

      cleaners.push(() => {
        window.removeEventListener('pointermove',   onMove)
        window.removeEventListener('pointerover',   onOver)
        window.removeEventListener('pointerout',    onOut)
        window.removeEventListener('pointerdown',   onDown)
        window.removeEventListener('pointerup',     onUp)
        window.removeEventListener('pointercancel', onUp)
        window.removeEventListener('pointerleave',  onLeave)
        window.removeEventListener('pointerenter',  onEnter)
        cursorEl.remove()
      })

      // ── Magnetic tilt ───────────────────────────────────────────────────────
      let tiltTarget: HTMLElement | null = null
      let rafId = 0
      let pendingX = 0
      let pendingY = 0

      const applyTilt = () => {
        rafId = 0
        if (!tiltTarget) return
        const rect  = tiltTarget.getBoundingClientRect()
        const xNorm = ((pendingX - rect.left) / rect.width  - 0.5) * 2
        const yNorm = ((pendingY - rect.top)  / rect.height - 0.5) * 2
        tiltTarget.style.transform = `perspective(800px) rotateY(${(xNorm * 6).toFixed(2)}deg) rotateX(${(-yNorm * 6).toFixed(2)}deg) scale(1.02)`
        tiltTarget.style.setProperty('--mx', `${((pendingX - rect.left) / rect.width  * 100).toFixed(1)}%`)
        tiltTarget.style.setProperty('--my', `${((pendingY - rect.top)  / rect.height * 100).toFixed(1)}%`)
      }

      const onTiltMove = (e: MouseEvent) => {
        const card = (e.target as Element).closest('a.entry') as HTMLElement | null

        if (card !== tiltTarget) {
          if (tiltTarget) {
            if (rafId) { cancelAnimationFrame(rafId); rafId = 0 }
            tiltTarget.style.transition = ''
            tiltTarget.style.transform  = ''
            tiltTarget.style.willChange = ''
            tiltTarget.style.removeProperty('--mx')
            tiltTarget.style.removeProperty('--my')
          }
          tiltTarget = card
          if (card) {
            card.style.transition = 'transform 0s, border-color .35s, background .35s'
            card.style.willChange = 'transform'
          }
        }

        if (!card) return

        pendingX = e.clientX
        pendingY = e.clientY
        if (!rafId) rafId = requestAnimationFrame(applyTilt)
      }

      const onTiltReset = () => {
        if (!tiltTarget) return
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0 }
        tiltTarget.style.transition = ''
        tiltTarget.style.transform  = ''
        tiltTarget.style.willChange = ''
        tiltTarget.style.removeProperty('--mx')
        tiltTarget.style.removeProperty('--my')
        tiltTarget = null
      }

      window.addEventListener('mousemove',  onTiltMove,  { passive: true })
      window.addEventListener('mouseleave', onTiltReset)

      cleaners.push(() => {
        window.removeEventListener('mousemove',  onTiltMove)
        window.removeEventListener('mouseleave', onTiltReset)
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0 }
        if (tiltTarget) {
          tiltTarget.style.transition = ''
          tiltTarget.style.transform  = ''
          tiltTarget.style.willChange = ''
          tiltTarget.style.removeProperty('--mx')
          tiltTarget.style.removeProperty('--my')
          tiltTarget = null
        }
      })

      // ── Halo ring — added in Task 6 ─────────────────────────────────────────
    }

    return () => {
      cleaners.forEach(fn => fn())
      document.documentElement.classList.remove('js-ready')
    }
  }, [])

  return null
}
