'use client'

import { memo } from 'react'
import RecentTestsSection from './RecentTestsSection'
import UpcomingTestsSection from './UpcomingTestsSection'
import ResumeCoursesSection from './ResumeCoursesSection'
import PreviousExamSection from './PreviousExamSection'
import SubjectPerformanceSection from './SubjectPerformanceSection'
import CareerPathSection from './CareerPathSection'
import LearningStrengthsSection from './LearningStrengthsSection'

function StudentDashboardGrid() {
  return (
    <div className="space-y-6">
      {/* Recent Tests & Upcoming Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTestsSection />
        <UpcomingTestsSection />
      </div>

      {/* Resume Courses */}
      <ResumeCoursesSection />

      {/* Previous Exam & Subject Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PreviousExamSection />
        <SubjectPerformanceSection />
      </div>

      {/* Career Path & Learning Strengths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CareerPathSection />
        <LearningStrengthsSection />
      </div>
    </div>
  )
}

export default memo(StudentDashboardGrid)
