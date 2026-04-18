import { MetadataRoute } from 'next'
import { getJournalSlugs } from '@/lib/journal'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getJournalSlugs()

  const journalEntries = slugs.map((slug) => ({
    url: `https://akashjain.dev/journal/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://akashjain.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: 'https://akashjain.dev/journal',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://akashjain.dev/about',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    ...journalEntries,
  ]
}
