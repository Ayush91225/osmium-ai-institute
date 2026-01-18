import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ExamsPage from '@/components/dashboard/teacher/ExamsPage'
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner'

const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Exam & Tests | Osmium AI Institute',
  description: 'Teacher exam and test management',
  robots: 'noindex, nofollow',
}

export default function Exams() {
  return (
    <DashboardLayout userType="teacher">
      <Suspense fallback={<LoadingSpinner />}>
        <ExamsPage />
      </Suspense>
    </DashboardLayout>
  )
}
