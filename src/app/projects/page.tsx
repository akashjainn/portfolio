import { Navigation } from "@/components/site/navigation"
import { getAllProjects } from "@/lib/mdx"
import { AnimatedProjectsGrid } from "@/components/animated-projects-grid"
import { AnimatedBlobs } from "@/components/ui/animated-blobs"

export const metadata = {
  title: "Projects",
  description: "A collection of software projects showcasing full-stack development, real-time systems, and performance optimization."
}

export default async function ProjectsPage() {
  // Get all published projects, sorted by date (excluding playground projects)
  const allProjects = await getAllProjects({ status: 'published' })
  const projects = allProjects.filter(project => project.frontmatter.category !== 'playground')
  
  return (
    <>
      <AnimatedBlobs />
      <Navigation />
      <AnimatedProjectsGrid projects={projects} />
    </>
  )
}