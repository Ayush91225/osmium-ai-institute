'use client'

import { memo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'

function LearnContent() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Coding')

  const categories = [
    { name: 'Coding', color: 'bg-[#D4E8D4]' },
    { name: 'Arts', color: 'bg-[#F5D4D4]' },
    { name: 'Markets', color: 'bg-[#D4E4F5]' },
    { name: 'Life', color: 'bg-[#E8D4F5]' },
    { name: 'History', color: 'bg-[#D4F5E8]' },
    { name: 'Finances', color: 'bg-[#F5D4E8]' },
    { name: 'Cities', color: 'bg-[#F5E8D4]' },
  ]

  const courses = [
    { id: 'python-programming-from-scratch', name: 'Python Programming from Scratch' },
    { id: 'data-structures-algorithms-cpp', name: 'Data Structures & Algorithms with C++' },
    { id: 'web-development-nextjs-tailwind', name: 'Web Development with Next.js & Tailwind' },
    { id: 'introduction-machine-learning', name: 'Introduction to Machine Learning' },
  ]

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCourseClick = (courseId: string) => {
    router.push(`/dashboard/student/learn/${courseId}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Search Bar */}
      <div className={`relative mb-8 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-white border border-gray-300'} rounded-full shadow-lg`}>
        <input
          type="text"
          placeholder="What's your course about..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full px-8 py-5 pr-20 rounded-full outline-none text-[16px] ${isDarkMode ? 'bg-transparent text-white placeholder-zinc-400' : 'bg-transparent text-gray-600 placeholder-gray-400'}`}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black dark:bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
          <i className="ph ph-arrow-right text-lg text-white dark:text-black" />
        </button>
      </div>

      {/* Category Pills - Two Rows */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-3 justify-center mb-3">
          {categories.slice(0, 4).map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-7 py-3 rounded-xl text-[15px] font-medium transition-all ${category.color} ${
                selectedCategory === category.name
                  ? 'text-gray-900 ring-2 ring-gray-400'
                  : 'text-gray-700 hover:ring-2 hover:ring-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.slice(4).map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-7 py-3 rounded-xl text-[15px] font-medium transition-all ${category.color} ${
                selectedCategory === category.name
                  ? 'text-gray-900 ring-2 ring-gray-400'
                  : 'text-gray-700 hover:ring-2 hover:ring-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-0 max-w-2xl mx-auto">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className={`p-5 border-b cursor-pointer transition-all ${
                isDarkMode 
                  ? 'border-zinc-800/50 hover:bg-zinc-900/30' 
                  : 'border-gray-200 hover:bg-gray-50'
              } ${index === 0 ? 'border-t' : ''}`}
            >
              <h3 className={`text-[15px] font-normal ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {course.name}
              </h3>
            </div>
          ))
        ) : (
          <div className={`text-center py-12 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
            <p className="text-sm">No courses found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(LearnContent)
