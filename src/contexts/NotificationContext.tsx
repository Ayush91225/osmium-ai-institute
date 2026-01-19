'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'system'
  category: 'student' | 'teacher' | 'system' | 'approval' | 'academic'
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  metadata?: {
    studentName?: string
    teacherName?: string
    className?: string
    subject?: string
  }
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  filterType: string
  setFilterType: (type: string) => void
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Student Registration',
    message: 'Priya Sharma has submitted a registration request for Grade 11A',
    type: 'info',
    category: 'approval',
    timestamp: '2024-01-20T10:30:00Z',
    read: false,
    priority: 'high',
    actionUrl: '/dashboard/admin/approvals',
    metadata: { studentName: 'Priya Sharma', className: 'Grade 11A' }
  },
  {
    id: '2',
    title: 'Teacher Application Approved',
    message: 'Dr. Rajesh Kumar\'s faculty application has been approved and account created',
    type: 'success',
    category: 'teacher',
    timestamp: '2024-01-20T09:15:00Z',
    read: false,
    priority: 'medium',
    metadata: { teacherName: 'Dr. Rajesh Kumar' }
  },
  {
    id: '3',
    title: 'System Maintenance Scheduled',
    message: 'Scheduled maintenance on January 25th from 2:00 AM to 4:00 AM IST',
    type: 'warning',
    category: 'system',
    timestamp: '2024-01-20T08:45:00Z',
    read: true,
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Low Test Performance Alert',
    message: 'Chemistry test average for Grade 12A is below 70%. Immediate attention required',
    type: 'error',
    category: 'academic',
    timestamp: '2024-01-19T16:20:00Z',
    read: false,
    priority: 'high',
    metadata: { className: 'Grade 12A', subject: 'Chemistry' }
  },
  {
    id: '5',
    title: 'New Faculty Invitation Sent',
    message: 'Invitation link sent to physics.teacher@email.com for Physics Department',
    type: 'info',
    category: 'teacher',
    timestamp: '2024-01-19T14:30:00Z',
    read: true,
    priority: 'low'
  },
  {
    id: '6',
    title: 'Student Performance Milestone',
    message: 'Arjun Sharma achieved 95% in Mathematics - Excellent performance!',
    type: 'success',
    category: 'student',
    timestamp: '2024-01-19T12:15:00Z',
    read: false,
    priority: 'low',
    metadata: { studentName: 'Arjun Sharma', subject: 'Mathematics' }
  },
  {
    id: '7',
    title: 'Database Backup Completed',
    message: 'Daily database backup completed successfully at 3:00 AM',
    type: 'system',
    category: 'system',
    timestamp: '2024-01-19T03:00:00Z',
    read: true,
    priority: 'low'
  },
  {
    id: '8',
    title: 'Multiple Registration Requests',
    message: '5 new student registration requests pending approval',
    type: 'warning',
    category: 'approval',
    timestamp: '2024-01-18T17:45:00Z',
    read: false,
    priority: 'medium',
    actionUrl: '/dashboard/admin/approvals'
  }
]

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filterType, setFilterType] = useState('all')

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      filterType,
      setFilterType
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}