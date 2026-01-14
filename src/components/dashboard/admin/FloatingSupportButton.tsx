'use client'

import { useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface FloatingSupportButtonProps {
  onClick: () => void
  hasDraft?: boolean
}

export default function FloatingSupportButton({ onClick, hasDraft = false }: FloatingSupportButtonProps) {
  const { isDarkMode } = useDarkMode()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`flex items-center gap-2 rounded-full border shadow-2xl px-4 py-2.5 transition-all duration-300 hover:shadow-2xl hover:scale-110 ${
            isDarkMode
              ? 'bg-zinc-900/95 border-zinc-800/50 backdrop-blur-xl'
              : 'bg-white/95 border-gray-200/50 backdrop-blur-xl'
          }`}
        >
          <div className={`h-1.5 w-1.5 rounded-full animate-pulse flex-shrink-0 ${
            hasDraft ? 'bg-[#8C7B65]' : 'bg-emerald-500'
          }`} />
          <span className={`text-xs font-medium whitespace-nowrap ${
            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
          }`}>
            {isHovered ? 'Create Support Request' : 'Support Center'}
          </span>
          {hasDraft && (
            <span className={`text-xs whitespace-nowrap ${
              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
            }`}>
              Draft saved
            </span>
          )}
        </button>
      </div>
    </>
  )
}