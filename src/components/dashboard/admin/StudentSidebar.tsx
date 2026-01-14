'use client'

import { useDarkMode } from '@/contexts/DarkModeContext'

export default function StudentSidebar() {
  const { isDarkMode } = useDarkMode()

  return (
    <div className="space-y-6">
      {/* Interests */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode 
          ? 'bg-zinc-900/60 border-zinc-800/40' 
          : 'bg-white/80 border-gray-200/60'
      }`}>
        <h3 className={`text-base font-semibold mb-3 ${
          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
        }`}>Interests</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            'Robotics',
            'Photography',
            'Music',
            'Sports'
          ].map((interest, index) => (
            <div key={index} className={`px-3 py-2 rounded-lg text-center whitespace-nowrap border ${
              isDarkMode 
                ? 'bg-zinc-800/30 border-zinc-700/50' 
                : 'bg-gray-50/50 border-gray-200/50'
            }`}>
              <p className={`text-xs font-medium ${
                isDarkMode ? 'text-zinc-200' : 'text-gray-900'
              }`}>{interest}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strong Topics */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode 
          ? 'bg-zinc-900/60 border-zinc-800/40' 
          : 'bg-white/80 border-gray-200/60'
      }`}>
        <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
        }`}>
          <i className="ph ph-trend-up text-sm text-emerald-500" />
          Strong Topics
        </h3>
        <div className="space-y-2">
          {[
            { topic: 'Calculus & Integration', subject: 'Mathematics', score: 95 },
            { topic: 'Mechanics & Motion', subject: 'Physics', score: 92 },
            { topic: 'Literature Analysis', subject: 'English', score: 90 }
          ].map((item, index) => (
            <div key={index} className={`p-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-zinc-800/30 border-zinc-700/50' 
                : 'bg-gray-50/50 border-gray-200/50'
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-xs font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                  }`}>{item.topic}</p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>{item.subject}</p>
                </div>
                <span className="text-xs font-bold text-emerald-500">{item.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak Topics */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode 
          ? 'bg-zinc-900/60 border-zinc-800/40' 
          : 'bg-white/80 border-gray-200/60'
      }`}>
        <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
        }`}>
          <i className="ph ph-trend-down text-sm text-red-500" />
          Weak Topics
        </h3>
        <div className="space-y-2">
          {[
            { topic: 'Organic Chemistry Reactions', subject: 'Chemistry', score: 68 },
            { topic: 'Electromagnetic Waves', subject: 'Physics', score: 72 },
            { topic: 'Grammar & Syntax', subject: 'English', score: 75 }
          ].map((item, index) => (
            <div key={index} className={`p-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-zinc-800/30 border-zinc-700/50' 
                : 'bg-gray-50/50 border-gray-200/50'
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-xs font-medium ${
                    isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                  }`}>{item.topic}</p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>{item.subject}</p>
                </div>
                <span className="text-xs font-bold text-red-500">{item.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}