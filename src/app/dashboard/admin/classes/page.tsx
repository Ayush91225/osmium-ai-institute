'use client'

import '@/assets/css/dashboard/admin.css'
import { ClassProvider } from '@/contexts/ClassContext'
import { TeacherProvider } from '@/contexts/TeacherContext'
import { StudentProvider } from '@/contexts/StudentContext'
import { ApprovalProvider } from '@/contexts/ApprovalContext'
import { UnifiedDataProvider } from '@/contexts/UnifiedDataContext'
import ClassManagement from '@/components/dashboard/admin/ClassManagement'

export default function ClassesPage() {
  return (
    <ClassProvider>
      <TeacherProvider>
        <StudentProvider>
          <ApprovalProvider>
            <UnifiedDataProvider>
              <ClassManagement />
            </UnifiedDataProvider>
          </ApprovalProvider>
        </StudentProvider>
      </TeacherProvider>
    </ClassProvider>
  )
}
