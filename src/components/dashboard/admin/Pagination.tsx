'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
}

function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage,
  onPageChange, 
  onPrevious, 
  onNext 
}: PaginationProps) {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (totalPages <= 1) return null

  const startItem = ((currentPage - 1) * itemsPerPage) + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className={`text-sm ${
        mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-600'
      }`}>
        Showing {startItem} to {endItem} of {totalItems} faculty
      </p>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg text-sm ${
            currentPage === 1
              ? mounted && isDarkMode ? 'text-zinc-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
              : mounted && isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <i className="ph ph-caret-left" />
        </button>
        
        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  pageNum === currentPage
                    ? 'bg-[#8C7B65] text-white'
                    : mounted && isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
        </div>
        
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg text-sm ${
            currentPage === totalPages
              ? mounted && isDarkMode ? 'text-zinc-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
              : mounted && isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <i className="ph ph-caret-right" />
        </button>
      </div>
    </div>
  )
}

export default memo(Pagination)