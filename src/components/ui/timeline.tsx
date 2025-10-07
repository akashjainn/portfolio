import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface TimelineItem {
  title: string
  description?: string | undefined
  date?: string | undefined
  status?: 'completed' | 'in-progress' | 'planned'
  icon?: ReactNode
  content?: ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
  variant?: 'default' | 'minimal' | 'detailed'
  className?: string | undefined
}

const statusStyles = {
  completed: 'bg-green-500 border-green-500',
  'in-progress': 'bg-blue-500 border-blue-500 animate-pulse',
  planned: 'bg-gray-300 border-gray-300'
}

export function Timeline({ items, variant = 'default', className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start space-x-4">
            {/* Timeline dot/icon */}
            <div className="relative flex-shrink-0">
              <div
                className={cn(
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center bg-background',
                  item.status ? statusStyles[item.status] : statusStyles.completed
                )}
              >
                {item.icon ? (
                  <span className="text-white text-sm">{item.icon}</span>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              
              {/* Connecting line to next item */}
              {index < items.length - 1 && (
                <div className="absolute top-8 left-1/2 w-px h-6 bg-border -translate-x-1/2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pb-6">
              {variant === 'minimal' ? (
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                  {item.date && (
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  )}
                </div>
              ) : (
                <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    {item.date && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {item.date}
                      </span>
                    )}
                  </div>
                  
                  {item.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>
                  )}
                  
                  {item.content && (
                    <div className="text-sm">
                      {item.content}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Specialized timeline for development phases
export function DevelopmentTimeline({
  phases,
  className
}: {
  phases: Array<{
    phase: string
    duration: string
    tasks: string[]
    status?: 'completed' | 'in-progress' | 'planned'
  }>
  className?: string
}) {
  const timelineItems: TimelineItem[] = phases.map((phase, index) => ({
    title: phase.phase,
    date: phase.duration,
    status: phase.status || 'completed',
    icon: <span className="font-bold text-xs">{index + 1}</span>,
    content: (
      <ul className="space-y-1 mt-2">
        {phase.tasks.map((task, taskIndex) => (
          <li key={taskIndex} className="flex items-center text-xs text-muted-foreground">
            <svg className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {task}
          </li>
        ))}
      </ul>
    )
  }))

  return <Timeline items={timelineItems} variant="detailed" {...(className && { className })} />
}

// Specialized timeline for project milestones
export function MilestoneTimeline({
  milestones,
  className
}: {
  milestones: Array<{
    milestone: string
    date: string
    description?: string
    metrics?: { label: string; value: string }[]
    status?: 'completed' | 'in-progress' | 'planned'
  }>
  className?: string
}) {
  const timelineItems: TimelineItem[] = milestones.map((milestone) => ({
    title: milestone.milestone,
    ...(milestone.description && { description: milestone.description }),
    date: milestone.date,
    status: milestone.status || 'completed',
    icon: <span>🎯</span>,
    ...(milestone.metrics && {
      content: (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {milestone.metrics.map((metric, index) => (
            <div key={index} className="text-xs">
              <span className="font-medium text-foreground">{metric.label}:</span>
              <span className="text-muted-foreground ml-1">{metric.value}</span>
            </div>
          ))}
        </div>
      )
    })
  }))

  return <Timeline items={timelineItems} variant="detailed" {...(className && { className })} />
}