'use client'

import { ClassProvider } from '@/contexts/ClassContext'
import { TeacherProvider } from '@/contexts/TeacherContext'
import { StudentProvider } from '@/contexts/StudentContext'
import { ApprovalProvider } from '@/contexts/ApprovalContext'
import { UnifiedDataProvider } from '@/contexts/UnifiedDataContext'
import ClassDetailView from '@/components/dashboard/admin/ClassDetailView'

export default function ClassDetailPage() {
  return (
    <ClassProvider>
      <TeacherProvider>
        <StudentProvider>
          <ApprovalProvider>
            <UnifiedDataProvider>
              <ClassDetailView />
            </UnifiedDataProvider>
          </ApprovalProvider>
        </StudentProvider>
      </TeacherProvider>
    </ClassProvider>
  )
}
