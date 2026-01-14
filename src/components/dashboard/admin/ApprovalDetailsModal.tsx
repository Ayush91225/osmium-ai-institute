'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { ApprovalRequest } from '@/contexts/ApprovalContext'

interface ApprovalDetailsModalProps {
  approval: ApprovalRequest | null
  isOpen: boolean
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export default function ApprovalDetailsModal({ approval, isOpen, onClose, onApprove, onReject }: ApprovalDetailsModalProps) {
  const { isDarkMode } = useDarkMode()
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

  if (!isOpen || !approval || !mounted) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getTeacherAvatar = (teacherId: string) => {
    const seed = encodeURIComponent(teacherId)
    const backgroundColor = '4747eb,4762eb,477eeb,4799eb,47b4eb,47d0eb,47eb47,47eb62,47eb7e,47eb99,47ebb4,47ebd0,47ebeb,6247eb,62eb47,7e47eb,7eeb47,9947eb,99eb47,b447eb,b4eb47,d047eb,d0eb47,eb4747,eb4762,eb477e,eb4799,eb47d0,eb47eb,eb6247,eb7e47,eb9947,ebb447,ebd047,ebeb47,ffd5dc,ffdfbf,b6e3f4,c0aede,d1d4f9'
    const backgroundType = 'gradientLinear'
    const backgroundRotation = '0,360,10,20,30'
    
    return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=${backgroundColor}&backgroundType=${backgroundType}&backgroundRotation=${backgroundRotation}`
  }

  const getStudentAvatar = (rollNumber: string) => {
    return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${rollNumber}&radius=0&backgroundType[]&eyes=variant01,variant02,variant03,variant05,variant06,variant04,variant07,variant08,variant09,variant10,variant12,variant11,variant13,variant14,variant15,variant26,variant25,variant24,variant22,variant23,variant21,variant20&glassesProbability=30&mouth=variant01,variant02,variant03,variant04,variant05,variant07,variant08,variant09,variant10,variant11,variant12,variant13,variant14,variant15,variant16,variant17,variant18,variant19,variant20,variant21,variant22,variant23,variant24,variant25,variant26,variant27,variant28,variant29,variant30`
  }

  const getAvatarUrl = () => {
    return approval.type === 'teacher' 
      ? getTeacherAvatar(approval.id) 
      : getStudentAvatar(approval.email)
  }

  const modalContent = (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
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
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b backdrop-blur-sm ${
            isDarkMode ? 'border-zinc-800/50' : 'border-gray-100/50'
          }`}>
            <div>
              <h2 className={`text-lg font-semibold tracking-tight ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Registration Request</h2>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>Review application details</p>
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

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
            <div className="p-6 pb-8 space-y-6">
              {/* Profile Section */}
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Applicant</h3>
                
                <div className={`p-5 rounded-2xl backdrop-blur-sm border ${
                  isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/80 border-gray-200/30'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#8C7B65]/20">
                      <img 
                        src={getAvatarUrl()} 
                        alt={approval.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>{approval.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                          approval.type === 'teacher'
                            ? isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                            : isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-50 text-purple-600'
                        }`}>
                          {approval.type === 'teacher' ? 'Teacher' : 'Student'}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                          approval.status === 'pending'
                            ? isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-50 text-amber-600'
                            : approval.status === 'approved'
                              ? isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                              : isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600'
                        }`}>
                          {approval.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className={`font-medium ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}>Email:</span>
                      <span className={`font-semibold ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>{approval.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`font-medium ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}>Phone:</span>
                      <span className={`font-semibold ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>{approval.phone}</span>
                    </div>
                    {approval.address && (
                      <div className="flex justify-between">
                        <span className={`font-medium ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Address:</span>
                        <span className={`font-semibold text-right ${
                          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                        }`}>{approval.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>{approval.type === 'teacher' ? 'Professional' : 'Academic'}</h3>
                
                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'border-zinc-800/30' : 'border-gray-200/30'
                }`}>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {approval.type === 'teacher' ? (
                      <>
                        <div className="flex justify-between">
                          <span className={`font-medium ${
                            isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                          }`}>Department:</span>
                          <span className={`font-semibold ${
                            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                          }`}>{approval.department || 'Not specified'}</span>
                        </div>
                        {approval.qualification && (
                          <div className="flex justify-between">
                            <span className={`font-medium ${
                              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                            }`}>Qualification:</span>
                            <span className={`font-semibold ${
                              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                            }`}>{approval.qualification}</span>
                          </div>
                        )}
                        {approval.experience && (
                          <div className="flex justify-between">
                            <span className={`font-medium ${
                              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                            }`}>Experience:</span>
                            <span className={`font-semibold ${
                              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                            }`}>{approval.experience} years</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className={`font-medium ${
                            isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                          }`}>Class:</span>
                          <span className={`font-semibold ${
                            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                          }`}>{approval.class || 'Not assigned'}</span>
                        </div>
                        {approval.rollNumber && (
                          <div className="flex justify-between">
                            <span className={`font-medium ${
                              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                            }`}>Roll Number:</span>
                            <span className={`font-semibold ${
                              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                            }`}>{approval.rollNumber}</span>
                          </div>
                        )}
                        {approval.parentName && (
                          <div className="flex justify-between">
                            <span className={`font-medium ${
                              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                            }`}>Parent:</span>
                            <span className={`font-semibold ${
                              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                            }`}>{approval.parentName}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Request Info */}
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Request Details</h3>
                
                <div className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'border-zinc-800/30' : 'border-gray-200/30'
                }`}>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className={`font-medium ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}>Requested:</span>
                      <span className={`font-semibold ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>{formatDate(approval.requestedAt)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}>Invite Link:</span>
                      <code className={`text-xs px-2 py-1 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/50 text-zinc-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        ...{approval.inviteLink.split('/').pop()?.slice(-8)}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions - Only for pending */}
              {approval.status === 'pending' && (
                <div className={`space-y-4 pt-4 border-t ${
                  isDarkMode ? 'border-zinc-800/50' : 'border-gray-100/50'
                }`}>
                  <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>Actions</h3>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        onApprove(approval.id)
                        onClose()
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left border group ${
                        isDarkMode 
                          ? 'border-emerald-900/30 bg-emerald-950/10 hover:bg-emerald-950/20 hover:border-emerald-800/50 hover:scale-[1.02]' 
                          : 'border-emerald-200/50 bg-emerald-50/30 hover:bg-emerald-50/60 hover:border-emerald-300/60 hover:scale-[1.02]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        isDarkMode ? 'bg-emerald-900/20 group-hover:bg-emerald-900/30' : 'bg-emerald-100/50 group-hover:bg-emerald-100/80'
                      }`}>
                        <i className="ph ph-check text-emerald-500 group-hover:scale-110 transition-transform duration-200" style={{ fontSize: '18px' }} />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-500 transition-colors duration-200">Approve Request</span>
                        <p className={`text-xs mt-1 ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Grant access to the platform</p>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => {
                        onReject(approval.id)
                        onClose()
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left border group ${
                        isDarkMode 
                          ? 'border-red-900/30 bg-red-950/10 hover:bg-red-950/20 hover:border-red-800/50 hover:scale-[1.02]' 
                          : 'border-red-200/50 bg-red-50/30 hover:bg-red-50/60 hover:border-red-300/60 hover:scale-[1.02]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        isDarkMode ? 'bg-red-900/20 group-hover:bg-red-900/30' : 'bg-red-100/50 group-hover:bg-red-100/80'
                      }`}>
                        <i className="ph ph-x text-red-500 group-hover:scale-110 transition-transform duration-200" style={{ fontSize: '18px' }} />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-red-600 group-hover:text-red-500 transition-colors duration-200">Reject Request</span>
                        <p className={`text-xs mt-1 ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Deny access to the platform</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return createPortal(modalContent, document.body)
}