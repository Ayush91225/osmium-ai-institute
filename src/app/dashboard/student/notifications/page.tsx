'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'system'
  category: 'assignment' | 'grade' | 'exam' | 'announcement' | 'deadline' | 'feedback'
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  metadata?: {
    subject?: string
    courseName?: string
  }
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Assignment Posted',
    message: 'AI Chatbot Implementation has been assigned in Python Advanced',
    type: 'info',
    category: 'assignment',
    timestamp: '2024-01-20T10:30:00Z',
    read: false,
    priority: 'high',
    metadata: { subject: 'Python Advanced' }
  },
  {
    id: '2',
    title: 'Grade Published',
    message: 'Your Physics Lab Report has been graded: 95/100',
    type: 'success',
    category: 'grade',
    timestamp: '2024-01-20T09:15:00Z',
    read: false,
    priority: 'medium',
    metadata: { subject: 'Physics' }
  },
  {
    id: '3',
    title: 'Upcoming Exam Reminder',
    message: 'Mid-Term Examination in Data Structures is scheduled for 15 Jan 2025',
    type: 'warning',
    category: 'exam',
    timestamp: '2024-01-20T08:45:00Z',
    read: true,
    priority: 'high',
    metadata: { subject: 'Data Structures' }
  },
  {
    id: '4',
    title: 'Course Update',
    message: 'New learning materials added to Web Development course',
    type: 'info',
    category: 'announcement',
    timestamp: '2024-01-19T16:20:00Z',
    read: true,
    priority: 'low',
    metadata: { courseName: 'Web Development' }
  },
  {
    id: '5',
    title: 'Submission Deadline',
    message: 'Binary Tree Visualizer project due in 3 days',
    type: 'error',
    category: 'deadline',
    timestamp: '2024-01-19T14:30:00Z',
    read: false,
    priority: 'high',
    metadata: { subject: 'Data Structures' }
  },
  {
    id: '6',
    title: 'Instructor Feedback',
    message: 'Your Java Inheritance Quiz has been reviewed with comments',
    type: 'success',
    category: 'feedback',
    timestamp: '2024-01-19T12:15:00Z',
    read: false,
    priority: 'medium',
    metadata: { subject: 'Java Core' }
  }
]

