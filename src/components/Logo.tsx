import Image from 'next/image'
import { Unbounded } from 'next/font/google'
import LogoImage from '@/app/public/logo.png'
import { useEffect, useState } from 'react'

const unboundedFont = Unbounded({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

export function Logo({ className }: { className?: string }) {
  const [showText, setShowText] = useState(true)

  useEffect(() => {
    // Function to check container width and hide text if too small
    const checkWidth = () => {
      const container = document.querySelector('.logo-container')
      if (container) {
        setShowText(container.clientWidth >= 120) // Adjust threshold as needed
      }
    }

    // Initial check
    checkWidth()

    // Add resize listener
    window.addEventListener('resize', checkWidth)

    // Cleanup
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  return (
    <div className={`${className} logo-container flex items-center gap-2`}>
      <div className="flex-shrink-0 overflow-hidden rounded p-1 dark:bg-gray-100">
        <Image
          src={LogoImage}
          alt="Logo"
          className="h-5 w-5"
          height={20}
          width={20}
          priority
        />
      </div>
      {showText && (
        <span
          className={`${unboundedFont.className} flex-shrink-0 text-lg font-bold whitespace-nowrap text-zinc-900 dark:text-white`}
        >
          Arthur Labs
        </span>
      )}
    </div>
  )
}
