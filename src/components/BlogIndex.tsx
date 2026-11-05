import Link from 'next/link'

import pages from '@/generated/pages.json'

// The blog index, generated from the build-time manifest
// (scripts/generate-page-manifest.mjs) instead of a hand-kept list of links.
// The hand-kept version listed 79 of 98 posts and claimed a total of 75, so a
// fifth of the blog was reachable only through the sitemap. Releasing an article
// from the scheduled queue now adds it here with no further edit.

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

function formatDate(isoDate: string) {
  const parsed = Date.parse(isoDate)
  return Number.isNaN(parsed) ? '' : dateFormat.format(parsed)
}

export function BlogIndex() {
  const posts = pages
    .filter((page) => page.section === 'blog' && page.route !== '/blogs/')
    .sort(
      (a, b) =>
        (b.publishDate || '').localeCompare(a.publishDate || '') ||
        a.route.localeCompare(b.route),
    )

  return (
    <div className="not-prose mt-10">
      <p className="mb-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
        {posts.length} posts, newest first
      </p>
      <ol className="border-t border-zinc-200 dark:border-zinc-800">
        {posts.map((post) => (
          <li key={post.route} className="border-b border-zinc-200 dark:border-zinc-800">
            <Link
              href={post.route}
              className="grid grid-cols-1 gap-1 py-3 transition-colors hover:bg-zinc-50 sm:grid-cols-[7rem_1fr_auto] sm:gap-4 dark:hover:bg-zinc-800/50"
            >
              <time
                dateTime={post.publishDate}
                className="font-mono text-xs text-zinc-500 sm:pt-0.5 dark:text-zinc-400"
              >
                {formatDate(post.publishDate)}
              </time>
              <span className="text-sm font-medium text-zinc-900 dark:text-white">
                {post.title}
              </span>
              {post.category ? (
                <span className="text-xs text-zinc-500 sm:text-right dark:text-zinc-400">
                  {post.category}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
