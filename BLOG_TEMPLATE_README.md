# Blog Creation Guide for Arthur Labs

This guide provides step-by-step instructions for creating new blog posts in the Arthur Labs documentation site. Following these steps will ensure consistent formatting and proper integration with the site structure.

## Blog Directory Structure

The blog directory is organized as follows:

```
src/
  app/
    blogs/
      [category]/
        [blog-post-name].mdx
      page.mdx
```

Where:
- `[category]` is a folder representing a blog category (e.g., `blockchain`, `smart-contracts`, `ecosystem`)
- `[blog-post-name].mdx` is the MDX file containing the blog post content

## Creating a New Blog Post

### Step 1: Choose or Create a Category

1. Determine which category your blog post belongs to
2. If the category doesn't exist, create it:
   ```bash
   mkdir -p src/app/blogs/[new-category-name]
   ```

### Step 2: Create a New Blog Post File

1. Create a new MDX file with a descriptive, kebab-case name:
   ```bash
   touch src/app/blogs/[category]/[blog-post-name].mdx
   ```

### Step 3: Copy the Template Structure

Use this template structure for your new blog post:

```mdx
import { HeroPattern } from '@/components/HeroPattern'

export const metadata = {
  title: 'Your Blog Post Title',
  description: 'A brief description of your blog post (150-160 characters for optimal SEO).',
  date: 'YYYY-MM-DD',
  author: 'Author Name',
  category: 'Category Name',
}

export const sections = [
  { title: 'Section 1 Title', id: 'section1-id' },
  { title: 'Section 2 Title', id: 'section2-id' },
  { title: 'Section 3 Title', id: 'section3-id' },
  // Add more sections as needed
]

<HeroPattern />

# Your Blog Post Title

A brief introduction to your blog post that captures interest and explains what readers will learn. {{ className: 'lead' }}

<Note>
  A highlighted note that provides context or important information about the blog post.
</Note>

## Section 1 Title {{ anchor: 'section1-id' }}

Your section content goes here. Use markdown formatting for:

- Bullet points
- To highlight
- Key information

You can also use **bold** or *italic* text for emphasis.

## Section 2 Title {{ anchor: 'section2-id' }}

More content for your second section. You can include code examples:

```javascript
// Your code example here
function example() {
  return "This is an example";
}
```

## Section 3 Title {{ anchor: 'section3-id' }}

Content for your third section. Consider adding subsections for complex topics.

### A Subsection

Subsection content goes here.

### Another Subsection

More detailed information in this subsection.

<div className="mt-8 border-t border-zinc-900/5 pt-8 dark:border-white/5">
  <p className="text-sm text-zinc-600 dark:text-zinc-400">
    A footer note with a call to action or additional resources.
  </p>
</div>
```

### Step 4: Update the Blog Post Content

1. Replace the placeholder content with your actual blog post content
2. Make sure to:
   - Update the metadata (title, description, date, author, category)
   - Define appropriate sections in the `sections` array
   - Use the same section IDs in your anchor tags (`{{ anchor: 'section-id' }}`)
   - Include relevant content for each section
   - Add a conclusion or call to action at the end

## Best Practices for Blog Writing

1. **SEO Optimization**:
   - Use descriptive, keyword-rich titles
   - Include target keywords naturally throughout the content
   - Keep descriptions between 150-160 characters
   - Use heading tags (h2, h3) properly for content structure

2. **Content Structure**:
   - Start with a compelling introduction
   - Break content into logical sections
   - Use bullet points and numbered lists for scannable content
   - Include relevant code examples when discussing technical topics
   - End with a clear conclusion or call to action

3. **Formatting**:
   - Use proper markdown syntax
   - Break long paragraphs into smaller chunks
   - Include white space for readability
   - Use bold and italic for emphasis (sparingly)

4. **Visual Elements**:
   - Consider adding images where relevant (place them in the `public/images` directory)
   - Use code blocks for code examples
   - Use the `<Note>` component for important callouts

## Adding the Blog to Navigation

After creating your blog post, make sure it's accessible by updating the navigation in the relevant files.

1. If creating a new category, update the categories section in `src/app/blogs/page.mdx`
2. For featured posts, update the featured section in `src/app/blogs/page.mdx`
3. For recent posts, update the recent posts section in `src/app/blogs/page.mdx`

## Example: Adding a New Blog Post

Here's a complete example workflow for adding a new blog post:

1. Create a new category (if needed):
   ```bash
   mkdir -p src/app/blogs/new-category
   ```

2. Create the blog post file:
   ```bash
   touch src/app/blogs/new-category/my-new-blog-post.mdx
   ```

3. Copy the template structure and customize it for your blog post

4. Update the navigation in `src/app/blogs/page.mdx` to include your new blog post

5. Test locally to ensure proper rendering and navigation

## Troubleshooting

If you encounter issues with your blog post:

1. **Blog not showing up**: Check that the file path and name are correct
2. **Formatting issues**: Verify your MDX syntax is correct
3. **Navigation problems**: Ensure you've updated the navigation properly
4. **Build errors**: Check the console for specific error messages
5. **Missing sections**: Confirm that your section IDs match between the `sections` array and anchor tags

For additional help, refer to the MDX documentation or reach out to the development team.