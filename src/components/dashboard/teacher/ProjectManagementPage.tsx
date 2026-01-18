'use client';

import { useState, useEffect } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import NewProjectModal from './projects/NewProjectModal';
import DateRangePicker from './projects/DateRangePicker';

const statsData = [
  { label: 'Total Project Assigned', value: '9', badge: '+2 This Month', badgeColor: 'bg-[#ECF4E6] text-[#65834E]' },
  { label: 'Pending Submissions', value: '5', badge: '+1 This Month', badgeColor: 'bg-[#ECF4E6] text-[#65834E]' },
  { label: 'Completed Projects', value: '12', badge: '-1 This Month', badgeColor: 'bg-[#F4ECE6] text-[#815931]' },
];

const ongoingProjects = [
  { name: 'History of Ancient India Report', due: '11 June, 2025', class: '12th A', status: 'UPCOMING', progress: 72, submitted: '18/25' },
  { name: 'Scientific Calculator', due: '21 Aug, 2025', class: '12th A', status: 'PENDING', progress: 24, submitted: '6/25' },
  { name: 'Ancient Pyramid Brochure', due: '16 Dec, 2024', class: '11th C', status: 'UPCOMING', progress: 40, submitted: '10/25' },
  { name: 'Modern Physics Lab Report', due: '28 Sep, 2025', class: '12th B', status: 'PENDING', progress: 15, submitted: '4/28' },
  { name: 'English Literature Essay', due: '05 July, 2025', class: '11th A', status: 'UPCOMING', progress: 85, submitted: '22/26' },
];

const submissions = [
  { name: 'Aman Gupta', time: '15 June, 9:40 AM', project: 'Scientific Calculator', seed: 'Aman' },
  { name: 'Dhaval Soni', time: '15 June, 9:40 AM', project: 'History of Ancient India', seed: 'Dhaval' },
  { name: 'Kamal Hassan', time: '15 June, 9:40 AM', project: 'Scientific Calculator', seed: 'Kamal' },
  { name: 'Varun Kumar', time: '15 June, 9:40 AM', project: 'Ancient Pyramid Brochure', seed: 'Varun' },
  { name: 'Sarah Lee', time: '16 June, 10:00 AM', project: 'History of Ancient India', seed: 'Sarah' },
];

