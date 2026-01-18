'use client';

import { useState, useEffect } from 'react';
import DateRangePicker from './dashboard/DateRangePicker';
import AddTestModal from './dashboard/AddTestModal';

export default function TeacherDashboardPage() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAddTest, setShowAddTest] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Chart) {
      const ctx = document.getElementById('chart') as HTMLCanvasElement;
      if (ctx) {
        new window.Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Paper 1', 'Paper 2', 'Paper 3', 'Paper 4'],
            datasets: [
              {
                label: 'B.Tech [Sem 1]',
                data: [58, 72, 76, 78],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59,130,246,0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBorderColor: '#3b82f6',
                pointBackgroundColor: '#3b82f6'
              },
              {
                label: 'B.Tech [Sem 2] Gita',
                data: [68, 76, 82, 65],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16,185,129,0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBorderColor: '#10b981',
                pointBackgroundColor: '#10b981'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  stepSize: 20,
                  color: '#9ca3af',
                  font: { size: 12 }
                },
                grid: {
                  color: '#f3f4f6',
                  drawBorder: false
                },
                border: { display: false }
              },
              x: {
                ticks: {
                  color: '#9ca3af',
                  font: { size: 12 }
                },
                grid: { display: false }
              }
            }
          }
        });
      }
    }
  }, []);

  return (
    <div className="flex-1 bg-[#faf8f6] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-[#1a1a1a]">Dashboard</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5E5E5] rounded-lg text-xs font-medium hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M168,224a8,8,0,0,1-8,8H96a8,8,0,1,1,0-16h64A8,8,0,0,1,168,224Zm53.85-32A15.8,15.8,0,0,1,208,200H48a16,16,0,0,1-13.8-24.06C39.75,166.38,48,139.34,48,104a80,80,0,1,1,160,0c0,35.33,8.26,62.38,13.81,71.94A15.89,15.89,0,0,1,221.84,192ZM208,184c-7.73-13.27-16-43.95-16-80a64,64,0,1,0-128,0c0,36.06-8.28,66.74-16,80Z"/></svg>
          </button>
          <button onClick={() => setShowDatePicker(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5E5E5] rounded-lg text-xs font-medium hover:bg-gray-50">
            Monthly
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5E5E5] rounded-lg text-xs font-medium hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M224,152a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V160H40a8,8,0,0,1,0-16h80V64a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,152Z"/></svg>
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl flex items-center justify-between px-6 py-4 gap-6 mb-5">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 256 256"><circle cx="128" cy="128" r="120" fill="#ECE1D1"/><polyline points="48 128 72 128 96 64 160 192 184 128 208 128" fill="none" stroke="#8B7355" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/></svg>
          </div>
          <div className="flex-1">
            <div className="text-sm text-[#222] mb-0.5 font-normal">Student Enrolled</div>
            <div className="text-lg font-normal text-[#111]">
              546 <span className="text-[10px] text-[#8a8a8a] ml-1 bg-[#ECF4E6] text-[#65834E] px-1.5 py-0.5 rounded">256 active today</span>
            </div>
          </div>
        </div>
        <div className="w-px h-12 bg-[#e6e4e1]"></div>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 256 256"><circle cx="128" cy="128" r="120" fill="#E8E7D5"/><g transform="translate(128,128) scale(0.7) translate(-128,-128)"><path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.08,16.08,0,0,0-6.35-12.76L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64Z" fill="#434027"/></g></svg>
          </div>
          <div className="flex-1">
            <div className="text-sm text-[#222] mb-0.5 font-normal">Average class performance</div>
            <div className="text-lg font-normal text-[#111]">
              88.5% <span className="text-[10px] text-[#8a8a8a] ml-1 bg-[#ECF4E6] text-[#65834E] px-1.5 py-0.5 rounded">+5.8% improvement</span>
            </div>
          </div>
        </div>
        <div className="w-px h-12 bg-[#e6e4e1]"></div>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 256 256"><circle cx="128" cy="128" r="120" fill="#CFE8E2"/><g transform="translate(128,128) scale(0.7) translate(-128,-128)"><path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Z" fill="#242929"/></g></svg>
          </div>
          <div className="flex-1">
            <div className="text-sm text-[#222] mb-0.5 font-normal">Test Conducted</div>
            <div className="text-lg font-normal text-[#111]">
              3 <span className="text-[10px] text-[#8a8a8a] ml-1 bg-[#F4ECE6] text-[#89694A] px-1.5 py-0.5 rounded">5 Scheduled Tests</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-xl p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-lg font-semibold text-[#1a1a1a] mb-1">Previous Exam Test Performances</h1>
              <p className="text-xs text-[#999]">Highlights the highest scoring students</p>
            </div>
            <button className="bg-white border border-[#d1d5db] rounded-lg px-2.5 py-1.5 text-xs text-[#374151] font-medium hover:bg-[#f9fafb] flex items-center gap-1">
              <span>B.Tech [Sem-3] [DBMS]</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
          <div className="relative mt-4">
            <div className="absolute left-[120px] right-2 top-0 h-full pointer-events-none">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#f0efef]"></div>
              <div className="absolute left-[20%] top-0 bottom-0 w-px bg-[#f0efef]"></div>
              <div className="absolute left-[40%] top-0 bottom-0 w-px bg-[#f0efef]"></div>
              <div className="absolute left-[60%] top-0 bottom-0 w-px bg-[#f0efef]"></div>
              <div className="absolute left-[80%] top-0 bottom-0 w-px bg-[#f0efef]"></div>
            </div>
            <div className="space-y-3">
              {[{name: 'Rajat bhatia', width: 95}, {name: 'Arjun Kale', width: 88}, {name: 'Chirag Iyer', width: 82}, {name: 'Anmol Mehra', width: 85}, {name: 'Swastik Khatua', width: 86}].map((student, idx) => (
                <div key={idx} className="flex items-center relative">
                  <div className="w-[120px] text-sm text-[#444] pr-3">{student.name}</div>
                  <div className="flex-1 h-7 relative z-[5]">
                    <div className="h-full bg-[#ECECCA] rounded-sm relative cursor-pointer hover:bg-[#E4B17D] transition-colors group" style={{ width: `${student.width}%` }}>
                      <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#2d2d2d] text-white px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-[9999]">
                        Score: {student.width}%<br/><span className="inline-block w-1 h-1 bg-[#f4c542] rounded-full mr-1"></span>#{idx + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-3 pl-[120px] h-4">
              <div className="relative text-xs text-[#888]">
                <span className="absolute left-0">0%</span>
                <span className="absolute left-[20%] -translate-x-1/2">20%</span>
                <span className="absolute left-[40%] -translate-x-1/2">40%</span>
                <span className="absolute left-[60%] -translate-x-1/2">60%</span>
                <span className="absolute left-[80%] -translate-x-1/2">80%</span>
                <span className="absolute left-[100%] -translate-x-full">100%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-lg font-semibold text-[#1a1a1a] mb-1">Scheduled Tests</h2>
              <p className="text-xs text-[#999]">All Schedules upcoming test</p>
            </div>
            <button onClick={() => setShowAddTest(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0e0e0e] text-white rounded-lg text-xs font-medium hover:bg-[#0e0e0e]">
              <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/></svg>
              Add Tests
            </button>
          </div>
          <div className="space-y-3">
            <div className="bg-[#F7F5F3] rounded-lg px-4 py-3 border border-[#f0f0f0]">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs text-[#666]">Tue, 12 June</span>
                  <span className="ml-2 text-[10px] font-medium bg-[#e8f5e8] text-[#2d7d32] px-2 py-0.5 rounded-full">Upcoming</span>
                </div>
                <div className="flex gap-1.5 items-center">
                  <button className="text-[10px] px-2 py-1 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] text-[#666]">View Paper</button>
                  <button className="text-[10px] px-2 py-1 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] text-[#666]">Modify</button>
                  <button className="text-base border-none bg-transparent px-1 text-[#999]">⋮</button>
                </div>
              </div>
              <h2 className="text-base font-semibold text-[#1a1a1a] mb-2">Python Advanced</h2>
              <div className="flex gap-6 text-xs text-[#6a6a6a]">
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" fill="#6a6a6a" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"/></svg>
                  10:30 AM
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" fill="#6a6a6a" viewBox="0 0 256 256"><path d="M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm64-118.3-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L128,105.07,25,96,128,41.07,231,96Z"/></svg>
                  12th section B
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" fill="#6a6a6a" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,184H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm120,0H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Z"/></svg>
                  25 Questions
                </span>
              </div>
            </div>
            <div className="bg-[#F7F5F3] rounded-lg px-4 py-3 border border-[#f0f0f0]">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs text-[#666]">Tue, 12 June</span>
                  <span className="ml-2 text-[10px] font-medium bg-[#fff4db] text-[#a1761f] px-2 py-0.5 rounded-full">Completed</span>
                </div>
                <div className="flex gap-1.5 items-center">
                  <button className="text-[10px] px-2 py-1 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] text-[#666]">View Analytics</button>
                  <button className="text-base border-none bg-transparent px-1 text-[#999]">⋮</button>
                </div>
              </div>
              <h2 className="text-base font-semibold text-[#888] mb-2 line-through">JAVA Core</h2>
              <div className="flex gap-6 text-xs text-[#6a6a6a]">
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" fill="#6a6a6a" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"/></svg>
                  2:30 PM
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" fill="#6a6a6a" viewBox="0 0 256 256"><path d="M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm64-118.3-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L128,105.07,25,96,128,41.07,231,96Z"/></svg>
                  12th section B
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" fill="#6a6a6a" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,184H64a8,8,0,0,1,0-16h8a8,8,0,0,1,0,16Zm120,0H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Z"/></svg>
                  25 Questions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="bg-white rounded-xl border border-[#eceae6] px-5 py-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[#1a1a1a] m-0">Class Performances</h2>
              <p className="text-xs text-[#9ca3af] mt-0.5 mb-0">View the Performances of classes</p>
            </div>
            <select className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-lg px-3 py-1.5 text-xs text-[#374151] cursor-pointer outline-none">
              <option value="DaFSuC">DaFSuC</option>
              <option value="DBMS">DBMS</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <div className="w-full h-[200px] mb-4">
            <canvas id="chart" />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-[#374151] cursor-pointer">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></div>
              <span>B.Tech [Sem 1]</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#374151] cursor-pointer">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
              <span>B.Tech [Sem 2] Gita</span>
            </div>
          </div>
          <div className="border-t border-[#f3f4f6]">
            <div className="grid grid-cols-3 py-2 border-b border-[#f3f4f6]">
              <div className="text-[10px] font-medium text-[#9ca3af] uppercase tracking-wide">TEST NAME</div>
              <div className="text-[10px] font-medium text-[#9ca3af] uppercase tracking-wide">ATTEMPT DATE</div>
              <div className="text-[10px] font-medium text-[#9ca3af] uppercase tracking-wide text-right">CLASS ACCURACY</div>
            </div>
            <div className="grid grid-cols-3 py-2.5">
              <div className="text-xs text-[#374151] font-medium">Paper 1</div>
              <div className="text-xs text-[#374151] font-medium">16 Nov, 2025</div>
              <div className="text-xs text-[#374151] font-medium text-right">76.21% <span className="text-[#10b981] text-[11px] ml-1">+5.6</span></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#f0f0f0] px-5 py-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[#1a1a1a] mb-0.5">Recent Activity</h2>
              <p className="text-xs text-[#7d7d7d]">Check activity of students</p>
            </div>
            <button className="w-7 h-7 rounded-lg bg-[#faf9f8] border border-[#e9e9e9] flex items-center justify-center text-[#888] text-base hover:bg-[#f5f3f0]">⋮</button>
          </div>
          <div className="pl-6 relative">
            <div className="absolute left-[9px] top-6 w-0.5 h-[calc(100%-80px)] bg-[#ECECEC]"></div>
            <div className="flex items-center gap-1.5 mb-3 relative">
              <div className="absolute left-[-24px] w-5 h-5 rounded bg-[#e6e7ea] flex items-center justify-center hover:bg-[#d4cfc8] cursor-pointer">
                <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,48H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"/></svg>
              </div>
              <div className="bg-[#f7f8fa] border border-[#e2e2e6] px-2 py-0.5 text-[10px] rounded-lg text-[#505050]">Today</div>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-[-24px] top-0 w-5 h-5 rounded-full bg-[#F7E6C6] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 256 256" fill="#443821"><path d="M212,76V72a44,44,0,0,0-74.86-31.31,3.93,3.93,0,0,0-1.14,2.8v88.72a4,4,0,0,0,6.2,3.33A47.67,47.67,0,0,1,167.68,128a8.18,8.18,0,0,1,8.31,7.58,8,8,0,0,1-8,8.42,32,32,0,0,0-32,32v33.88a4,4,0,0,0,1.49,3.12,47.92,47.92,0,0,0,74.21-17.16,4,4,0,0,0-4.49-5.56A68.06,68.06,0,0,1,192,192h-7.73a8.18,8.18,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h8a51.6,51.6,0,0,0,24-5.88v0A52,52,0,0,0,212,76Z"/></svg>
                </div>
                <p className="text-xs text-[#6e6e72] leading-relaxed mb-1.5"><span className="font-semibold text-[#1a1a1a]">Aarav Sharma</span> completed the Physics – Chapter 5 Test with a score of 78% · <span className="text-[#949494] text-[11px]">9:20 AM</span></p>
                <button className="text-[10px] px-1.5 py-0.5 rounded text-[#6b7280] bg-[#f3f4f6] font-medium hover:bg-[#e5e7eb]">See Result</button>
              </div>
              <div className="relative">
                <div className="absolute left-[-24px] top-0 w-5 h-5 rounded-full bg-[#E2F1CD] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 256 256" fill="#344421"><path d="M212,76V72a44,44,0,0,0-74.86-31.31,3.93,3.93,0,0,0-1.14,2.8v88.72a4,4,0,0,0,6.2,3.33A47.67,47.67,0,0,1,167.68,128a8.18,8.18,0,0,1,8.31,7.58,8,8,0,0,1-8,8.42,32,32,0,0,0-32,32v33.88a4,4,0,0,0,1.49,3.12,47.92,47.92,0,0,0,74.21-17.16,4,4,0,0,0-4.49-5.56A68.06,68.06,0,0,1,192,192h-7.73a8.18,8.18,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h8a51.6,51.6,0,0,0,24-5.88v0A52,52,0,0,0,212,76Z"/></svg>
                </div>
                <p className="text-xs text-[#6e6e72] leading-relaxed mb-1.5"><span className="font-semibold text-[#1a1a1a]">Suman Yadav</span> completed the Physics – Chapter 5 Test with a score of 78% · <span className="text-[#949494] text-[11px]">9:20 AM</span></p>
                <div className="text-[10px] px-1.5 py-0.5 rounded text-[#6b7280] bg-[#f3f4f6] inline-block font-medium">Inheritance Quiz</div>
              </div>
              <div className="relative">
                <div className="absolute left-[-24px] top-0 w-5 h-5 rounded-full bg-[#D1E8E6] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 256 256" fill="#214442"><path d="M212,76V72a44,44,0,0,0-74.86-31.31,3.93,3.93,0,0,0-1.14,2.8v88.72a4,4,0,0,0,6.2,3.33A47.67,47.67,0,0,1,167.68,128a8.18,8.18,0,0,1,8.31,7.58,8,8,0,0,1-8,8.42,32,32,0,0,0-32,32v33.88a4,4,0,0,0,1.49,3.12,47.92,47.92,0,0,0,74.21-17.16,4,4,0,0,0-4.49-5.56A68.06,68.06,0,0,1,192,192h-7.73a8.18,8.18,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h8a51.6,51.6,0,0,0,24-5.88v0A52,52,0,0,0,212,76Z"/></svg>
                </div>
                <p className="text-xs text-[#6e6e72] leading-relaxed mb-1.5"><span className="font-semibold text-[#1a1a1a]">Rajat Bhatia</span> completed the Physics – Chapter 5 Test with a score of 78% · <span className="text-[#949494] text-[11px]">9:20 AM</span></p>
                <div className="text-[10px] px-1.5 py-0.5 rounded text-[#6b7280] bg-[#f3f4f6] inline-block font-medium">Inheritance Quiz</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDatePicker && <DateRangePicker onClose={() => setShowDatePicker(false)} />}
      {showAddTest && <AddTestModal onClose={() => setShowAddTest(false)} />}
    </div>
  );
}
