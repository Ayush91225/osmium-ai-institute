import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import SubjectSelectionPage from '@/components/dashboard/teacher/SubjectSelectionPage'
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner'

const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Subject Analytics - Osmium',
  description: 'View subject-wise analytics',
}

export default function Page() {
  return (
    <DashboardLayout userType="teacher">
      <Suspense fallback={<LoadingSpinner />}>
        <SubjectSelectionPage />
      </Suspense>
    </DashboardLayout>
  );
}
