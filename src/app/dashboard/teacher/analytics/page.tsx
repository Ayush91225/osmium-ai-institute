import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import AnalyticsPage from '@/components/dashboard/teacher/AnalyticsPage'
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner'

const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Analytics | Osmium AI Institute',
  description: 'Teacher analytics dashboard',
  robots: 'noindex, nofollow',
}

export default function Analytics() {
  return (
    <DashboardLayout userType="teacher">
      <Suspense fallback={<LoadingSpinner />}>
        <AnalyticsPage />
      </Suspense>
    </DashboardLayout>
  )
}
