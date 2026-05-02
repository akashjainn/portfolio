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

      const onTiltMove = (e: MouseEvent) => {
        const card = (e.target as Element).closest('a.entry') as HTMLElement | null

        if (card !== tiltTarget) {
          // reset previous card immediately (CSS spring-back via transition)
          if (tiltTarget) {
            tiltTarget.style.transition = ''
            tiltTarget.style.transform  = ''
            tiltTarget.style.willChange = ''
          }
          tiltTarget = card
          if (card) {
            // disable transform transition while actively moving so it tracks instantly
            card.style.transition  = 'transform 0s, border-color .35s, background .35s'
            card.style.willChange  = 'transform'
          }
        }

        if (!card) return

        const rect  = card.getBoundingClientRect()
        const xNorm = ((e.clientX - rect.left) / rect.width  - 0.5) * 2  // -1 to 1
        const yNorm = ((e.clientY - rect.top)  / rect.height - 0.5) * 2  // -1 to 1
        card.style.transform = `perspective(800px) rotateY(${(xNorm * 6).toFixed(2)}deg) rotateX(${(-yNorm * 6).toFixed(2)}deg) scale(1.02)`
        card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width  * 100).toFixed(1)}%`)
        card.style.setProperty('--my', `${((e.clientY - rect.top)  / rect.height * 100).toFixed(1)}%`)
      }

      const onTiltReset = () => {
        if (!tiltTarget) return
        // restore CSS transition so spring-back animates over .5s
        tiltTarget.style.transition = ''
        tiltTarget.style.transform  = ''
        tiltTarget.style.willChange = ''
        tiltTarget = null
      }

      window.addEventListener('mousemove',  onTiltMove,  { passive: true })
      window.addEventListener('mouseleave', onTiltReset)

      cleaners.push(() => {
        window.removeEventListener('mousemove',  onTiltMove)
        window.removeEventListener('mouseleave', onTiltReset)
        if (tiltTarget) {
          tiltTarget.style.transition = ''
          tiltTarget.style.transform  = ''
          tiltTarget.style.willChange = ''
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
