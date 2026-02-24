# Data Optimization

> Guidelines for optimizing data structure, content organization, and build performance.

---

## Content Data Optimization

### MDX File Structure

**Recommended Frontmatter:**
```yaml
export const metadata = {
  title: 'Descriptive Title | Arthur Labs',
  description: '150-160 character description with keywords',
  keywords: 'primary, secondary, keywords, here',
  author: 'Arthur Labs Team',
  publishDate: 'YYYY-MM-DD',
  category: 'Primary Category',
  subcategories: ['Sub1', 'Sub2'],
  tags: ['tag1', 'tag2'],
}
```

### Content Length Guidelines

| Content Type | Minimum Words | Optimal Words |
|--------------|---------------|---------------|
| Blog Post | 1,500 | 2,000-3,000 |
| Guide | 1,000 | 1,500-2,500 |
| Tutorial | 800 | 1,200-2,000 |
| Reference | 500 | 800-1,500 |

### Internal Linking Structure

**Required Links per Post:**
- At least 2 internal links to related content
- At least 1 link to category index
- At least 1 link to ecosystem product (when relevant)

**Linking Pattern:**
```markdown
- Related: [Related Post Title](/blogs/related-post)
- Category: [More in Category](/blogs/category-index)
- Product: [Try Arthur Labs](/crypto.arthurlabs.net)
```

---

## Build Optimization

### Static Generation

- All pages are statically generated (SSG)
- Use `generateStaticParams` for dynamic routes
- Optimize images before upload

### Image Guidelines

- Max file size: 200KB
- Format: WebP preferred
- Include alt text always
- Use responsive images where possible

### Code Blocks

- Use syntax highlighting
- Include language specification
- Keep code examples under 50 lines
- Add comments to explain complex logic

---

## SEO Data Structure

### URL Conventions

- Lowercase only
- Hyphens for spaces
- No special characters
- Include primary keyword
- Max 75 characters

**Good:** `/blogs/crypto-tax-1099-da-guide`
**Bad:** `/blogs/Complete-Guide-To-Crypto-Taxes-2026!!!`

### Metadata Priority

1. **Title** - Include keyword, brand
2. **Description** - Include keyword, action verb
3. **Keywords** - Comma-separated, relevance order
4. **OG Image** - 1200x630px minimum

---

## Content Freshness

### Update Cadence

| Category | Update Frequency |
|----------|-----------------|
| Tax (Jan-Apr) | Weekly |
| Regulatory | Monthly |
| Technical | Bi-monthly |
| Product Updates | As needed |

### Version Tracking

```yaml
lastUpdated: 2026-02-24
version: 1.0.0
reviewCycle: quarterly
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Build Time | < 2 minutes |
| Page Size | < 200KB |
| First Load JS | < 200KB |
| Static Pages | < 100 |

---

*Last Updated: 2026-02-24*
