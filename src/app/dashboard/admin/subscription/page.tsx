'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import { getDatabase } from '@/lib/database'

const PLANS = [
  { id: 1, name: 'Starter', range: '1-1,000', min: 1, max: 1000, price: 29999, support: 'Standard support', response: '48h response time' },
  { id: 2, name: 'Growth', range: '1,001-2,000', min: 1001, max: 2000, price: 49999, support: 'Priority support', response: '24h response time' },
  { id: 3, name: 'Professional', range: '2,001-5,000', min: 2001, max: 5000, price: 89999, support: 'Premium support', response: '12h response time' },
  { id: 4, name: 'Enterprise', range: '5,000+', min: 5001, max: Infinity, price: 149999, support: '24/7 dedicated support', response: 'Instant response', featured: true }
]

export default function SubscriptionPage() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [currentStudents, setCurrentStudents] = useState(234)
  const [studentsAddedThisMonth, setStudentsAddedThisMonth] = useState(67)

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
  const remainingSlots = 100 - studentsAddedThisMonth
  const nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
            Subscription Plans
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            Choose the perfect plan for your institute size
          </p>
        </div>

        {/* Current Plan Overview */}
        <div className={`rounded-xl border p-5 mb-6 ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Current Plan</div>
              <div className="flex items-center gap-2">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{currentPlan.name}</h2>
                <div className={`px-2 py-0.5 rounded text-xs font-medium ${isDarkMode ? 'bg-[#8C7B65]/20 text-[#8C7B65]' : 'bg-[#8C7B65]/10 text-[#8C7B65]'}`}>
                  Active
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Monthly Cost</div>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>₹{(currentPlan.price / 1000).toFixed(0)}k</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <i className={`ph ph-users text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Total Students</span>
              </div>
              <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{currentStudents}</div>
            </div>
            
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <i className={`ph ph-plus-circle text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Slots Left</span>
              </div>
              <div className={`text-lg font-bold ${remainingSlots > 30 ? 'text-green-500' : remainingSlots > 10 ? 'text-orange-500' : 'text-red-500'}`}>{remainingSlots}/100</div>
            </div>
            
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <i className={`ph ph-calendar text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Renews On</span>
              </div>
              <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{nextBillingDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
            </div>
          </div>
        </div>

        {/* Student Addition Progress */}
        <div className={`rounded-xl border p-5 mb-6 ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-base font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Monthly Addition Limit</h3>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Resets on {nextBillingDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${remainingSlots > 30 ? 'text-green-500' : remainingSlots > 10 ? 'text-orange-500' : 'text-red-500'}`}>
                {remainingSlots}
              </div>
              <div className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>slots remaining</div>
            </div>
          </div>

          <div className="relative">
            <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`}>
              <div 
                className={`h-full transition-all duration-500 ${remainingSlots > 30 ? 'bg-green-500' : remainingSlots > 10 ? 'bg-orange-500' : 'bg-red-500'}`}
                style={{ width: `${((100 - remainingSlots) / 100) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-3 text-xs font-medium">
              <span className={isDarkMode ? 'text-zinc-500' : 'text-gray-500'}>0</span>
              <span className={isDarkMode ? 'text-zinc-300' : 'text-gray-700'}>{studentsAddedThisMonth} students added this month</span>
              <span className={isDarkMode ? 'text-zinc-500' : 'text-gray-500'}>100</span>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="mb-4">
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Available Plans</h2>
        </div>
        <div className="grid lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => {
            const isActive = plan.id === currentPlan.id
            
            return (
              <div
                key={plan.id}
                className={`rounded-xl border p-5 relative transition-all ${
                  isActive
                    ? isDarkMode 
                      ? 'border-[#8C7B65] bg-zinc-900/40' 
                      : 'border-[#8C7B65] bg-white'
                    : isDarkMode 
                      ? 'border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {isActive && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-0.5 bg-[#8C7B65] text-white text-xs font-medium rounded">
                      CURRENT
                    </span>
                  </div>
                )}

                {plan.featured && (
                  <div className="absolute -top-2 right-3">
                    <span className="px-2 py-0.5 bg-purple-500 text-white text-xs font-medium rounded">
                      FEATURED
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                    {plan.range} students
                  </p>
                </div>

                <div className="text-center mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      ₹{(plan.price / 1000).toFixed(0)}k
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                      /mo
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className={`p-2 rounded ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                    <div className={`text-xs font-medium mb-0.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Support Level
                    </div>
                    <div className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {plan.support}
                    </div>
                  </div>

                  <div className={`p-2 rounded ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                    <div className={`text-xs font-medium mb-0.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Response Time
                    </div>
                    <div className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {plan.response}
                    </div>
                  </div>

                  {plan.featured && (
                    <div className={`p-2 rounded border ${isDarkMode ? 'bg-purple-900/10 border-purple-800/30' : 'bg-purple-50 border-purple-200'}`}>
                      <div className="flex items-center gap-2">
                        <i className="ph ph-star text-purple-500" />
                        <span className={`text-xs font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                          Featured on website
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {isActive ? (
                  <button
                    disabled
                    className={`w-full py-2 rounded text-xs font-medium ${isDarkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-gray-100 text-gray-400'}`}
                  >
                    Active Plan
                  </button>
                ) : plan.id > currentPlan.id ? (
                  <button
                    className="w-full py-2 rounded bg-[#8C7B65] hover:bg-[#7A6B58] text-white text-xs font-medium transition-colors"
                  >
                    Upgrade
                  </button>
                ) : (
                  <button
                    className={`w-full py-2 rounded border text-xs font-medium transition-colors ${isDarkMode ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}
                  >
                    Details
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <i className="ph ph-info text-sm text-blue-500" />
              </div>
              <div>
                <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Automatic Plan Adjustment
                </h4>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Your subscription plan automatically adjusts based on your total student count. When you cross a tier threshold, you'll be upgraded in the next billing cycle.
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl border p-4 ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <i className="ph ph-users text-sm text-green-500" />
              </div>
              <div>
                <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Monthly Addition Limit
                </h4>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Add up to 100 students per month. This limit resets at each billing cycle. Need to add more? Contact our support team for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
