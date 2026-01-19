import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ClassProvider } from '@/contexts/ClassContext'
import { TeacherProvider } from '@/contexts/TeacherContext'
import { StudentProvider } from '@/contexts/StudentContext'
import { ApprovalProvider } from '@/contexts/ApprovalContext'
import { UnifiedDataProvider } from '@/contexts/UnifiedDataContext'
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner'
import '@/assets/css/dashboard/admin.css'

const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

const TeacherManagement = dynamic(() => import('@/components/dashboard/admin/TeacherManagement'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Teacher Management | Osmium AI Institute',
  description: 'Comprehensive teacher management system for educational institutes',
  robots: 'noindex, nofollow',
}

export default function TeachersPage() {
  return (
    <ClassProvider>
      <TeacherProvider>
        <StudentProvider>
          <ApprovalProvider>
            <UnifiedDataProvider>
              <DashboardLayout>
                <Suspense fallback={<LoadingSpinner />}>
                  <TeacherManagement />
                </Suspense>
              </DashboardLayout>
            </UnifiedDataProvider>
          </ApprovalProvider>
        </StudentProvider>
      </TeacherProvider>
    </ClassProvider>
  )
}