import { Suspense } from 'react'
import { Metadata } from 'next'
import CreateTestPage from '@/components/dashboard/teacher/CreateTestPage'
import TeacherDashboardLayout from '@/components/dashboard/teacher/TeacherDashboardLayout'
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Create Test | Osmium AI Institute',
  description: 'Create and manage test questions',
  robots: 'noindex, nofollow',
}

export default function CreateTest() {
  return (
    <TeacherDashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <CreateTestPage />
      </Suspense>
    </TeacherDashboardLayout>
  )
}
