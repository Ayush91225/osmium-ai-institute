'use client';

import { useState } from 'react';

interface AddTestModalProps {
  onClose: () => void;
}

const tests = [
  { name: 'JEE_Mains_MockTest_AI', date: 'May 16, 2025' },
  { name: 'NEET_MockTest_AI', date: 'May 18, 2025' },
  { name: 'JEE_Mains_MockTest_AI', date: 'June 8, 2025' },
  { name: 'JEE_Mains_MockTest_AI', date: 'June 13, 2025' },
];

export default function AddTestModal({ onClose }: AddTestModalProps) {
  const [selectedTest, setSelectedTest] = useState(0);
  const [testName, setTestName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [date, setDate] = useState('Oct 3, 2025');
  const [time, setTime] = useState('12:30 PM');
  const [duration, setDuration] = useState('3h 00m');

  return (
    <div className="fixed inset-0 flex items-center justify-center p-5 z-[1000] bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h1 className="text-[22px] font-semibold text-[#0f172a]">Set Upcoming Test Exam Schedule</h1>
          <button onClick={onClose} className="text-2xl text-[#64748b] hover:text-[#0f172a]">×</button>
        </div>
        <div className="px-8 py-8">
          <div className="mb-7">
            <label className="block text-sm font-semibold text-[#0f172a] mb-2.5">Test name</label>
            <div className="flex gap-3">
              <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="Enter test name" className="flex-1 px-4 py-3 border border-[#f0f0f0] rounded-lg text-sm bg-[#fafafa] focus:bg-white focus:border-[#e0e0e0] outline-none" />
              <button className="px-5 py-3 bg-white border border-[#f0f0f0] rounded-lg text-sm font-medium text-[#64748b] hover:bg-[#fafafa] whitespace-nowrap">Add Description</button>
            </div>
          </div>
          <div className="mb-7">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0f172a] mb-2.5">Select Class</label>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full px-4 py-3 border border-[#f0f0f0] rounded-lg text-sm bg-[#fafafa] focus:bg-white outline-none">
                  <option value="">Choose a class</option>
                  <option value="btech-sem1">B.Tech [Sem 1]</option>
                  <option value="btech-sem2">B.Tech [Sem 2] Gita</option>
                  <option value="btech-sem3">B.Tech [Sem 3]</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0f172a] mb-2.5">Select Subject</label>
                <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="w-full px-4 py-3 border border-[#f0f0f0] rounded-lg text-sm bg-[#fafafa] focus:bg-white outline-none">
                  <option value="">Choose a subject</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="dbms">DBMS</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mb-7">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0f172a] mb-2.5">Date</label>
                <div className="relative">
                  <input type="text" value={date} readOnly className="w-full px-4 py-3 pr-10 border border-[#f0f0f0] rounded-lg text-sm bg-[#fafafa] cursor-pointer" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor"><rect x="40" y="40" width="176" height="176" rx="8" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/><line x1="176" y1="24" x2="176" y2="56" strokeWidth="16" strokeLinecap="round"/><line x1="80" y1="24" x2="80" y2="56" strokeWidth="16" strokeLinecap="round"/><line x1="40" y1="88" x2="216" y2="88" strokeWidth="16" strokeLinecap="round"/><circle cx="128" cy="152" r="16" fill="currentColor"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0f172a] mb-2.5">Time</label>
                <div className="relative">
                  <input type="text" value={time} readOnly className="w-full px-4 py-3 pr-10 border border-[#f0f0f0] rounded-lg text-sm bg-[#fafafa] cursor-pointer" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0f172a] mb-2.5">Duration</label>
                <div className="relative">
                  <input type="text" value={duration} readOnly className="w-full px-4 py-3 pr-10 border border-[#f0f0f0] rounded-lg text-sm bg-[#fafafa] cursor-pointer" />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor"><polyline points="80 176 128 224 176 176" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/><polyline points="80 80 128 32 176 80" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[13px] text-[#2F3034] mt-3">This test will place on {date} from {time} until 3:30 PM</p>
          </div>
          <div className="mb-7">
            <h2 className="text-base font-semibold text-[#0f172a] mb-4">Add Mock Test</h2>
            <div className="bg-white border border-[#ECECEC] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-medium text-[#4A4A4A]">Recently generated tests paper</span>
                <a href="#" className="text-sm text-[#C9A059] font-medium hover:text-[#B8905A]">See all</a>
              </div>
              {tests.map((test, idx) => (
                <div key={idx} onClick={() => setSelectedTest(idx)} className="flex items-center justify-between py-4.5 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 ${selectedTest === idx ? 'border-[#C9A059]' : 'border-[#f0f0f0]'} relative`}>
                      {selectedTest === idx && <div className="w-2.5 h-2.5 bg-[#C9A059] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                    </div>
                    <span className="text-sm font-medium text-[#6B6B6B]">{test.name}</span>
                  </div>
                  <span className="text-[13px] text-[#9B9B9B]">{test.date}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => { alert('Test added!'); onClose(); }} className="w-auto ml-auto flex items-center gap-2 bg-[#2d2d2d] text-white px-7 py-3.5 rounded-[10px] text-[15px] font-semibold hover:bg-black">
            <span>+</span>Add to Upcoming Test
          </button>
        </div>
      </div>
    </div>
  );
}
