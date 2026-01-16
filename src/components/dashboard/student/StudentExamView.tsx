'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

const exams = [
  { id: 1, title: 'Mid-Term Examination', subject: 'Data Structures & Algorithms', date: '1/20/2024', duration: '90m', status: 'Active', starred: true },
  { id: 2, title: 'Final Examination', subject: 'Web Development', date: '1/19/2024', duration: '120m', status: 'Active', starred: false },
  { id: 3, title: 'Unit Test 1', subject: 'Machine Learning', date: '1/18/2024', duration: '60m', status: 'Completed', starred: true, score: '85/100' }
]

function StudentExamView() {
  const { isDarkMode } = useDarkMode()

  return (
    <div className="h-screen overflow-y-auto p-4 md:p-8 lg:p-12">
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className={`text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Exams & Tests
            </h1>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              23 Upcoming
            </span>
          </div>
          <p className={`mt-1 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            Attend scheduled exams and track your performance
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[#8B7355] text-white hover:bg-[#7a6349] transition-colors">
          + Take Practice Test
        </button>
      </div>

      {/* AI Banner */}
      <div className={`rounded-xl border overflow-hidden ${
        isDarkMode 
          ? 'bg-zinc-900/60 border-zinc-800/40' 
          : 'border-[#EBEBE2]/60'
      }`} style={!isDarkMode ? { backgroundColor: '#EBEBE2' } : {}}>
        <div className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex-shrink-0">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isDarkMode ? 'bg-[#8C7B65]/10' : 'bg-white/60'
              }`}>
                <i className="ph-fill ph-sparkle text-3xl text-[#8C7B65]" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-lg font-semibold tracking-tight ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  AI-Powered Practice Tests
                </h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  isDarkMode ? 'bg-[#8C7B65]/20 text-[#8C7B65]' : 'bg-white/80 text-[#8C7B65]'
                }`}>
                  NEW
                </span>
              </div>
              
              <p className={`text-sm mb-4 max-w-2xl ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-700'
              }`}>
                Generate personalized practice tests based on your learning progress and weak areas to improve your performance.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  className="px-5 py-2.5 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <i className="ph ph-sparkle" />
                  Try AI Generator
                </button>
                
                <div className="flex items-center gap-4 text-xs">
                  <span className={`flex items-center gap-1.5 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    <i className="ph ph-check-circle text-base text-[#8C7B65]" />
                    Pattern Analysis
                  </span>
                  <span className={`flex items-center gap-1.5 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    <i className="ph ph-check-circle text-base text-[#8C7B65]" />
                    Smart Difficulty
                  </span>
                  <span className={`flex items-center gap-1.5 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    <i className="ph ph-check-circle text-base text-[#8C7B65]" />
                    Instant Generation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={`stats transition-colors duration-200 ${
        isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : ''
      }`}>
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#ECE1D1"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208V88H48ZM48,208V104H208V208Z" fill="#8B7355"></path>
              </g>
            </svg>
          </div>
          <div className="stat-content">
            <div className={`stat-title transition-colors duration-200 ${
              isDarkMode ? 'text-zinc-300' : ''
            }`}>
              Total Tests
            </div>
            <div className={`stat-value transition-colors duration-200 ${
              isDarkMode ? 'text-zinc-100' : ''
            }`}>
              45
            </div>
            <span className="stat-extra stat-extra-green transition-colors duration-200">
              +12% vs last month
            </span>
          </div>
        </div>
        <div className={`stat-divider transition-colors duration-200 ${
          isDarkMode ? 'bg-zinc-700/50' : ''
        }`}></div>
        
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#E8E7D5"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
                <path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z" fill="#242929"></path>
              </g>
            </svg>
          </div>
          <div className="stat-content">
            <div className={`stat-title transition-colors duration-200 ${
              isDarkMode ? 'text-zinc-300' : ''
            }`}>
              Upcoming Tests
            </div>
            <div className={`stat-value transition-colors duration-200 ${
              isDarkMode ? 'text-zinc-100' : ''
            }`}>
              23
            </div>
            <span className="stat-extra stat-extra-green transition-colors duration-200">
              next 30 days
            </span>
          </div>
        </div>
        <div className={`stat-divider transition-colors duration-200 ${
          isDarkMode ? 'bg-zinc-700/50' : ''
        }`}></div>
        
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#CFE8E2"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a8,8,0,0,1-8,8H132a4,4,0,0,1-4-4V108a8,8,0,0,1,16,0v36h16A8,8,0,0,1,168,148ZM116,84a12,12,0,1,1,12,12A12,12,0,0,1,116,84Z" fill="#89694A"></path>
              </g>
            </svg>
          </div>
          <div className="stat-content">
            <div className={`stat-title transition-colors duration-200 ${
              isDarkMode ? 'text-zinc-300' : ''
            }`}>
              Average Score
            </div>
            <div className={`stat-value transition-colors duration-200 ${
              isDarkMode ? 'text-zinc-100' : ''
            }`}>
              82%
            </div>
            <span className="stat-extra stat-extra-green transition-colors duration-200">
              +5% this month
            </span>
          </div>
        </div>
        <div className={`stat-divider transition-colors duration-200 ${
          isDarkMode ? 'bg-zinc-700/50' : ''
        }`}></div>
        
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#F4ECE6"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)">
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Z" fill="#8C7B65"></path>
              </g>
            </svg>
          </div>
          <div className="stat-content">
            <div className={`stat-title transition-colors duration-200 ${
              isDarkMode ? 'text-zinc-300' : ''
            }`}>
              Completed
            </div>
            <div className={`stat-value transition-colors duration-200 ${
              isDarkMode ? 'text-zinc-100' : ''
            }`}>
              38
            </div>
            <span className="stat-extra stat-extra-green transition-colors duration-200">
              this semester
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`rounded-xl border ${
        isDarkMode 
          ? 'bg-zinc-900/60 border-zinc-800/40' 
          : 'bg-white/80 border-gray-200/60'
      }`}>
        <div className="p-4 space-y-4">
          <div className="relative">
            <svg className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-400'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search exams and tests..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                isDarkMode 
                  ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
            <div className="flex gap-3">
              <select
                className={`px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                  isDarkMode 
                    ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option>All Subjects</option>
                <option>Data Structures & Algorithms</option>
                <option>Web Development</option>
                <option>Machine Learning</option>
              </select>
              
              <select
                className={`px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
                  isDarkMode 
                    ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 border border-zinc-700/50' 
                  : 'bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200'
              }`} title="Export Data">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
              
              <div className={`flex rounded-lg border overflow-hidden ${
                isDarkMode ? 'border-zinc-700/50 bg-zinc-800/30' : 'border-gray-200 bg-gray-50'
              }`}>
                <button
                  className="px-3 py-2 text-sm bg-[#8C7B65] text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button
                  className={`px-3 py-2 text-sm ${
                    isDarkMode 
                      ? 'text-zinc-400 hover:text-zinc-200' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Tests */}
        <div className={`rounded-xl border h-[258px] ${
          isDarkMode 
            ? 'bg-zinc-900/60 border-zinc-800/40' 
            : 'bg-white/80 border-gray-200/60'
        }`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Scheduled Tests
              </h2>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1.5 rounded-lg border border-dashed ${
                  isDarkMode ? 'border-orange-400/50 text-orange-400' : 'border-orange-600/50 text-orange-600'
                }`}>
                  <span className="text-xs font-medium">3 days 22 hours left</span>
                </div>
                <button className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-zinc-800 text-zinc-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <span className={`text-xs ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                Tue, 12 June
              </span>
              <h3 className={`text-lg font-medium mt-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Python Advanced
              </h3>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'
                }`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Time
                  </div>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    10:30 AM
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'
                }`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Total Questions
                  </div>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    25 Questions
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button className={`p-1.5 rounded-lg ${
                isDarkMode 
                  ? 'hover:bg-zinc-800 text-zinc-400' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <span className={`px-2 py-1 text-xs ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                1 of 3
              </span>
              <button className={`p-1.5 rounded-lg ${
                isDarkMode 
                  ? 'hover:bg-zinc-800 text-zinc-400' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Generated Mock Tests */}
        <div className={`rounded-xl border ${
          isDarkMode 
            ? 'bg-zinc-900/60 border-zinc-800/40' 
            : 'bg-white/80 border-gray-200/60'
        }`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className={`text-xl font-semibold mb-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Generated Mock Tests
              </h2>
              <p className={`text-sm ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                Check your recently saved mock test
              </p>
            </div>
            <button className={`p-2 rounded-lg ${
              isDarkMode 
                ? 'hover:bg-zinc-800 text-zinc-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Test Item 1 */}
            <div className={`flex items-center gap-4 p-4 rounded-lg border ${
              isDarkMode 
                ? 'bg-zinc-800/30 border-zinc-700/50' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-zinc-700/50' : 'bg-white'
              }`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    11 June, 2025
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
                    Attempted
                  </span>
                </div>
                <h3 className={`text-base font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Python Basic
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-zinc-700 text-white hover:bg-zinc-600' 
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}>
                  Re-attempt
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-zinc-700 text-white hover:bg-zinc-600' 
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}>
                  Result
                </button>
                <button className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-zinc-700 text-zinc-400' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Test Item 2 */}
            <div className={`flex items-center gap-4 p-4 rounded-lg border ${
              isDarkMode 
                ? 'bg-zinc-800/30 border-zinc-700/50' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-zinc-700/50' : 'bg-white'
              }`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    27 June, 2025
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                    80 Marks
                  </span>
                </div>
                <h3 className={`text-base font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Core Java
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => window.location.href = '/dashboard/student/exam/mock-test'} className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-zinc-700 text-white hover:bg-zinc-600' 
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}>
                  Attempt
                </button>
                <button className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-zinc-700 text-zinc-400' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Test Item 3 */}
            <div className={`flex items-center gap-4 p-4 rounded-lg border ${
              isDarkMode 
                ? 'bg-zinc-800/30 border-zinc-700/50' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-zinc-700/50' : 'bg-white'
              }`}>
                <span className="text-xl">ƒ</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    25 June, 2025
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                    80 Marks
                  </span>
                </div>
                <h3 className={`text-base font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Mathematics - 2
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => window.location.href = '/dashboard/student/exam/mock-test'} className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-zinc-700 text-white hover:bg-zinc-600' 
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}>
                  Attempt
                </button>
                <button className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-zinc-700 text-zinc-400' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button className={`p-2 rounded-lg ${
              isDarkMode 
                ? 'hover:bg-zinc-800 text-zinc-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <span className={`px-3 py-1 text-sm ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              1 of 3
            </span>
            <button className={`p-2 rounded-lg ${
              isDarkMode 
                ? 'hover:bg-zinc-800 text-zinc-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default memo(StudentExamView)
