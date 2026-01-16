'use client'

import { memo, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function UpcomingTestsSection() {
  const { isDarkMode } = useDarkMode()
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  const tests = [
    { date: 'Tue, 12 June', title: 'Python Advanced', time: '10:30 AM', questions: 25, timeLeft: '3 days 22 hours left' },
    { date: 'Wed, 18 June', title: 'JAVA Core', time: '10:30 AM', questions: 25, timeLeft: '6 days 18 hours left' },
  ]

  return (
    <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Upcoming Tests
          </h3>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
            All Schedules upcoming test
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

      <div className="space-y-4 mt-6">
        {tests.map((test, index) => (
          <div key={index} className={`p-5 rounded-lg border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                  {test.date}
                </p>
                <h4 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {test.title}
                </h4>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full border ${isDarkMode ? 'text-zinc-300 border-zinc-600 bg-zinc-800/50' : 'text-gray-600 border-gray-300 bg-white'}`} style={{ borderStyle: 'dashed' }}>
                {test.timeLeft}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className={`flex items-center gap-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>
                </svg>
                <span>{test.time}</span>
              </div>
              <div className={`flex items-center gap-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"/>
                </svg>
                <span>{test.questions} Questions</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
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

export default memo(UpcomingTestsSection)
