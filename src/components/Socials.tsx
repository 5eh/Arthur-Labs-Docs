import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const socials = [
  {
    href: 'https://arthurlabs.medium.com/',
    name: 'Medium',
    description: 'Explore our general medium posts.',
  },
  {
    href: 'https://x.com/ArthurLabsDAO',
    name: 'Twitter',
    description:
      'See the more personal work we do, and the cool people we hang out with!',
  },
  {
    href: '/errors',
    name: 'Errors',
    description:
      'Read about the different types of errors returned by the API.',
  },
  {
    href: '/webhooks',
    name: 'Webhooks',
    description:
      'Learn how to programmatically configure webhooks for your app.',
  },
]

export function Socials() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="socials">
        Socials
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {socials.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
