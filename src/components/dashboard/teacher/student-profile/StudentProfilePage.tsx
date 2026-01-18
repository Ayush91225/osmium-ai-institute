'use client';

import TeacherSidebar from '../student-management/TeacherSidebar';
import StudentProfileHeaderDynamic from './StudentProfileHeaderDynamic';
import StudentInfoCard from './StudentInfoCard';
import ProjectSubmissions from './ProjectSubmissions';
import RecentActivity from './RecentActivity';

export default function StudentProfilePage() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: 'Inter, sans-serif', background: '#faf8f6' }}>
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto h-full ml-0 md:ml-[280px] transition-all duration-300">
        <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <span>All Student</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 18 6-6-6-6" /></svg>
            <span>B.Tech-Sem 4</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 18 6-6-6-6" /></svg>
            <span>Varun Kumar</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 18 6-6-6-6" /></svg>
            <span className="text-gray-900 font-medium">Profile</span>
          </div>

          <StudentProfileHeaderDynamic activeTab="profile" />
          <StudentInfoCard />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
            <div className="lg:col-span-3">
              <ProjectSubmissions />
            </div>
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
