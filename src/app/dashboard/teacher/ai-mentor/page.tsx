import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import AIMentorPage from '@/components/dashboard/teacher/AIMentorPage';
import LoadingSpinner from '@/components/dashboard/shared/LoadingSpinner';

const DashboardLayout = dynamic(() => import('@/components/dashboard/shared/DashboardLayout'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'AI Mentor - Osmium',
  description: 'AI-powered teaching assistant',
}

export default function AIMentor() {
  return (
    <DashboardLayout userType="teacher">
      <Suspense fallback={<LoadingSpinner />}>
        <AIMentorPage />
      </Suspense>
    </DashboardLayout>
  );
}
