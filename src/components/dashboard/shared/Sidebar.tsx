'use client'

import { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import UserProfile from './UserProfile'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { href: '/dashboard/admin', icon: 'ph-squares-four', label: 'Dashboard' },
  { href: '/dashboard/admin/teachers', icon: 'ph-chalkboard-teacher', label: 'Teachers' },
  { href: '/dashboard/admin/approvals', icon: 'ph-clock', label: 'Pending Approvals' },
  { href: '/dashboard/admin/students', icon: 'ph-users', label: 'Students' },
  { href: '/dashboard/subjects', icon: 'ph-books', label: 'Subjects' },
  { href: '/dashboard/classes', icon: 'ph-graduation-cap', label: 'Classes' },
  { href: '/dashboard/exams', icon: 'ph-exam', label: 'Exam & Tests' },
]

const otherItems = [
  { href: '/dashboard/admin/notifications', icon: 'ph-bell', label: 'Notifications' },
  { href: '/dashboard/admin/subscription', icon: 'ph-crown', label: 'Subscription' },
  { href: '/dashboard/admin/billing', icon: 'ph-currency-inr', label: 'Billing' },
  { href: '/dashboard/help', icon: 'ph-question', label: 'Help & Support' },
]

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <aside 
      id="sidebar" 
      className={`
        w-[280px] sm:w-[270px] flex flex-col pt-4 sm:pt-6 pb-2 sm:pb-4 px-4 sm:px-5 
        border-r shadow-sm fixed inset-y-0 left-0 z-40 h-screen max-h-screen 
        lg:translate-x-0 backdrop-blur-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${mounted && isDarkMode
          ? 'bg-zinc-950/95 border-zinc-800/50' 
          : 'bg-[#f9f9f7] border-gray-200'
        }
      `}
      suppressHydrationWarning
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 px-1" suppressHydrationWarning>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-7 sm:h-7">
            <img src="https://osmium.co.in/cdnLogo" alt="Osmium Logo" className="w-full h-full object-contain" />
          </div>
          <span 
            className={`text-lg sm:text-[19px] font-medium tracking-tight font-sans ${
              mounted && isDarkMode ? 'text-zinc-100' : 'text-black'
            }`}
            suppressHydrationWarning
          >
            Osmium
          </span>
        </div>
        <button 
          onClick={onClose}
          className={`w-7 h-7 sm:w-8 sm:h-8 border rounded-lg flex items-center justify-center cursor-pointer lg:hidden ${
            mounted && isDarkMode 
              ? 'bg-zinc-900/50 border-zinc-800/50 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300' 
              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}
          suppressHydrationWarning
        >
          <i className="ph ph-caret-left" style={{ fontSize: '16px' }} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div 
          className={`text-xs font-semibold uppercase tracking-wide mb-3 mt-6 px-4 ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-400'
          }`}
          suppressHydrationWarning
        >
          General
        </div>
        
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive 
                    ? mounted && isDarkMode
                      ? 'bg-zinc-800/50 text-zinc-100 font-semibold' 
                      : 'bg-[#e8e5de] text-[#202021] font-semibold'
                    : mounted && isDarkMode
                      ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
                onClick={onClose}
                suppressHydrationWarning
              >
                <i 
                  className={`ph ${item.icon} text-lg ${
                    isActive 
                      ? mounted && isDarkMode ? 'text-white' : 'text-[#202021]'
                      : mounted && isDarkMode ? 'text-zinc-400' : 'text-[#2C2C2C]'
                  }`}
                  suppressHydrationWarning
                />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div 
          className={`text-xs font-semibold uppercase tracking-wide mb-3 mt-6 px-4 ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-400'
          }`}
          suppressHydrationWarning
        >
          Other
        </div>
        
        <nav className="space-y-1">
          {otherItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive 
                    ? mounted && isDarkMode
                      ? 'bg-zinc-800/50 text-zinc-100 font-semibold' 
                      : 'bg-[#e8e5de] text-[#202021] font-semibold'
                    : mounted && isDarkMode
                      ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
                onClick={onClose}
                suppressHydrationWarning
              >
                <i 
                  className={`ph ${item.icon} text-lg ${
                    isActive 
                      ? mounted && isDarkMode ? 'text-white' : 'text-[#202021]'
                      : mounted && isDarkMode ? 'text-zinc-400' : 'text-[#2C2C2C]'
                  }`}
                  suppressHydrationWarning
                />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* User Profile */}
      <UserProfile />
    </aside>
  )
}

export default memo(Sidebar)