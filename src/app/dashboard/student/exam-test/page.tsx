import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import ExamTestList from '@/components/dashboard/student/ExamTestList'

export default function ExamTestPage() {
  return (
    <DashboardLayout role="student">
      <ExamTestList />
    </DashboardLayout>
  )
}
