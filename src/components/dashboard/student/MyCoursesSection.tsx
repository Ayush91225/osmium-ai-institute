'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function MyCoursesSection() {
  const { isDarkMode } = useDarkMode()

  const courses = [
    { id: 1, name: 'Mathematics', teacher: 'Dr. Sharma', progress: 75, color: '#4CAF50' },
    { id: 2, name: 'Physics', teacher: 'Prof. Kumar', progress: 60, color: '#2196F3' },
    { id: 3, name: 'Chemistry', teacher: 'Dr. Patel', progress: 85, color: '#FF9800' },
    { id: 4, name: 'English', teacher: 'Ms. Singh', progress: 90, color: '#9C27B0' },
  ]

  return (
    <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          My Courses
        </h2>
        <button className={`text-sm ${isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-900'}`}>
          View All
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`p-4 rounded-xl ${isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-800' : 'bg-gray-50 hover:bg-gray-100'} transition-colors cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {course.name}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {course.teacher}
                </p>
              </div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                {course.progress}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'}`}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${course.progress}%`, backgroundColor: course.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(MyCoursesSection)
