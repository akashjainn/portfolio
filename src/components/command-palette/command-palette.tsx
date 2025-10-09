"use client"

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from 'cmdk'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Propsage', href: '/projects/propsage' },
  { label: 'StockSense', href: '/projects/stocksense' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen} label="Command Menu">
        <CommandInput placeholder="Search pages... (⌘K)" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {links.map((l) => (
              <CommandItem key={l.href} onSelect={() => { router.push(l.href); setOpen(false) }}>
                {l.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="External">
            <CommandItem onSelect={() => { window.open('https://github.com/akashjainn', '_blank'); setOpen(false) }}>
              GitHub
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
