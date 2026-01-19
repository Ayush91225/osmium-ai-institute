'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import Link from 'next/link'

interface CourseDetailProps {
  courseId: string
}

function CourseDetail({ courseId }: CourseDetailProps) {
  const { isDarkMode } = useDarkMode()

  const courseData: Record<string, any> = {
    'python-programming-from-scratch': {
      title: 'Python Programming from Scratch',
      lessons: 12,
      description: 'Learn Python programming from basics to advanced concepts. Perfect for beginners who want to start their coding journey with hands-on projects and real-world applications.',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=400&auto=format&fit=crop',
      topics: [
        { id: 1, name: 'Introduction to Python', icon: 'monitor', locked: false },
        { id: 2, name: 'Variables & Data Types', icon: 'git-branch', locked: true },
        { id: 3, name: 'Control Flow & Loops', icon: 'clipboard', locked: true },
        { id: 4, name: 'Functions & Modules', icon: 'database', locked: true },
        { id: 5, name: 'Object-Oriented Programming', icon: 'monitor', locked: true },
      ]
    },
    'data-structures-algorithms-cpp': {
      title: 'Data Structures & Algorithms with C++',
      lessons: 16,
      description: 'Master data structures and algorithms using C++. Learn to write efficient code and solve complex problems with optimized solutions for technical interviews.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee481c?q=80&w=400&auto=format&fit=crop',
      topics: [
        { id: 1, name: 'Introduction to DSA', icon: 'monitor', locked: false },
        { id: 2, name: 'Arrays & Strings', icon: 'git-branch', locked: true },
        { id: 3, name: 'Linked Lists', icon: 'clipboard', locked: true },
        { id: 4, name: 'Stacks & Queues', icon: 'database', locked: true },
        { id: 5, name: 'Trees & Graphs', icon: 'monitor', locked: true },
      ]
    },
    'web-development-nextjs-tailwind': {
      title: 'Web Development with Next.js & Tailwind',
      lessons: 18,
      description: 'Build modern, fast, and responsive web applications using Next.js and Tailwind CSS. Learn server-side rendering, API routes, and deployment strategies.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop',
      topics: [
        { id: 1, name: 'Next.js Fundamentals', icon: 'monitor', locked: false },
        { id: 2, name: 'React Components', icon: 'git-branch', locked: true },
        { id: 3, name: 'Tailwind CSS Styling', icon: 'clipboard', locked: true },
        { id: 4, name: 'API Routes & Data Fetching', icon: 'database', locked: true },
        { id: 5, name: 'Deployment & Optimization', icon: 'monitor', locked: true },
      ]
    },
    'introduction-machine-learning': {
      title: 'Introduction to Machine Learning',
      lessons: 20,
      description: 'Dive into the world of machine learning and artificial intelligence. Learn algorithms, build models, and understand practical applications of ML in real-world scenarios.',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=400&auto=format&fit=crop',
      topics: [
        { id: 1, name: 'ML Fundamentals', icon: 'monitor', locked: false },
        { id: 2, name: 'Supervised Learning', icon: 'git-branch', locked: true },
        { id: 3, name: 'Unsupervised Learning', icon: 'clipboard', locked: true },
        { id: 4, name: 'Neural Networks', icon: 'database', locked: true },
        { id: 5, name: 'Deep Learning Basics', icon: 'monitor', locked: true },
      ]
    }
  }

  const course = courseData[courseId] || courseData['data-structures-algorithms-cpp']

  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      'monitor': (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      'git-branch': (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2v7.31"></path>
          <path d="M14 2v7.31"></path>
          <path d="M12 2v20"></path>
          <path d="M8 22h8"></path>
          <path d="M8 2h8"></path>
        </svg>
      ),
      'clipboard': (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
      ),
      'database': (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      )
    }
    return icons[iconName] || icons['monitor']
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
      {/* Course Header */}
      <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-center sm:items-start ${
        isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-[#F0EFE7]'
      }`}>
        <div className="w-16 sm:w-20 md:w-24 lg:w-[130px] h-16 sm:h-20 md:h-24 lg:h-[130px] flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
          <img 
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 pt-1 text-center sm:text-left min-w-0">
          <h1 className={`font-serif text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px] leading-tight mb-2 sm:mb-3 md:mb-4 break-words ${
            isDarkMode ? 'text-white' : 'text-[#1c1c1c]'
          }`}>
            {course.title}
          </h1>
          <div className={`flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-[13px] font-medium ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            <svg width="12" height="12" className="sm:w-[14px] sm:h-[14px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span className="whitespace-nowrap">{course.lessons} Lession</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <p className={`text-sm sm:text-[15px] leading-relaxed max-w-2xl text-center sm:text-left ${
          isDarkMode ? 'text-zinc-300' : 'text-gray-700'
        }`}>
          {course.description}
        </p>
      </div>

      {/* What You'll Learn */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h2 className={`text-sm sm:text-[16px] font-medium mb-3 sm:mb-4 text-center sm:text-left ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          What You'll Learn
        </h2>
        <div className={`rounded-lg border overflow-hidden ${
          isDarkMode ? 'border-zinc-800/50' : 'border-[#F3F4F6]'
        }`}>
          {course.topics.map((topic: any, index: number) => (
            <Link
              key={topic.id}
              href={topic.locked ? '#' : `/dashboard/student/learn/${courseId}/${topic.id}/overview`}
              className={`flex items-center justify-between p-2.5 sm:p-3 md:p-4 cursor-pointer group min-h-[48px] touch-manipulation border-b last:border-b-0 ${
                index === 0
                  ? isDarkMode ? 'bg-zinc-800/30' : 'bg-[#FAFAFA]'
                  : isDarkMode ? 'bg-zinc-900/20 hover:bg-zinc-800/30' : 'bg-white hover:bg-gray-50'
              } ${
                topic.locked ? 'cursor-not-allowed' : ''
              } ${
                isDarkMode ? 'border-zinc-800/50' : 'border-[#F3F4F6]'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-4 sm:w-5 flex justify-center flex-shrink-0">
                  <div className={topic.locked ? 'text-gray-400' : isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>
                    {getIcon(topic.icon)}
                  </div>
                </div>
                <span className={`text-xs sm:text-sm md:text-[14px] font-medium truncate ${
                  topic.locked
                    ? isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                    : isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {topic.name}
                </span>
              </div>
              <svg className={`flex-shrink-0 ml-2 ${
                topic.locked ? 'text-gray-300' : isDarkMode ? 'text-zinc-400' : 'text-gray-400'
              }`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(CourseDetail)
