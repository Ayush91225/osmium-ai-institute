'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import StatusChip from '@/components/dashboard/admin/StatusChip'
import LaTeX from '@/components/LaTeX'
import QuestionAnalysisExpanded from '@/components/QuestionAnalysisExpanded'

export default function QuestionAnalysis() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isExpanded, setIsExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check URL param on mount
    if (searchParams.get('analysis') === 'active') {
      setIsExpanded(true)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Update URL when expanded state changes
    const currentUrl = new URL(window.location.href)
    if (isExpanded) {
      currentUrl.searchParams.set('analysis', 'active')
    } else {
      currentUrl.searchParams.delete('analysis')
    }
    router.replace(currentUrl.pathname + currentUrl.search, { scroll: false })
  }, [isExpanded, mounted, router])

  const handleViewAll = () => {
    setIsAnimating(true)
    setIsExpanded(true)
  }

  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsExpanded(false)
      setIsAnimating(false)
    }, 500)
  }

  const expandedOverlay = (isExpanded || isAnimating) && mounted ? (
    <div 
      className={`fixed z-[999999] transition-all duration-1000 ease-in-out ${
        isExpanded
          ? 'inset-0 w-full h-full opacity-100 scale-100'
          : 'bottom-4 right-4 w-80 h-96 opacity-0 scale-75'
      }`}
      style={{
        position: 'fixed',
        zIndex: 999999,
        transformOrigin: 'bottom right'
      }}
    >
      <QuestionAnalysisExpanded onClose={handleClose} />
    </div>
  ) : null

  return (
    <>
      {/* Minimized State */}
      {!isExpanded && (
        <div className={`p-4 rounded-xl border ${
          isDarkMode 
            ? 'bg-zinc-900/80 border-zinc-800/50' 
            : 'bg-white/90 border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base font-semibold ${
              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>Question Analysis</h3>
            <button 
              onClick={handleViewAll}
              className={`text-sm px-3 py-1 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800/50' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Angular Momentum Question */}
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-zinc-800/20' : 'bg-gray-50/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StatusChip status="Correct" variant="success" />
                  <StatusChip status="Medium" variant="info" />
                  <span className={`text-xs px-2 py-1 rounded ${
                    isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-600'
                  }`}>4/4</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className={`ph ph-clock text-xs ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`} />
                  <span className={`text-xs ${
                    isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                  }`}>1m 15s</span>
                </div>
              </div>
              
              <div className={`text-sm mb-3 ${
                isDarkMode ? 'text-zinc-200' : 'text-gray-800'
              }`}>
                <LaTeX>{"The\\,dimensional\\,formula\\,of\\,angular\\,momentum\\,L=I\\omega\\,is:"}</LaTeX>
              </div>
              
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 rounded ${
                isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-100/50'
              }`}>
                <div>
                  <span className={`text-xs font-medium block mb-1 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>Selected Answer</span>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-700'
                  }`}>
                    <LaTeX inline={false}>{"[ML^2T^{-1}]"}</LaTeX>
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-medium block mb-1 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>Correct Answer</span>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-700'
                  }`}>
                    <LaTeX inline={false}>{"[ML^2T^{-1}]"}</LaTeX>
                  </div>
                </div>
              </div>
            </div>

            {/* Benzene Question */}
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-zinc-800/20' : 'bg-gray-50/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StatusChip status="Correct" variant="success" />
                  <StatusChip status="Hard" variant="info" />
                  <span className={`text-xs px-2 py-1 rounded ${
                    isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-600'
                  }`}>4/4</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className={`ph ph-clock text-xs ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`} />
                  <span className={`text-xs ${
                    isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                  }`}>2m 30s</span>
                </div>
              </div>
              
              <div className={`text-sm mb-3 ${
                isDarkMode ? 'text-zinc-200' : 'text-gray-800'
              }`}>
                <LaTeX>{"In\\,the\\,Suzuki-Miyaura\\,cross-coupling\\,reaction,\\,the\\,aryl\\,halide\\,substrate\\,is:"}</LaTeX>
              </div>
              
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 rounded ${
                isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-100/50'
              }`}>
                <div>
                  <span className={`text-xs font-medium block mb-1 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>Selected Answer</span>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-700'
                  }`}>
                    <LaTeX inline={false} isDarkMode={isDarkMode}>{"\\chemfig{*6(-=-(-Br)=-=)}"}</LaTeX>
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-medium block mb-1 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>Correct Answer</span>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-700'
                  }`}>
                    <LaTeX inline={false} isDarkMode={isDarkMode}>{"\\chemfig{*6(-=-(-Br)=-=)}"}</LaTeX>
                  </div>
                </div>
              </div>
            </div>

            {/* Sin Question */}
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-zinc-800/20' : 'bg-gray-50/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StatusChip status="Incorrect" variant="danger" />
                  <StatusChip status="Easy" variant="info" />
                  <span className={`text-xs px-2 py-1 rounded ${
                    isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-600'
                  }`}>0/4</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className={`ph ph-clock text-xs ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`} />
                  <span className={`text-xs ${
                    isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                  }`}>45s</span>
                </div>
              </div>
              
              <div className={`text-sm mb-3 ${
                isDarkMode ? 'text-zinc-200' : 'text-gray-800'
              }`}>
                <LaTeX>{"The\\,value\\,of\\,\\sin\\left(\\frac{\\pi}{6}\\right)\\,is:"}</LaTeX>
              </div>
              
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 rounded ${
                isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-100/50'
              }`}>
                <div>
                  <span className={`text-xs font-medium block mb-1 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>Selected Answer</span>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-700'
                  }`}>
                    <LaTeX inline={false}>{"\\frac{\\sqrt{3}}{2}"}</LaTeX>
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-medium block mb-1 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>Correct Answer</span>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-700'
                  }`}>
                    <LaTeX inline={false}>{"\\frac{1}{2}"}</LaTeX>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render expanded overlay via portal to document.body */}
      {mounted && expandedOverlay && createPortal(expandedOverlay, document.body)}
    </>
  )
}