'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function DashboardHeader() {
  const [adminName, setAdminName] = useState('Admin')
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          setAdminName(user.name || 'Admin')
        } catch {
          // Handle invalid JSON
        }
      }
    }
  }, [])

  if (!mounted) {
    return (
      <div className="flex flex-col xl:flex-row justify-between items-start gap-4 md:gap-6 mb-6 md:mb-8 mt-12 md:mt-0">
        <div className="mt-1">
          <h1 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.3] tracking-tight px-4 md:px-0 mt-4 text-[#333333]" style={{ fontFamily: 'Libre Baskerville, serif' }}>
            Welcome to<br className="hidden sm:block" />
            <span className="font-semibold text-black">
              {adminName} Dashboard
            </span>
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col xl:flex-row justify-between items-start gap-4 md:gap-6 mb-6 md:mb-8 mt-12 md:mt-0">
      <div className="mt-1">
        <h1 className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.3] tracking-tight px-4 md:px-0 mt-4 transition-colors duration-200 ${
          isDarkMode ? 'text-zinc-200' : 'text-[#333333]'
        }`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
          Welcome to<br className="hidden sm:block" />
          <span className={`font-semibold transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            {adminName} Dashboard
          </span>
        </h1>
      </div>
    </div>
  )
}

export default memo(DashboardHeader)