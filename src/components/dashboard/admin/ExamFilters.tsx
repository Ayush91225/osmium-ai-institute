'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useExams } from '@/contexts/ExamContext'

function ExamFilters() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const { 
    searchTerm, 
    setSearchTerm,
    selectedSubject,
    setSelectedSubject,
    selectedStatus,
    setSelectedStatus,
    viewMode,
    setViewMode
  } = useExams()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={`rounded-xl border ${
      mounted && isDarkMode 
        ? 'bg-zinc-900/60 border-zinc-800/40' 
        : 'bg-white/80 border-gray-200/60'
    }`}>
      <div className="p-4 space-y-4">
        <div className="relative">
          <i className={`ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search exams and tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
              mounted && isDarkMode 
                ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex gap-3">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={`px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                mounted && isDarkMode 
                  ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            >
              <option value="">All Subjects</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                mounted && isDarkMode 
                  ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            >
              <option value="">All Status</option>
              <option value="Published">Published</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Live">Live</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-lg ${
              mounted && isDarkMode 
                ? 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 border border-zinc-700/50' 
                : 'bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200'
            }`} title="Export Data">
              <i className="ph ph-download-simple text-sm" />
            </button>
            
            <div className={`flex rounded-lg border overflow-hidden ${
              mounted && isDarkMode ? 'border-zinc-700/50 bg-zinc-800/30' : 'border-gray-200 bg-gray-50'
            }`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm ${
                  viewMode === 'grid'
                    ? 'bg-[#8C7B65] text-white'
                    : mounted && isDarkMode 
                      ? 'text-zinc-400 hover:text-zinc-200' 
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ph ph-squares-four" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 text-sm ${
                  viewMode === 'table'
                    ? 'bg-[#8C7B65] text-white'
                    : mounted && isDarkMode 
                      ? 'text-zinc-400 hover:text-zinc-200' 
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ph ph-table" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ExamFilters)
