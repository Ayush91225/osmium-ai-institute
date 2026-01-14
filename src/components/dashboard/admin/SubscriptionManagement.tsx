'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { BillingProvider, useBilling } from '@/contexts/BillingContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StatusChip from './StatusChip'
import Image from 'next/image'

function SubscriptionContent() {
  const { isDarkMode } = useDarkMode()
  const { billingData, calculateNextBill, canAddStudents, updateStudentCount } = useBilling()
  const [mounted, setMounted] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [newStudentCount, setNewStudentCount] = useState(billingData.baseStudents)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const calculateDaysRemaining = () => {
    const now = new Date()
    const endOfYear = new Date(now.getFullYear(), 11, 31)
    const diffTime = endOfYear.getTime() - now.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const handleUpgradeSubmit = () => {
    if (newStudentCount > billingData.baseStudents && canAddStudents(newStudentCount - billingData.baseStudents)) {
      updateStudentCount(newStudentCount)
      setShowUpgradeModal(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const daysRemaining = calculateDaysRemaining()
  const nextBillAmount = calculateNextBill()
  const usagePercentage = Math.round((billingData.currentStudents / billingData.baseStudents) * 100)

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8C7B65]/5 via-transparent to-blue-500/5 rounded-3xl" />
          <div className={`relative p-8 rounded-3xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-zinc-900/40 border-zinc-800/50' 
              : 'bg-white/60 border-gray-200/50'
          }`}>
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-2 w-2 rounded-full animate-pulse ${
                    billingData.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    billingData.status === 'active'
                      ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                      : isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}>
                    {billingData.status === 'active' ? 'Active Subscription' : 'Payment Required'}
                  </span>
                </div>
                <h1 className={`text-3xl font-bold tracking-tight ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  Osmium AI Education Platform
                </h1>
                <p className={`text-lg mt-2 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Per-student subscription • {billingData.currentStudents} active students
                </p>
              </div>
              
              <div className="text-right">
                <div className={`text-4xl font-bold tracking-tight ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {formatCurrency(billingData.pricePerStudent)}
                </div>
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  per student/month
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {billingData.currentStudents}
                </div>
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Active Students
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {daysRemaining}
                </div>
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Days Remaining
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold text-amber-500`}>
                  +{billingData.currentOverage}
                </div>
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Overage Students
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold text-emerald-500`}>
                  {formatCurrency(nextBillAmount)}
                </div>
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Next Bill
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Details Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Subscription Period */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode 
              ? 'bg-zinc-900/60 border-zinc-800/50' 
              : 'bg-white border-gray-200/50'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl ${
                isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'
              }`}>
                <i className="ph ph-calendar-dots text-xl text-blue-500" />
              </div>
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                Subscription Period
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <span className={`font-medium ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Subscription ID
                </span>
                <span className={`font-mono text-sm ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  {billingData.subscriptionId}
                </span>
              </div>
              
              <div className={`h-px ${
                isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'
              }`} />
              
              <div className="flex items-center justify-between py-3">
                <span className={`font-medium ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Last Billing
                </span>
                <span className={`font-mono text-sm ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  {formatDate(billingData.lastBillingDate)}
                </span>
              </div>
              
              <div className={`h-px ${
                isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'
              }`} />
              
              <div className="flex items-center justify-between py-3">
                <span className={`font-medium ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Next Billing
                </span>
                <span className={`font-mono text-sm font-semibold ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {formatDate(billingData.nextBillingDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Student Usage */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode 
              ? 'bg-zinc-900/60 border-zinc-800/50' 
              : 'bg-white border-gray-200/50'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl ${
                isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'
              }`}>
                <i className="ph ph-users-three text-xl text-emerald-500" />
              </div>
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                Student Usage
              </h3>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  {billingData.currentStudents} of {billingData.baseStudents + billingData.maxOverageAllowed} max
                </span>
                <span className={`text-sm font-medium ${
                  billingData.currentOverage > 0 ? 'text-amber-500' : 'text-emerald-500'
                }`}>
                  {usagePercentage}%
                </span>
              </div>
              
              <div className={`h-2 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'
              }`}>
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                />
                {billingData.currentOverage > 0 && (
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 -mt-2"
                    style={{ width: `${(billingData.currentOverage / billingData.baseStudents) * 100}%` }}
                  />
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Base Plan
                </span>
                <span className={`font-semibold ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {billingData.baseStudents} students
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`font-medium ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Current Usage
                </span>
                <span className={`font-semibold ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {billingData.currentStudents} students
                </span>
              </div>
              
              {billingData.currentOverage > 0 && (
                <div className="flex items-center justify-between">
                  <span className={`font-medium text-amber-500`}>
                    Overage
                  </span>
                  <span className="font-semibold text-amber-500">
                    +{billingData.currentOverage} students
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Billing Summary */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode 
              ? 'bg-zinc-900/60 border-zinc-800/50' 
              : 'bg-white border-gray-200/50'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl ${
                isDarkMode ? 'bg-[#8C7B65]/10' : 'bg-orange-50'
              }`}>
                <i className="ph ph-currency-inr text-xl text-[#8C7B65]" />
              </div>
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                Billing Summary
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <span className={`font-medium ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Base Cost
                </span>
                <span className={`font-semibold ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {formatCurrency(billingData.baseStudents * billingData.pricePerStudent)}
                </span>
              </div>
              
              {billingData.currentOverage > 0 && (
                <>
                  <div className="flex items-center justify-between py-3">
                    <span className="font-medium text-amber-600">
                      Overage Cost
                    </span>
                    <span className="font-semibold text-amber-600">
                      {formatCurrency(billingData.currentOverage * billingData.pricePerStudent)}
                    </span>
                  </div>
                  
                  <div className={`h-px ${
                    isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'
                  }`} />
                </>
              )}
              
              <div className="flex items-center justify-between py-3">
                <span className={`text-lg font-semibold ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  Next Bill
                </span>
                <span className="text-xl font-bold text-[#8C7B65]">
                  {formatCurrency(nextBillAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Overage Alert */}
        {billingData.currentOverage > 0 && (
          <div className={`p-6 rounded-2xl border ${
            isDarkMode 
              ? 'bg-amber-500/5 border-amber-500/20' 
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-amber-500/10' : 'bg-amber-100'
              }`}>
                <i className="ph ph-warning text-lg text-amber-500" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold mb-2 ${
                  isDarkMode ? 'text-amber-200' : 'text-amber-900'
                }`}>
                  Student Overage Detected
                </h3>
                <p className={`text-sm mb-4 leading-relaxed ${
                  isDarkMode ? 'text-amber-300/80' : 'text-amber-800'
                }`}>
                  You have <strong>{billingData.currentOverage} additional students</strong> beyond your base plan of {billingData.baseStudents} students. 
                  This overage will be included in your next billing cycle on <strong>{formatDate(billingData.nextBillingDate)}</strong>.
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className={`font-medium ${
                    isDarkMode ? 'text-amber-200' : 'text-amber-900'
                  }`}>
                    Additional Cost: <span className="font-bold">{formatCurrency(billingData.currentOverage * billingData.pricePerStudent)}</span>
                  </div>
                  <div className={`font-medium ${
                    isDarkMode ? 'text-amber-200' : 'text-amber-900'
                  }`}>
                    Remaining Capacity: <span className="font-bold">{billingData.maxOverageAllowed - billingData.currentOverage} students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NSL Branding */}
        <div className={`p-4 rounded-xl border text-center ${
          isDarkMode 
            ? 'bg-zinc-900/40 border-zinc-800/40' 
            : 'bg-gray-50/80 border-gray-200/60'
        }`}>
          <div className="flex items-center justify-center gap-2">
            <span className={`text-sm ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              Powered by
            </span>
            <div className="flex items-center gap-2">
              <Image 
                src="https://navchenta.in/NSL.png" 
                alt="NSL Logo" 
                width={24} 
                height={24}
                className={isDarkMode ? '' : 'invert'}
              />
              <span className={`font-semibold ${
                isDarkMode ? 'text-zinc-200' : 'text-gray-800'
              }`}>
                Navchetna Smart Ledger
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowUpgradeModal(true)}
            className="flex-1 bg-gradient-to-r from-[#8C7B65] to-[#7A6B58] hover:from-[#7A6B58] hover:to-[#6B5A47] text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-2">
              <i className="ph ph-crown text-lg" />
              Upgrade Base Plan
            </div>
          </button>
          
          <button className={`flex-1 font-semibold py-4 px-6 rounded-2xl transition-all duration-200 hover:scale-[1.02] border ${
            isDarkMode 
              ? 'bg-zinc-900 border-zinc-700 text-zinc-100 hover:bg-zinc-800' 
              : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
          }`}>
            <div className="flex items-center justify-center gap-2">
              <i className="ph ph-gear text-lg" />
              Manage Subscription
            </div>
          </button>
        </div>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden ${
              isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
            }`}>
              <div className={`p-6 border-b ${
                isDarkMode ? 'border-zinc-800' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <h2 className={`text-xl font-bold ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    Upgrade Base Plan
                  </h2>
                  <button 
                    onClick={() => setShowUpgradeModal(false)}
                    className={`p-2 rounded-xl transition-colors ${
                      isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ph ph-x text-lg" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                  }`}>
                    New Base Student Count
                  </label>
                  <input
                    type="number"
                    min={billingData.baseStudents}
                    max={billingData.baseStudents + billingData.maxOverageAllowed}
                    value={newStudentCount}
                    onChange={(e) => setNewStudentCount(parseInt(e.target.value))}
                    className={`w-full px-4 py-3 rounded-xl border text-lg font-semibold text-center ${
                      isDarkMode 
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-100' 
                        : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  />
                  <p className={`text-xs mt-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Current: {billingData.baseStudents} students • Max: {billingData.baseStudents + billingData.maxOverageAllowed} students
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      New Monthly Cost
                    </span>
                    <span className={`text-lg font-bold ${
                      isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                    }`}>
                      {formatCurrency(newStudentCount * billingData.pricePerStudent)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      Difference
                    </span>
                    <span className={`text-sm font-medium ${
                      newStudentCount > billingData.baseStudents ? 'text-amber-500' : 'text-emerald-500'
                    }`}>
                      {newStudentCount > billingData.baseStudents ? '+' : ''}
                      {formatCurrency((newStudentCount - billingData.baseStudents) * billingData.pricePerStudent)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowUpgradeModal(false)}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium border ${
                      isDarkMode 
                        ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpgradeSubmit}
                    disabled={newStudentCount <= billingData.baseStudents || !canAddStudents(newStudentCount - billingData.baseStudents)}
                    className="flex-1 py-3 px-4 rounded-xl font-medium bg-gradient-to-r from-[#8C7B65] to-[#7A6B58] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function SubscriptionManagement() {
  return (
    <BillingProvider>
      <SubscriptionContent />
    </BillingProvider>
  )
}