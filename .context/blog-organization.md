# Blog Organization

> Standards for organizing, naming, and structuring blog content.

---

## Directory Structure

```
src/app/blogs/
├── _category-index/          # Auto-generated index
├── page.mdx                  # Main blogs listing
├── [slug]/
│   └── page.mdx             # Individual posts
```

### Naming Conventions

**URL Slug:**
- lowercase
- hyphens for spaces
- max 75 characters
- include primary keyword

**Examples:**
```
/blogs/crypto-tax-1099-da-guide
/blogs/layer-1-vs-layer-2-blockchain
/blogs/erc20-token-development
```

---

## File Naming

### Blog Directories
- Use descriptive slug, not timestamps
- Match URL slug exactly
- No special characters

### Image Files
- Descriptive names: `example-transaction-flow.png`
- Include dimensions in name: `hero-1200x630.png`
- Use kebab-case

---

## Frontmatter Standards

### Required Fields
```typescript
interface BlogMetadata {
  title: string;           // SEO optimized
  description: string;     // 150-160 chars
  keywords: string[];      // Max 10
  author: string;          // or team name
  publishDate: string;     // YYYY-MM-DD
  category: string;        // Primary category
}
```

### Optional Fields
```typescript
interface BlogMetadataOptional {
  subcategories?: string[];
  tags?: string[];
  lastUpdated?: string;
  featured?: boolean;
  draft?: boolean;
}
```

---

## Content Organization

### By Category

```
blogs/
├── tax/
│   ├── crypto-tax-beginner/
│   ├── form-1099-da-guide/
│   └── ...
├── blockchain/
│   ├── layer-1-explained/
│   ├── evm-deep-dive/
│   └── ...
├── defi/
│   ├── yield-farming-guide/
│   └── ...
└── ecosystem/
    ├── dean-introduction/
    └── susan-tutorial/
```

### By Priority

```
blogs/
├── priority-1/            # High traffic, SEO value
├── priority-2            # Medium priority
└── priority-3            # Supporting content
```

---

## Tagging System

### Standard Tags

| Tag | Use For |
|-----|---------|
| #crypto | Cryptocurrency content |
| #tax | Tax-related posts |
| #blockchain | Technology explanations |
| #defi | Decentralized finance |
| #tutorial | How-to guides |
| #news | Industry updates |
| #guide | Educational content |

### Tag Rules

- Max 10 tags per post
- Include at least 1 category tag
- Use consistent spelling

---

## Content States

### Draft
```yaml
draft: true
```
- Not published
- Not in sitemap
- Internal review

### Published
```yaml
draft: false
publishDate: 2026-01-15
```
- Live on site
- In sitemap
- Indexed by search

### Updated
```yaml
lastUpdated: 2026-02-24
changeNotes: "Updated tax rates"
```
- Original publish date preserved
- Last modified tracked

---

## Index Page Organization

### Blog Listing Page

Display:
- Title
- Excerpt (first 160 chars)
- Publish date
- Category badge
- Reading time

Sort Options:
- Newest first (default)
- Oldest first
- Alphabetical
- By category

Filter:
- By category
- By tag
- By date range

---

## Archive Strategy

### Old Content

- Keep published indefinitely
- Add "lastUpdated" flag if outdated
- Consider redirecting merged content
- Remove duplicates

### Content Retirement

1. Mark as draft
2. Add redirect to related content
3. Update internal links
4. Document retirement reason

---

*Last Updated: 2026-02-24*
