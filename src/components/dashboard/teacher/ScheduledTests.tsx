'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

export default function ScheduledTests() {
    const [mounted, setMounted] = useState(false)
    const { isDarkMode } = useDarkMode()

    useEffect(() => {
        setMounted(true)
    }, [])
    const tests = [
        {
            id: 1,
            date: 'Tue, 12 June',
            status: 'Upcoming',
            title: 'Python Advanced',
            time: '10:30 AM',
            class: '12th section B',
            questions: '25 Questions',
            statusColor: 'bg-[#DBE6CF] text-[#4A5141]',
            completed: false
        },
        {
            id: 2,
            date: 'Tue, 12 June',
            status: 'Completed',
            title: 'JAVA Core',
            time: '2:30 PM',
            class: '12th section B',
            questions: '25 Questions',
            statusColor: 'bg-[#F0E9D2] text-[#453F27]',
            completed: true
        }
    ]

    return (
        <div className={`rounded-xl border p-6 ${
            mounted && isDarkMode 
                ? 'bg-zinc-800 border-zinc-700' 
                : 'bg-white border-[#e8e5e0]'
        }`} suppressHydrationWarning>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className={`text-[18px] font-semibold mb-1 ${
                        mounted && isDarkMode ? 'text-zinc-100' : 'text-[#1a1a1a]'
                    }`} suppressHydrationWarning>
                        Scheduled Tests
                    </h2>
                    <p className={`text-[14px] ${
                        mounted && isDarkMode ? 'text-zinc-400' : 'text-[#666]'
                    }`} suppressHydrationWarning>
                        All Schedules upcoming test
                    </p>
                </div>
                <button className={`px-4 py-2 rounded-lg text-[14px] font-medium flex items-center gap-2 transition-colors ${
                    mounted && isDarkMode
                        ? 'bg-zinc-700 text-zinc-100 hover:bg-zinc-600'
                        : 'bg-[#0e0e0e] text-white hover:bg-[#2d2d2d]'
                }`} suppressHydrationWarning>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
                    </svg>
                    Add Tests
                </button>
            </div>

            <div className="space-y-4">
                {tests.map((test) => (
                    <div key={test.id} className={`rounded-xl p-6 border ${
                        mounted && isDarkMode
                            ? 'bg-zinc-700 border-zinc-600'
                            : 'bg-[#F7F5F3] border-[#f0f0f0]'
                    }`} suppressHydrationWarning>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2.5">
                                <span className={`text-[14px] ${
                                    mounted && isDarkMode ? 'text-zinc-400' : 'text-[#6d6d6d]'
                                }`} suppressHydrationWarning>
                                    {test.date}
                                </span>
                                <span className={`text-[12px] px-2.5 py-1 rounded-full font-medium ${test.statusColor}`}>
                                    {test.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className={`text-[13px] px-3.5 py-1.5 border rounded-lg transition-colors ${
                                    mounted && isDarkMode
                                        ? 'bg-zinc-600 border-zinc-500 text-zinc-200 hover:bg-zinc-500'
                                        : 'bg-white border-[#ddd] text-[#555] hover:bg-[#f2f2f2]'
                                }`} suppressHydrationWarning>
                                    {test.completed ? 'View Analytics' : 'View Paper'}
                                </button>
                                {!test.completed && (
                                    <button className={`text-[13px] px-3.5 py-1.5 border rounded-lg transition-colors ${
                                        mounted && isDarkMode
                                            ? 'bg-zinc-600 border-zinc-500 text-zinc-200 hover:bg-zinc-500'
                                            : 'bg-white border-[#ddd] text-[#555] hover:bg-[#f2f2f2]'
                                    }`} suppressHydrationWarning>
                                        Modify
                                    </button>
                                )}
                                <button className={`text-[20px] p-1 ${
                                    mounted && isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-[#666] hover:text-[#333]'
                                }`} suppressHydrationWarning>
                                    ⋮
                                </button>
                            </div>
                        </div>

                        <h2 className={`text-[19px] font-medium mb-4 ${
                            test.completed 
                                ? mounted && isDarkMode 
                                    ? 'line-through text-zinc-500' 
                                    : 'line-through text-[#888]'
                                : mounted && isDarkMode 
                                    ? 'text-zinc-100' 
                                    : 'text-[#1a1a1a]'
                        }`} suppressHydrationWarning>
                            {test.title}
                        </h2>

                        <div className="flex gap-10">
                            <div className={`flex items-center gap-1.5 text-[14px] ${
                                mounted && isDarkMode ? 'text-zinc-400' : 'text-[#6a6a6a]'
                            }`} suppressHydrationWarning>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#936e33" viewBox="0 0 256 256">
                                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" />
                                </svg>
                                {test.time}
                            </div>

                            <div className="flex items-center gap-1.5 text-[14px] text-[#6a6a6a]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5f7438" viewBox="0 0 256 256">
                                    <path d="M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm11.76-88.43-56-29.87a8,8,0,0,0-7.52,14.12L171,128l17-9.06Zm64-29.87-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L171,128l-43,22.93L43.83,106l0,0L25,96,128,41.07,231,96l-18.78,10-.06,0L188,118.94a8,8,0,0,1,4,6.93v73.64a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12Z" />
                                </svg>
                                {test.class}
                            </div>

                            <div className="flex items-center gap-1.5 text-[14px] text-[#6a6a6a]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#498183" viewBox="0 0 256 256">
                                    <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,184H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm0-48H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm0-48H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm120,96H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Zm0-48H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Zm0-48H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Z" />
                                </svg>
                                {test.questions}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}