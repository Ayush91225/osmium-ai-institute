'use client';

interface StudentProfileHeaderProps {
  activeTab?: 'profile' | 'analytics' | 'files';
}

export default function StudentProfileHeaderDynamic({ activeTab = 'profile' }: StudentProfileHeaderProps) {
  return (
    <div className="rounded-xl p-4 md:p-6 border border-gray-100 mb-6 bg-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-2xl">A</div>
          <div className="flex flex-col gap-1">
            <div className="text-xl font-semibold text-gray-900">Aman Gupta</div>
            <div className="text-sm text-gray-600 font-medium">RSE - B.Tech - CSE (Semester -3)</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <button className="px-3 md:px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15V3M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5" /></svg>
            <span className="hidden sm:inline">Download Report</span>
          </button>
          <button className="px-3 md:px-4 py-2 text-sm border border-white-200 rounded-lg bg-white text-red-600">Remove</button>
        </div>
      </div>

      <div className="flex gap-4 md:gap-7 mt-7 overflow-x-auto">
        <a 
          href="/dashboard/teacher/students/profile" 
          className={`text-sm cursor-pointer flex items-center gap-2 pb-1 relative whitespace-nowrap ${
            activeTab === 'profile' ? 'text-gray-900 font-semibold' : 'text-gray-500'
          }`}
        >
          <svg className="w-4 h-4" fill={activeTab === 'profile' ? 'currentColor' : '#aaaaaa'} viewBox="0 0 256 256"><path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z" /></svg>
          Profile
          {activeTab === 'profile' && <div className="absolute bottom-0 left-0 w-9 h-0.5 bg-current rounded" />}
        </a>
        <a 
          href="/dashboard/teacher/students/analytics" 
          className={`text-sm cursor-pointer flex items-center gap-2 pb-1 relative whitespace-nowrap ${
            activeTab === 'analytics' ? 'text-gray-900 font-semibold' : 'text-gray-500'
          }`}
        >
          <svg className="w-4 h-4" fill={activeTab === 'analytics' ? 'currentColor' : '#aaaaaa'} viewBox="0 0 256 256"><path d="M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Z" /></svg>
          Analytics
          {activeTab === 'analytics' && <div className="absolute bottom-0 left-0 w-9 h-0.5 bg-current rounded" />}
        </a>
        <a 
          href="/dashboard/teacher/students/files" 
          className={`text-sm cursor-pointer flex items-center gap-2 pb-1 relative whitespace-nowrap ${
            activeTab === 'files' ? 'text-gray-900 font-semibold' : 'text-gray-500'
          }`}
        >
          <svg className="w-4 h-4" fill={activeTab === 'files' ? 'currentColor' : '#aaaaaa'} viewBox="0 0 256 256"><path d="M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Z" /></svg>
          Files
          {activeTab === 'files' && <div className="absolute bottom-0 left-0 w-9 h-0.5 bg-current rounded" />}
        </a>
      </div>
    </div>
  );
}
