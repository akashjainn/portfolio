'use client'

import { useEffect } from 'react'

export function JKNav() {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key !== 'j' && e.key !== 'k') return

      const list = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          '[data-entry-kind]:not([style*="display: none"]) a.entry-row'
        )
      )
      if (list.length === 0) return

      const focused = document.activeElement
      const currentIndex = list.indexOf(focused as HTMLAnchorElement)

      let next: HTMLAnchorElement | undefined
      if (e.key === 'j') {
        next = list[currentIndex + 1] ?? list[0]
      } else {
        next = list[currentIndex - 1] ?? list[list.length - 1]
      }
      next?.focus()
      e.preventDefault()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return null
}
