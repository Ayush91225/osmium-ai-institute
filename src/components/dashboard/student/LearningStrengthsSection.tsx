'use client'

import { memo, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function LearningStrengthsSection() {
  const { isDarkMode } = useDarkMode()
  const [activeTab, setActiveTab] = useState('weak')
  const [selectedSubject, setSelectedSubject] = useState('DSA')

  const weakTopics = [
    { name: 'Graphs', score: 25.5, change: '+5.3%', isPositive: true },
    { name: 'Dynamic Programming', score: 32.23, change: '-12.1%', isPositive: false },
    { name: 'Paging', score: 38.9, change: '+5.3%', isPositive: true },
    { name: 'Bit Manipulation', score: 45.3, change: '+5.3%', isPositive: true },
    { name: 'Normalization', score: 48.4, change: '-12.1%', isPositive: false },
    { name: 'Tree Mapping', score: 32.23, change: '-12.1%', isPositive: false },
  ]

  const strongTopics = [
    { name: 'Arrays', score: 85.5, change: '+8.2%', isPositive: true },
    { name: 'Linked Lists', score: 78.3, change: '+3.5%', isPositive: true },
    { name: 'Stacks', score: 92.1, change: '+12.4%', isPositive: true },
    { name: 'Queues', score: 88.7, change: '+6.1%', isPositive: true },
  ]

  const topics = activeTab === 'weak' ? weakTopics : strongTopics

  return (
    <div className={`rounded-xl p-6 border h-full flex flex-col ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Learning Strengths & Weaknesses
          </h3>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
            Highlights strong topics and weak spots.
          </p>
        </div>
        <div className="relative">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium appearance-none pr-10 cursor-pointer ${isDarkMode ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-gray-100 text-gray-900 border-gray-200'} border`}
          >
            <option value="DSA">DSA</option>
            <option value="Web Dev">Web Dev</option>
            <option value="Database">Database</option>
          </select>
          <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
          </svg>
        </div>
      </div>

      <div className={`flex gap-0 mt-6 border-b ${isDarkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
        <button
          onClick={() => setActiveTab('weak')}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'weak'
              ? isDarkMode ? 'text-white' : 'text-gray-900'
              : isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}
        >
          Weak topics
          {activeTab === 'weak' && (
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`} />
          )}
        </button>
        <button
          onClick={() => setActiveTab('strong')}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'strong'
              ? isDarkMode ? 'text-white' : 'text-gray-900'
              : isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}
        >
          Strong topics
          {activeTab === 'strong' && (
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`} />
          )}
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}
        >
          Suggestions
        </button>
      </div>

      <div className="space-y-3 mt-6 flex-1 overflow-y-auto">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'weak' ? 'bg-red-500' : 'bg-green-500'}`} />
              <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {topic.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {topic.score}%
              </span>
              <span className={`text-xs font-medium ${topic.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {topic.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(LearningStrengthsSection)
