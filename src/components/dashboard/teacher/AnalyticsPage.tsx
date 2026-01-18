'use client';

import { useState, useEffect } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import PerformanceGraph from './analytics/PerformanceGraph';
import ClassPerformanceChart from './analytics/ClassPerformanceChart';
import StudentsTable from './analytics/StudentsTable';
import ExportModal from './analytics/ExportModal';

export default function AnalyticsPage() {
  const { isDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex flex-col ${isDarkMode ? 'bg-zinc-950' : 'bg-[#FAFAF9]'}`}>
      {/* Header */}
      <div className={`flex-shrink-0 px-8 py-6 border-b ${
        isDarkMode ? 'border-zinc-800' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-semibold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Class Analytics</h1>
            <p className={`text-sm ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>Class 12-0B • 60 Students</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            
            <button 
              type="button"
              onClick={() => setExportModalOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                isDarkMode 
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor">
                <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z"/>
              </svg>
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`p-5 rounded-xl border ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'
              }`}>
                <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" className="text-blue-600">
                  <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/>
                </svg>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-700'
              }`}>+12%</span>
            </div>
            <div className={`text-2xl font-bold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>60</div>
            <div className={`text-sm ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}>Total Students</div>
            <div className={`text-xs mt-2 ${
              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
            }`}>36 active this week</div>
          </div>

          <div className={`p-5 rounded-xl border ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50'
              }`}>
                <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" className="text-purple-600">
                  <path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"/>
                </svg>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-700'
              }`}>+2 new</span>
            </div>
            <div className={`text-2xl font-bold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>5</div>
            <div className={`text-sm ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}>Upcoming Tests</div>
            <div className={`text-xs mt-2 ${
              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
            }`}>2 scheduled this week</div>
          </div>

          <div className={`p-5 rounded-xl border ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-amber-500/10' : 'bg-amber-50'
              }`}>
                <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" className="text-amber-600">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"/>
                </svg>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-700'
              }`}>Action needed</span>
            </div>
            <div className={`text-2xl font-bold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>6</div>
            <div className={`text-sm ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}>Pending Reviews</div>
            <div className={`text-xs mt-2 ${
              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
            }`}>4 assignments, 2 tests</div>
          </div>

          <div className={`p-5 rounded-xl border ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'
              }`}>
                <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" className="text-emerald-600">
                  <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>
                </svg>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-700'
              }`}>+8%</span>
            </div>
            <div className={`text-2xl font-bold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>78%</div>
            <div className={`text-sm ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}>Average Score</div>
            <div className={`text-xs mt-2 ${
              isDarkMode ? 'text-zinc-500' : 'text-gray-500'
            }`}>Across all subjects</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PerformanceGraph />
          <ClassPerformanceChart />
        </div>

        {/* Students Table */}
        <StudentsTable />
      </div>

      <ExportModal isOpen={exportModalOpen} onClose={() => setExportModalOpen(false)} />
    </div>
  );
}
