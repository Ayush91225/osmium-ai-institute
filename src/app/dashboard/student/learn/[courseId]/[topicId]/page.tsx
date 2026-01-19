import TopicOverview from '@/components/dashboard/student/TopicOverview'

export default async function TopicPage({ 
  params 
}: { 
  params: Promise<{ courseId: string; topicId: string }> 
}) {
  const { courseId, topicId } = await params
  return <TopicOverview courseId={courseId} topicId={topicId} />
}
