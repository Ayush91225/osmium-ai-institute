'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import Dropdown from './Dropdown'

interface TeacherFiltersProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedDepartment: string
  onDepartmentChange: (dept: string) => void
  selectedExperience: string
  onExperienceChange: (exp: string) => void
  viewMode: 'grid' | 'table'
  onViewModeChange: (mode: 'grid' | 'table') => void
  departments: string[]
  onExport: () => void
}

function TeacherFilters({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedExperience,
  onExperienceChange,
  viewMode,
  onViewModeChange,
  departments,
  onExport
}: TeacherFiltersProps) {
  const { isDarkMode } = useDarkMode()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    ...departments.map(dept => ({ value: dept, label: dept }))
  ]

  const experienceOptions = [
    { value: '', label: 'All Experience' },
    { value: '0-2', label: '0-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '10+', label: '10+ years' }
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
            placeholder={t('search_faculty')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
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
              options={departmentOptions}
              value={selectedDepartment}
              onChange={onDepartmentChange}
              placeholder={t('department')}
              className="min-w-[120px]"
            />
            
            <Dropdown
              options={experienceOptions}
              value={selectedExperience}
              onChange={onExperienceChange}
              placeholder={t('experience')}
              className="min-w-[120px]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExport}
              className={`p-2 rounded-lg ${
                mounted && isDarkMode 
                  ? 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 border border-zinc-700/50' 
                  : 'bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
              title="Export Data"
            >
              <i className="ph ph-download-simple text-sm" />
            </button>
            
            {/* View Toggle */}
            <div className={`flex rounded-lg border overflow-hidden ${
              mounted && isDarkMode ? 'border-zinc-700/50 bg-zinc-800/30' : 'border-gray-200 bg-gray-50'
            }`}>
              <button
                onClick={() => onViewModeChange('grid')}
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
                onClick={() => onViewModeChange('table')}
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

export default memo(TeacherFilters)