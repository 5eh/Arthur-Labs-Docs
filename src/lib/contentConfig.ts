interface ContentSection {
  id: string;
  title: string;
  description: string;
  path: string;
}

interface ContentType {
  title: string;
  description: string;
  sections: ContentSection[];
}

export const contentConfig: Record<string, ContentType> = {
  docs: {
    title: 'Documentation',
    description: 'Comprehensive documentation for Arthur Labs systems and technologies',
    sections: [
      {
        id: 'internal-systems',
        title: 'Internal Systems',
        description: 'Documentation for Arthur Labs core systems: DEAN, ROSE, and QUINN',
        path: '/docs/internal-systems',
      },
      {
        id: 'tools',
        title: 'Tools',
        description: 'Documentation for tools and utilities developed by Arthur Labs',
        path: '/docs/tools',
      },
      {
        id: 'ecosystem',
        title: 'Ecosystem',
        description: 'Information about the Arthur Labs ecosystem and partners',
        path: '/docs/ecosystem',
      },
      {
        id: 'smart-contracts',
        title: 'Smart Contracts',
        description: 'Documentation for Arthur Labs smart contract implementations',
        path: '/docs/smart-contracts',
      },
      {
        id: 'code-stacks',
        title: 'Code Stacks',
        description: 'Information about the technology stacks used in Arthur Labs systems',
        path: '/docs/code-stacks',
      },
      {
        id: 'hackathons',
        title: 'Hackathons',
        description: 'Documentation related to hackathons Arthur Labs has participated in',
        path: '/docs/hackathons',
      },
      {
        id: 'vision',
        title: 'Vision',
        description: 'Arthur Labs vision for the future of entrepreneurship and Web3',
        path: '/docs/vision',
      },
    ],
  },
  blogs: {
    title: 'Blog',
    description: 'News, insights, and updates from Arthur Labs',
    sections: [
      {
        id: 'ecosystem',
        title: 'Ecosystem',
        description: 'Blog posts about the Arthur Labs ecosystem and Web3 integration',
        path: '/blogs/ecosystem',
      },
      {
        id: 'tools',
        title: 'Tools',
        description: 'Blog posts about Arthur Labs tools and technologies',
        path: '/blogs/tools',
      },
      {
        id: 'blockchain',
        title: 'Blockchain',
        description: 'Understanding blockchain technology and its implications for entrepreneurs',
        path: '/blogs/blockchain',
      },
      {
        id: 'smart-contracts',
        title: 'Smart Contracts',
        description: 'Exploring the potential and applications of self-executing digital agreements',
        path: '/blogs/smart-contracts',
      },
      {
        id: 'vision',
        title: 'Vision',
        description: 'Blog posts about Arthur Labs vision and future plans',
        path: '/blogs/vision',
      },
      {
        id: 'hackathons',
        title: 'Hackathons',
        description: 'Blog posts about hackathons and competitions',
        path: '/blogs/hackathons',
      },
    ],
  },
  guides: {
    title: 'Guides',
    description: 'Step-by-step guides for using Arthur Labs systems and technologies',
    sections: [
      {
        id: 'internal-systems',
        title: 'Internal Systems',
        description: 'Guides for working with Arthur Labs core systems',
        path: '/guides/internal-systems',
      },
      {
        id: 'smart-contracts',
        title: 'Smart Contracts',
        description: 'Guides for implementing and using smart contracts',
        path: '/guides/smart-contracts',
      },
      {
        id: 'code-stacks',
        title: 'Code Stacks',
        description: 'Guides for working with Arthur Labs technology stacks',
        path: '/guides/code-stacks',
      },
    ],
  },
  resources: {
    title: 'Resources',
    description: 'Resources and references for Arthur Labs systems and technologies',
    sections: [
      {
        id: 'ecosystem',
        title: 'Ecosystem Resources',
        description: 'Resources related to the Arthur Labs ecosystem',
        path: '/resources/ecosystem',
      },
      {
        id: 'tools',
        title: 'Tools Resources',
        description: 'Resources for Arthur Labs tools and utilities',
        path: '/resources/tools',
      },
      {
        id: 'social-media',
        title: 'Social Media',
        description: 'Arthur Labs social media resources and links',
        path: '/resources/social-media',
      },
    ],
  },
};