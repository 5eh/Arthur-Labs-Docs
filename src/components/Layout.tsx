'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { type Section, SectionProvider } from '@/components/SectionProvider'
import { Unbounded } from 'next/font/google'
import LogoImage from '@/app/public/logo.png'
import Head from 'next/head'

const unboundedFont = Unbounded({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

export function Layout({
  children,
  allSections,
}: {
  children: React.ReactNode
  allSections: Record<string, Array<Section>>
}) {
  let pathname = usePathname()
  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 xl:w-80 lg:dark:border-white/10">
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Logo className="h-6" />
              </Link>
            </div>
            <Header />
            <Navigation className="hidden lg:mt-10 lg:block" />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`${className} flex items-center gap-2`}>
      <div className="overflow-hidden rounded p-1 dark:bg-gray-100">
        <Image
          src={LogoImage}
          alt="Logo"
          className="h-5 w-auto"
          height={24}
          width={24}
          priority
        />
      </div>
      <span
        className={`${unboundedFont.className} text-lg font-bold text-zinc-900 dark:text-white`}
      >
        Arthur Labs
      </span>
    </div>
  )
}
