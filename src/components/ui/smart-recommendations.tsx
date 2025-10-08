"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, ExternalLink, Github, Sparkles, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RoleContent, useRole } from '@/components/ui/role-personalization'
import Link from 'next/link'

interface Project {
  slug: string
  title: string
  category: string
  summary: string
  tags: string[]
  metrics?: {
    performance?: number
    users?: string
    uptime?: string
  }
  links: {
    demo?: string
    repo?: string
  }
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  businessImpact: number // 1-10 scale
  techComplexity: number // 1-10 scale
  relevanceScore?: number
}

const ALL_PROJECTS: Project[] = [
  {
    slug: 'propsage',
    title: 'PropSage',
    category: 'Sports Tech',
    summary: 'Real-time sports betting odds aggregation platform with 94% prediction accuracy. Built during HackGT12 hackathon.',
    tags: ['Next.js', 'TypeScript', 'Redis', 'WebSockets', 'Real-time'],
    metrics: {
      performance: 94,
      users: '500+ testers',
      uptime: '99.9%'
    },
    links: {
      demo: 'https://propsage.vercel.app',
      repo: 'https://github.com/akashjainn/propsage'
    },
    difficulty: 'advanced',
    businessImpact: 9,
    techComplexity: 8
  },
  {
    slug: 'stocksense',
    title: 'StockSense',
    category: 'FinTech',
    summary: 'Comprehensive portfolio analytics platform with real-time market data integration and advanced risk metrics.',
    tags: ['Next.js', 'MongoDB', 'Alpha Vantage API', 'Chart.js', 'Prisma'],
    metrics: {
      performance: 91,
      users: '200+ uploads',
      uptime: '99.5%'
    },
    links: {
      demo: 'https://stocksense.vercel.app',
      repo: 'https://github.com/akashjainn/stocksense'
    },
    difficulty: 'intermediate',
    businessImpact: 7,
    techComplexity: 7
  },
  {
    slug: 'landsafe',
    title: 'LandSafe',
    category: 'Safety Tech',
    summary: 'Emergency safety application connecting users with local emergency services and real-time location sharing.',
    tags: ['React Native', 'Firebase', 'Google Maps API', 'Real-time', 'Mobile'],
    metrics: {
      performance: 88,
      users: '150+ downloads',
      uptime: '98.5%'
    },
    links: {
      repo: 'https://github.com/akashjainn/landsafe'
    },
    difficulty: 'intermediate',
    businessImpact: 8,
    techComplexity: 6
  },
  {
    slug: 'adventuretime-gba',
    title: 'Adventure Time GBA Game',
    category: 'Game Development',
    summary: 'Custom Game Boy Advance game built from scratch using C and assembly, featuring original gameplay mechanics.',
    tags: ['C', 'Assembly', 'GBA', 'Game Development', 'Low-level'],
    links: {
      repo: 'https://github.com/akashjainn/adventuretime-gba'
    },
    difficulty: 'advanced',
    businessImpact: 5,
    techComplexity: 9
  }
]

interface SmartRecommendationsProps {
  currentProject?: string
  maxRecommendations?: number
}

