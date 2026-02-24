import { type Metadata } from 'next'
import glob from 'fast-glob'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.arthurlabs.net'),
  title: {
    template: '%s | Arthur Labs',
    default: 'Arthur Labs - Web3 Development, Blockchain Infrastructure & Digital Marketplaces',
  },
  description:
    'Arthur Labs builds world-changing systems that enable entrepreneurship. Explore DEAN (multi-chain marketplace factory), ROSE (centralized commerce), QUINN (social media automation), and SUSAN (app generation).',
  keywords: [
    'Arthur Labs',
    'Web3 development',
    'blockchain infrastructure',
    'smart contracts',
    'EVM',
    'multi-chain marketplace',
    'DeFi',
    'crypto tax',
    'cryptocurrency',
    'Ethereum',
    'Solana',
    'digital marketplace',
    'no-code platform',
    'app generation',
    'MCP',
  ],
  authors: [{ name: 'Arthur Labs', url: 'https://arthurlabs.net' }],
  creator: 'Arthur Labs',
  publisher: 'Arthur Labs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docs.arthurlabs.net',
    siteName: 'Arthur Labs',
    title: 'Arthur Labs - Web3 Development & Digital Marketplace Factory',
    description:
      'Building world-changing systems that enable entrepreneurship. DEAN, ROSE, QUINN, SUSAN - the Arthur Labs ecosystem.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arthur Labs - Web3 Development & Digital Marketplace Factory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arthur Labs - Web3 Development & Digital Marketplace Factory',
    description:
      'Building world-changing systems that enable entrepreneurship. DEAN, ROSE, QUINN, SUSAN.',
    images: ['/og-image.png'],
    creator: '@ArthurLabsDAO',
  },
  alternates: {
    canonical: 'https://docs.arthurlabs.net',
    languages: {
      en: 'https://docs.arthurlabs.net',
    },
  },
  category: 'technology',
  classification: 'Web3, Blockchain Development, Digital Marketplaces',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Analytics />
        <SpeedInsights />

        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
