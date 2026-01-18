import { Suspense } from 'react';
import { Metadata } from 'next';
import TeacherDashboardLayout from '@/components/dashboard/teacher/TeacherDashboardLayout';
import TeacherDashboardPage from '@/components/dashboard/teacher/TeacherDashboardPage';
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Teacher Dashboard - Osmium',
  description: 'Teacher dashboard with analytics and test management',
};

export default function TeacherDashboard() {
  return (
    <TeacherDashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <TeacherDashboardPage />
      </Suspense>
    </TeacherDashboardLayout>
  );
}
