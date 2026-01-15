'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import Sidebar from './Sidebar'
import MobileToggle from './MobileToggle'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Optimized toggle function with useCallback
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [sidebarOpen])

  return (
    <div className={`min-h-screen h-full ${mounted && isDarkMode ? 'bg-zinc-950/95' : 'bg-bg'
      }`}>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main className={`min-h-screen overflow-y-auto p-4 md:p-8 lg:p-12 lg:ml-[280px] relative scroll-smooth will-change-transform ${mounted && isDarkMode ? 'text-zinc-100 bg-zinc-950/95' : 'text-gray-900 bg-bg'
        }`}>
        <MobileToggle onClick={toggleSidebar} />

        {children}
      </main>
    </div>
  )
}