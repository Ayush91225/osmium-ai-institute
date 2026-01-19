'use client'

import { useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface Recommendation {
  title: string
  description: string
  icon: string
}

interface AIRecommendationsProps {
  recommendations: Recommendation[][]
}

export default function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  const { isDarkMode } = useDarkMode()
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className={`p-4 rounded-xl border ${
      isDarkMode 
        ? 'bg-zinc-900/60 border-zinc-800/40' 
        : 'bg-white/80 border-gray-200/60'
    }`}>
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-base font-semibold flex items-center gap-2 ${
            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
          }`}>
            <img src="https://osmium.co.in/cdnLogo" alt="Osmium AI" className="w-3 h-auto" />
            AI Recommendations
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : recommendations.length - 1)}
              className={`w-6 h-6 rounded-full flex items-center justify-center  ${
                isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
              }`}
            >
              <i className="ph ph-caret-left text-xs" />
            </button>
            <div className="flex gap-1">
              {recommendations.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full  ${
                    index === currentSlide ? 'bg-[#8C7B65]' : isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentSlide(currentSlide < recommendations.length - 1 ? currentSlide + 1 : 0)}
              className={`w-6 h-6 rounded-full flex items-center justify-center  ${
                isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
              }`}
            >
              <i className="ph ph-caret-right text-xs" />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {recommendations[currentSlide].map((rec, index) => (
            <div key={index} className={`p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-zinc-800/30 border-zinc-700/50' 
                : 'bg-gray-50/50 border-gray-200/50'
            }`}>
              <div className="flex items-start gap-2">
                <i className={`${rec.icon} text-sm mt-0.5 ${
                  isDarkMode ? 'text-[#8C7B65]' : 'text-[#8C7B65]'
                }`} />
                <div>
                  <p className={`text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                  }`}>{rec.title}</p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}