'use client'

import { useDarkMode } from '@/contexts/DarkModeContext'
import { useNotifications } from '@/contexts/NotificationContext'
import NotificationCard from './NotificationCard'

export default function NotificationList() {
  const { isDarkMode } = useDarkMode()
  const { notifications, filterType } = useNotifications()

  const getFilteredNotifications = () => {
    let filtered = [...notifications]
    
    // Sort by timestamp (latest first)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    // Apply filters
    switch (filterType) {
      case 'unread':
        return filtered.filter(n => !n.read)
      case 'student':
        return filtered.filter(n => n.category === 'student')
      case 'teacher':
        return filtered.filter(n => n.category === 'teacher')
      case 'approval':
        return filtered.filter(n => n.category === 'approval')
      case 'system':
        return filtered.filter(n => n.category === 'system')
      default:
        return filtered
    }
  }

  const filteredNotifications = getFilteredNotifications()

  if (filteredNotifications.length === 0) {
    return (
      <div className={`text-center py-12 rounded-lg border ${
        isDarkMode 
          ? 'bg-zinc-900/60 border-zinc-800/40 text-zinc-400' 
          : 'bg-white/80 border-gray-200/60 text-gray-500'
      }`}>
        <i className="ph ph-bell-slash text-3xl mb-3" />
        <p className="text-xs">
          {filterType === 'all' ? 'No notifications found' : `No ${filterType} notifications found`}
        </p>
      </div>
    )
  }

  return (
    <div className={`rounded-lg border overflow-hidden ${
      isDarkMode 
        ? 'bg-zinc-900/60 border-zinc-800/40' 
        : 'bg-white/80 border-gray-200/60'
    }`}>
      <div className={`divide-y ${
        isDarkMode ? 'divide-zinc-800/50' : 'divide-gray-100'
      }`}>
        {filteredNotifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  )
}