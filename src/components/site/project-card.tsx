import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricsBadge } from "@/components/ui/metrics-badge"
import { ProjectChip } from "@/components/ui/project-chip"
import { ProjectActions } from "@/components/ui/project-actions"
import { MetricsRow, MetricItem } from "@/components/ui/metrics-row"

type ProjectMetrics = MetricItem[] | {
  lcp_ms?: number
  tbt_ms?: number
  cls?: number
  a11y?: string
  uptime?: string
  users?: string
  performance_improvement?: string
  lighthouse_mobile?: number
}

interface ProjectCardProps {
  title: string
  summary: string
  tags: string[]
  href: string
  demo?: string | undefined
  repo?: string
  metrics?: ProjectMetrics | undefined
}

export function ProjectCard({ 
  title, 
  summary, 
  tags, 
  href, 
  demo, 
  repo,
  metrics
}: ProjectCardProps) {
  // Convert old object format to new array format if needed
  const normalizeMetrics = (m: ProjectMetrics | undefined): MetricItem[] | undefined => {
    if (!m) return undefined
    if (Array.isArray(m)) return m
    
    // Old format conversion
    const result: MetricItem[] = []
    const oldMetrics = m as Record<string, any>
    
    if (oldMetrics.lighthouse_mobile !== undefined) {
      result.push({
        label: 'Lighthouse',
        value: `${oldMetrics.lighthouse_mobile}/100`,
        variant: oldMetrics.lighthouse_mobile >= 90 ? 'success' : oldMetrics.lighthouse_mobile >= 50 ? 'warning' : 'error'
      })
    }
    if (oldMetrics.lcp_ms !== undefined) {
      result.push({
        label: 'LCP',
        value: `${oldMetrics.lcp_ms}ms`,
        variant: oldMetrics.lcp_ms <= 2500 ? 'success' : oldMetrics.lcp_ms <= 4000 ? 'warning' : 'error'
      })
    }
    if (oldMetrics.tbt_ms !== undefined) {
      result.push({
        label: 'TBT',
        value: `${oldMetrics.tbt_ms}ms`,
        variant: oldMetrics.tbt_ms <= 200 ? 'success' : oldMetrics.tbt_ms <= 600 ? 'warning' : 'error'
      })
    }
    if (oldMetrics.cls !== undefined) {
      result.push({
        label: 'CLS',
        value: String(oldMetrics.cls),
        variant: oldMetrics.cls <= 0.1 ? 'success' : oldMetrics.cls <= 0.25 ? 'warning' : 'error'
      })
    }
    if (oldMetrics.a11y) {
      result.push({
        label: 'A11y',
        value: oldMetrics.a11y,
        variant: 'quality'
      })
    }
    if (!oldMetrics.a11y && oldMetrics.performance_improvement) {
      result.push({
        label: 'Perf',
        value: oldMetrics.performance_improvement,
        variant: 'performance'
      })
    }
    
    return result.length > 0 ? result : undefined
  }
  
  const normalizedMetrics = normalizeMetrics(metrics)
  return (
    <Card className="group flex flex-col h-fit transition-all duration-300 ease-out hover:-translate-y-1 backdrop-blur-sm border-2 border-border/40 hover:border-[hsl(194_100%_50%)] hover:shadow-[0_0_20px_hsla(194,100%,50%,0.3)] bg-card shadow-lg">
      <CardHeader className="pb-4 space-y-3">
        <CardTitle className="line-clamp-2 text-xl font-display font-semibold group-hover:text-gradient-vibrant transition-all duration-300 ease-out text-balance">
          <Link 
            href={href}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(194_100%_50%)] focus-visible:ring-offset-2 rounded-md block"
          >
            {title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-muted-foreground text-pretty leading-relaxed">
          {summary}
        </CardDescription>
        {normalizedMetrics && <MetricsRow metrics={normalizedMetrics} maxVisible={4} layout="wrap" />}
      </CardHeader>
      
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <ProjectChip
              key={tag}
              variant="tech"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tag}
            </ProjectChip>
          ))}
        </div>
        
        <div className="mt-auto pt-2">
          <ProjectActions href={href} demo={demo} repo={repo} variant="teaser" />
        </div>
      </CardContent>
    </Card>
  )
}
