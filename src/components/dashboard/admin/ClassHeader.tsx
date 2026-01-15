'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useClasses } from '@/contexts/ClassContext'

export default function ClassHeader() {
  const { isDarkMode } = useDarkMode()
  const { stats, setIsBranchModalOpen, setIsCourseModalOpen, setIsClassModalOpen } = useClasses()
  const [mounted, setMounted] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showAddDeptModal, setShowAddDeptModal] = useState(false)
  const [newDepartment, setNewDepartment] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowQuickActions(false)
      }
    }

    if (showQuickActions) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showQuickActions])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-4 sm:gap-6 mt-12 md:mt-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 px-4 md:px-0">
            <h1 className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.3] tracking-tight mt-4 transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
              Classes & Batches
            </h1>
            <div className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
              isDarkMode ? 'bg-zinc-800/50 text-zinc-300' : 'bg-gray-100 text-gray-700'
            }`}>
              {stats.active} Active
            </div>
          </div>
          <p className={`text-sm sm:text-base transition-colors duration-200 px-4 md:px-0 ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Manage classes, batches, sections, and cohorts across all locations
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 md:px-0">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isDarkMode 
                  ? 'bg-zinc-900/60 border-zinc-800/40 text-zinc-300 hover:bg-zinc-800/60' 
                  : 'bg-white/80 border-gray-200/60 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className="ph ph-plus-circle text-base" />
              Quick Add
              <i className={`ph ph-caret-${showQuickActions ? 'up' : 'down'} text-xs`} />
            </button>

            {showQuickActions && (
              <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-lg z-50 ${
                isDarkMode 
                  ? 'bg-zinc-900/95 border-zinc-800/40 backdrop-blur-xl' 
                  : 'bg-white/95 border-gray-200/60 backdrop-blur-xl'
              }`}>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setIsBranchModalOpen(true)
                      setShowQuickActions(false)
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors flex items-center gap-2 ${
                      isDarkMode 
                        ? 'text-zinc-300 hover:bg-zinc-800/50' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <i className="ph ph-buildings text-base" />
                    Add Campus/Center
                  </button>
                  <button
                    onClick={() => {
                      setIsCourseModalOpen(true)
                      setShowQuickActions(false)
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors flex items-center gap-2 ${
                      isDarkMode 
                        ? 'text-zinc-300 hover:bg-zinc-800/50' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <i className="ph ph-graduation-cap text-base" />
                    Add Course
                  </button>
                  <button
                    onClick={() => {
                      setShowAddDeptModal(true)
                      setShowQuickActions(false)
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors flex items-center gap-2 ${
                      isDarkMode 
                        ? 'text-zinc-300 hover:bg-zinc-800/50' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <i className="ph ph-briefcase text-base" />
                    Add Department
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsClassModalOpen(true)}
            className="px-4 py-2.5 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <i className="ph ph-plus text-base" />
            Create Class/Batch
          </button>
        </div>
      </div>

      {showAddDeptModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className={`absolute inset-0 backdrop-blur-md ${
            isDarkMode ? 'bg-black/40' : 'bg-black/20'
          }`} onClick={() => setShowAddDeptModal(false)} />
          <div className={`relative rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border w-full max-w-md overflow-hidden backdrop-blur-xl ${
            isDarkMode ? 'bg-zinc-950/95 border-zinc-800/50' : 'bg-white/95 border-gray-100/50'
          }`}>
            <div className={`flex items-center justify-between p-6 border-b backdrop-blur-sm ${
              isDarkMode ? 'border-zinc-800/50' : 'border-gray-100/50'
            }`}>
              <div>
                <h2 className={`text-lg font-semibold tracking-tight ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Add Department</h2>
                <p className={`text-sm mt-1 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>Create a new department</p>
              </div>
              <button
                onClick={() => setShowAddDeptModal(false)}
                className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-300 hover:scale-105' 
                    : 'hover:bg-gray-100/80 text-gray-400 hover:text-gray-600 hover:scale-105'
                }`}
              >
                <i className="ph ph-x" style={{ fontSize: '16px' }} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-xs font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Department Name *
                </label>
                <input
                  type="text"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  placeholder="e.g., Computer Science, Business"
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                    isDarkMode 
                      ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                      : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowAddDeptModal(false)
                    setNewDepartment('')
                  }}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    isDarkMode 
                      ? 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 border-zinc-700/50' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newDepartment.trim()) {
                      console.log('New department:', newDepartment)
                      setShowAddDeptModal(false)
                      setNewDepartment('')
                    }
                  }}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#8C7B65] to-[#A0906F] hover:from-[#7A6B58] hover:to-[#8E7E5F] text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg shadow-[#8C7B65]/20"
                >
                  Add Department
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
