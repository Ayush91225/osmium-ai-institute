'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useApprovals } from '@/contexts/ApprovalContext'

export default function ApprovalStats() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const { pendingApprovals, approvedApprovals, rejectedApprovals, approvals } = useApprovals()

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    {
      title: 'Total Requests',
      value: approvals.length,
      icon: 'ph ph-files',
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Pending',
      value: pendingApprovals.length,
      icon: 'ph ph-clock',
      color: 'amber',
      change: '+5%'
    },
    {
      title: 'Approved',
      value: approvedApprovals.length,
      icon: 'ph ph-check-circle',
      color: 'emerald',
      change: '+8%'
    },
    {
      title: 'Rejected',
      value: rejectedApprovals.length,
      icon: 'ph ph-x-circle',
      color: 'red',
      change: '-2%'
    }
  ]

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">{stat.title}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <i className={`${stat.icon} text-blue-600`} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`rounded-xl p-4 border ${
          isDarkMode 
            ? 'bg-zinc-900/50 border-zinc-800/50' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {stat.title}
              </p>
              <p className={`text-lg font-bold mt-1 ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              stat.color === 'blue' ? (isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50') :
              stat.color === 'amber' ? (isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50') :
              stat.color === 'emerald' ? (isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50') :
              (isDarkMode ? 'bg-red-900/30' : 'bg-red-50')
            }`}>
              <i className={`${stat.icon} ${
                stat.color === 'blue' ? (isDarkMode ? 'text-blue-400' : 'text-blue-600') :
                stat.color === 'amber' ? (isDarkMode ? 'text-amber-400' : 'text-amber-600') :
                stat.color === 'emerald' ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') :
                (isDarkMode ? 'text-red-400' : 'text-red-600')
              }`} />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className={`text-xs font-medium ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              {stat.change}
            </span>
            <span className={`text-xs ml-1 ${
              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
            }`}>
              vs last month
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}