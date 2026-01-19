'use client'

import { useDarkMode } from '@/contexts/DarkModeContext'
import { useRouter } from 'next/navigation'
import BlurredImage from '@/components/BlurredImage'

interface TestCardProps {
  test: {
    id: string
    name: string
    date: string
    score?: number
    grade?: string
    status?: string
    duration?: string
    subject?: string
    attempts?: number
    bestScore?: number
    total?: number
    correct?: number
    time?: string
    lesson?: string
    teacher?: string
  }
  type: 'exam' | 'mock' | 'quiz'
  studentId: string
}

export default function TestCard({ test, type, studentId }: TestCardProps) {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()

  const getTypeLabel = () => {
    switch (type) {
      case 'exam': return 'Institute Exam'
      case 'mock': return 'Mock Test'
      case 'quiz': return 'Lesson Quiz'
      default: return 'Test'
    }
  }

  const handleCardClick = () => {
    router.push(`/dashboard/admin/students/profile/${studentId}/tests/${test.id}`)
  }

  return (
    <div 
      onClick={handleCardClick}
      className={`rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
        isDarkMode 
          ? 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/70' 
          : 'bg-white/50 border-gray-200/50 hover:border-gray-300/70'
      }`}
    >
      {/* Iframe Placeholder */}
      <div className={`w-full h-40 relative overflow-hidden rounded-t-2xl border-b ${
        isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/50 border-gray-200/30'
      }`}>
        <BlurredImage className="w-full h-full object-cover" />
      </div>

      {/* Test Details */}
      <div className="p-4">
        {/* Title */}
        <div className="mb-4">
          <h3 className={`text-lg font-bold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {test.name || test.lesson}
          </h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            {test.subject || 'General'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-2 gap-px rounded-xl overflow-hidden mb-4 ${
          isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-200/30'
        }`}>
          {/* Date */}
          <div className={`p-3 flex items-start gap-2 ${
            isDarkMode ? 'bg-zinc-900/60' : 'bg-white/60'
          }`}>
            <div className="flex-shrink-0">
              <i className={`ph ph-calendar text-sm ${
                isDarkMode ? 'text-zinc-600' : 'text-gray-500'
              }`} />
            </div>
            <div>
              <p className={`text-xs mb-1 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>Conducted on:</p>
              <p className={`text-sm font-light ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Score/Marks */}
          <div className={`p-3 flex items-start gap-2 ${
            isDarkMode ? 'bg-zinc-900/60 border-l border-zinc-800/30' : 'bg-white/60 border-l border-gray-200/30'
          }`}>
            <div className="flex-shrink-0">
              <i className={`ph ph-trophy text-sm ${
                isDarkMode ? 'text-zinc-600' : 'text-gray-500'
              }`} />
            </div>
            <div>
              <p className={`text-xs mb-1 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {test.score !== undefined ? 'Score obtained:' : 'Duration:'}
              </p>
              <p className={`text-sm font-light ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {test.score !== undefined 
                  ? (test.total ? `${test.score}% (${test.correct}/${test.total})` : `${test.score}%`)
                  : (test.duration || test.time || 'N/A')
                }
              </p>
            </div>
          </div>
        </div>

        {/* Scheduled by Section */}
        {test.teacher && type === 'exam' && (
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={`https://api.dicebear.com/9.x/glass/svg?seed=${test.teacher.toLowerCase().replace(' ', '-')}&backgroundColor=4747eb,4762eb,477eeb,4799eb,47b4eb,47d0eb,47eb47,47eb62,47eb7e,47eb99,47ebb4,47ebd0,47ebeb,6247eb,62eb47,7e47eb,7eeb47,9947eb,99eb47,b447eb,b4eb47,d047eb,d0eb47,eb4747,eb4762,eb477e,eb4799,eb47d0,eb47eb,eb6247,eb7e47,eb9947,ebb447,ebd047,ebeb47,ffd5dc,ffdfbf,b6e3f4,c0aede,d1d4f9&backgroundType=gradientLinear&backgroundRotation=0,360,10,20,30`}
              alt={test.teacher}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className={`text-xs mb-1 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>Scheduled by:</p>
              <p className={`text-sm font-light ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{test.teacher}</p>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {test.grade && (
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                isDarkMode ? 'bg-zinc-800/50 text-zinc-300' : 'bg-gray-100 text-gray-700'
              }`}>
                Grade: {test.grade}
              </span>
            )}
            {test.attempts && (
              <span className={`text-xs ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                {test.attempts} attempts
              </span>
            )}
            {test.bestScore && test.bestScore !== test.score && (
              <span className={`text-xs ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                Best: {test.bestScore}%
              </span>
            )}
          </div>
          {test.status === 'completed' && (
            <div className="flex items-center gap-2">
              <i className={`ph ph-check-circle text-sm ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`} />
              <span className={`text-xs font-medium ${
                isDarkMode ? 'text-zinc-300' : 'text-gray-700'
              }`}>Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}