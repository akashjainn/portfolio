"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Skill {
  id: string
  name: string
  level: number // 1-5
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'soft'
  x: number
  y: number
  connections: string[]
}

interface Connection {
  from: string
  to: string
  strength: number // 0-1
}

const SKILLS: Skill[] = [
  // Frontend
  { id: 'react', name: 'React', level: 5, category: 'frontend', x: 300, y: 200, connections: ['next', 'typescript', 'tailwind'] },
  { id: 'next', name: 'Next.js', level: 5, category: 'frontend', x: 450, y: 150, connections: ['react', 'typescript', 'vercel'] },
  { id: 'typescript', name: 'TypeScript', level: 5, category: 'frontend', x: 500, y: 250, connections: ['react', 'next', 'node'] },
  { id: 'tailwind', name: 'Tailwind CSS', level: 4, category: 'frontend', x: 200, y: 150, connections: ['react', 'figma'] },
  
  // Backend
  { id: 'node', name: 'Node.js', level: 4, category: 'backend', x: 600, y: 200, connections: ['typescript', 'express', 'mongodb'] },
  { id: 'express', name: 'Express', level: 4, category: 'backend', x: 650, y: 300, connections: ['node', 'mongodb', 'postgresql'] },
  { id: 'mongodb', name: 'MongoDB', level: 4, category: 'backend', x: 550, y: 350, connections: ['node', 'express', 'prisma'] },
  { id: 'postgresql', name: 'PostgreSQL', level: 4, category: 'backend', x: 700, y: 250, connections: ['express', 'prisma'] },
  { id: 'prisma', name: 'Prisma', level: 3, category: 'backend', x: 600, y: 350, connections: ['mongodb', 'postgresql', 'typescript'] },
  
  // DevOps
  { id: 'docker', name: 'Docker', level: 3, category: 'devops', x: 400, y: 400, connections: ['aws', 'vercel'] },
  { id: 'aws', name: 'AWS', level: 3, category: 'devops', x: 500, y: 450, connections: ['docker'] },
  { id: 'vercel', name: 'Vercel', level: 4, category: 'devops', x: 350, y: 350, connections: ['next', 'docker'] },
  
  // Design
  { id: 'figma', name: 'Figma', level: 4, category: 'design', x: 150, y: 200, connections: ['tailwind', 'ux'] },
  { id: 'ux', name: 'UX Design', level: 4, category: 'design', x: 100, y: 300, connections: ['figma', 'accessibility'] },
  
  // Soft Skills
  { id: 'leadership', name: 'Leadership', level: 4, category: 'soft', x: 250, y: 400, connections: ['communication', 'mentoring'] },
  { id: 'communication', name: 'Communication', level: 5, category: 'soft', x: 150, y: 450, connections: ['leadership', 'mentoring'] },
  { id: 'mentoring', name: 'Mentoring', level: 4, category: 'soft', x: 100, y: 400, connections: ['leadership', 'communication'] },
  { id: 'accessibility', name: 'A11y', level: 4, category: 'soft', x: 50, y: 250, connections: ['ux', 'react'] }
]

const CATEGORY_COLORS = {
  frontend: { bg: 'hsl(217, 91%, 60%)', border: 'hsl(217, 91%, 50%)', light: 'hsl(217, 91%, 95%)' },
  backend: { bg: 'hsl(142, 71%, 45%)', border: 'hsl(142, 71%, 35%)', light: 'hsl(142, 71%, 95%)' },
  devops: { bg: 'hsl(38, 92%, 50%)', border: 'hsl(38, 92%, 40%)', light: 'hsl(38, 92%, 95%)' },
  design: { bg: 'hsl(291, 64%, 42%)', border: 'hsl(291, 64%, 32%)', light: 'hsl(291, 64%, 95%)' },
  soft: { bg: 'hsl(0, 84%, 60%)', border: 'hsl(0, 84%, 50%)', light: 'hsl(0, 84%, 95%)' }
}

