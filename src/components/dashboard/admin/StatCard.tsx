'use client'

import { memo } from 'react'

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ReactNode
  index: number
}

function StatCard({ title, value, change, changeType, icon, index }: StatCardProps) {
  return (
    <div 
      className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl  duration-200 animate-fade-in gpu-accelerated"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-600 mb-1">
          {title}
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {value}
        </div>
        <div className={`text-xs font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-orange-600'
        }`}>
          {change}
        </div>
      </div>
      
      {/* Divider - hidden on last item and mobile */}
      {index < 3 && (
        <div className="hidden lg:block w-px h-12 bg-gray-200" />
      )}
    </div>
  )
}

export default memo(StatCard)