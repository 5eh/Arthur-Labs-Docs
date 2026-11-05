// A layered system diagram for case-study and implementation articles.
//
// Rendered as plain HTML lists rather than an SVG or an image, so the labels are
// real text: crawlers and answer engines read the architecture, screen readers
// announce it as an ordered sequence of layers, and it reflows at phone width
// instead of shrinking into an unreadable picture.
//
// Usage in a page.mdx:
//   <ArchitectureDiagram
//     title="Request path for example.org"
//     layers={[
//       { name: 'Visitor', nodes: [{ label: 'Phone browser', note: 'four locales' }] },
//       { name: 'Compute', nodes: [{ label: 'Vercel', note: 'Next.js App Router' }] },
//       { name: 'Data', nodes: [{ label: 'Cloudflare D1', note: 'records' }, { label: 'R2', note: 'media' }] },
//     ]}
//     caption="One sentence saying what the reader should notice."
//   />

type DiagramNode = {
  label: string
  note?: string
  // Marks the component the surrounding article is about. Use on one or two
  // nodes at most, or nothing stands out.
  emphasis?: boolean
}

type DiagramLayer = {
  name: string
  nodes: DiagramNode[]
  // Text on the connector below this layer, such as "HTTPS" or "S3 API".
  via?: string
}

export function ArchitectureDiagram({
  title,
  layers,
  caption,
}: {
  title: string
  layers: DiagramLayer[]
  caption?: string
}) {
  return (
    <figure className="not-prose my-10">
      <p className="mb-4 font-mono text-xs tracking-wide text-zinc-600 dark:text-zinc-400">
        {title}
      </p>
      <ol className="flex flex-col">
        {layers.map((layer, layerIndex) => {
          const isLast = layerIndex === layers.length - 1
          return (
            <li key={layer.name} className="flex flex-col">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <span className="pt-0 font-mono text-xs text-zinc-500 sm:pt-3 dark:text-zinc-400">
                  {layer.name}
                </span>
                <ul className="flex flex-wrap gap-2">
                  {layer.nodes.map((node) => (
                    <li
                      key={node.label}
                      className={
                        node.emphasis
                          ? 'min-w-[9rem] flex-1 border border-[oklch(0.45_0.15_262)] bg-[oklch(0.45_0.15_262)]/5 px-3 py-2 dark:border-[oklch(0.70_0.13_258)] dark:bg-[oklch(0.70_0.13_258)]/10'
                          : 'min-w-[9rem] flex-1 border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900'
                      }
                    >
                      <span className="block text-sm font-semibold text-zinc-900 dark:text-white">
                        {node.label}
                      </span>
                      {node.note ? (
                        <span className="mt-0.5 block text-sm text-zinc-600 dark:text-zinc-400">
                          {node.note}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
              {isLast ? null : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
                  aria-hidden={layer.via ? undefined : true}
                >
                  <span className="hidden sm:block" />
                  <span className="flex items-center gap-2 py-1.5 pl-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="inline-block h-5 w-px bg-zinc-300 dark:bg-zinc-600" />
                    {layer.via ? <span>{layer.via}</span> : null}
                  </span>
                </div>
              )}
            </li>
          )
        })}
      </ol>
      {caption ? (
        <figcaption className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
