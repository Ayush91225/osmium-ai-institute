'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

export default function PerformanceChart() {
  const [selectedSubject, setSelectedSubject] = useState('B.Tech [Sem-3] [DBMS]')
  const [mounted, setMounted] = useState(false)
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const subjects = [
    'B.Tech [Sem-1] [Java]',
    'B.Tech [Sem-2] [Python]', 
    'B.Tech [Sem-3] [DBMS]',
    'B.Tech [Sem-4] [DSA]'
  ]

  const performanceData = [
    { name: 'Rajat bhatia', score: 95, rank: 1 },
    { name: 'Arjun Kale', score: 88, rank: 2 },
    { name: 'Chirag Iyer', score: 82, rank: 3 },
    { name: 'Anmol Mehra', score: 85, rank: 4 },
    { name: 'Swastik Khatua', score: 86, rank: 5 },
  ]

  return (
    <div className={`rounded-xl border p-6 ${
      mounted && isDarkMode 
        ? 'bg-zinc-800 border-zinc-700' 
        : 'bg-white border-[#e8e5e0]'
    }`} suppressHydrationWarning>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className={`text-[22px] font-semibold mb-1.5 leading-tight ${
            mounted && isDarkMode ? 'text-zinc-100' : 'text-[#222]'
          }`} style={{ letterSpacing: '-0.3px' }} suppressHydrationWarning>
            Previous Exam Test Performances
          </h1>
          <p className={`text-[14px] font-normal ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-[#999]'
          }`} suppressHydrationWarning>
            Highlights the highest scoring students
          </p>
        </div>
        
        <div className="relative">
          <button className={`border rounded-lg px-3 py-2 text-[13px] font-medium cursor-pointer flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow-md active:transform active:translate-y-px min-w-auto whitespace-nowrap ${
            mounted && isDarkMode
              ? 'bg-zinc-700 border-zinc-600 text-zinc-200 hover:bg-zinc-600 hover:border-zinc-500 active:bg-zinc-800'
              : 'bg-white border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb] hover:border-[#9ca3af] active:bg-[#f3f4f6]'
          }`} suppressHydrationWarning>
            <span>{selectedSubject}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Grid lines */}
        <div className="absolute left-[157px] right-[10px] top-0 h-[234px] pointer-events-none">
          {[0, 20, 40, 60, 80, 100].map((percent, i) => (
            <div 
              key={i}
              className="absolute top-0 bottom-0 w-px bg-[#f0efef]"
              style={{ left: `${percent}%` }}
            />
          ))}
        </div>

        {/* Performance bars */}
        <div className="space-y-[18px]">
          {performanceData.map((student, index) => (
            <div key={student.name} className="flex items-center relative overflow-visible">
              <div className={`w-[140px] text-[15px] font-normal pr-5 flex-shrink-0 ${
                mounted && isDarkMode ? 'text-zinc-300' : 'text-[#444]'
              }`} suppressHydrationWarning>
                {student.name}
              </div>
              <div className={`flex-1 h-9 rounded-sm relative overflow-visible ${
                mounted && isDarkMode ? 'bg-zinc-700' : 'bg-[#E8E4D8]'
              }`} suppressHydrationWarning>
                <div 
                  className="h-full bg-[#ECECCA] rounded-sm relative cursor-pointer transition-colors hover:bg-[#E4B17D] group overflow-visible z-10"
                  style={{ width: `${student.score}%` }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-[#2d2d2d] text-white px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[9999] leading-relaxed">
                    Score: {student.score}%<br/>
                    <span className="inline-block w-1.5 h-1.5 bg-[#f4c542] rounded-full mr-1"></span>
                    #{student.rank}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-[5px] border-transparent border-t-[#2d2d2d]"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="mt-4 pl-[140px] relative">
          <div className={`flex justify-between text-[13px] relative ${
            mounted && isDarkMode ? 'text-zinc-500' : 'text-[#888]'
          }`} suppressHydrationWarning>
            <span className="absolute left-0 transform translate-x-0">0%</span>
            <span className="absolute left-[20%] transform -translate-x-1/2">20%</span>
            <span className="absolute left-[40%] transform -translate-x-1/2">40%</span>
            <span className="absolute left-[60%] transform -translate-x-1/2">60%</span>
            <span className="absolute left-[80%] transform -translate-x-1/2">80%</span>
            <span className="absolute left-[100%] transform -translate-x-full">100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}