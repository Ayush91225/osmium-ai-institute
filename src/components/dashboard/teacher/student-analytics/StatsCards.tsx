'use client';

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-6 h-6" fill="#000" viewBox="0 0 256 256"><path d="M240,128a8,8,0,0,1-8,8H204.94l-37.78,75.58A8,8,0,0,1,160,216h-.4a8,8,0,0,1-7.08-5.14L95.35,60.76,63.28,131.31A8,8,0,0,1,56,136H24a8,8,0,0,1,0-16H50.85L88.72,36.69a8,8,0,0,1,14.76.46l57.51,151,31.85-63.71A8,8,0,0,1,200,120h32A8,8,0,0,1,240,128Z" /></svg>
          </div>
          <div className="text-sm font-medium text-gray-700">Average Session</div>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl text-gray-900 font-semibold">1h 10m</div>
          <div className="text-xs text-green-600 font-medium">+ 36min today</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <svg className="w-6 h-6" fill="#000" viewBox="0 0 256 256"><path d="M240,128a8,8,0,0,1-8,8H204.94l-37.78,75.58A8,8,0,0,1,160,216h-.4a8,8,0,0,1-7.08-5.14L95.35,60.76,63.28,131.31A8,8,0,0,1,56,136H24a8,8,0,0,1,0-16H50.85L88.72,36.69a8,8,0,0,1,14.76.46l57.51,151,31.85-63.71A8,8,0,0,1,200,120h32A8,8,0,0,1,240,128Z" /></svg>
          </div>
          <div className="text-sm font-medium text-gray-700">Last Test Score</div>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl text-gray-900 font-semibold">120</div>
          <div className="text-base text-gray-500 -ml-1">/300</div>
          <div className="text-xs text-purple-600 font-medium">JEE Mains</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg className="w-6 h-6" fill="#000" viewBox="0 0 256 256"><path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z" /></svg>
          </div>
          <div className="text-sm font-medium text-gray-700">Assignment Pending</div>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl text-gray-900 font-semibold">9</div>
          <div className="text-xs text-green-600 font-medium">+ 126 this month</div>
        </div>
      </div>
    </div>
  );
}
