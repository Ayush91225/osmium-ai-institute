'use client'

import { useDarkMode } from '@/contexts/DarkModeContext'
import { useNotifications } from '@/contexts/NotificationContext'

export default function NotificationFilters() {
  const { isDarkMode } = useDarkMode()
  const { notifications, filterType, setFilterType } = useNotifications()

  const filterOptions = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'student', label: 'Students', count: notifications.filter(n => n.category === 'student').length },
    { id: 'teacher', label: 'Teachers', count: notifications.filter(n => n.category === 'teacher').length },
    { id: 'approval', label: 'Approvals', count: notifications.filter(n => n.category === 'approval').length },
    { id: 'system', label: 'System', count: notifications.filter(n => n.category === 'system').length }
  ]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <span className={`text-xs font-medium ${
        isDarkMode ? 'text-zinc-400' : 'text-gray-600'
      }`}>
        Filter:
      </span>
      <div className="overflow-x-auto pb-1 sm:pb-0">
        <div className="flex gap-1.5" style={{ minWidth: 'max-content' }}>
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilterType(option.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0 ${
                filterType === option.id
                  ? isDarkMode
                    ? 'bg-zinc-800/50 text-zinc-100 border border-zinc-700/50'
                    : 'bg-gray-100 text-gray-900 border border-gray-200'
                  : isDarkMode
                    ? 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/30'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.label}
              <span className={`ml-1 px-1 py-0.5 text-xs rounded-full ${
                filterType === option.id
                  ? isDarkMode
                    ? 'bg-zinc-700/50 text-zinc-300'
                    : 'bg-white text-gray-600'
                  : isDarkMode
                    ? 'bg-zinc-700/30 text-zinc-400'
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}