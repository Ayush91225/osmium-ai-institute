'use client'

import { memo, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface TeacherSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

function TeacherSettingsModal({ isOpen, onClose }: TeacherSettingsModalProps) {
  const [userData, setUserData] = useState<any>(null)
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [showLanguageOptions, setShowLanguageOptions] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('user_data')
      if (data) {
        try {
          setUserData(JSON.parse(data))
        } catch {
          // Handle invalid JSON
        }
      }
      
      // Get dark mode preference
      const darkMode = localStorage.getItem('darkMode') === 'true'
      setIsDarkMode(darkMode)
      
      // Get language preference
      const lang = localStorage.getItem('language') || 'en'
      setLanguage(lang)
    }
  }, [])

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

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    localStorage.setItem('language', langCode)
    setShowLanguageOptions(false)
  }

  const languageOptions = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' }
  ]

  const getAvatarUrl = (userId: string) => {
    const seed = encodeURIComponent(userId)
    const backgroundColor = '4747eb,4762eb,477eeb,4799eb,47b4eb,47d0eb,47eb47,47eb62,47eb7e,47eb99,47ebb4,47ebd0,47ebeb,6247eb,62eb47,7e47eb,7eeb47,9947eb,99eb47,b447eb,b4eb47,d047eb,d0eb47,eb4747,eb4762,eb477e,eb4799,eb47d0,eb47eb,eb6247,eb7e47,eb9947,ebb447,ebd047,ebeb47,ffd5dc,ffdfbf,b6e3f4,c0aede,d1d4f9'
    const backgroundType = 'gradientLinear'
    const backgroundRotation = '0,360,10,20,30'
    
    return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=${backgroundColor}&backgroundType=${backgroundType}&backgroundRotation=${backgroundRotation}`
  }

  if (!isOpen) return null

  const modalContent = (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div 
          className={`absolute inset-0 backdrop-blur-md ${
            isDarkMode ? 'bg-black/40' : 'bg-black/20'
          }`}
          onClick={onClose}
        />
        
        <div className={`relative rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border w-[90vw] max-w-md max-h-[85vh] overflow-hidden backdrop-blur-xl ${
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
              }`}>Settings</h2>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>Manage your account preferences</p>
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

          <div className="overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
            <div className="p-6 pb-8 space-y-6">
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Profile</h3>
                
                <div className={`p-5 rounded-2xl backdrop-blur-sm border ${
                  isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/80 border-gray-200/30'
                }`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#8C7B65]/20">
                      <img 
                        src={getAvatarUrl(userData?.id || userData?.name || 'teacher')} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>{userData?.name || 'Teacher'}</div>
                      <div className={`text-xs font-medium ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                      }`}>Teacher</div>
                    </div>
                    <button 
                      onClick={() => setShowProfileDetails(!showProfileDetails)}
                      className={`text-xs px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1 font-medium ${
                        isDarkMode 
                          ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 hover:scale-105' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-white/80 hover:scale-105'
                      }`}
                    >
                      Details
                      <i className={`ph ph-caret-${showProfileDetails ? 'up' : 'down'}`} style={{ fontSize: '12px' }} />
                    </button>
                  </div>
                  
                  {showProfileDetails && (
                    <div className={`pt-4 border-t ${
                      isDarkMode ? 'border-zinc-800/50' : 'border-gray-200/50'
                    }`}>
                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                            isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                          }`}>Teacher Details</h4>
                          <div className="grid grid-cols-1 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className={`font-medium ${
                                isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                              }`}>Name:</span>
                              <span className={`font-semibold ${
                                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                              }`}>{userData?.name || 'Teacher'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`font-medium ${
                                isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                              }`}>Email:</span>
                              <span className={`font-semibold ${
                                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                              }`}>{userData?.email || 'teacher@osmium.co.in'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`font-medium ${
                                isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                              }`}>Role:</span>
                              <span className="text-[#8C7B65] font-semibold">Teacher</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Account</h3>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => window.open(`/forgot?email=${encodeURIComponent(userData?.email || 'teacher@osmium.co.in')}`, '_blank')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 text-left border ${
                      isDarkMode 
                        ? 'hover:bg-zinc-800/30 border-zinc-800/30 hover:border-zinc-700/50 hover:scale-[1.02]' 
                        : 'hover:bg-gray-50/80 border-gray-200/30 hover:border-gray-300/50 hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`ph ph-key ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                      }`} style={{ fontSize: '16px' }} />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>Change Password</span>
                    </div>
                    <i className={`ph ph-caret-right ${
                      isDarkMode ? 'text-zinc-600' : 'text-gray-400'
                    }`} style={{ fontSize: '12px' }} />
                  </button>
                  
                  <button className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 text-left border ${
                    isDarkMode 
                      ? 'hover:bg-zinc-800/30 border-zinc-800/30 hover:border-zinc-700/50 hover:scale-[1.02]' 
                      : 'hover:bg-gray-50/80 border-gray-200/30 hover:border-gray-300/50 hover:scale-[1.02]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <i className={`ph ph-bell ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                      }`} style={{ fontSize: '16px' }} />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>Notifications</span>
                    </div>
                    <i className={`ph ph-caret-right ${
                      isDarkMode ? 'text-zinc-600' : 'text-gray-400'
                    }`} style={{ fontSize: '12px' }} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Preferences</h3>
                
                <div className="space-y-3">
                  <div className={`flex items-center justify-between p-4 rounded-2xl border ${
                    isDarkMode ? 'border-zinc-800/30' : 'border-gray-200/30'
                  }`}>
                    <div className="flex items-center gap-3">
                      <i className={`ph ph-moon ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                      }`} style={{ fontSize: '16px' }} />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>Dark Mode</span>
                    </div>
                    <button 
                      onClick={toggleDarkMode}
                      className={`w-12 h-7 rounded-full relative cursor-pointer transition-all duration-300 shadow-inner ${
                        isDarkMode ? 'bg-gradient-to-r from-[#8C7B65] to-[#A0906F] shadow-[#8C7B65]/20' : 'bg-gray-200 shadow-gray-300/50'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-lg ${
                        isDarkMode ? 'translate-x-6 shadow-black/20' : 'translate-x-1 shadow-gray-400/30'
                      }`} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => setShowLanguageOptions(!showLanguageOptions)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 text-left border ${
                      isDarkMode 
                        ? 'hover:bg-zinc-800/30 border-zinc-800/30 hover:border-zinc-700/50 hover:scale-[1.02]' 
                        : 'hover:bg-gray-50/80 border-gray-200/30 hover:border-gray-300/50 hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`ph ph-globe ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                      }`} style={{ fontSize: '16px' }} />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>Language</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}>{languageOptions.find(lang => lang.code === language)?.nativeName}</span>
                      <i className={`ph ph-caret-${showLanguageOptions ? 'up' : 'right'} ${
                        isDarkMode ? 'text-zinc-600' : 'text-gray-400'
                      }`} style={{ fontSize: '12px' }} />
                    </div>
                  </button>
                  
                  {showLanguageOptions && (
                    <div className={`ml-4 space-y-2 p-3 rounded-xl border ${
                      isDarkMode ? 'bg-zinc-900/30 border-zinc-800/30' : 'bg-gray-50/50 border-gray-200/30'
                    }`}>
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-200 ${
                            language === lang.code
                              ? 'bg-[#8C7B65] text-white'
                              : isDarkMode
                                ? 'hover:bg-zinc-800/50 text-zinc-300'
                                : 'hover:bg-white/80 text-gray-700'
                          }`}
                        >
                          <span className="text-sm font-medium">{lang.nativeName}</span>
                          <span className="text-xs opacity-70">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={`space-y-4 pt-4 border-t ${
                isDarkMode ? 'border-zinc-800/50' : 'border-gray-100/50'
              }`}>
                <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider">Danger Zone</h3>
                
                <button className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left border group ${
                  isDarkMode 
                    ? 'border-red-900/30 bg-red-950/10 hover:bg-red-950/20 hover:border-red-800/50 hover:scale-[1.02]' 
                    : 'border-red-200/50 bg-red-50/30 hover:bg-red-50/60 hover:border-red-300/60 hover:scale-[1.02]'
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isDarkMode ? 'bg-red-900/20 group-hover:bg-red-900/30' : 'bg-red-100/50 group-hover:bg-red-100/80'
                  }`}>
                    <i className="ph ph-sign-out text-red-500 group-hover:scale-110 transition-transform duration-200" style={{ fontSize: '18px' }} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-red-600 group-hover:text-red-500 transition-colors duration-200">Sign Out</span>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                    }`}>End your current session</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return createPortal(modalContent, document.body)
}

export default memo(TeacherSettingsModal)