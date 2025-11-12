"use client"

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type EffectsPrefs = {
  reduceEffects: boolean
  pauseMotion: boolean
  setReduceEffects: (v: boolean) => void
  setPauseMotion: (v: boolean) => void
}

const Ctx = createContext<EffectsPrefs | null>(null)

export function EffectsPrefsProvider({ children }: { children: React.ReactNode }) {
  const [reduceEffects, setReduceEffects] = useState(false)
  const [pauseMotion, setPauseMotion] = useState(false)

  // hydrate from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    const r = localStorage.getItem('reduceEffects')
    const p = localStorage.getItem('pauseMotion')
    if (r != null) setReduceEffects(r === 'true')
    if (p != null) setPauseMotion(p === 'true')
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('reduceEffects', String(reduceEffects))
  }, [reduceEffects])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('pauseMotion', String(pauseMotion))
  }, [pauseMotion])

  const value = useMemo(() => ({ reduceEffects, pauseMotion, setReduceEffects, setPauseMotion }), [reduceEffects, pauseMotion])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useEffectsPrefs() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useEffectsPrefs must be used within EffectsPrefsProvider')
  return ctx
}
