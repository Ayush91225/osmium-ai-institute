'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import StatusChip from './StatusChip'

interface TeacherHeaderProps {
  onAddTeacher: () => void
  onBulkImport: () => void
  totalTeachers: number
  activeTeachers: number
}

function TeacherHeader({ onAddTeacher, onBulkImport, totalTeachers, activeTeachers }: TeacherHeaderProps) {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex flex-col gap-4 sm:gap-6 mt-12 md:mt-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 md:mb-6">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 px-4 md:px-0">
              <h1 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.3] tracking-tight mt-4 text-black" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                Faculty Management
              </h1>
              <StatusChip status="0 Active" variant="success" />
            </div>
            <p className="text-sm sm:text-base px-4 md:px-0 text-gray-600">
              Manage faculty members, assignments, and academic responsibilities
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onBulkImport}
              className="px-4 py-3 rounded-xl text-sm font-medium duration-200 border flex items-center justify-center bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
            >
              <i className="ph ph-upload-simple mr-2 text-sm" />
              Import
            </button>
            <button
              onClick={onAddTeacher}
              className="px-4 py-3 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-medium duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
            >
              <i className="ph ph-plus mr-2 text-sm" />
              Add Faculty
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6 mt-12 md:mt-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 md:mb-6">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 px-4 md:px-0">
            <h1 className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.3] tracking-tight mt-4 transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
              Faculty Management
            </h1>
            <StatusChip status={`${activeTeachers} Active`} variant="success" />
          </div>
          <p className={`text-sm sm:text-base transition-colors duration-200 px-4 md:px-0 ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Manage faculty members, assignments, and academic responsibilities
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={onBulkImport}
            className={`px-4 py-3 rounded-xl text-sm font-medium duration-200 border flex items-center justify-center ${
              isDarkMode
                ? 'bg-zinc-900/50 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/70 hover:border-zinc-600/70'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <i className="ph ph-upload-simple mr-2 text-sm" />
            Import
          </button>
          <button
            onClick={onAddTeacher}
            className="px-4 py-3 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-medium duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
          >
            <i className="ph ph-plus mr-2 text-sm" />
            Add Faculty
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(TeacherHeader)