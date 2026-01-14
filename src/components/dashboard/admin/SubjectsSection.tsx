'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

const subjectsData = [
  { name: 'Data Structures & Algorithms', department: 'Computer Science', students: 248, classes: 6, teacher: 'Dr. Priya Sharma' },
  { name: 'Engineering Physics', department: 'Physics', students: 320, classes: 8, teacher: 'Mr. Arjun Patel' },
  { name: 'Calculus & Linear Algebra', department: 'Mathematics', students: 486, classes: 12, teacher: 'Ms. Kavitha Reddy' },
  { name: 'Organic Chemistry', department: 'Chemistry', students: 156, classes: 4, teacher: 'Dr. Rahul Verma' },
  { name: 'Communication Skills', department: 'Humanities', students: 412, classes: 10, teacher: 'Ms. Ananya Gupta' },
  { name: 'Database Management', department: 'Computer Science', students: 198, classes: 5, teacher: 'Dr. Amit Singh' }
]

function SubjectsSection() {
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
          }`}>Subjects Listed</h3>
          <p className={`text-xs mt-1  ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>Recently added or updated subjects</p>
        </div>
        <button className={`text-xs  ${
          mounted && isDarkMode ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-500 hover:text-gray-700'
        }`}>View All</button>
      </div>
      
      <div className="max-h-72 overflow-y-auto custom-scrollbar space-y-3">
        {subjectsData.map((subject) => (
          <div 
            key={subject.name}
            className={`p-3 rounded  ${
              mounted && isDarkMode 
                ? 'bg-zinc-800/30 hover:bg-zinc-800/50' 
                : 'bg-[#F7F5F3] hover:bg-[#F2EDE4]'
            }`}
          >
            <h4 className={`text-sm font-medium  ${
              mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>{subject.name}</h4>
            <p className={`text-xs mt-1  ${
              mounted && isDarkMode ? 'text-zinc-300' : 'text-[#8C7B65]'
            }`}>
              {subject.department} • {subject.students} students • {subject.classes} classes
            </p>
            <p className={`text-xs mt-1  ${
              mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>{subject.teacher}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(SubjectsSection)