'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function StudentHeader() {
  const [studentName, setStudentName] = useState('Student')
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          setStudentName(user.name || 'Student')
        } catch {}
      }
    }
  }, [])

  return (
    <div className="mb-8">
      <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Welcome back, {studentName}
      </h1>
    </div>
  )
}

export default memo(StudentHeader)
