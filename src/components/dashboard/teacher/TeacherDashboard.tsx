'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import Link from 'next/link'

function TeacherDashboard() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${
            mounted && isDarkMode ? 'text-zinc-100' : 'text-[#1a1a1a]'
          }`} suppressHydrationWarning>
            Teacher Dashboard
          </h1>
          <p className={`text-sm mt-1 ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`} suppressHydrationWarning>
            Welcome back! Here's your overview
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#ECE1D1"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
                <path d="M226.53,56.41l-96-32a8,8,0,0,0-5.06,0l-96,32A8,8,0,0,0,24,64v80a8,8,0,0,0,16,0V75.1L73.59,86.29a64,64,0,0,0,20.65,88.05c-18,7.06-33.56,19.83-44.94,37.29a8,8,0,1,0,13.4,8.74C77.77,197.25,101.57,184,128,184s50.23,13.25,65.3,36.37a8,8,0,0,0,13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64,64,0,0,0,20.65-88l44.12-14.7a8,8,0,0,0,0-15.18ZM176,120A48,48,0,1,1,89.35,91.55l36.12,12a8,8,0,0,0,5.06,0l36.12-12A47.89,47.89,0,0,1,176,120Z" fill="#8B7355"></path>
              </g>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">My Students</div>
            <div className="stat-value">156</div>
            <span className="stat-extra stat-extra-green">4 classes • 3 subjects</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#CFE8E2"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
                <path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z" fill="#242929"></path>
              </g>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Exams & Tests</div>
            <div className="stat-value">12</div>
            <span className="stat-extra stat-extra-green">3 upcoming • 9 completed</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#E8E7D5"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
                <path d="M240,56V200a8,8,0,0,1-8,8H160a24,24,0,0,0-24,23.94,7.9,7.9,0,0,1-5.12,7.55A8,8,0,0,1,120,232a24,24,0,0,0-24-24H24a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H88a32,32,0,0,1,32,32v87.73a8.17,8.17,0,0,0,7.47,8.25,8,8,0,0,0,8.53-8V80a32,32,0,0,1,32-32h64A8,8,0,0,1,240,56Z" fill="#434027"></path>
              </g>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Projects</div>
            <div className="stat-value">8</div>
            <span className="stat-extra stat-extra-green">5 active • 3 pending</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#F4ECE6"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
                <path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86Zm-16.25,1.47L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z" fill="#89694A"></path>
              </g>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Performance</div>
            <div className="stat-value">85%</div>
            <span className="stat-extra stat-extra-green">+5% from last month</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Classes */}
        <div className={`rounded-xl border p-6 ${
          mounted && isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-gray-200'
        }`} suppressHydrationWarning>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${
              mounted && isDarkMode ? 'text-zinc-100' : 'text-[#1a1a1a]'
            }`} suppressHydrationWarning>
              My Classes
            </h2>
            <Link href="/dashboard/teacher/students" className={`text-sm font-medium ${
              mounted && isDarkMode ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-600 hover:text-gray-900'
            }`} suppressHydrationWarning>
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {['Grade 10A', 'Grade 11B', 'Grade 12A', 'Grade 9B'].map((cls) => (
              <div key={cls} className={`p-4 rounded-lg border ${
                mounted && isDarkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-gray-50 border-gray-200'
              }`} suppressHydrationWarning>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${
                      mounted && isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                    }`} suppressHydrationWarning>{cls}</div>
                    <div className={`text-sm ${
                      mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`} suppressHydrationWarning>40 students</div>
                  </div>
                  <div className={`text-sm font-medium ${
                    mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`} suppressHydrationWarning>Mathematics</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tests */}
        <div className={`rounded-xl border p-6 ${
          mounted && isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-gray-200'
        }`} suppressHydrationWarning>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${
              mounted && isDarkMode ? 'text-zinc-100' : 'text-[#1a1a1a]'
            }`} suppressHydrationWarning>
              Upcoming Tests
            </h2>
            <Link href="/dashboard/teacher/exams" className={`text-sm font-medium ${
              mounted && isDarkMode ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-600 hover:text-gray-900'
            }`} suppressHydrationWarning>
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Mid-term Exam', date: 'Jan 25, 2025', class: 'Grade 10A' },
              { name: 'Unit Test 3', date: 'Jan 28, 2025', class: 'Grade 11B' },
              { name: 'Final Exam', date: 'Feb 5, 2025', class: 'Grade 12A' }
            ].map((test) => (
              <div key={test.name} className={`p-4 rounded-lg border ${
                mounted && isDarkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-gray-50 border-gray-200'
              }`} suppressHydrationWarning>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${
                      mounted && isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                    }`} suppressHydrationWarning>{test.name}</div>
                    <div className={`text-sm ${
                      mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`} suppressHydrationWarning>{test.class}</div>
                  </div>
                  <div className={`text-sm font-medium ${
                    mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`} suppressHydrationWarning>{test.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(TeacherDashboard)