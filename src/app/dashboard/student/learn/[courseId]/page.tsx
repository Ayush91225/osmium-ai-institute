import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import CourseDetail from '@/components/dashboard/student/CourseDetail'

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  return (
    <DashboardLayout role="student">
      <CourseDetail courseId={courseId} />
    </DashboardLayout>
  )
}
