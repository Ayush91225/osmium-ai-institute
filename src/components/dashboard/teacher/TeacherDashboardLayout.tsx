'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import TeacherSidebar from './TeacherSidebar'
import MobileToggle from '../shared/MobileToggle'

interface TeacherDashboardLayoutProps {
  children: React.ReactNode
}

export default function TeacherDashboardLayout({ children }: TeacherDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  useEffect(() => {
    const handleBodyOverflow = () => {
      if (typeof document !== 'undefined' && document.body) {
        document.body.style.overflow = sidebarOpen ? 'hidden' : 'unset'
      }
    }

    handleBodyOverflow()

    return () => {
      if (typeof document !== 'undefined' && document.body) {
        document.body.style.overflow = 'unset'
      }
    }
  }, [sidebarOpen])

  return (
    <div className={`min-h-screen h-full ${
      mounted && isDarkMode ? 'bg-zinc-900' : 'bg-[#faf8f6]'
    }`} suppressHydrationWarning>
      <TeacherSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Main Content */}
      <main className="min-h-screen overflow-y-auto lg:ml-[280px] relative">
        <MobileToggle onClick={toggleSidebar} />
        {children}
      </main>
    </div>
  )
}