'use client';

import { useState } from 'react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  const [testName, setTestName] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedTest, setSelectedTest] = useState(0);

  if (!isOpen) return null;

  const mockTests = [
    { name: 'JEE_Mains_MockTest_AI', date: 'May 16, 2025' },
    { name: 'NEET_MockTest_AI', date: 'May 18, 2025' },
    { name: 'JEE_Mains_MockTest_AI', date: 'June 8, 2025' },
    { name: 'JEE_Mains_MockTest_AI', date: 'June 13, 2025' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-[#f1f1f1]">
          <h1 className="text-xl font-semibold text-[#1a1a1a]">Set Upcoming Test Exam Schedule</h1>
          <button onClick={onClose} className="text-2xl text-[#666] hover:text-[#333] transition-colors">×</button>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#374151] mb-2">Test name</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Enter test name"
                className="flex-1 px-4 py-3 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#3b82f6] focus:ring-3 focus:ring-[#3b82f6]/10 transition-all"
              />
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="px-5 py-3 bg-[#f3f4f6] border border-[#d1d5db] rounded-lg text-sm text-[#374151] hover:bg-[#e5e7eb] transition-colors"
              >
                {showDescription ? 'Remove Description' : 'Add Description'}
              </button>
            </div>
            {showDescription && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-[#374151] mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter test description"
                  rows={3}
                  className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#3b82f6] focus:ring-3 focus:ring-[#3b82f6]/10 transition-all resize-none"
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value="Oct 3, 2025"
                    readOnly
                    className="w-full px-4 py-3 pr-10 border border-[#d1d5db] rounded-lg text-sm outline-none cursor-pointer"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                      <rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                      <line x1="176" y1="24" x2="176" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                      <line x1="80" y1="24" x2="80" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                      <line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                      <circle cx="128" cy="152" r="16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Time</label>
                <div className="relative">
                  <input
                    type="text"
                    value="12:30 PM"
                    readOnly
                    className="w-full px-4 py-3 pr-10 border border-[#d1d5db] rounded-lg text-sm outline-none cursor-pointer"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Duration</label>
                <div className="relative">
                  <input
                    type="text"
                    value="3h 00m"
                    readOnly
                    className="w-full px-4 py-3 pr-10 border border-[#d1d5db] rounded-lg text-sm outline-none cursor-pointer"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                      <polyline points="80 176 128 224 176 176" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                      <polyline points="80 80 128 32 176 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#6b7280] mt-2">This test will place on Oct 3, 2025 from 12:30 PM until 3:30 PM</p>
          </div>

          <div className="mb-6">
            <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Add Mock Test</h2>
            <div className="rounded-xl overflow-hidden border border-[#f3f4f6]">
              <div className="flex justify-between items-center px-5 py-4 bg-white border-b border-[#f3f4f6]">
                <span className="text-sm font-medium text-[#374151]">Recently generated tests paper</span>
                <a href="#" className="text-xs text-[#C9A059] hover:underline">See all</a>
              </div>
              {mockTests.map((test, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedTest(index)}
                  className="flex justify-between items-center px-5 py-4 border-b border-[#f3f4f6] last:border-b-0 cursor-pointer hover:bg-[#f9fafb] transition-colors bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 transition-all ${selectedTest === index ? 'border-[#C9A059] bg-[#C9A059]' : 'border-[#d1d5db] bg-white'}`}>
                      {selectedTest === index && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-[3px]" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-[#1a1a1a]">{test.name}</span>
                  </div>
                  <span className="text-xs text-[#6b7280]">{test.date}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-auto max-w-[250px] h-12 px-6 bg-[#1a1a1a] text-white rounded-xl text-base font-semibold hover:bg-[#2a2a2a] transition-colors flex items-center justify-center gap-2">
            <span className="text-xl font-normal">+</span>
            Add to Upcoming Test
          </button>
        </div>
      </div>
    </div>
  );
}
