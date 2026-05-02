'use client'

import { useEffect } from 'react'

export function AuroraEffects() {
  useEffect(() => {
    document.documentElement.classList.add('js-ready')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Aurora pointer parallax ──────────────────────────────────
    const field = document.querySelector('.aurora-field') as HTMLElement | null
    let rafField: number
    if (field && !reduced) {
      let tx = 0, ty = 0, cx = 0, cy = 0
      const onMove = (e: PointerEvent) => {
        const w = window.innerWidth, h = window.innerHeight
        tx = (e.clientX / w - .5) * 40
        ty = (e.clientY / h - .5) * 40
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      const tick = () => {
        cx += (tx - cx) * .04
        cy += (ty - cy) * .04
        field.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
        rafField = requestAnimationFrame(tick)
      }
      rafField = requestAnimationFrame(tick)
    }

    // ── Bite cursor (desktop fine pointer only) ──────────────────
    let cursorEl: HTMLDivElement | null = null
    let rafCursor: number
    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
      // Shared gradient defs referenced by fang paths
      const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
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

      let px = -100, py = -100
      let ccx = -100, ccy = -100
      let cw = 1, ch = 1
      let target: Element | null = null

      window.addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY }, { passive: true })

      const interactive = 'a, button, a.entry, [data-bite], input[type="submit"], input[type="button"], summary'

      const tickCursor = () => {
        let nx, ny, nw, nh
        if (target) {
          const r = target.getBoundingClientRect()
          const pad = 4
          nx = r.left + r.width / 2
          ny = r.top + r.height / 2
          nw = r.width + pad * 2
          nh = r.height + pad * 2
        } else {
          nx = px; ny = py; nw = 1; nh = 1
        }
        const k = target ? 0.28 : 0.32
        ccx += (nx - ccx) * k
        ccy += (ny - ccy) * k
        cw  += (nw - cw)  * k
        ch  += (nh - ch)  * k
        if (cursorEl) {
          cursorEl.style.transform = `translate(${ccx}px, ${ccy}px) translate(-50%, -50%)`
          cursorEl.style.width  = cw + 'px'
          cursorEl.style.height = ch + 'px'
        }
        rafCursor = requestAnimationFrame(tickCursor)
      }
      rafCursor = requestAnimationFrame(tickCursor)

      window.addEventListener('pointerover', (e) => {
        const el = (e.target as Element).closest(interactive)
        if (el !== target) {
          target = el
          cursorEl?.classList.toggle('hover', !!target)
        }
      }, { passive: true })

      window.addEventListener('pointerout', (e) => {
        if (target && !target.contains(e.relatedTarget as Node)) {
          target = null
          cursorEl?.classList.remove('hover')
        }
      }, { passive: true })

      window.addEventListener('pointerdown', () => cursorEl?.classList.add('bite'), { passive: true })
      window.addEventListener('pointerup', () => cursorEl?.classList.remove('bite'), { passive: true })
      window.addEventListener('pointercancel', () => cursorEl?.classList.remove('bite'), { passive: true })
      window.addEventListener('pointerleave', () => { if (cursorEl) cursorEl.style.opacity = '0' })
      window.addEventListener('pointerenter', () => { if (cursorEl) cursorEl.style.opacity = '1' })
    }

    return () => {
      cancelAnimationFrame(rafField)
      cancelAnimationFrame(rafCursor)
      cursorEl?.remove()
      document.documentElement.classList.remove('js-ready')
    }
  }, [])

  return null
}
