# Name Conventions

> Naming standards for files, URLs, components, and content across Arthur Labs Docs.

---

## URL Conventions

### Structure
```
domain.com/section/subsection/page-title
```

### Rules
- Lowercase letters only
- Hyphens (-) for spaces
- Numbers allowed (not at start)
- No special characters
- No consecutive hyphens
- Max 75 characters

### Examples
```
/blogs/crypto-tax-1099-da-guide
/blogs/layer-2-arbitrum-explained
/blogs/erc20-token-standards
/guides/getting-started
/marketplace/smart-contracts
```

---

## File Naming

### MDX Files

| Content Type | Pattern | Example |
|--------------|---------|---------|
| Blog Post | `[descriptive-slug]/page.mdx` | `layer-2-explained/page.mdx` |
| Guide | `[topic]/page.mdx` | `getting-started/page.mdx` |
| Component | `PascalCase.tsx` | `Header.tsx` |
| Utility | `kebab-case.ts` | `date-utils.ts` |

### Images

| Type | Pattern | Example |
|------|---------|---------|
| OG Image | `og-image.png` | - |
| Blog Hero | `[slug]-hero.png` | `tax-guide-hero.png` |
| Screenshot | `[slug]-[number].png` | `step-1-deploy.png` |

---

## Frontmatter Conventions

### Blog Posts

```yaml
export const metadata = {
  title: 'Descriptive Title | Arthur Labs',
  description: 'Compelling description with keywords (150-160 chars)',
  keywords: 'keyword1, keyword2, keyword3',
  author: 'Arthur Labs Team',
  publishDate: '2026-01-15',
  category: 'Category Name',
  tags: ['tag1', 'tag2'],
}
```

### Guides

```yaml
export const metadata = {
  title: 'Guide: How To... | Arthur Labs',
  description: 'What reader will learn',
  difficulty: 'beginner | intermediate | advanced',
  prerequisites: ['Prereq 1', 'Prereq 2'],
}
```

---

## Component Naming

### React Components

| Type | Convention | Example |
|------|------------|---------|
| Page | PascalCase | `BlogPage.tsx` |
| Layout | PascalCase | `BlogLayout.tsx` |
| UI | PascalCase | `Button.tsx` |
| Icon | PascalCase + Icon | `ArrowIcon.tsx` |
| Hook | camelCase + Use | `useAuth.ts` |

### CSS/Tailwind Classes

| Type | Convention | Example |
|------|------------|---------|
| Component | BEM-ish | `.blog-card` |
| Utility | Tailwind classes | `className="p-4"` |
| Custom | kebab-case | `.custom-shadow` |

---

## Git Conventions

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/description` | `feature/add-tax-guide` |
| Bugfix | `fix/description` | `fix/metadata-error` |
| Docs | `docs/description` | `docs/update-seo` |
| Chore | `chore/description` | `chore/update-deps` |

### Commit Messages

```
type: short description

- Detailed bullet 1
- Detailed bullet 2

Closes #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`

---

## Variable Naming

### JavaScript/TypeScript

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `const userName` |
| Constants | UPPER_SNAKE | `const MAX_RETRY = 3` |
| Functions | camelCase | `function getUserData()` |
| Classes | PascalCase | `class UserService` |
| Booleans | is/has/can + noun | `const isActive = true` |

---

## API Conventions

### Endpoints

```
GET    /api/blogs          # List
GET    /api/blogs/:slug    # Single
POST   /api/blogs          # Create
PUT    /api/blogs/:slug    # Update
DELETE /api/blogs/:slug    # Delete
```

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 100
  }
}
```

---

## SEO Conventions

### Title Tags
- Format: `Primary Keyword | Arthur Labs`
- Max: 60 characters
- Include brand at end

### Meta Descriptions
- Max: 160 characters
- Include call-to-action
- Primary keyword near start

### Heading Structure
- H1: Page title (one per page)
- H2: Major sections
- H3: Subsection details
- Never skip heading levels

---

*Last Updated: 2026-02-24*
