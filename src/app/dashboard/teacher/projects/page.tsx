import { Suspense } from 'react';
import { Metadata } from 'next';
import TeacherDashboardLayout from '@/components/dashboard/teacher/TeacherDashboardLayout';
import ProjectManagementPage from '@/components/dashboard/teacher/ProjectManagementPage';
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Project Management - Osmium',
  description: 'Manage student projects and submissions',
};

export default function ProjectManagement() {
  return (
    <TeacherDashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <ProjectManagementPage />
      </Suspense>
    </TeacherDashboardLayout>
  );
}
