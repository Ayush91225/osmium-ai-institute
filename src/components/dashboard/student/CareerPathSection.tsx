'use client'

import { memo, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useRouter } from 'next/navigation'

function CareerPathSection() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  const careers = [
    { 
      title: 'Software Developer', 
      description: 'Frequently engages with topics, tests, or activities linked to this career.',
      icon: 'code',
      slug: 'software-developer'
    },
    { 
      title: 'Android Developer', 
      description: 'Strong performance in React Native indicating natural aptitude.',
      icon: 'android',
      slug: 'android-developer'
    },
    { 
      title: 'Data Analyst', 
      description: 'Strong performance in Aptitude topics indicating natural aptitude.',
      icon: 'database',
      slug: 'data-analyst'
    },
  ]

  return (
    <div className={`rounded-xl p-5 border h-full flex flex-col ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-base font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Career Recommendations
      </h3>

      <div className="space-y-2 flex-1">
        {careers.map((career, index) => (
          <div 
            key={index} 
            onClick={() => router.push(`/dashboard/student/career?career=${career.slug}`)}
            className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}
          >
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-zinc-700' : 'bg-white'}`}>
                {career.icon === 'code' && (
                  <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                    <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"/>
                  </svg>
                )}
                {career.icon === 'android' && (
                  <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                    <path d="M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16ZM80,32h96a8,8,0,0,1,8,8v8H72V40A8,8,0,0,1,80,32Zm96,192H80a8,8,0,0,1-8-8V64H184V216A8,8,0,0,1,176,224Z"/>
                  </svg>
                )}
                {career.icon === 'database' && (
                  <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" className={isDarkMode ? 'text-red-400' : 'text-red-600'}>
                    <path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z"/>
                  </svg>
                )}
              </div>
              <h4 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {career.title}
              </h4>
            </div>
            <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" className={`flex-shrink-0 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
            </svg>
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

export default memo(CareerPathSection)
