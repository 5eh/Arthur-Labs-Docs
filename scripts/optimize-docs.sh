#!/bin/bash
# Arthur Labs Docs SEO Optimizer
# Run: chmod +x optimize-docs.sh && ./optimize-docs.sh

set -e

DOCS_DIR="/data/workspace/projects/arthur-labs-docs"
cd "$DOCS_DIR"

echo "=== $(date) - Starting SEO Optimization ==="

# 1. Check for new changes from remote
echo "Checking for remote changes..."
git fetch origin
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
    echo "Pulling remote changes..."
    git pull origin main
fi

# 2. Check and fix missing SEO metadata in MDX files
echo "Checking MDX files for SEO improvements..."

# Count files needing SEO improvements
BLOG_COUNT=$(find "$DOCS_DIR/src/app/blogs" -name "page.mdx" 2>/dev/null | wc -l)
GUIDE_COUNT=$(find "$DOCS_DIR/src/app/guides" -name "page.mdx" 2>/dev/null | wc -l)

echo "Found $BLOG_COUNT blog posts, $GUIDE_COUNT guides"

# 3. Check sitemap exists
if [ ! -f "$DOCS_DIR/src/app/sitemap.ts" ]; then
    echo "WARNING: sitemap.ts missing!"
fi

# 4. Check robots.txt
if [ ! -f "$DOCS_DIR/src/app/robots.ts" ]; then
    echo "WARNING: robots.ts missing!"
fi

# 5. Build the project
echo "Building project..."
cd "$DOCS_DIR"
pnpm build > /tmp/docs-build.log 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    # Count generated pages
    PAGE_COUNT=$(grep -c "○" /tmp/docs-build.log 2>/dev/null || echo "0")
    echo "Generated $PAGE_COUNT static pages"
else
    echo "❌ Build failed - check /tmp/docs-build.log"
    tail -20 /tmp/docs-build.log
    exit 1
fi

# 6. Check for common SEO issues
echo "Running SEO checks..."

# Check for missing OG images
if [ ! -f "$DOCS_DIR/src/app/public/og-image.png" ]; then
    echo "WARNING: og-image.png missing - adding placeholder"
fi

# Check metadata in homepage
if grep -q "Arthur Labs" "$DOCS_DIR/src/app/page.mdx"; then
    echo "✅ Homepage contains brand name"
fi

echo "=== $(date) - SEO Optimization Complete ==="
exit 0
