'use client'

import { memo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useClasses, Course } from '@/contexts/ClassContext'

interface AddCourseModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCourse: (course: Course) => void
}

function AddCourseModal({ isOpen, onClose, onAddCourse }: AddCourseModalProps) {
  const { isDarkMode } = useDarkMode()
  const { branches } = useClasses()
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    programType: 'school' as 'school' | 'ug' | 'pg' | 'coaching' | 'custom',
    duration: '',
    branchId: '',
    description: '',
    eligibility: '',
    totalSeats: '',
    fees: '',
    status: 'active' as 'active' | 'inactive'
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newCourse: Course = {
      id: `CR${Date.now()}`,
      name: formData.name,
      code: formData.code,
      programType: formData.programType,
      duration: formData.duration,
      branchId: formData.branchId,
      status: formData.status
    }

    onAddCourse(newCourse)
    onClose()
    setFormData({
      name: '',
      code: '',
      programType: 'school',
      duration: '',
      branchId: '',
      description: '',
      eligibility: '',
      totalSeats: '',
      fees: '',
      status: 'active'
    })
  }

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div 
        className={`absolute inset-0 backdrop-blur-md ${
          isDarkMode ? 'bg-black/40' : 'bg-black/20'
        }`}
        onClick={onClose}
      />
      
      <div className={`relative rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border w-[90vw] max-w-2xl max-h-[85vh] overflow-hidden backdrop-blur-xl ${
        isDarkMode 
          ? 'bg-zinc-950/95 border-zinc-800/50' 
          : 'bg-white/95 border-gray-100/50'
      }`}>
        <div className={`flex items-center justify-between p-6 border-b backdrop-blur-sm ${
          isDarkMode ? 'border-zinc-800/50' : 'border-gray-100/50'
        }`}>
          <div>
            <h2 className={`text-lg font-semibold tracking-tight ${
              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>Add New Course/Program</h2>
            <p className={`text-sm mt-1 ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>Create a new course, program, or batch</p>
          </div>
          <button 
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200 ${
              isDarkMode 
                ? 'hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-300 hover:scale-105' 
                : 'hover:bg-gray-100/80 text-gray-400 hover:text-gray-600 hover:scale-105'
            }`}
          >
            <i className="ph ph-x" style={{ fontSize: '16px' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
          <div className="p-6 pb-8 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Basic Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Course Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="e.g., B.Tech Computer Science, Class 10 CBSE, JEE Main"
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="e.g., CSE, X-CBSE, JEE"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all resize-none ${
                    isDarkMode 
                      ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                      : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Brief description of the course..."
                />
              </div>
            </div>

            {/* Program Details */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Program Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Program Type *
                  </label>
                  <select
                    required
                    value={formData.programType}
                    onChange={(e) => setFormData({ ...formData, programType: e.target.value as any })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900'
                    }`}
                  >
                    <option value="school">School</option>
                    <option value="ug">Undergraduate</option>
                    <option value="pg">Postgraduate</option>
                    <option value="coaching">Coaching</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="e.g., 4 years, 2 years"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Location *
                </label>
                <select
                  required
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                    isDarkMode 
                      ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100' 
                      : 'bg-gray-50/80 border-gray-200/30 text-gray-900'
                  }`}
                >
                  <option value="">Select Location</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Admission Details */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Admission Details</h3>
              
              <div>
                <label className={`block text-xs font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Eligibility Criteria
                </label>
                <input
                  type="text"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                    isDarkMode 
                      ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                      : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="e.g., 10+2 with 60% marks"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Total Seats
                  </label>
                  <input
                    type="number"
                    value={formData.totalSeats}
                    onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="e.g., 120"
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Annual Fees
                  </label>
                  <input
                    type="text"
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="e.g., ₹1,50,000"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Status</h3>
              
              <div className={`flex items-center justify-between p-4 rounded-2xl border ${
                isDarkMode ? 'border-zinc-800/30' : 'border-gray-200/30'
              }`}>
                <div className="flex items-center gap-3">
                  <i className={`ph ph-toggle-right ${
                    isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                  }`} style={{ fontSize: '16px' }} />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                  }`}>Course Status</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, status: formData.status === 'active' ? 'inactive' : 'active' })}
                  className={`w-12 h-7 rounded-full relative cursor-pointer transition-all duration-300 shadow-inner ${
                    formData.status === 'active' ? 'bg-gradient-to-r from-[#8C7B65] to-[#A0906F] shadow-[#8C7B65]/20' : 'bg-gray-200 shadow-gray-300/50'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-lg ${
                    formData.status === 'active' ? 'translate-x-6 shadow-black/20' : 'translate-x-1 shadow-gray-400/30'
                  }`} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  isDarkMode 
                    ? 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 border-zinc-700/50' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#8C7B65] to-[#A0906F] hover:from-[#7A6B58] hover:to-[#8E7E5F] text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg shadow-[#8C7B65]/20"
              >
                Create Course
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default memo(AddCourseModal)
