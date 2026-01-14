'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { Student, useStudents } from '@/contexts/StudentContext'
import { useRouter } from 'next/navigation'
import StatusChip from './StatusChip'
import DeleteConfirmModal from './DeleteConfirmModal'

interface StudentGridProps {
  students: Student[]
}

function StudentGrid({ students }: StudentGridProps) {
  const { isDarkMode } = useDarkMode()
  const { deleteStudent } = useStudents()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; student: Student | null }>({ isOpen: false, student: null })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStudentClick = (student: Student) => {
    router.push(`/dashboard/admin/students/profile/${student.rollNumber}`)
  }

  const handleDeleteClick = (e: React.MouseEvent, student: Student) => {
    e.stopPropagation()
    setDeleteModal({ isOpen: true, student })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.student) {
      deleteStudent(deleteModal.student.id)
      setDeleteModal({ isOpen: false, student: null })
    }
  }

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className={`rounded-xl p-4 border ${
              isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white border-gray-200/60'
            }`}>
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className={`text-center py-16 rounded-xl border ${
        mounted && isDarkMode 
          ? 'bg-zinc-900/60 border-zinc-800/40 text-zinc-400' 
          : 'bg-white/80 border-gray-200/60 text-gray-500'
      }`}>
        <i className="ph ph-users text-4xl mb-4" />
        <p className="text-sm">No students found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {students.map((student) => (
        <div
          key={student.id}
          className={`rounded-xl p-4 border  hover:shadow-sm cursor-pointer group ${
            mounted && isDarkMode 
              ? 'bg-zinc-900/60 border-zinc-800/40 hover:bg-zinc-900/80' 
              : 'bg-white/80 border-gray-200/60 hover:border-gray-300/80'
          }`}
          onClick={() => handleStudentClick(student)}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${student.rollNumber}&radius=0&backgroundType[]&eyes=variant01,variant02,variant03,variant05,variant06,variant04,variant07,variant08,variant09,variant10,variant12,variant11,variant13,variant14,variant15,variant26,variant25,variant24,variant22,variant23,variant21,variant20&glassesProbability=30&mouth=variant01,variant02,variant03,variant04,variant05,variant07,variant08,variant09,variant10,variant11,variant12,variant13,variant14,variant15,variant16,variant17,variant18,variant19,variant20,variant21,variant22,variant23,variant24,variant25,variant26,variant27,variant28,variant29,variant30`}
                alt={`${student.name} avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-sm truncate ${
                mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                {student.name}
              </h3>
              <p className={`text-xs truncate ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {student.rollNumber}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-xs">
              <span className={`${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {student.class}
              </span>
              <span className={`${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Grade {student.grade}
              </span>
            </div>
            
            {student.performance && (
              <div className="flex items-center justify-between text-xs">
                <span className={`${
                  mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Performance
                </span>
                <div className="flex items-center gap-1">
                  <i className="ph ph-star-fill text-yellow-500 text-xs" />
                  <span className={`font-medium ${
                    mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                  }`}>
                    {student.performance}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Subjects */}
          <div className="flex flex-wrap gap-1 mb-3">
            {student.subjects.slice(0, 3).map((subject, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 text-xs rounded-md border ${
                  mounted && isDarkMode 
                    ? 'bg-zinc-800/50 text-zinc-300 border-zinc-700/50' 
                    : 'bg-gray-50 text-gray-600 border-gray-200/50'
                }`}
              >
                {subject}
              </span>
            ))}
            {student.subjects.length > 3 && (
              <span className={`px-2 py-1 text-xs rounded-md border ${
                mounted && isDarkMode 
                  ? 'bg-zinc-800/50 text-zinc-300 border-zinc-700/50' 
                  : 'bg-gray-50 text-gray-600 border-gray-200/50'
              }`}>
                +{student.subjects.length - 3}
              </span>
            )}
          </div>

          {/* Status */}
          <div className="flex justify-between items-center">
            <StatusChip 
              status={student.status} 
              variant={student.status === 'active' ? 'success' : 'default'}
            />
            <div className="opacity-0 group-hover:opacity-100">
              <button
                onClick={(e) => handleDeleteClick(e, student)}
                className={`p-1.5 rounded-lg ${
                  mounted && isDarkMode 
                    ? 'text-red-400 hover:bg-red-500/10' 
                    : 'text-red-500 hover:bg-red-50'
                }`}
              >
                <i className="ph ph-trash text-sm" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, student: null })}
        onConfirm={handleDeleteConfirm}
        teacherName={deleteModal.student?.name || ''}
        type="student"
      />
    </div>
  )
}

export default memo(StudentGrid)