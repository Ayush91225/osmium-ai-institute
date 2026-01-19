'use client'

import { memo, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function ResumeCoursesSection() {
  const { isDarkMode } = useDarkMode()
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 2

  const courses = [
    { title: 'Artificial Intelligence & Machine Learning Basics', lessons: 12, bgColor: isDarkMode ? 'bg-zinc-800/30' : 'bg-[#F5F3EF]' },
    { title: 'Blockchain & Web3 Development', lessons: 10, bgColor: isDarkMode ? 'bg-zinc-800/30' : 'bg-[#EEF4F0]' },
    { title: 'Operating Systems Fundamentals', lessons: 9, bgColor: isDarkMode ? 'bg-zinc-800/30' : 'bg-[#F0F2F5]' },
  ]

  return (
    <div className={`rounded-xl p-5 border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-base font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Resume Courses
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <div key={index} className={`p-4 rounded-lg border ${course.bgColor} ${isDarkMode ? 'border-zinc-700/50' : 'border-gray-200'}`}>
            <h4 className={`text-sm font-semibold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {course.title}
            </h4>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                {course.lessons} Lessons
              </span>
              <button className={`px-3 py-1.5 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <button 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`p-1 ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : ''} ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
            <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/>
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium ${isDarkMode ? 'bg-zinc-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
            {currentPage}
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>of</span>
          <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{totalPages}</span>
        </div>
        <button 
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className={`p-1 ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : ''} ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default memo(ResumeCoursesSection)
