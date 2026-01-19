'use client'

import { memo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { Branch } from '@/contexts/ClassContext'

interface AddBranchModalProps {
  isOpen: boolean
  onClose: () => void
  onAddBranch: (branch: Branch) => void
}

function AddBranchModal({ isOpen, onClose, onAddBranch }: AddBranchModalProps) {
  const { isDarkMode } = useDarkMode()
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    location: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    status: 'active' as 'active' | 'inactive'
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newBranch: Branch = {
      id: `BR${Date.now()}`,
      name: formData.name,
      code: formData.code,
      location: formData.location,
      status: formData.status
    }

    onAddBranch(newBranch)
    onClose()
    setFormData({
      name: '',
      code: '',
      location: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: '',
      status: 'active'
    })
  }

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
            }`}>Add New Location</h2>
            <p className={`text-sm mt-1 ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>Create a new campus, branch, or center</p>
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

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
          <div className="p-6 pb-8 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Basic Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Location Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="e.g., Main Campus, North Center, South Branch"
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Location Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="e.g., MAIN"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                    isDarkMode 
                      ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                      : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="e.g., Downtown, North District"
                />
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Address Details</h3>
              
              <div>
                <label className={`block text-xs font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                    isDarkMode 
                      ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                      : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Building, Street"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="State"
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Pincode"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Contact Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-900/50 border-zinc-800/30 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-gray-50/80 border-gray-200/30 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="branch@osmium.co.in"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Status</h3>
              
              <div className={`flex items-center justify-between p-4 rounded-2xl border ${
                isDarkMode ? 'border-zinc-800/30' : 'border-gray-200/30'
              }`}>
                <div className="flex items-center gap-3">
                  <i className={`ph ph-toggle-right ${
                    isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                  }`} style={{ fontSize: '16px' }} />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                  }`}>Location Status</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, status: formData.status === 'active' ? 'inactive' : 'active' })}
                  className={`w-12 h-7 rounded-full relative cursor-pointer transition-all duration-300 shadow-inner ${
                    formData.status === 'active' ? 'bg-gradient-to-r from-[#8C7B65] to-[#A0906F] shadow-[#8C7B65]/20' : 'bg-gray-200 shadow-gray-300/50'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-lg ${
                    formData.status === 'active' ? 'translate-x-6 shadow-black/20' : 'translate-x-1 shadow-gray-400/30'
                  }`} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  isDarkMode 
                    ? 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 border-zinc-700/50' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#8C7B65] to-[#A0906F] hover:from-[#7A6B58] hover:to-[#8E7E5F] text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg shadow-[#8C7B65]/20"
              >
                Create Location
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default memo(AddBranchModal)
