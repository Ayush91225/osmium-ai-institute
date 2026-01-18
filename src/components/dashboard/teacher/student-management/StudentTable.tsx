'use client';

import { useState } from 'react';

export default function StudentTable() {
  const [searchTerm, setSearchTerm] = useState('');

  const students = Array(6).fill(null).map((_, i) => ({
    id: i + 1,
    name: 'Dhraval Soni',
    uid: '24BTCSE045',
    class: 'B.Tech Sem 3',
    phone: '98638253',
    email: 'random@email.com',
    lastActive: '9:39 PM',
    lastActiveDate: '6 DEC, 2005',
    status: '6 Pending',
    avatar: `https://i.pravatar.cc/150?u=dhraval${i + 1}`
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="p-4 sm:p-5 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Students Onboard</h2>
              <span className="text-gray-500 text-base sm:text-lg">(473)</span>
            </div>
            <p className="text-sm text-gray-500">Check your projects submissions of your students</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600" aria-label="More options">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
            <input
              type="text"
              placeholder="Filter by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
          <div className="flex gap-2 sm:gap-3 sm:ml-auto">
            <div className="relative flex-1 sm:flex-none">
              <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 sm:pl-4 pr-8 sm:pr-10 rounded-lg text-sm focus:outline-none focus:border-gray-400 cursor-pointer w-full">
                <option>All Class</option>
                <option>Class A</option>
                <option>Class B</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap">
              <span className="hidden sm:inline">Sort</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="m21 16-4 4-4-4" />
                <path d="M17 20V4" />
                <path d="m3 8 4-4 4 4" />
                <path d="M7 4v16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4 p-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => window.location.href = '/dashboard/teacher/students/profile'}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.uid}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Class</p>
                <p className="text-gray-900 font-medium">{student.class}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Contact</p>
                <p className="text-gray-900 font-medium">{student.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Last Active</p>
                <p className="text-gray-900 font-medium">{student.lastActive}</p>
                <p className="text-xs text-gray-500">{student.lastActiveDate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFFBEB] text-[#B45309]">
                  {student.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="p-2 sm:p-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-12 sm:w-16">No</th>
              <th className="p-2 sm:p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="p-2 sm:p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">UID</th>
              <th className="p-2 sm:p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="p-2 sm:p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="p-2 sm:p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              <th className="p-2 sm:p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
              <th className="p-2 sm:p-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => window.location.href = '/dashboard/teacher/students/profile'}>
                <td className="p-4 text-sm text-gray-500">{student.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium text-gray-900">{student.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-500">{student.uid}</td>
                <td className="p-4 text-sm text-gray-500">{student.class}</td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{student.phone}</span>
                    <span className="text-xs text-gray-500">{student.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{student.lastActive}</span>
                    <span className="text-xs text-gray-500">{student.lastActiveDate}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFFBEB] text-[#B45309]">
                    {student.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-3 sm:p-4 border-t border-gray-200 flex items-center justify-between">
        <span className="text-xs sm:text-sm text-gray-500">
          <span className="font-medium text-gray-900">478</span> <span className="hidden sm:inline">Students</span>
        </span>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="bg-gray-100 px-2 py-1 rounded text-gray-900 font-medium">1</span>
            <span>of</span>
            <span>3</span>
          </div>
          <button className="p-1 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
