'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function UpcomingTestsSection() {
  const { isDarkMode } = useDarkMode()

  const tests = [
    { date: 'Tue, 12 June', title: 'Python Advanced', time: '10:30 AM', questions: 25, daysLeft: 3 },
    { date: 'Wed, 18 June', title: 'JAVA Core', time: '10:30 AM', questions: 25, daysLeft: 6 },
  ]

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Upcoming Tests
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            All Schedules upcoming test
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {tests.map((test, index) => (
          <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-50'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className={`text-xs mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {test.date}
                </p>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {test.title}
                </h4>
              </div>
              <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                {test.daysLeft} days {test.daysLeft * 22} hours left
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className={`flex items-center gap-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                <i className="ph ph-clock" />
                {test.time}
              </span>
              <span className={`flex items-center gap-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                <i className="ph ph-file-text" />
                {test.questions} Questions
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <button className={`p-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`}>
          <i className="ph ph-caret-left" />
        </button>
        <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
          1 of 3
        </span>
        <button className={`p-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`}>
          <i className="ph ph-caret-right" />
        </button>
      </div>
    </div>
  )
}

export default memo(UpcomingTestsSection)
