'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { ApprovalRequest } from '@/contexts/ApprovalContext'

interface ApprovalTableProps {
  approvals: ApprovalRequest[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onRowClick: (approval: ApprovalRequest) => void
  type: 'teachers' | 'students'
  status: 'all' | 'pending' | 'approved' | 'rejected'
}

export default function ApprovalTable({ approvals, onApprove, onReject, onRowClick, type, status }: ApprovalTableProps) {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
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

  const getStatusBadge = (requestStatus: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full"
    
    if (!mounted) {
      return `${baseClasses} ${
        requestStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
        requestStatus === 'approved' ? 'bg-emerald-100 text-emerald-700' :
        'bg-red-100 text-red-700'
      }`
    }

    return `${baseClasses} ${
      requestStatus === 'pending' 
        ? isDarkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
        : requestStatus === 'approved'
          ? isDarkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
          : isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
    }`
  }

  if (!mounted) {
    return (
      <div className="rounded-xl border overflow-hidden bg-white border-gray-200/60">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">{type === 'teachers' ? 'Teacher' : 'Student'}</th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">{type === 'teachers' ? 'Department' : 'Class'}</th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Requested</th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-200 rounded w-20" />
                        <div className="h-2 bg-gray-200 rounded w-24" />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><div className="h-3 bg-gray-200 rounded w-16" /></td>
                  <td className="px-3 py-3"><div className="h-3 bg-gray-200 rounded w-12" /></td>
                  <td className="px-3 py-3"><div className="h-5 bg-gray-200 rounded-full w-16" /></td>
                  <td className="px-3 py-3 text-right"><div className="h-6 bg-gray-200 rounded w-20 ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (approvals.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl border ${
        isDarkMode 
          ? 'bg-zinc-900/60 border-zinc-800/40 text-zinc-400' 
          : 'bg-white/80 border-gray-200/60 text-gray-500'
      }`}>
        <i className={`ph ${type === 'teachers' ? 'ph-chalkboard-teacher' : 'ph-users'} text-3xl mb-3`} />
        <p className="text-sm">
          No {status === 'pending' ? 'pending' : status} {type} requests found
        </p>
      </div>
    )
  }

  return (
    <div className={`rounded-xl border overflow-hidden ${
      isDarkMode 
        ? 'bg-zinc-900/60 border-zinc-800/40' 
        : 'bg-white/80 border-gray-200/60'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${
            isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'
          }`}>
            <tr>
              <th className={`px-3 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {type === 'teachers' ? 'Teacher' : 'Student'}
              </th>
              <th className={`px-3 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {type === 'teachers' ? 'Department' : 'Class'}
              </th>
              <th className={`px-3 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Requested
              </th>
              <th className={`px-3 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Status
              </th>
              <th className={`px-3 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            isDarkMode ? 'divide-zinc-800/50' : 'divide-gray-100'
          }`}>
            {approvals.map((approval) => (
              <tr
                key={approval.id}
                className={`cursor-pointer group ${
                  isDarkMode 
                    ? 'hover:bg-zinc-800/30' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onRowClick(approval)}
              >
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={type === 'teachers' ? getTeacherAvatar(approval.id) : getStudentAvatar(approval.email)}
                        alt={`${approval.name} avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-medium ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>
                        {approval.name}
                      </div>
                      <div className={`text-xs ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                      }`}>
                        {approval.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`px-3 py-3 text-sm ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-900'
                }`}>
                  {approval.department || approval.class || 'Not specified'}
                </td>
                <td className={`px-3 py-3 text-sm ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-900'
                }`}>
                  {formatDate(approval.requestedAt)}
                </td>
                <td className="px-3 py-3">
                  <span className={getStatusBadge(approval.status)}>
                    {approval.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-right">
                  {approval.status === 'pending' ? (
                    <div className="opacity-0 group-hover:opacity-100 flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onApprove(approval.id)
                        }}
                        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                          isDarkMode
                            ? 'bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onReject(approval.id)
                        }}
                        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                          isDarkMode
                            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className={`text-xs ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                    }`}>
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}