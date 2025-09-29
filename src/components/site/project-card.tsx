import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  summary: string
  tags: string[]
  href: string
  demo?: string
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
    <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <CardTitle className="group-hover:text-primary transition-colors">
          <Link 
            href={href}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            {title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {summary}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={href}>
              Case study
            </Link>
          </Button>
          
          {demo && (
            <Button asChild variant="ghost" size="sm">
              <Link 
                href={demo} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View live demo of ${title} (opens in new tab)`}
              >
                Live demo
              </Link>
            </Button>
          )}
          
          {repo && (
            <Button asChild variant="ghost" size="sm">
              <Link 
                href={repo} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View source code for ${title} (opens in new tab)`}
              >
                Code
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}