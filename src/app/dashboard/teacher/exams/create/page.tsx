import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import CreateTestPage from '@/components/dashboard/teacher/CreateTestPage'
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner'

const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Create Test | Osmium AI Institute',
  description: 'Create and manage test questions',
  robots: 'noindex, nofollow',
}

export default function CreateTest() {
  return (
    <DashboardLayout userType="teacher">
      <Suspense fallback={<LoadingSpinner />}>
        <CreateTestPage />
      </Suspense>
    </DashboardLayout>
  )
}
