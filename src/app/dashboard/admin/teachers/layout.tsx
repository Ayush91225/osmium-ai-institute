import { TeacherProvider } from '@/contexts/TeacherContext'

export default function TeachersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TeacherProvider>
      {children}
    </TeacherProvider>
  )
}