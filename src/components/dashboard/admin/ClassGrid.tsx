'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useClasses, Class } from '@/contexts/ClassContext'
import { useStudents } from '@/contexts/StudentContext'
import StatusChip from './StatusChip'

interface ClassGridProps {
  classes: Class[]
}

export default function ClassGrid({ classes }: ClassGridProps) {
  const { isDarkMode } = useDarkMode()
  const { students } = useStudents()
  const { 
    branches, 
    courses, 
    subjects,
    setClassToDelete,
    setIsDeleteModalOpen,
    setSelectedClass,
    setIsClassModalOpen,
    duplicateClass
  } = useClasses()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  const getRealStudentCount = (className: string) => {
    return students.filter(s => s.class === className).length
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (classes.length === 0) {
    return (
      <div className={`p-12 rounded-2xl border text-center ${
        isDarkMode 
          ? 'bg-zinc-900/50 border-zinc-800/50' 
          : 'bg-white border-gray-100'
      }`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
        }`}>
          <i className={`ph ph-graduation-cap text-2xl ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-400'
          }`} />
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${
          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
        }`}>
          No classes or batches found
        </h3>
        <p className={`text-sm ${
          isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>
          Create your first class or batch to get started
        </p>
      </div>
    )
  }

  const getBranchName = (branchId: string) => 
    branches.find(b => b.id === branchId)?.name || 'Unknown'
  
  const getCourseName = (courseId: string) => 
    courses.find(c => c.id === courseId)?.name || 'Unknown'

  const getSubjectCount = (subjectIds: string[]) => subjectIds.length

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="rounded-2xl p-4 sm:p-5 border duration-200 hover:shadow-md cursor-pointer group bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xs sm:text-sm font-semibold mb-1 line-clamp-1 text-gray-900">
                  {cls.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {cls.code}
                </p>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:static sm:opacity-100">
                <button className="p-1 sm:p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-500 hover:text-gray-700">
                  <i className="ph ph-eye text-xs" />
                </button>
                <button className="p-1 sm:p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-500 hover:text-gray-700">
                  <i className="ph ph-copy text-xs" />
                </button>
                <button className="p-1 sm:p-1.5 rounded-lg transition-colors duration-200 hover:bg-red-50 text-red-500 hover:text-red-700">
                  <i className="ph ph-trash text-xs" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 text-xs">
                <i className="ph ph-buildings text-gray-500" />
                <span className="text-gray-700">
                  {getBranchName(cls.branchId)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <i className="ph ph-graduation-cap text-gray-500" />
                <span className="text-gray-700">
                  {getCourseName(cls.courseId)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="text-xs">
                  <span className="text-gray-500">Students: </span>
                  <span className="font-medium text-gray-900">
                    {getRealStudentCount(cls.name)}/{cls.capacity}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Subjects: </span>
                  <span className="font-medium text-gray-900">
                    {getSubjectCount(cls.subjects)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {classes.map((cls) => (
        <div
          key={cls.id}
          className={`rounded-2xl p-4 sm:p-5 border duration-200 hover:shadow-md cursor-pointer group ${
            mounted && isDarkMode 
              ? 'bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900/70 hover:border-zinc-700/70' 
              : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
          }`}
          onClick={() => window.location.href = `/dashboard/admin/classes/${cls.code}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className={`text-xs sm:text-sm font-semibold mb-1 line-clamp-1 ${
                mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                {cls.name}
              </h3>
              <p className={`text-xs ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {cls.code}
              </p>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:static sm:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.location.href = `/dashboard/admin/classes/${cls.code}`
                }}
                className={`p-1 sm:p-1.5 rounded-lg transition-colors duration-200 ${
                  mounted && isDarkMode 
                    ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
                title="View Details"
              >
                <i className="ph ph-eye text-xs" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedClass(cls)
                  setIsClassModalOpen(true)
                }}
                className={`p-1 sm:p-1.5 rounded-lg transition-colors duration-200 ${
                  mounted && isDarkMode 
                    ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
                title="Edit Class"
              >
                <i className="ph ph-pencil text-xs" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  duplicateClass(cls.id)
                }}
                className={`p-1 sm:p-1.5 rounded-lg transition-colors duration-200 ${
                  mounted && isDarkMode 
                    ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
                title="Duplicate Class"
              >
                <i className="ph ph-copy text-xs" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setClassToDelete(cls)
                  setIsDeleteModalOpen(true)
                }}
                className={`p-1 sm:p-1.5 rounded-lg transition-colors duration-200 ${
                  mounted && isDarkMode 
                    ? 'hover:bg-red-900/20 text-red-400 hover:text-red-300' 
                    : 'hover:bg-red-50 text-red-500 hover:text-red-700'
                }`}
              >
                <i className="ph ph-trash text-xs" />
              </button>
            </div>
          </div>

          <div className="space-y-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 text-xs">
              <i className={`ph ph-buildings ${mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
              <span className={mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-700'}>
                {getBranchName(cls.branchId)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <i className={`ph ph-graduation-cap ${mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
              <span className={mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-700'}>
                {getCourseName(cls.courseId)}
              </span>
            </div>
          </div>

          <div className={`flex items-center justify-between pt-3 border-t ${
            mounted && isDarkMode ? 'border-zinc-800/50' : 'border-gray-100'
          }`}>
            <div className="flex items-center gap-3">
              <div className="text-xs">
                <span className={mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'}>Students: </span>
                <span className={`font-medium ${mounted && isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                  {getRealStudentCount(cls.name)}/{cls.capacity}
                </span>
              </div>
              <div className="text-xs">
                <span className={mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'}>Subjects: </span>
                <span className={`font-medium ${mounted && isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                  {getSubjectCount(cls.subjects)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
