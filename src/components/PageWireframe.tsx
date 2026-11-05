// A top-to-bottom wireframe of a live page, for case-study articles.
//
// Each section draws a small schematic of its layout pattern (a ruled list, a
// scroll rail, a contained form) beside its real name and a note. The schematic
// is decorative and hidden from assistive technology. The names and notes form
// an ordered list, so the page structure is readable as text by people and
// crawlers alike.
//
// Draw what the live page actually renders, in the order it renders it. A
// wireframe that disagrees with the site it describes is worse than none.
//
// Usage in a page.mdx:
//   <PageWireframe
//     title="example.org at 375px, top to bottom"
//     sections={[
//       { kind: 'nav', name: 'Navigation', note: 'pill bar, Donate outside it' },
//       { kind: 'hero', name: 'Hero', note: 'full-viewport live canvas' },
//       { kind: 'panel', name: 'Contact', note: 'form over a wave canvas' },
//       { kind: 'footer', name: 'Footer' },
//     ]}
//   />

type SectionKind =
  | 'nav'
  | 'hero'
  | 'text'
  | 'stats'
  | 'list'
  | 'rail'
  | 'table'
  | 'accordion'
  | 'panel'
  | 'form'
  | 'map'
  | 'footer'

type WireframeSection = {
  kind: SectionKind
  name: string
  note?: string
  // For a 'stats' row that carries a real progress meter on the live page, the
  // percentage it shows. Omit it when the page has no meter.
  progress?: number
}

const bar = 'block h-1.5 bg-zinc-300 dark:bg-zinc-600'
const box = 'border border-zinc-300 dark:border-zinc-600'

function Bars({ widths }: { widths: string[] }) {
  return (
    <span className="flex flex-col gap-1.5">
      {widths.map((width, index) => (
        <span key={index} className={bar} style={{ width }} />
      ))}
    </span>
  )
}

