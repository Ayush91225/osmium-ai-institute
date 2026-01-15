'use client'

import '@/assets/css/dashboard/admin.css'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import { ExamProvider } from '@/contexts/ExamContext'
import ExamHeader from '@/components/dashboard/admin/ExamHeader'
import AIBanner from '@/components/dashboard/admin/AIBanner'
import ExamStats from '@/components/dashboard/admin/ExamStats'
import ExamFilters from '@/components/dashboard/admin/ExamFilters'
import ExamGrid from '@/components/dashboard/admin/ExamGrid'

export default function ExamsPage() {
  return (
    <ExamProvider>
      <DashboardLayout>
        <div className="space-y-6">
          <ExamHeader />
          <AIBanner />
          <ExamStats />
          <ExamFilters />
          <ExamGrid />
        </div>
      </DashboardLayout>
    </ExamProvider>
  )
}
