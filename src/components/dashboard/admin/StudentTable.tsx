'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { Student, useStudents } from '@/contexts/StudentContext'
import { useRouter, usePathname } from 'next/navigation'
import StatusChip from './StatusChip'
import DeleteConfirmModal from './DeleteConfirmModal'

interface StudentTableProps {
  students: Student[]
}

function StudentTable({ students }: StudentTableProps) {
  const { isDarkMode } = useDarkMode()
  const { deleteStudent } = useStudents()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; student: Student | null }>({ isOpen: false, student: null })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStudentClick = (student: Student) => {
    const isTeacher = pathname.includes('/teacher/')
    if (isTeacher) {
      router.push('/dashboard/teacher/students/profile')
    } else {
      router.push(`/dashboard/admin/students/profile/${student.rollNumber}`)
    }
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
      <div className="rounded-xl border overflow-hidden bg-white border-gray-200/60">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Student</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Class</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Roll No</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Subjects</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Performance</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-200 rounded w-24" />
                        <div className="h-2 bg-gray-200 rounded w-32" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4"><div className="h-3 bg-gray-200 rounded w-16" /></td>
                  <td className="px-4 py-4"><div className="h-3 bg-gray-200 rounded w-12" /></td>
                  <td className="px-4 py-4"><div className="h-3 bg-gray-200 rounded w-20" /></td>
                  <td className="px-4 py-4"><div className="h-3 bg-gray-200 rounded w-8" /></td>
                  <td className="px-4 py-4"><div className="h-5 bg-gray-200 rounded-full w-16" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className={`text-center py-16 rounded-xl border ${
        isDarkMode 
          ? 'bg-zinc-900/60 border-zinc-800/40 text-zinc-400' 
          : 'bg-white/80 border-gray-200/60 text-gray-500'
      }`}>
        <i className="ph ph-users text-4xl mb-4" />
        <p className="text-sm">No students found</p>
      </div>
    )
  }

  return (
    <div className={`rounded-xl border overflow-hidden ${
      isDarkMode 
        ? 'bg-zinc-900/60 border-zinc-800/40' 
        : 'bg-white/80 border-gray-200/60'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${
            isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'
          }`}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Student
              </th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Class
              </th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Roll No
              </th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Subjects
              </th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Performance
              </th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Status
              </th>
              <th className={`px-4 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            isDarkMode ? 'divide-zinc-800/50' : 'divide-gray-100'
          }`}>
            {students.map((student) => (
              <tr
                key={student.id}
                className={`cursor-pointer group ${
                  isDarkMode 
                    ? 'hover:bg-zinc-800/30' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleStudentClick(student)}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${student.rollNumber}&radius=0&backgroundType[]&eyes=variant01,variant02,variant03,variant05,variant06,variant04,variant07,variant08,variant09,variant10,variant12,variant11,variant13,variant14,variant15,variant26,variant25,variant24,variant22,variant23,variant21,variant20&glassesProbability=30&mouth=variant01,variant02,variant03,variant04,variant05,variant07,variant08,variant09,variant10,variant11,variant12,variant13,variant14,variant15,variant16,variant17,variant18,variant19,variant20,variant21,variant22,variant23,variant24,variant25,variant26,variant27,variant28,variant29,variant30`}
                        alt={`${student.name} avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-medium ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>
                        {student.name}
                      </div>
                      <div className={`text-xs ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                      }`}>
                        {student.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`px-4 py-4 text-sm ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-900'
                }`}>
                  {student.class}
                </td>
                <td className={`px-4 py-4 text-sm font-mono ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-900'
                }`}>
                  {student.rollNumber}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {student.subjects.slice(0, 2).map((subject, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 text-xs rounded-md border ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 text-zinc-300 border-zinc-700/50' 
                            : 'bg-gray-50 text-gray-600 border-gray-200/50'
                        }`}
                      >
                        {subject}
                      </span>
                    ))}
                    {student.subjects.length > 2 && (
                      <span className={`px-2 py-1 text-xs rounded-md border ${
                        isDarkMode 
                          ? 'bg-zinc-800/50 text-zinc-300 border-zinc-700/50' 
                          : 'bg-gray-50 text-gray-600 border-gray-200/50'
                      }`}>
                        +{student.subjects.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {student.performance ? (
                    <div className="flex items-center gap-1">
                      <i className="ph ph-star-fill text-yellow-500 text-xs" />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-900'
                      }`}>
                        {student.performance}
                      </span>
                    </div>
                  ) : (
                    <span className={`text-sm ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`}>
                      N/A
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <StatusChip 
                    status={student.status} 
                    variant={student.status === 'active' ? 'success' : 'default'}
                  />
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => handleDeleteClick(e, student)}
                      className={`p-1.5 rounded-lg ${
                        isDarkMode 
                          ? 'text-red-400 hover:bg-red-500/10' 
                          : 'text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <i className="ph ph-trash text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
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

export default memo(StudentTable)