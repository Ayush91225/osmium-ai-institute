import { Suspense } from 'react'
import { Metadata } from 'next'
import AnalyticsPage from '@/components/dashboard/teacher/AnalyticsPage'
import TeacherDashboardLayout from '@/components/dashboard/teacher/TeacherDashboardLayout'
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Analytics | Osmium AI Institute',
  description: 'Teacher analytics dashboard',
  robots: 'noindex, nofollow',
}

export default function Analytics() {
  return (
    <TeacherDashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <AnalyticsPage />
      </Suspense>
    </TeacherDashboardLayout>
  )
}
