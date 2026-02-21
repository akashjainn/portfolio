import React from 'react'
import { Badge } from '@/components/ui/badge'

type ProjectChipVariant = 'tech' | 'category' | 'meta'

interface ProjectChipProps {
  children: React.ReactNode
  variant?: ProjectChipVariant
  icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * Unified chip component for all project card contexts
 * - tech: filled pill for language/framework chips
 * - category: semantic badge for project category
 * - meta: informational chip (timeline, status, etc.)
 */
export function ProjectChip({
  children,
  variant = 'tech',
  icon,
  className = '',
  style,
}: ProjectChipProps) {
  if (variant === 'category') {
    return (
      <Badge variant="secondary" className={`text-xs ${className}`}>
        {children}
      </Badge>
    )
  }

  if (variant === 'meta') {
    return (
      <div
        className={`inline-flex items-center rounded-full bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground transition-all duration-200 ${className}`}
        style={style}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    )
  }

  // tech variant (default)
  return (
    <span
      className={`inline-flex items-center rounded-full bg-muted/50 border border-border/50 px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:bg-muted hover:border-border hover:scale-105 cursor-default ${className}`}
      style={style}
    >
      {children}
    </span>
  )
}
