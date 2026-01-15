'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function CareerPathSection() {
  const { isDarkMode } = useDarkMode()

  const careers = [
    {
      icon: '💻',
      title: 'Software Developer',
      description: 'Frequently engages with topics, tests, or activities linked to this career.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: '📱',
      title: 'Android Developer',
      description: 'Strong performance in React Native indicating natural aptitude.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: '📊',
      title: 'Data Analyst',
      description: 'Strong performance in Aptitude topics indicating natural aptitude.',
      color: 'bg-purple-100 text-purple-600'
    },
  ]

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recommended Career Path
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            AI Career Recommendations Based on Student Strengths
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {careers.map((career, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex items-start gap-3 ${isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-800' : 'bg-gray-50 hover:bg-gray-100'} transition-colors cursor-pointer`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${isDarkMode ? 'bg-zinc-700' : career.color}`}>
              {career.icon}
            </div>
            <div className="flex-1">
              <h4 className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {career.title}
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                {career.description}
              </p>
            </div>
            <i className={`ph ph-caret-right ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`} />
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

export default memo(CareerPathSection)
