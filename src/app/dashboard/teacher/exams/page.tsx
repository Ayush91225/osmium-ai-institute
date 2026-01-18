import { Suspense } from 'react'
import { Metadata } from 'next'
import ExamsPage from '@/components/dashboard/teacher/ExamsPage'
import TeacherDashboardLayout from '@/components/dashboard/teacher/TeacherDashboardLayout'
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Exam & Tests | Osmium AI Institute',
  description: 'Teacher exam and test management',
  robots: 'noindex, nofollow',
}

export default function Exams() {
  return (
    <TeacherDashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <ExamsPage />
      </Suspense>
    </TeacherDashboardLayout>
  )
}
