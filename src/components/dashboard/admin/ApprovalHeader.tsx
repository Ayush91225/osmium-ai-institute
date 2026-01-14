'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import StatusChip from './StatusChip'

export default function ApprovalHeader() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <StatusChip status="Pending Review" variant="warning" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Pending Approvals</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Review and manage registration requests</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            <i className="ph ph-download-simple mr-1.5" />
            Export
          </button>
          <button className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            <i className="ph ph-funnel mr-1.5" />
            Filter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <StatusChip status="Pending Review" variant="warning" />
          <h1 className={`text-xl sm:text-2xl font-bold ${
            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
          }`}>
            Pending Approvals
          </h1>
        </div>
        <p className={`text-sm mt-1 ${
          isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>
          Review and manage registration requests
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
          isDarkMode 
            ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800/50' 
            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}>
          <i className="ph ph-download-simple mr-1.5" />
          Export
        </button>
        <button className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
          isDarkMode 
            ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800/50' 
            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}>
          <i className="ph ph-funnel mr-1.5" />
          Filter
        </button>
      </div>
    </div>
  )
}