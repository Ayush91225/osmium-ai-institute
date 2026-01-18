'use client';

import { useState } from 'react';
import StudentStats from './StudentStats';
import StudentTable from './StudentTable';
import AddStudentModal from './AddStudentModal';
import TeacherSidebar from './TeacherSidebar';

export default function StudentManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <TeacherSidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden ml-0 md:ml-[280px]">
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8" style={{ backgroundColor: '#F7F5F3' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Student Management</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm w-full sm:w-auto bg-[#1A1A1A] text-white hover:bg-black"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <span className="sm:inline">Add Student</span>
            </button>
          </div>

          <StudentStats />
          <StudentTable />
          <AddStudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </main>
    </div>
  );
}
