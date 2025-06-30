'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'

interface NavGroup {
  title: string
  links: Array<{
    title: string
    href: string
  }>
}

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}: {
  href: string
  children: React.ReactNode
  tag?: string
  active?: boolean
  isAnchorLink?: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'font-semibold text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </Link>
  )
}

function VisibleSectionHighlight({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0],
    ),
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-[#0480AA]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({
  group,
  className,
}: {
  group: NavGroup
  className?: string
}) {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation,
  )

  let isActiveGroup =
    group.links.findIndex((link) => link.href === pathname) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === pathname}>
                {link.title}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {link.href === pathname && sections.length > 0 && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          isAnchorLink
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export const navigation: Array<NavGroup> = [
  {
    title: 'Main',
    links: [{ title: 'Home', href: '/' }],
  },
  {
    title: 'Blogs',
    links: [
      { title: 'All Posts', href: '/blogs' },
      { title: '10 Common Design Errors', href: '/blogs/10-common-errors' },
      { title: 'Accelerating Web3 Marketplace Development with Arthur Labs', href: '/blogs/blog-1748925980994' },
      { title: 'Affordable Marketplace Development: Leveraging Ethereum Laye', href: '/blogs/blog-1748966515127' },
      { title: 'Affordable Marketplace Development: Leveraging Ethereum Laye', href: '/blogs/blog-1749880953828' },
      { title: 'Affordable Web3 Marketplaces: Ethereum Layer 2 Solutions for', href: '/blogs/blog-1749533427107' },
      { title: 'Affordable Web3 Marketplaces: How Ethereum L2s Empower Nebra', href: '/blogs/blog-1749059011548' },
      { title: 'Affordable Web3 Marketplaces: How Layer 2s Empower Nebraska ', href: '/blogs/blog-1749016890791' },
      { title: 'Blockchain', href: '/blogs/blockchain' },
      { title: 'Building Blockchain Marketplaces for Nebraska', href: '/blogs/blog-1749836350670' },
      { title: 'Building EVM-Compatible Smart Contracts for Commerce: A Deve', href: '/blogs/blog-1749535318893' },
      { title: 'Building Trust in Peer-to-Peer Commerce: The Power of Oracle', href: '/blogs/blog-1750399323276' },
      { title: 'Claude Blockchain', href: '/blogs/claude-blockchain' },
      { title: 'Content Strategy', href: '/blogs/content-strategy' },
      { title: 'DeCom', href: '/blogs/decom' },
      { title: 'Ethereum L2s: Affordable Marketplace Development for Nebrask', href: '/blogs/blog-1750226502428' },
      { title: 'Ethereum Layer 2s: Powering Affordable Marketplace Developme', href: '/blogs/blog-1750053718589' },
      { title: 'EVM Chain Deployment', href: '/blogs/evm-chain-deployment' },
      { title: 'Finance', href: '/blogs/finance' },
      { title: 'Full Stack Generation', href: '/blogs/full-stack-generation' },
      { title: 'Gas-less Transactions: Removing Barriers to Web3 Adoption', href: '/blogs/blog-1750572137098' },
      { title: 'Generated Blog Post', href: '/blogs/generated-blog-post' },
      { title: 'How Ethereum Layer 2s Boost Nebraska', href: '/blogs/blog-1749362510463' },
      { title: 'How Ethereum Layer 2s Make Marketplaces Affordable for Nebra', href: '/blogs/blog-1750744932181' },
      { title: 'Industry Leaders', href: '/blogs/leaders' },
      { title: 'L2s for Nebraska: Affordable Marketplaces with Optimism & Ar', href: '/blogs/blog-1748965683508' },
      { title: 'Launch Your Marketplace in Days: A Use Case for Arthur Labs', href: '/blogs/blog-1748962282507' },
      { title: 'Migrating from Shopify to a Decentralized Marketplace: A Pra', href: '/blogs/blog-1751090538978' },
      { title: 'Rapidly Deploy Web3 Marketplaces with the DEAN System', href: '/blogs/blog-1748962041924' },
      { title: 'Remote Work', href: '/blogs/remote' },
      { title: 'ROI Analysis: Web3 Marketplace Development vs. Traditional E', href: '/blogs/blog-1749189706678' },
      { title: 'ROI Analysis: Web3 Marketplaces vs. Traditional E-commerce', href: '/blogs/blog-1749708119774' },
      { title: 'Smart Contract Factories: Automating Commerce Contract Deplo', href: '/blogs/blog-1748965488490' },
      { title: 'Smart Contract Factories: Automating Commerce Contract Deplo', href: '/blogs/blog-1750917728782' },
      { title: 'Smart Contract Factories: Automating Commerce on the Blockch', href: '/blogs/blog-1751263326675' },
      { title: 'Smart Contracts', href: '/blogs/smart-contracts' },
      { title: 'Supabase Web3', href: '/blogs/supabase-web3' },
      { title: 'The DEAN System: Revolutionizing Marketplace Development – F', href: '/blogs/blog-1748964532967' },
      { title: 'The DEAN System: Revolutionizing Marketplace Development fro', href: '/blogs/blog-1748964812939' },
      { title: 'Token Gated Commerce', href: '/blogs/token-gated-commerce' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { title: 'Overview', href: '/guides' },
      { title: 'Internal Systems', href: '/guides/internal-systems' },
      { title: 'Whitepaper Overview', href: '/guides/whitepaper-overview' },
      { title: 'Web3 Startups in Omaha', href: '/guides/local-web3-startups' },
    ],
  },
  {
    title: 'Marketplace',
    links: [
      { title: 'Home', href: '/marketplace' },
      { title: 'Common Questions', href: '/marketplace/common-questions' },
      {
        title: 'Marketplace Questions',
        href: '/marketplace/marketplace-questions',
      },
      { title: 'Smart Contracts', href: '/marketplace/smart-contracts' },
      { title: 'Legal Structure', href: '/marketplace/legal-structure' },
      { title: 'Terms of Service', href: '/marketplace/terms' },
      { title: 'Privacy Policy', href: '/marketplace/privacy' },
      { title: 'Data Compliance', href: '/marketplace/data-compliance' },
      { title: 'Available Services', href: '/marketplace/services' },
    ],
  },
]

export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="/">Home</TopLevelNavItem>
        <TopLevelNavItem href="/docs">Documentation</TopLevelNavItem>
        <TopLevelNavItem href="/blogs">Blog</TopLevelNavItem>
        <TopLevelNavItem href="/guides">Guides</TopLevelNavItem>
        <TopLevelNavItem href="/resources">Resources</TopLevelNavItem>
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
      </ul>
    </nav>
  )
}
