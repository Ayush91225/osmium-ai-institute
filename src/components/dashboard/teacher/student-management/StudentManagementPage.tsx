'use client'

import { ClassProvider } from '@/contexts/ClassContext'
import { TeacherProvider } from '@/contexts/TeacherContext'
import { StudentProvider } from '@/contexts/StudentContext'
import { ApprovalProvider } from '@/contexts/ApprovalContext'
import { UnifiedDataProvider } from '@/contexts/UnifiedDataContext'
import StudentManagement from '@/components/dashboard/admin/StudentManagement'
import '@/assets/css/dashboard/admin.css'

export default function TeacherStudentManagement() {
  return (
    <ClassProvider>
      <TeacherProvider>
        <StudentProvider>
          <ApprovalProvider>
            <UnifiedDataProvider>
              <StudentManagement userType="teacher" />
            </UnifiedDataProvider>
          </ApprovalProvider>
        </StudentProvider>
      </TeacherProvider>
    </ClassProvider>
  )
}
