'use client'

import { useState, useEffect, useRef } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

export default function ClassPerformance() {
  const [selectedClass, setSelectedClass] = useState('DaFSuC')
  const [mounted, setMounted] = useState(false)
  const { isDarkMode } = useDarkMode()
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const classes = ['DaFSuC', 'DBMS', 'Java', 'Python']

  useEffect(() => {
    let chartInstance: any = null
    
    const initChart = async () => {
      if (typeof window !== 'undefined' && chartRef.current && mounted) {
        try {
          const chartModule = await import('chart.js')
          const { Chart, registerables } = chartModule
          Chart.register(...registerables)

          // Get canvas element
          const canvas = chartRef.current
          
          // Destroy any existing chart on this canvas
          Chart.getChart(canvas)?.destroy()

          const ctx = canvas.getContext('2d')
          if (ctx) {
            chartInstance = new Chart(ctx, {
              type: 'line',
              data: {
                labels: ['Paper 1', 'Paper 2', 'Paper 3', 'Paper 4'],
                datasets: [
                  {
                    label: 'B.Tech [Sem 1]',
                    data: [58, 72, 76, 78],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBorderColor: '#3b82f6',
                    pointBackgroundColor: '#3b82f6'
                  },
                  {
                    label: 'B.Tech [Sem 2] Gita',
                    data: [68, 76, 82, 65],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBorderColor: '#10b981',
                    pointBackgroundColor: '#10b981'
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      stepSize: 20,
                      color: mounted && isDarkMode ? '#71717a' : '#9ca3af',
                      font: { size: 12 }
                    },
                    grid: {
                      color: mounted && isDarkMode ? '#3f3f46' : '#f3f4f6',
                      drawBorder: false
                    },
                    border: { display: false }
                  },
                  x: {
                    ticks: {
                      color: mounted && isDarkMode ? '#71717a' : '#9ca3af',
                      font: { size: 12 }
                    },
                    grid: { display: false },
                    border: { display: false }
                  }
                },
                interaction: {
                  mode: 'index',
                  intersect: false
                }
              }
            })
          }
        } catch (error) {
          console.error('Chart.js failed to load:', error)
        }
      }
    }

    const timer = setTimeout(initChart, 150)

    return () => {
      clearTimeout(timer)
      if (chartInstance) {
        chartInstance.destroy()
      }
      if (chartRef.current) {
        Chart.getChart(chartRef.current)?.destroy()
      }
    }
  }, [selectedClass, mounted, isDarkMode])

  return (
    <div className={`rounded-[18px] border p-7 flex-1 ${
      mounted && isDarkMode 
        ? 'bg-zinc-800 border-zinc-700' 
        : 'bg-white border-[#eceae6]'
    }`} style={{ width: '45%', maxWidth: '760px' }} suppressHydrationWarning>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-6">
        <div>
          <h2 className={`text-[20px] font-semibold mb-1 ${
            mounted && isDarkMode ? 'text-zinc-100' : 'text-[#1a1a1a]'
          }`} suppressHydrationWarning>
            Class Performances
          </h2>
          <p className={`text-[14px] ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-[#9ca3af]'
          }`} suppressHydrationWarning>
            View the Performances of classes
          </p>
        </div>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className={`border rounded-lg px-4 py-2 text-[14px] cursor-pointer outline-none ${
            mounted && isDarkMode
              ? 'bg-zinc-700 border-zinc-600 text-zinc-200'
              : 'bg-[#f3f4f6] border-[#e5e7eb] text-[#374151]'
          }`}
          suppressHydrationWarning
        >
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      {/* Chart container */}
      <div className="w-full h-[260px] mb-5 relative">
        <canvas ref={chartRef} width="607" height="260"></canvas>
      </div>

        <div className="flex gap-6 mb-6">
        <div className={`flex items-center gap-2 text-[14px] cursor-pointer hover:opacity-75 transition-opacity ${
          mounted && isDarkMode ? 'text-zinc-300' : 'text-[#374151]'
        }`} suppressHydrationWarning>
          <div className="w-3 h-3 bg-[#3b82f6] rounded-full"></div>
          <span>B.Tech [Sem 1]</span>
        </div>
        <div className={`flex items-center gap-2 text-[14px] cursor-pointer hover:opacity-75 transition-opacity ${
          mounted && isDarkMode ? 'text-zinc-300' : 'text-[#374151]'
        }`} suppressHydrationWarning>
          <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
          <span>B.Tech [Sem 2] Gita</span>
        </div>
      </div>

      {/* Performance table */}
      <div className={`border-t ${
        mounted && isDarkMode ? 'border-zinc-700' : 'border-[#f3f4f6]'
      }`} suppressHydrationWarning>
        <div className={`grid grid-cols-3 py-3 border-b ${
          mounted && isDarkMode ? 'border-zinc-700' : 'border-[#f3f4f6]'
        }`} suppressHydrationWarning>
          <div className={`text-[12px] font-medium uppercase tracking-wide ${
            mounted && isDarkMode ? 'text-zinc-500' : 'text-[#9ca3af]'
          }`} suppressHydrationWarning>
            TEST NAME
          </div>
          <div className={`text-[12px] font-medium uppercase tracking-wide ${
            mounted && isDarkMode ? 'text-zinc-500' : 'text-[#9ca3af]'
          }`} suppressHydrationWarning>
            ATTEMPT DATE
          </div>
          <div className={`text-[12px] font-medium uppercase tracking-wide text-right ${
            mounted && isDarkMode ? 'text-zinc-500' : 'text-[#9ca3af]'
          }`} suppressHydrationWarning>
            CLASS ACCURACY
          </div>
        </div>

        <div className={`grid grid-cols-3 py-4 border-b ${
          mounted && isDarkMode ? 'border-zinc-700' : 'border-[#f9fafb]'
        }`} suppressHydrationWarning>
          <div className={`text-[14px] font-medium ${
            mounted && isDarkMode ? 'text-zinc-300' : 'text-[#374151]'
          }`} suppressHydrationWarning>
            Paper 1
          </div>
          <div className={`text-[14px] font-medium ${
            mounted && isDarkMode ? 'text-zinc-300' : 'text-[#374151]'
          }`} suppressHydrationWarning>
            16 Nov, 2025
          </div>
          <div className={`text-[14px] font-medium text-right ${
            mounted && isDarkMode ? 'text-zinc-300' : 'text-[#374151]'
          }`} suppressHydrationWarning>
            76.21%
            <span className="text-[#10b981] text-[13px] ml-1">+5.6</span>
          </div>
        </div>
      </div>
    </div>
  )
}