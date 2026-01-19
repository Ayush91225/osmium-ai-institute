'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useClasses } from '@/contexts/ClassContext'
import React from 'react'

function ClassStats() {
  const { isDarkMode } = useDarkMode()
  const { stats } = useClasses()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const statItems = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#E8E7D5"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M226.53,56.41l-96-32a8,8,0,0,0-5.06,0l-96,32A8,8,0,0,0,24,64v80a8,8,0,0,0,16,0V75.1L73.59,86.29a64,64,0,0,0,20.65,88.05c-18,7.06-33.56,19.83-44.94,37.29a8,8,0,1,0,13.4,8.74C77.77,197.25,101.57,184,128,184s50.23,13.25,65.3,36.37a8,8,0,0,0,13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64,64,0,0,0,20.65-88l44.12-14.7a8,8,0,0,0,0-15.18ZM176,120A48,48,0,1,1,89.35,91.55l36.12,12a8,8,0,0,0,5.06,0l36.12-12A47.89,47.89,0,0,1,176,120Z" fill="#434027"></path>
          </g>
        </svg>
      ),
      title: 'Total Classes',
      value: stats.total,
      change: '+12% vs last month'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#ECE1D1"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" fill="#8B7355"></path>
          </g>
        </svg>
      ),
      title: 'Active Classes',
      value: stats.active,
      change: `${((stats.active / stats.total) * 100).toFixed(0)}% active`
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#F2EDE4"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-16-16H48A16,16,0,0,0,32,32V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,32h80V208H48Z" fill="#8C7B65"></path>
          </g>
        </svg>
      ),
      title: 'Locations',
      value: stats.branches,
      change: 'Campuses & centers'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#F4ECE6"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z" fill="#89694A"></path>
          </g>
        </svg>
      ),
      title: 'Programs',
      value: stats.courses,
      change: 'Active courses'
    }
  ]

  return (
    <div className={`stats transition-colors duration-200 ${
      mounted && isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : ''
    }`} suppressHydrationWarning>
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

export default memo(ClassStats)