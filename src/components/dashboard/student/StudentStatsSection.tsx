'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function StudentStatsSection() {
  const { isDarkMode } = useDarkMode()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Today Session */}
      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <i className="ph ph-lightning text-orange-600 text-xl" />
          </div>
          <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Today Session</span>
        </div>
        <div className={`text-3xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          1hr 10min
        </div>
        <div className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
          +32 min than average
        </div>
      </div>

      {/* Pending Submissions */}
      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <i className="ph ph-clock text-amber-600 text-xl" />
          </div>
          <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Pending Submissions</span>
        </div>
        <div className={`text-3xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          5
        </div>
        <div className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
          +2 this week
        </div>
      </div>

      {/* Ongoing Courses */}
      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
            <i className="ph ph-book-open text-teal-600 text-xl" />
          </div>
          <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Ongoing Courses</span>
        </div>
        <div className={`text-3xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          3
        </div>
        <div className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
          +2 this month
        </div>
      </div>
    </div>
  )
}

export default memo(StudentStatsSection)
