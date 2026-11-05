// The scheduled-article queue.
//
// Articles are written ahead of time into content/scheduled/<slug>/page.mdx, a
// directory Next.js never builds, and released one at a time into
// src/app/blogs/<slug>/. Release order is the publishDate each article carries;
// the date actually written into the released file is the day it was released,
// so a post released late never claims to be older than it is.
//
//   node scripts/content-queue.mjs            list the queue in release order
//   node scripts/content-queue.mjs check      validate every queued article
//   node scripts/content-queue.mjs publish    release the next article
//   node scripts/content-queue.mjs publish --due
//                                              release every article whose
//                                              scheduled date has arrived
//   node scripts/content-queue.mjs publish --slug <slug>
//   node scripts/content-queue.mjs preview-build
//                                              build a throwaway copy of the
//                                              site with the whole queue
//                                              released, to prove it renders
//
// Releasing only moves a file. The blog index, the navigation's latest group,
// the sitemap, rss.xml and llms.txt are all generated from src/app at build
// time, so nothing else needs editing by hand.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const QUEUE = path.join(ROOT, 'content/scheduled')
const APP = path.join(ROOT, 'src/app')
const BLOGS = path.join(APP, 'blogs')

// Release dates are local to the studio, not UTC, so an evening release in
// Omaha is stamped with the evening's date rather than tomorrow's.
function today() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

function field(src, name) {
  const match = src.match(new RegExp(`${name}:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`))
  return match ? match[2].replace(/\\(['"])/g, '$1') : ''
}

function attribute(src, name) {
  const match = src.match(new RegExp(`${name}="([^"]*)"`))
  return match ? match[1] : ''
}

function readQueue() {
  if (!fs.existsSync(QUEUE)) return []
  return fs
    .readdirSync(QUEUE, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const file = path.join(QUEUE, entry.name, 'page.mdx')
      const src = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
      return {
        slug: entry.name,
        file,
        src,
        title: field(src, 'title'),
        publishDate: field(src, 'publishDate'),
      }
    })
    .sort(
      (a, b) =>
        a.publishDate.localeCompare(b.publishDate) || a.slug.localeCompare(b.slug),
    )
}

function publishedRoutes() {
  const routes = new Set()
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/^page\.(mdx|tsx|ts|jsx|js)$/.test(entry.name)) {
        const rel = path.relative(APP, path.dirname(full))
        routes.add(rel ? `/${rel}/` : '/')
      }
    }
  }
  walk(APP)
  return routes
}

function list() {
  const queue = readQueue()
  if (queue.length === 0) {
    console.log('queue: empty')
    return
  }
  const now = today()
  console.log(`queue: ${queue.length} articles, today is ${now} (America/Chicago)\n`)
  for (const item of queue) {
    const state = item.publishDate <= now ? 'due      ' : 'scheduled'
    console.log(`${item.publishDate}  ${state}  ${item.slug}`)
  }
}

// ── check ────────────────────────────────────────────────────────────────────

const BANNED_WORDS = [
  'streamline',
  'empower',
  'supercharge',
  'world-class',
  'enterprise-grade',
  'seamless',
  'cutting-edge',
  'game-changer',
  'game changer',
  'revolutionize',
  'unlock',
  'delve',
  'robust',
  'leverage',
  'next level',
  'next-level',
]

// Headings that restate the layout instead of carrying a fact (Copy 7).
const LABEL_HEADINGS = [
  'overview',
  'introduction',
  'conclusion',
  'summary',
  'key takeaways',
  'takeaways',
  'final thoughts',
  'features',
  'key features',
  'how it works',
  'our process',
  'use cases',
  'the problem',
  'the solution',
  'faq',
  'frequently asked questions',
  'next steps',
  'background',
  'getting started',
]

async function loadCompiler() {
  try {
    return await import('@mdx-js/mdx')
  } catch {
    // pnpm keeps transitive dependencies out of the top-level node_modules;
    // the compiler is a sibling of the loader Next.js already depends on.
    const loader = fs.realpathSync(path.join(ROOT, 'node_modules/@mdx-js/loader'))
    return await import(pathToFileURL(path.join(loader, '..', 'mdx', 'index.js')).href)
  }
}

function proseOnly(src) {
  // Strip code fences, JSX blocks and the metadata export so the prose checks
  // read only what a visitor reads.
  return src
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^export const [\s\S]*?^}\s*$/m, '')
    .replace(/^import .*$/gm, '')
    .replace(/^<[A-Z][\s\S]*?\/>\s*$/gm, '')
    .replace(/^<div[\s\S]*?<\/div>\s*$/gm, '')
}

