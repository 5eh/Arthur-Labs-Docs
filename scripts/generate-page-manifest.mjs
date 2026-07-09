// Build-time page manifest for SEO surfaces. Runs as `prebuild` (before `next build`),
// so it executes in every environment where the MDX source tree exists — unlike the old
// runtime fast-glob in sitemap.ts, which returned EMPTY on Vercel's serverless runtime
// and shipped a 4-URL sitemap that orphaned every blog and guide.
//
// Outputs (all committed-ignored generation targets EXCEPT llms.txt/rss.xml which are
// regenerated in place):
//   src/generated/pages.json — [{ route, title, description, publishDate, category, section }]
//     imported statically by src/app/sitemap.ts (bundled at build).
//   public/rss.xml — blog feed (freshness signal several AI crawlers consume).
//   public/llms.txt — COMPLETE llmstxt.org index of every content page (the old
//     hand-maintained file covered ~30 of 109 URLs and rotted as posts were added).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const APP = path.join(ROOT, 'src/app')
const BASE = 'https://docs.arthurlabs.net'

function walk(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (e.name === 'page.mdx') out.push(p)
  }
  return out
}

// Metadata lives as a plain `export const metadata = {...}` object literal in each
// page.mdx — extract the scalar fields with quote-aware regexes (no MDX evaluation).
function field(src, name) {
  const m = src.match(
    new RegExp(`${name}:\\s*(?:\\{\\s*absolute:\\s*)?(['"])((?:\\\\.|(?!\\1).)*)\\1`),
  )
  return m ? m[2].replace(/\\(['"])/g, '$1') : ''
}

const pages = walk(APP).map((file) => {
  const src = fs.readFileSync(file, 'utf8')
  const rel = path.relative(APP, file).replace(/\/?page\.mdx$/, '')
  const route = rel ? `/${rel}/` : '/'
  const section = rel.startsWith('blogs/')
    ? 'blog'
    : rel.startsWith('guides/')
      ? 'guide'
      : rel.startsWith('marketplace/')
        ? 'marketplace'
        : 'main'
  return {
    route,
    section,
    title: field(src, 'title'),
    description: field(src, 'description'),
    publishDate: field(src, 'publishDate'),
    category: field(src, 'category'),
  }
})

pages.sort((a, b) => a.route.localeCompare(b.route))

// ── pages.json ──
fs.mkdirSync(path.join(ROOT, 'src/generated'), { recursive: true })
fs.writeFileSync(
  path.join(ROOT, 'src/generated/pages.json'),
  JSON.stringify(pages, null, 2),
)

// ── rss.xml (blogs, newest first; posts without a parseable date sort last) ──
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const blogs = pages
  .filter((p) => p.section === 'blog' && p.route !== '/blogs/')
  .sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || ''))
const rssItems = blogs
  .map((p) => {
    const date = Date.parse(p.publishDate) ? new Date(p.publishDate).toUTCString() : ''
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${BASE}${p.route}</link>
      <guid>${BASE}${p.route}</guid>
      <description>${esc(p.description)}</description>${date ? `\n      <pubDate>${date}</pubDate>` : ''}
    </item>`
  })
  .join('\n')
fs.writeFileSync(
  path.join(ROOT, 'public/rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Arthur Labs Blog</title>
    <link>${BASE}/blogs/</link>
    <description>Arthur Labs articles on AI product engines (HIIE), Web3 development, digital marketplaces, and crypto compliance.</description>
    <language>en-us</language>
${rssItems}
  </channel>
</rss>
`,
)

// ── llms.txt (llmstxt.org) — complete index, grouped ──
const line = (p) => `- [${p.title}](${BASE}${p.route})${p.description ? `: ${p.description}` : ''}`
const guides = pages.filter((p) => p.section === 'guide' && p.route !== '/guides/')
const marketplace = pages.filter((p) => p.section === 'marketplace' && p.route !== '/marketplace/')
const main = pages.filter((p) => p.section === 'main')
const blogsByCategory = {}
for (const p of blogs) (blogsByCategory[p.category || 'General'] ??= []).push(p)

fs.writeFileSync(
  path.join(ROOT, 'public/llms.txt'),
  `# Arthur Labs Documentation

> Arthur Labs builds systems that enable entrepreneurship: HIIE (the AI engine that turns product ideas into operating businesses — CAD, feasibility, sourcing, automation: https://hiie.arthurlabs.net), DEAN (multi-chain marketplace factory), ROSE (centralized commerce), QUINN (social automation), and SUSAN (app generation). This site hosts the company's guides, articles, and product documentation.

Related properties: [HIIE product + knowledge base](https://hiie.arthurlabs.net/kb) · [Arthur Labs](https://arthurlabs.net)

## Main
${main.map(line).join('\n')}

## Guides
${guides.map(line).join('\n')}

${Object.entries(blogsByCategory)
  .sort()
  .map(([cat, list]) => `## Blog — ${cat}\n${list.map(line).join('\n')}`)
  .join('\n\n')}

## Marketplace
${marketplace.map(line).join('\n')}
`,
)

console.log(
  `manifest: ${pages.length} pages (${blogs.length} blogs, ${guides.length} guides, ${marketplace.length} marketplace) → pages.json, rss.xml, llms.txt`,
)
