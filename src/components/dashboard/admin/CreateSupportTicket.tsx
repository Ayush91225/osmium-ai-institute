'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useDarkMode } from '@/contexts/DarkModeContext'
import StatusChip from './StatusChip'

interface CreateSupportTicketProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateSupportTicket({ isOpen, onClose }: CreateSupportTicketProps) {
  const { isDarkMode } = useDarkMode()
  const [activeTab, setActiveTab] = useState('details')
  const [formData, setFormData] = useState({
    category: '',
    severity: '',
    subject: '',
    description: '',
    attachments: null as File[] | null
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
    { value: 'critical', label: 'Critical', variant: 'danger' as const, desc: 'Platform outage, live assessment disruption' },
    { value: 'high', label: 'High', variant: 'warning' as const, desc: 'Major functionality impaired' },
    { value: 'medium', label: 'Medium', variant: 'info' as const, desc: 'Partial feature impact' },
    { value: 'low', label: 'Low', variant: 'default' as const, desc: 'General queries, documentation' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Support ticket submitted:', formData)
    onClose()
  }

  if (!isOpen) return null

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div 
        className={`absolute inset-0 backdrop-blur-md ${
          isDarkMode ? 'bg-black/40' : 'bg-black/20'
        }`}
        onClick={onClose}
      />
      
      <div className={`relative rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border w-[90vw] max-w-2xl max-h-[85vh] overflow-hidden backdrop-blur-xl ${
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
            }`}>Create Support Request</h2>
            <p className={`text-sm mt-1 ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>Submit a new support ticket for assistance</p>
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

        {/* Tabs */}
        <div className={`flex border-b ${
          isDarkMode ? 'border-zinc-800/50' : 'border-gray-100/50'
        }`}>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === 'details'
                ? isDarkMode
                  ? 'text-zinc-100 border-b-2 border-[#8C7B65]'
                  : 'text-gray-900 border-b-2 border-[#8C7B65]'
                : isDarkMode
                  ? 'text-zinc-400 hover:text-zinc-300'
                  : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Request Details
          </button>
          <button
            onClick={() => setActiveTab('attachments')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === 'attachments'
                ? isDarkMode
                  ? 'text-zinc-100 border-b-2 border-[#8C7B65]'
                  : 'text-gray-900 border-b-2 border-[#8C7B65]'
                : isDarkMode
                  ? 'text-zinc-400 hover:text-zinc-300'
                  : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Attachments
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(85vh-140px)] custom-scrollbar">
          <form onSubmit={handleSubmit} className="p-6 pb-8 space-y-6">
            {activeTab === 'details' && (
              <>
                <div className="space-y-4">
                  <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>Issue Classification</h3>
                  
                  <div className={`p-5 rounded-2xl backdrop-blur-sm border space-y-4 ${
                    isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/80 border-gray-200/30'
                  }`}>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm transition-all duration-200 ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 focus:border-[#8C7B65]/50' 
                            : 'bg-white border-gray-200 text-gray-900 focus:border-[#8C7B65]/50'
                        }`}
                        required
                      >
                        <option value="">Select issue category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-3 ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>
                        Severity Level
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {severityLevels.map((level) => (
                          <button
                            key={level.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, severity: level.value })}
                            className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                              formData.severity === level.value
                                ? isDarkMode
                                  ? 'bg-zinc-800/50 border-zinc-700/50 scale-[1.02]'
                                  : 'bg-white border-gray-300 scale-[1.02]'
                                : isDarkMode
                                  ? 'border-zinc-800/30 hover:bg-zinc-800/30 hover:border-zinc-700/50'
                                  : 'border-gray-200/50 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <StatusChip status={level.label} variant={level.variant} />
                              {formData.severity === level.value && (
                                <i className={`ph ph-check-circle text-[#8C7B65]`} style={{ fontSize: '16px' }} />
                              )}
                            </div>
                            <p className={`text-xs mt-1 ${
                              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                            }`}>
                              {level.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>Issue Description</h3>
                  
                  <div className={`p-5 rounded-2xl backdrop-blur-sm border space-y-4 ${
                    isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/80 border-gray-200/30'
                  }`}>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief description of the issue"
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm transition-all duration-200 ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-[#8C7B65]/50' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#8C7B65]/50'
                        }`}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>
                        Detailed Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Please provide detailed information about the issue, steps to reproduce, and any relevant context"
                        rows={4}
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm resize-none transition-all duration-200 ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-[#8C7B65]/50' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#8C7B65]/50'
                        }`}
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'attachments' && (
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Supporting Files</h3>
                
                <div className={`p-5 rounded-2xl backdrop-blur-sm border ${
                  isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/80 border-gray-200/30'
                }`}>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-zinc-700/50 hover:border-zinc-600/50 hover:bg-zinc-800/20' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                  }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                      isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
                    }`}>
                      <i className={`ph ph-upload text-xl ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                      }`} />
                    </div>
                    <p className={`text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      Drop files here or click to upload
                    </p>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                    }`}>
                      Screenshots, logs, or relevant documents (Max 10MB each)
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                    }`}>Recommended Files</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`p-2 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-white/50'
                      }`}>
                        <i className={`ph ph-image mr-1 ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`} />
                        <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Screenshots</span>
                      </div>
                      <div className={`p-2 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-white/50'
                      }`}>
                        <i className={`ph ph-file-text mr-1 ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`} />
                        <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Error logs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`flex justify-end gap-3 pt-4 border-t ${
              isDarkMode ? 'border-zinc-800/50' : 'border-gray-100/50'
            }`}>
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  isDarkMode
                    ? 'border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/50 hover:scale-105'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:scale-105'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}