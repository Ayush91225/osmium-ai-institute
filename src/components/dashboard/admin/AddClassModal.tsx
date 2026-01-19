'use client'

import { memo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useClasses, Class } from '@/contexts/ClassContext'
import { getDatabase } from '@/lib/database'

interface AddClassModalProps {
  isOpen: boolean
  onClose: () => void
  onAddClass: (cls: Class) => void
}

function AddClassModal({ isOpen, onClose, onAddClass }: AddClassModalProps) {
  const { isDarkMode } = useDarkMode()
  const { branches, courses } = useClasses()
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    branchId: '',
    courseId: '',
    department: '',
    programType: 'school' as 'school' | 'ug' | 'pg' | 'coaching' | 'custom',
    academicYear: '2024-25',
    semester: '',
    section: '',
    capacity: 40
  })
  const [displayName, setDisplayName] = useState('')

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

  useEffect(() => {
    const parts = [formData.name]
    if (formData.section) parts.push(formData.section)
    if (formData.semester) parts.push(formData.semester)
    setDisplayName(parts.filter(Boolean).join(' - '))
  }, [formData.name, formData.section, formData.semester])

  useEffect(() => {
    if (formData.name && formData.courseId) {
      const course = courses.find(c => c.id === formData.courseId)
      const nameAbbr = formData.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 3)
      const courseCode = course?.code || nameAbbr
      const sectionPart = formData.section ? `-${formData.section}` : ''
      const semesterPart = formData.semester ? `-S${formData.semester}` : ''
      const newCode = `${courseCode}${semesterPart}${sectionPart}`
      if (newCode !== formData.code) {
        setFormData(prev => ({ ...prev, code: newCode }))
      }
    }
  }, [formData.name, formData.section, formData.semester, formData.courseId, courses, formData.code])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.section && !formData.semester) {
      alert('Please provide either Section or Semester/Year/Batch')
      return
    }

    const db = getDatabase()
    const existingClass = db.getClasses().find(c => c.code === formData.code)
    if (existingClass) {
      alert(`A class with code "${formData.code}" already exists. Please modify the details to create a unique class.`)
      return
    }
    
    const newClass: Class = {
      id: `CLS${Date.now()}`,
      ...formData,
      name: displayName,
      currentStrength: 0,
      subjects: [],
      subjectTeachers: [],
      status: 'active',
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
      updatedAt: new Date().toISOString()
    }

    onAddClass(newClass)
    onClose()
    setFormData({
      name: '',
      code: '',
      branchId: '',
      courseId: '',
      department: '',
      programType: 'school',
      academicYear: '2024-25',
      semester: '',
      section: '',
      capacity: 40
    })
    setDisplayName('')
  }

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
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
            }`}>Create New Class/Batch</h2>
            <p className={`text-sm mt-1 ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>Add a new class, batch, or section</p>
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
                    Class Name *
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
                    placeholder="e.g., Grade 10, B.Tech CSE, JEE Batch"
                  />
                  {displayName && (
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                    }`}>
                      Display: <span className={isDarkMode ? 'text-zinc-300' : 'text-gray-700'}>{displayName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Class Code
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.code}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm ${
                      isDarkMode 
                        ? 'bg-zinc-900/30 border-zinc-800/30 text-zinc-400' 
                        : 'bg-gray-100 border-gray-200 text-gray-500'
                    }`}
                    placeholder="Auto-generated"
                  />
                  <p className={`text-xs mt-1 ${
                    isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                  }`}>Automatically generated from program and details</p>
                </div>
              </div>
            </div>

            {/* Location & Program */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Location & Program</h3>
              
              <div className="grid grid-cols-2 gap-4">
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

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Program *
                  </label>
                  <select
                    required
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900'
                    }`}
                  >
                    <option value="">Select Program</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
              </div>

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
                    Academic Year *
                  </label>
                  <select
                    required
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900'
                    }`}
                  >
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                    <option value="2022-23">2022-23</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Department *
                </label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                    isDarkMode 
                      ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100' 
                      : 'bg-gray-50/80 border-gray-200/30 text-gray-900'
                  }`}
                >
                  <option value="">Select Department</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medical">Medical</option>
                  <option value="Law">Law</option>
                  <option value="Management">Management</option>
                </select>
              </div>
            </div>

            {/* Class Details */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Class Details</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Semester/Year/Batch {!formData.section && '*'}
                  </label>
                  <input
                    type="text"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="e.g., 1, 2024"
                  />
                  <p className={`text-xs mt-1 ${
                    isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                  }`}>Required if Section is empty</p>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Section {!formData.semester && '*'}
                  </label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value.toUpperCase() })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="e.g., A, B"
                  />
                  <p className={`text-xs mt-1 ${
                    isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                  }`}>Required if Semester is empty</p>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Capacity *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
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
                Create Class
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default memo(AddClassModal)
