'use client';

import { useState } from 'react';
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
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#faf8f5]">
      <header className="px-6 py-5 flex items-center justify-between shrink-0">
        <h1 className="text-xl font-semibold text-[#111827] tracking-tight">Project Management</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDatePicker(true)}
            className="inline-flex items-center gap-2 bg-white border border-[#e3dacd] hover:border-[#d18b33] rounded-lg px-3 py-1.5 text-xs font-medium text-[#5c4d3c] transition-colors shadow-sm"
          >
            <span>Monthly</span>
            <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-xs font-medium rounded-lg px-4 py-1.5 shadow-sm hover:shadow transition-all"
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
            <div key={idx} className="bg-white rounded-xl p-5">
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <svg className="w-4 h-4" fill="#6b6b6b" stroke="#6b6b6b" viewBox="0 0 256 256">
                  <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <path d="M120,120a8,8,0,0,1,8,8v40a8,8,0,0,0,8,8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <circle cx="124" cy="84" r="12" />
                </svg>
                <span className="text-[15px] font-medium text-[#4A4A4A]">{stat.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[32px] font-semibold text-black">{stat.value}</span>
                <span className={`${stat.badgeColor} px-2.5 py-1 rounded-md text-[12px] font-medium`}>{stat.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-[#eee6dd] flex flex-col overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-[#f2ede6] bg-white">
              <div>
                <h2 className="text-sm font-semibold text-[#111827]">List of Ongoing Projects</h2>
                <p className="text-[11px] text-[#9b8c75]">Track student progress</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
              {ongoingProjects.map((project, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-[#eee6dd] p-4 hover:border-[#d18b33]/20 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-[#1f2933]">{project.name}</h3>
                      <div className="text-[11px] text-[#8f7b61] mt-0.5">Due: {project.due} • {project.class}</div>
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
                    <div className="flex-1 bg-[#f3eee7] rounded-full h-1.5">
                      <div className="bg-[#c79b39] h-1.5 rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-[#8f7b61] font-medium">{project.progress}%</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-2">
                      <button className="bg-[#FFFFFF] hover:bg-[#efe5d9] border border-[#e3dacd] text-[#5c4d3c] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors">
                        View project
                      </button>
                      <button className="bg-white hover:bg-gray-50 border border-[#e3dacd] text-[#5c4d3c] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors">
                        Modify
                      </button>
                    </div>
                    <span className="text-[10px] text-[#9b8c75]">{project.submitted} Submitted</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#eee6dd] flex flex-col overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="px-5 py-4 flex items-center justify-between border-b border-[#f2ede6]">
              <div>
                <h2 className="text-sm font-semibold text-[#111827]">Student Submissions</h2>
                <p className="text-[11px] text-[#9b8c75]">Manage pending approvals</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="bg-white hover:bg-gray-50 border border-[#e3dacd] text-[#5c4d3c] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-2"
                  >
                    <span>Sort</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-[#e3dacd] rounded-lg shadow-lg z-10 min-w-[120px]">
                      <button className="w-full text-left px-3 py-2 text-xs text-[#5c4d3c] hover:bg-gray-50 rounded-t-lg">Name</button>
                      <button className="w-full text-left px-3 py-2 text-xs text-[#5c4d3c] hover:bg-gray-50 rounded-b-lg">A-Z</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {submissions.map((sub, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border-b border-[#f7f3ee] hover:bg-[#fdfaf7] transition-colors group">
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sub.seed}`}
                      className="h-11 w-11 rounded-full bg-gray-50 border border-white shadow-sm"
                      alt={sub.name}
                    />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wide mb-0.5">{sub.time}</span>
                      <span className="text-sm font-bold text-[#111827]">{sub.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 flex-1 pl-0 sm:pl-6">
                    <div className="flex flex-col items-start sm:items-end">
                      <span className="text-sm font-medium text-[#1f2933] truncate max-w-[140px]">{sub.project}</span>
                      <button className="bg-[#FFFFFF] hover:bg-[#efe5d9] border border-[#e3dacd] text-[#656565] rounded-lg px-3 py-1.5 text-xs font-medium mt-1 transition-colors">
                        View Submission
                      </button>
                    </div>
                    <button className="bg-[#F3EEE3] hover:bg-[#F3EEE3] text-[#816316] rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0">
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
