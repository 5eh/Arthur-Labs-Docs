# Arthur Labs Content Hub

Arthur Labs Content Hub is a centralized platform for documentation, blogs, guides, and resources related to Arthur Labs systems and technologies.

## Overview

Arthur Labs builds world changing systems that enable entrepreneurship, growing Web2 into Web3. This content hub provides comprehensive information about Arthur Labs' systems, technologies, and vision.

## Main Sections

The content hub is organized into four main sections:

1. **Documentation**: Comprehensive documentation for Arthur Labs systems and technologies
2. **Blogs**: News, insights, and updates from Arthur Labs
3. **Guides**: Step-by-step guides for using Arthur Labs systems and technologies
4. **Resources**: Resources and references for Arthur Labs systems and technologies

## Content Structure

Each main section is further organized into subsections:

### Documentation

- Internal Systems
- Tools
- Ecosystem
- Smart Contracts
- Code Stacks
- Hackathons
- Vision

### Blogs

- Ecosystem
- Tools
- Vision
- Hackathons

### Guides

- Internal Systems
- Smart Contracts
- Code Stacks

### Resources

- Ecosystem
- Tools
- Social Media

## Arthur Labs Systems

The content hub provides information about Arthur Labs' core systems:

- **DEAN**: Digital Bazaar Factory for rapidly building customized marketplaces
- **ROSE**: Web3 integration system for enabling blockchain functionality
- **QUINN**: Marketing acceleration system for entrepreneurs

## Getting Started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Adding Content

Content is managed through MDX files in the appropriate directories:

- Documentation: `src/app/docs/**/*.mdx`
- Blogs: `src/app/blogs/**/*.mdx`
- Guides: `src/app/guides/**/*.mdx`
- Resources: `src/app/resources/**/*.mdx`

Each MDX file should include appropriate metadata and sections:

```mdx
export const metadata = {
  title: 'Title',
  description: 'Description',
}

export const sections = [
  { title: 'Section 1', id: 'section-1' },
  { title: 'Section 2', id: 'section-2' },
]
```

## Global Search

This site includes a global search powered by the [FlexSearch](https://github.com/nextapps-de/flexsearch) library. It automatically scans all content pages to build its search index.

## License

This site template is a commercial product and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).

## Learn More

