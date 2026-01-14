'use client'

import { memo, useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  subjects: string[]
  classes: string[]
  department: string
  joiningDate: string
  status: 'active' | 'inactive'
  experience: number
  qualification: string
}

interface TeacherGridProps {
  teachers: Teacher[]
  onTeacherSelect: (teacher: Teacher) => void
  onEditTeacher: (teacher: Teacher) => void
  onDeleteTeacher: (teacher: Teacher) => void
}

function TeacherGrid({ teachers, onTeacherSelect, onEditTeacher, onDeleteTeacher }: TeacherGridProps) {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTeacherClick = (teacher: Teacher) => {
    router.push(`/dashboard/admin/teachers/profile/${teacher.id}`)
  }

  const generateAvatar = useMemo(() => (teacherId: string) => {
    const seed = encodeURIComponent(teacherId)
    const backgroundColor = '4747eb,4762eb,477eeb,4799eb,47b4eb,47d0eb,47eb47,47eb62,47eb7e,47eb99,47ebb4,47ebd0,47ebeb,6247eb,62eb47,7e47eb,7eeb47,9947eb,99eb47,b447eb,b4eb47,d047eb,d0eb47,eb4747,eb4762,eb477e,eb4799,eb47d0,eb47eb,eb6247,eb7e47,eb9947,ebb447,ebd047,ebeb47,ffd5dc,ffdfbf,b6e3f4,c0aede,d1d4f9'
    const backgroundType = 'gradientLinear'
    const backgroundRotation = '0,360,10,20,30'
    
    return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=${backgroundColor}&backgroundType=${backgroundType}&backgroundRotation=${backgroundRotation}`
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="rounded-2xl p-4 sm:p-5 border duration-200 hover:shadow-md cursor-pointer group bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
            onClick={() => handleTeacherClick(teacher)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={generateAvatar(teacher.id)}
                    alt={`${teacher.name} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-xs sm:text-sm truncate transition-colors duration-200 text-gray-900">
                    {teacher.name}
                  </h3>
                  <p className="text-xs mt-0.5 truncate transition-colors duration-200 text-gray-500">
                    {teacher.department}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:static sm:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEditTeacher(teacher)
                  }}
                  className="p-1 sm:p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                >
                  <i className="ph ph-pencil text-xs" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteTeacher(teacher)
                  }}
                  className="p-1 sm:p-1.5 rounded-lg transition-colors duration-200 hover:bg-red-50 text-red-500 hover:text-red-700"
                >
                  <i className="ph ph-trash text-xs" />
                </button>
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-3 sm:mb-4">
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {teacher.subjects.slice(0, 2).map((subject, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs rounded-md transition-colors duration-200 bg-gray-100 text-gray-600"
                  >
                    {subject}
                  </span>
                ))}
                {teacher.subjects.length > 2 && (
                  <span className="px-2 py-1 text-xs rounded-md transition-colors duration-200 bg-gray-100 text-gray-600">
                    +{teacher.subjects.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs">
              <span className="transition-colors duration-200 text-gray-500">
                {teacher.classes.length} class{teacher.classes.length !== 1 ? 'es' : ''}
              </span>
              <span className="transition-colors duration-200 text-gray-500">
                {teacher.experience}y exp
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" suppressHydrationWarning>
      {teachers.map((teacher) => (
        <div
          key={teacher.id}
          className={`rounded-2xl p-4 sm:p-5 border duration-200 hover:shadow-md cursor-pointer group ${
            mounted && isDarkMode 
              ? 'bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900/70 hover:border-zinc-700/70' 
              : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
          }`}
          onClick={() => handleTeacherClick(teacher)}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={generateAvatar(teacher.id)}
                  alt={`${teacher.name} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`font-medium text-xs sm:text-sm truncate transition-colors duration-200 ${
                  mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {teacher.name}
                </h3>
                <p className={`text-xs mt-0.5 truncate transition-colors duration-200 ${
                  mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  {teacher.department}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:static sm:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEditTeacher(teacher)
                }}
                className={`p-1 sm:p-1.5 rounded-lg transition-colors duration-200 ${
                  mounted && isDarkMode 
                    ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="ph ph-pencil text-xs" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteTeacher(teacher)
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

          {/* Subjects */}
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {teacher.subjects.slice(0, 2).map((subject, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 text-xs rounded-md transition-colors duration-200 ${
                    mounted && isDarkMode 
                      ? 'bg-zinc-800/50 text-zinc-300' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {subject}
                </span>
              ))}
              {teacher.subjects.length > 2 && (
                <span className={`px-2 py-1 text-xs rounded-md transition-colors duration-200 ${
                  mounted && isDarkMode 
                    ? 'bg-zinc-800/50 text-zinc-300' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  +{teacher.subjects.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            <span className={`transition-colors duration-200 ${
              mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>
              {teacher.classes.length} class{teacher.classes.length !== 1 ? 'es' : ''}
            </span>
            <span className={`transition-colors duration-200 ${
              mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>
              {teacher.experience}y exp
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(TeacherGrid)