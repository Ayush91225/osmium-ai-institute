'use client';

export default function RecentActivity() {
  const activities = [
    { time: '4 hours ago', desc: 'Completed Chapter 3: <strong>Linked Lists practice quiz</strong> with <strong>82%</strong> accuracy.' },
    { time: '6 hours ago', desc: 'Attempted the <strong>OS Mock Test</strong> - 12 and improved by <strong>+6%</strong> from last attempt.', hasButton: true },
    { time: '2 days ago', desc: 'Submitted Project Proposal for <strong>"Smart Attendance System"</strong>.' },
    { time: '2 days ago', desc: 'Submitted Project Proposal for <strong>"Smart Attendance System"</strong>.' }
  ];

  return (
    <div className="bg-white rounded-[22px] border border-[#e7e7e7] p-7">
      <h2 className="text-lg font-semibold text-[#222] mb-6">Recent Activity</h2>

      <div className="flex flex-col gap-4 relative">
        <div className="absolute left-4 top-8 bottom-8 w-px bg-[#e5e7eb]" />

        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-3 relative z-10">
            <div className="w-8 h-8 bg-[#D9ECF0] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="#3b3732" viewBox="0 0 256 256"><path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z" /></svg>
            </div>
            <div className="flex-1">
              <div className="text-xs text-[#888] mb-1">{activity.time}</div>
              <div className="text-sm text-[#333] leading-relaxed" dangerouslySetInnerHTML={{ __html: activity.desc }} />
              {activity.hasButton && (
                <button className="bg-transparent border border-dashed border-[#666] px-2 py-1 rounded-[20px] text-[11px] text-[#666] mt-1.5">See Result</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
