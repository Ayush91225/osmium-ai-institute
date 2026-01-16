'use client'

import '@/assets/css/dashboard/admin.css'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StudentExamView from '@/components/dashboard/student/StudentExamView'

export default function StudentExamsPage() {
  return (
    <DashboardLayout role="student">
      <StudentExamView />
    </DashboardLayout>
  )
}