'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function PreviousExamSection() {
  const { isDarkMode } = useDarkMode()

  const exams = [
    { name: 'JEE Mains', date: '2 Sep 2025', score: '120/300', color: '#10b981' },
    { name: 'JEE Mains', date: '28 Aug 2025', score: '102/300', color: '#10b981' },
    { name: 'JEE Mains', date: '18 Aug 2025', score: '85/300', color: '#f59e0b' },
    { name: 'JEE Mains', date: '15 Aug 2025', score: '59/300', color: '#eab308' },
  ]

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Previous Exam Test Performances
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            See previous done exam tests
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mb-6">
        <div className="flex-1 h-2 rounded-full bg-green-500"></div>
        <div className="flex-1 h-2 rounded-full bg-green-400"></div>
        <div className="flex-1 h-2 rounded-full bg-yellow-500"></div>
        <div className="flex-1 h-2 rounded-full bg-yellow-400"></div>
      </div>

      <div className="space-y-3">
        {exams.map((exam, index) => (
          <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: exam.color }}></div>
              <div>
                <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {exam.name}
                </h4>
                <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {exam.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className={`text-sm ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                View Result
              </button>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {exam.score}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className={`w-full mt-4 py-2 text-sm ${isDarkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'}`}>
        View All Results
      </button>

      <p className={`text-xs text-center mt-2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
        4 out 15 Tests
      </p>
    </div>
  )
}

export default memo(PreviousExamSection)
