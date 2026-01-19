'use client'

import { useState, useRef } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useSupportTickets } from '@/contexts/SupportTicketContext'
import StatusChip from './StatusChip'

interface SupportWindowProps {
  isOpen: boolean
  onClose: () => void
}

export default function SupportWindow({ isOpen, onClose }: SupportWindowProps) {
  const { isDarkMode } = useDarkMode()
  const { tickets, createTicket } = useSupportTickets()
  const [activeTab, setActiveTab] = useState('create')
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    category: '',
    severity: '' as 'critical' | 'high' | 'medium' | 'low' | '',
    subject: '',
    description: '',
    attachments: [] as File[]
  })

  const categories = [
    'Platform Access & Authentication',
    'Institutional Configuration & Administration', 
    'Student & Faculty Management',
    'Assessments, Tests & Question Banks',
    'AI Analytics, Reports & Exports',
    'Integrations, APIs & SSO',
    'Billing, Plans & Invoices',
    'Security, Privacy & Compliance',
    'Product Feedback & Feature Requests'
  ]

  const severityLevels = [
    { value: 'critical' as const, label: 'Critical', variant: 'danger' as const },
    { value: 'high' as const, label: 'High', variant: 'warning' as const },
    { value: 'medium' as const, label: 'Medium', variant: 'info' as const },
    { value: 'low' as const, label: 'Low', variant: 'default' as const }
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }))
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.severity) return
    
    createTicket({
      category: formData.category,
      severity: formData.severity,
      subject: formData.subject,
      description: formData.description,
      attachments: formData.attachments
    })
    
    setFormData({
      category: '',
      severity: '',
      subject: '',
      description: '',
      attachments: []
    })
    
    setActiveTab('tickets')
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'resolved': return 'success'
      case 'in-progress': return 'info'
      case 'pending': return 'warning'
      case 'closed': return 'default'
      default: return 'default'
    }
  }

  if (!isOpen) return null

  return (
    <div className={`fixed z-[9999] transition-all duration-300 ${
      isMinimized 
        ? 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-72 sm:w-80 h-12 rounded-2xl' 
        : 'inset-0 sm:bottom-6 sm:right-6 sm:inset-auto w-full h-full sm:w-[420px] sm:h-[650px] sm:rounded-2xl'
    } border shadow-2xl ${
      isDarkMode
        ? 'bg-zinc-900/98 border-zinc-800/60 backdrop-blur-2xl'
        : 'bg-white/98 border-gray-200/60 backdrop-blur-2xl'
    }`}>
      {/* Header */}
      <div 
        className={`flex items-center justify-between ${isMinimized ? 'px-4 py-2 cursor-pointer' : 'p-5'} ${!isMinimized ? 'border-b' : ''} ${
          isDarkMode ? 'border-zinc-800/50' : 'border-gray-200/50'
        }`}
        onClick={isMinimized ? () => setIsMinimized(false) : undefined}
      >
        <div className="flex items-center gap-2">
          <div className={`${isMinimized ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5'} rounded-full bg-emerald-500 animate-pulse flex-shrink-0`} />
          <h3 className={`${isMinimized ? 'text-xs' : 'text-sm'} font-semibold ${
            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
          }`}>
            Support Center
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMinimized(!isMinimized)
            }}
            className={`${isMinimized ? 'p-1' : 'p-2'} rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className={`ph ph-${isMinimized ? 'arrows-out' : 'minus'} ${isMinimized ? 'text-xs' : 'text-sm'}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className={`${isMinimized ? 'p-1' : 'p-2'} rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className={`ph ph-x ${isMinimized ? 'text-xs' : 'text-sm'}`} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Tabs */}
          <div className={`flex border-b ${
            isDarkMode ? 'border-zinc-800/50' : 'border-gray-200/50'
          }`}>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === 'create'
                  ? isDarkMode
                    ? 'text-zinc-100 border-b-2 border-[#8C7B65]'
                    : 'text-gray-900 border-b-2 border-[#8C7B65]'
                  : isDarkMode
                    ? 'text-zinc-400 hover:text-zinc-300'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Ticket
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === 'tickets'
                  ? isDarkMode
                    ? 'text-zinc-100 border-b-2 border-[#8C7B65]'
                    : 'text-gray-900 border-b-2 border-[#8C7B65]'
                  : isDarkMode
                    ? 'text-zinc-400 hover:text-zinc-300'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Tickets ({tickets.length})
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-5 max-h-[calc(100vh-140px)] sm:max-h-[calc(650px-140px)]">
            {activeTab === 'create' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-200'}`}>
                      <i className="ph ph-info text-sm text-blue-500" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>Quick Support</h4>
                      <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Get help with common issues</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => {
                        setFormData({
                          ...formData,
                          category: 'Platform Access & Authentication',
                          subject: 'Login Issues',
                          severity: 'high'
                        })
                      }}
                      className={`p-2 rounded-lg text-left transition-colors ${isDarkMode ? 'hover:bg-zinc-700/50 text-zinc-300' : 'hover:bg-gray-200 text-gray-700'}`}
                    >
                      <div className="text-xs font-medium">Login Issues</div>
                    </button>
                    <button 
                      onClick={() => {
                        setFormData({
                          ...formData,
                          category: 'Billing, Plans & Invoices',
                          subject: 'Billing Help',
                          severity: 'medium'
                        })
                      }}
                      className={`p-2 rounded-lg text-left transition-colors ${isDarkMode ? 'hover:bg-zinc-700/50 text-zinc-300' : 'hover:bg-gray-200 text-gray-700'}`}
                    >
                      <div className="text-xs font-medium">Billing Help</div>
                    </button>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>Create New Ticket</h4>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${
                          isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                        }`}>
                          Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className={`w-full px-3 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-[#8C7B65]/20 ${
                            isDarkMode 
                              ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 focus:border-[#8C7B65]/50' 
                              : 'bg-white border-gray-200 text-gray-900 focus:border-[#8C7B65]/50'
                          }`}
                          required
                        >
                          <option value="">Select category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${
                          isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                        }`}>
                          Priority
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {severityLevels.map((level) => (
                            <button
                              key={level.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, severity: level.value })}
                              className={`p-2.5 rounded-xl border text-left transition-all ${
                                formData.severity === level.value
                                  ? isDarkMode
                                    ? 'bg-zinc-800/70 border-zinc-700/70 ring-2 ring-[#8C7B65]/30'
                                    : 'bg-gray-100 border-gray-300 ring-2 ring-[#8C7B65]/30'
                                  : isDarkMode
                                    ? 'border-zinc-800/30 hover:bg-zinc-800/30 hover:border-zinc-700/50'
                                    : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                              }`}
                            >
                              <StatusChip status={level.label} variant={level.variant} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief description of the issue"
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-[#8C7B65]/20 ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-[#8C7B65]/50' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#8C7B65]/50'
                        }`}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Detailed description of the issue, steps to reproduce, and any relevant context"
                        rows={4}
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm resize-none transition-all focus:ring-2 focus:ring-[#8C7B65]/20 ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-[#8C7B65]/50' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#8C7B65]/50'
                        }`}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>
                        Attachments
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf,.txt,.log"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full p-4 border-2 border-dashed rounded-xl text-center text-sm transition-all hover:scale-[1.02] ${
                          isDarkMode 
                            ? 'border-zinc-700/50 hover:border-zinc-600/50 text-zinc-400 hover:bg-zinc-800/20' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <i className="ph ph-upload text-lg mb-2 block" />
                        <span className="font-medium">Drop files or click to upload</span>
                        <div className={`text-xs mt-1 ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                        }`}>
                          Screenshots, logs, documents (Max 10MB each)
                        </div>
                      </button>
                      
                      {formData.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {formData.attachments.map((file, index) => (
                            <div key={index} className={`flex items-center justify-between p-2.5 rounded-lg border ${
                              isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'
                            }`}>
                              <div className="flex items-center gap-2">
                                <i className={`ph ph-file text-sm ${
                                  isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                }`} />
                                <span className={`text-xs font-medium truncate ${
                                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                                }`}>
                                  {file.name}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className={`p-1 rounded-lg transition-colors ${
                                  isDarkMode ? 'text-zinc-500 hover:text-red-400 hover:bg-red-500/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                }`}
                              >
                                <i className="ph ph-x text-xs" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      Submit Support Request
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="space-y-3">
                {selectedTicket ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedTicket(null)}
                        className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'}`}
                      >
                        <i className="ph ph-arrow-left text-sm" />
                      </button>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>Ticket Details</h3>
                    </div>
                    
                    <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start justify-between mb-3">
                        <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                          {selectedTicket.subject}
                        </h4>
                        <StatusChip status={selectedTicket.status} variant={getStatusVariant(selectedTicket.status)} />
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Category:</span>
                          <p className={`text-sm ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{selectedTicket.category}</p>
                        </div>
                        
                        <div>
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Priority:</span>
                          <div className="mt-1">
                            <StatusChip status={selectedTicket.severity} variant={severityLevels.find(s => s.value === selectedTicket.severity)?.variant || 'default'} />
                          </div>
                        </div>
                        
                        <div>
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Created:</span>
                          <p className={`text-sm ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{selectedTicket.createdAt.toLocaleDateString()}</p>
                        </div>
                        
                        {selectedTicket.description && (
                          <div>
                            <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Description:</span>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{selectedTicket.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tickets.length === 0 ? (
                      <div className={`text-center py-6 ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}>
                        <i className="ph ph-ticket text-xl mb-2 block" />
                        <p className="text-sm font-medium">No support tickets yet</p>
                        <p className="text-xs mt-1">Create your first ticket to get started</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`text-xs font-medium ${
                            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                          }`}>
                            {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
                          </div>
                          <button className={`text-xs font-medium transition-colors ${
                            isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                          }`}>
                            View All
                          </button>
                        </div>
                        <div className="space-y-2">
                          {tickets.slice(0, 3).map((ticket) => (
                            <div 
                              key={ticket.id} 
                              onClick={() => setSelectedTicket(ticket)}
                              className={`p-3 rounded-lg border transition-all hover:scale-[1.01] cursor-pointer group ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50 hover:bg-zinc-800/50' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className={`text-sm font-medium truncate pr-2 group-hover:text-blue-400 transition-colors ${
                                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                                }`}>
                                  {ticket.subject}
                                </h4>
                                <StatusChip 
                                  status={ticket.status} 
                                  variant={getStatusVariant(ticket.status)} 
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <StatusChip 
                                  status={ticket.severity} 
                                  variant={severityLevels.find(s => s.value === ticket.severity)?.variant || 'default'} 
                                />
                                <span className={`text-xs ${
                                  isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                                }`}>
                                  {ticket.createdAt.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {tickets.length > 3 && (
                          <div className={`text-center pt-2 border-t ${
                            isDarkMode ? 'border-zinc-800/50' : 'border-gray-200/50'
                          }`}>
                            <button className={`text-xs font-medium transition-colors ${
                              isDarkMode ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-600 hover:text-gray-700'
                            }`}>
                              +{tickets.length - 3} more tickets
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}