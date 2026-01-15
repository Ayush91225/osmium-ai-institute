import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { StudentProvider } from '@/contexts/StudentContext'
import { TeacherProvider } from '@/contexts/TeacherContext'
import { ClassProvider } from '@/contexts/ClassContext'
import { ApprovalProvider } from '@/contexts/ApprovalContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { UnifiedDataProvider } from '@/contexts/UnifiedDataContext'
import AdminDashboard from '@/components/dashboard/admin/AdminDashboard'
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner'
import '@/assets/css/dashboard/admin.css'

// Dynamic imports for better code splitting
const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Admin Dashboard | Osmium AI Institute',
  description: 'Comprehensive admin dashboard for institute management',
  robots: 'noindex, nofollow', // Private admin area
}

export default function AdminDashboardPage() {
  return (
    <ClassProvider>
      <TeacherProvider>
        <StudentProvider>
          <ApprovalProvider>
            <NotificationProvider>
              <UnifiedDataProvider>
                <DashboardLayout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AdminDashboard />
                  </Suspense>
                </DashboardLayout>
              </UnifiedDataProvider>
            </NotificationProvider>
          </ApprovalProvider>
        </StudentProvider>
      </TeacherProvider>
    </ClassProvider>
  )
}