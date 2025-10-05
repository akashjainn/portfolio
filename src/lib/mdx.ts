import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import { VideoWithCaptions } from '@/components/ui/video-with-captions'

// Project frontmatter schema
export interface ProjectFrontmatter {
  title: string
  slug: string
  summary: string
  role: string
  period: string
  tech: string[]
  links: {
    demo?: string
    repo: string
  }
  metrics?: {
    lcp_ms?: number
    tbt_ms?: number
    cls?: number
    a11y?: string
    uptime?: string
    users?: string
    performance_improvement?: string
  }
  tags: string[]
  featured?: boolean
  category?: string
  status: 'published' | 'draft'
  publishedAt: string
  updatedAt?: string
}

// Note frontmatter schema  
export interface NoteFrontmatter {
  title: string
  slug: string
  summary: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  featured?: boolean
  status: 'published' | 'draft'
}

export interface ProjectData {
  frontmatter: ProjectFrontmatter
  content: string
  compiledSource: any
  readingTime: number
}

export interface NoteData {
  frontmatter: NoteFrontmatter
  content: string
  compiledSource: any
  readingTime: number
}

const projectsDirectory = path.join(process.cwd(), 'content/projects')
const notesDirectory = path.join(process.cwd(), 'content/notes')

// Utility to calculate reading time
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Get all project slugs
export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }
  return fs.readdirSync(projectsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

// Get all note slugs
export function getNoteSlugs(): string[] {
  if (!fs.existsSync(notesDirectory)) {
    return []
  }
  return fs.readdirSync(notesDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Compile MDX
    const { content: compiledSource } = await compileMDX({
      source: content,
      components: {
        VideoWithCaptions,
      },
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    })

    return {
      frontmatter: data as ProjectFrontmatter,
      content,
      compiledSource,
      readingTime: calculateReadingTime(content),
    }
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error)
    return null
  }
}

// Get note by slug
export async function getNoteBySlug(slug: string): Promise<NoteData | null> {
  try {
    const fullPath = path.join(notesDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Compile MDX
    const { content: compiledSource } = await compileMDX({
      source: content,
      components: {
        VideoWithCaptions,
      },
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    })

    return {
      frontmatter: data as NoteFrontmatter,
      content,
      compiledSource,
      readingTime: calculateReadingTime(content),
    }
  } catch (error) {
    console.error(`Error reading note ${slug}:`, error)
    return null
  }
}

// Get all projects with optional filtering
export async function getAllProjects({
  featured,
  limit,
  status = 'published',
  category
}: {
  featured?: boolean
  limit?: number
  status?: 'published' | 'draft' | 'all'
  category?: string
} = {}): Promise<ProjectData[]> {
  const slugs = getProjectSlugs()
  const projects: ProjectData[] = []

  for (const slug of slugs) {
    const project = await getProjectBySlug(slug)
    if (!project) continue

    // Filter by status
    if (status !== 'all' && project.frontmatter.status !== status) {
      continue
    }

    // Filter by featured
    if (featured !== undefined && project.frontmatter.featured !== featured) {
      continue
    }

    // Filter by category
    if (category !== undefined && project.frontmatter.category !== category) {
      continue
    }

    projects.push(project)
  }

  // Sort by publishedAt date (newest first)
  projects.sort((a, b) => 
    new Date(b.frontmatter.publishedAt).getTime() - 
    new Date(a.frontmatter.publishedAt).getTime()
  )

  return limit ? projects.slice(0, limit) : projects
}

// Get all notes with optional filtering
export async function getAllNotes({
  featured,
  limit,
  status = 'published'
}: {
  featured?: boolean
  limit?: number
  status?: 'published' | 'draft' | 'all'
} = {}): Promise<NoteData[]> {
  const slugs = getNoteSlugs()
  const notes: NoteData[] = []

  for (const slug of slugs) {
    const note = await getNoteBySlug(slug)
    if (!note) continue

    // Filter by status
    if (status !== 'all' && note.frontmatter.status !== status) {
      continue
    }

    // Filter by featured
    if (featured !== undefined && note.frontmatter.featured !== featured) {
      continue
    }

    notes.push(note)
  }

  // Sort by publishedAt date (newest first)
  notes.sort((a, b) => 
    new Date(b.frontmatter.publishedAt).getTime() - 
    new Date(a.frontmatter.publishedAt).getTime()
  )

  return limit ? notes.slice(0, limit) : notes
}