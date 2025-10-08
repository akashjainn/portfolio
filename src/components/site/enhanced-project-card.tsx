"use client"

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Zap, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRef } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  slug: string
  tags: string[]
  links: {
    demo?: string
    repo?: string
  }
  metrics?: {
    users?: string
    performance?: string
    uptime?: string
    impact?: string
  }
  featured?: boolean
  image?: string
  category?: string
}

export function EnhancedProjectCard({
  title,
  description,
  slug,
  tags,
  links,
  metrics,
  featured = false,
  category = 'Web App'
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]))
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]))
  
  // Transform for card content
  const transform = useTransform(
    [rotateX, rotateY],
    ([rX, rY]) => `perspective(600px) rotateX(${rX}deg) rotateY(${rY}deg)`
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Get category-based gradient
  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'fintech':
        return 'from-emerald-500/20 via-emerald-400/10 to-transparent'
      case 'sports':
        return 'from-blue-500/20 via-blue-400/10 to-transparent'
      case 'safety':
        return 'from-amber-500/20 via-amber-400/10 to-transparent'
      default:
        return 'from-primary/20 via-primary/10 to-transparent'
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:border-border hover:shadow-2xl ${
        featured ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
      style={{ 
        transform,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Floating Elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-xl" />
      </div>
      
      <div className="relative p-6 lg:p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs font-medium">
                {category}
              </Badge>
              {featured && (
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          
          {/* Action Links */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            {links.demo && (
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
              >
                <Link href={links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {links.repo && (
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
              >
                <Link href={links.repo} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
          {description}
        </p>

        {/* Metrics (if available) */}
        {metrics && (
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
            {metrics.users && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="h-4 w-4 text-primary mr-1" />
                  <span className="font-bold text-primary">{metrics.users}</span>
                </div>
                <div className="text-xs text-muted-foreground">Users</div>
              </div>
            )}
            {metrics.performance && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Zap className="h-4 w-4 text-primary mr-1" />
                  <span className="font-bold text-primary">{metrics.performance}</span>
                </div>
                <div className="text-xs text-muted-foreground">LCP</div>
              </div>
            )}
            {metrics.uptime && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="h-4 w-4 text-primary mr-1" />
                  <span className="font-bold text-primary">{metrics.uptime}</span>
                </div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            )}
            {metrics.impact && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="font-bold text-primary">{metrics.impact}</span>
                </div>
                <div className="text-xs text-muted-foreground">Impact</div>
              </div>
            )}
          </div>
        )}

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.slice(0, featured ? 6 : 4).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-full border border-border/50 hover:border-primary/20 transition-colors"
            >
              {tag}
            </span>
          ))}
          {tags.length > (featured ? 6 : 4) && (
            <span className="px-3 py-1 text-xs font-medium text-muted-foreground">
              +{tags.length - (featured ? 6 : 4)} more
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className="mt-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
        >
          <Link href={`/projects/${slug}`} className="flex items-center justify-center">
            Read Case Study
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>

        {/* Interactive Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  )
}

// Export both for compatibility
export { EnhancedProjectCard as ProjectCard }