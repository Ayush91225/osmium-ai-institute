'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useApprovals } from '@/contexts/ApprovalContext'

export default function ApprovalFilters() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const { activeTab, setActiveTab, filterType, setFilterType } = useApprovals()

  useEffect(() => {
    setMounted(true)
  }, [])

  const tabs = [
    { id: 'pending', label: 'Pending', icon: 'ph ph-clock' },
    { id: 'approved', label: 'Approved', icon: 'ph ph-check-circle' },
    { id: 'rejected', label: 'Rejected', icon: 'ph ph-x-circle' }
  ]

  const typeFilters = [
    { id: 'all', label: 'All' },
    { id: 'teacher', label: 'Teachers' },
    { id: 'student', label: 'Students' }
  ]

  if (!mounted) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className={`${tab.icon} mr-1.5`} />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-700">
            {typeFilters.map((filter) => (
              <option key={filter.id} value={filter.id}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className={`flex items-center gap-1 p-1 rounded-lg ${
        isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
      }`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? isDarkMode
                  ? 'bg-zinc-700 text-zinc-100 shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDarkMode
                  ? 'text-zinc-400 hover:text-zinc-200'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className={`${tab.icon} mr-1.5`} />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className={`px-3 py-2 text-xs border rounded-lg transition-colors ${
            isDarkMode
              ? 'border-zinc-700 bg-zinc-800/50 text-zinc-300'
              : 'border-gray-200 bg-white text-gray-700'
          }`}
        >
          {typeFilters.map((filter) => (
            <option key={filter.id} value={filter.id}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}