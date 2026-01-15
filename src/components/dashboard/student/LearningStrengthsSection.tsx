'use client'

import { memo, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function LearningStrengthsSection() {
  const { isDarkMode } = useDarkMode()
  const [activeTab, setActiveTab] = useState('weak')

  const weakTopics = [
    { name: 'Graphs', score: 25.5, change: -5.3 },
    { name: 'Dynamic Programming', score: 32.23, change: -2.1 },
    { name: 'Paging', score: 38.9, change: -5.3 },
    { name: 'Bit Manipulation', score: 45.3, change: -6.3 },
    { name: 'Normalization', score: 48.4, change: -5.1 },
    { name: 'Tree Mapping', score: 32.23, change: -2.1 },
  ]

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Learning Strengths & Weaknesses
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            Highlights strong topics and weak spots.
          </p>
        </div>
        <select className={`px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-gray-50 border-gray-200'} border`}>
          <option>DSA</option>
        </select>
      </div>

      {/* Tabs */}
      <div className={`flex gap-2 mb-6 p-1 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
        <button
          onClick={() => setActiveTab('weak')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'weak'
              ? isDarkMode ? 'bg-zinc-700 text-white' : 'bg-white text-gray-900 shadow-sm'
              : isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}
        >
          Weak topics
        </button>
        <button
          onClick={() => setActiveTab('strong')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'strong'
              ? isDarkMode ? 'bg-zinc-700 text-white' : 'bg-white text-gray-900 shadow-sm'
              : isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}
        >
          Strong topics
        </button>
        <button
          onClick={() => setActiveTab('suggestions')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'suggestions'
              ? isDarkMode ? 'bg-zinc-700 text-white' : 'bg-white text-gray-900 shadow-sm'
              : isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}
        >
          Suggestions
        </button>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        {weakTopics.map((topic, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-red-500 text-lg`}>+</span>
              <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {topic.name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                {topic.score}%
              </span>
              <span className="text-sm text-red-500">
                {topic.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(LearningStrengthsSection)
