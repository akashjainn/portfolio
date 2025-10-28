"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { Search, Command, Calendar, Mail, Github, Linkedin, FileText, FolderOpen, User, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRole } from '@/components/ui/role-personalization'

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  icon: React.ComponentType<any>
  action: () => void
  category: 'Navigation' | 'Actions' | 'Projects' | 'Contact'
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const { role, setRole, isPersonalized, setPersonalized } = useRole()
  const selectedItemRef = useRef<HTMLButtonElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const commands: CommandItem[] = [
    // Navigation
    { 
      id: 'home', 
      title: 'Home', 
      subtitle: 'Portfolio overview',
      icon: Home, 
      category: 'Navigation',
      action: () => router.push('/') 
    },
    { 
      id: 'projects', 
      title: 'Projects', 
      subtitle: 'Case studies & work',
      icon: FolderOpen, 
      category: 'Navigation',
      action: () => router.push('/projects') 
    },
    { 
      id: 'about', 
      title: 'About', 
      subtitle: 'Background & experience',
      icon: User, 
      category: 'Navigation',
      action: () => router.push('/about') 
    },
    { 
      id: 'contact', 
      title: 'Contact', 
      subtitle: 'Get in touch',
      icon: Mail, 
      category: 'Navigation',
      action: () => router.push('/contact') 
    },
    
    // Projects
    { 
      id: 'propsage', 
      title: 'PropSage', 
      subtitle: 'Real-time sports prop pricing',
      icon: FolderOpen, 
      category: 'Projects',
      action: () => router.push('/projects/propsage') 
    },
    { 
      id: 'stocksense', 
      title: 'StockSense', 
      subtitle: 'Portfolio analytics platform',
      icon: FolderOpen, 
      category: 'Projects',
      action: () => router.push('/projects/stocksense') 
    },
    { 
      id: 'landsafe', 
      title: 'LandSafe', 
      subtitle: 'Location safety toolkit',
      icon: FolderOpen, 
      category: 'Projects',
      action: () => router.push('/projects/landsafe') 
    },
    
    // Actions
    { 
      id: 'resume', 
      title: 'Download Resume', 
      subtitle: 'Latest PDF version',
      icon: FileText, 
      category: 'Actions',
      action: () => window.open('/Akash_Jain_Resume.pdf', '_blank') 
    },
    { 
      id: 'schedule', 
      title: 'Schedule Meeting', 
      subtitle: 'Book a 30-min chat',
      icon: Calendar, 
      category: 'Actions',
      action: () => router.push('/contact') 
    },
    
    // Contact
    { 
      id: 'email', 
      title: 'Send Email', 
      subtitle: 'akashjain1311@gmail.com',
      icon: Mail, 
      category: 'Contact',
      action: () => window.open('mailto:akashjain1311@gmail.com', '_blank') 
    },
    { 
      id: 'github', 
      title: 'GitHub Profile', 
      subtitle: 'View code repositories',
      icon: Github, 
      category: 'Contact',
      action: () => window.open('https://github.com/akashjainn', '_blank') 
    },
    { 
      id: 'linkedin', 
      title: 'LinkedIn Profile', 
      subtitle: 'Professional network',
      icon: Linkedin, 
      category: 'Contact',
      action: () => window.open('https://linkedin.com/in/akashjainn', '_blank') 
    },
  ]

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    command.category.toLowerCase().includes(query.toLowerCase())
  )

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = []
    }
    acc[command.category]!.push(command)
    return acc
  }, {} as Record<string, CommandItem[]>)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        return
      }

      if (!isOpen) return

      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        setSelectedIndex(0)
        return
      }

      // Arrow navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length)
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => prev === 0 ? filteredCommands.length - 1 : prev - 1)
      }

      // Enter to execute
      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault()
        filteredCommands[selectedIndex].action()
        setIsOpen(false)
        setQuery('')
        setSelectedIndex(0)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex])

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Auto-scroll selected item into view
  useEffect(() => {
    if (selectedItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const item = selectedItemRef.current
      const containerRect = container.getBoundingClientRect()
      const itemRect = item.getBoundingClientRect()

      // Check if item is out of view
      if (itemRect.bottom > containerRect.bottom) {
        // Scroll down
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      } else if (itemRect.top < containerRect.top) {
        // Scroll up
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [selectedIndex])

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md border border-border/50 rounded-lg shadow-elegant hover:shadow-elegant-lg transition-all duration-200 text-sm text-muted-foreground hover:text-foreground"
          aria-label="Open command palette"
        >
          <Command className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 bg-muted rounded text-xs">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[2000]"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Command Palette */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2001] w-full max-w-lg mx-4">
        <div className="bg-background border border-border/50 rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search commands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
            <kbd className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={scrollContainerRef} className="max-h-96 overflow-y-auto">
            {Object.entries(groupedCommands).length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-foreground">
                No results found for &quot;{query}&quot;
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/30">
                    {category}
                  </div>
                  {categoryCommands.map((command, categoryIndex) => {
                    const globalIndex = filteredCommands.indexOf(command)
                    const isSelected = globalIndex === selectedIndex
                    
                    return (
                      <button
                        key={command.id}
                        ref={isSelected ? selectedItemRef : null}
                        onClick={() => {
                          command.action()
                          setIsOpen(false)
                          setQuery('')
                          setSelectedIndex(0)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                          isSelected ? 'bg-muted/50' : ''
                        }`}
                      >
                        <command.icon className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground">
                            {command.title}
                          </div>
                          {command.subtitle && (
                            <div className="text-sm text-muted-foreground truncate">
                              {command.subtitle}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <kbd className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                            ↵
                          </kbd>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border/50 bg-muted/20">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1">↑</kbd>
                  <kbd className="px-1">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1">↵</kbd>
                  select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1">esc</kbd>
                close
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}