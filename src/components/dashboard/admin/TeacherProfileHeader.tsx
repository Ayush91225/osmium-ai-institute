'use client'

import { Teacher } from '@/contexts/TeacherContext'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface TeacherHeaderProps {
  teacher: any
}

export default function TeacherProfileHeader({ teacher }: TeacherHeaderProps) {
  const { isDarkMode } = useDarkMode()

  if (!teacher) return null

  const generateAvatar = (teacherId: string) => {
    const seed = encodeURIComponent(teacherId)
    const backgroundColor = '4747eb,4762eb,477eeb,4799eb,47b4eb,47d0eb,47eb47,47eb62,47eb7e,47eb99,47ebb4,47ebd0,47ebeb,6247eb,62eb47,7e47eb,7eeb47,9947eb,99eb47,b447eb,b4eb47,d047eb,d0eb47,eb4747,eb4762,eb477e,eb4799,eb47d0,eb47eb,eb6247,eb7e47,eb9947,ebb447,ebd047,ebeb47,ffd5dc,ffdfbf,b6e3f4,c0aede,d1d4f9'
    const backgroundType = 'gradientLinear'
    const backgroundRotation = '0,360,10,20,30'
    
    return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=${backgroundColor}&backgroundType=${backgroundType}&backgroundRotation=${backgroundRotation}`
  }

  return (
    <div className="mt-20 md:mt-0">
      {/* Breadcrumbs - Outside the card */}
      <div className="mb-4">
        <nav className="flex items-center gap-2 text-sm px-4 md:px-0">
          <a href="/dashboard/admin" className={`transition-colors duration-200 ${
            isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-500 hover:text-gray-700'
          }`}>
            Dashboard
          </a>
          <i className={`ph ph-caret-right text-xs ${
            isDarkMode ? 'text-zinc-600' : 'text-gray-400'
          }`} />
          <a href="/dashboard/admin/teachers" className={`transition-colors duration-200 ${
            isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-500 hover:text-gray-700'
          }`}>
            Teachers
          </a>
          <i className={`ph ph-caret-right text-xs ${
            isDarkMode ? 'text-zinc-600' : 'text-gray-400'
          }`} />
          <span className={`font-medium ${
            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
          }`}>
            {teacher.name}
          </span>
        </nav>
      </div>
      
      {/* Profile Card */}
      <div className={`relative overflow-hidden rounded-2xl border ${
        isDarkMode 
          ? 'bg-gradient-to-br from-zinc-900/90 to-zinc-900/60 border-zinc-800/50' 
          : 'bg-gradient-to-br from-white to-gray-50/50 border-gray-200/60'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#8C7B65]/5 to-transparent" />
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white/10">
                <img 
                  src={generateAvatar(teacher.id)}
                  alt={`${teacher.name} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <i className="ph ph-check text-white text-xs" />
              </div>
            </div>
            
            <div className="space-y-1">
              <h1 className={`text-2xl font-bold ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>{teacher.name}</h1>
              <div className="flex items-center gap-3 text-sm">
                <span className={`flex items-center gap-1 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                }`}>
                  <i className="ph ph-identification-badge text-sm" />
                  {teacher.id}
                </span>
                <span className={`flex items-center gap-1 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                }`}>
                  <i className="ph ph-buildings text-sm" />
                  {teacher.department}
                </span>
              </div>
              <p className={`text-sm ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>Osmium AI Institute • {teacher.qualification}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="w-full lg:flex-1 lg:ml-auto">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: 'Experience', value: teacher.experience?.toString() || '8', suffix: ' years', icon: 'ph-calendar-check' },
                { label: 'Students', value: teacher.totalStudents?.toString() || '120', suffix: '', icon: 'ph-users' },
                { label: 'Subjects', value: teacher.subjects?.length?.toString() || '3', suffix: '', icon: 'ph-books' }
              ].map((stat, index) => (
                <div key={index} className={`p-3 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-800/30 border-zinc-700/50 hover:bg-zinc-800/50' 
                    : 'bg-white/60 border-gray-200/50 hover:bg-white/80'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <i className={`ph ${stat.icon} text-sm ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`} />
                    <span className={`text-xs font-medium truncate ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`}>{stat.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-lg font-bold ${
                      isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                    }`}>{stat.value}</span>
                    {stat.suffix && (
                      <span className={`text-sm ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                      }`}>{stat.suffix}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 lg:flex-col">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
              isDarkMode
                ? 'bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-700/50'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}>
              <i className="ph ph-download-simple text-sm" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#8C7B65] hover:bg-[#7A6B57] text-white rounded-xl text-sm font-medium">
              <i className="ph ph-pencil-simple text-sm" />
              Edit
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}