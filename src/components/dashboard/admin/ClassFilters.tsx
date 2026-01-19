'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useClasses } from '@/contexts/ClassContext'
import Dropdown from './Dropdown'

function ClassFilters() {
  const { isDarkMode } = useDarkMode()
  const {
    searchTerm,
    setSearchTerm,
    selectedBranch,
    setSelectedBranch,
    selectedCourse,
    setSelectedCourse,
    selectedYear,
    setSelectedYear,
    selectedType,
    setSelectedType,
    viewMode,
    setViewMode,
    branches,
    courses
  } = useClasses()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const branchOptions = [
    { value: '', label: 'All Locations' },
    ...branches.map(branch => ({ value: branch.id, label: branch.name }))
  ]

  const courseOptions = [
    { value: '', label: 'All Programs' },
    ...courses.map(course => ({ value: course.id, label: course.name }))
  ]

  const yearOptions = [
    { value: '', label: 'All Years' },
    { value: '2024-25', label: '2024-25' },
    { value: '2023-24', label: '2023-24' },
    { value: '2022-23', label: '2022-23' }
  ]

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'school', label: 'School' },
    { value: 'ug', label: 'Undergraduate' },
    { value: 'pg', label: 'Postgraduate' },
    { value: 'coaching', label: 'Coaching' },
    { value: 'custom', label: 'Custom' }
  ]

  return (
    <div className={`rounded-xl border ${
      mounted && isDarkMode 
        ? 'bg-zinc-900/60 border-zinc-800/40' 
        : 'bg-white/80 border-gray-200/60'
    }`}>
      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <i className={`ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search classes by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
              mounted && isDarkMode 
                ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex gap-3">
            <Dropdown
              options={branchOptions}
              value={selectedBranch}
              onChange={setSelectedBranch}
              placeholder="Location"
              className="min-w-[120px]"
            />
            
            <Dropdown
              options={courseOptions}
              value={selectedCourse}
              onChange={setSelectedCourse}
              placeholder="Program"
              className="min-w-[120px]"
            />

            <Dropdown
              options={yearOptions}
              value={selectedYear}
              onChange={setSelectedYear}
              placeholder="Year"
              className="min-w-[100px]"
            />

            <Dropdown
              options={typeOptions}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="Type"
              className="min-w-[120px]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* View Toggle */}
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

export default memo(ClassFilters)