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
    <div className={`rounded-2xl p-5 md:p-6 border mb-6 ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-100'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <div key={stat.title} className="relative">
            {index > 0 && (
              <div className={`hidden md:block absolute left-0 top-0 bottom-0 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`} style={{ marginLeft: '-24px' }} />
            )}
            <div>
              <div className={`text-xs font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.title}
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${stat.bgColor}`}>
                  <i className={`ph ${stat.icon} text-base ${isDarkMode ? 'text-zinc-600' : 'text-gray-600'}`} />
                </div>
                <div className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                {stat.extra}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(StudentStatsSection)
