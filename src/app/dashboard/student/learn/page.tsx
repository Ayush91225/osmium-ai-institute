import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import LearnDashboard from '@/components/dashboard/student/LearnDashboard'

export default function LearnPage() {
  return (
    <DashboardLayout role="student">
      <LearnDashboard />
    </DashboardLayout>
  )
}
