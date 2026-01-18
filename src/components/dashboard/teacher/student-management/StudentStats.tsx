'use client';

export default function StudentStats() {
  const stats = [
    { label: 'Total Student', value: '49', change: '+2 This Month', changeType: 'positive' },
    { label: 'Active Student', value: '15', change: '+1 This Month', changeType: 'positive' },
    { label: 'Pending Submissions', value: '6', change: '-1 This Month', changeType: 'warning' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-semibold text-gray-900">{stat.value}</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              stat.changeType === 'positive' 
                ? 'bg-[#ECFDF5] text-[#047857]' 
                : 'bg-[#FFF7ED] text-[#C2410C]'
            }`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
