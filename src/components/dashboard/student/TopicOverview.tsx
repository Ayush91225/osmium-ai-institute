'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useRouter } from 'next/navigation'

interface TopicOverviewProps {
  courseId: string
  topicId: string
}

function TopicOverview({ courseId, topicId }: TopicOverviewProps) {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()

  const courseData: Record<string, any> = {
    'python-programming-from-scratch': {
      title: 'Python Programming from Scratch',
      topics: [{ 
        id: '1', 
        name: 'Introduction to Python',
        description: 'A core foundational module that introduces Python programming language, its syntax, and basic concepts. Students learn how to write their first programs, understand variables and data types, and develop problem-solving skills essential for software development.',
        highlights: [
          'Understanding Python basics and syntax',
          'Variables, data types, and operators',
          'Control flow and basic algorithms',
          'Writing and debugging your first programs',
          'Foundation for advanced Python concepts'
        ]
      }]
    },
    'data-structures-algorithms-cpp': {
      title: 'Data Structures & Algorithms with C++',
      topics: [{ 
        id: '1', 
        name: 'Introduction to DSA',
        description: 'A core foundational module that explains why Data Structures and Algorithms are essential for building efficient software. Students learn how to analyze performance using time & space complexity, understand Big-O notation, and develop the mindset required for optimized problem-solving in real-world applications and coding interviews.',
        highlights: [
          'Why DSA matters in software development',
          'Understanding Time & Space Complexity',
          'Big-O Notation essentials',
          'Foundation for advanced algorithms',
          'Crucial for coding interviews & system efficiency'
        ]
      }]
    },
    'web-development-nextjs-tailwind': {
      title: 'Web Development with Next.js & Tailwind',
      topics: [{ 
        id: '1', 
        name: 'Next.js Fundamentals',
        description: 'A comprehensive introduction to Next.js framework covering server-side rendering, routing, and modern web development practices. Learn how to build fast, SEO-friendly applications with React and Next.js.',
        highlights: [
          'Understanding Next.js architecture',
          'Server-side rendering concepts',
          'File-based routing system',
          'Building modern web applications',
          'Performance optimization techniques'
        ]
      }]
    },
    'introduction-machine-learning': {
      title: 'Introduction to Machine Learning',
      topics: [{ 
        id: '1', 
        name: 'ML Fundamentals',
        description: 'An essential introduction to machine learning concepts, algorithms, and applications. Students explore supervised and unsupervised learning, understand model training, and discover how ML transforms data into actionable insights.',
        highlights: [
          'Core machine learning concepts',
          'Types of learning algorithms',
          'Model training and evaluation',
          'Real-world ML applications',
          'Foundation for deep learning'
        ]
      }]
    }
  }

  const course = courseData[courseId] || courseData['data-structures-algorithms-cpp']
  const topic = course.topics[0]

  return (
    <div className={`flex-1 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 w-full h-screen overflow-hidden ${
      isDarkMode ? 'text-zinc-300' : 'text-[#2D2D2D]'
    }`}>
      <div className="mb-6 sm:mb-8 lg:mb-10 flex items-center gap-3 sm:gap-4">
        <div className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center ${
          isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 256 256">
            <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,208H48V48H80Zm96-56H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path>
          </svg>
        </div>
        <span className={`font-serif text-lg sm:text-xl md:text-2xl lg:text-[26px] font-medium leading-tight ${
          isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
        }`}>Overview</span>
      </div>

      <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 font-serif text-sm sm:text-base md:text-[17px] lg:text-[18px] leading-[1.6] sm:leading-[1.7] md:leading-[1.8] tracking-wide">
        <div>
          <h1 className={`font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-5 md:mb-6 leading-tight font-medium ${
            isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
          }`}>
            {topic.name}
          </h1>
        </div>

        <div>
          <p className="break-words">
            {topic.description}
          </p>
        </div>

        <div>
          <h2 className={`font-serif italic text-base sm:text-lg md:text-[19px] mb-3 sm:mb-4 md:mb-5 ${
            isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
          }`}>
            Key Highlights
          </h2>
          <ul className="flex flex-col gap-2 sm:gap-2.5 text-sm sm:text-base md:text-[16px] font-sans font-light">
            {topic.highlights.map((highlight: string, index: number) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3 min-h-[44px] sm:min-h-0">
                <div className={`w-1 h-1 rounded-full flex-shrink-0 mt-2 sm:mt-2.5 ${
                  isDarkMode ? 'bg-white' : 'bg-black'
                }`}></div>
                <span className="break-words">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-16 sm:h-24 md:h-32"></div>
    </div>
  )
}

export default memo(TopicOverview)
