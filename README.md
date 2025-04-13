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