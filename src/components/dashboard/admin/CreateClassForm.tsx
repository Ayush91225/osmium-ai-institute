'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useClasses, Class } from '@/contexts/ClassContext'
import { getDatabase } from '@/lib/database'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'

export default function CreateClassForm() {
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const { branches, courses, addClass } = useClasses()
  const [mounted, setMounted] = useState(false)
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
    capacity: 40,
    status: 'active' as 'active' | 'inactive' | 'archived'
  })
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted) return null

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
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
      updatedAt: new Date().toISOString()
    }

    addClass(newClass)
    router.push(`/dashboard/admin/classes/${newClass.code}`)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-zinc-800/50 text-zinc-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <i className="ph ph-arrow-left text-xl" />
          </button>
          <div>
            <h1 className={`text-2xl font-semibold ${
              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
              Create New Class/Batch
            </h1>
            <p className={`text-sm ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              Add a new class, batch, or section
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-zinc-900/60 border-zinc-800/40' 
            : 'bg-white/80 border-gray-200/60'
        }`}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Class Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                    isDarkMode 
                      ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
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
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Class Code
                </label>
                <input
                  type="text"
                  disabled
                  value={formData.code}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm ${
                    isDarkMode 
                      ? 'bg-zinc-800/30 border-zinc-700/50 text-zinc-400' 
                      : 'bg-gray-100 border-gray-200 text-gray-500'
                  }`}
                  placeholder="Auto-generated"
                />
                <p className={`text-xs mt-1 ${
                  isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                }`}>Automatically generated</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Location *
                </label>
                <select
                  required
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                    isDarkMode 
                      ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="">Select Location</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Course *
                </label>
                <select
                  required
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                    isDarkMode 
                      ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-zinc-300' : 'text-gray-700'
              }`}>
                Department *
              </label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                  isDarkMode 
                    ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Program Type *
                </label>
                <select
                  required
                  value={formData.programType}
                  onChange={(e) => setFormData({ ...formData, programType: e.target.value as any })}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                    isDarkMode 
                      ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
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
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Academic Year *
                </label>
                <select
                  required
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                    isDarkMode 
                      ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="2024-25">2024-25</option>
                  <option value="2023-24">2023-24</option>
                  <option value="2022-23">2022-23</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Semester / Year / Batch {!formData.section && '*'}
                </label>
                <input
                  type="text"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                    isDarkMode 
                      ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                  placeholder="e.g., 1, 2024, Morning"
                />
                <p className={`text-xs mt-1 ${
                  isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                }`}>Required if Section is empty</p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Section {!formData.semester && '*'}
                </label>
                <input
                  type="text"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value.toUpperCase() })}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                    isDarkMode 
                      ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                  placeholder="e.g., A"
                />
                <p className={`text-xs mt-1 ${
                  isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                }`}>Required if Semester is empty</p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Capacity *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                    isDarkMode 
                      ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/40">
              <button
                type="button"
                onClick={() => router.back()}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Create Class/Batch
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
