import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import TopicFlashcard from '@/components/dashboard/student/TopicFlashcard'
import TopicSidebar from '@/components/dashboard/student/TopicSidebar'

export default async function FlashcardPage({
  params
}: {
  params: Promise<{ courseId: string; topicId: string }>
}) {
  const { courseId, topicId } = await params

  return (
    <DashboardLayout role="student">
      <div className="flex h-screen overflow-hidden">
        <TopicFlashcard courseId={courseId} topicId={topicId} />
        <TopicSidebar 
          courseId={courseId} 
          topicId={topicId} 
          topicName="Introduction to DSA"
          activePage="flashcard"
        />
      </div>
    </DashboardLayout>
  )
}
