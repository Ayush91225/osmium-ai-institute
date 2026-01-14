'use client'

import { StudentProvider } from '@/contexts/StudentContext'
import StudentManagement from '@/components/dashboard/admin/StudentManagement'
import '@/assets/css/dashboard/admin.css'

export default function StudentsPage() {
  return (
    <StudentProvider>
      <StudentManagement />
    </StudentProvider>
  )
}