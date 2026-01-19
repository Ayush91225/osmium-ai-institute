'use client'

import { memo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useExams } from '@/contexts/ExamContext'
import StatusChip from './StatusChip'

function ExamGrid() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const { paginatedExams: filteredExams, deleteExam } = useExams()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (filteredExams.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
          isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
        }`}>
          <i className={`ph ph-exam text-2xl ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-400'
          }`} />
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${
          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
        }`}>
          No exams found
        </h3>
        <p className={`mb-6 max-w-sm mx-auto ${
          isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" suppressHydrationWarning>
      {filteredExams.map((exam) => (
        <div
          key={exam.id}
          className={`rounded-2xl p-4 sm:p-5 border duration-200 hover:shadow-md group ${
            isDarkMode 
              ? 'bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900/70 hover:border-zinc-700/70' 
              : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-medium text-xs sm:text-sm truncate ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {exam.name}
                </h3>
                {exam.isAI && <i className="ph ph-sparkle text-amber-500 text-xs flex-shrink-0" />}
              </div>
              <p className={`text-xs ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>{exam.subject}</p>
            </div>
            <StatusChip status={exam.status} variant={exam.status === 'Published' ? 'success' : exam.status === 'Active' || exam.status === 'Live' ? 'info' : 'default'} />
          </div>

          <div className="space-y-2 mb-3">
            <div className={`flex items-center gap-4 text-xs ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>
              <span className="flex items-center gap-1">
                <i className="ph ph-calendar-blank" />
                {new Date(exam.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <i className="ph ph-clock" />
                {exam.duration}m
              </span>
            </div>
            <div className={`flex items-center gap-4 text-xs ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>
              <span className="flex items-center gap-1">
                <i className="ph ph-question" />
                {exam.questions} questions
              </span>
              <span className="flex items-center gap-1">
                <i className="ph ph-users" />
                {exam.students}
              </span>
            </div>
          </div>

          <div className={`flex items-center gap-2 pt-3 border-t ${
            isDarkMode ? 'border-zinc-800/50' : 'border-gray-100'
          }`}>
            <button 
              onClick={() => router.push(`/dashboard/admin/exams/create-paper`)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isDarkMode ? 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Edit Questions
            </button>
            <button 
              onClick={() => router.push(`/dashboard/admin/exams/schedule?id=${exam.id}`)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isDarkMode 
                ? 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              Edit
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                if (confirm('Delete this test?')) deleteExam(exam.id)
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isDarkMode 
                ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' 
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}>
              <i className="ph ph-trash" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(ExamGrid)