function NotificationContent() {
  const { isDarkMode } = useDarkMode()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filterType, setFilterType] = useState('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getFilteredNotifications = () => {
    let filtered = [...notifications]
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    switch (filterType) {
      case 'unread':
        return filtered.filter(n => !n.read)
      case 'assignment':
      case 'grade':
      case 'exam':
      case 'announcement':
        return filtered.filter(n => n.category === filterType)
      default:
        return filtered
    }
  }

  const filteredNotifications = getFilteredNotifications()

  const filterOptions = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'assignment', label: 'Assignments', count: notifications.filter(n => n.category === 'assignment').length },
    { id: 'grade', label: 'Grades', count: notifications.filter(n => n.category === 'grade').length },
    { id: 'exam', label: 'Exams', count: notifications.filter(n => n.category === 'exam').length },
    { id: 'announcement', label: 'Announcements', count: notifications.filter(n => n.category === 'announcement').length }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return 'ph ph-check-circle'
      case 'warning': return 'ph ph-warning-circle'
      case 'error': return 'ph ph-x-circle'
      case 'system': return 'ph ph-gear'
      default: return 'ph ph-info'
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

  const getChipStyles = (variant: string) => {
    const baseStyles = 'px-2 py-1 rounded-full text-xs font-medium'
    
    switch (variant) {
      case 'success':
        return `${baseStyles} ${isDarkMode ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`
      case 'warning':
        return `${baseStyles} ${isDarkMode ? 'bg-amber-900/30 text-amber-400 border border-amber-800/50' : 'bg-amber-50 text-amber-700 border border-amber-200'}`
      case 'info':
        return `${baseStyles} ${isDarkMode ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' : 'bg-blue-50 text-blue-700 border border-blue-200'}`
      case 'error':
        return `${baseStyles} ${isDarkMode ? 'bg-red-900/30 text-red-400 border border-red-800/50' : 'bg-red-50 text-red-700 border border-red-200'}`
      default:
        return `${baseStyles} ${isDarkMode ? 'bg-zinc-800/50 text-zinc-300 border border-zinc-700/50' : 'bg-gray-100 text-gray-700 border border-gray-200'}`
    }
  }

  if (!mounted) {
    return (
      <DashboardLayout role="student">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="student">
      <div className="h-screen overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4 mt-12 md:mt-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3 md:mb-4">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1 px-4 md:px-0">
                <h1 className={`text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] font-semibold leading-[1.3] tracking-tight mt-3 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${isDarkMode ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                    {unreadCount} new
                  </div>
                )}
              </div>
              <p className={`text-xs sm:text-sm transition-colors duration-200 px-4 md:px-0 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Stay updated with important alerts and course notifications
              </p>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className={`px-3 py-2 rounded-lg text-xs font-medium duration-200 border flex items-center justify-center ${isDarkMode ? 'bg-zinc-900/50 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/70 hover:border-zinc-600/70' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
              >
                <i className="ph ph-checks mr-1.5 text-xs" />
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            Filter:
          </span>
          <div className="overflow-x-auto pb-1 sm:pb-0">
            <div className="flex gap-1.5" style={{ minWidth: 'max-content' }}>
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFilterType(option.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0 ${filterType === option.id ? isDarkMode ? 'bg-zinc-800/50 text-zinc-100 border border-zinc-700/50' : 'bg-gray-100 text-gray-900 border border-gray-200' : isDarkMode ? 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                  {option.label}
                  <span className={`ml-1 px-1 py-0.5 text-xs rounded-full ${filterType === option.id ? isDarkMode ? 'bg-zinc-700/50 text-zinc-300' : 'bg-white text-gray-600' : isDarkMode ? 'bg-zinc-700/30 text-zinc-400' : 'bg-gray-200 text-gray-500'}`}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notification List */}
        {filteredNotifications.length === 0 ? (
          <div className={`text-center py-12 rounded-lg border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40 text-zinc-400' : 'bg-white/80 border-gray-200/60 text-gray-500'}`}>
            <i className="ph ph-bell-slash text-3xl mb-3" />
            <p className="text-xs">
              {filterType === 'all' ? 'No notifications found' : `No ${filterType} notifications found`}
            </p>
          </div>
        ) : (
          <div className={`rounded-lg border overflow-hidden ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <div className={`divide-y ${isDarkMode ? 'divide-zinc-800/50' : 'divide-gray-100'}`}>
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 border-l-2 transition-all duration-200 cursor-pointer group ${getPriorityIndicator(notification.priority)} ${!notification.read ? isDarkMode ? 'bg-zinc-800/20 hover:bg-zinc-800/40' : 'bg-blue-50/30 hover:bg-blue-50/60' : isDarkMode ? 'hover:bg-zinc-800/10' : 'hover:bg-gray-50/30'}`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
                      <i className={`${getTypeIcon(notification.type)} text-xs`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`text-xs font-semibold leading-tight ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full inline-block"></span>
                          )}
                        </h3>
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                            {formatTime(notification.timestamp)}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id) }}
                            className={`p-0.5 rounded transition-colors ${isDarkMode ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-500'}`}
                          >
                            <i className="ph ph-x text-xs" />
                          </button>
                        </div>
                      </div>
                      
                      <p className={`text-xs mb-2 leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className={getChipStyles('default')}>
                            {notification.category}
                          </span>
                          <span className={getChipStyles(notification.type)}>
                            {notification.type}
                          </span>
                          {notification.priority === 'high' && (
                            <span className={getChipStyles('error')}>
                              urgent
                            </span>
                          )}
                        </div>
                      </div>

                      {notification.metadata && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {notification.metadata.subject && (
                            <span className={`text-xs px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-zinc-800/30 text-zinc-400' : 'bg-gray-50 text-gray-600'}`}>
                              {notification.metadata.subject}
                            </span>
                          )}
                          {notification.metadata.courseName && (
                            <span className={`text-xs px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-zinc-800/30 text-zinc-400' : 'bg-gray-50 text-gray-600'}`}>
                              {notification.metadata.courseName}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </DashboardLayout>
  )
}

export default function NotificationsPage() {
  return <NotificationContent />
}
