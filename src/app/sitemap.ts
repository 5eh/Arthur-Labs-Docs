import { MetadataRoute } from 'next'
import glob from 'fast-glob'

interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://docs.arthurlabs.net'

  // Get all MDX pages
  const pages = await glob('**/*.mdx', { cwd: 'src/app' })
  
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Convert MDX pages to sitemap entries
  const blogPages: SitemapEntry[] = pages
    .filter((page) => page.includes('/blogs/'))
    .map((page) => {
      const slug = page.replace(/\/page\.mdx$/, '')
      return {
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })

  const guidePages: SitemapEntry[] = pages
    .filter((page) => page.includes('/guides/'))
    .map((page) => {
      const slug = page.replace(/\/page\.mdx$/, '')
      return {
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })

  const marketplacePages: SitemapEntry[] = pages
    .filter((page) => page.includes('/marketplace/'))
    .map((page) => {
      const slug = page.replace(/\/page\.mdx$/, '')
      return {
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }
    })

  return [...staticPages, ...blogPages, ...guidePages, ...marketplacePages]
}
