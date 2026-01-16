'use client'

import { memo } from 'react'
import StudentHeader from './StudentHeader'
import StudentStatsSection from './StudentStatsSection'
import StudentDashboardGrid from './StudentDashboardGrid'

function StudentDashboard() {
  return (
    <div className="h-screen overflow-y-auto p-4 md:p-8 lg:p-12">
      <div className="space-y-6 md:space-y-8">
        <StudentHeader />
        <StudentStatsSection />
        <StudentDashboardGrid />
      </div>
    </div>
  )
}

export default memo(StudentDashboard)
