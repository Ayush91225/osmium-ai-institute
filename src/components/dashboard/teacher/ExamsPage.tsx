'use client';

import { useState, useEffect } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import Link from 'next/link';
import AIModal from './exams/AIModal';
import ScheduleModal from './exams/ScheduleModal';

export default function ExamsPage() {
  const { isDarkMode } = useDarkMode();
  const [scheduleIndex, setScheduleIndex] = useState(0);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const scheduleStates = [
    { title: 'Python Advanced', date: 'Tue, 12 June', time: '10:30 AM', class: '12th section B', questions: '25', daysLeft: '3 days Left' },
    { title: 'Data Structures', date: 'Wed, 13 June', time: '2:00 PM', class: '12th section A', questions: '30', daysLeft: '4 days Left' },
    { title: 'Web Development', date: 'Thu, 14 June', time: '11:00 AM', class: '11th section B', questions: '20', daysLeft: '5 days Left' }
  ];

  const currentSchedule = scheduleStates[scheduleIndex];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className={`p-6 lg:p-8 min-h-screen ${
      isDarkMode ? 'bg-zinc-950' : ''
    }`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-3xl font-bold ${
              isDarkMode ? 'text-zinc-100' : 'text-[#1b1b1b]'
            }`}>Exams & Tests</h1>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">23 Upcoming</span>
          </div>
          <p className={`text-sm ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}>Manage and monitor all assessments and examinations</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setAiModalOpen(true)} className={`px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700' : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
              <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144Z" />
            </svg>
            AI Generator
          </button>
          <Link href="/dashboard/teacher/exams/create" className={`px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            isDarkMode ? 'bg-[#8C7B65] hover:bg-[#7A6B58] text-white' : 'bg-[#8C7B65] hover:bg-[#7A6B58] text-white'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox="0 0 256 256">
              <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" />
            </svg>
            Create Test
          </Link>
        </div>
      </div>

      {/* AI Section */}
      <div className={`rounded-xl p-6 mb-6 relative overflow-hidden ${
        isDarkMode ? 'bg-zinc-900/60 border border-zinc-800/40' : 'bg-[#E8E7DC] border border-[#D8D7CC]'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isDarkMode ? 'bg-zinc-800' : 'bg-white/50'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 256 256" fill="currentColor">
              <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144Z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className={`text-lg font-semibold ${
                isDarkMode ? 'text-zinc-100' : 'text-[#1A1A1A]'
              }`}>AI-Powered Question Paper Generation</h2>
              <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs font-medium">NEW</span>
            </div>
            <p className={`text-sm mb-4 ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}>Upload past papers and let AI analyze patterns, difficulty levels, and question types to generate intelligent mock tests that truly prepare students for success.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setAiModalOpen(true)} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-[#8C7B65] hover:bg-[#7A6B58] text-white'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144Z" />
                </svg>
                Try AI Generator
              </button>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Pattern Analysis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Smart Difficulty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Instant Generation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className={`grid grid-cols-1 sm:grid-cols-4 mb-6 rounded-xl overflow-hidden border ${
        isDarkMode ? 'border-zinc-800/40' : 'border-gray-200'
      }`}>
        {[
          { 
            label: 'Total Tests', 
            value: '1247', 
            subtext: '+12% vs last month',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"/>
            </svg>,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600'
          },
          { 
            label: 'Upcoming Tests', 
            value: '23', 
            subtext: 'next 30 days',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>
            </svg>,
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600'
          },
          { 
            label: 'AI Mock Tests', 
            value: '892', 
            subtext: '+8% this month',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144Z"/>
            </svg>,
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600'
          },
          { 
            label: 'Total Participants', 
            value: '12456', 
            subtext: 'Active students',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/>
            </svg>,
            bgColor: 'bg-gray-100',
            iconColor: 'text-gray-600'
          }
        ].map((stat, idx) => (
          <div key={idx} className={`p-5 border-r last:border-r-0 ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-zinc-800' : stat.bgColor
              }`}>
                <div className={isDarkMode ? 'text-zinc-400' : stat.iconColor}>
                  {stat.icon}
                </div>
              </div>
              <div>
                <div className={`text-sm mb-1 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>{stat.label}</div>
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-zinc-100' : 'text-black'
                }`}>{stat.value}</div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                }`}>{stat.subtext}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search exams and tests..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <select aria-label="Filter by subject" className={`px-4 py-2 rounded-lg border text-sm focus:outline-none ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-900'
            }`}>
              <option>All Subjects</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Biology</option>
            </select>
            <select aria-label="Filter by status" className={`px-4 py-2 rounded-lg border text-sm focus:outline-none ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-900'
            }`}>
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Active</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button aria-label="Download" className={`p-2 rounded-lg border ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button aria-label="Grid view" className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-[#8C7B65] text-white hover:bg-[#7A6B58]' : 'bg-[#8C7B65] text-white hover:bg-[#7A6B58]'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button aria-label="List view" className={`p-2 rounded-lg border ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid - Scheduled Tests and Generated Mock Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Scheduled Tests */}
        <div className={`rounded-xl border p-4 shadow-[0_6px_18px_rgba(13,12,11,0.04)] ${
          isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white border-[#EBE9E5]'
        }`}>
          <div className="flex justify-between items-center mb-3">
              <div className={`text-base font-semibold ${
                isDarkMode ? 'text-zinc-100' : 'text-[#111827]'
              }`}>Scheduled Tests</div>
              <div className={`text-xs ${
                isDarkMode ? 'text-zinc-500' : 'text-[#9ca3af]'
              }`}>#{currentSchedule.daysLeft}</div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className={`text-xs ${
                  isDarkMode ? 'text-zinc-400' : 'text-[#6b7280]'
                }`}>{currentSchedule.date}</div>
                <div className="bg-[#DBE6CF] text-[#4A5141] text-xs px-2 py-1 rounded-full">Upcoming</div>
              </div>
              <div className="flex items-center gap-1">
                <button className={`border px-3 py-1.5 rounded text-xs transition-colors ${
                  isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-[#FFFFFF] border-[#E4E5EB] text-[#70737F] hover:bg-[#f5f3f0]'
                }`}>View</button>
                <button className={`border px-3 py-1.5 rounded text-xs transition-colors ${
                  isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-[#FFFFFF] border-[#E4E5EB] text-[#70737F] hover:bg-[#f5f3f0]'
                }`}>Edit</button>
                <button className={`text-base px-1 ${
                  isDarkMode ? 'text-zinc-500' : 'text-[#9aa0a6]'
                }`}>⋮</button>
              </div>
            </div>

            <div className={`text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-zinc-100' : 'text-[#111827]'
            }`}>{currentSchedule.title}</div>
            <div className={`h-px mb-3 ${
              isDarkMode ? 'bg-zinc-800' : 'bg-[#f0f0f0]'
            }`}></div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <div className="flex items-center gap-1 text-xs text-[#9B6D24] mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" />
                  </svg>
                  Time
                </div>
                <div className={`text-xs font-semibold ${
                  isDarkMode ? 'text-zinc-200' : 'text-[#111827]'
                }`}>{currentSchedule.time}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-xs text-[#68803E] mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm11.76-88.43-56-29.87a8,8,0,0,0-7.52,14.12L171,128l17-9.06Zm64-29.87-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L171,128l-43,22.93L43.83,106l0,0L25,96,128,41.07,231,96l-18.78,10-.06,0L188,118.94a8,8,0,0,1,4,6.93v73.64a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12Z" />
                  </svg>
                  Class
                </div>
                <div className={`text-xs font-semibold ${
                  isDarkMode ? 'text-zinc-200' : 'text-[#111827]'
                }`}>{currentSchedule.class}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-xs text-[#498183] mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256" fill="#498183">
                    <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,184H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm0-48H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm0-48H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm120,96H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Zm0-48H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Zm0-48H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Z" />
                  </svg>
                  Questions
                </div>
                <div className={`text-xs font-semibold ${
                  isDarkMode ? 'text-zinc-200' : 'text-[#111827]'
                }`}>{currentSchedule.questions}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setScheduleIndex((scheduleIndex - 1 + scheduleStates.length) % scheduleStates.length)} className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-colors ${
                isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700' : 'bg-white border-[#e6e6e6] text-[#475569] hover:bg-[#f5f3f0]'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256">
                  <line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                </svg>
              </button>
              <button onClick={() => setScheduleIndex((scheduleIndex + 1) % scheduleStates.length)} className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-colors ${
                isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700' : 'bg-white border-[#e6e6e6] text-[#475569] hover:bg-[#f5f3f0]'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256">
                  <line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <polyline points="144 56 216 128 144 200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                </svg>
              </button>
            </div>
          </div>

        {/* Generated Mock Tests */}
        <div className={`rounded-2xl border shadow-sm p-8 ${
          isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white border-gray-100'
        }`}>
          <div className="flex justify-between items-center mb-1">
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>Generated Mock Tests</h2>
            <button className={`text-xl cursor-pointer ${
              isDarkMode ? 'text-zinc-500' : 'text-gray-400'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5" fill="currentColor">
                <path d="M156,128a28,28,0,1,1-28-28A28,28,0,0,1,156,128ZM128,76a28,28,0,1,0-28-28A28,28,0,0,0,128,76Zm0,104a28,28,0,1,0,28,28A28,28,0,0,0,128,180Z" />
              </svg>
            </button>
          </div>
          <p className={`text-sm mb-6 ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>Check your recently saved mock test</p>

          <div className="max-h-[400px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D3D1CD transparent' }}>
            {[
              { title: 'Python Basic', date: '11 June, 2025', marks: '80' },
              { title: 'OOP With C++', date: '11 June, 2025', marks: '80' },
              { title: 'JAVA Core', date: '11 June, 2025', marks: '80' },
              { title: 'Aptitude Analytics', date: '11 June, 2025', marks: '80' }
            ].map((test, i) => (
              <div key={i} className={`flex justify-between items-center py-5 border-b last:border-b-0 ${
                isDarkMode ? 'border-zinc-800' : 'border-gray-100'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full border flex justify-center items-center ${
                    isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                    }`} viewBox="0 0 256 256">
                      <path d="M168,224h32a8,8,0,0,0,8-8V88L152,32H56a8,8,0,0,0-8,8v72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                      <polyline points="152 32 152 88 208 88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    </svg>
                  </div>
                  <div>
                    <div className={`flex items-center gap-2 text-sm mb-1 ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`}>
                      <span>{test.date}</span>
                      <span className={`text-xs font-semibold flex items-center gap-1 ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 256 256" fill="#be9b6b">
                          <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z" />
                        </svg>
                        {test.marks} Marks
                      </span>
                    </div>
                    <div className={`text-base font-semibold ${
                      isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                    }`}>{test.title}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                  }`}>Modify</button>
                  <button className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}>View paper</button>
                  <button className="cursor-pointer hover:fill-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isDarkMode ? '#71717a' : '#8f8f8f'} viewBox="0 0 256 256">
                      <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,168,96H136V32a8,8,0,0,0-16,0V96H88a8,8,0,0,0-5.66,13.66Z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AIModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
      <ScheduleModal isOpen={scheduleModalOpen} onClose={() => setScheduleModalOpen(false)} />
    </div>
  );
}
