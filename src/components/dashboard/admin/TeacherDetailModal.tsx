'use client'

import { memo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  subjects: string[]
  classes: string[]
  department: string
  joiningDate: string
  status: 'active' | 'inactive'
  experience: number
  qualification: string
  performance?: number
}

interface TeacherDetailModalProps {
  teacher: Teacher | null
  isOpen: boolean
  onClose: () => void
  onEdit: (teacher: Teacher) => void
  onAssignClasses: (teacher: Teacher) => void
}

function TeacherDetailModal({ teacher, isOpen, onClose, onEdit, onAssignClasses }: TeacherDetailModalProps) {
  const { isDarkMode } = useDarkMode()
  const [expandedSubjects, setExpandedSubjects] = useState(false)
  const [expandedClasses, setExpandedClasses] = useState(false)

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

  if (!isOpen || !teacher) return null

  const generateAvatar = (name: string) => {
    const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
    return initials
  }

  const modalContent = (
    <>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center">
        <div 
          className={`absolute inset-0 backdrop-blur-md ${
            isDarkMode ? 'bg-black/40' : 'bg-black/20'
          }`}
          onClick={onClose}
        />
        
        <div className={`relative rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border w-[90vw] max-w-md max-h-[85vh] overflow-hidden backdrop-blur-xl ${
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
              }`}>Faculty Details</h2>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>{teacher.name}</p>
            </div>
            <button 
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center rounded-xl  duration-200 ${
                isDarkMode 
                  ? 'hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-300 hover:scale-105' 
                  : 'hover:bg-gray-100/80 text-gray-400 hover:text-gray-600 hover:scale-105'
              }`}
            >
              <i className="ph ph-x" style={{ fontSize: '16px' }} />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
            <div className="p-6 pb-8 space-y-6">
              {/* Profile */}
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Profile</h3>
                
                <div className={`p-5 rounded-2xl backdrop-blur-sm border ${
                  isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/80 border-gray-200/30'
                }`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-[#F2EDE4] rounded-full flex items-center justify-center">
                      <span className="text-[#8C7B65] font-medium text-lg">
                        {generateAvatar(teacher.name)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>{teacher.name}</div>
                      <div className={`text-xs font-medium ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                      }`}>{teacher.department}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className={`font-medium ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Email:</span>
                        <span className={`font-semibold ${
                          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                        }`}>{teacher.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`font-medium ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Phone:</span>
                        <span className={`font-semibold ${
                          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                        }`}>{teacher.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`font-medium ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Experience:</span>
                        <span className={`font-semibold ${
                          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                        }`}>{teacher.experience} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`font-medium ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Qualification:</span>
                        <span className={`font-semibold ${
                          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                        }`}>{teacher.qualification}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic */}
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Academic</h3>
                
                <div className="space-y-3">
                  {/* Subjects Dropdown */}
                  <div className={`rounded-2xl border ${
                    isDarkMode ? 'border-zinc-800/30' : 'border-gray-200/30'
                  }`}>
                    <button 
                      onClick={() => setExpandedSubjects(!expandedSubjects)}
                      className={`w-full flex items-center justify-between p-4  duration-200 text-left ${
                        isDarkMode 
                          ? 'hover:bg-zinc-800/30 hover:scale-[1.02]' 
                          : 'hover:bg-gray-50/80 hover:scale-[1.02]'
                      } ${expandedSubjects ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`ph ph-books ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                        }`} style={{ fontSize: '16px' }} />
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                        }`}>Subjects ({teacher.subjects.length})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>{teacher.subjects.slice(0, 2).join(', ')}{teacher.subjects.length > 2 ? '...' : ''}</span>
                        <i className={`ph ph-caret-down transition-transform duration-200 ${
                          expandedSubjects ? 'rotate-180' : ''
                        } ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} style={{ fontSize: '12px' }} />
                      </div>
                    </button>
                    
                    {expandedSubjects && (
                      <div className={`px-4 pb-4 border-t ${
                        isDarkMode ? 'border-zinc-800/30' : 'border-gray-200/30'
                      }`}>
                        <div className="pt-3 space-y-2">
                          {teacher.subjects.map((subject, index) => (
                            <div key={index} className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                              isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                            }`}>
                              <i className={`ph ph-book text-xs ${
                                isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                              }`} />
                              <span className={`text-xs font-medium ${
                                isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                              }`}>{subject}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Classes Dropdown */}
                  <div className={`rounded-2xl border ${
                    isDarkMode ? 'border-zinc-800/30' : 'border-gray-200/30'
                  }`}>
                    <button 
                      onClick={() => setExpandedClasses(!expandedClasses)}
                      className={`w-full flex items-center justify-between p-4  duration-200 text-left ${
                        isDarkMode 
                          ? 'hover:bg-zinc-800/30 hover:scale-[1.02]' 
                          : 'hover:bg-gray-50/80 hover:scale-[1.02]'
                      } ${expandedClasses ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`ph ph-users ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                        }`} style={{ fontSize: '16px' }} />
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                        }`}>Classes ({teacher.classes.length})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>{teacher.classes.slice(0, 2).join(', ')}{teacher.classes.length > 2 ? '...' : ''}</span>
                        <i className={`ph ph-caret-down transition-transform duration-200 ${
                          expandedClasses ? 'rotate-180' : ''
                        } ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} style={{ fontSize: '12px' }} />
                      </div>
                    </button>
                    
                    {expandedClasses && (
                      <div className={`px-4 pb-4 border-t ${
                        isDarkMode ? 'border-zinc-800/30' : 'border-gray-200/30'
                      }`}>
                        <div className="pt-3 space-y-2">
                          {teacher.classes.map((className, index) => (
                            <div key={index} className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                              isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                            }`}>
                              <div className="flex items-center gap-2">
                                <i className={`ph ph-graduation-cap text-xs ${
                                  isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                                }`} />
                                <span className={`text-xs font-medium ${
                                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                                }`}>{className}</span>
                              </div>
                              <button 
                                onClick={() => onAssignClasses(teacher)}
                                className={`text-xs px-2 py-1 rounded-md transition-colors ${
                                  isDarkMode 
                                    ? 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Edit
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Actions</h3>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => onEdit(teacher)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl  duration-200 text-left border ${
                      isDarkMode 
                        ? 'hover:bg-zinc-800/30 border-zinc-800/30 hover:border-zinc-700/50 hover:scale-[1.02]' 
                        : 'hover:bg-gray-50/80 border-gray-200/30 hover:border-gray-300/50 hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`ph ph-pencil ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                      }`} style={{ fontSize: '16px' }} />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>Edit Details</span>
                    </div>
                    <i className={`ph ph-caret-right ${
                      isDarkMode ? 'text-zinc-600' : 'text-gray-400'
                    }`} style={{ fontSize: '12px' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return createPortal(modalContent, document.body)
}

export default memo(TeacherDetailModal)