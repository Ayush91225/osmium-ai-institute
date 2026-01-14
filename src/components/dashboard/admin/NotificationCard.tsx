'use client'

import { useDarkMode } from '@/contexts/DarkModeContext'
import { useNotifications, Notification } from '@/contexts/NotificationContext'
import { useRouter } from 'next/navigation'
import StatusChip from './StatusChip'

interface NotificationCardProps {
  notification: Notification
}

export default function NotificationCard({ notification }: NotificationCardProps) {
  const { isDarkMode } = useDarkMode()
  const { markAsRead, deleteNotification } = useNotifications()
  const router = useRouter()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return 'ph ph-check-circle'
      case 'warning': return 'ph ph-warning-circle'
      case 'error': return 'ph ph-x-circle'
      case 'system': return 'ph ph-gear'
      default: return 'ph ph-info'
    }
  }

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'success': return 'success'
      case 'warning': return 'warning'
      case 'error': return 'danger'
      case 'system': return 'info'
      default: return 'info'
    }
  }

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-amber-500'
      default: return isDarkMode ? 'border-l-zinc-700' : 'border-l-gray-200'
    }
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = now.getTime() - time.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d`
    if (hours > 0) return `${hours}h`
    if (minutes > 0) return `${minutes}m`
    return 'now'
  }

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl)
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteNotification(notification.id)
  }

  return (
    <div 
      className={`p-3 border-l-2 transition-all duration-200 cursor-pointer group ${
        getPriorityIndicator(notification.priority)
      } ${
        !notification.read 
          ? isDarkMode 
            ? 'bg-zinc-800/20 hover:bg-zinc-800/40' 
            : 'bg-blue-50/30 hover:bg-blue-50/60'
          : isDarkMode
            ? 'hover:bg-zinc-800/10'
            : 'hover:bg-gray-50/30'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-2.5">
        {/* Icon */}
        <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
          isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
        }`}>
          <i className={`${getTypeIcon(notification.type)} text-xs`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className={`text-xs font-semibold leading-tight ${
              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>
              {notification.title}
              {!notification.read && (
                <span className="ml-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full inline-block"></span>
              )}
            </h3>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className={`text-xs ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {formatTime(notification.timestamp)}
              </span>
              <button
                onClick={handleDelete}
                className={`p-0.5 rounded transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-red-900/20 text-red-400' 
                    : 'hover:bg-red-50 text-red-500'
                }`}
              >
                <i className="ph ph-x text-xs" />
              </button>
            </div>
          </div>
          
          <p className={`text-xs mb-2 leading-relaxed ${
            isDarkMode ? 'text-zinc-300' : 'text-gray-700'
          }`}>
            {notification.message}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <StatusChip 
                status={notification.category} 
                variant="default"
              />
              <StatusChip 
                status={notification.type} 
                variant={getTypeVariant(notification.type)}
              />
              {notification.priority === 'high' && (
                <StatusChip 
                  status="urgent" 
                  variant="danger"
                />
              )}
            </div>
          </div>

          {/* Metadata */}
          {notification.metadata && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {notification.metadata.studentName && (
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  isDarkMode ? 'bg-zinc-800/30 text-zinc-400' : 'bg-gray-50 text-gray-600'
                }`}>
                  {notification.metadata.studentName}
                </span>
              )}
              {notification.metadata.teacherName && (
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  isDarkMode ? 'bg-zinc-800/30 text-zinc-400' : 'bg-gray-50 text-gray-600'
                }`}>
                  {notification.metadata.teacherName}
                </span>
              )}
              {notification.metadata.className && (
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  isDarkMode ? 'bg-zinc-800/30 text-zinc-400' : 'bg-gray-50 text-gray-600'
                }`}>
                  {notification.metadata.className}
                </span>
              )}
              {notification.metadata.subject && (
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  isDarkMode ? 'bg-zinc-800/30 text-zinc-400' : 'bg-gray-50 text-gray-600'
                }`}>
                  {notification.metadata.subject}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}