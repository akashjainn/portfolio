import { notFound } from "next/navigation"
import { Navigation } from "@/components/site/navigation"
import CaseStudyLayout from "@/components/CaseStudyLayout"
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx"
import { ProjectStructuredData } from "@/components/seo/structured-data"
import { projectJsonLd } from "@/lib/seo"

export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = await getProjectBySlug(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found'
    }
  }

  const { frontmatter } = project

  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      tags: frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.summary,
    }
  }
}

export default async function ProjectPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = await getProjectBySlug(params.slug)
  
  if (!project) {
    notFound()
  }

  const { frontmatter, compiledSource, readingTime } = project

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            projectJsonLd({
              title: frontmatter.title,
              summary: frontmatter.summary,
              slug: params.slug,
              ...(frontmatter.datePublished && { datePublished: frontmatter.datePublished }),
              ...(frontmatter.publishedAt && !frontmatter.datePublished && { datePublished: frontmatter.publishedAt }),
              ...(frontmatter.cover && { cover: frontmatter.cover }),
              ...(frontmatter.thumbnail && !frontmatter.cover && { cover: frontmatter.thumbnail }),
              tags: frontmatter.tags,
              links: frontmatter.links,
            })
          ),
        }}
      />
      <Navigation />
      <main id="main-content">
        <CaseStudyLayout
          title={frontmatter.title}
          summary={frontmatter.summary}
          role={frontmatter.role}
          timeframe={frontmatter.timeframe || frontmatter.period || ""}
          links={frontmatter.links}
        >
          {compiledSource}
        </CaseStudyLayout>
      </main>
    </>
  )
}