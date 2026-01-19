'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { getDatabase, Class } from '@/lib/database'

interface AddSubjectModalProps {
  isOpen: boolean
  onClose: () => void
  onAddSubject?: () => void
}

export default function AddSubjectModal({ isOpen, onClose, onAddSubject }: AddSubjectModalProps) {
  const { isDarkMode } = useDarkMode()
  const [classes, setClasses] = useState<Class[]>([])
  const [formData, setFormData] = useState({ name: '', code: '', credits: 3, classIds: [] as string[] })
  const [classSearch, setClassSearch] = useState('')
  const [showClassDropdown, setShowClassDropdown] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setClasses(getDatabase().getClasses())
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showClassDropdown && !(e.target as HTMLElement).closest('.class-dropdown-container')) {
        setShowClassDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showClassDropdown])

  useEffect(() => {
    if (formData.name) {
      const code = formData.name.substring(0, 3).toUpperCase() + Math.floor(100 + Math.random() * 900)
      setFormData(prev => ({ ...prev, code }))
    }
  }, [formData.name])

  const filteredClasses = classes.filter(cls => cls.name.toLowerCase().includes(classSearch.toLowerCase()))
  const selectedClasses = classes.filter(cls => formData.classIds.includes(cls.id))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.classIds.length === 0) {
      alert('Please select at least one class')
      return
    }
    const db = getDatabase()
    const existingSubject = db.getSubjects().find(s => s.code === formData.code)
    if (existingSubject) {
      alert(`A subject with code "${formData.code}" already exists. Please use a different name.`)
      return
    }
    const subjectId = `SUB${Date.now()}`
    db.addSubject({ id: subjectId, name: formData.name, code: formData.code, credits: formData.credits })
    formData.classIds.forEach(classId => {
      const cls = classes.find(c => c.id === classId)
      if (cls) db.updateClass(classId, { subjects: [...cls.subjects, subjectId] })
    })
    setFormData({ name: '', code: '', credits: 3, classIds: [] })
    setClassSearch('')
    onClose()
    onAddSubject?.()
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className={`absolute inset-0 backdrop-blur-md ${isDarkMode ? 'bg-black/40' : 'bg-black/20'}`} onClick={onClose} />
      <div className={`relative rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border w-[90vw] max-w-md max-h-[85vh] overflow-hidden backdrop-blur-xl ${isDarkMode ? 'bg-zinc-950/95 border-zinc-800/50' : 'bg-white/95 border-gray-100/50'}`}>
        <div className={`flex items-center justify-between p-6 border-b backdrop-blur-sm ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-100/50'}`}>
          <div>
            <h2 className={`text-lg font-semibold tracking-tight ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>Add Subject</h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Create a new subject</p>
          </div>
          <button onClick={onClose} className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200 ${isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-300 hover:scale-105' : 'hover:bg-gray-100/80 text-gray-400 hover:text-gray-600 hover:scale-105'}`}>
            <i className="ph ph-x" style={{ fontSize: '16px' }} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
          <div className="p-6 pb-8 space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Classes *</label>
              <div className="relative class-dropdown-container">
                <div className={`px-3 py-2.5 rounded-xl border text-sm cursor-pointer ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/80 border-gray-200/30'}`} onClick={() => setShowClassDropdown(!showClassDropdown)}>
                  {selectedClasses.length === 0 ? (
                    <span className={isDarkMode ? 'text-zinc-500' : 'text-gray-400'}>Select classes...</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {selectedClasses.map(cls => (
                        <span key={cls.id} className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 ${isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}>
                          {cls.name}
                          <button type="button" onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, classIds: formData.classIds.filter(id => id !== cls.id) }) }} className="hover:text-red-500">
                            <i className="ph ph-x text-xs" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {showClassDropdown && (
                  <div className={`absolute z-10 w-full mt-1 rounded-xl border shadow-lg ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <div className="p-2">
                      <input type="text" value={classSearch} onChange={(e) => setClassSearch(e.target.value)} placeholder="Search classes..." className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`} onClick={(e) => e.stopPropagation()} />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredClasses.length === 0 ? (
                        <p className={`text-xs p-3 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>No classes found</p>
                      ) : (
                        filteredClasses.map(cls => (
                          <button key={cls.id} type="button" onClick={() => { if (formData.classIds.includes(cls.id)) { setFormData({ ...formData, classIds: formData.classIds.filter(id => id !== cls.id) }) } else { setFormData({ ...formData, classIds: [...formData.classIds, cls.id] }) } }} className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 ${formData.classIds.includes(cls.id) ? isDarkMode ? 'bg-[#8C7B65]/20 text-zinc-200' : 'bg-[#8C7B65]/10 text-gray-900' : isDarkMode ? 'hover:bg-zinc-800 text-zinc-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                            <input type="checkbox" checked={formData.classIds.includes(cls.id)} readOnly className="rounded" />
                            <span>{cls.name}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Select one or more classes for this subject</p>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Subject Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'}`} placeholder="e.g., Mathematics, Physics" />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Subject Code</label>
              <input type="text" disabled value={formData.code} className={`w-full px-3 py-2.5 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-900/30 border-zinc-800/30 text-zinc-400' : 'bg-gray-100 border-gray-200 text-gray-500'}`} placeholder="Auto-generated" />
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Automatically generated from subject name</p>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Hours/Week *</label>
              <input type="number" required min="1" max="20" value={formData.credits} onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })} className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100' : 'bg-gray-50/80 border-gray-200/30 text-gray-900'}`} />
            </div>
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-zinc-900/30 border-zinc-800/30' : 'bg-gray-50/50 border-gray-200/30'}`}>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                <i className="ph ph-info mr-1" />Add curriculum & syllabus after creating the subject
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border ${isDarkMode ? 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 border-zinc-700/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'}`}>Cancel</button>
              <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#8C7B65] to-[#A0906F] hover:from-[#7A6B58] hover:to-[#8E7E5F] text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg shadow-[#8C7B65]/20">Create Subject</button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}
