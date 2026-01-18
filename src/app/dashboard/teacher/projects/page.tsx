import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ProjectManagementPage from '@/components/dashboard/teacher/ProjectManagementPage';
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner';

const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Project Management - Osmium',
  description: 'Manage student projects and submissions',
}

export default function ProjectManagement() {
  return (
    <DashboardLayout userType="teacher">
      <Suspense fallback={<LoadingSpinner />}>
        <ProjectManagementPage />
      </Suspense>
    </DashboardLayout>
  );
}
