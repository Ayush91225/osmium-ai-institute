'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useApprovals, ApprovalProvider } from '@/contexts/ApprovalContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import ApprovalTable from './ApprovalCards'
import ApprovalDetailsModal from './ApprovalDetailsModal'
import StatusChip from './StatusChip'

function ApprovalManagementContent() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [activeType, setActiveType] = useState<'teachers' | 'students'>('teachers')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApproval, setSelectedApproval] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    approvals,
    approveRequest,
    rejectRequest
  } = useApprovals()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRowClick = (approval: any) => {
    setSelectedApproval(approval)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedApproval(null)
  }

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const getFilteredApprovals = () => {
    let filtered = approvals.filter(approval => 
      activeType === 'teachers' ? approval.type === 'teacher' : approval.type === 'student'
    )
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(approval => approval.status === statusFilter)
    }
    
    if (searchTerm) {
      filtered = filtered.filter(approval => 
        approval.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        approval.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (approval.department && approval.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (approval.class && approval.class.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    return filtered
  }

  const getStatusCounts = (type: 'teacher' | 'student') => {
    const typeApprovals = approvals.filter(a => a.type === type)
    return {
      all: typeApprovals.length,
      pending: typeApprovals.filter(a => a.status === 'pending').length,
      approved: typeApprovals.filter(a => a.status === 'approved').length,
      rejected: typeApprovals.filter(a => a.status === 'rejected').length
    }
  }

  const teacherCounts = getStatusCounts('teacher')
  const studentCounts = getStatusCounts('student')

  const statusTabs = [
    { id: 'all', label: 'All', count: activeType === 'teachers' ? teacherCounts.all : studentCounts.all },
    { id: 'pending', label: 'Pending', count: activeType === 'teachers' ? teacherCounts.pending : studentCounts.pending },
    { id: 'approved', label: 'Approved', count: activeType === 'teachers' ? teacherCounts.approved : studentCounts.approved },
    { id: 'rejected', label: 'Rejected', count: activeType === 'teachers' ? teacherCounts.rejected : studentCounts.rejected }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:gap-6 mt-12 md:mt-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 md:mb-6">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 px-4 md:px-0">
                <h1 className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.3] tracking-tight mt-4 transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
                  Registration Requests
                </h1>
                <StatusChip 
                  status={`${(activeType === 'teachers' ? teacherCounts.pending : studentCounts.pending)} Pending`} 
                  variant="warning" 
                />
              </div>
              <p className={`text-sm sm:text-base transition-colors duration-200 px-4 md:px-0 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                Review and manage registration requests from teachers and students
              </p>
            </div>
          </div>
        </div>

        {/* Type Tabs */}
        <div className={`border-b ${
          isDarkMode ? 'border-zinc-800' : 'border-gray-200'
        }`}>
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveType('teachers')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeType === 'teachers'
                  ? isDarkMode
                    ? 'border-zinc-400 text-zinc-100'
                    : 'border-gray-900 text-gray-900'
                  : isDarkMode
                    ? 'border-transparent text-zinc-400 hover:text-zinc-300 hover:border-zinc-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="ph ph-chalkboard-teacher mr-2" />
              Teachers
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                activeType === 'teachers'
                  ? isDarkMode
                    ? 'bg-zinc-700 text-zinc-200'
                    : 'bg-gray-100 text-gray-900'
                  : isDarkMode
                    ? 'bg-zinc-800 text-zinc-400'
                    : 'bg-gray-100 text-gray-500'
              }`}>
                {teacherCounts.all}
              </span>
            </button>
            <button
              onClick={() => setActiveType('students')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeType === 'students'
                  ? isDarkMode
                    ? 'border-zinc-400 text-zinc-100'
                    : 'border-gray-900 text-gray-900'
                  : isDarkMode
                    ? 'border-transparent text-zinc-400 hover:text-zinc-300 hover:border-zinc-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="ph ph-users mr-2" />
              Students
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                activeType === 'students'
                  ? isDarkMode
                    ? 'bg-zinc-700 text-zinc-200'
                    : 'bg-gray-100 text-gray-900'
                  : isDarkMode
                    ? 'bg-zinc-800 text-zinc-400'
                    : 'bg-gray-100 text-gray-500'
              }`}>
                {studentCounts.all}
              </span>
            </button>
          </nav>
        </div>

        {/* Search Filter */}
        <div className={`rounded-xl border ${
          isDarkMode 
            ? 'bg-zinc-900/60 border-zinc-800/40' 
            : 'bg-white/80 border-gray-200/60'
        }`}>
          <div className="p-4">
            <div className="relative">
              <i className={`ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder={`Search ${activeType}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                  isDarkMode 
                    ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-zinc-300' : 'text-gray-700'
          }`}>
            Status:
          </span>
          <div className="overflow-x-auto pb-2 sm:pb-0">
            <div className="flex gap-2" style={{ minWidth: 'max-content' }}>
              {statusTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                    statusFilter === tab.id
                      ? isDarkMode
                        ? 'bg-zinc-800 text-zinc-100'
                        : 'bg-gray-100 text-gray-900'
                      : isDarkMode
                        ? 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                    statusFilter === tab.id
                      ? isDarkMode
                        ? 'bg-zinc-700 text-zinc-300'
                        : 'bg-white text-gray-600'
                      : isDarkMode
                        ? 'bg-zinc-700 text-zinc-400'
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Table */}
        <ApprovalTable 
          approvals={getFilteredApprovals()}
          onApprove={approveRequest}
          onReject={rejectRequest}
          onRowClick={handleRowClick}
          type={activeType}
          status={statusFilter === 'all' ? 'pending' : statusFilter}
        />

        {/* Modal */}
        <ApprovalDetailsModal
          approval={selectedApproval}
          isOpen={isModalOpen}
          onClose={closeModal}
          onApprove={approveRequest}
          onReject={rejectRequest}
        />
      </div>
    </DashboardLayout>
  )
}

export default function ApprovalManagement() {
  return (
    <ApprovalProvider>
      <ApprovalManagementContent />
    </ApprovalProvider>
  )
}