'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'

interface Notification {
  id: number
  type: 'assignment' | 'exam' | 'announcement' | 'student' | 'system'
  title: string
  message: string
  time: string
  read: boolean
  priority: 'high' | 'medium' | 'low'
}

function NotificationsContent() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'student', title: 'Assignment Submission', message: 'Rahul Kumar submitted "Calculus Problem Set 5"', time: '5 min ago', read: false, priority: 'medium' },
    { id: 2, type: 'exam', title: 'Exam Scheduled', message: 'Mid-term exam for Class 11A scheduled on Dec 20', time: '1 hour ago', read: false, priority: 'high' },
    { id: 3, type: 'announcement', title: 'Faculty Meeting', message: 'Department meeting scheduled for tomorrow at 3 PM', time: '2 hours ago', read: true, priority: 'medium' },
    { id: 4, type: 'student', title: 'Query from Student', message: 'Priya Sharma asked a question in Mathematics', time: '3 hours ago', read: false, priority: 'low' },
    { id: 5, type: 'system', title: 'Grade Submission Reminder', message: 'Please submit grades for Class 10C by Dec 15', time: '5 hours ago', read: true, priority: 'high' },
    { id: 6, type: 'assignment', title: 'Assignment Due', message: 'Assignment deadline approaching for Class 12A', time: '1 day ago', read: true, priority: 'medium' },
  ])

  useEffect(() => setMounted(true), [])

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment': return 'ph-file-text'
      case 'exam': return 'ph-exam'
      case 'announcement': return 'ph-megaphone'
      case 'student': return 'ph-user'
      case 'system': return 'ph-bell'
      default: return 'ph-bell'
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'assignment': return isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
      case 'exam': return isDarkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'
      case 'announcement': return isDarkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'
      case 'student': return isDarkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'
      case 'system': return isDarkMode ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600'
      default: return isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'
    }
  }

  if (!mounted) return null

  const filteredNotifications = filter === 'unread' ? notifications.filter(n => !n.read) : notifications
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-950' : 'bg-[#F9F8F6]'}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Notifications
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters */}
        <div className={`flex items-center justify-between mb-4 p-3 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'}`}>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[#8b7355] text-white'
                  : isDarkMode ? 'text-zinc-400 hover:bg-zinc-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-[#8b7355] text-white'
                  : isDarkMode ? 'text-zinc-400 hover:bg-zinc-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className={`text-sm font-medium ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className={`text-center py-12 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400' : 'bg-white border-gray-200 text-gray-500'}`}>
              <i className="ph ph-bell-slash text-4xl mb-2" />
              <p>No notifications</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => !notif.read && markAsRead(notif.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  notif.read
                    ? isDarkMode ? 'bg-zinc-900/30 border-zinc-800/50' : 'bg-gray-50/50 border-gray-200/50'
                    : isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'
                } ${!notif.read && 'hover:scale-[1.01]'}`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getColor(notif.type)}`}>
                    <i className={`ph ${getIcon(notif.type)} text-lg`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {notif.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {notif.priority === 'high' && (
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                        )}
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-[#8b7355]" />
                        )}
                      </div>
                    </div>
                    <p className={`text-sm mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {notif.message}
                    </p>
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                      {notif.time}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default function NotificationsPage() {
  return (
    <DashboardLayout userType="teacher">
      <NotificationsContent />
    </DashboardLayout>
  )
}
