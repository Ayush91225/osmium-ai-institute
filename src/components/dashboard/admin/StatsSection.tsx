'use client'

import { memo } from 'react'
import StatCard from './StatCard'

const statsData = [
  {
    title: 'Total Students',
    value: '2,856',
    change: '+12% vs last month',
    changeType: 'positive' as const,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-10 h-10">
        <circle cx="128" cy="128" r="120" fill="#ECE1D1" />
        <polyline 
          points="48 128 72 128 96 64 160 192 184 128 208 128" 
          fill="none" 
          stroke="#8B7355" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="12"
        />
      </svg>
    )
  },
  {
    title: 'Total Teachers',
    value: '124',
    change: '+4% vs last month',
    changeType: 'positive' as const,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-10 h-10">
        <circle cx="128" cy="128" r="120" fill="#E8E7D5" />
        <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
          <path 
            d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.08,16.08,0,0,0-6.35-12.76L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM178.23,176H77.33L128,138ZM72,216V192H184v24ZM184,75.64,128,118,72,76V40H184Z" 
            fill="#434027"
          />
        </g>
      </svg>
    )
  },
  {
    title: 'Total Classes',
    value: '48',
    change: '+2% vs last month',
    changeType: 'positive' as const,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-10 h-10">
        <circle cx="128" cy="128" r="120" fill="#CFE8E2" />
        <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
          <path 
            d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z" 
            fill="#242929"
          />
        </g>
      </svg>
    )
  },
  {
    title: 'Assigned Subjects',
    value: '234',
    change: '-3% vs last month',
    changeType: 'negative' as const,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-10 h-10">
        <circle cx="128" cy="128" r="120" fill="#F4ECE6" />
        <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
          <path 
            d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208V88H48ZM48,208V104H208V208Z" 
            fill="#89694A"
          />
        </g>
      </svg>
    )
  }
]

function StatsSection() {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>
    </div>
  )
}

export default memo(StatsSection)