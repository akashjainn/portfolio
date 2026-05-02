'use client'

import { useEffect } from 'react'

export function AuroraEffects() {
  useEffect(() => {
    document.documentElement.classList.add('js-ready')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Bite cursor (desktop fine pointer only) ──────────────────
    // Aurora parallax is now a CSS animation — no JS needed, no rAF, no repaint on interaction.
    let cursorEl: HTMLDivElement | null = null
    let svgDefs: SVGSVGElement | null = null
    const cleaners: Array<() => void> = []

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
      let cachedRect: DOMRect | null = null
      const interactive = 'a, button, [data-bite], input[type="submit"], input[type="button"], summary'

      const setCursor = (x: number, y: number, w: number, h: number, snap: boolean) => {
        if (!cursorEl) return
        cursorEl.style.transition = snap
          ? 'transform 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out'
          : 'none'
        cursorEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
        cursorEl.style.width = w + 'px'
        cursorEl.style.height = h + 'px'
      }

      const onMove = (e: PointerEvent) => {
        if (target && cachedRect) {
          const pad = 4
          setCursor(
            cachedRect.left + cachedRect.width / 2,
            cachedRect.top + cachedRect.height / 2,
            cachedRect.width + pad * 2,
            cachedRect.height + pad * 2,
            false
          )
        } else {
          setCursor(e.clientX, e.clientY, 1, 1, false)
        }
      }

      const onOver = (e: PointerEvent) => {
        const el = (e.target as Element).closest(interactive)
        if (el !== target) {
          target = el
          cachedRect = target ? target.getBoundingClientRect() : null
          cursorEl?.classList.toggle('hover', !!target)
          if (target && cachedRect) {
            const pad = 4
            setCursor(
              cachedRect.left + cachedRect.width / 2,
              cachedRect.top + cachedRect.height / 2,
              cachedRect.width + pad * 2,
              cachedRect.height + pad * 2,
              true
            )
          }
        }
      }

      const onOut = (e: PointerEvent) => {
        if (target && !target.contains(e.relatedTarget as Node)) {
          target = null
          cachedRect = null
          cursorEl?.classList.remove('hover')
          setCursor(e.clientX, e.clientY, 1, 1, true)
        }
      }

      // Invalidate cached rect on scroll so cursor tracks element's new position
      const onScroll = () => {
        if (target) cachedRect = target.getBoundingClientRect()
      }

      const onDown = () => cursorEl?.classList.add('bite')
      const onUp = () => cursorEl?.classList.remove('bite')
      const onLeave = () => { if (cursorEl) cursorEl.style.opacity = '0' }
      const onEnter = () => { if (cursorEl) cursorEl.style.opacity = '1' }

      const opts = { passive: true } as const
      window.addEventListener('pointermove', onMove, opts)
      window.addEventListener('pointerover', onOver, opts)
      window.addEventListener('pointerout', onOut, opts)
      window.addEventListener('pointerdown', onDown, opts)
      window.addEventListener('pointerup', onUp, opts)
      window.addEventListener('pointercancel', onUp, opts)
      window.addEventListener('pointerleave', onLeave, opts)
      window.addEventListener('pointerenter', onEnter, opts)
      window.addEventListener('scroll', onScroll, opts)

      cleaners.push(() => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerover', onOver)
        window.removeEventListener('pointerout', onOut)
        window.removeEventListener('pointerdown', onDown)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        window.removeEventListener('pointerleave', onLeave)
        window.removeEventListener('pointerenter', onEnter)
        window.removeEventListener('scroll', onScroll)
      })
    }

    return () => {
      cleaners.forEach(fn => fn())
      cursorEl?.remove()
      svgDefs?.remove()
      document.documentElement.classList.remove('js-ready')
    }
  }, [])

  return null
}
