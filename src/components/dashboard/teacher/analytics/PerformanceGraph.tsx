export default function PerformanceGraph() {
  return (
    <div className="bg-white border border-[#e8e5e0] rounded-xl p-5">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-1">Previous Exam Test Performances</h2>
          <p className="text-sm text-[#999]">Highlights the highest scoring students</p>
        </div>
        <button className="text-xl text-[#999] cursor-pointer hover:text-[#666] transition-colors">⋮</button>
      </div>

      <div className="relative mt-8">
        <div className="absolute left-[160px] right-0 top-0 bottom-[30px] pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e5e5e5]"></div>
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-[#e5e5e5]"></div>
          <div className="absolute left-[40%] top-0 bottom-0 w-px bg-[#e5e5e5]"></div>
          <div className="absolute left-[60%] top-0 bottom-0 w-px bg-[#e5e5e5]"></div>
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-[#e5e5e5]"></div>
          <div className="absolute right-0 top-0 bottom-0 w-px bg-[#e5e5e5]"></div>
        </div>

        {[
          { name: 'Rajat Bhatia', width: '95%', score: '95%', rank: '#1' },
          { name: 'Arjun Kale', width: '88%', score: '88%', rank: '#2' },
          { name: 'Chirag Iyer', width: '82%', score: '82%', rank: '#3' },
          { name: 'Anmol Mehra', width: '85%', score: '85%', rank: '#4' },
          { name: 'Swastik Khatua', width: '86%', score: '86%', rank: '#5' }
        ].map((student, i) => (
          <div key={i} className="flex items-center mb-4 relative">
            <div className="w-[150px] text-sm text-[#333] font-medium pr-3">{student.name}</div>
            <div className="flex-1 h-10 bg-[#f5f5f5] rounded-lg relative overflow-visible">
              <div 
                className="h-full rounded-lg bg-[#ECECCA] hover:bg-[#E4B17D] transition-all duration-300 cursor-pointer relative group shadow-sm"
                style={{ width: student.width }}
              >
                <div className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg">
                  <div className="font-medium">Score: {student.score}</div>
                  <div className="text-[#c79647] mt-0.5">Rank {student.rank}</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a1a]"></div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between text-xs text-[#888] font-medium mt-6 pl-[150px] pr-0">
          <span>0%</span>
          <span>20%</span>
          <span>40%</span>
          <span>60%</span>
          <span>80%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
