// Per-page social metadata.
//
// Next.js merges metadata shallowly: a page that sets no `openGraph` inherits the
// root layout's object wholesale, so every article shared on X or LinkedIn shows
// the homepage title and description instead of its own. A page that sets its own
// `openGraph` replaces the root object entirely, including the image, which is why
// these factories rebuild the full object rather than passing a title through.
//
// The brand is deliberately absent from the titles here: the root layout's title
// template already appends it once, and siteName carries it once more.
export const SITE_ORIGIN = 'https://docs.arthurlabs.net'
const SITE_NAME = 'Arthur Labs Inc.'
const SOCIAL_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
}

export function pageOg({
  title,
  description,
  path,
  publishedTime,
}: {
  title: string
  description: string
  path: string
  publishedTime?: string
}) {
  return {
    type: 'article' as const,
    locale: 'en_US',
    siteName: SITE_NAME,
    url: `${SITE_ORIGIN}${path}`,
    title,
    description,
    ...(publishedTime ? { publishedTime } : {}),
    images: [{ ...SOCIAL_IMAGE, alt: title }],
  }
}

export function pageTwitter({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return {
    card: 'summary_large_image' as const,
    title,
    description,
    images: [SOCIAL_IMAGE.url],
  }
}
