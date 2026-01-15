'use client'

import { memo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  teacherName: string
  type?: 'teacher' | 'student' | 'class'
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, teacherName, type = 'teacher' }: DeleteConfirmModalProps) {
  const { isDarkMode } = useDarkMode()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!isOpen || !mounted) return null

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div 
        className={`absolute inset-0 backdrop-blur-md ${
          isDarkMode ? 'bg-black/40' : 'bg-black/20'
        }`}
        onClick={onClose}
      />
      
      <div className={`relative rounded-3xl border w-full max-w-sm backdrop-blur-xl ${
        isDarkMode 
          ? 'bg-zinc-950/95 border-zinc-800/50' 
          : 'bg-white/95 border-gray-100/50'
      }`}>
        {/* Content */}
        <div className="p-6 text-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            isDarkMode ? 'bg-red-500/10' : 'bg-red-50'
          }`}>
            <i className="ph ph-trash text-2xl text-red-500" />
          </div>
          
          <h3 className={`text-lg font-semibold mb-2 ${
            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
          }`}>
            {type === 'student' ? 'Remove Student' : type === 'class' ? 'Delete Class' : t('remove_faculty_member')}
          </h3>
          
          <p className={`text-sm mb-6 ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>
            Are you sure you want to {type === 'class' ? 'delete' : 'remove'} <span className="font-medium">{teacherName}</span>? 
            {type === 'class' && ' All associated data including students, subjects, and assignments will be permanently removed.'}
            {type !== 'class' && ' This action cannot be undone.'}
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isDarkMode 
                  ? 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 border border-zinc-700/50' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {t('cancel')}
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium"
            >
              {t('remove')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default memo(DeleteConfirmModal)