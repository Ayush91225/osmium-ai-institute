'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function UpcomingClassesSection() {
  const { isDarkMode } = useDarkMode()

  const classes = [
    { id: 1, subject: 'Mathematics', time: '09:00 AM', teacher: 'Dr. Sharma', room: 'Room 101' },
    { id: 2, subject: 'Physics Lab', time: '11:00 AM', teacher: 'Prof. Kumar', room: 'Lab 2' },
    { id: 3, subject: 'Chemistry', time: '02:00 PM', teacher: 'Dr. Patel', room: 'Room 205' },
  ]

  return (
    <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Today's Classes
        </h2>
        <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </span>
      </div>

      <div className="space-y-3">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className={`p-4 rounded-xl border-l-4 ${isDarkMode ? 'bg-zinc-800/50 border-l-blue-500' : 'bg-gray-50 border-l-blue-600'}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {cls.subject}
                </h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {cls.teacher} • {cls.room}
                </p>
              </div>
              <span className={`text-sm font-medium px-3 py-1 rounded-lg ${isDarkMode ? 'bg-zinc-700 text-zinc-200' : 'bg-blue-100 text-blue-700'}`}>
                {cls.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(UpcomingClassesSection)
