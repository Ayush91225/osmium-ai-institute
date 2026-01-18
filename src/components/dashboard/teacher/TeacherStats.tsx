'use client'

import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

export default function TeacherStats() {
  const [mounted, setMounted] = useState(false)
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    setMounted(true)
  }, [])
  const stats = [
    {
      title: 'Student Enrolled',
      value: '546',
      extra: '256 active students today',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#ECE1D1" />
          <polyline points="48 128 72 128 96 64 160 192 184 128 208 128" fill="none" stroke="#8B7355" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
        </svg>
      ),
      extraClass: 'bg-[#ECF4E6] text-[#65834E]'
    },
    {
      title: 'Average class performance',
      value: '88.5%',
      extra: '+5.8% improvement this month',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#E8E7D5" />
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.08,16.08,0,0,0-6.35-12.76L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM178.23,176H77.33L128,138ZM72,216V192H184v24ZM184,75.64,128,118,72,76V40H184Z" fill="#434027" />
          </g>
        </svg>
      ),
      extraClass: 'bg-[#ECF4E6] text-[#65834E]'
    },
    {
      title: 'Test Conducted',
      value: '3',
      extra: '5 Schedules Tests this month',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
          <circle cx="128" cy="128" r="120" fill="#CFE8E2" />
          <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
            <path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z" fill="#242929" />
          </g>
        </svg>
      ),
      extraClass: 'bg-[#F4ECE6] text-[#89694A]'
    },
  ]

  return (
    <div className={`rounded-xl flex items-center justify-between px-4 py-2.5 gap-4 ${
      mounted && isDarkMode ? 'bg-zinc-800' : 'bg-white'
    }`} style={{ fontFamily: 'Inter, sans-serif' }} suppressHydrationWarning>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex items-center gap-4 flex-1"
        >
          <div className="flex-shrink-0">
            {stat.icon}
          </div>
          <div className="flex-1">
            <div className={`text-sm font-normal mb-1 ${
              mounted && isDarkMode ? 'text-zinc-300' : 'text-[#222]'
            }`} style={{ fontStyle: 'normal' }} suppressHydrationWarning>
              {stat.title}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-normal ${
                mounted && isDarkMode ? 'text-zinc-100' : 'text-[#111]'
              }`} suppressHydrationWarning>
                {stat.value}
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${stat.extraClass}`}>
                {stat.extra}
              </span>
            </div>
          </div>
          {index < stats.length - 1 && (
            <div className={`w-px h-12 ml-6 ${
              mounted && isDarkMode ? 'bg-zinc-700' : 'bg-[#e6e4e1]'
            }`} suppressHydrationWarning />
          )}
        </motion.div>
      ))}
    </div>
  )
}