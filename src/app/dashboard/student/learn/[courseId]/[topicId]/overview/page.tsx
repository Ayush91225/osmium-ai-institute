import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import TopicOverview from '@/components/dashboard/student/TopicOverview'
import TopicSidebar from '@/components/dashboard/student/TopicSidebar'

const topicNames: Record<string, string> = {
  '1': 'Introduction to DSA'
}

export default async function OverviewPage({ 
  params 
}: { 
  params: Promise<{ courseId: string; topicId: string }> 
}) {
  const { courseId, topicId } = await params
  const topicName = topicNames[topicId] || 'Introduction to DSA'
  
  return (
    <DashboardLayout role="student">
      <div className="flex h-screen overflow-hidden fixed inset-0 lg:left-[280px] top-0">
        <TopicOverview courseId={courseId} topicId={topicId} />
        <TopicSidebar courseId={courseId} topicId={topicId} topicName={topicName} />
      </div>
    </DashboardLayout>
  )
}
