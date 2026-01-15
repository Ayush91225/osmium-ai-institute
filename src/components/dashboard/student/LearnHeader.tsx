'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function LearnHeader() {
  const { isDarkMode } = useDarkMode()

  return (
    <div className="text-center mb-8">
      <h1 className={`text-4xl font-normal mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        What do you want to <span className="italic">Learn</span>, Oracle Khatua?
      </h1>
    </div>
  )
}

export default memo(LearnHeader)
