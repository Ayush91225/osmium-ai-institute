'use client';

export default function ProjectSubmissions() {
  const projects = [
    { title: 'Scientific Calculator', status: 'Pending', statusColor: 'bg-[#efe8d6] text-[#7b6d45]', due: '21 Aug, 2025', class: 'Class 12th A' },
    { title: 'History of Ancient India Report', status: 'Pending', statusColor: 'bg-[#efe8d6] text-[#7b6d45]', due: '21 Aug, 2025', class: 'Class 12th A' },
    { title: 'Ancient Pyramid Brochure', status: 'Upcoming', statusColor: 'bg-[#e6f4e6] text-[#3b8c3b]', due: '21 Aug, 2025', class: 'Class 12th A' }
  ];

  return (
    <div className="bg-white border border-[#e7e7e7] rounded-[22px] p-7 md:p-8">
      <div className="text-[20px] font-semibold text-[#222]">Project Submissions</div>
      <div className="text-sm text-[#999] mt-1 mb-7">Check the submission history</div>

      {projects.map((project, i) => (
        <div key={i} className={`flex flex-col md:flex-row justify-between items-start gap-3 py-4 ${i > 0 ? 'border-t border-[#eee]' : ''}`}>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5 text-base font-semibold text-[#222] flex-wrap">
              {project.title}
              <span className={`text-xs px-2.5 py-1 rounded-[10px] font-medium ${project.statusColor}`}>{project.status}</span>
            </div>
            <div className="text-sm text-[#777] flex gap-3.5 flex-wrap">
              <span>Due: {project.due}</span>
              <span>•</span>
              <span>{project.class}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#f4f1ed] border border-[#ddd] rounded-[10px] text-sm text-[#444]">View File</button>
            <button className="px-4 py-2 bg-[#fbfbfb] border border-[#C4C69E] rounded-[10px] text-sm text-[#816316] flex items-center gap-1.5 font-medium">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" /></svg>
              Approve
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-end items-center gap-4 mt-5 text-sm text-[#777]">
        <span className="cursor-pointer">&lt;</span>
        <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] border border-[#e1e1e1] flex items-center justify-center font-semibold text-[#333]">1</div>
        <span>of</span>
        <span>3</span>
        <span className="cursor-pointer">&gt;</span>
      </div>
    </div>
  );
}
