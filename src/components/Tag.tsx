import clsx from 'clsx'

const variantStyles = {
  small: '',
  medium: 'rounded-lg px-1.5 ring-1 ring-inset',
}

const colorStyles = {
  blue: {
    small: 'text-[#0480AA] dark:text-[#79d2ff]',
    medium:
      'ring-[#0480AA]/30 dark:ring-[#0480AA]/30 bg-[#0480AA]/10 text-[#0480AA] dark:text-[#79d2ff]',
  },
  sky: {
    small: 'text-sky-500',
    medium:
      'ring-sky-300 bg-sky-400/10 text-sky-500 dark:ring-sky-400/30 dark:bg-sky-400/10 dark:text-sky-400',
  },
  amber: {
    small: 'text-amber-500',
    medium:
      'ring-amber-300 bg-amber-400/10 text-amber-500 dark:ring-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400',
  },
  rose: {
    small: 'text-red-500 dark:text-rose-500',
    medium:
      'ring-rose-200 bg-rose-50 text-red-500 dark:ring-rose-500/20 dark:bg-rose-400/10 dark:text-rose-400',
  },
  zinc: {
    small: 'text-zinc-400 dark:text-zinc-500',
    medium:
      'ring-zinc-200 bg-zinc-50 text-zinc-500 dark:ring-zinc-500/20 dark:bg-zinc-400/10 dark:text-zinc-400',
  },
}

const valueColorMap = {
  GET: 'blue',
  POST: 'sky',
  PUT: 'amber',
  DELETE: 'rose',
} as Record<string, keyof typeof colorStyles>

export function Tag({
  children,
  variant = 'medium',
  color = valueColorMap[children] ?? 'blue',
}: {
  children: keyof typeof valueColorMap & (string | {})
  variant?: keyof typeof variantStyles
  color?: keyof typeof colorStyles
}) {
  return (
    <span
      className={clsx(
        'font-mono text-[0.625rem]/6 font-semibold',
        variantStyles[variant],
        colorStyles[color][variant],
      )}
    >
      {children}
    </span>
  )
}