"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Users, TrendingUp, Award, ExternalLink, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ExecutiveSummaryProps {
  project: {
    title: string
    slug: string
    category: string
    timeline: string
    impact: string[]
    techStack: string[]
    metrics: {
      users?: string
      performance?: string
      uptime?: string
      businessImpact?: string
    }
    links: {
      demo?: string | undefined
      repo?: string | undefined
    }
    challenges: string[]
    solutions: string[]
  }
}

const EXECUTIVE_SUMMARIES = [
  {
    title: "PropSage",
    slug: "propsage",
    category: "Sports Tech",
    timeline: "2 weeks (Hackathon)",
    impact: [
      "Won HackGT12 competition",
      "94% prediction accuracy achieved",
      "Real-time data processing under 100ms"
    ],
    techStack: ["Next.js", "TypeScript", "Redis", "Server-Sent Events", "TailwindCSS"],
    metrics: {
      users: "500+ testers",
      performance: "1.2s LCP",
      uptime: "99.9%",
      businessImpact: "Proof of concept validated"
    },
    links: {
      demo: "https://propsage.vercel.app",
      repo: "https://github.com/akashjainn/propsage"
    },
    challenges: [
      "Real-time odds aggregation from multiple APIs",
      "Sub-100ms latency requirements",
      "Handling concurrent user sessions"
    ],
    solutions: [
      "Implemented Redis caching with smart invalidation",
      "Server-Sent Events for real-time updates",
      "Optimistic UI updates with fallback handling"
    ]
  },
  {
    title: "StockSense",
    slug: "stocksense",
    category: "FinTech",
    timeline: "3 weeks",
    impact: [
      "Complete portfolio analytics platform",
      "Real-time market data integration",
      "Advanced risk metrics calculation"
    ],
    techStack: ["Next.js", "MongoDB", "Alpha Vantage API", "Chart.js", "Prisma"],
    metrics: {
      users: "200+ portfolio uploads",
      performance: "1.8s LCP",
      uptime: "99.5%",
      businessImpact: "Featured on developer showcases"
    },
    links: {
      demo: "https://stocksense.vercel.app",
      repo: "https://github.com/akashjainn/stocksense"
    },
    challenges: [
      "CSV parsing with various broker formats",
      "Real-time price updates for 100+ symbols",
      "Complex P/L calculations across time periods"
    ],
    solutions: [
      "Flexible parser with format detection",
      "Efficient WebSocket connection pooling",
      "Cached calculations with incremental updates"
    ]
  },
  {
    title: "State Farm Systems",
    slug: "statefarm",
    category: "Enterprise",
    timeline: "12 weeks (Internship)",
    impact: [
      "Served 2M+ monthly active users",
      "35% latency reduction in chat systems",
      "99.98% system uptime maintained"
    ],
    techStack: ["React", "Node.js", "MongoDB", "WebSockets", "Docker", "AWS"],
    metrics: {
      users: "2M+ MAU",
      performance: "35% faster",
      uptime: "99.98%",
      businessImpact: "$100K+ cost savings"
    },
    links: {
      demo: undefined,
      repo: undefined
    },
    challenges: [
      "Scale to handle 2M+ concurrent users",
      "Legacy system integration constraints",
      "Real-time chat performance optimization"
    ],
    solutions: [
      "Implemented WebSocket connection pooling",
      "Database query optimization and indexing",
      "Microservices architecture for better scaling"
    ]
  }
]

function ExecutiveSummaryCard({ project }: ExecutiveSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'impact' | 'tech' | 'challenges'>('impact')

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {project.timeline}
              </div>
            </div>
            <CardTitle className="text-xl mb-1">{project.title}</CardTitle>
          </div>
          
          <div className="flex gap-1">
            {project.links.demo && (
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
            {project.links.repo && (
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.524.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.656.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Key Metrics - Always Visible */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {project.metrics.users && (
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-3 w-3 text-primary mr-1" />
                <span className="text-sm font-bold text-primary">{project.metrics.users}</span>
              </div>
              <div className="text-xs text-muted-foreground">Scale</div>
            </div>
          )}
          {project.metrics.performance && (
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-3 w-3 text-primary mr-1" />
                <span className="text-sm font-bold text-primary">{project.metrics.performance}</span>
              </div>
              <div className="text-xs text-muted-foreground">Performance</div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* 30-Second Summary */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Award className="h-4 w-4 mr-1 text-primary" />
            Key Impact (30s read)
          </h4>
          <ul className="space-y-1">
            {project.impact.slice(0, 3).map((item, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start">
                <span className="text-primary mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Expand Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full mb-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Technical Deep Dive'}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </Button>

        {/* Expandable Technical Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Tab Navigation */}
              <div className="flex rounded-lg bg-muted/30 p-1 mb-4">
                {(['impact', 'tech', 'challenges'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                      activeTab === tab
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab === 'impact' && 'Business Impact'}
                    {tab === 'tech' && 'Tech Stack'}
                    {tab === 'challenges' && 'Problems Solved'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'impact' && (
                    <div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-center p-3 bg-success-50 border border-success-200 rounded-lg">
                          <div className="font-bold text-success-700">{project.metrics.uptime || 'N/A'}</div>
                          <div className="text-xs text-success-600">Uptime</div>
                        </div>
                        <div className="text-center p-3 bg-primary-50 border border-primary-200 rounded-lg">
                          <div className="font-bold text-primary-700">{project.metrics.businessImpact || 'N/A'}</div>
                          <div className="text-xs text-primary-600">Business Value</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'tech' && (
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Technology Stack</h5>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'challenges' && (
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Challenges</h5>
                        <ul className="space-y-1">
                          {project.challenges.map((challenge, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start">
                              <span className="text-error-500 mr-2">▲</span>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Solutions</h5>
                        <ul className="space-y-1">
                          {project.solutions.map((solution, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start">
                              <span className="text-success-500 mr-2">✓</span>
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Call to Action */}
              <div className="pt-4 border-t border-border/50 mt-4">
                <Button asChild size="sm" className="w-full">
                  <a href={`/projects/${project.slug}`}>
                    Full Case Study
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export function ExecutiveSummarySection() {
  return (
    <div className="py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">
            <Clock className="h-3 w-3 mr-1" />
            Executive Summary
          </Badge>
          <h2 className="text-4xl font-bold mb-4">30-Second Project Overview</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Recruiter-focused summaries highlighting business impact, technical challenges, and measurable outcomes. 
            Expand for technical deep dives.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXECUTIVE_SUMMARIES.map((project) => (
            <ExecutiveSummaryCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Download Resume CTA */}
        <div className="text-center mt-16 pt-8 border-t border-border/50">
          <p className="text-muted-foreground mb-4">
            Want the complete technical background?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="/Akash_Jain_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/contact">
                Schedule Technical Interview
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}