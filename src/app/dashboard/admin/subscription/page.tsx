'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import { getDatabase } from '@/lib/database'

const PLANS = [
  { id: 1, name: 'Starter Plan', range: '1-1,000', min: 1, max: 1000, price: 10.00, support: 'Basic customer management tools', features: ['Manage up to 1,000 contacts', 'Basic customer management tools', 'Task and workflow automation', 'Integration with third-party apps (limited)', 'Customizable dashboards'], badge: 'FREE', badgeColor: 'yellow' },
  { id: 2, name: 'Growth Plan', range: '1,001-2,000', min: 1001, max: 2000, price: 79.00, support: 'Priority support', features: ['Manage up to 10,000 contacts', 'Advanced customer management', 'Full workflow automation', 'Real-time insights and analytics', 'Collaborative team features'], badge: 'PRO', badgeColor: 'orange', isDark: true },
  { id: 3, name: 'Custom', range: '2,001+', min: 2001, max: Infinity, price: 0, support: 'Premium support', features: ['Unlimited contacts and data storage', 'Custom workflow and automation setups', 'Dedicated account manager', 'Advanced analytics and reporting', 'Full API access and custom integrations'], badge: 'ADVANCE', badgeColor: 'green' }
]

const BILLING_HISTORY = [
  { planName: 'Starter Plan - Jun 2024', amount: 10.00, purchaseDate: '2024-06-01', endDate: '2024-06-31', status: 'Processing' as const },
  { planName: 'Growth Plan - May 2024', amount: 79.00, purchaseDate: '2024-05-01', endDate: '2024-05-31', status: 'Success' as const },
  { planName: 'Starter Plan - Apr 2024', amount: 10.00, purchaseDate: '2024-04-01', endDate: '2024-04-30', status: 'Success' as const },
  { planName: 'Starter Plan - Mar 2024', amount: 10.00, purchaseDate: '2024-03-01', endDate: '2024-03-31', status: 'Success' as const }
]

