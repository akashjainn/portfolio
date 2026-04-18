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
  const fullPath = path.join(journalDir, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

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
    frontmatter: data as JournalFrontmatter,
    content,
    compiledSource,
    readingTime: readingTime(content),
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
} = {}): Promise<JournalEntry[]> {
  const slugs = getJournalSlugs()
  const entries: JournalEntry[] = []

  for (const slug of slugs) {
    const entry = await getJournalEntry(slug)
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
