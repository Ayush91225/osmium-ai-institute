'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function ResumeCoursesSection() {
  const { isDarkMode } = useDarkMode()

  const courses = [
    { title: 'Artificial Intelligence & Machine Learning Basics', lessons: 12 },
    { title: 'Blockchain & Web3 Development', lessons: 10 },
    { title: 'Operating Systems Fundamentals', lessons: 9 },
  ]

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Resume Courses
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            Continue your ongoing courses
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <div key={index} className={`p-6 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-50'}`}>
            <h4 className={`font-medium mb-4 min-h-[48px] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {course.title}
            </h4>
            <div className="flex items-center justify-between">
              <span className={`text-sm flex items-center gap-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                <i className="ph ph-book-open" />
                {course.lessons} Lesson
              </span>
              <button className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <button className={`p-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`}>
          <i className="ph ph-caret-left" />
        </button>
        <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
          1 of 2
        </span>
        <button className={`p-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`}>
          <i className="ph ph-caret-right" />
        </button>
      </div>
    </div>
  )
}

export default memo(ResumeCoursesSection)
