import { ProjectFrontmatter } from '@/lib/mdx'

interface PersonStructuredDataProps {
  name: string
  jobTitle: string
  worksFor?: string
  alumniOf?: string
  url: string
  sameAs: string[]
  address?: {
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
}

interface ProjectStructuredDataProps {
  frontmatter: ProjectFrontmatter
  url: string
}

export function PersonStructuredData({
  name,
  jobTitle,
  worksFor,
  alumniOf,
  url,
  sameAs,
  address
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    ...(worksFor && { worksFor }),
    ...(alumniOf && { alumniOf }),
    url,
    sameAs,
    ...(address && { address: { "@type": "PostalAddress", ...address } })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function ProjectStructuredData({ frontmatter, url }: ProjectStructuredDataProps) {
  if (!frontmatter) {
    return null
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: frontmatter.title,
    description: frontmatter.summary,
    author: {
      "@type": "Person",
      name: "Akash Jain"
    },
    dateCreated: frontmatter.publishedAt,
    ...(frontmatter.updatedAt && { dateModified: frontmatter.updatedAt }),
    programmingLanguage: frontmatter.tech,
    ...(frontmatter.links.repo && { codeRepository: frontmatter.links.repo }),
    ...(frontmatter.links.demo && { applicationCategory: "WebApplication", url: frontmatter.links.demo }),
    keywords: frontmatter.tags,
    isPartOf: {
      "@type": "WebSite",
      name: "Akash Jain Portfolio",
      url: "https://akashjain.dev"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Akash Jain — Portfolio",
    description: "Full-stack developer focused on performance, accessibility, and real-time systems",
    url: "https://akashjain.dev",
    author: {
      "@type": "Person",
      name: "Akash Jain",
      jobTitle: "Full-stack Developer",
      alumniOf: "Georgia Institute of Technology"
    },
    mainEntity: {
      "@type": "Person",
      name: "Akash Jain"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function PortfolioStructuredData({ projects }: { projects?: any[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Akash Jain Portfolio",
    description: "Professional portfolio showcasing full-stack development projects with focus on performance and accessibility",
    author: {
      "@type": "Person",
      name: "Akash Jain",
      jobTitle: "Full-stack Developer",
      alumniOf: "Georgia Institute of Technology",
      knowsAbout: [
        "Full-stack Development",
        "Next.js",
        "TypeScript",
        "React",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "Web Performance",
        "Accessibility",
        "Real-time Systems"
      ]
    },
    datePublished: "2024-01-01",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    audience: {
      "@type": "Audience",
      audienceType: "Software Engineers, Technical Recruiters, Engineering Managers"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}