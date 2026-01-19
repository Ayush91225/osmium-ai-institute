'use client'

import { memo, useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useStudents } from '@/contexts/StudentContext'
import AddFacultyModal from './AddFacultyModal'
import AddStudentModal from './AddStudentModal'
import AddSubjectModal from './AddSubjectModal'

const quickActions = [
  { icon: 'ph-user-plus', label: 'Add Teacher', action: 'add-teacher' },
  { icon: 'ph-users', label: 'Enroll Student', action: 'enroll-student' },
  { icon: 'ph-books', label: 'Add Subject', action: 'add-subject' },
  { icon: 'ph-exam', label: 'Schedule Test', action: 'schedule-test' },
  { icon: 'ph-megaphone', label: 'Create Notice', action: 'create-notice' },
  { icon: 'ph-chart-bar', label: 'View Reports', action: 'view-reports' }
]

function QuickActionsSection() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const { setIsAddModalOpen, addStudent, isAddModalOpen, closeAllModals } = useStudents()
  const [mounted, setMounted] = useState(false)
  const [isAddFacultyModalOpen, setIsAddFacultyModalOpen] = useState(false)
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false)

  const handleAddTeacher = (teacher: any) => {
    console.log('New teacher added:', teacher)
  }

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const handleAction = useCallback((action: string) => {
    switch (action) {
      case 'add-teacher':
        setIsAddFacultyModalOpen(true)
        break
      case 'enroll-student':
        setIsAddModalOpen(true)
        break
      case 'add-subject':
        setIsAddSubjectModalOpen(true)
        break
      case 'schedule-test':
        // Navigate to test scheduling page
        break
      case 'create-notice':
        // Navigate to notice creation page
        break
      case 'view-reports':
        // Navigate to reports page
        break
      default:
        console.warn('Unknown action:', action)
    }
  }, [setIsAddModalOpen])

  return (
    <div className={`rounded-2xl p-4 border shadow-card  ${
      mounted && isDarkMode 
        ? 'bg-zinc-900/50 border-zinc-800/50' 
        : 'bg-white border-gray-50'
    }`}>
      <div className="mb-4">
        <h3 className={`text-base font-medium  ${
          mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
        }`}>Quick Actions</h3>
        <p className={`text-xs mt-1  ${
          mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>Common administrative tasks</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {quickActions.map((action) => (
          <button
            key={action.action}
            onClick={() => handleAction(action.action)}
            className={`group flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl  min-h-[80px] sm:min-h-[100px] border ${
              mounted && isDarkMode
                ? 'bg-zinc-800/30 border-transparent hover:bg-zinc-800/50 hover:border-zinc-700/50'
                : 'bg-[#F7F5F3] border-transparent hover:bg-white hover:shadow-md hover:border-gray-200'
            }`}
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center  group-hover:scale-105 shadow-sm ${
              mounted && isDarkMode ? 'bg-zinc-700/50' : 'bg-white'
            }`}>
              <i className={`ph ${action.icon}  ${
                mounted && isDarkMode 
                  ? 'text-zinc-300 group-hover:text-zinc-100' 
                  : 'text-[#8C7B65] group-hover:text-gray-700'
              }`} style={{ fontSize: '16px' }} />
            </div>
            <span className={`text-xs sm:text-sm font-medium text-center  leading-tight ${
              mounted && isDarkMode 
                ? 'text-zinc-300 group-hover:text-zinc-100' 
                : 'text-gray-700 group-hover:text-gray-900'
            }`}>
              {action.label}
            </span>
          </button>
        ))}
      </div>
      
      <AddFacultyModal
        isOpen={isAddFacultyModalOpen}
        onClose={() => setIsAddFacultyModalOpen(false)}
        onAddTeacher={handleAddTeacher}
      />
      
      <AddSubjectModal
        isOpen={isAddSubjectModalOpen}
        onClose={() => setIsAddSubjectModalOpen(false)}
      />
      
      {isAddModalOpen && (
        <AddStudentModal 
          isOpen={isAddModalOpen}
          onClose={closeAllModals}
          onAddStudent={addStudent}
        />
      )}
    </div>
  )
}

export default memo(QuickActionsSection)