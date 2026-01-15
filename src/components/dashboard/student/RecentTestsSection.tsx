'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function RecentTestsSection() {
  const { isDarkMode } = useDarkMode()

  const testData = [
    { name: 'Figma', score: 60 },
    { name: 'Sketch', score: 75 },
    { name: 'XD', score: 95 },
    { name: 'PS', score: 45 },
    { name: 'AI', score: 90 },
    { name: 'CorelDraw', score: 85 },
  ]

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Tests
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            Showing last test results performance
          </p>
        </div>
        <select className={`px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-gray-50 border-gray-200'} border`}>
          <option>Java Core</option>
          <option>Python</option>
          <option>JavaScript</option>
        </select>
      </div>

      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 500 200">
          {/* Grid lines */}
          {[0, 20, 40, 60, 80, 100].map((y) => (
            <line
              key={y}
              x1="40"
              y1={180 - (y * 1.6)}
              x2="480"
              y2={180 - (y * 1.6)}
              stroke={isDarkMode ? '#3f3f46' : '#e5e7eb'}
              strokeWidth="1"
            />
          ))}

          {/* Line chart */}
          <polyline
            points={testData.map((d, i) => `${60 + i * 80},${180 - d.score * 1.6}`).join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Data points */}
          {testData.map((d, i) => (
            <circle
              key={i}
              cx={60 + i * 80}
              cy={180 - d.score * 1.6}
              r="4"
              fill="#3b82f6"
            />
          ))}

          {/* X-axis labels */}
          {testData.map((d, i) => (
            <text
              key={i}
              x={60 + i * 80}
              y="195"
              textAnchor="middle"
              className={`text-xs ${isDarkMode ? 'fill-zinc-400' : 'fill-gray-600'}`}
            >
              {d.name}
            </text>
          ))}

          {/* Y-axis labels */}
          {[0, 20, 40, 60, 80, 100].map((y) => (
            <text
              key={y}
              x="30"
              y={185 - y * 1.6}
              textAnchor="end"
              className={`text-xs ${isDarkMode ? 'fill-zinc-400' : 'fill-gray-600'}`}
            >
              {y}
            </text>
          ))}
        </svg>
      </div>

      <button className={`w-full mt-4 py-2 text-sm ${isDarkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'}`}>
        View Full Analytics
      </button>
    </div>
  )
}

export default memo(RecentTestsSection)