For more information about Arthur Labs, visit [Arthur Labs website](https://arthurlabs.net) or connect on social media:

- [Twitter](https://twitter.com/WatsonLewRod)
- [LinkedIn](https://LinkedIn.com/company/Arthur-Labs-LLC)
- [Discord](https://discord.gg/FBP9CzkAwZ)
- [Telegram](https://t.me/+JCT_63W4JjBmMWE5)
## Scheduled articles

Articles are written ahead of time into `content/scheduled/<slug>/page.mdx`, a
directory Next.js never builds, and released one at a time into
`src/app/blogs/<slug>/`. Release order is each article's `publishDate`. The date
written into a released file is the day it was released, so a post released late
never claims to be older than it is.

```bash
npm run content:queue            # the queue, in release order, with what is due
npm run content:check            # compile and validate every queued article
npm run content:publish          # release the next article, stamped with today's date
npm run content:publish -- --due # release everything whose date has arrived
npm run content:preview-build    # build a throwaway copy with the whole queue released
```

Releasing only moves a file. The blog index (`src/components/BlogIndex.tsx`), the
navigation's Latest group and post count (`src/generated/latest.json`), the
sitemap, `rss.xml` and `llms.txt` are all generated from `src/app` at build time.
After a release: `npm run build`, then commit `src/app/blogs` and
`content/scheduled` together.

This repository is public, so anything committed under `content/scheduled/` can
be read before its release date. Keep a draft out of git until it is cleared to
publish.

`content:check` fails an article for: MDX that does not compile; metadata,
JSON-LD, Open Graph and H1 that disagree; a missing `shortTitle` or `category`;
title or description lengths; question or container-label headings (Copy 6, 7);
banned words (Design Review 30); more than two em-dashes in a paragraph (Design
Review 31); and internal links to routes that do not exist or to queued articles
released later than it.

Articles can use two figure components, documented at the top of each file:
`ArchitectureDiagram` (layered request paths) and `PageWireframe` (a live page's
section order). Both render as HTML lists, so crawlers and screen readers read
the text.

### Batch of 2026-11-05

Fourteen articles were written for a Tuesday and Thursday calendar running to
2027-01-05. The owner chose to release all of them on 2026-11-05, so each carries
that date. Before release, the time-sensitive claims were re-checked against the
live sites that day.

| Slug | Kind |
|---|---|
| omaha-well-project-website | Case study |
| build-software-in-omaha | Omaha |
| astralis-hackathon-website | Case study |
| website-build-audit-199-rules | Engineering |
| cryptomondays-kansas-city-website | Case study |
| ascii-glyph-field-hero-canvas | Engineering |
| kansas-county-hexagon-map-h3 | Case study |
| vercel-cloudflare-d1-r2-architecture | Engineering |
| rugpull-news-architecture | Case study |
| multilingual-websites-omaha | Omaha |
| vercel-production-launch-checks | Engineering |
| tailwind-v4-invisible-focus-ring | Engineering |
| agent-ready-websites-llms-txt | Engineering |
| omaha-startup-resources | Omaha (program terms change each July; re-verify then) |

Some products were left out of this batch at the owner's discretion. Live client
sites that do not credit Arthur Labs publicly were not written about.

## Handoff record, 2026-11-05 (Launch 11)

This site is a Tailwind Plus Protocol template from April 2025 and predates
`System Prompts/CONFIG_AUDITED.md`. The 2026-11-05 change added the article queue
and 14 articles. A fifteenth, on the QuantumEVM Marketplace, was written and then
removed at the owner's request on 2026-11-05. It did not attempt site-wide compliance.

**Audit, Tier 1:** 5 pass, 20 fail, 22 unchecked, 3 n/a (50 of 199 rules have
an automated check). Two failures were fixed in this change: Frontend 56 now has
a `typecheck` script (exit 0), and Backend 13's loop bindings were renamed. The
remaining failures and unchecked rules come from the template: no locale files
(Localization 1, 2, 3, 7, 8 and the Copy checks that read `content/en.json`), no
`/agents`, `/llms.txt` route module, `/_dev` or `/api/health` (SEO 11, Backend 16,
27), no security headers or preview `X-Robots-Tag` (Backend 19, 20), no
`.env.example` (Backend 12), no startup log line (Backend 15), raster-only public
assets (Assets 1, 3, 8), no `--radius` token (Frontend 2 to 4), and the site
origin still written in `layout.tsx`, `robots.ts` and `EcosystemBar.tsx` (SEO 4,
Backend 18). Tier 2 and Tier 3 were not run against this site. Owner: next
compliance pass.

**Checked in a driven browser instead (production build, all 14 released):**
the 14 articles plus `/`, `/blogs/` and `/blogs/what-is-hiie/` answer 200 with
one H1, parseable JSON-LD, zero console errors, and no horizontal overflow at 320,
375, 768 or 1440px. `content:check` passed 14 of 14 before release, and
`typecheck`, `lint` and `build` (138 pages) exit 0.

**Fixed outside the articles:**
- `EcosystemBar` rendered its CSS as a `<style>` text child. The server escaped
  the quotes in `[data-theme="dark"]`, the client did not, and hydration failed
  for the whole root on every page, live production included (React errors 418,
  423, 425). The CSS is now injected raw.
- The hand-kept blog index listed 79 of 98 posts and claimed 75. It is now
  generated.
- Tables and long inline code pushed pages past the viewport at 320px,
  `what-is-hiie` included. Tables now scroll in their own container.

**Deviations decided in this change.** The owner confirmed Backend 2 on 2026-11-05;
the other two await confirmation:
- **Localization 2.** The new articles are English only, like the rest of the site.
- **Backend 2.** Content stays as static MDX rather than moving to Cloudflare D1. With
  124 pages, a production build takes 22 seconds. The cost of adding posts was
  editing the index and navigation by hand, and those are now generated. Revisit
  D1 if builds pass a few minutes, if non-developers need to publish without git,
  or if the planned research portal starts generating posts.
- **SEO 5.** New articles set per-page Open Graph through `src/lib/seo.ts`. The 98
  older posts still inherit the homepage card. Follow-up: add `pageOg()` to them.

**Fixes that live in someone else's dashboard:**
- **Cloudflare, every proxied host including this one:** Web Analytics injects
  `static.cloudflareinsights.com/beacon.min.js` into HTML responses before
  consent. It appears only when the request sends `Accept: text/html`; plain
  `curl` reports a clean page. Fix: set the records to DNS only, or disable Web
  Analytics for the site. Owner.
