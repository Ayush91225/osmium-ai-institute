'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function PerformanceSection() {
  const { isDarkMode } = useDarkMode()

  const subjects = [
    { name: 'Math', grade: 'A', score: 92 },
    { name: 'Physics', grade: 'B+', score: 85 },
    { name: 'Chemistry', grade: 'A', score: 90 },
    { name: 'English', grade: 'A+', score: 95 },
  ]

  return (
    <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Performance Overview
        </h2>
        <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
          This Semester
        </span>
      </div>

      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                  {subject.name}
                </span>
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    {subject.score}%
                  </span>
                  <span className={`text-sm font-semibold px-2 py-1 rounded ${
                    subject.grade.startsWith('A')
                      ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                      : isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {subject.grade}
                  </span>
                </div>
              </div>
              <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'}`}>
                <div
                  className={`h-full rounded-full ${
                    subject.grade.startsWith('A') ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${subject.score}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(PerformanceSection)
