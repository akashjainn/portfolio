import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

export interface JournalArtifact {
  type: 'model' | 'graph' | 'ribbon' | 'viewport' | 'horizon' | 'none'
  src?: string
  caption: string
  aspectRatio?: string
}

export interface JournalFrontmatter {
  slug: string
  title: string
  summary: string
  tags: string[]
  status: 'published' | 'draft'
  entryNo: number
  kind: 'case' | 'specimen' | 'study' | 'playground'
  publishedAt: string
  updatedAt?: string
  artifact: JournalArtifact
}

export interface JournalEntry {
  frontmatter: JournalFrontmatter
  content: string
  compiledSource: React.ReactElement
  readingTime: number
}

export interface JournalSummary {
  frontmatter: JournalFrontmatter
  readingTime: number
}

function isValidJournalFrontmatter(data: unknown): data is JournalFrontmatter {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  return (
    typeof d.title === 'string' &&
    typeof d.slug === 'string' &&
    typeof d.entryNo === 'number' &&
    (d.status === 'published' || d.status === 'draft') &&
    Array.isArray(d.tags) &&
    d.artifact != null
  )
}

const journalDir = path.join(process.cwd(), 'content/journal')

function readingTime(text: string): number {
  return Math.ceil(text.trim().split(/\s+/).length / 225)
}

export function getJournalSlugs(): string[] {
  if (!fs.existsSync(journalDir)) return []
  return fs
    .readdirSync(journalDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export async function getJournalEntry(
  slug: string,
  components: Record<string, React.ComponentType<any>> = {}
): Promise<JournalEntry | null> {
  try {
    const fullPath = path.join(journalDir, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) return null

    const raw = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(raw)

    if (!isValidJournalFrontmatter(data)) {
      console.error(`[journal] invalid frontmatter in ${slug}.mdx`, data)
      return null
    }

    const { content: compiledSource } = await compileMDX({
      source: content,
      components,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      },
    })

    return {
      frontmatter: data,
      content,
      compiledSource,
      readingTime: readingTime(content),
    }
  } catch (error) {
    console.error(`[journal] error reading entry "${slug}":`, error)
    return null
  }
}

async function getJournalSummary(slug: string): Promise<JournalSummary | null> {
  try {
    const fullPath = path.join(journalDir, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) return null
    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
    if (!isValidJournalFrontmatter(data)) return null
    return { frontmatter: data, readingTime: readingTime(content) }
  } catch {
    return null
  }
}

export async function getAllJournalEntries({
  status = 'published',
  kind,
  limit,
}: {
  status?: 'published' | 'draft' | 'all'
  kind?: JournalFrontmatter['kind']
  limit?: number
} = {}): Promise<JournalSummary[]> {
  const slugs = getJournalSlugs()
  const entries: JournalSummary[] = []

  for (const slug of slugs) {
    const entry = await getJournalSummary(slug)
    if (!entry) continue
    if (status !== 'all' && entry.frontmatter.status !== status) continue
    if (kind !== undefined && entry.frontmatter.kind !== kind) continue
    entries.push(entry)
  }

  entries.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  )

  return limit ? entries.slice(0, limit) : entries
}
