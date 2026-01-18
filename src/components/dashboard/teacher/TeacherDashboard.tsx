'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDarkMode } from '@/contexts/DarkModeContext'
import TeacherHeader from './TeacherHeader'
import TeacherStats from './TeacherStats'
import PerformanceChart from './PerformanceChart'
import ScheduledTests from './ScheduledTests'
import ClassPerformance from './ClassPerformance'
import RecentActivity from './RecentActivity'

export default function TeacherDashboard() {
  const [mounted, setMounted] = useState(false)
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen pl-6 pr-3 py-3 lg:pl-8 lg:pr-4 lg:py-3 ${
        mounted && isDarkMode ? 'bg-zinc-900' : 'bg-[#faf8f6]'
      }`}
      style={{ fontFamily: 'Inter, sans-serif' }}
      suppressHydrationWarning
    >
      <div className="max-w-none space-y-2.5">
        <TeacherHeader />
        <TeacherStats />
        
        {/* Main sections grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
          <PerformanceChart />
          <ScheduledTests />
        </div>
        
        {/* Bottom section container */}
        <div className="flex flex-col xl:flex-row gap-3 items-start">
          <ClassPerformance />
          <RecentActivity />
        </div>
      </div>
    </motion.div>
  )
}