function Schematic({ kind, progress }: { kind: SectionKind; progress?: number }) {
  switch (kind) {
    case 'nav':
      return (
        <span className="flex items-center justify-between gap-2 px-3 py-2">
          <span className={`${box} h-3 w-3`} />
          <span className={`${box} flex h-4 flex-1 items-center justify-center gap-1.5 px-2`}>
            <span className={`${bar} w-5`} />
            <span className={`${bar} w-5`} />
            <span className={`${bar} w-5`} />
          </span>
          <span className="h-4 w-8 bg-[oklch(0.45_0.15_262)] dark:bg-[oklch(0.70_0.13_258)]" />
        </span>
      )
    case 'hero':
      return (
        <span className="relative flex h-32 flex-col items-center justify-center gap-2 overflow-hidden bg-zinc-100 px-3 dark:bg-zinc-800">
          <span className="absolute inset-0 overflow-hidden font-mono text-[11px] leading-[11px] break-all text-zinc-300 select-none dark:text-zinc-600">
            {' ··:;+×*≡#%@ ··:;+×*≡#%@ ··:;+×* ··:;+×*≡#%@'.repeat(6)}
          </span>
          <span className="relative block h-2.5 w-3/5 bg-zinc-500 dark:bg-zinc-300" />
          <span className="relative block h-1.5 w-2/5 bg-zinc-400 dark:bg-zinc-500" />
          <span className="relative mt-1 h-3.5 w-12 bg-[oklch(0.45_0.15_262)] dark:bg-[oklch(0.70_0.13_258)]" />
        </span>
      )
    case 'text':
      return (
        <span className="block px-3 py-3">
          <Bars widths={['55%', '90%', '85%', '70%']} />
        </span>
      )
    case 'stats':
      return (
        <span className="flex flex-col gap-2 py-3">
          <span className="grid grid-cols-4 divide-x divide-zinc-300 dark:divide-zinc-600">
            {[0, 1, 2, 3].map((figure) => (
              <span key={figure} className="flex flex-col items-center gap-1 px-1">
                <span className="block h-2.5 w-3/4 bg-zinc-500 dark:bg-zinc-300" />
                <span className={`${bar} w-1/2 opacity-60`} />
              </span>
            ))}
          </span>
          {progress === undefined ? null : (
            <span className="mx-3 block h-1.5 bg-zinc-200 dark:bg-zinc-700">
              <span
                className="block h-full bg-[oklch(0.45_0.15_262)] dark:bg-[oklch(0.70_0.13_258)]"
                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
              />
            </span>
          )}
        </span>
      )
    case 'list':
      return (
        <span className="flex flex-col px-3 py-1">
          {[0, 1, 2].map((row) => (
            <span
              key={row}
              className="flex items-center gap-2 border-b border-zinc-300 py-2 last:border-b-0 dark:border-zinc-600"
            >
              <span className={`${bar} w-1/4`} />
              <span className={`${bar} w-1/2 opacity-60`} />
            </span>
          ))}
        </span>
      )
    case 'rail':
      return (
        <span className="flex gap-2 overflow-hidden py-3 pl-3">
          {[0, 1, 2, 3].map((card) => (
            <span key={card} className={`${box} flex h-12 w-16 flex-none flex-col justify-end gap-1 p-1.5`}>
              <span className={`${bar} w-3/4`} />
              <span className={`${bar} w-1/2 opacity-60`} />
            </span>
          ))}
        </span>
      )
    case 'table':
      return (
        <span className="grid grid-cols-3 gap-px bg-zinc-300 p-px mx-3 my-3 dark:bg-zinc-600">
          {Array.from({ length: 9 }, (_, cell) => (
            <span key={cell} className="flex h-4 items-center bg-white px-1 dark:bg-zinc-900">
              <span className={`${bar} w-2/3 ${cell < 3 ? '' : 'opacity-60'}`} />
            </span>
          ))}
        </span>
      )
    case 'accordion':
      return (
        <span className="flex flex-col px-3 py-1">
          {[0, 1, 2].map((row) => (
            <span
              key={row}
              className="flex items-center justify-between border-b border-zinc-300 py-2 last:border-b-0 dark:border-zinc-600"
            >
              <span className={`${bar} w-1/2`} />
              <span className="font-mono text-[11px] leading-none text-zinc-400">+</span>
            </span>
          ))}
        </span>
      )
    case 'panel':
      return (
        <span className="block px-3 py-3">
          <span className={`${box} block bg-zinc-50 p-3 dark:bg-zinc-800`}>
            <Bars widths={['45%', '80%', '65%']} />
          </span>
        </span>
      )
    case 'form':
      return (
        <span className="grid grid-cols-[1fr_2fr] gap-3 px-3 py-3">
          <Bars widths={['80%', '60%']} />
          <span className="flex flex-col gap-1.5">
            <span className={`${box} block h-3`} />
            <span className={`${box} block h-3`} />
            <span className={`${box} block h-6`} />
            <span className="block h-3 w-1/3 bg-[oklch(0.45_0.15_262)] dark:bg-[oklch(0.70_0.13_258)]" />
          </span>
        </span>
      )
    case 'map':
      return (
        <span className="block overflow-hidden bg-zinc-100 px-3 py-2 font-mono text-[11px] leading-[13px] tracking-[0.2em] break-all text-zinc-400 select-none dark:bg-zinc-800 dark:text-zinc-500">
          {'⬡⬢⬡⬡⬢⬡⬡⬡⬢⬡⬡⬢⬡⬢⬡⬡⬡⬢⬡⬡⬢⬡⬡⬡⬢⬡⬢⬡⬡⬢⬡⬡⬡⬢⬡⬡⬢⬡'.repeat(2)}
        </span>
      )
    case 'footer':
      return (
        <span className="flex flex-col items-center gap-2 px-3 py-3">
          <span className={`${box} h-5 w-5 rounded-full`} />
          <span className="flex gap-1.5">
            {[0, 1, 2, 3].map((icon) => (
              <span key={icon} className={`${box} h-3 w-3`} />
            ))}
          </span>
          <span className="flex w-full justify-between border-t border-zinc-300 pt-2 dark:border-zinc-600">
            <span className={`${bar} w-1/3`} />
            <span className={`${bar} w-1/5`} />
          </span>
        </span>
      )
  }
}

export function PageWireframe({
  title,
  sections,
  caption,
}: {
  title: string
  sections: WireframeSection[]
  caption?: string
}) {
  return (
    <figure className="not-prose my-10">
      <p className="mb-4 font-mono text-xs tracking-wide text-zinc-600 dark:text-zinc-400">
        {title}
      </p>
      <ol className="border border-zinc-300 dark:border-zinc-700">
        {sections.map((section, index) => (
          <li
            key={`${section.name}-${index}`}
            className="grid grid-cols-1 border-b border-zinc-200 last:border-b-0 sm:grid-cols-[minmax(0,15rem)_1fr] dark:border-zinc-800"
          >
            <span
              aria-hidden="true"
              className="block border-b border-zinc-200 bg-white sm:border-r sm:border-b-0 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Schematic kind={section.kind} progress={section.progress} />
            </span>
            <span className="flex flex-col justify-center px-4 py-3">
              <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                {section.name}
              </span>
              {section.note ? (
                <span className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                  {section.note}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
      {caption ? (
        <figcaption className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
