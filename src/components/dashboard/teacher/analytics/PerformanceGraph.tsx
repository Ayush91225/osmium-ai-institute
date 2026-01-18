'use client';

import { useDarkMode } from '@/contexts/DarkModeContext';

export default function PerformanceGraph() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`rounded-xl border p-5 ${
      isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className={`text-lg font-semibold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Previous Exam Test Performances</h2>
          <p className={`text-sm ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>Highlights the highest scoring students</p>
        </div>
        <button type="button" className={`text-xl transition-colors ${
          isDarkMode ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'
        }`}>⋮</button>
      </div>

      <div className="relative mt-8">
        <div className="absolute left-[160px] right-0 top-0 bottom-[30px] pointer-events-none">
          {[0, 20, 40, 60, 80, 100].map((_, i) => (
            <div key={i} className={`absolute top-0 bottom-0 w-px ${
              isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'
            }`} style={{ left: `${i * 20}%` }}></div>
          ))}
        </div>

        {[
          { name: 'Rajat Bhatia', width: '95%', score: '95%', rank: '#1' },
          { name: 'Arjun Kale', width: '88%', score: '88%', rank: '#2' },
          { name: 'Chirag Iyer', width: '82%', score: '82%', rank: '#3' },
          { name: 'Anmol Mehra', width: '85%', score: '85%', rank: '#4' },
          { name: 'Swastik Khatua', width: '86%', score: '86%', rank: '#5' }
        ].map((student, i) => (
          <div key={i} className="flex items-center mb-4 relative">
            <div className={`w-[150px] text-sm font-medium pr-3 ${
              isDarkMode ? 'text-zinc-300' : 'text-gray-700'
            }`}>{student.name}</div>
            <div className={`flex-1 h-10 rounded-lg relative overflow-visible ${
              isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'
            }`}>
              <div 
                className={`h-full rounded-lg transition-all duration-300 cursor-pointer relative group shadow-sm ${
                  isDarkMode ? 'bg-blue-500/20 hover:bg-blue-500/30' : 'bg-[#ECECCA] hover:bg-[#E4B17D]'
                }`}
                style={{ width: student.width }}
              >
                <div className={`absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg ${
                  isDarkMode ? 'bg-zinc-800 text-white' : 'bg-gray-900 text-white'
                }`}>
                  <div className="font-medium">Score: {student.score}</div>
                  <div className={isDarkMode ? 'text-blue-400 mt-0.5' : 'text-amber-400 mt-0.5'}>Rank {student.rank}</div>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${
                    isDarkMode ? 'border-t-zinc-800' : 'border-t-gray-900'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={`flex justify-between text-xs font-medium mt-6 pl-[150px] pr-0 ${
          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
        }`}>
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