function calculateRelevanceScore(
  current: Project, 
  candidate: Project, 
  userRole: string,
  visitHistory: string[]
): number {
  let score = 0
  
  // Tag similarity (40% weight)
  const commonTags = current.tags.filter(tag => candidate.tags.includes(tag))
  const tagSimilarity = commonTags.length / Math.max(current.tags.length, candidate.tags.length)
  score += tagSimilarity * 40
  
  // Category bonus (20% weight)
  if (current.category === candidate.category) {
    score += 20
  } else {
    // Related categories bonus
    const relatedCategories: Record<string, string[]> = {
      'Sports Tech': ['FinTech', 'Safety Tech'],
      'FinTech': ['Sports Tech', 'Safety Tech'],
      'Safety Tech': ['Sports Tech', 'FinTech'],
      'Game Development': []
    }
    if (relatedCategories[current.category]?.includes(candidate.category)) {
      score += 10
    }
  }
  
  // Role-based relevance (25% weight)
  switch (userRole) {
    case 'recruiter':
      // Recruiters care about business impact and proven results
      score += (candidate.businessImpact / 10) * 15
      if (candidate.metrics?.users) score += 5
      if (candidate.links.demo) score += 5
      break
    case 'developer':
      // Developers care about technical complexity and learning
      score += (candidate.techComplexity / 10) * 15
      if (candidate.difficulty === 'advanced') score += 10
      else if (candidate.difficulty === 'intermediate') score += 5
      break
    case 'manager':
      // Managers care about business impact and team scalability
      score += (candidate.businessImpact / 10) * 20
      if (candidate.metrics?.uptime) score += 5
      break
    default:
      // General users get balanced scoring
      score += ((candidate.businessImpact + candidate.techComplexity) / 20) * 15
  }
  
  // Diversity bonus - prefer different difficulty levels (10% weight)
  if (current.difficulty !== candidate.difficulty) {
    score += 10
  }
  
  // Visit history penalty (5% weight) - reduce score if already visited
  if (visitHistory.includes(candidate.slug)) {
    score -= 15
  }
  
  return Math.min(100, Math.max(0, score))
}

function getVisitHistory(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const history = localStorage.getItem('portfolio-visit-history')
    return history ? JSON.parse(history) : []
  } catch {
    return []
  }
}

