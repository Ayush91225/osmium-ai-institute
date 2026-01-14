'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import NotificationHeader from '@/components/dashboard/admin/NotificationHeader'
import NotificationList from '@/components/dashboard/admin/NotificationList'
import NotificationFilters from '@/components/dashboard/admin/NotificationFilters'
import { NotificationProvider } from '@/contexts/NotificationContext'

function NotificationManagementContent() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <DashboardLayout>
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
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <NotificationHeader />
        <NotificationFilters />
        <NotificationList />
      </div>
    </DashboardLayout>
  )
}

export default function NotificationManagement() {
  return (
    <NotificationProvider>
      <NotificationManagementContent />
    </NotificationProvider>
  )
}