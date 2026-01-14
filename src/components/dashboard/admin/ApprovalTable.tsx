'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { ApprovalRequest } from '@/contexts/ApprovalContext'

interface ApprovalTableProps {
  approvals: ApprovalRequest[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  status: 'pending' | 'approved' | 'rejected'
}

export default function ApprovalTable({ approvals, onApprove, onReject, status }: ApprovalTableProps) {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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

  const getTypeBadge = (type: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-md"
    
    if (!mounted) {
      return `${baseClasses} ${
        type === 'teacher' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
      }`
    }

    return `${baseClasses} ${
      type === 'teacher'
        ? isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
        : isDarkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
    }`
  }

  if (approvals.length === 0) {
    return (
      <div className={`rounded-xl border p-8 text-center ${
        mounted && isDarkMode 
          ? 'bg-zinc-900/50 border-zinc-800/50' 
          : 'bg-white border-gray-100'
      }`}>
        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
          mounted && isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'
        }`}>
          <i className={`ph ph-files text-2xl ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`} />
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${
          mounted && isDarkMode ? 'text-zinc-200' : 'text-gray-900'
        }`}>
          No {status} requests
        </h3>
        <p className={`text-sm ${
          mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>
          {status === 'pending' 
            ? 'All caught up! No pending approval requests at the moment.'
            : `No ${status} requests to display.`
          }
        </p>
      </div>
    )
  }

  return (
    <div className={`rounded-xl border overflow-hidden ${
      mounted && isDarkMode 
        ? 'bg-zinc-900/50 border-zinc-800/50' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${
            mounted && isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'
          }`}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Applicant
              </th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Type
              </th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Invite Link
              </th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Requested
              </th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                Status
              </th>
              {status === 'pending' && (
                <th className={`px-4 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                  mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
            {approvals.map((approval) => (
              <tr key={approval.id} className={`hover:${
                mounted && isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'
              } transition-colors`}>
                <td className="px-4 py-4">
                  <div>
                    <div className={`text-sm font-medium ${
                      mounted && isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                    }`}>
                      {approval.name}
                    </div>
                    <div className={`text-xs ${
                      mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`}>
                      {approval.email}
                    </div>
                    <div className={`text-xs ${
                      mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`}>
                      {approval.phone}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={getTypeBadge(approval.type)}>
                    {approval.type}
                  </span>
                  {approval.department && (
                    <div className={`text-xs mt-1 ${
                      mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`}>
                      {approval.department}
                    </div>
                  )}
                  {approval.class && (
                    <div className={`text-xs mt-1 ${
                      mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`}>
                      {approval.class}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className={`text-xs font-mono ${
                    mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                  }`}>
                    {approval.inviteLink.split('/').pop()}
                  </div>
                  <button className={`text-xs mt-1 hover:underline ${
                    mounted && isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Copy Link
                  </button>
                </td>
                <td className="px-4 py-4">
                  <div className={`text-sm ${
                    mounted && isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                  }`}>
                    {formatDate(approval.requestedAt)}
                  </div>
                  {approval.approvedAt && (
                    <div className={`text-xs mt-1 ${
                      mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`}>
                      Approved: {formatDate(approval.approvedAt)}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className={getStatusBadge(approval.status)}>
                    {approval.status}
                  </span>
                </td>
                {status === 'pending' && (
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onApprove(approval.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          mounted && isDarkMode
                            ? 'bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50'
                            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        }`}
                      >
                        <i className="ph ph-check mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(approval.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          mounted && isDarkMode
                            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        <i className="ph ph-x mr-1" />
                        Reject
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}