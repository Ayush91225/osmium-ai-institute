'use client'

import { memo } from 'react'
import { useStudents } from '@/contexts/StudentContext'
import React from 'react'

function StudentStats() {
  const { stats } = useStudents()

  const statItems = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#E8E7D5"></circle>
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.27,98.63a8,8,0,0,1-11.07,2.22A79.71,79.71,0,0,0,168,184a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.27,206.63Z" fill="#434027"></path>
          </g>
        </svg>
      ),
      title: 'Total Students',
      value: stats.total,
      change: '+8% vs last month'
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
      title: 'Active Students',
      value: stats.active,
      change: `${((stats.active / stats.total) * 100).toFixed(0)}% enrolled`
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
      title: 'Classes',
      value: stats.classes,
      change: 'Active sections'
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
      value: stats.newThisMonth,
      change: 'Recent admissions'
    }
  ]

  return (
    <div className="stats" suppressHydrationWarning>
      {statItems.map((item, index) => (
        <React.Fragment key={index}>
          <div className="stat-item">
            <div className="stat-icon">
              {item.icon}
            </div>
            <div className="stat-content">
              <div className="stat-title">
                {item.title}
              </div>
              <div className="stat-value">
                {item.value}
              </div>
              <span className="stat-extra">
                {item.change}
              </span>
            </div>
          </div>
          {index < statItems.length - 1 && (
            <div className="stat-divider"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default memo(StudentStats)