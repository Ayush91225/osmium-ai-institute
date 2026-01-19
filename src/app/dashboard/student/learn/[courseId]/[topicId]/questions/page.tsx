import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import TopicQuestions from '@/components/dashboard/student/TopicQuestions'
import TopicSidebar from '@/components/dashboard/student/TopicSidebar'

const topicNames: Record<string, string> = {
  '1': 'Introduction to DSA'
}

export default async function QuestionsPage({ 
  params 
}: { 
  params: Promise<{ courseId: string; topicId: string }> 
}) {
  const { courseId, topicId } = await params
  const topicName = topicNames[topicId] || 'Introduction to DSA'
  
  return (
    <DashboardLayout role="student">
      <div className="flex h-screen overflow-hidden">
        <TopicQuestions courseId={courseId} topicId={topicId} />
        <TopicSidebar courseId={courseId} topicId={topicId} topicName={topicName} activePage="questions" />
      </div>
    </DashboardLayout>
  )
}
