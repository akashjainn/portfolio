import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ProjectActionsProps {
  href: string
  demo?: string | undefined
  repo?: string | undefined
  variant?: 'teaser' | 'executive'
  className?: string
}

/**
 * Unified action/CTA component for project cards
 * Renders consistent button hierarchy across both card variants
 * - Primary: Case Study / Full Case Study button
 * - Secondary: Demo (external link) and Code (external link) as ghost buttons
 */
export function ProjectActions({
  href,
  demo,
  repo,
  variant = 'teaser',
  className = '',
}: ProjectActionsProps) {
  const isPrimary = variant === 'teaser'
  const primaryLabel = variant === 'teaser' ? 'Case study' : 'Full Case Study'

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        asChild
        variant="outline"
        size="sm"
        className={`interactive shadow-elegant hover:shadow-elegant-lg group/btn ${
          isPrimary ? 'flex-1' : ''
        }`}
      >
        <Link href={href} className="flex items-center justify-center gap-2">
          {primaryLabel}
          <svg
            className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </Button>

      {demo && (
        <Button asChild variant="ghost" size="sm" className="interactive group/demo">
          <Link
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo (opens in new tab)`}
            className="flex items-center gap-2"
          >
            <svg
              className="h-3 w-3 transition-transform group-hover/demo:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
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
            aria-label="View source code (opens in new tab)"
            className="flex items-center gap-2"
          >
            <svg
              className="h-3 w-3 transition-transform group-hover/code:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            Code
          </Link>
        </Button>
      )}
    </div>
  )
}
