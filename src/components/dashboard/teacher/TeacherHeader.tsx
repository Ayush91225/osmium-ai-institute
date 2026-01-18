'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

export default function TeacherHeader() {
  const [mounted, setMounted] = useState(false)
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      <div className="flex items-center gap-3">
        <h1 className={`text-2xl font-bold ${
          mounted && isDarkMode ? 'text-zinc-100' : 'text-[#1A1A1A]'
        }`} style={{ fontFamily: 'Inter, sans-serif' }} suppressHydrationWarning>
          Dashboard
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <button className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
          mounted && isDarkMode
            ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
            : 'bg-white border-[#E5E5E5] text-gray-700 hover:bg-[#F5F5F5]'
        }`} suppressHydrationWarning>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
            <path d="M168,224a8,8,0,0,1-8,8H96a8,8,0,1,1,0-16h64A8,8,0,0,1,168,224Zm53.85-32A15.8,15.8,0,0,1,208,200H48a16,16,0,0,1-13.8-24.06C39.75,166.38,48,139.34,48,104a80,80,0,1,1,160,0c0,35.33,8.26,62.38,13.81,71.94A15.89,15.89,0,0,1,221.84,192ZM208,184c-7.73-13.27-16-43.95-16-80a64,64,0,1,0-128,0c0,36.06-8.28,66.74-16,80Z" />
          </svg>
        </button>
        
        <button className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
          mounted && isDarkMode
            ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
            : 'bg-white border-[#E5E5E5] text-gray-700 hover:bg-[#F5F5F5]'
        }`} suppressHydrationWarning>
          Monthly
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        
        <button className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
          mounted && isDarkMode
            ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
            : 'bg-white border-[#E5E5E5] text-gray-700 hover:bg-[#F5F5F5]'
        }`} suppressHydrationWarning>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Export
        </button>
      </div>
    </div>
  )
}