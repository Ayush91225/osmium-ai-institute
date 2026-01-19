'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

const classesData = [
  { name: 'B.Tech CSE – Sem 2', students: 64, subjects: 6, year: '2024-25', coordinator: 'Dr. Priya Sharma' },
  { name: 'B.Tech CSE – Sem 4', students: 58, subjects: 7, year: '2024-25', coordinator: 'Dr. Amit Singh' },
  { name: 'BCA – Sem 1', students: 45, subjects: 5, year: '2024-25', coordinator: 'Ms. Ananya Gupta' },
  { name: 'B.Tech ECE – Sem 2', students: 52, subjects: 6, year: '2024-25', coordinator: 'Mr. Arjun Patel' },
  { name: 'B.Tech Mech – Sem 3', students: 38, subjects: 6, year: '2024-25', coordinator: 'Dr. Rahul Verma' }
]

function ClassesSection() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className={`rounded-2xl p-4 border shadow-card  ${
      mounted && isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-50'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className={`text-base font-medium  ${
            mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
          }`}>Classes Overview</h3>
          <p className={`text-xs mt-1  ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>Institute batches & sections</p>
        </div>
        <span className={`text-xs  ${
          mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>{classesData.length} total</span>
      </div>
      
      <div className="max-h-72 overflow-y-auto custom-scrollbar space-y-3">
        {classesData.map((classItem) => (
          <div 
            key={classItem.name}
            className={`p-3 rounded  ${
              mounted && isDarkMode 
                ? 'bg-zinc-800/30 hover:bg-zinc-800/50' 
                : 'bg-[#F7F5F3] hover:bg-[#F2EDE4]'
            }`}
          >
            <h4 className={`text-sm font-medium  ${
              mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>{classItem.name}</h4>
            <p className={`text-xs mt-1  ${
              mounted && isDarkMode ? 'text-zinc-300' : 'text-[#8C7B65]'
            }`}>
              {classItem.students} students • {classItem.subjects} subjects • {classItem.year}
            </p>
            <p className={`text-xs mt-1  ${
              mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>Class Coordinator: {classItem.coordinator}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(ClassesSection)