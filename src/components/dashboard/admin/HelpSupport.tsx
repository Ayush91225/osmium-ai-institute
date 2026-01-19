'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StatusChip from './StatusChip'
import FloatingSupportButton from './FloatingSupportButton'
import SupportWindow from './SupportWindow'
import { SupportTicketProvider } from '@/contexts/SupportTicketContext'

export default function HelpSupport() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [isSupportWindowOpen, setIsSupportWindowOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  return (
    <SupportTicketProvider>
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
                  Help & Support
                </h1>
                <StatusChip status="Enterprise Grade" variant="success" />
              </div>
              <p className={`text-sm sm:text-base transition-colors duration-200 px-4 md:px-0 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                Mission-critical support for institutional excellence
              </p>
            </div>
          </div>
        </div>

        {/* Support Channels */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`rounded-xl border ${
            isDarkMode 
              ? 'bg-zinc-900/60 border-zinc-800/40' 
              : 'bg-white/80 border-gray-200/60'
          }`}>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
                }`}>
                  <i className={`ph ph-chat-circle-dots text-lg ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    In-Platform Support
                  </h3>
                  <StatusChip status="Primary" variant="info" />
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                Contextual support with full system integration and real-time status tracking.
              </p>
              <div className={`pt-3 border-t text-xs ${
                isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-gray-200 text-gray-500'
              }`}>
                Institutional Panel → Help & Support → Create Request
              </div>
            </div>
          </div>

          <div className={`rounded-xl border ${
            isDarkMode 
              ? 'bg-zinc-900/60 border-zinc-800/40' 
              : 'bg-white/80 border-gray-200/60'
          }`}>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
                }`}>
                  <i className={`ph ph-envelope text-lg ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Email Support
                  </h3>
                  <StatusChip status="Formal" variant="default" />
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                Secure communication for access issues and formal documentation.
              </p>
              <div className={`pt-3 border-t text-xs font-mono ${
                isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-gray-200 text-gray-500'
              }`}>
                support@osmium.co.in
              </div>
            </div>
          </div>

          <div className={`rounded-xl border ${
            isDarkMode 
              ? 'bg-zinc-900/60 border-zinc-800/40' 
              : 'bg-white/80 border-gray-200/60'
          }`}>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
                }`}>
                  <i className={`ph ph-phone text-lg ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Priority Phone
                  </h3>
                  <StatusChip status="Enterprise Only" variant="warning" />
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                Direct escalation for critical incidents affecting live operations.
              </p>
              <div className={`pt-3 border-t text-xs ${
                isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-gray-200 text-gray-500'
              }`}>
                Available for verified administrators
              </div>
            </div>
          </div>
        </div>

        {/* SLA Table */}
        <div className={`rounded-xl border ${
          isDarkMode 
            ? 'bg-zinc-900/60 border-zinc-800/40' 
            : 'bg-white/80 border-gray-200/60'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-lg font-semibold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Service Level Agreement
                </h2>
                <p className={`text-sm ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Guaranteed response and resolution times
                </p>
              </div>
              <StatusChip status="Guaranteed" variant="success" />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${
                    isDarkMode ? 'border-zinc-800' : 'border-gray-200'
                  }`}>
                    <th className={`text-left py-3 text-xs font-medium tracking-wide uppercase ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                    }`}>Severity</th>
                    <th className={`text-left py-3 text-xs font-medium tracking-wide uppercase ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                    }`}>Impact</th>
                    <th className={`text-left py-3 text-xs font-medium tracking-wide uppercase ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                    }`}>Response</th>
                    <th className={`text-left py-3 text-xs font-medium tracking-wide uppercase ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                    }`}>Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${
                    isDarkMode ? 'border-zinc-800/50' : 'border-gray-100'
                  }`}>
                    <td className="py-4">
                      <StatusChip status="Critical" variant="danger" />
                    </td>
                    <td className={`py-4 text-sm ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      Platform outage, live assessment disruption
                    </td>
                    <td className={`py-4 text-sm font-mono ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ≤ 1 hour
                    </td>
                    <td className={`py-4 text-sm font-mono ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      4 hours
                    </td>
                  </tr>
                  <tr className={`border-b ${
                    isDarkMode ? 'border-zinc-800/50' : 'border-gray-100'
                  }`}>
                    <td className="py-4">
                      <StatusChip status="High" variant="warning" />
                    </td>
                    <td className={`py-4 text-sm ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      Major functionality impaired for multiple users
                    </td>
                    <td className={`py-4 text-sm font-mono ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ≤ 4 hours
                    </td>
                    <td className={`py-4 text-sm font-mono ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      24 hours
                    </td>
                  </tr>
                  <tr className={`border-b ${
                    isDarkMode ? 'border-zinc-800/50' : 'border-gray-100'
                  }`}>
                    <td className="py-4">
                      <StatusChip status="Medium" variant="info" />
                    </td>
                    <td className={`py-4 text-sm ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      Partial feature impact or isolated user issues
                    </td>
                    <td className={`py-4 text-sm font-mono ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ≤ 24 hours
                    </td>
                    <td className={`py-4 text-sm font-mono ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      3 business days
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4">
                      <StatusChip status="Low" variant="default" />
                    </td>
                    <td className={`py-4 text-sm ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      General queries, documentation, feature requests
                    </td>
                    <td className={`py-4 text-sm font-mono ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ≤ 3 business days
                    </td>
                    <td className={`py-4 text-sm font-mono ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      5 business days
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Enterprise Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`rounded-xl border ${
            isDarkMode 
              ? 'bg-zinc-900/60 border-zinc-800/40' 
              : 'bg-white/80 border-gray-200/60'
          }`}>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
                }`}>
                  <i className={`ph ph-shield-check text-lg ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Security & Compliance
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${
                    isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    End-to-end encryption
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${
                    isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Role-based access control
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${
                    isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Comprehensive audit trails
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${
                    isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Data isolation & privacy
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-xl border ${
            isDarkMode 
              ? 'bg-zinc-900/60 border-zinc-800/40' 
              : 'bg-white/80 border-gray-200/60'
          }`}>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
                }`}>
                  <i className={`ph ph-chart-line-up text-lg ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Performance & Reliability
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${
                    isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    99.9% uptime guarantee
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${
                    isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    24/7 system monitoring
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${
                    isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Automated failover systems
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${
                    isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Global infrastructure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Summary */}
        <div className={`rounded-xl border ${
          isDarkMode 
            ? 'bg-zinc-900/60 border-zinc-800/40' 
            : 'bg-white/80 border-gray-200/60'
        }`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Contact Summary
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-zinc-800/30 border-zinc-700/50' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <i className={`ph ph-chat-circle text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-800'
                  }`}>
                    Primary Support
                  </span>
                </div>
                <p className={`text-xs ${
                  isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                }`}>
                  In-Platform Support System
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-zinc-800/30 border-zinc-700/50' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <i className={`ph ph-envelope text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-800'
                  }`}>
                    Email
                  </span>
                </div>
                <p className={`text-xs font-mono ${
                  isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                }`}>
                  support@osmium.co.in
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-zinc-800/30 border-zinc-700/50' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <i className={`ph ph-phone text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-800'
                  }`}>
                    Phone
                  </span>
                  <StatusChip status="Enterprise" variant="warning" />
                </div>
                <p className={`text-xs ${
                  isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                }`}>
                  Critical incidents only
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
    </SupportTicketProvider>
  )
}