'use client'

import { memo } from 'react'
import StudentHeader from './StudentHeader'
import StudentStatsSection from './StudentStatsSection'
import StudentDashboardGrid from './StudentDashboardGrid'

function StudentDashboard() {
  return (
    <div className="space-y-6 md:space-y-8">
      <StudentHeader />
      <StudentStatsSection />
      <StudentDashboardGrid />
    </div>
  )
}

export default memo(StudentDashboard)
