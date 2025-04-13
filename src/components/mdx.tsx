import Link from 'next/link'
import clsx from 'clsx'
import { Unbounded } from 'next/font/google'

import { Feedback } from '@/components/Feedback'
import { Heading } from '@/components/Heading'
import { Prose } from '@/components/Prose'

const unboundedFont = Unbounded({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

// Dark blue color: #0480AA
export const a = Link
export { Button } from '@/components/Button'
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code'

export function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <article className="flex h-full flex-col pt-16 pb-10">
      <Prose className="flex-auto">{children}</Prose>
      <footer className="mx-auto mt-16 w-full max-w-2xl lg:max-w-5xl">
        <Feedback />
      </footer>
    </article>
  )
}

export const h2 = function H2(
  props: Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'level'>,
) {
  return <Heading level={2} {...props} />
}

export const h3 = function H3(
  props: Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'level'>,
) {
  return <Heading level={3} {...props} />
}

function InfoIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-[#0480AA]/20 bg-[#0480AA]/5 p-4 text-sm/6 text-[#0480AA] dark:border-[#0480AA]/30 dark:bg-[#0480AA]/5 dark:text-[#79d2ff] dark:[--tw-prose-links-hover:theme(colors.sky.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-[#0480AA] stroke-white dark:fill-[#0480AA]/20 dark:stroke-[#79d2ff]" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({
  children,
  sticky = false,
}: {
  children: React.ReactNode
  sticky?: boolean
}) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24',
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(var(--container-lg)-(--spacing(8)))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({
  name,
  children,
  type,
}: {
  name: string
  children: React.ReactNode
  type?: string
}) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        {type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {type}
            </dd>
          </>
        )}
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}

// Card component for blog posts, guides, and resources
interface CardProps {
  children: React.ReactNode
  href: string
  className?: string
  target?: string
}

export function Card({ children, href, className, target }: CardProps) {
  return (
    <div
      className={clsx(
        'group relative flex flex-col rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700',
        className,
      )}
    >
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {children}
        </div>
      </div>
      <Link
        href={href}
        target={target}
        className="absolute inset-0 rounded-2xl ring-offset-2 ring-offset-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#0480AA] dark:ring-offset-zinc-900"
        aria-hidden="true"
      />
    </div>
  )
}

Card.Title = function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className={`${unboundedFont.className} text-base font-semibold leading-6 text-zinc-900 dark:text-white`}>
      {children}
    </h3>
  )
}

Card.Description = function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  )
}

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <span className="text-sm font-medium text-[#0480AA] dark:text-[#79d2ff] group-hover:text-[#036990] dark:group-hover:text-[#a7e3ff]">
        {children} <span aria-hidden="true">→</span>
      </span>
    </div>
  )
}

Card.Eyebrow = function CardEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
      {children}
    </p>
  )
}