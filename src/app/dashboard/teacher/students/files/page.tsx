import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import StudentFilesPage from '@/components/dashboard/teacher/student-files/StudentFilesPage';
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner';

const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Student Files - Osmium',
  description: 'Manage student files and submissions',
}

export default function TeacherStudentFiles() {
  return (
    <DashboardLayout userType="teacher">
      <Suspense fallback={<LoadingSpinner />}>
        <StudentFilesPage />
      </Suspense>
    </DashboardLayout>
  );
}
