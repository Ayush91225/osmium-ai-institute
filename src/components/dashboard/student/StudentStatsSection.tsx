'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function StudentStatsSection() {
  const { isDarkMode } = useDarkMode()

  const statsData = [
    { 
      title: 'Today Session', 
      value: '1hr 10min', 
      extra: '+32 min than average',
      icon: 'ph-activity',
      bgColor: isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'
    },
    { 
      title: 'Pending Submissions', 
      value: '5', 
      extra: '+2 this week',
      icon: 'ph-hourglass',
      bgColor: isDarkMode ? 'bg-zinc-800' : 'bg-yellow-50'
    },
    { 
      title: 'Ongoing Courses', 
      value: '3', 
      extra: '+2 this month',
      icon: 'ph-graduation-cap',
      bgColor: isDarkMode ? 'bg-zinc-800' : 'bg-teal-50'
    }
  ]

  return (
    <div className={`rounded-2xl p-6 md:p-8 border mb-8 ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-100'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statsData.map((stat, index) => (
          <div key={stat.title} className="relative">
            {index > 0 && (
              <div className={`hidden md:block absolute left-0 top-0 bottom-0 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`} style={{ marginLeft: '-16px' }} />
            )}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${stat.bgColor}`}>
                <i className={`ph ${stat.icon} text-xl ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`} />
              </div>
              <div>
                <div className={`text-sm mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {stat.title}
                </div>
                <div className={`text-3xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {stat.extra}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(StudentStatsSection)
