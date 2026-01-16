'use client'

import { memo, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function RecentTestsSection() {
  const { isDarkMode } = useDarkMode()
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  const testData = [
    { name: 'Figma', score: 70 },
    { name: 'Sketch', score: 75 },
    { name: 'XD', score: 87 },
    { name: 'PS', score: 48 },
    { name: 'AI', score: 90 },
    { name: 'CorelDRAW', score: 85 },
  ]

  const maxScore = Math.max(...testData.map(d => d.score))
  const avgScore = Math.round(testData.reduce((sum, d) => sum + d.score, 0) / testData.length)

  return (
    <div className={`rounded-xl p-6 border transition-all ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Tests
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
            Average score: <span className={`font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{avgScore}%</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className={`px-3 py-2 rounded-lg text-sm border transition-all cursor-pointer focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-zinc-800 text-white border-zinc-700 hover:border-zinc-600 focus:ring-blue-500/50' : 'bg-gray-50 border-gray-300 hover:border-gray-400 focus:ring-blue-500/30'}`}>
            <option>Java Core</option>
            <option>Python</option>
            <option>JavaScript</option>
          </select>
          <button className={`p-2 rounded-lg transition-all ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'}`}>
            <i className="ph ph-dots-three-vertical" />
          </button>
        </div>
      </div>

      <div className="relative h-72 mt-8">
        <svg className="w-full h-full" viewBox="0 0 600 260">
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 20, 40, 60, 80, 100].map((y) => (
            <line
              key={y}
              x1="50"
              y1={210 - (y * 1.8)}
              x2="580"
              y2={210 - (y * 1.8)}
              stroke={isDarkMode ? '#27272a' : '#f3f4f6'}
              strokeWidth="1"
              strokeDasharray={y === 0 ? '0' : '5 5'}
              opacity={y === 0 ? '1' : '0.6'}
            />
          ))}

          {/* Y-axis labels */}
          {[0, 20, 40, 60, 80, 100].map((y) => (
            <text
              key={y}
              x="35"
              y={215 - y * 1.8}
              textAnchor="end"
              className={`text-xs font-medium ${isDarkMode ? 'fill-zinc-500' : 'fill-gray-500'}`}
            >
              {y}
            </text>
          ))}

          {/* Area under line */}
          <path
            d={`M 90,210 L ${testData.map((d, i) => `${90 + i * 85},${210 - d.score * 1.8}`).join(' L ')} L ${90 + (testData.length - 1) * 85},210 Z`}
            fill="url(#areaGradient)"
          />

          {/* Line chart with shadow */}
          <polyline
            points={testData.map((d, i) => `${90 + i * 85},${210 - d.score * 1.8}`).join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#shadow)"
          />

          {/* Data points */}
          {testData.map((d, i) => {
            const isHovered = hoveredPoint === i
            const isMax = d.score === maxScore
            return (
              <g key={i}>
                {/* Outer glow */}
                {isHovered && (
                  <circle
                    cx={90 + i * 85}
                    cy={210 - d.score * 1.8}
                    r="12"
                    fill="#3b82f6"
                    opacity="0.15"
                    className="animate-pulse"
                  />
                )}
                {/* Point */}
                <circle
                  cx={90 + i * 85}
                  cy={210 - d.score * 1.8}
                  r={isHovered ? "6" : "5"}
                  fill="#ffffff"
                  stroke="#3b82f6"
                  strokeWidth={isHovered ? "3" : "2.5"}
                  className="transition-all cursor-pointer"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Tooltip */}
                {isHovered && (
                  <g className="animate-in fade-in duration-200">
                    <rect
                      x={90 + i * 85 - 28}
                      y={210 - d.score * 1.8 - 45}
                      width="56"
                      height="32"
                      rx="6"
                      fill={isDarkMode ? '#18181b' : '#ffffff'}
                      stroke={isDarkMode ? '#3f3f46' : '#e5e7eb'}
                      strokeWidth="1.5"
                      style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                    />
                    <text
                      x={90 + i * 85}
                      y={210 - d.score * 1.8 - 32}
                      textAnchor="middle"
                      className={`text-xs font-medium ${isDarkMode ? 'fill-zinc-400' : 'fill-gray-500'}`}
                    >
                      {d.name}
                    </text>
                    <text
                      x={90 + i * 85}
                      y={210 - d.score * 1.8 - 19}
                      textAnchor="middle"
                      className={`text-sm font-bold ${isDarkMode ? 'fill-white' : 'fill-gray-900'}`}
                    >
                      {d.score}%
                    </text>
                  </g>
                )}
                {/* Badge for highest score */}
                {isMax && !isHovered && (
                  <g>
                    <circle
                      cx={90 + i * 85 + 8}
                      cy={210 - d.score * 1.8 - 8}
                      r="6"
                      fill="#10b981"
                    />
                    <text
                      x={90 + i * 85 + 8}
                      y={210 - d.score * 1.8 - 5}
                      textAnchor="middle"
                      className="text-[8px] font-bold fill-white"
                    >
                      ★
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* X-axis labels */}
          {testData.map((d, i) => (
            <text
              key={i}
              x={90 + i * 85}
              y="235"
              textAnchor="middle"
              className={`text-xs font-medium transition-colors ${hoveredPoint === i ? (isDarkMode ? 'fill-white' : 'fill-gray-900') : (isDarkMode ? 'fill-zinc-400' : 'fill-gray-600')}`}
            >
              {d.name}
            </text>
          ))}
        </svg>
      </div>

      <button className={`w-full mt-6 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${isDarkMode ? 'text-orange-400 hover:text-orange-300 hover:bg-orange-400/10' : 'text-orange-600 hover:text-orange-700 hover:bg-orange-50'}`}>
        View Full Analytics
        <i className="ph ph-arrow-right" />
      </button>
    </div>
  )
}

export default memo(RecentTestsSection)
