'use client';

import { useState } from 'react';

export function ExamPerformance() {
  const exams = [
    { name: 'JEE Mains', date: '2 Sep 2025', score: '120/300', color: '#6c5430' },
    { name: 'JEE Mains', date: '28 Aug 2025', score: '102/300', color: '#a7a06d' },
    { name: 'JEE Mains', date: '18 Aug 2025', score: '85/300', color: '#e8a56c' },
    { name: 'JEE Mains', date: '15 Aug 2025', score: '59/300', color: '#d7e3a7' }
  ];

  return (
    <div className="bg-white p-5 rounded-[22px] border border-[#e7e7e7]">
      <div className="text-[20px] font-semibold mb-1 text-[#222]">Previous Exam Test Performances</div>
      <div className="text-sm text-[#888] mb-5">See previous done exam tests</div>
      
      <div className="h-2.5 w-full flex rounded-md overflow-hidden mb-6 bg-white">
        <div className="h-full bg-[#6c5430] flex-[1.4] mr-0.5" />
        <div className="h-full bg-[#c5ba90] flex-[1.2] mr-0.5" />
        <div className="h-full bg-[#e0a876] flex-[1.0] mr-0.5" />
        <div className="h-full bg-[#ced6a8] flex-[1.3]" />
      </div>

      {exams.map((exam, i) => (
        <div key={i} className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3 text-[15px] text-[#333]">
            <div className="w-3 h-3 rounded" style={{ background: exam.color }} />
            <span><b>{exam.name}</b> - {exam.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 bg-[#eae7e2] rounded-lg text-[13px] text-[#3f3f3f] font-medium">View Result</button>
            <div className="text-[15px] text-[#555] min-w-[60px] text-right">{exam.score}</div>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-2 text-sm text-[#999]">
        <span>4 out 15 Tests</span>
        <span className="text-[#c17c39] cursor-pointer font-medium">View All Results</span>
      </div>
    </div>
  );
}

export function SubjectPerformance() {
  const subjects = [
    { name: 'Mathematics-I', accuracy: 46.5 },
    { name: 'Programming in C', accuracy: 86.9 },
    { name: 'Communication Skills', accuracy: 68.5 },
    { name: 'Git & GitHub', accuracy: 56.2 },
    { name: 'Engineering Graphics', accuracy: 88.5 },
    { name: 'Basic Electrical Engineering', accuracy: 78.3 }
  ];

  return (
    <div className="bg-white rounded-[22px] border border-[#e6e6e6] p-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-[#222]">Subject Wise Performance</div>
        <button className="bg-[#f3efe9] px-3 py-1.5 rounded-lg text-[13px] flex items-center gap-1 text-[#3c3c3c]">
          Sort <span>▼</span>
        </button>
      </div>
      <div className="mt-1 text-[13px] text-[#999] mb-4">See previous done exam tests</div>

      <table className="w-full border-collapse mt-2">
        <thead>
          <tr>
            <th className="text-left text-[13px] text-[#777] font-medium pb-2.5">Topics</th>
            <th className="text-right text-[13px] text-[#777] font-medium pb-2.5">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, i) => (
            <tr key={i}>
              <td className="py-2.5 text-sm text-[#333]">{subject.name}</td>
              <td className="py-2.5 text-sm text-[#333]">
                <div className="flex justify-end items-center gap-3">
                  <div className="w-[140px] h-1.5 bg-[#f2e2c5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#d49c42] rounded-full" style={{ width: `${subject.accuracy}%` }} />
                  </div>
                  {subject.accuracy}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 text-xs text-[#999] flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><circle cx="12" cy="16" r="1" fill="currentColor" /></svg>
        This Data based on previous test
      </div>
    </div>
  );
}

export function CareerPath() {
  return (
    <div className="bg-white rounded-[22px] border border-[#e6e6e6] p-7">
      <div className="text-[20px] font-semibold text-[#1d1d1d] mb-1">Recommended Career Path</div>
      <div className="text-sm text-[#9b9b9b] mb-5">AI Career Recommendations Based on Student Strengths</div>

      <div className="bg-[#fcfcfc] border border-[#ececec] rounded-2xl p-4 mb-3.5">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-[#eaf4fb] text-[#3c90d1] flex items-center justify-center text-lg">🌐</div>
          <div className="text-[15px] font-semibold text-[#1d1d1d]">Software Developer</div>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#f7a477] mt-1.5 flex-shrink-0" />
          <div className="text-[13px] text-[#5b5b5b] leading-relaxed">Strong performance in <strong>React Native</strong> indicating natural aptitude.</div>
        </div>
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#6cbcf1] mt-1.5 flex-shrink-0" />
          <div className="text-[13px] text-[#5b5b5b] leading-relaxed">Frequently <strong>engages with</strong> topics, tests, or activities linked to this career.</div>
        </div>
      </div>

      <div className="bg-[#fcfcfc] border border-[#ececec] rounded-2xl p-4 mb-3.5">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-[#ebf7ec] text-[#47a44b] flex items-center justify-center text-lg">📄</div>
          <div className="text-[15px] font-semibold text-[#1d1d1d]">Full-Stack Developer</div>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#f7a477] mt-1.5 flex-shrink-0" />
          <div className="text-[13px] text-[#5b5b5b] leading-relaxed">Strong performance in <strong>React Native</strong> indicating natural aptitude.</div>
        </div>
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#6cbcf1] mt-1.5 flex-shrink-0" />
          <div className="text-[13px] text-[#5b5b5b] leading-relaxed">Frequently <strong>engages with</strong> topics, tests, or activities linked to this career.</div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3.5 mt-5 text-sm text-[#777]">
        <div className="w-7 h-7 rounded-lg bg-[#fafafa] border border-[#e5e5e5] flex items-center justify-center cursor-pointer">‹</div>
        <div className="w-7 h-7 rounded-lg bg-white border border-[#dcdcdc] flex items-center justify-center font-semibold text-[#333] text-[13px]">1</div>
        <span>of</span>
        <span>3</span>
        <div className="w-7 h-7 rounded-lg bg-[#fafafa] border border-[#e5e5e5] flex items-center justify-center cursor-pointer">›</div>
      </div>
    </div>
  );
}

export function LearningStrengths() {
  const [activeTab, setActiveTab] = useState('weak');
  
  const weakTopics = [
    { name: 'Graphs', accuracy: '25.5%', trend: '+5.3%', isPositive: false },
    { name: 'Dynamic Programming', accuracy: '32.23%', trend: '-12.1%', isPositive: true },
    { name: 'Paging', accuracy: '38.9%', trend: '+5.3%', isPositive: false },
    { name: 'Bit Manipulation', accuracy: '45.3%', trend: '+5.3%', isPositive: false },
    { name: 'Normalization', accuracy: '48.4%', trend: '-12.1%', isPositive: true },
    { name: 'Dynamic Programming', accuracy: '32.23%', trend: '+5.3%', isPositive: false }
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-[22px] border border-[#e8e6e2]">
      <div className="text-[22px] md:text-[20px] font-semibold text-[#1a1a1a]">Learning Strengths & Weaknesses</div>
      <div className="text-sm text-[#999] mt-1">Highlights strong topics and weak spots.</div>
      <div className="float-right -mt-10 md:-mt-8 bg-[#f4f2ee] border border-[#ddd] px-3.5 py-2 rounded-xl text-sm cursor-pointer text-[#333]">DSA ▼</div>

      <div className="flex mt-10 border-b border-[#eee] pb-2.5 gap-10 overflow-x-auto">
        <div className={`text-[15px] pb-1.5 cursor-pointer whitespace-nowrap ${activeTab === 'weak' ? 'font-semibold text-[#1a1a1a]' : 'text-[#666]'}`} onClick={() => setActiveTab('weak')}>Weak topics</div>
        <div className={`text-[15px] pb-1.5 cursor-pointer whitespace-nowrap ${activeTab === 'strong' ? 'font-semibold text-[#1a1a1a]' : 'text-[#666]'}`} onClick={() => setActiveTab('strong')}>Strong topics</div>
        <div className={`text-[15px] pb-1.5 cursor-pointer whitespace-nowrap ${activeTab === 'suggestions' ? 'font-semibold text-[#1a1a1a]' : 'text-[#666]'}`} onClick={() => setActiveTab('suggestions')}>Suggestions</div>
      </div>

      <div className="mt-6">
        {weakTopics.map((topic, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr_auto_auto] md:grid-cols-[auto_1fr_auto_auto] items-center py-3.5 gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#DC3636] border-2 border-[#FAE2E2] mr-1.5" />
            <div className="text-[15px] md:text-sm text-[#222]">{topic.name}</div>
            <div className="text-[15px] md:text-sm text-right text-[#333] w-[70px] md:w-auto">{topic.accuracy}</div>
            <div className={`text-sm ml-2 ${topic.isPositive ? 'text-[#2ecc71]' : 'text-[#DC3636]'}`}>{topic.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
