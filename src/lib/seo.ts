// SEO and structured data helpers

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Akash Jain",
    jobTitle: "Full-stack Developer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://akashjain.dev",
    sameAs: [
      "https://github.com/akashjainn",
      "https://www.linkedin.com/in/akashjainn",
      "https://twitter.com/akashjainn",
    ],
  }
}

export function projectJsonLd(project: {
  title: string
  summary: string
  slug: string
  datePublished?: string
  cover?: string
  tags?: string[]
  links?: { demo?: string; repo?: string }
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://akashjain.dev"
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: project.title,
    description: project.summary,
    datePublished: project.datePublished || new Date().toISOString(),
    image: project.cover ? new URL(project.cover, baseUrl).toString() : undefined,
    author: {
      "@type": "Person",
      name: "Akash Jain",
    },
    url: `${baseUrl}/projects/${project.slug}`,
    keywords: project.tags?.join(", "),
    ...(project.links?.repo && { codeRepository: project.links.repo }),
  }
}

export type Metric = { label: string; value: string }

export type ProjectMeta = {
  title: string
  slug: string
  summary: string
  role: string
  timeframe: string
  tags: string[]
  metrics?: Metric[]
  links?: { demo?: string; repo?: string }
  cover?: string
  datePublished?: string
  category?: string
  featured?: boolean
}
