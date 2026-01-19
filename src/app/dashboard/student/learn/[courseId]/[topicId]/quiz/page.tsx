import TopicQuiz from '@/components/dashboard/student/TopicQuiz'

export default async function QuizPage({
  params
}: {
  params: Promise<{ courseId: string; topicId: string }>
}) {
  const { courseId, topicId } = await params

  return <TopicQuiz courseId={courseId} topicId={topicId} />
}
