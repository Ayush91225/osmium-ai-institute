'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDarkMode } from '@/contexts/DarkModeContext';

const students = [
  { id: 1, name: 'Priya Patel', uid: '11B015', grade: 'Grade 11B', performance: 4.6, subjects: ['Mathematics', 'Physics', 'Chemistry'], extraCount: 1, status: 'active', avatar: 'https://i.pravatar.cc/150?u=priya' },
  { id: 2, name: 'Rahul Kumar', uid: '12A008', grade: 'Grade 12A', performance: 4.8, subjects: ['Mathematics', 'Physics', 'Data Structures'], extraCount: 1, status: 'active', avatar: 'https://i.pravatar.cc/150?u=rahul' },
  { id: 3, name: 'Sneha Singh', uid: '9B022', grade: 'Grade 9B', performance: 4.1, subjects: ['Mathematics', 'Physics', 'Chemistry'], extraCount: 1, status: 'active', avatar: 'https://i.pravatar.cc/150?u=sneha' },
  { id: 4, name: 'Vikram Reddy', uid: '11A012', grade: 'Grade 11A', performance: 4.3, subjects: ['Mathematics', 'English'], extraCount: 0, status: 'active', avatar: 'https://i.pravatar.cc/150?u=vikram' },
  { id: 5, name: 'Ananya Gupta', uid: '10C018', grade: 'Grade 10C', performance: 4.4, subjects: ['Mathematics', 'English'], extraCount: 0, status: 'inactive', avatar: 'https://i.pravatar.cc/150?u=ananya' },
  { id: 6, name: 'Arjun Mehta', uid: '12B021', grade: 'Grade 12B', performance: 4.7, subjects: ['Physics', 'Chemistry', 'Biology'], extraCount: 2, status: 'active', avatar: 'https://i.pravatar.cc/150?u=arjun' }
];

export default function StudentsTable() {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const router = useRouter();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All Grades' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className={`rounded-xl border ${
      isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'
    }`}>
      <div className={`p-5 border-b ${
        isDarkMode ? 'border-zinc-800' : 'border-gray-200'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Students Onboard</h2>
              <span className={`text-lg ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>({students.length})</span>
            </div>
            <p className={`text-sm ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>Manage and track student performance</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input 
              type="text" 
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none transition-colors ${
                isDarkMode 
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
          <div className="flex gap-3">
            <select 
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className={`px-4 py-2 border rounded-lg text-sm outline-none cursor-pointer ${
                isDarkMode 
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-200' 
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
            >
              <option>All Grades</option>
              <option>Grade 9B</option>
              <option>Grade 10C</option>
              <option>Grade 11A</option>
              <option>Grade 11B</option>
              <option>Grade 12A</option>
              <option>Grade 12B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div 
            key={student.id}
            onClick={() => router.push('/dashboard/teacher/students/profile')}
            className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
              isDarkMode 
                ? 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800' 
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{student.name}</h3>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>{student.uid}</p>
                </div>
              </div>
              {student.status === 'active' && (
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              )}
            </div>

            {/* Grade & Performance */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-zinc-700">
              <div>
                <p className={`text-xs ${
                  isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                }`}>{student.grade}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs ${
                  isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                }`}>Performance</span>
                <span className={`text-sm font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{student.performance}</span>
              </div>
            </div>

            {/* Subjects */}
            <div className="flex flex-wrap gap-1.5">
              {student.subjects.map((subject, idx) => (
                <span 
                  key={idx}
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    isDarkMode 
                      ? 'bg-zinc-700 text-zinc-300' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {subject}
                </span>
              ))}
              {student.extraCount > 0 && (
                <span 
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    isDarkMode 
                      ? 'bg-zinc-700 text-zinc-300' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  +{student.extraCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
