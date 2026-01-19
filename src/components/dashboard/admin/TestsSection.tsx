'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

const testsData = [
  { name: 'Mid-Semester Python Test', class: 'B.Tech CSE Sem 2', subject: 'Programming', daysLeft: 5, students: 64 },
  { name: 'Physics Unit Test', class: 'B.Tech ECE Sem 2', subject: 'Engineering Physics', daysLeft: 8, students: 52 },
  { name: 'Calculus Assessment', class: 'BCA Sem 1', subject: 'Mathematics', daysLeft: 12, students: 45 }
]

function TestsSection() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className={`rounded-2xl p-4 border shadow-card  ${
      mounted && isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-50'
    }`}>
      <div className="mb-3">
        <h3 className={`text-base font-medium  ${
          mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
        }`}>Upcoming Tests</h3>
        <p className={`text-xs mt-1  ${
          mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>Institute-level assessments</p>
      </div>
      
      <div className="space-y-3">
        {testsData.map((test) => (
          <div 
            key={test.name}
            className={`p-3 rounded border-l-2  ${
              mounted && isDarkMode 
                ? 'bg-zinc-800/30 border-zinc-600' 
                : 'bg-[#F7F5F3] border-[#D8D4CD]'
            }`}
          >
            <h4 className={`text-sm font-medium  ${
              mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>{test.name}</h4>
            <p className={`text-xs mt-1  ${
              mounted && isDarkMode ? 'text-zinc-300' : 'text-[#8C7B65]'
            }`}>{test.class} • {test.subject}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs font-medium  ${
                mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>{test.daysLeft} days left</span>
              <span className={`text-xs  ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>{test.students} students</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className={`w-full mt-4 text-xs  ${
        mounted && isDarkMode ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-500 hover:text-gray-700'
      }`}>
        View All Tests
      </button>
    </div>
  )
}

export default memo(TestsSection)