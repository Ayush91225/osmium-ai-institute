'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import React from 'react'

function ExamStats() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const statItems = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#ECE1D1"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208V88H48ZM48,208V104H208V208Z" fill="#8B7355"></path>
          </g>
        </svg>
      ),
      title: 'Total Tests',
      value: mounted ? 1247 : 0,
      change: '+12% vs last month'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#E8E7D5"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z" fill="#242929"></path>
          </g>
        </svg>
      ),
      title: 'Upcoming Tests',
      value: mounted ? 23 : 0,
      change: 'next 30 days'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#CFE8E2"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a8,8,0,0,1-8,8H132a4,4,0,0,1-4-4V108a8,8,0,0,1,16,0v36h16A8,8,0,0,1,168,148ZM116,84a12,12,0,1,1,12,12A12,12,0,0,1,116,84Z" fill="#89694A"></path>
          </g>
        </svg>
      ),
      title: 'AI Mock Tests',
      value: mounted ? 892 : 0,
      change: '+8% this month'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#F4ECE6"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Z" fill="#8C7B65"></path>
          </g>
        </svg>
      ),
      title: 'Total Participants',
      value: mounted ? 12456 : 0,
      change: 'Active students'
    }
  ]

  return (
    <div className={`stats transition-colors duration-200 ${
      mounted && isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : ''
    }`}>
      {statItems.map((item, index) => (
        <React.Fragment key={index}>
          <div className="stat-item">
            <div className="stat-icon">
              {item.icon}
            </div>
            <div className="stat-content">
              <div className={`stat-title transition-colors duration-200 ${
                mounted && isDarkMode ? 'text-zinc-300' : ''
              }`}>
                {item.title}
              </div>
              <div className={`stat-value transition-colors duration-200 ${
                mounted && isDarkMode ? 'text-zinc-100' : ''
              }`}>
                {item.value}
              </div>
              <span className="stat-extra stat-extra-green transition-colors duration-200">
                {item.change}
              </span>
            </div>
          </div>
          {index < statItems.length - 1 && (
            <div className={`stat-divider transition-colors duration-200 ${
              mounted && isDarkMode ? 'bg-zinc-700/50' : ''
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default memo(ExamStats)
