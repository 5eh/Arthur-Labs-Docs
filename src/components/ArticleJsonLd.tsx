// Per-article BlogPosting structured data. The root layout ships only the site-wide
// Organization/WebSite graph — answer engines and Google need article-level schema
// (headline, dates, author) to treat a post as a citable article rather than a page.
// Use inside a blog/guide page.mdx:
//   <ArticleJsonLd
//     title="…" description="…" slug="/blogs/my-post/"
//     datePublished="2026-07-09" dateModified="2026-07-09" />
const BASE = 'https://docs.arthurlabs.net'

export default function ArticleJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${BASE}${slug}#article`,
          headline: title,
          description,
          url: `${BASE}${slug}`,
          datePublished,
          dateModified: dateModified ?? datePublished,
          inLanguage: 'en-US',
          author: { '@id': 'https://arthurlabs.net/#organization' },
          publisher: { '@id': 'https://arthurlabs.net/#organization' },
          isPartOf: { '@id': `${BASE}/#website` },
          mainEntityOfPage: `${BASE}${slug}`,
          image: `${BASE}/og-image.png`,
        }),
      }}
    />
  )
}
