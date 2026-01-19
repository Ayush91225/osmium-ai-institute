'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useClasses, Class } from '@/contexts/ClassContext'

interface ClassTableProps {
  classes: Class[]
}

export default function ClassTable({ classes }: ClassTableProps) {
  const { isDarkMode } = useDarkMode()
  const { 
    branches, 
    courses,
    setClassToDelete,
    setIsDeleteModalOpen,
    duplicateClass
  } = useClasses()
  const [mounted, setMounted] = useState(false)

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

  if (!mounted) {
    return (
      <div className="rounded-2xl border overflow-hidden bg-white border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Class Name</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Code</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Location</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Course</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Students</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Subjects</th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {classes.map((cls) => (
                <tr key={cls.id} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{cls.name}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{cls.code}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{getBranchName(cls.branchId)}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{getCourseName(cls.courseId)}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{cls.currentStrength}/{cls.capacity}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{cls.subjects.length}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg text-gray-500">
                        <i className="ph ph-eye text-sm" />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-500">
                        <i className="ph ph-copy text-sm" />
                      </button>
                      <button className="p-1.5 rounded-lg text-red-500">
                        <i className="ph ph-trash text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border overflow-hidden ${
      mounted && isDarkMode 
        ? 'bg-zinc-900/50 border-zinc-800/50' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className={`${
            mounted && isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'
          }`}>
            <tr>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Class Name
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Code
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Location
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Course
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Students
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Subjects
              </th>
              <th className={`px-5 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            mounted && isDarkMode ? 'divide-zinc-800/50' : 'divide-gray-100'
          }`}>
            {classes.map((cls) => (
              <tr
                key={cls.id}
                className={`cursor-pointer group ${
                  mounted && isDarkMode 
                    ? 'hover:bg-zinc-800/30' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => window.location.href = `/dashboard/admin/classes/${cls.code}`}
              >
                <td className={`px-5 py-4 text-sm font-medium ${
                  mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {cls.name}
                </td>
                <td className={`px-5 py-4 text-sm ${
                  mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                }`}>
                  {cls.code}
                </td>
                <td className={`px-5 py-4 text-sm ${
                  mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                }`}>
                  {getBranchName(cls.branchId)}
                </td>
                <td className={`px-5 py-4 text-sm ${
                  mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                }`}>
                  {getCourseName(cls.courseId)}
                </td>
                <td className={`px-5 py-4 text-sm ${
                  mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                }`}>
                  {cls.currentStrength}/{cls.capacity}
                </td>
                <td className={`px-5 py-4 text-sm ${
                  mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                }`}>
                  {cls.subjects.length}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `/dashboard/admin/classes/${cls.code}`
                      }}
                      className={`p-1.5 rounded-lg ${
                        mounted && isDarkMode 
                          ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300' 
                          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <i className="ph ph-eye text-sm" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        duplicateClass(cls.id)
                      }}
                      className={`p-1.5 rounded-lg ${
                        mounted && isDarkMode 
                          ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300' 
                          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <i className="ph ph-copy text-sm" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setClassToDelete(cls)
                        setIsDeleteModalOpen(true)
                      }}
                      className={`p-1.5 rounded-lg ${
                        mounted && isDarkMode 
                          ? 'hover:bg-red-900/20 text-red-400 hover:text-red-300' 
                          : 'hover:bg-red-50 text-red-500 hover:text-red-700'
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
    </div>
  )
}
