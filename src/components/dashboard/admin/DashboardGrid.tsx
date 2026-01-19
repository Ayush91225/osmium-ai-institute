'use client'

import { memo, Suspense } from 'react'
import dynamic from 'next/dynamic'
import LoadingCard from '../shared/LoadingCard'

// Dynamic imports for better performance
const TeachersSection = dynamic(() => import('./TeachersSection'), {
  loading: () => <LoadingCard />
})

const QuickActionsSection = dynamic(() => import('./QuickActionsSection'), {
  loading: () => <LoadingCard />
})

const SubjectsSection = dynamic(() => import('./SubjectsSection'), {
  loading: () => <LoadingCard />
})

const ClassesSection = dynamic(() => import('./ClassesSection'), {
  loading: () => <LoadingCard />
})

const TestsSection = dynamic(() => import('./TestsSection'), {
  loading: () => <LoadingCard />
})

const ActivitySection = dynamic(() => import('./ActivitySection'), {
  loading: () => <LoadingCard />
})

const MockTestsSection = dynamic(() => import('./MockTestsSection'), {
  loading: () => <LoadingCard />
})

function DashboardGrid() {
  return (
    <div className="space-y-6">
      {/* Row 1: Teachers + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<LoadingCard />}>
          <TeachersSection />
        </Suspense>
        <Suspense fallback={<LoadingCard />}>
          <QuickActionsSection />
        </Suspense>
      </div>
      
      {/* Row 2: Subjects + Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<LoadingCard />}>
          <SubjectsSection />
        </Suspense>
        <Suspense fallback={<LoadingCard />}>
          <ClassesSection />
        </Suspense>
      </div>
      
      {/* Row 3: Tests + Activity + Mock Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Suspense fallback={<LoadingCard />}>
          <TestsSection />
        </Suspense>
        <Suspense fallback={<LoadingCard />}>
          <ActivitySection />
        </Suspense>
        <Suspense fallback={<LoadingCard />}>
          <MockTestsSection />
        </Suspense>
      </div>
    </div>
  )
}

export default memo(DashboardGrid)