export default function SubscriptionPage() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [currentStudents, setCurrentStudents] = useState(234)
  const [viewMode, setViewMode] = useState<'Monthly' | 'Yearly'>('Monthly')

  useEffect(() => {
    setMounted(true)
    const db = getDatabase()
    if (db) {
      const students = db.getStudents().filter(s => s.status === 'active')
      setCurrentStudents(students.length)
    }
  }, [])

  const getCurrentPlan = () => {
    return PLANS.find(p => currentStudents >= p.min && currentStudents <= p.max) || PLANS[0]
  }

  const currentPlan = getCurrentPlan()
  const nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-[20px] sm:text-[24px] lg:text-[32px] font-normal leading-[1.3] tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
            Billing & Subscription
          </h1>
          <p className={`text-[13px] sm:text-[15px] ${isDarkMode ? 'text-zinc-400' : 'text-[#8a8a8a]'}`}>
            Manage your subscription and billing preferences
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${viewMode === 'Monthly' ? isDarkMode ? 'bg-zinc-800 text-white' : 'bg-[#1a1a1a] text-white' : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-[#8a8a8a] hover:text-[#1a1a1a]'}`}
            onClick={() => setViewMode('Monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${viewMode === 'Yearly' ? isDarkMode ? 'bg-zinc-800 text-white' : 'bg-[#1a1a1a] text-white' : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-[#8a8a8a] hover:text-[#1a1a1a]'}`}
            onClick={() => setViewMode('Yearly')}
          >
            Yearly
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {PLANS.map((plan) => {
            const isActive = plan.id === currentPlan.id
            
            return (
              <div
                key={plan.id}
                className={`rounded-xl p-5 transition-all ${plan.isDark ? 'bg-[#1a1a1a] text-white' : isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-[#f0f0f0]'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-[16px] font-normal ${plan.isDark ? 'text-white' : isDarkMode ? 'text-white' : 'text-[#222]'}`}>{plan.name}</h3>
                  {plan.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                      plan.badgeColor === 'orange' ? 'bg-[#8C7B65] text-white' :
                      plan.badgeColor === 'green' ? 'bg-emerald-500 text-white' :
                      'bg-[#F4ECE6] text-[#8C7B65]'
                    }`}>
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[28px] font-normal ${plan.isDark ? 'text-white' : isDarkMode ? 'text-white' : 'text-[#111]'}`}>
                      {plan.name === 'Custom' ? 'Custom' : `$${plan.price.toFixed(2)}`}
                    </span>
                    {plan.name !== 'Custom' && (
                      <span className={`text-[11px] ${plan.isDark ? 'text-gray-400' : isDarkMode ? 'text-zinc-400' : 'text-[#8a8a8a]'}`}>/month</span>
                    )}
                  </div>
                </div>

                <button className={`w-full py-2 rounded-lg font-medium text-[13px] mb-5 transition-colors ${
                  isActive
                    ? isDarkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-[#f0f0f0] text-[#8a8a8a]'
                    : plan.isDark
                    ? 'bg-white text-[#1a1a1a] hover:bg-gray-100'
                    : isDarkMode ? 'bg-white text-[#1a1a1a] hover:bg-gray-100' : 'bg-[#1a1a1a] text-white hover:bg-[#2D2D2D]'
                }`}>
                  {isActive ? 'Current Plan' : plan.name === 'Custom' ? 'Contact Us' : 'Upgrade Plan'}
                </button>

                <div className="space-y-2.5">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 border ${
                        plan.isDark ? 'border-gray-600' : isDarkMode ? 'border-zinc-700' : 'border-[#e6e4e1]'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${plan.isDark ? 'bg-white' : isDarkMode ? 'bg-white' : 'bg-[#1a1a1a]'}`}></div>
                      </div>
                      <span className={`text-[13px] leading-relaxed ${plan.isDark ? 'text-gray-300' : isDarkMode ? 'text-zinc-300' : 'text-[#8a8a8a]'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Billing History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-[16px] font-normal ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
              Billing History
            </h2>
            <div className="flex gap-2">
              <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium border rounded-lg transition-colors ${isDarkMode ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300' : 'border-[#f0f0f0] hover:bg-[#f0f0f0] text-[#8a8a8a]'}`}>
                <i className="ph ph-funnel text-sm" />
                Filter
              </button>
              <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium border rounded-lg transition-colors ${isDarkMode ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300' : 'border-[#f0f0f0] hover:bg-[#f0f0f0] text-[#8a8a8a]'}`}>
                <i className="ph ph-download-simple text-sm" />
                Export
              </button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className={`hidden lg:block rounded-xl border overflow-hidden ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-[#f0f0f0]'}`}>
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-zinc-800' : 'border-[#ebe8e2]'}`}>
                  <th className={`px-6 py-3 text-left text-[11px] font-normal uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-[#8a8a8a]'}`}>Plan Name</th>
                  <th className={`px-6 py-3 text-left text-[11px] font-normal uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-[#8a8a8a]'}`}>Amount</th>
                  <th className={`px-6 py-3 text-left text-[11px] font-normal uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-[#8a8a8a]'}`}>Purchase Date</th>
                  <th className={`px-6 py-3 text-left text-[11px] font-normal uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-[#8a8a8a]'}`}>End Date</th>
                  <th className={`px-6 py-3 text-left text-[11px] font-normal uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-[#8a8a8a]'}`}>Status</th>
                  <th className={`px-6 py-3 text-left text-[11px] font-normal uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-[#8a8a8a]'}`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {BILLING_HISTORY.map((item, index) => (
                  <tr key={index} className={`border-b transition-colors ${isDarkMode ? 'border-zinc-800 hover:bg-zinc-800/30' : 'border-[#ebe8e2] hover:bg-[#F9F8F6]'}`}>
                    <td className={`px-6 py-4 text-[13px] ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>{item.planName}</td>
                    <td className={`px-6 py-4 text-[13px] ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>$ {item.amount.toFixed(2)}</td>
                    <td className={`px-6 py-4 text-[13px] ${isDarkMode ? 'text-zinc-400' : 'text-[#8a8a8a]'}`}>{item.purchaseDate}</td>
                    <td className={`px-6 py-4 text-[13px] ${isDarkMode ? 'text-zinc-400' : 'text-[#8a8a8a]'}`}>{item.endDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full ${
                        item.status === 'Success' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'
                      }`}>
                        <div className={`w-1 h-1 rounded-full ${item.status === 'Success' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className={`transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-[#8a8a8a] hover:text-[#1a1a1a]'}`}>
                          <i className="ph ph-download-simple text-base" />
                        </button>
                        <button className={`transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-[#8a8a8a] hover:text-[#1a1a1a]'}`}>
                          <i className="ph ph-eye text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {BILLING_HISTORY.map((item, index) => (
              <div key={index} className={`rounded-xl border p-4 ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-[#f0f0f0]'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-normal text-[13px] mb-1 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>{item.planName}</h3>
                    <p className={`text-[16px] font-normal ${isDarkMode ? 'text-white' : 'text-[#111]'}`}>$ {item.amount.toFixed(2)}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full ${
                    item.status === 'Success' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'
                  }`}>
                    <div className={`w-1 h-1 rounded-full ${item.status === 'Success' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                    {item.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3 text-[11px]">
                  <div>
                    <p className={isDarkMode ? 'text-zinc-400 mb-1' : 'text-[#8a8a8a] mb-1'}>Purchase Date</p>
                    <p className={`font-normal ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>{item.purchaseDate}</p>
                  </div>
                  <div>
                    <p className={isDarkMode ? 'text-zinc-400 mb-1' : 'text-[#8a8a8a] mb-1'}>End Date</p>
                    <p className={`font-normal ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>{item.endDate}</p>
                  </div>
                </div>
                
                <div className={`flex gap-2 pt-3 border-t ${isDarkMode ? 'border-zinc-800' : 'border-[#ebe8e2]'}`}>
                  <button className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-[13px] font-medium border rounded-lg transition-colors ${isDarkMode ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300' : 'border-[#f0f0f0] hover:bg-[#f0f0f0] text-[#8a8a8a]'}`}>
                    <i className="ph ph-download-simple text-base" />
                    Download
                  </button>
                  <button className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-[13px] font-medium border rounded-lg transition-colors ${isDarkMode ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300' : 'border-[#f0f0f0] hover:bg-[#f0f0f0] text-[#8a8a8a]'}`}>
                    <i className="ph ph-eye text-base" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
