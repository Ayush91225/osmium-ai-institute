'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function StudentHeader() {
  const { isDarkMode } = useDarkMode()

  return (
    <div className={`rounded-2xl p-8 mb-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-normal ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            What do you want to <span className="italic">Learn</span>, Suman?
          </h1>
        </div>
        <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white text-gray-900 shadow-sm'}`}>
          <i className="ph ph-play-circle" />
          Start to learn
        </button>
      </div>
    </div>
  )
}

export default memo(StudentHeader)
