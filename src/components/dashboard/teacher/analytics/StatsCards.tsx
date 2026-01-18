export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-5 rounded-xl border border-[#E5E5E5]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-[#74797e]">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
              <path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"/>
            </svg>
            <span className="text-sm font-medium">Total Student</span>
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-semibold text-[#111827]">60</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#047857]">36 Active</span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-[#E5E5E5]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-[#74797e]">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
              <path d="M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm64-118.3-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L224,103.06a8,8,0,0,0,0-14.12Z"/>
            </svg>
            <span className="text-sm font-medium">Scheduled Tests</span>
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-semibold text-[#111827]">5</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#047857]">+2 Week</span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-[#E5E5E5]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-[#74797e]">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"/>
            </svg>
            <span className="text-sm font-medium">Pending review</span>
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-semibold text-[#111827]">6</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEE2E2] text-[#B91C1C]">View</span>
        </div>
      </div>
    </div>
  );
}
