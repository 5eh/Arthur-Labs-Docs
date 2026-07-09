import { MetadataRoute } from 'next'
import pages from '@/generated/pages.json'

// The manifest is generated at build time by scripts/generate-page-manifest.mjs
// (prebuild) and imported statically — the old runtime fast-glob returned EMPTY on
// Vercel (no src/app tree in the lambda), shipping a 4-URL sitemap that orphaned all
// ~95 blogs and 9 guides. force-static keeps this evaluated once at build.
//
// URLs use the trailing-slash form (next.config.mjs sets trailingSlash: true; the old
// slash-less entries each 308-redirected). No lastModified: fabricated "modified now"
// timestamps teach crawlers to distrust lastmod entirely.
export const dynamic = 'force-static'

const BASE = 'https://docs.arthurlabs.net'

const PRIORITY: Record<string, number> = {
  main: 0.8,
  guide: 0.7,
  blog: 0.7,
  marketplace: 0.6,
}

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${BASE}${page.route}`,
    changeFrequency: page.route === '/' || page.route === '/blogs/' ? 'weekly' : 'monthly',
    priority:
      page.route === '/'
        ? 1.0
        : page.route === '/blogs/' || page.route === '/guides/' || page.route === '/marketplace/'
          ? 0.9
          : (PRIORITY[page.section] ?? 0.5),
  }))
}
