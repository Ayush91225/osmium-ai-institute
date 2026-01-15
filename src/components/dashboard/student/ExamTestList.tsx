'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import Link from 'next/link'

const exams = [
  { id: 1, title: 'Mid-Term Examination', subject: 'Data Structures & Algorithms', date: '15 Jan 2025', duration: '2 hours', status: 'upcoming' },
  { id: 2, title: 'Final Examination', subject: 'Web Development', date: '28 Feb 2025', duration: '3 hours', status: 'upcoming' },
  { id: 3, title: 'Unit Test 1', subject: 'Machine Learning', date: '10 Dec 2024', duration: '1 hour', status: 'completed', score: '85/100' }
]

const tests = [
  { id: 1, title: 'C++ Constructor Quiz', subject: 'Data Structures & Algorithms', questions: 10, duration: '15 min', status: 'available' },
  { id: 2, title: 'React Hooks Assessment', subject: 'Web Development', questions: 15, duration: '20 min', status: 'available' },
  { id: 3, title: 'Python Basics Test', subject: 'Python Programming', questions: 20, duration: '30 min', status: 'completed', score: '18/20' },
  { id: 4, title: 'Arrays & Strings Quiz', subject: 'Data Structures & Algorithms', questions: 12, duration: '18 min', status: 'available' }
]

function ExamTestList() {
  const { isDarkMode } = useDarkMode()

  return (
    <div className={`flex-1 h-screen overflow-y-auto p-6 lg:p-8 ${isDarkMode ? 'bg-zinc-950' : 'bg-[#F9F8F6]'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
            Exams & Tests
          </h1>
          <p className={`text-[15px] ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            Track your upcoming exams and practice with tests
          </p>
        </div>

        <div className="mb-10">
          <h2 className={`text-xl font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Upcoming Exams
          </h2>
          <div className="grid gap-4">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className={`rounded-xl border p-6 transition-all ${
                  isDarkMode 
                    ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className={`text-lg font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {exam.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {exam.subject}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    exam.status === 'upcoming'
                      ? isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                      : isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                  }`}>
                    {exam.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDarkMode ? 'text-zinc-500' : 'text-gray-400'}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDarkMode ? 'text-zinc-500' : 'text-gray-400'}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>{exam.duration}</span>
                  </div>
                  {exam.score && (
                    <div className="flex items-center gap-2 ml-auto">
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Score: {exam.score}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={`text-xl font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Practice Tests
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tests.map((test) => (
              <div
                key={test.id}
                className={`rounded-xl border p-6 transition-all ${
                  isDarkMode 
                    ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className={`text-base font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {test.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {test.subject}
                    </p>
                  </div>
                  {test.status === 'completed' && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                    }`}>
                      Completed
                    </span>
                  )}
                </div>
                <div className={`flex items-center gap-4 text-sm mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  <span>{test.questions} questions</span>
                  <span>•</span>
                  <span>{test.duration}</span>
                </div>
                {test.score ? (
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Score: {test.score}
                  </div>
                ) : (
                  <Link
                    href="#"
                    className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isDarkMode 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-[#111827] text-white hover:bg-black'
                    }`}
                  >
                    Start Test
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ExamTestList)
