'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useRouter } from 'next/navigation'

function PreviousExamSection() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()

  const exams = [
    { name: 'JEE Mains', date: '2 Sep 2025', score: '120/300', color: isDarkMode ? 'bg-amber-900' : 'bg-[#6B5344]' },
    { name: 'JEE Mains', date: '28 Aug 2025', score: '102/300', color: isDarkMode ? 'bg-stone-700' : 'bg-[#9B9B7A]' },
    { name: 'JEE Mains', date: '18 Aug 2025', score: '85/300', color: isDarkMode ? 'bg-orange-800' : 'bg-[#D4A574]' },
    { name: 'JEE Mains', date: '15 Aug 2025', score: '59/300', color: isDarkMode ? 'bg-lime-800' : 'bg-[#D9D7A8]' },
  ]

  const totalTests = 15
  const displayedTests = exams.length

  return (
    <div className={`rounded-xl p-5 border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Previous Exam Test Performances
          </h3>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
            See previous done exam tests
          </p>
        </div>
        <button className={`p-1 ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="12" cy="19" r="2"/>
          </svg>
        </button>
      </div>

      <div className="flex gap-1 mb-6 mt-6">
        {exams.map((exam, index) => (
          <div key={index} className={`h-1.5 flex-1 rounded-full ${exam.color}`} />
        ))}
      </div>

      <div className="space-y-4">
        {exams.map((exam, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${exam.color}`} />
              <span className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {exam.name}
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                - {exam.date}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/dashboard/student/exam/mock-test/analytic')}
                className={`px-4 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700'}`}
              >
                View Result
              </button>
              <span className={`font-semibold text-sm min-w-[70px] text-right ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {exam.score}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={`flex items-center justify-between mt-6 pt-4 border-t ${isDarkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
        <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
          {displayedTests} out {totalTests} Tests
        </span>
        <button className={`text-sm font-medium ${isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-800'}`}>
          View All Results
        </button>
      </div>
    </div>
  )
}

export default memo(PreviousExamSection)
