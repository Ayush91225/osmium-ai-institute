'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import FloatingSupportButton from '@/components/dashboard/admin/FloatingSupportButton'
import SupportWindow from '@/components/dashboard/admin/SupportWindow'
import { SupportTicketProvider } from '@/contexts/SupportTicketContext'

function HelpSupportContent() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [isSupportWindowOpen, setIsSupportWindowOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <DashboardLayout role="student">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <>
    <DashboardLayout role="student">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:gap-6 mt-12 md:mt-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 md:mb-6">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 px-4 md:px-0">
                <h1 className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.3] tracking-tight mt-4 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
                  Help & Support
                </h1>
              </div>
              <p className={`text-sm sm:text-base transition-colors duration-200 px-4 md:px-0 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Get help with your courses, assignments, and platform features
              </p>
            </div>
          </div>
        </div>

        {/* Support Channels */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
                  <i className={`ph ph-chat-circle-dots text-lg ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Live Chat Support
                  </h3>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Get instant help from our support team for quick questions and technical issues.
              </p>
              <div className={`pt-3 border-t text-xs ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-gray-200 text-gray-500'}`}>
                Available: Mon-Fri, 9 AM - 6 PM
              </div>
            </div>
          </div>

          <div className={`rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
                  <i className={`ph ph-envelope text-lg ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Email Support
                  </h3>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Send detailed queries and get comprehensive responses within 24 hours.
              </p>
              <div className={`pt-3 border-t text-xs font-mono ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-gray-200 text-gray-500'}`}>
                student.support@osmium.co.in
              </div>
            </div>
          </div>

          <div className={`rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
                  <i className={`ph ph-book-open text-lg ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Help Center
                  </h3>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Browse articles, tutorials, and FAQs to find answers to common questions.
              </p>
              <div className={`pt-3 border-t text-xs ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-gray-200 text-gray-500'}`}>
                Self-service knowledge base
              </div>
            </div>
          </div>
        </div>

        {/* Response Times */}
        <div className={`rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Expected Response Times
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Average time to receive support
                </p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 text-xs font-medium tracking-wide uppercase ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Priority</th>
                    <th className={`text-left py-3 text-xs font-medium tracking-wide uppercase ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Issue Type</th>
                    <th className={`text-left py-3 text-xs font-medium tracking-wide uppercase ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Response Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-100'}`}>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-red-900/30 text-red-400 border-red-800/50' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        Urgent
                      </span>
                    </td>
                    <td className={`py-4 text-sm ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      Cannot access exam, submission deadline issue
                    </td>
                    <td className={`py-4 text-sm font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ≤ 2 hours
                    </td>
                  </tr>
                  <tr className={`border-b ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-100'}`}>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-amber-900/30 text-amber-400 border-amber-800/50' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        High
                      </span>
                    </td>
                    <td className={`py-4 text-sm ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      Course material not loading, grade discrepancy
                    </td>
                    <td className={`py-4 text-sm font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ≤ 6 hours
                    </td>
                  </tr>
                  <tr className={`border-b ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-100'}`}>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-blue-900/30 text-blue-400 border-blue-800/50' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                        Normal
                      </span>
                    </td>
                    <td className={`py-4 text-sm ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      General questions, feature requests
                    </td>
                    <td className={`py-4 text-sm font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ≤ 24 hours
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-zinc-800/50 text-zinc-300 border-zinc-700/50' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        Low
                      </span>
                    </td>
                    <td className={`py-4 text-sm ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      Account settings, profile updates
                    </td>
                    <td className={`py-4 text-sm font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ≤ 48 hours
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Common Topics */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
                  <i className={`ph ph-graduation-cap text-lg ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
                </div>
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Academic Support
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Course enrollment and access
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Assignment submission help
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Exam scheduling and access
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Grade inquiries
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
                  <i className={`ph ph-gear text-lg ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
                </div>
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Technical Support
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Login and password issues
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Browser compatibility
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    File upload problems
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Platform navigation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Summary */}
        <div className={`rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Summary
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <i className={`ph ph-chat-circle text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
                    Live Chat
                  </span>
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Mon-Fri, 9 AM - 6 PM
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <i className={`ph ph-envelope text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
                    Email
                  </span>
                </div>
                <p className={`text-xs font-mono ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                  student.support@osmium.co.in
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <i className={`ph ph-book-open text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
                    Help Center
                  </span>
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                  24/7 self-service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
    
    <FloatingSupportButton 
      onClick={() => setIsSupportWindowOpen(true)}
      hasDraft={false}
    />
    
    <SupportWindow 
      isOpen={isSupportWindowOpen} 
      onClose={() => setIsSupportWindowOpen(false)} 
    />
    </>
  )
}

export default function HelpSupport() {
  return (
    <SupportTicketProvider>
      <HelpSupportContent />
    </SupportTicketProvider>
  )
}