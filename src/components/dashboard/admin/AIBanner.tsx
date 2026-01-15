'use client'

import { memo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'

function AIBanner() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`rounded-xl border overflow-hidden ${
      isDarkMode 
        ? 'bg-zinc-900/60 border-zinc-800/40' 
        : 'border-[#EBEBE2]/60'
    }`} style={!isDarkMode ? { backgroundColor: '#EBEBE2' } : {}}>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-shrink-0">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              isDarkMode ? 'bg-[#8C7B65]/10' : 'bg-white/60'
            }`}>
              <i className="ph-fill ph-sparkle text-3xl text-[#8C7B65]" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-lg font-semibold tracking-tight ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                AI-Powered Question Paper Generation
              </h3>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                isDarkMode ? 'bg-[#8C7B65]/20 text-[#8C7B65]' : 'bg-white/80 text-[#8C7B65]'
              }`}>
                NEW
              </span>
            </div>
            
            <p className={`text-sm mb-4 max-w-2xl ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-700'
            }`}>
              Upload past papers and let AI analyze patterns, difficulty levels, and question types to generate intelligent mock tests that truly prepare students for success.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => router.push('/dashboard/admin/exams/ai-generator')}
                className="px-5 py-2.5 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <i className="ph ph-sparkle" />
                Try AI Generator
              </button>
              
              <div className="flex items-center gap-4 text-xs">
                <span className={`flex items-center gap-1.5 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  <i className="ph ph-check-circle text-base text-[#8C7B65]" />
                  Pattern Analysis
                </span>
                <span className={`flex items-center gap-1.5 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  <i className="ph ph-check-circle text-base text-[#8C7B65]" />
                  Smart Difficulty
                </span>
                <span className={`flex items-center gap-1.5 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  <i className="ph ph-check-circle text-base text-[#8C7B65]" />
                  Instant Generation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(AIBanner)
