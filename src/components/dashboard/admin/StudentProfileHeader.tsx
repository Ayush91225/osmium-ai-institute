'use client'

import { Student } from '@/contexts/StudentContext'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface StudentHeaderProps {
  student: Student
  onEditClick: () => void
}

export default function StudentProfileHeader({ student, onEditClick }: StudentHeaderProps) {
  const { isDarkMode } = useDarkMode()

  if (!student) return null

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
          <a href="/dashboard/admin/students" className={`transition-colors duration-200 ${
            isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-500 hover:text-gray-700'
          }`}>
            Students
          </a>
          <i className={`ph ph-caret-right text-xs ${
            isDarkMode ? 'text-zinc-600' : 'text-gray-400'
          }`} />
          <span className={`font-medium ${
            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
          }`}>
            {student.name}
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
                  src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${student.rollNumber}&radius=0&backgroundType[]&eyes=variant01,variant02,variant03,variant05,variant06,variant04,variant07,variant08,variant09,variant10,variant12,variant11,variant13,variant14,variant15,variant26,variant25,variant24,variant22,variant23,variant21,variant20&glassesProbability=30&mouth=variant01,variant02,variant03,variant04,variant05,variant07,variant08,variant09,variant10,variant11,variant12,variant13,variant14,variant15,variant16,variant17,variant18,variant19,variant20,variant21,variant22,variant23,variant24,variant25,variant26,variant27,variant28,variant29,variant30`}
                  alt={`${student.name} avatar`}
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
              }`}>{student.name}</h1>
              <div className="flex items-center gap-3 text-sm">
                <span className={`flex items-center gap-1 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                }`}>
                  <i className="ph ph-identification-card text-sm" />
                  {student.rollNumber}
                </span>
                <span className={`flex items-center gap-1 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                }`}>
                  <i className="ph ph-graduation-cap text-sm" />
                  {student.class}
                </span>
              </div>
              <p className={`text-sm ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>Osmium AI Institute • Science Stream</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="w-full lg:flex-1 lg:ml-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Performance', value: '4.2', suffix: '/5.0', icon: 'ph-chart-line-up' },
                { label: 'Attendance', value: '96', suffix: '%', icon: 'ph-calendar-check' },
                { label: 'Projects', value: '12', suffix: '', icon: 'ph-folder-open' },
                { label: 'Rank', value: '#3', suffix: '', icon: 'ph-trophy' }
              ].map((stat, index) => (
                <div key={index} className={`p-3 rounded-xl border  ${
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
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium  ${
              isDarkMode
                ? 'bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-700/50'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}>
              <i className="ph ph-download-simple text-sm" />
              Export
            </button>
            <button onClick={onEditClick} className="flex items-center gap-2 px-4 py-2 bg-[#8C7B65] hover:bg-[#7A6B57] text-white rounded-xl text-sm font-medium ">
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