async function check() {
  const queue = readQueue()
  const routes = publishedRoutes()
  const { compile } = await loadCompiler()
  const { remarkPlugins } = await import(pathToFileURL(path.join(ROOT, 'src/mdx/remark.mjs')).href)
  const { rehypePlugins } = await import(pathToFileURL(path.join(ROOT, 'src/mdx/rehype.mjs')).href)
  const releaseOrder = new Map(queue.map((item, index) => [`/blogs/${item.slug}/`, index]))
  const seenDates = new Map()
  let failures = 0

  for (const [index, item] of queue.entries()) {
    const problems = []
    const warnings = []
    const { src, slug } = item
    const route = `/blogs/${slug}/`

    if (!src) {
      console.log(`✗ ${slug}: no page.mdx`)
      failures++
      continue
    }
    if (routes.has(route)) problems.push(`${route} already exists in src/app`)

    try {
      await compile(src, { remarkPlugins, rehypePlugins })
    } catch (error) {
      problems.push(`MDX does not compile: ${error.message.split('\n')[0]}`)
    }

    const title = field(src, 'title')
    const description = field(src, 'description')
    const shortTitle = field(src, 'shortTitle')
    const category = field(src, 'category')
    const canonical = field(src, 'canonical')
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.publishDate)) problems.push('publishDate is not YYYY-MM-DD')
    if (seenDates.has(item.publishDate))
      warnings.push(`shares ${item.publishDate} with ${seenDates.get(item.publishDate)}`)
    seenDates.set(item.publishDate, slug)
    if (!title) problems.push('metadata.title missing')
    if (title.length > 65) problems.push(`title is ${title.length} chars; search results cut near 60`)
    if (/arthur labs/i.test(title)) problems.push('title names Arthur Labs; the layout template already appends it (SEO 3)')
    if (description.length < 120 || description.length > 165)
      problems.push(`description is ${description.length} chars; keep it 120 to 165`)
    if (!shortTitle) problems.push('metadata.shortTitle missing (the navigation label)')
    if (shortTitle.length > 32) problems.push(`shortTitle is ${shortTitle.length} chars; the nav truncates past 32`)
    if (!category) problems.push('metadata.category missing')
    if (canonical !== route) problems.push(`canonical is "${canonical}", expected "${route}"`)
    if (!/openGraph:\s*pageOg\(/.test(src)) problems.push('openGraph: pageOg({...}) missing')

    const jsonLdTitle = attribute(src, 'title')
    if (jsonLdTitle !== title) problems.push('ArticleJsonLd title differs from metadata.title')
    if (attribute(src, 'description') !== description)
      problems.push('ArticleJsonLd description differs from metadata.description')
    if (attribute(src, 'slug') !== route) problems.push(`ArticleJsonLd slug is not ${route}`)
    if (attribute(src, 'datePublished') !== item.publishDate)
      problems.push('ArticleJsonLd datePublished differs from publishDate')
    const ogDates = [...src.matchAll(/publishedTime:\s*'([^']*)'/g)].map((match) => match[1])
    if (ogDates.some((date) => date !== item.publishDate))
      problems.push('pageOg publishedTime differs from publishDate')

    const withoutCode = src.replace(/```[\s\S]*?```/g, '')
    const h1s = withoutCode.match(/^# .+$/gm) ?? []
    if (h1s.length !== 1) problems.push(`${h1s.length} H1 headings; exactly one is allowed (SEO 6)`)
    else if (h1s[0].slice(2).trim() !== title) problems.push('H1 differs from metadata.title')

    for (const heading of withoutCode.match(/^#{2,3} .+$/gm) ?? []) {
      const text = heading.replace(/^#+\s*/, '').trim()
      if (text.endsWith('?')) problems.push(`question heading (Copy 6): "${text}"`)
      if (LABEL_HEADINGS.includes(text.toLowerCase())) problems.push(`container-label heading (Copy 7): "${text}"`)
    }

    const prose = proseOnly(src)
    for (const word of BANNED_WORDS) {
      const pattern = new RegExp(`\\b${word.replace('-', '[- ]')}\\w*`, 'i')
      const hit = prose.match(pattern)
      if (hit) problems.push(`banned word (Design Review 30): "${hit[0]}"`)
    }
    for (const paragraph of prose.split(/\n\s*\n/)) {
      const dashes = (paragraph.match(/—/g) ?? []).length
      if (dashes > 2) problems.push(`paragraph with ${dashes} em-dashes (Design Review 31): "${paragraph.trim().slice(0, 60)}…"`)
    }

    const words = prose.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
    if (words < 1200) warnings.push(`${words} words; the batch targets 1,600 to 2,400`)

    const links = [
      ...src.matchAll(/\]\((\/[^)\s#]*)(#[^)\s]*)?\)/g),
      ...src.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g),
    ].map((match) => match[1])
    for (const link of links) {
      if (/\.(png|jpe?g|webp|svg|txt|xml)$/.test(link)) continue
      const normalized = link.endsWith('/') ? link : `${link}/`
      if (routes.has(normalized)) continue
      if (releaseOrder.has(normalized)) {
        if (releaseOrder.get(normalized) > index)
          problems.push(`links to ${normalized}, which is released after this article`)
        continue
      }
      problems.push(`links to ${normalized}, which does not exist`)
    }

    const mark = problems.length ? '✗' : '✓'
    console.log(`${mark} ${item.publishDate} ${slug} (${words} words)`)
    for (const problem of problems) console.log(`    error: ${problem}`)
    for (const warning of warnings) console.log(`    warn:  ${warning}`)
    if (problems.length) failures++
  }

  console.log(`\n${queue.length - failures} of ${queue.length} queued articles pass`)
  if (failures) process.exitCode = 1
}

// ── publish ──────────────────────────────────────────────────────────────────

function release(item, date) {
  const target = path.join(BLOGS, item.slug)
  if (fs.existsSync(target)) throw new Error(`${target} already exists`)
  const stamped = item.src
    .replace(/publishDate:\s*'[^']*'/, `publishDate: '${date}'`)
    .replace(/datePublished="[^"]*"/, `datePublished="${date}"`)
    .replace(/publishedTime:\s*'[^']*'/g, `publishedTime: '${date}'`)
  fs.mkdirSync(target, { recursive: true })
  fs.writeFileSync(path.join(target, 'page.mdx'), stamped)
  fs.rmSync(path.dirname(item.file), { recursive: true })
  const note = date === item.publishDate ? '' : ` (scheduled ${item.publishDate})`
  console.log(`released ${item.slug} as ${date}${note} → src/app/blogs/${item.slug}/page.mdx`)
}

function publish(args) {
  const queue = readQueue()
  const date = today()
  let chosen
  if (args.includes('--due')) chosen = queue.filter((item) => item.publishDate <= date)
  else if (args.includes('--slug')) {
    const slug = args[args.indexOf('--slug') + 1]
    chosen = queue.filter((item) => item.slug === slug)
    if (chosen.length === 0) throw new Error(`no queued article named ${slug}`)
    const earlier = queue.slice(0, queue.indexOf(chosen[0]))
    if (earlier.length)
      console.log(`note: releasing out of order; ${earlier.length} earlier article(s) stay queued`)
  } else chosen = queue.slice(0, 1)

  if (chosen.length === 0) {
    console.log('nothing to release')
    return
  }
  for (const item of chosen) release(item, date)
  console.log('\nnext: npm run build, then commit src/app/blogs and content/scheduled together')
}

// ── preview-build ────────────────────────────────────────────────────────────

function previewBuild() {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-preview-'))
  const skip = new Set(['node_modules', '.next', '.git', '.vercel'])
  for (const entry of fs.readdirSync(ROOT)) {
    if (skip.has(entry)) continue
    fs.cpSync(path.join(ROOT, entry), path.join(scratch, entry), { recursive: true })
  }
  fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(scratch, 'node_modules'))
  const staged = path.join(scratch, 'content/scheduled')
  if (fs.existsSync(staged)) {
    for (const slug of fs.readdirSync(staged)) {
      fs.cpSync(path.join(staged, slug), path.join(scratch, 'src/app/blogs', slug), { recursive: true })
    }
    fs.rmSync(staged, { recursive: true })
  }
  console.log(`preview build in ${scratch}`)
  try {
    execFileSync('npm', ['run', 'build'], { cwd: scratch, stdio: 'inherit' })
    console.log(`\npreview build passed; output kept in ${scratch}/.next`)
  } catch {
    console.log(`\npreview build FAILED; inspect ${scratch}`)
    process.exitCode = 1
  }
}

const [command = 'list', ...args] = process.argv.slice(2)
const commands = { list, check, publish: () => publish(args), 'preview-build': previewBuild }
if (!commands[command]) {
  console.error(`unknown command "${command}"; use list, check, publish or preview-build`)
  process.exit(2)
}
await commands[command]()
