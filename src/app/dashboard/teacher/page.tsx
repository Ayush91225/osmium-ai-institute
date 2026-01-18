import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import TeacherDashboard from '@/components/dashboard/teacher/TeacherDashboard'
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner'

const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Teacher Dashboard - Osmium',
  description: 'Teacher dashboard with analytics and test management',
}

export default function TeacherDashboardPage() {
  return (
    <DashboardLayout userType="teacher">
      <Suspense fallback={<LoadingSpinner />}>
        <TeacherDashboard />
      </Suspense>
    </DashboardLayout>
  )
}
