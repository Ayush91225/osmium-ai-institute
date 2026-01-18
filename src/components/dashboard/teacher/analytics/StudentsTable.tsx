'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const students = [
  { id: 1, name: 'Dhraval Soni', uid: '24BTCSE045', class: 'B.Tech Sem 3', contact: '98638253', email: 'random@email.com', lastActive: '9:39 PM', date: '6 DEC, 2005', status: 'pending', count: 6, avatar: 'https://i.pravatar.cc/150?u=dhraval' },
  { id: 2, name: 'Dhraval Soni', uid: '24BTCSE045', class: 'B.Tech Sem 3', contact: '98638253', email: 'random@email.com', lastActive: '9:39 PM', date: '6 DEC, 2005', status: 'pending', count: 6, avatar: 'https://i.pravatar.cc/150?u=dhraval2' },
  { id: 3, name: 'Arjun Kale', uid: '24BTCSE046', class: 'B.Tech Sem 3', contact: '98765432', email: 'arjun@email.com', lastActive: '11:15 AM', date: '8 DEC, 2005', status: 'completed', count: 0, avatar: 'https://i.pravatar.cc/150?u=arjun' },
  { id: 4, name: 'Priya Sharma', uid: '24BTCSE047', class: 'B.Tech Sem 3', contact: '98123456', email: 'priya@email.com', lastActive: '2:45 PM', date: '7 DEC, 2005', status: 'pending', count: 3, avatar: 'https://i.pravatar.cc/150?u=priya' },
  { id: 5, name: 'Rahul Verma', uid: '24BTCSE048', class: 'B.Tech Sem 4', contact: '98987654', email: 'rahul@email.com', lastActive: '4:20 PM', date: '7 DEC, 2005', status: 'completed', count: 0, avatar: 'https://i.pravatar.cc/150?u=rahul' },
  { id: 6, name: 'Anita Patel', uid: '24BTCSE049', class: 'B.Tech Sem 4', contact: '98456789', email: 'anita@email.com', lastActive: '6:30 PM', date: '6 DEC, 2005', status: 'pending', count: 2, avatar: 'https://i.pravatar.cc/150?u=anita' }
];

export default function StudentsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Class');
  const router = useRouter();

  const handleStudentClick = (studentId: number) => {
    router.push('/dashboard/teacher/students/profile');
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All Class' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl">
      <div className="p-5 border-b border-[#E5E5E5]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold text-[#111827]">Students Onboard</h2>
              <span className="text-[#6b7280] text-lg">(473)</span>
            </div>
            <p className="text-sm text-[#6b7280]">Check your projects submissions of your students</p>
          </div>
          <button className="text-[#9ca3af] hover:text-[#6b7280]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input 
              type="text" 
              placeholder="Filter by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#c79647]/20 focus:border-[#c79647]"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="appearance-none bg-white border border-[#e5e7eb] text-[#374151] py-2 pl-4 pr-10 rounded-lg text-sm outline-none cursor-pointer"
              >
                <option>All Class</option>
                <option>B.Tech Sem 3</option>
                <option>B.Tech Sem 4</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#374151] hover:bg-[#f9fafb]">
              <span className="hidden sm:inline">Sort</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m21 16-4 4-4-4"></path>
                <path d="M17 20V4"></path>
                <path d="m3 8 4-4 4 4"></path>
                <path d="M7 4v16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden p-4 space-y-4">
        {filteredStudents.map((student) => (
          <div 
            key={student.id} 
            className="bg-white border border-[#e5e7eb] rounded-lg p-4 cursor-pointer hover:bg-[#f9fafb]"
            onClick={() => handleStudentClick(student.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-medium text-[#111827]">{student.name}</h3>
                  <p className="text-sm text-[#6b7280]">{student.uid}</p>
                </div>
              </div>
              <button className="text-[#9ca3af] hover:text-[#6b7280] p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#6b7280] text-xs uppercase mb-1">Class</p>
                <p className="text-[#111827] font-medium">{student.class}</p>
              </div>
              <div>
                <p className="text-[#6b7280] text-xs uppercase mb-1">Contact</p>
                <p className="text-[#111827] font-medium">{student.contact}</p>
              </div>
              <div>
                <p className="text-[#6b7280] text-xs uppercase mb-1">Last Active</p>
                <p className="text-[#111827] font-medium">{student.lastActive}</p>
                <p className="text-xs text-[#6b7280]">{student.date}</p>
              </div>
              <div>
                <p className="text-[#6b7280] text-xs uppercase mb-1">Status</p>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  student.status === 'completed' 
                    ? 'bg-[#ECFDF5] text-[#047857]' 
                    : 'bg-[#FFF7ED] text-[#C2410C]'
                }`}>
                  {student.status === 'completed' ? 'Completed' : `${student.count} Pending`}
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
            <tr className="border-b border-[#f3f4f6]">
              <th className="p-4 text-xs font-medium text-[#6b7280] uppercase">No</th>
              <th className="p-4 text-xs font-medium text-[#6b7280] uppercase">Full Name</th>
              <th className="p-4 text-xs font-medium text-[#6b7280] uppercase">UID</th>
              <th className="p-4 text-xs font-medium text-[#6b7280] uppercase">Class</th>
              <th className="p-4 text-xs font-medium text-[#6b7280] uppercase">Contact</th>
              <th className="p-4 text-xs font-medium text-[#6b7280] uppercase">Last Active</th>
              <th className="p-4 text-xs font-medium text-[#6b7280] uppercase">Submissions</th>
              <th className="p-4 text-xs font-medium text-[#6b7280] uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f9fafb]">
            {filteredStudents.map((student, index) => (
              <tr 
                key={student.id} 
                className="hover:bg-[#f9fafb] cursor-pointer"
                onClick={() => handleStudentClick(student.id)}
              >
                <td className="p-4 text-sm text-[#6b7280]">{index + 1}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium text-[#111827]">{student.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-[#6b7280]">{student.uid}</td>
                <td className="p-4 text-sm text-[#6b7280]">{student.class}</td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#111827]">{student.contact}</span>
                    <span className="text-xs text-[#6b7280]">{student.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#111827]">{student.lastActive}</span>
                    <span className="text-xs text-[#6b7280]">{student.date}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    student.status === 'completed' 
                      ? 'bg-[#ECFDF5] text-[#047857]' 
                      : 'bg-[#FFF7ED] text-[#C2410C]'
                  }`}>
                    {student.status === 'completed' ? 'Completed' : `${student.count} Pending`}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-[#9ca3af] hover:text-[#6b7280] p-1 rounded hover:bg-[#f3f4f6]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
