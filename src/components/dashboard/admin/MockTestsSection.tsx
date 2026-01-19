'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

const mockTestsData = [
  { name: 'DSA Mock Test 1', subject: 'Data Structures', class: 'B.Tech CSE Sem 2', avgScore: '72%', students: 58 },
  { name: 'Physics Weekly Quiz', subject: 'Engineering Physics', class: 'B.Tech ECE Sem 2', avgScore: '68%', students: 48 },
  { name: 'Math Assessment', subject: 'Calculus', class: 'BCA Sem 1', avgScore: '81%', students: 42 },
  { name: 'Chemistry Lab Test', subject: 'Organic Chemistry', class: 'B.Tech Chem Sem 4', avgScore: 'Pending', students: '--' },
  { name: 'Database Quiz', subject: 'DBMS', class: 'B.Tech CSE Sem 4', avgScore: '76%', students: 55 }
]

function MockTestsSection() {
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
        }`}>Recent Mock Tests</h3>
        <p className={`text-xs mt-1  ${
          mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>Completed student assessments</p>
      </div>
      
      <div className="max-h-72 overflow-y-auto custom-scrollbar space-y-3">
        {mockTestsData.map((test) => (
          <div 
            key={test.name}
            className={`p-3 rounded  ${
              mounted && isDarkMode 
                ? 'bg-zinc-800/30 hover:bg-zinc-800/50' 
                : 'bg-[#F7F5F3] hover:bg-[#F2EDE4]'
            }`}
          >
            <h4 className={`text-sm font-medium  ${
              mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>{test.name}</h4>
            <p className={`text-xs mt-1  ${
              mounted && isDarkMode ? 'text-zinc-300' : 'text-[#8C7B65]'
            }`}>{test.subject} • {test.class}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs font-medium  ${
                mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                {test.avgScore === 'Pending' ? 'Status: Pending' : `Avg. Score: ${test.avgScore}`}
              </span>
              <span className={`text-xs  ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>{test.students} students</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(MockTestsSection)