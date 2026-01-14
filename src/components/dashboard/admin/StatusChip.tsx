'use client'

import { useDarkMode } from '@/contexts/DarkModeContext'

interface StatusChipProps {
  status: string
  variant?: 'default' | 'success' | 'warning' | 'info' | 'danger'
}

export default function StatusChip({ status, variant = 'default' }: StatusChipProps) {
  const { isDarkMode } = useDarkMode()

  const getChipStyles = () => {
    const baseStyles = 'px-2 py-1 rounded-full text-xs font-medium'
    
    switch (variant) {
      case 'success':
        return `${baseStyles} ${
          isDarkMode 
            ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' 
            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`
      case 'warning':
        return `${baseStyles} ${
          isDarkMode 
            ? 'bg-amber-900/30 text-amber-400 border border-amber-800/50' 
            : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`
      case 'info':
        return `${baseStyles} ${
          isDarkMode 
            ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' 
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`
      case 'danger':
        return `${baseStyles} ${
          isDarkMode 
            ? 'bg-red-900/30 text-red-400 border border-red-800/50' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`
      default:
        return `${baseStyles} ${
          isDarkMode 
            ? 'bg-zinc-800/50 text-zinc-300 border border-zinc-700/50' 
            : 'bg-gray-100 text-gray-700 border border-gray-200'
        }`
    }
  }

  return (
    <span className={getChipStyles()}>
      {status}
    </span>
  )
}