export default function ProjectManagementPage() {
  const { isDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex-1 flex flex-col h-screen overflow-hidden relative ${
      isDarkMode ? 'bg-zinc-950' : 'bg-[#faf8f5]'
    }`}>
      <header className="px-6 py-5 flex items-center justify-between shrink-0">
        <h1 className={`text-xl font-semibold tracking-tight ${
          isDarkMode ? 'text-zinc-100' : 'text-[#111827]'
        }`}>Project Management</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDatePicker(true)}
            className={`inline-flex items-center gap-2 border rounded-lg px-3 py-1.5 text-xs font-medium transition-colors shadow-sm ${
              isDarkMode 
                ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-600' 
                : 'bg-white border-[#e3dacd] hover:border-[#d18b33] text-[#5c4d3c]'
            }`}
          >
            <span>Monthly</span>
            <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className={`inline-flex items-center gap-2 text-xs font-medium rounded-lg px-4 py-1.5 shadow-sm hover:shadow transition-all ${
              isDarkMode 
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white' 
                : 'bg-black hover:bg-gray-800 text-white'
            }`}
          >
            <svg className="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Project</span>
          </button>
        </div>
      </header>

      <section className="px-6 pb-5 shrink-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {statsData.map((stat, idx) => (
            <div key={idx} className={`rounded-xl p-5 ${
              isDarkMode ? 'bg-zinc-900/60 border border-zinc-800/40' : 'bg-white'
            }`}>
              <div className={`flex items-center gap-2 mb-3 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                <svg className="w-4 h-4" fill="currentColor" stroke="currentColor" viewBox="0 0 256 256">
                  <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <path d="M120,120a8,8,0,0,1,8,8v40a8,8,0,0,0,8,8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <circle cx="124" cy="84" r="12" />
                </svg>
                <span className={`text-[15px] font-medium ${
                  isDarkMode ? 'text-zinc-300' : 'text-[#4A4A4A]'
                }`}>{stat.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[32px] font-semibold ${
                  isDarkMode ? 'text-zinc-100' : 'text-black'
                }`}>{stat.value}</span>
                <span className={`${stat.badgeColor} px-2.5 py-1 rounded-md text-[12px] font-medium`}>{stat.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className={`rounded-2xl border flex flex-col overflow-hidden ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white border-[#eee6dd]'
          }`}>
            <div className={`px-5 py-4 flex items-center justify-between border-b ${
              isDarkMode ? 'border-zinc-800/40 bg-zinc-900/60' : 'border-[#f2ede6] bg-white'
            }`}>
              <div>
                <h2 className={`text-sm font-semibold ${
                  isDarkMode ? 'text-zinc-100' : 'text-[#111827]'
                }`}>List of Ongoing Projects</h2>
                <p className={`text-[11px] ${
                  isDarkMode ? 'text-zinc-400' : 'text-[#9b8c75]'
                }`}>Track student progress</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
              {ongoingProjects.map((project, idx) => (
                <div key={idx} className={`rounded-xl border p-4 transition-all ${
                  isDarkMode 
                    ? 'bg-zinc-800/30 border-zinc-700/50 hover:border-zinc-600' 
                    : 'bg-white border-[#eee6dd] hover:border-[#d18b33]/20'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className={`text-sm font-medium ${
                        isDarkMode ? 'text-zinc-200' : 'text-[#1f2933]'
                      }`}>{project.name}</h3>
                      <div className={`text-[11px] mt-0.5 ${
                        isDarkMode ? 'text-zinc-400' : 'text-[#8f7b61]'
                      }`}>Due: {project.due} • {project.class}</div>
                    </div>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${
                      project.status === 'UPCOMING' 
                        ? 'bg-[#f4f9f0] text-[#4a7a36] border-[#eaf7e1]' 
                        : 'bg-[#fff9ea] text-[#c27f2f] border-[#fff0cd]'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`flex-1 rounded-full h-1.5 ${
                      isDarkMode ? 'bg-zinc-700' : 'bg-[#f3eee7]'
                    }`}>
                      <div className="bg-[#c79b39] h-1.5 rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                    <span className={`text-[10px] font-medium ${
                      isDarkMode ? 'text-zinc-400' : 'text-[#8f7b61]'
                    }`}>{project.progress}%</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-2">
                      <button className={`border rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        isDarkMode 
                          ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300' 
                          : 'bg-[#FFFFFF] hover:bg-[#efe5d9] border-[#e3dacd] text-[#5c4d3c]'
                      }`}>
                        View project
                      </button>
                      <button className={`border rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        isDarkMode 
                          ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300' 
                          : 'bg-white hover:bg-gray-50 border-[#e3dacd] text-[#5c4d3c]'
                      }`}>
                        Modify
                      </button>
                    </div>
                    <span className={`text-[10px] ${
                      isDarkMode ? 'text-zinc-400' : 'text-[#9b8c75]'
                    }`}>{project.submitted} Submitted</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl border flex flex-col overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white border-[#eee6dd]'
          }`}>
            <div className={`px-5 py-4 flex items-center justify-between border-b ${
              isDarkMode ? 'border-zinc-800/40' : 'border-[#f2ede6]'
            }`}>
              <div>
                <h2 className={`text-sm font-semibold ${
                  isDarkMode ? 'text-zinc-100' : 'text-[#111827]'
                }`}>Student Submissions</h2>
                <p className={`text-[11px] ${
                  isDarkMode ? 'text-zinc-400' : 'text-[#9b8c75]'
                }`}>Manage pending approvals</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className={`border rounded-lg px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-2 ${
                      isDarkMode 
                        ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300' 
                        : 'bg-white hover:bg-gray-50 border-[#e3dacd] text-[#5c4d3c]'
                    }`}
                  >
                    <span>Sort</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showSortDropdown && (
                    <div className={`absolute right-0 top-full mt-1 border rounded-lg shadow-lg z-10 min-w-[120px] ${
                      isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-[#e3dacd]'
                    }`}>
                      <button className={`w-full text-left px-3 py-2 text-xs rounded-t-lg ${
                        isDarkMode ? 'text-zinc-300 hover:bg-zinc-700' : 'text-[#5c4d3c] hover:bg-gray-50'
                      }`}>Name</button>
                      <button className={`w-full text-left px-3 py-2 text-xs rounded-b-lg ${
                        isDarkMode ? 'text-zinc-300 hover:bg-zinc-700' : 'text-[#5c4d3c] hover:bg-gray-50'
                      }`}>A-Z</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {submissions.map((sub, idx) => (
                <div key={idx} className={`flex items-center justify-between p-4 border-b transition-colors group ${
                  isDarkMode 
                    ? 'border-zinc-800/50 hover:bg-zinc-800/30' 
                    : 'border-[#f7f3ee] hover:bg-[#fdfaf7]'
                }`}>
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sub.seed}`}
                      className="h-11 w-11 rounded-full bg-gray-50 border border-white shadow-sm"
                      alt={sub.name}
                    />
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-semibold uppercase tracking-wide mb-0.5 ${
                        isDarkMode ? 'text-zinc-500' : 'text-[#9ca3af]'
                      }`}>{sub.time}</span>
                      <span className={`text-sm font-bold ${
                        isDarkMode ? 'text-zinc-100' : 'text-[#111827]'
                      }`}>{sub.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 flex-1 pl-0 sm:pl-6">
                    <div className="flex flex-col items-start sm:items-end">
                      <span className={`text-sm font-medium truncate max-w-[140px] ${
                        isDarkMode ? 'text-zinc-200' : 'text-[#1f2933]'
                      }`}>{sub.project}</span>
                      <button className={`border rounded-lg px-3 py-1.5 text-xs font-medium mt-1 transition-colors ${
                        isDarkMode 
                          ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300' 
                          : 'bg-[#FFFFFF] hover:bg-[#efe5d9] border-[#e3dacd] text-[#656565]'
                      }`}>
                        View Submission
                      </button>
                    </div>
                    <button className={`rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
                      isDarkMode 
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' 
                        : 'bg-[#F3EEE3] hover:bg-[#F3EEE3] text-[#816316]'
                    }`}>
                      <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showNewProjectModal && <NewProjectModal onClose={() => setShowNewProjectModal(false)} />}
      {showDatePicker && <DateRangePicker onClose={() => setShowDatePicker(false)} />}
    </div>
  );
}
