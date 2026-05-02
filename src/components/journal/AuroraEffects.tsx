'use client'

import { useEffect } from 'react'

export function AuroraEffects() {
  useEffect(() => {
    document.documentElement.classList.add('js-ready')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Aurora pointer parallax — event-driven, CSS transition handles smoothing ──
    const field = document.querySelector('.aurora-field') as HTMLElement | null
    let cleanupField: (() => void) | null = null
    if (field && !reduced) {
      const onMove = (e: PointerEvent) => {
        const w = window.innerWidth, h = window.innerHeight
        const tx = (e.clientX / w - 0.5) * 40
        const ty = (e.clientY / h - 0.5) * 40
        field.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      cleanupField = () => window.removeEventListener('pointermove', onMove)
    }

    // ── Bite cursor (desktop fine pointer only) ──────────────────
    let cursorEl: HTMLDivElement | null = null
    let svgDefs: SVGSVGElement | null = null
    let cleanupCursor: (() => void) | null = null

    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
      svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svgDefs.setAttribute('width', '0')
      svgDefs.setAttribute('height', '0')
      svgDefs.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;overflow:hidden;'
      svgDefs.innerHTML = `<defs>
        <linearGradient id="cursor-aurora" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stop-color="#FF8E5C"/>
          <stop offset="35%"  stop-color="#E5547D"/>
          <stop offset="70%"  stop-color="#8D84FF"/>
          <stop offset="100%" stop-color="#4DCFE0"/>
        </linearGradient>
      </defs>`
      document.body.appendChild(svgDefs)

      const fangSVG = `<svg viewBox="0 0 12 12" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 0 0 L 12 0 L 0 12 Z"></path>
      </svg>`

      cursorEl = document.createElement('div')
      cursorEl.className = 'cursor'
      cursorEl.innerHTML = `
        <span class="fang tl">${fangSVG}</span>
        <span class="fang tr">${fangSVG}</span>
        <span class="fang bl">${fangSVG}</span>
        <span class="fang br">${fangSVG}</span>`
      document.body.appendChild(cursorEl)

      let target: Element | null = null
      const interactive = 'a, button, a.entry, [data-bite], input[type="submit"], input[type="button"], summary'

      // Snap with transition (used on enter/leave), direct set without (used during move)
      const setCursor = (x: number, y: number, w: number, h: number, withTransition: boolean) => {
        if (!cursorEl) return
        cursorEl.style.transition = withTransition
          ? 'transform 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out'
          : 'none'
        cursorEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
        cursorEl.style.width = w + 'px'
        cursorEl.style.height = h + 'px'
      }

      const onMove = (e: PointerEvent) => {
        if (target) {
          const r = target.getBoundingClientRect()
          const pad = 4
          setCursor(r.left + r.width / 2, r.top + r.height / 2, r.width + pad * 2, r.height + pad * 2, false)
        } else {
          setCursor(e.clientX, e.clientY, 1, 1, false)
        }
      }

      const onOver = (e: PointerEvent) => {
        const el = (e.target as Element).closest(interactive)
        if (el !== target) {
          target = el
          cursorEl?.classList.toggle('hover', !!target)
          if (target) {
            const r = target.getBoundingClientRect()
            const pad = 4
            setCursor(r.left + r.width / 2, r.top + r.height / 2, r.width + pad * 2, r.height + pad * 2, true)
          }
        }
      }

      const onOut = (e: PointerEvent) => {
        if (target && !target.contains(e.relatedTarget as Node)) {
          target = null
          cursorEl?.classList.remove('hover')
          setCursor(e.clientX, e.clientY, 1, 1, true)
        }
      }

      const onDown = () => cursorEl?.classList.add('bite')
      const onUp = () => cursorEl?.classList.remove('bite')
      const onLeave = () => { if (cursorEl) cursorEl.style.opacity = '0' }
      const onEnter = () => { if (cursorEl) cursorEl.style.opacity = '1' }

      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerover', onOver, { passive: true })
      window.addEventListener('pointerout', onOut, { passive: true })
      window.addEventListener('pointerdown', onDown, { passive: true })
      window.addEventListener('pointerup', onUp, { passive: true })
      window.addEventListener('pointercancel', onUp, { passive: true })
      window.addEventListener('pointerleave', onLeave)
      window.addEventListener('pointerenter', onEnter)

      cleanupCursor = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerover', onOver)
        window.removeEventListener('pointerout', onOut)
        window.removeEventListener('pointerdown', onDown)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        window.removeEventListener('pointerleave', onLeave)
        window.removeEventListener('pointerenter', onEnter)
      }
    }

    return () => {
      cleanupField?.()
      cleanupCursor?.()
      cursorEl?.remove()
      svgDefs?.remove()
      document.documentElement.classList.remove('js-ready')
    }
  }, [])

  return null
}
