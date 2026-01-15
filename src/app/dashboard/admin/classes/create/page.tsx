'use client'

import { ClassProvider } from '@/contexts/ClassContext'
import CreateClassForm from '@/components/dashboard/admin/CreateClassForm'

export default function CreateClassPage() {
  return (
    <ClassProvider>
      <CreateClassForm />
    </ClassProvider>
  )
}
