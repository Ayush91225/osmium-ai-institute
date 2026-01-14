'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

const activitiesData = [
  { icon: 'ph-chalkboard-teacher', title: 'Teacher Priya added new class', subtitle: 'BCA Sem 1 - Database Management', time: '15 minutes ago' },
  { icon: 'ph-exam', title: 'Mock test published for Physics', subtitle: 'Engineering Physics - Unit 3', time: '1 hour ago' },
  { icon: 'ph-users', title: '20 students enrolled to CSE Sem 3', subtitle: 'Batch 2024-25 enrollment', time: '2 hours ago' },
  { icon: 'ph-megaphone', title: 'Notice released for maintenance', subtitle: 'Campus maintenance schedule', time: 'Yesterday' },
  { icon: 'ph-books', title: 'New subject: Machine Learning', subtitle: 'Added to CSE curriculum', time: 'Yesterday' },
  { icon: 'ph-chart-bar', title: 'Result published for Math Unit Test', subtitle: 'Calculus assessment results', time: '2 days ago' }
]

function ActivitySection() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className={`rounded-2xl p-4 border shadow-card  ${
      mounted && isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-50'
    }`}>
      <div className="mb-3">
        <h3 className={`text-base font-medium  ${
          mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
        }`}>Recent Activity</h3>
        <p className={`text-xs mt-1  ${
          mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>Latest actions in institute</p>
      </div>
      
      <div className="max-h-72 overflow-y-auto custom-scrollbar">
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-4 top-2 bottom-2 w-px  ${
            mounted && isDarkMode ? 'bg-zinc-700' : 'bg-[#E5E7EB]'
          }`} />
          
          <div className="space-y-6">
            {activitiesData.map((activity, index) => (
              <div key={index} className="relative flex items-start gap-4">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-sm  ${
                    mounted && isDarkMode 
                      ? 'bg-zinc-800 border-zinc-700' 
                      : 'bg-[#F2EDE4] border-white'
                  }`}>
                    <i className={`ph ${activity.icon}  ${
                      mounted && isDarkMode ? 'text-zinc-300' : 'text-[#8C7B65]'
                    }`} style={{ fontSize: '12px' }} />
                  </div>
                  {/* Connecting line to next item */}
                  {index < activitiesData.length - 1 && (
                    <div className={`absolute top-8 left-1/2 w-px h-6 transform -translate-x-1/2  ${
                      mounted && isDarkMode ? 'bg-zinc-700' : 'bg-[#E5E7EB]'
                    }`} />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm font-medium leading-tight  ${
                        mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>{activity.title}</p>
                      <p className={`text-xs mt-1 leading-relaxed  ${
                        mounted && isDarkMode ? 'text-zinc-300' : 'text-[#8C7B65]'
                      }`}>{activity.subtitle}</p>
                    </div>
                    <span className={`text-xs ml-2 flex-shrink-0  ${
                      mounted && isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                    }`}>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ActivitySection)