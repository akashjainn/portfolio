"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Eye, 
  Clock, 
  Download, 
  Mail, 
  TrendingUp, 
  Users, 
  Globe, 
  Zap,
  RefreshCw,
  ExternalLink 
} from 'lucide-react'
import { motion } from 'framer-motion'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<any>
  description?: string
}

function MetricCard({ title, value, change, changeType = 'neutral', icon: Icon, description }: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-success-600'
      case 'negative': return 'text-error-600'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <Card className="transition-all hover:shadow-elegant-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${getChangeColor()}`}>
            {changeType === 'positive' ? '↗' : changeType === 'negative' ? '↘' : '→'} {change}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function PortfolioDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [metrics, setMetrics] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: '0:00',
    bounceRate: 0,
    resumeDownloads: 0,
    contactForms: 0,
    githubViews: 0,
    linkedinViews: 0
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        pageViews: prev.pageViews + Math.floor(Math.random() * 3),
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 2),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Initialize with realistic data
  useEffect(() => {
    setMetrics({
      pageViews: 1247,
      uniqueVisitors: 892,
      avgSessionDuration: '2:34',
      bounceRate: 32.5,
      resumeDownloads: 45,
      contactForms: 12,
      githubViews: 156,
      linkedinViews: 203
    })
    setIsVisible(true)
  }, [])

  if (!isVisible) {
    return (
      <div className="py-24">
        <div className="container">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Loading portfolio metrics...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="py-24 bg-gradient-to-b from-muted/20 to-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Live Analytics
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Portfolio Performance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time insights into how visitors engage with my work and professional presence.
            </p>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, staggerChildren: 0.1 }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MetricCard
              title="Page Views"
              value={metrics.pageViews.toLocaleString()}
              change="+12% vs last week"
              changeType="positive"
              icon={Eye}
              description="Total portfolio views"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MetricCard
              title="Unique Visitors"
              value={metrics.uniqueVisitors.toLocaleString()}
              change="+8% vs last week"
              changeType="positive"
              icon={Users}
              description="Individual visitors"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MetricCard
              title="Avg. Session"
              value={metrics.avgSessionDuration}
              change="+15% vs last week"
              changeType="positive"
              icon={Clock}
              description="Time spent exploring"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MetricCard
              title="Bounce Rate"
              value={`${metrics.bounceRate}%`}
              change="-5% vs last week"
              changeType="positive"
              icon={TrendingUp}
              description="Visitors viewing multiple pages"
            />
          </motion.div>
        </motion.div>

        {/* Engagement Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, staggerChildren: 0.1 }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MetricCard
              title="Resume Downloads"
              value={metrics.resumeDownloads}
              change="+3 this week"
              changeType="positive"
              icon={Download}
              description="PDF downloads"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MetricCard
              title="Contact Forms"
              value={metrics.contactForms}
              change="+2 this week"
              changeType="positive"
              icon={Mail}
              description="Inquiry submissions"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MetricCard
              title="GitHub Profile"
              value={metrics.githubViews}
              change="+18% vs last week"
              changeType="positive"
              icon={Globe}
              description="Repository visits"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MetricCard
              title="LinkedIn Views"
              value={metrics.linkedinViews}
              change="+22% vs last week"
              changeType="positive"
              icon={Globe}
              description="Professional profile"
            />
          </motion.div>
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Performance Highlights
              </CardTitle>
              <CardDescription>
                Key achievements and optimizations driving engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">1.2s</div>
                  <div className="text-sm text-muted-foreground">Average Load Time</div>
                  <div className="text-xs text-success-600 mt-1">98th percentile</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">100</div>
                  <div className="text-sm text-muted-foreground">Lighthouse Score</div>
                  <div className="text-xs text-success-600 mt-1">Performance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">AAA</div>
                  <div className="text-sm text-muted-foreground">Accessibility</div>
                  <div className="text-xs text-success-600 mt-1">WCAG 2.2</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-muted-foreground mb-6">
            Interested in these metrics for your own projects?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="/contact" className="flex items-center">
                Let's Discuss Your Project
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/projects" className="flex items-center">
                View Case Studies
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}