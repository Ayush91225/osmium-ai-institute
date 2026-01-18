'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

export default function RecentActivity() {
  const [mounted, setMounted] = useState(false)
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    setMounted(true)
  }, [])
  const activities = [
    {
      id: 1,
      student: 'Aarav Sharma',
      action: 'completed the Physics – Chapter 5 Test with a score of 78%',
      time: '9:20 AM',
      icon: 'i-yellow',
      iconColor: '#443821',
      hasResult: true
    },
    {
      id: 2,
      student: 'Aarav Sharma',
      action: 'completed the Physics – Chapter 5 Test with a score of 78%',
      time: '9:20 AM',
      icon: 'i-green',
      iconColor: '#344421',
      tag: 'Inheritance Quiz'
    },
    {
      id: 3,
      student: 'Suman yadav',
      action: 'completed the Physics – Chapter 5 Test with a score of 78%',
      time: '9:20 AM',
      icon: 'i-teal',
      iconColor: '#214442',
      tag: 'Inheritance Quiz'
    },
    {
      id: 4,
      student: 'Aarav Sharma',
      action: 'completed the Physics – Chapter 5 Test with a score of 78%',
      time: '9:20 AM',
      icon: 'i-red',
      iconColor: '#442121',
      tag: 'Inheritance Quiz'
    }
  ]

  const iconBgColors = {
    'i-yellow': '#F7E6C6',
    'i-green': '#E2F1CD',
    'i-teal': '#D1E8E6',
    'i-red': '#F6E3E3'
  }

  return (
    <div className={`rounded-[24px] border p-6 flex-1 ${
      mounted && isDarkMode 
        ? 'bg-zinc-800 border-zinc-700' 
        : 'bg-white border-[#f0f0f0]'
    }`} style={{ width: '55%', maxWidth: '760px', height: '550px' }} suppressHydrationWarning>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className={`text-[22px] font-semibold mb-1 ${
            mounted && isDarkMode ? 'text-zinc-100' : 'text-[#1a1a1a]'
          }`} suppressHydrationWarning>
            Recent Activity
          </h2>
          <p className={`text-[14px] ${
            mounted && isDarkMode ? 'text-zinc-400' : 'text-[#7d7d7d]'
          }`} suppressHydrationWarning>
            Check activity of students
          </p>
        </div>

        <div className="relative">
          <button className={`w-8 h-8 border rounded-lg flex items-center justify-center text-[18px] transition-colors ${
            mounted && isDarkMode
              ? 'bg-zinc-700 border-zinc-600 text-zinc-400 hover:bg-zinc-600'
              : 'bg-[#faf9f8] border-[#e9e9e9] text-[#888] hover:bg-[#f0f0f0]'
          }`} suppressHydrationWarning>
            ⋮
          </button>
        </div>
      </div>

      <div className="relative pl-8">
        {/* Timeline line */}
        <div className={`absolute left-3 top-8 w-0.5 h-[calc(100%-100px)] ${
          mounted && isDarkMode ? 'bg-zinc-600' : 'bg-[#ECECEC]'
        }`} suppressHydrationWarning></div>

        {/* Date row */}
        <div className="flex items-center gap-2 mb-4 relative">
          <div className={`absolute -left-8 w-6 h-6 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
            mounted && isDarkMode
              ? 'bg-zinc-600 hover:bg-zinc-500 text-zinc-300'
              : 'bg-[#e6e7ea] hover:bg-[#d4cfc8] text-[#666]'
          }`} suppressHydrationWarning>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" className="text-[#666]">
              <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,48H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z" fill="currentColor" />
            </svg>
          </div>
          <div className={`border px-2.5 py-0.5 text-[12px] rounded-xl ${
            mounted && isDarkMode
              ? 'bg-zinc-700 border-zinc-600 text-zinc-300'
              : 'bg-[#f7f8fa] border-[#e2e2e6] text-[#505050]'
          }`} suppressHydrationWarning>
            Today
          </div>
        </div>

        {/* Activities */}
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative">
              <div
                className="absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center text-[12px]"
                style={{ backgroundColor: iconBgColors[activity.icon as keyof typeof iconBgColors] }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20">
                  <path fill={activity.iconColor} d="M212,76V72a44,44,0,0,0-74.86-31.31,3.93,3.93,0,0,0-1.14,2.8v88.72a4,4,0,0,0,6.2,3.33A47.67,47.67,0,0,1,167.68,128a8.18,8.18,0,0,1,8.31,7.58,8,8,0,0,1-8,8.42,32,32,0,0,0-32,32v33.88a4,4,0,0,0,1.49,3.12,47.92,47.92,0,0,0,74.21-17.16,4,4,0,0,0-4.49-5.56A68.06,68.06,0,0,1,192,192h-7.73a8.18,8.18,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h8a51.6,51.6,0,0,0,24-5.88v0A52,52,0,0,0,212,76Zm-12,36h-4a36,36,0,0,1-36-36V72a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4a8,8,0,0,1,0,16ZM88,28A44.05,44.05,0,0,0,44,72v4a52,52,0,0,0-4,94.12h0A51.6,51.6,0,0,0,64,176h7.73A8.18,8.18,0,0,1,80,183.47A8,8,0,0,1,72,192H64a67.48,67.48,0,0,1-15.21-1.73,4,4,0,0,0-4.5,5.55A47.93,47.93,0,0,0,118.51,213a4,4,0,0,0,1.49-3.12V176a32,32,0,0,0-32-32,8,8,0,0,1-8-8.42A8.18,8.18,0,0,1,88.32,128a47.67,47.67,0,0,1,25.48,7.54,4,4,0,0,0,6.2-3.33V43.49a4,4,0,0,0-1.14-2.81A43.85,43.85,0,0,0,88,28Zm8,48a36,36,0,0,1-36,36H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,76V72a8,8,0,0,1,16,0Z" />
                </svg>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`text-[14px] leading-relaxed mb-2 ${
                    mounted && isDarkMode ? 'text-zinc-400' : 'text-[#6e6e72]'
                  }`} suppressHydrationWarning>
                    <span className={`font-semibold ${
                      mounted && isDarkMode ? 'text-zinc-100' : 'text-[#1a1a1a]'
                    }`}>{activity.student}</span> {activity.action}
                    <span className={`text-[13px] ml-2 ${
                      mounted && isDarkMode ? 'text-zinc-500' : 'text-[#949494]'
                    }`}>· {activity.time}</span>
                  </div>

                  {activity.hasResult && (
                    <button className="text-[11px] px-2 py-0.5 bg-[#f3f4f6] text-[#6b7280] rounded-lg font-medium hover:bg-[#e5e7eb] transition-colors">
                      See Result
                    </button>
                  )}

                  {activity.tag && (
                    <div className="text-[11px] px-2 py-0.5 bg-[#f3f4f6] text-[#6b7280] rounded-lg font-medium inline-block">
                      {activity.tag}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}