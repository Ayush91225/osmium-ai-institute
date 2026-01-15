import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StudentDashboard from '@/components/dashboard/student/StudentDashboard'

export default function StudentDashboardPage() {
  return (
    <DashboardLayout role="student">
      <StudentDashboard />
    </DashboardLayout>
  )
}
