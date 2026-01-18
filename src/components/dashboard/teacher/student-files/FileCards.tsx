'use client';

import { useState } from 'react';

export default function FileCards() {
  const [activeTab, setActiveTab] = useState('all');

  const files = [
    { name: 'Java core notes.pdf', date: 'May 14, 2025', type: 'pdf' },
    { name: 'Python basics.pdf', date: 'May 12, 2025', type: 'pdf' },
    { name: 'Data Structures.pdf', date: 'May 10, 2025', type: 'pdf' },
    { name: 'Algorithms.pdf', date: 'May 8, 2025', type: 'pdf' },
    { name: 'Database Systems.pdf', date: 'May 6, 2025', type: 'pdf' },
    { name: 'Web Development.pdf', date: 'May 4, 2025', type: 'pdf' },
  ];

  return (
    <>
      {/* File Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-1.5 text-[13px] font-${activeTab === 'all' ? '600' : '500'} rounded-xl cursor-pointer transition-all duration-200 whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-white text-black border border-transparent'
              : 'border border-[rgba(0,0,0,0.12)] text-[rgba(0,0,0,0.6)] hover:border-[rgba(0,0,0,0.22)] hover:text-[rgba(0,0,0,0.8)]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('test')}
          className={`px-4 py-1.5 text-[13px] font-${activeTab === 'test' ? '600' : '500'} rounded-xl cursor-pointer transition-all duration-200 whitespace-nowrap ${
            activeTab === 'test'
              ? 'bg-white text-black border border-transparent'
              : 'border border-[rgba(0,0,0,0.12)] text-[rgba(0,0,0,0.6)] hover:border-[rgba(0,0,0,0.22)] hover:text-[rgba(0,0,0,0.8)]'
          }`}
        >
          Test paper
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-1.5 text-[13px] font-${activeTab === 'quiz' ? '600' : '500'} rounded-xl cursor-pointer transition-all duration-200 whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-white text-black border border-transparent'
              : 'border border-[rgba(0,0,0,0.12)] text-[rgba(0,0,0,0.6)] hover:border-[rgba(0,0,0,0.22)] hover:text-[rgba(0,0,0,0.8)]'
          }`}
        >
          Quizzes
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-1.5 text-[13px] font-${activeTab === 'notes' ? '600' : '500'} rounded-xl cursor-pointer transition-all duration-200 whitespace-nowrap ${
            activeTab === 'notes'
              ? 'bg-white text-black border border-transparent'
              : 'border border-[rgba(0,0,0,0.12)] text-[rgba(0,0,0,0.6)] hover:border-[rgba(0,0,0,0.22)] hover:text-[rgba(0,0,0,0.8)]'
          }`}
        >
          Notes
        </button>
      </div>

      {/* Study Material Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 w-full max-w-[1300px]">
        {files.map((file, index) => (
          <div
            key={index}
            className="bg-white rounded-[18px] border border-[#e6e6e6] p-[26px] h-[180px] flex flex-col justify-between shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
          >
            {/* File Icon Top */}
            <div className="w-full flex justify-center mt-2.5 opacity-35">
              <div className="w-8 h-[18px] rounded-md mx-auto opacity-42">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="w-7 h-[18px]"
                >
                  <rect width="256" height="256" fill="none" />
                  <path
                    d="M40 80h176M40 128h176M40 176h176"
                    stroke="#6d727c"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* File Row */}
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] rounded-[10px] border border-[#e3e3e3] flex flex-col justify-center items-center">
                <span className="text-xs font-semibold text-[#4a4a4a]">📄</span>
                <span className="text-xs font-semibold text-[#4a4a4a]">PDF</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold text-[#333]">{file.name}</div>
                <div className="text-xs text-[#9a9a9a] -mt-0.5">{file.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
