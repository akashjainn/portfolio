import { notFound } from "next/navigation"
import { Navigation } from "@/components/site/navigation"
import { CaseStudyLayout } from "@/components/site/case-study-layout"
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx"
import { ProjectStructuredData } from "@/components/seo/structured-data"

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
      <ProjectStructuredData 
        frontmatter={frontmatter} 
        url={`https://akashjain.dev/projects/${params.slug}`} 
      />
      <Navigation />
      <main id="main-content">
        <CaseStudyLayout 
          frontmatter={frontmatter} 
          readingTime={readingTime}
        >
          {compiledSource}
        </CaseStudyLayout>
      </main>
    </>
  )
}