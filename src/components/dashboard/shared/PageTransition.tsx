'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const pathname = usePathname()
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    setIsTransitioning(true)
    
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsTransitioning(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isTransitioning && (
        <div className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-150 ${
          isDarkMode ? 'bg-zinc-950/80' : 'bg-white/80'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
              isDarkMode ? 'border-zinc-400' : 'border-gray-400'
            }`} />
          </div>
        </div>
      )}
      
      {/* Page Content */}
      <div className={`transition-all duration-200 ${
        isTransitioning ? 'opacity-30 scale-[0.99]' : 'opacity-100 scale-100'
      }`}>
        {displayChildren}
      </div>
    </div>
  )
}