export function SkillsConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Draw connections
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = dimensions.width * 2 // For retina display
    canvas.height = dimensions.height * 2
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`
    ctx.scale(2, 2)

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Draw connections
    SKILLS.forEach(skill => {
      skill.connections.forEach(connectionId => {
        const targetSkill = SKILLS.find(s => s.id === connectionId)
        if (!targetSkill) return

        const shouldHighlight = hoveredSkill === skill.id || hoveredSkill === connectionId
        const categoryMatch = selectedCategory ? 
          (skill.category === selectedCategory || targetSkill.category === selectedCategory) : true

        if (!categoryMatch && selectedCategory) return

        ctx.beginPath()
        ctx.moveTo(skill.x, skill.y)
        ctx.lineTo(targetSkill.x, targetSkill.y)
        
        if (shouldHighlight) {
          ctx.strokeStyle = CATEGORY_COLORS[skill.category].border
          ctx.lineWidth = 2
          ctx.globalAlpha = 0.8
        } else {
          ctx.strokeStyle = 'hsl(220, 9%, 46%)'
          ctx.lineWidth = 1
          ctx.globalAlpha = selectedCategory ? 0.1 : 0.3
        }
        
        ctx.stroke()
        ctx.globalAlpha = 1
      })
    })
  }, [hoveredSkill, selectedCategory, dimensions])

  const getSkillSize = (level: number) => {
    // Make nodes more uniform and readable; slight size variance only
    return 40 + (level - 3) * 4 // ~24-56px -> now ~32-48px
  }

  const filteredSkills = selectedCategory ? 
    SKILLS.filter(skill => skill.category === selectedCategory) : 
    SKILLS

  return (
    <div className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive map of my technical skills and their interconnections. Hover to explore relationships.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedCategory === null 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            All Skills
          </button>
          {Object.entries(CATEGORY_COLORS).map(([category, colors]) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border transition-all capitalize ${
                selectedCategory === category
                  ? 'text-white border-transparent'
                  : 'border-border hover:border-opacity-50'
              }`}
              style={{
                backgroundColor: selectedCategory === category ? colors.bg : 'transparent',
                borderColor: selectedCategory === category ? colors.bg : undefined,
                color: selectedCategory === category ? 'white' : undefined
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = colors.light
                  e.currentTarget.style.borderColor = colors.border
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = 'hsl(var(--border))'
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Constellation */}
        <div 
          ref={containerRef}
          className="relative mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden"
          style={{ maxWidth: '800px', height: '500px' }}
        >
          {/* Canvas for connections */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
          />

          {/* Skill nodes */}
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const colors = CATEGORY_COLORS[skill.category]
              const size = getSkillSize(skill.level)
              const isHighlighted = hoveredSkill === skill.id
              const isConnected = hoveredSkill && skill.connections.includes(hoveredSkill)
              const shouldShow = !selectedCategory || skill.category === selectedCategory

              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: shouldShow ? 1 : 0.3, 
                    scale: shouldShow ? 1 : 0.8,
                    x: skill.x - size/2,
                    y: skill.y - size/2
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute cursor-pointer group"
                  style={{
                    width: size,
                    height: size,
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div
                    className={`w-full h-full rounded-full border-2 flex items-center justify-center text-white font-semibold text-[0.7rem] shadow-lg transition-all duration-200 ${
                      isHighlighted || isConnected ? 'ring-4 ring-opacity-30' : ''
                    }`}
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      lineHeight: 1.05,
                      textAlign: 'center',
                      padding: '0 6px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                      fontSize: skill.name.length > 12 ? '0.6rem' : '0.7rem',
                      ...(isHighlighted || isConnected ? {
                        boxShadow: `0 0 0 4px ${colors.border}30`
                      } : {})
                    }}
                    title={skill.name}
                  >
                    {skill.name}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg text-sm whitespace-nowrap">
                      <div className="font-semibold">{skill.name}</div>
                      <div className="text-muted-foreground text-xs capitalize">{skill.category}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Legend removed per request to hide skill level visuals */}
        </div>

        {/* Skill Details */}
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            {(() => {
              const skill = SKILLS.find(s => s.id === hoveredSkill)
              if (!skill) return null
              
              const connectedSkills = skill.connections
                .map(id => SKILLS.find(s => s.id === id))
                .filter(Boolean)
              
              return (
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 capitalize">
                    {skill.category}
                  </p>
                  {connectedSkills.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Connected Technologies:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {connectedSkills.map(connectedSkill => (
                          <span
                            key={connectedSkill!.id}
                            className="px-2 py-1 bg-muted rounded-full text-xs"
                          >
                            {connectedSkill!.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </motion.div>
        )}
      </div>
    </div>
  )
}