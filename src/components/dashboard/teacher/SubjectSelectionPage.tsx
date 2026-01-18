'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const subjects = [
  { id: 1, name: 'Mathematics', classes: 4, students: 120 },
  { id: 2, name: 'Physics', classes: 4, students: 120 },
  { id: 3, name: 'Chemistry', classes: 4, students: 120 },
  { id: 4, name: 'Biology', classes: 4, students: 90 }
];

const classData = [
  { id: 1, name: 'Class 11-A', days: 'Mon, Wed, Fri', time: '9:00 AM', students: 60 },
  { id: 2, name: 'Class 12-A', days: 'Mon, Wed, Fri', time: '11:00 AM', students: 30 },
  { id: 3, name: 'Class 12-B', days: 'Mon, Wed, Fri', time: '2:00 PM', students: 30 }
];

export default function SubjectSelectionPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  const handleClassClick = () => {
    router.push('/dashboard/teacher/analytics');
  };

  return (
    <div className="flex bg-[#faf8f6] min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[1000] ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`w-[280px] bg-[#faf8f6] border-r border-[#ebe8e2] flex flex-col justify-between py-6 overflow-y-auto h-screen fixed z-[1001] transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'}`}>
        <div className="flex-1">
          <div className="flex items-center justify-between px-5 mb-8">
            <div className="inline-block leading-none">
              <img src="https://osmium.co.in/images/logo.png" alt="Osmium" className="w-8 h-8 object-contain inline-block align-middle" />
              <span className="font-medium text-xl text-gray-900 tracking-tight inline-block align-middle ml-2">Osmium</span>
            </div>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-8 h-8 bg-white border border-[#ebe8e2] rounded-lg flex items-center justify-center hover:bg-[#f5f3f0] hover:border-[#d4cfc8]">
              <svg width="20" height="20" viewBox="0 0 256 256" fill="#000000"><path d="M93.31,70,28,128l65.27,58a8,8,0,1,1-10.62,12l-72-64a8,8,0,0,1,0-12l72-64A8,8,0,1,1,93.31,70Zm152,52-72-64a8,8,0,0,0-10.62,12L228,128l-65.27,58a8,8,0,1,0,10.62,12l72-64a8,8,0,0,0,0-12Z"/></svg>
            </button>
          </div>

          <div className="relative mx-5 mb-8">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <input type="text" className="w-full py-2.5 px-3 pl-9 border border-[#ebe8e2] rounded-lg bg-[#f5f3f0] text-sm text-[#666] outline-none" placeholder="Search" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#999] bg-white border border-[#e5e5e5] px-1.5 py-0.5 rounded">Ctrl + F</div>
          </div>

          <div className="text-[11px] font-bold text-[#8b8b8b] uppercase tracking-wide px-5 my-4">General</div>
          <Link href="/dashboard/teacher" className="flex items-center gap-3 py-3 px-6 mx-3 text-sm text-[#5a5a5a] rounded-lg hover:bg-[#f0ede8] no-underline">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z"/></svg>
            Dashboard
          </Link>
          <Link href="/dashboard/teacher/students" className="flex items-center gap-3 py-3 px-6 mx-3 text-sm text-[#5a5a5a] rounded-lg hover:bg-[#f0ede8] no-underline">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"/></svg>
            Student Management
          </Link>
          <Link href="/dashboard/teacher/projects" className="flex items-center gap-3 py-3 px-6 mx-3 text-sm text-[#5a5a5a] rounded-lg hover:bg-[#f0ede8] no-underline">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M240,56V200a8,8,0,0,1-8,8H160a24,24,0,0,0-24,23.94,7.9,7.9,0,0,1-5.12,7.55A8,8,0,0,1,120,232a24,24,0,0,0-24-24H24a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H88a32,32,0,0,1,32,32v87.73a8.17,8.17,0,0,0,7.47,8.25,8,8,0,0,0,8.53-8V80a32,32,0,0,1,32-32h64A8,8,0,0,1,240,56Z"/></svg>
            Project Management
          </Link>
          <Link href="/dashboard/teacher/exams" className="flex items-center gap-3 py-3 px-6 mx-3 text-sm text-[#5a5a5a] rounded-lg hover:bg-[#f0ede8] no-underline">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"/></svg>
            Exam & Tests
          </Link>
          <Link href="/dashboard/teacher/ai-mentor" className="flex items-center gap-3 py-3 px-6 mx-3 text-sm text-[#5a5a5a] rounded-lg hover:bg-[#f0ede8] no-underline">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86Zm-16.25,1.47L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"/></svg>
            AI Mentor
          </Link>
          <Link href="/dashboard/teacher/analytics" className="flex items-center gap-3 py-3 px-6 mx-3 text-sm bg-[#e8e3da] text-[#2e2e2e] font-medium rounded-lg no-underline">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M226.53,56.41l-96-32a8,8,0,0,0-5.06,0l-96,32A8,8,0,0,0,24,64v80a8,8,0,0,0,16,0V75.1L73.59,86.29a64,64,0,0,0,20.65,88.05c-18,7.06-33.56,19.83-44.94,37.29a8,8,0,1,0,13.4,8.74C77.77,197.25,101.57,184,128,184s50.23,13.25,65.3,36.37a8,8,0,0,0,13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64,64,0,0,0,20.65-88l44.12-14.7a8,8,0,0,0,0-15.18ZM176,120A48,48,0,1,1,89.35,91.55l36.12,12a8,8,0,0,0,5.06,0l36.12-12A47.89,47.89,0,0,1,176,120Z"/></svg>
            Analytics
          </Link>

          <div className="text-[11px] font-bold text-[#8b8b8b] uppercase tracking-wide px-5 my-4 mt-6">Support</div>
          <div className="flex items-center gap-3 py-3 px-6 mx-3 text-sm text-[#5a5a5a] rounded-lg hover:bg-[#f0ede8] cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z"/></svg>
            Notification
          </div>
          <Link href="/dashboard/help" className="flex items-center gap-3 py-3 px-6 mx-3 text-sm text-[#5a5a5a] rounded-lg hover:bg-[#f0ede8] no-underline">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M232,128v80a40,40,0,0,1-40,40H136a8,8,0,0,1,0-16h56a24,24,0,0,0,24-24H192a24,24,0,0,1-24-24V144a24,24,0,0,1,24-24h23.65A88,88,0,0,0,66,65.54A87.29,87.29,0,0,0,40.36,120H64a24,24,0,0,1,24,24v40a24,24,0,0,1-24,24H48a24,24,0,0,1-24-24V128A104.11,104.11,0,0,1,201.89,54.66A103.41,103.41,0,0,1,232,128Z"/></svg>
            Help & Support
          </Link>
        </div>

        <div className="border-t border-[#ebe8e2] pt-4 px-2">
          <div className="flex items-center gap-2.5 py-3 px-4 mt-4 rounded-lg bg-white cursor-pointer">
            <img src="../logos/female avatar.svg" alt="User" className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <div className="text-[13px] font-medium text-[#2e2e2e]">Suman</div>
              <div className="text-[11px] text-[#8b8b8b] mt-0.5"></div>
            </div>
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="20" height="20" fill="#abaaaa" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.62a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.08,8.08,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8.08,8.08,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toggle */}
      <button 
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={`fixed top-5 left-5 z-[999] w-10 h-10 bg-white border border-[#ebe8e2] rounded-lg ${sidebarCollapsed ? 'flex' : 'hidden'} items-center justify-center shadow-sm hover:bg-[#f5f3f0]`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>

      {/* Main Content */}
      <main className={`flex-1 p-10 transition-all duration-300 ${sidebarCollapsed ? 'ml-0' : 'ml-[280px]'} ${selectedSubject ? 'lg:w-1/2' : ''} max-md:ml-0 max-md:p-5`}>
        <div className="max-w-[780px] mx-auto">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden max-md:flex items-center justify-center w-9 h-9 bg-white border border-[#ebe8e2] rounded-lg mb-4">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="#292929"><path d="M93.31,70,28,128l65.27,58a8,8,0,1,1-10.62,12l-72-64a8,8,0,0,1,0-12l72-64A8,8,0,1,1,93.31,70Zm152,52-72-64a8,8,0,0,0-10.62,12L228,128l-65.27,58a8,8,0,1,0,10.62,12l72-64a8,8,0,0,0,0-12Z"/></svg>
          </button>

          <h1 className="text-[32px] font-bold text-[#1a1a1a] mb-2">Analytics</h1>
          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-1">Your Subject</h2>
          <p className="text-sm text-[#8b8b8b] mb-7">View all subject allotted in this institute</p>

          <div className="space-y-[18px]">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                onClick={() => setSelectedSubject(subject.name)}
                className="bg-white rounded-2xl p-6 border border-[#ebe9e5] flex justify-between items-center cursor-pointer hover:bg-[#fafafa] hover:border-[#dedcd8] transition-all"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-[42px] h-[42px] rounded-[10px] bg-[#f2efe9] flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 256 256" fill="#6a6a6a"><path d="M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z"/></svg>
                    </div>
                    <div className="text-lg font-semibold text-[#222]">{subject.name}</div>
                  </div>
                  <div className="flex items-center gap-5 text-sm text-[#6d6d6d]">
                    <div className="flex items-center gap-1.5">
                      <svg width="16" height="16" viewBox="0 0 256 256" fill="#74797e"><path d="M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm11.76-88.43-56-29.87a8,8,0,0,0-7.52,14.12L171,128l17-9.06Zm64-29.87-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L171,128l-43,22.93L43.83,106l0,0L25,96,128,41.07,231,96l-18.78,10-.06,0L188,118.94a8,8,0,0,1,4,6.93v73.64a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12Z"/></svg>
                      {subject.classes} Classes
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg width="16" height="16" viewBox="0 0 256 256" fill="#74797e"><path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"/></svg>
                      {subject.students} Student
                    </div>
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6c6c6c"><path strokeWidth="2" d="M9 6l6 6-6 6"/></svg>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Class Panel */}
      <div className={`fixed top-0 right-0 w-1/2 h-screen bg-[#faf8f6] z-[100] transition-transform duration-300 overflow-y-auto ${selectedSubject ? 'translate-x-0' : 'translate-x-full'} max-md:w-full`}>
        <div className="p-[50px_60px] max-md:p-8">
          <button onClick={() => setSelectedSubject(null)} className="flex items-center gap-2 text-[#666] text-sm mb-5 hover:text-[#333]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M19 12H5m7-7l-7 7 7 7"/></svg>
            Back
          </button>

          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-1">Select Class</h2>
          <p className="text-sm text-[#7c7c7c] mb-9">View classes of your subject</p>

          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
            {classData.map((item) => (
              <div
                key={item.id}
                onClick={handleClassClick}
                className="bg-white border border-[#eceae6] rounded-[20px] p-6 cursor-pointer hover:border-[#dedcd8] transition-all"
              >
                <div className="flex justify-between items-center mb-5">
                  <div className="w-[42px] h-[42px] bg-[#f4f1ea] rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 256 256" fill="#6a6a6a"><path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"/></svg>
                  </div>
                  <div className="text-[13px] text-[#7d7d7d] bg-[#f7f5f0] px-3 py-1.5 rounded-lg">{item.days}</div>
                </div>

                <div className="text-xl font-semibold text-[#1a1a1a] mb-2.5">{item.name}</div>
                <div className="text-sm text-[#555] flex items-center gap-2 mb-7">⏱ {item.time}</div>

                <div className="pt-4 border-t border-[#efefef] flex justify-between items-center">
                  <div className="text-sm text-[#666] flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 256 256" fill="#74797e"><path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"/></svg>
                    {item.students} Student
                  </div>
                  <div className="text-xl text-[#aaa]">›</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
