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

interface TeacherTableProps {
  teachers: Teacher[]
  onTeacherSelect: (teacher: Teacher) => void
  onEditTeacher: (teacher: Teacher) => void
  onDeleteTeacher: (teacher: Teacher) => void
}

function TeacherTable({ teachers, onTeacherSelect, onEditTeacher, onDeleteTeacher }: TeacherTableProps) {
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
      <div className="rounded-2xl border overflow-hidden bg-white border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Faculty</th>
                <th className="px-3 sm:px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Department</th>
                <th className="px-3 sm:px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Subjects</th>
                <th className="px-3 sm:px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Classes</th>
                <th className="px-3 sm:px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Experience</th>
                <th className="px-3 sm:px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-3 sm:px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#F2EDE4] rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-[#8C7B65] font-medium text-xs">
                          {generateAvatar(teacher.name)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {teacher.name}
                        </div>
                        <div className="text-xs text-gray-500 hidden sm:block">
                          {teacher.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {teacher.department}
                  </td>
                  <td className="px-3 sm:px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.slice(0, 1).map((subject, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600">
                          {subject}
                        </span>
                      ))}
                      {teacher.subjects.length > 1 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600">
                          +{teacher.subjects.length - 1}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-4 text-xs sm:text-sm text-gray-900">
                    {teacher.classes.length}
                  </td>
                  <td className="px-3 sm:px-5 py-4 text-xs sm:text-sm text-gray-900">
                    {teacher.experience}y
                  </td>
                  <td className="px-3 sm:px-5 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                      <button className="p-1 sm:p-1.5 rounded-lg text-gray-500">
                        <i className="ph ph-eye text-xs sm:text-sm" />
                      </button>
                      <button className="p-1 sm:p-1.5 rounded-lg text-gray-500">
                        <i className="ph ph-pencil text-xs sm:text-sm" />
                      </button>
                      <button className="p-1 sm:p-1.5 rounded-lg text-red-500">
                        <i className="ph ph-trash text-xs sm:text-sm" />
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
    <div className={`rounded-2xl border overflow-hidden  ${
      mounted && isDarkMode 
        ? 'bg-zinc-900/50 border-zinc-800/50' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className={` ${
            mounted && isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'
          }`}>
            <tr>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider  ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Faculty
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider  ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Department
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider  ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Subjects
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider  ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Classes
              </th>
              <th className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider  ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Experience
              </th>
              <th className={`px-5 py-3 text-right text-xs font-medium uppercase tracking-wider  ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y  ${
            mounted && isDarkMode ? 'divide-zinc-800/50' : 'divide-gray-100'
          }`}>
            {teachers.map((teacher) => (
              <tr
                key={teacher.id}
                className={` cursor-pointer group ${
                  mounted && isDarkMode 
                    ? 'hover:bg-zinc-800/30' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTeacherClick(teacher)}
              >
                <td className="px-3 sm:px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={generateAvatar(teacher.id)}
                        alt={`${teacher.name} avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs sm:text-sm font-medium  ${
                        mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>
                        {teacher.name}
                      </div>
                      <div className={`text-xs  hidden sm:block ${
                        mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                      }`}>
                        {teacher.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`px-3 sm:px-5 py-4 whitespace-nowrap text-xs sm:text-sm  ${
                  mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-900'
                }`}>
                  {teacher.department}
                </td>
                <td className="px-3 sm:px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.slice(0, 1).map((subject, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 text-xs rounded-md  ${
                          mounted && isDarkMode 
                            ? 'bg-zinc-800/50 text-zinc-300' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {subject}
                      </span>
                    ))}
                    {teacher.subjects.length > 1 && (
                      <span className={`px-2 py-1 text-xs rounded-md  ${
                        mounted && isDarkMode 
                          ? 'bg-zinc-800/50 text-zinc-300' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{teacher.subjects.length - 1}
                      </span>
                    )}
                  </div>
                </td>
                <td className={`px-3 sm:px-5 py-4 text-xs sm:text-sm  ${
                  mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-900'
                }`}>
                  {teacher.classes.length}
                </td>
                <td className={`px-3 sm:px-5 py-4 text-xs sm:text-sm  ${
                  mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-900'
                }`}>
                  {teacher.experience}y
                </td>
                <td className="px-3 sm:px-5 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 ">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTeacherClick(teacher)
                      }}
                      className={`p-1 sm:p-1.5 rounded-lg  ${
                        mounted && isDarkMode 
                          ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300' 
                          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <i className="ph ph-eye text-xs sm:text-sm" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEditTeacher(teacher)
                      }}
                      className={`p-1 sm:p-1.5 rounded-lg  ${
                        mounted && isDarkMode 
                          ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300' 
                          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <i className="ph ph-pencil text-xs sm:text-sm" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteTeacher(teacher)
                      }}
                      className={`p-1 sm:p-1.5 rounded-lg  ${
                        mounted && isDarkMode 
                          ? 'hover:bg-red-900/20 text-red-400 hover:text-red-300' 
                          : 'hover:bg-red-50 text-red-500 hover:text-red-700'
                      }`}
                    >
                      <i className="ph ph-trash text-xs sm:text-sm" />
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

export default memo(TeacherTable)