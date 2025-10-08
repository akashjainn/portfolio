"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Building, Code, Award, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface TimelineEvent {
  id: string
  date: string
  title: string
  subtitle: string
  description: string
  type: 'education' | 'work' | 'project' | 'achievement'
  location?: string
  company?: string
  tech?: string[]
  links?: {
    demo?: string
    repo?: string
    article?: string
  }
  metrics?: {
    label: string
    value: string
  }[]
  image?: string
}

const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 'gt-start',
    date: '2022-08',
    title: 'Started at Georgia Tech',
    subtitle: 'Computer Science Major',
    description: 'Began pursuing Computer Science degree with focus on software engineering and web development.',
    type: 'education',
    location: 'Atlanta, GA',
    company: 'Georgia Institute of Technology'
  },
  {
    id: 'statefarm-internship',
    date: '2024-06',
    title: 'Software Engineering Intern',
    subtitle: 'State Farm Insurance',
    description: 'Built production systems serving 2M+ monthly users. Optimized chat systems achieving 35% latency reduction.',
    type: 'work',
    location: 'Remote',
    company: 'State Farm',
    tech: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
    metrics: [
      { label: 'Users Served', value: '2M+' },
      { label: 'Latency Reduction', value: '35%' },
      { label: 'Uptime', value: '99.98%' }
    ]
  },
  {
    id: 'propsage',
    date: '2024-02',
    title: 'PropSage - Top 3 Project',
    subtitle: 'Real-time Sports Prop Pricing',
    description: 'Built evidence-aware sports betting platform using TwelveLabs API with real-time odds and performance analytics.',
    type: 'project',
    tech: ['Next.js', 'TypeScript', 'TwelveLabs API', 'Server-Sent Events'],
    links: {
      demo: 'https://propsage-web.vercel.app',
      repo: 'https://github.com/akashjainn/propsage'
    },
    metrics: [
      { label: 'Load Time', value: '1.2s' },
      { label: 'Accuracy', value: '94%' },
      { label: 'Real-time Updates', value: '<100ms' }
    ]
  },

]

const TYPE_CONFIG = {
  education: {
    icon: Award,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-700'
  },
  work: {
    icon: Building,
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-100',
    textColor: 'text-emerald-700'
  },
  project: {
    icon: Code,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-700'
  },
  achievement: {
    icon: Award,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-100',
    textColor: 'text-amber-700'
  }
}

export function InteractiveTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set())
  const timelineRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = entry.target.getAttribute('data-event-id')
            if (eventId) {
              setVisibleEvents(prev => new Set([...prev, eventId]))
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    const eventElements = document.querySelectorAll('[data-event-id]')
    eventElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-')
    if (!year || !month) return dateStr
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  return (
    <div className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">
            <Calendar className="h-3 w-3 mr-1" />
            Professional Journey
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Interactive Timeline</h2>
          <p className="text-xl text-muted-foreground">
            Explore my career progression, key projects, and achievements
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />

          {/* Timeline Events */}
          <div className="space-y-12">
            {TIMELINE_DATA.map((event, index) => {
              const config = TYPE_CONFIG[event.type]
              const Icon = config.icon
              const isVisible = visibleEvents.has(event.id)
              const isSelected = selectedEvent === event.id
              
              return (
                <motion.div
                  key={event.id}
                  data-event-id={event.id}
                  className="relative flex items-start gap-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className={`w-16 h-16 rounded-full ${config.color} flex items-center justify-center text-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 ${
                        isSelected ? 'ring-4 ring-primary/30 scale-110' : ''
                      }`}
                      onClick={() => setSelectedEvent(isSelected ? null : event.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    
                    {/* Date */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-medium whitespace-nowrap">
                      {formatDate(event.date)}
                    </div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className={`flex-1 bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                      isSelected ? 'ring-2 ring-primary/20 shadow-lg' : ''
                    }`}
                    onClick={() => setSelectedEvent(isSelected ? null : event.id)}
                    whileHover={{ y: -2 }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm font-medium text-primary">{event.subtitle}</p>
                        {(event.location || event.company) && (
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            {event.company && (
                              <>
                                <Building className="h-3 w-3" />
                                <span>{event.company}</span>
                              </>
                            )}
                            {event.location && (
                              <>
                                <MapPin className="h-3 w-3" />
                                <span>{event.location}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <Badge variant="secondary" className={config.textColor}>
                        {event.type}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Tech Stack */}
                    {event.tech && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-border/50 pt-4 mt-4"
                        >
                          {/* Metrics */}
                          {event.metrics && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                              {event.metrics.map((metric, idx) => (
                                <div key={idx} className="text-center p-3 bg-muted/30 rounded-lg">
                                  <div className="font-bold text-primary">{metric.value}</div>
                                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Links */}
                          {event.links && (
                            <div className="flex flex-wrap gap-2">
                              {event.links.demo && (
                                <Button asChild size="sm" variant="outline">
                                  <a href={event.links.demo} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Live Demo
                                  </a>
                                </Button>
                              )}
                              {event.links.repo && (
                                <Button asChild size="sm" variant="outline">
                                  <a href={event.links.repo} target="_blank" rel="noopener noreferrer">
                                    <Code className="h-3 w-3 mr-1" />
                                    Source Code
                                  </a>
                                </Button>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Progress Indicator */}
          <div className="fixed top-1/2 right-8 -translate-y-1/2 hidden lg:block">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-2">Progress</div>
              <div className="space-y-1">
                {TIMELINE_DATA.map((event) => (
                  <div
                    key={event.id}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      visibleEvents.has(event.id) 
                        ? TYPE_CONFIG[event.type].color 
                        : 'bg-muted'
                    } ${
                      selectedEvent === event.id ? 'scale-150' : 'hover:scale-125'
                    }`}
                    onClick={() => setSelectedEvent(event.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 pt-8 border-t border-border/50">
          <p className="text-muted-foreground mb-4">
            Want to be part of the next chapter?
          </p>
          <Button asChild size="lg">
            <a href="/contact">Let&apos;s Build Something Together</a>
          </Button>
        </div>
      </div>
    </div>
  )
}