'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function SubjectPerformanceSection() {
  const { isDarkMode } = useDarkMode()

  const subjects = [
    { name: 'Mathematics-I', accuracy: 46.5 },
    { name: 'Programming in C', accuracy: 86.9 },
    { name: 'Communication Skills', accuracy: 68.5 },
    { name: 'Git & GitHub', accuracy: 56.2 },
    { name: 'Engineering Graphics', accuracy: 88.5 },
    { name: 'Basic Electrical Engineering', accuracy: 78.3 },
  ]

  return (
    <div className={`rounded-xl p-5 border h-full flex flex-col ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-base font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Subject Performance
      </h3>

      <div className="space-y-3 flex-1">
          {subjects.map((subject, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {subject.name}
                </span>
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {subject.accuracy}%
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                <div className={`h-full rounded-full ${isDarkMode ? 'bg-amber-600' : 'bg-[#B8A67E]'}`} style={{ width: `${subject.accuracy}%` }} />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default memo(SubjectPerformanceSection)
