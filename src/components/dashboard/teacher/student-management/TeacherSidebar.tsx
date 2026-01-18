'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDarkMode } from '@/contexts/DarkModeContext';
import TeacherSettingsModal from '../TeacherSettingsModal';

export default function TeacherSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('user_data');
      if (data) {
        try {
          setUserData(JSON.parse(data));
        } catch {
          // Handle invalid JSON
        }
      }
    }
  }, []);

  const getAvatarUrl = (userId: string) => {
    const seed = encodeURIComponent(userId);
    const backgroundColor = '4747eb,4762eb,477eeb,4799eb,47b4eb,47d0eb,47eb47,47eb62,47eb7e,47eb99,47ebb4,47ebd0,47ebeb,6247eb,62eb47,7e47eb,7eeb47,9947eb,99eb47,b447eb,b4eb47,d047eb,d0eb47,eb4747,eb4762,eb477e,eb4799,eb47d0,eb47eb,eb6247,eb7e47,eb9947,ebb447,ebd047,ebeb47,ffd5dc,ffdfbf,b6e3f4,c0aede,d1d4f9';
    const backgroundType = 'gradientLinear';
    const backgroundRotation = '0,360,10,20,30';
    
    return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=${backgroundColor}&backgroundType=${backgroundType}&backgroundRotation=${backgroundRotation}`;
  };

  if (!mounted) return null;

  return (
    <>
      <div className="w-[280px] flex flex-col justify-between overflow-y-auto h-screen fixed left-0 top-0 z-50 bg-[#faf8f6] border-r border-[#ebe8e2]" style={{ fontFamily: 'Inter, sans-serif', padding: '24px 0' }}>
        <div className="flex-1">
          <div className="flex items-center px-5 mb-8" style={{ padding: '0 20px' }}>
            <div className="flex items-center gap-2">
              <img src="https://osmium.co.in/images/logo.png" alt="Osmium" className="w-8 h-8 object-contain" />
              <span className="font-medium text-xl text-gray-900 tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>Osmium</span>
            </div>
          </div>

          <div className="uppercase tracking-wide mb-2 text-[#8b8b8b]" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.4px', padding: '0 20px', margin: '16px 0 8px 0' }}>General</div>
          
          <nav>
            <Link href="/dashboard/teacher" className="flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg no-underline text-[#5a5a5a] hover:bg-[#f0ede8]" style={{ padding: '12px 24px', margin: '0 12px', fontSize: '14px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                <rect width="256" height="256" fill="none" />
                <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z" />
              </svg>
              Dashboard
            </Link>
            
            <Link href="/dashboard/teacher/students" className="flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg no-underline bg-[#e8e3da] text-[#2e2e2e] font-medium" style={{ padding: '12px 24px', margin: '0 12px', fontSize: '14px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                <rect width="256" height="256" fill="none" />
                <path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z" />
              </svg>
              Student Management
            </Link>
            
            <Link href="/dashboard/teacher/projects" className="flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg no-underline text-[#5a5a5a] hover:bg-[#f0ede8]" style={{ padding: '12px 24px', margin: '0 12px', fontSize: '14px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                <rect width="256" height="256" fill="none" />
                <path d="M240,56V200a8,8,0,0,1-8,8H160a24,24,0,0,0-24,23.94,7.9,7.9,0,0,1-5.12,7.55A8,8,0,0,1,120,232a24,24,0,0,0-24-24H24a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H88a32,32,0,0,1,32,32v87.73a8.17,8.17,0,0,0,7.47,8.25,8,8,0,0,0,8.53-8V80a32,32,0,0,1,32-32h64A8,8,0,0,1,240,56Z" />
              </svg>
              Project Management
            </Link>
            
            <Link href="/dashboard/teacher/exams" className="flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg no-underline text-[#5a5a5a] hover:bg-[#f0ede8]" style={{ padding: '12px 24px', margin: '0 12px', fontSize: '14px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                <rect width="256" height="256" fill="none" />
                <path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z" />
              </svg>
              Exam & Tests
            </Link>
            
            <Link href="/dashboard/teacher/ai-mentor" className="flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg no-underline text-[#5a5a5a] hover:bg-[#f0ede8]" style={{ padding: '12px 24px', margin: '0 12px', fontSize: '14px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                <rect width="256" height="256" fill="none" />
                <path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86Zm-16.25,1.47L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z" />
              </svg>
              AI Mentor
            </Link>
            
            <Link href="/dashboard/teacher/analytics" className="flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg no-underline text-[#5a5a5a] hover:bg-[#f0ede8]" style={{ padding: '12px 24px', margin: '0 12px', fontSize: '14px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                <rect width="256" height="256" fill="none" />
                <path d="M226.53,56.41l-96-32a8,8,0,0,0-5.06,0l-96,32A8,8,0,0,0,24,64v80a8,8,0,0,0,16,0V75.1L73.59,86.29a64,64,0,0,0,20.65,88.05c-18,7.06-33.56,19.83-44.94,37.29a8,8,0,1,0,13.4,8.74C77.77,197.25,101.57,184,128,184s50.23,13.25,65.3,36.37a8,8,0,0,0,13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64,64,0,0,0,20.65-88l44.12-14.7a8,8,0,0,0,0-15.18ZM176,120A48,48,0,1,1,89.35,91.55l36.12,12a8,8,0,0,0,5.06,0l36.12-12A47.89,47.89,0,0,1,176,120Z" />
              </svg>
              Analytics
            </Link>
          </nav>

          <div className="uppercase tracking-wide mb-2 mt-4 text-[#8b8b8b]" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.4px', padding: '0 20px', margin: '16px 0 8px 0' }}>Support</div>
          
          <nav>
            <div className="flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg text-[#5a5a5a] hover:bg-[#f0ede8]" style={{ padding: '12px 24px', margin: '0 12px', fontSize: '14px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                <rect width="256" height="256" fill="none" />
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z" />
              </svg>
              Notification
            </div>
            
            <Link href="/dashboard/teacher/help" className="flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg no-underline text-[#5a5a5a] hover:bg-[#f0ede8]" style={{ padding: '12px 24px', margin: '0 12px', fontSize: '14px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                <rect width="256" height="256" fill="none" />
                <path d="M232,128v80a40,40,0,0,1-40,40H136a8,8,0,0,1,0-16h56a24,24,0,0,0,24-24H192a24,24,0,0,1-24-24V144a24,24,0,0,1,24-24h23.65A88,88,0,0,0,66,65.54A87.29,87.29,0,0,0,40.36,120H64a24,24,0,0,1,24,24v40a24,24,0,0,1-24,24H48a24,24,0,0,1-24-24V128A104.11,104.11,0,0,1,201.89,54.66A103.41,103.41,0,0,1,232,128Z" />
              </svg>
              Help & Support
            </Link>
          </nav>
        </div>

        <div className="flex-shrink-0 border-t border-[#ebe8e2] pt-4 px-2" style={{ padding: '16px 8px 0 8px' }}>
          <div className="flex items-center gap-2.5 py-3 px-4 mt-4 rounded-lg bg-white cursor-pointer" onClick={() => setIsSettingsOpen(true)}>
            <img 
              src={getAvatarUrl(userData?.id || userData?.name || 'teacher')} 
              alt="" 
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="text-[13px] font-medium text-[#2e2e2e]">{userData?.name || 'Teacher'}</div>
              <div className="text-[11px] text-[#8b8b8b] mt-0.5">Teacher</div>
            </div>
            <div className="w-5 h-5 flex items-center justify-center cursor-pointer text-sm flex-shrink-0" title="Settings">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#abaaaa" viewBox="0 0 256 256">
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.62a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15,33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.08,8.08,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8.08,8.08,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <TeacherSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}