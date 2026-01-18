import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import StudentAnalyticsPage from '@/components/dashboard/teacher/student-analytics/StudentAnalyticsPage';
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner';

const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Student Analytics - Osmium',
  description: 'View student performance analytics',
}

export default function TeacherStudentAnalytics() {
  return (
    <DashboardLayout userType="teacher">
      <Suspense fallback={<LoadingSpinner />}>
        <StudentAnalyticsPage />
      </Suspense>
    </DashboardLayout>
  );
}
