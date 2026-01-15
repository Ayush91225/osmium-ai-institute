'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function SubjectPerformanceSection() {
  const { isDarkMode } = useDarkMode()

  const subjects = [
    { name: 'Mathematics-I', accuracy: 46.5 },
    { name: 'Programming in C', accuracy: 86.8 },
    { name: 'Communication Skills', accuracy: 69.5 },
    { name: 'Git & GitHub', accuracy: 56.2 },
    { name: 'Engineering Graphics', accuracy: 88.5 },
    { name: 'Basic Electrical Engineering', accuracy: 79.3 },
  ]

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Subject Wise Performance
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            See how you're performing in every subject.
          </p>
        </div>
        <select className={`px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-gray-50 border-gray-200'} border`}>
          <option>Sort</option>
        </select>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Topics</span>
          <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Accuracy</span>
        </div>
      </div>

      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {subject.name}
              </span>
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {subject.accuracy}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'}`}>
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ width: `${subject.accuracy}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className={`text-xs mt-4 flex items-center gap-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
        <i className="ph ph-info" />
        This Data based on recent test performance
      </p>
    </div>
  )
}

export default memo(SubjectPerformanceSection)
