'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

const teachersData = [
  { name: 'Dr. Priya Sharma', subject: 'Computer Science', time: '2 days ago', initials: 'PS' },
  { name: 'Mr. Arjun Patel', subject: 'Physics', time: '3 days ago', initials: 'AP' },
  { name: 'Ms. Kavitha Reddy', subject: 'Mathematics', time: '5 days ago', initials: 'KR' },
  { name: 'Dr. Rahul Verma', subject: 'Chemistry', time: '7 days ago', initials: 'RV' },
  { name: 'Ms. Sneha Gupta', subject: 'English', time: '1 week ago', initials: 'SG' },
  { name: 'Dr. Manoj Kumar', subject: 'Biology', time: '1 week ago', initials: 'MK' }
]

function TeachersSection() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className={`rounded-2xl p-4 border shadow-card  ${
      mounted && isDarkMode 
        ? 'bg-zinc-900/50 border-zinc-800/50' 
        : 'bg-white border-gray-50'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className={`text-base font-medium  ${
            mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
          }`}>Newly Added Teachers</h3>
          <p className={`text-xs mt-1  ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>Recently onboarded faculty members</p>
        </div>
        <button className={`text-xs  ${
          mounted && isDarkMode 
            ? 'text-zinc-400 hover:text-zinc-300' 
            : 'text-gray-500 hover:text-gray-700'
        }`}>View All</button>
      </div>
      
      <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-2">
        {teachersData.map((teacher) => (
          <div 
            key={teacher.name}
            className={`flex items-center gap-3 p-2 rounded  ${
              mounted && isDarkMode 
                ? 'hover:bg-zinc-800/50' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="w-8 h-8 bg-[#F2EDE4] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#8C7B65] font-medium text-xs">{teacher.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-xs font-medium  ${
                mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>{teacher.name}</h4>
              <p className={`text-xs  ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>{teacher.subject} • {teacher.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(TeachersSection)