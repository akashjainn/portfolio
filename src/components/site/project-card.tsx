import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  summary: string
  tags: string[]
  href: string
  demo?: string | undefined
  repo?: string
}

export function ProjectCard({ 
  title, 
  summary, 
  tags, 
  href, 
  demo, 
  repo 
}: ProjectCardProps) {
  return (
    <Card className="group h-full flex flex-col card-hover card-glass backdrop-blur-sm border-0 shadow-elegant hover:shadow-elegant-lg">
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl font-display font-semibold group-hover:text-primary transition-all duration-300 ease-out text-balance">
          <Link 
            href={href}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 rounded-md block interactive"
          >
            {title}
          </Link>
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2 text-pretty leading-relaxed">
          {summary}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between space-y-6">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-muted/50 border border-border/50 px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:bg-muted hover:border-border hover:scale-105 cursor-default"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1 interactive shadow-elegant hover:shadow-elegant-lg group/btn">
            <Link href={href} className="flex items-center justify-center gap-2">
              Case study
              <svg className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </Button>
          
          {demo && (
            <Button asChild variant="ghost" size="sm" className="interactive group/demo">
              <Link 
                href={demo} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View live demo of ${title} (opens in new tab)`}
                className="flex items-center gap-2"
              >
                <svg className="h-3 w-3 transition-transform group-hover/demo:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Demo
              </Link>
            </Button>
          )}
          
          {repo && (
            <Button asChild variant="ghost" size="sm" className="interactive group/code">
              <Link 
                href={repo} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View source code for ${title} (opens in new tab)`}
                className="flex items-center gap-2"
              >
                <svg className="h-3 w-3 transition-transform group-hover/code:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Code
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
