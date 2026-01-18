'use client';

import { useState } from 'react';
import Link from 'next/link';
import AIModal from './exams/AIModal';
import ScheduleModal from './exams/ScheduleModal';

export default function ExamsPage() {
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
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="p-6 lg:p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
        <h1 className="text-2xl font-bold text-[#1b1b1b] max-md:text-xl">Exam & Tests</h1>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/teacher/exams/create" className="bg-[#000000] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 no-underline hover:bg-[#1a1a1a] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox="0 0 256 256">
              <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" />
            </svg>
            <span className="max-sm:hidden">Create Test</span>
            <span className="sm:hidden">Create</span>
          </Link>
          <button onClick={() => setScheduleModalOpen(true)} className="bg-[#000000] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#1a1a1a] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox="0 0 256 256">
              <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" />
            </svg>
            <span className="max-sm:hidden">Schedule Test</span>
            <span className="sm:hidden">Schedule</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 border border-[#eceae7] shadow-[0_6px_18px_rgba(13,12,11,0.04)]">
          <div className="flex items-center gap-2 text-[#6b6b6b] mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-4 h-4" fill="currentColor">
              <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <path d="M120,120a8,8,0,0,1,8,8v40a8,8,0,0,0,8,8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <circle cx="124" cy="84" r="12" />
            </svg>
            <span className="text-[15px] font-medium text-[#4A4A4A]">Total Tests Conducted</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[32px] font-semibold text-black">9</span>
            <span className="bg-[#ECF4E6] text-[#65834E] px-2.5 py-1 rounded-md text-[12px] font-medium">+2 This Month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#eceae7] shadow-[0_6px_18px_rgba(13,12,11,0.04)]">
          <div className="flex items-center gap-2 text-[#6b6b6b] mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-4 h-4" fill="currentColor">
              <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <path d="M120,120a8,8,0,0,1,8,8v40a8,8,0,0,0,8,8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <circle cx="124" cy="84" r="12" />
            </svg>
            <span className="text-[15px] font-medium text-[#4A4A4A]">Scheduled Upcoming Tests</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[32px] font-semibold text-black">5</span>
            <span className="bg-[#ECF4E6] text-[#65834E] px-2.5 py-1 rounded-md text-[12px] font-medium">+1 This Month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#eceae7] shadow-[0_6px_18px_rgba(13,12,11,0.04)]">
          <div className="flex items-center gap-2 text-[#6b6b6b] mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-4 h-4" fill="currentColor">
              <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <path d="M120,120a8,8,0,0,1,8,8v40a8,8,0,0,0,8,8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <circle cx="124" cy="84" r="12" />
            </svg>
            <span className="text-[15px] font-medium text-[#4A4A4A]">Total Mock Tests Generated</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[32px] font-semibold text-black">12</span>
            <span className="bg-[#F4ECE6] text-[#815931] px-2.5 py-1 rounded-md text-[12px] font-medium">-1 This Month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-7">
        <div className="space-y-6">
          <div className="rounded-xl bg-[#E8EADF] p-6 relative overflow-hidden">
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none opacity-25 text-[80px]">✨</div>
            <div className="relative z-10 pr-24">
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">AI-Powered Mock Test</h2>
              <p className="text-sm text-[#555] leading-relaxed mb-4">Upload 5+ papers for AI test generation</p>
              <button onClick={() => setAiModalOpen(true)} className="bg-white text-[#1A1A1A] text-sm font-medium px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#f5f3f0] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z" />
                </svg>
                Try now
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-[#EBE9E5] p-4 shadow-[0_6px_18px_rgba(13,12,11,0.04)]">
            <div className="flex justify-between items-center mb-3">
              <div className="text-base font-semibold text-[#111827]">Scheduled Tests</div>
              <div className="text-xs text-[#9ca3af]">#{currentSchedule.daysLeft}</div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="text-xs text-[#6b7280]">{currentSchedule.date}</div>
                <div className="bg-[#DBE6CF] text-[#4A5141] text-xs px-2 py-1 rounded-full">Upcoming</div>
              </div>
              <div className="flex items-center gap-1">
                <button className="bg-[#FFFFFF] border border-[#E4E5EB] px-3 py-1.5 rounded text-xs text-[#70737F] hover:bg-[#f5f3f0] transition-colors">View</button>
                <button className="bg-[#FFFFFF] border border-[#E4E5EB] px-3 py-1.5 rounded text-xs text-[#70737F] hover:bg-[#f5f3f0] transition-colors">Edit</button>
                <button className="text-base text-[#9aa0a6] px-1">⋮</button>
              </div>
            </div>

            <div className="text-sm font-semibold text-[#111827] mb-2">{currentSchedule.title}</div>
            <div className="h-px bg-[#f0f0f0] mb-3"></div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <div className="flex items-center gap-1 text-xs text-[#9B6D24] mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" />
                  </svg>
                  Time
                </div>
                <div className="text-xs font-semibold text-[#111827]">{currentSchedule.time}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-xs text-[#68803E] mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm11.76-88.43-56-29.87a8,8,0,0,0-7.52,14.12L171,128l17-9.06Zm64-29.87-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L171,128l-43,22.93L43.83,106l0,0L25,96,128,41.07,231,96l-18.78,10-.06,0L188,118.94a8,8,0,0,1,4,6.93v73.64a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12Z" />
                  </svg>
                  Class
                </div>
                <div className="text-xs font-semibold text-[#111827]">{currentSchedule.class}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-xs text-[#498183] mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256" fill="#498183">
                    <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,184H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm0-48H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm0-48H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm120,96H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Zm0-48H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Zm0-48H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Z" />
                  </svg>
                  Questions
                </div>
                <div className="text-xs font-semibold text-[#111827]">{currentSchedule.questions}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setScheduleIndex((scheduleIndex - 1 + scheduleStates.length) % scheduleStates.length)} className="w-8 h-8 rounded-full bg-white border border-[#e6e6e6] flex items-center justify-center text-xs text-[#475569] hover:bg-[#f5f3f0] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256">
                  <line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                </svg>
              </button>
              <button onClick={() => setScheduleIndex((scheduleIndex + 1) % scheduleStates.length)} className="w-8 h-8 rounded-full bg-white border border-[#e6e6e6] flex items-center justify-center text-xs text-[#475569] hover:bg-[#f5f3f0] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 256 256">
                  <line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                  <polyline points="144 56 216 128 144 200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-semibold text-gray-900">Generated Mock Tests</h2>
            <button className="text-xl text-gray-400 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5" fill="currentColor">
                <path d="M156,128a28,28,0,1,1-28-28A28,28,0,0,1,156,128ZM128,76a28,28,0,1,0-28-28A28,28,0,0,0,128,76Zm0,104a28,28,0,1,0,28,28A28,28,0,0,0,128,180Z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">Check your recently saved mock test</p>

          <div className="max-h-[400px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D3D1CD transparent' }}>
            {[
              { title: 'Python Basic', date: '11 June, 2025', marks: '80' },
              { title: 'OOP With C++', date: '11 June, 2025', marks: '80' },
              { title: 'JAVA Core', date: '11 June, 2025', marks: '80' },
              { title: 'Aptitude Analytics', date: '11 June, 2025', marks: '80' }
            ].map((test, i) => (
              <div key={i} className="flex justify-between items-center py-5 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 256 256">
                      <path d="M168,224h32a8,8,0,0,0,8-8V88L152,32H56a8,8,0,0,0-8,8v72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                      <polyline points="152 32 152 88 208 88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <span>{test.date}</span>
                      <span className="text-gray-600 text-xs font-semibold flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 256 256" fill="#be9b6b">
                          <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z" />
                        </svg>
                        {test.marks} Marks
                      </span>
                    </div>
                    <div className="text-base font-semibold text-gray-900">{test.title}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Modify</button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">View paper</button>
                  <button className="cursor-pointer hover:fill-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8f8f8f" viewBox="0 0 256 256">
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