function trackVisit(projectSlug: string) {
  if (typeof window === 'undefined') return
  try {
    const history = getVisitHistory()
    const updatedHistory = [projectSlug, ...history.filter(slug => slug !== projectSlug)].slice(0, 10)
    localStorage.setItem('portfolio-visit-history', JSON.stringify(updatedHistory))
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function SmartRecommendations({ currentProject, maxRecommendations = 3 }: SmartRecommendationsProps) {
  const { role } = useRole()
  const [recommendations, setRecommendations] = useState<Project[]>([])
  const [visitHistory, setVisitHistory] = useState<string[]>([])

  useEffect(() => {
    setVisitHistory(getVisitHistory())
  }, [])

  useEffect(() => {
    if (!currentProject) {
      // If no current project, show top projects by role
      let sorted = [...ALL_PROJECTS]
      
      switch (role) {
        case 'recruiter':
          sorted.sort((a, b) => b.businessImpact - a.businessImpact)
          break
        case 'developer':
          sorted.sort((a, b) => b.techComplexity - a.techComplexity)
          break
        case 'manager':
          sorted.sort((a, b) => (b.businessImpact + (b.metrics?.performance || 0)) - (a.businessImpact + (a.metrics?.performance || 0)))
          break
        default:
          sorted.sort((a, b) => (b.businessImpact + b.techComplexity) - (a.businessImpact + a.techComplexity))
      }
      
      setRecommendations(sorted.slice(0, maxRecommendations))
      return
    }

    const current = ALL_PROJECTS.find(p => p.slug === currentProject)
    if (!current) {
      setRecommendations(ALL_PROJECTS.slice(0, maxRecommendations))
      return
    }

    // Track the current visit
    trackVisit(currentProject)

    // Calculate recommendations
    const candidates = ALL_PROJECTS
      .filter(p => p.slug !== currentProject)
      .map(project => ({
        ...project,
        relevanceScore: calculateRelevanceScore(current, project, role, visitHistory)
      }))
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, maxRecommendations)

    setRecommendations(candidates)
  }, [currentProject, role, visitHistory, maxRecommendations])

  if (recommendations.length === 0) return null

  const sectionTitle = currentProject ? "Recommended for You" : "Featured Projects"
  const sectionSubtitle = currentProject 
    ? "Based on your interest in similar technologies and patterns"
    : `Curated for ${role === 'general' ? 'everyone' : `${role}s`}`

  return (
    <div className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <h2 className="text-3xl font-bold mb-4">{sectionTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {recommendations.map((project, index) => (
              <RecommendationCard 
                key={project.slug}
                project={project}
                index={index}
                currentProject={currentProject}
              />
            ))}
          </AnimatePresence>
        </div>

        <RoleContent role={['developer', 'manager']}>
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Smart Recommendations</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  These recommendations are personalized based on your role ({role}), 
                  technical interests, and viewing patterns. The AI considers technology overlap, 
                  complexity levels, and business relevance.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs">Tag Similarity</Badge>
                  <Badge variant="outline" className="text-xs">Role Relevance</Badge>
                  <Badge variant="outline" className="text-xs">Complexity Match</Badge>
                  <Badge variant="outline" className="text-xs">Visit History</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </RoleContent>
      </div>
    </div>
  )
}

interface RecommendationCardProps {
  project: Project
  index: number
  currentProject?: string | undefined
}

function RecommendationCard({ project, index, currentProject }: RecommendationCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      layout
    >
      <Card 
        className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
            {project.relevanceScore && project.relevanceScore > 80 && (
              <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                Perfect Match
              </Badge>
            )}
          </div>
          
          <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
          <CardDescription className="leading-relaxed">
            {project.summary}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Key Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {project.metrics.performance && (
                <div className="text-center p-2 bg-muted/30 rounded">
                  <div className="font-bold text-primary text-sm">{project.metrics.performance}%</div>
                  <div className="text-xs text-muted-foreground">Performance</div>
                </div>
              )}
              {project.metrics.users && (
                <div className="text-center p-2 bg-muted/30 rounded">
                  <div className="font-bold text-primary text-sm">{project.metrics.users}</div>
                  <div className="text-xs text-muted-foreground">Users</div>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>

          {/* Difficulty & Impact Indicators */}
          <RoleContent role={['developer', 'manager']}>
            <div className="flex justify-between text-xs text-muted-foreground mb-4">
              <span>
                Difficulty: <strong className={
                  project.difficulty === 'advanced' ? 'text-error-600' :
                  project.difficulty === 'intermediate' ? 'text-warning-600' : 'text-success-600'
                }>{project.difficulty}</strong>
              </span>
              <span>
                Impact: <strong className="text-primary">{project.businessImpact}/10</strong>
              </span>
            </div>
          </RoleContent>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button asChild className="flex-1" size="sm">
              <Link href={`/projects/${project.slug}`}>
                View Case Study
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            
            <div className="flex gap-1">
              {project.links.demo && (
                <Button size="sm" variant="outline" className="px-2" asChild>
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              )}
              {project.links.repo && (
                <Button size="sm" variant="outline" className="px-2" asChild>
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Relevance Score for Developers */}
          <RoleContent role="developer">
            {project.relevanceScore && (
              <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Relevance Score</span>
                  <div className="flex items-center gap-1">
                    <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.relevanceScore}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <span className="font-medium">{Math.round(project.relevanceScore)}%</span>
                  </div>
                </div>
              </div>
            )}
          </RoleContent>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Hook for getting recommendations programmatically
export function useRecommendations(currentProject?: string, maxCount: number = 3) {
  const { role } = useRole()
  const [recommendations, setRecommendations] = useState<Project[]>([])

  useEffect(() => {
    // Same logic as component but exposed as hook
    if (!currentProject) {
      setRecommendations(ALL_PROJECTS.slice(0, maxCount))
      return
    }

    const current = ALL_PROJECTS.find(p => p.slug === currentProject)
    if (!current) {
      setRecommendations(ALL_PROJECTS.slice(0, maxCount))
      return
    }

    const visitHistory = getVisitHistory()
    const candidates = ALL_PROJECTS
      .filter(p => p.slug !== currentProject)
      .map(project => ({
        ...project,
        relevanceScore: calculateRelevanceScore(current, project, role, visitHistory)
      }))
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, maxCount)

    setRecommendations(candidates)
  }, [currentProject, role, maxCount])

  return recommendations
}