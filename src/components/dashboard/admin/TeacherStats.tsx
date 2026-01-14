'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import React from 'react'

interface TeacherStatsProps {
  stats: {
    total: number
    active: number
    departments: number
    newThisMonth: number
  }
}

function TeacherStats({ stats }: TeacherStatsProps) {
  const { isDarkMode } = useDarkMode()
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
            <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.08,16.08,0,0,0-6.35-12.76L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM178.23,176H77.33L128,138ZM72,216V192H184v24ZM184,75.64,128,118,72,76V40H184Z" fill="#434027"></path>
          </g>
        </svg>
      ),
      title: 'Total Faculty',
      value: mounted ? stats.total : 0,
      change: '+4% vs last month'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#ECE1D1"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z" fill="#8B7355"></path>
          </g>
        </svg>
      ),
      title: 'Active Faculty',
      value: mounted ? stats.active : 0,
      change: mounted ? `${((stats.active / stats.total) * 100).toFixed(0)}% active` : '0% active'
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
      title: 'Departments',
      value: mounted ? stats.departments : 0,
      change: 'Academic divisions'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#F4ECE6"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a8,8,0,0,1-8,8H132a4,4,0,0,1-4-4V108a8,8,0,0,1,16,0v36h16A8,8,0,0,1,168,148ZM116,84a12,12,0,1,1,12,12A12,12,0,0,1,116,84Z" fill="#89694A"></path>
          </g>
        </svg>
      ),
      title: 'New This Month',
      value: mounted ? stats.newThisMonth : 0,
      change: 'Recent hires'
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

export default memo(TeacherStats)