'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StatusChip from '@/components/dashboard/admin/StatusChip'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

// Mock test data for class analytics
const classTestData = {
     'EXM003': {
          id: 'EXM003',
          name: 'Final Examination',
          subject: 'Chemistry',
          class: 'Grade 10A',
          classId: 'CLS001',
          date: '2024-01-20',
          duration: '2.5 hours',
          totalMarks: 100,
          passingMarks: 40,
          teacher: 'Dr. Sarah Johnson',
          stats: {
               classAverage: 87,
               median: 85,
               highest: 98,
               lowest: 45,
               passRate: 92,
               totalEnrolled: 40,
               totalAttempted: 38,
               participationRate: 95,
               previousAverage: 82,
               improvement: 5
          },
          gradeDistribution: [
               { grade: 'A+', count: 8, percentage: 21 },
               { grade: 'A', count: 12, percentage: 32 },
               { grade: 'B+', count: 7, percentage: 18 },
               { grade: 'B', count: 5, percentage: 13 },
               { grade: 'C', count: 4, percentage: 11 },
               { grade: 'D', count: 1, percentage: 3 },
               { grade: 'F', count: 1, percentage: 3 }
          ],
          performanceBands: [
               { band: 'Excellent', range: '85-100%', count: 15, percentage: 39 },
               { band: 'Good', range: '70-84%', count: 12, percentage: 32 },
               { band: 'Average', range: '55-69%', count: 6, percentage: 16 },
               { band: 'Needs Support', range: '40-54%', count: 4, percentage: 11 },
               { band: 'Critical', range: 'Below 40%', count: 1, percentage: 3 }
          ],
          students: [
               { id: '10A001', name: 'Arjun Sharma', score: 98, grade: 'A+', percentile: 100, time: '2h 15m', attempted: 50, total: 50, accuracy: 98, trend: 5, status: 'completed' },
               { id: '10A002', name: 'Priya Patel', score: 95, grade: 'A+', percentile: 97, time: '2h 20m', attempted: 50, total: 50, accuracy: 95, trend: 3, status: 'completed' },
               { id: '10A003', name: 'Rahul Kumar', score: 92, grade: 'A+', percentile: 95, time: '2h 10m', attempted: 50, total: 50, accuracy: 92, trend: 8, status: 'completed' },
               { id: '10A004', name: 'Sneha Singh', score: 90, grade: 'A', percentile: 92, time: '2h 25m', attempted: 50, total: 50, accuracy: 90, trend: -2, status: 'completed' },
               { id: '10A005', name: 'Vikram Reddy', score: 88, grade: 'A', percentile: 89, time: '2h 18m', attempted: 48, total: 50, accuracy: 92, trend: 4, status: 'completed' },
               { id: '10A006', name: 'Ananya Gupta', score: 87, grade: 'A', percentile: 87, time: '2h 30m', attempted: 50, total: 50, accuracy: 87, trend: 1, status: 'completed' },
               { id: '10A007', name: 'Karthik Iyer', score: 85, grade: 'A', percentile: 84, time: '2h 22m', attempted: 49, total: 50, accuracy: 87, trend: 6, status: 'completed' },
               { id: '10A008', name: 'Neha Verma', score: 82, grade: 'B+', percentile: 79, time: '2h 28m', attempted: 50, total: 50, accuracy: 82, trend: -1, status: 'completed' },
               { id: '10A009', name: 'Aditya Rao', score: 78, grade: 'B+', percentile: 74, time: '2h 35m', attempted: 47, total: 50, accuracy: 83, trend: 3, status: 'completed' },
               { id: '10A010', name: 'Meera Nair', score: 75, grade: 'B', percentile: 68, time: '2h 40m', attempted: 50, total: 50, accuracy: 75, trend: -3, status: 'completed' },
               { id: '10A011', name: 'Rohan Das', score: 72, grade: 'B', percentile: 63, time: '2h 45m', attempted: 48, total: 50, accuracy: 75, trend: 2, status: 'completed' },
               { id: '10A012', name: 'Kavya Menon', score: 68, grade: 'C', percentile: 55, time: '2h 38m', attempted: 50, total: 50, accuracy: 68, trend: -5, status: 'completed' },
               { id: '10A013', name: 'Siddharth Joshi', score: 45, grade: 'D', percentile: 8, time: '2h 30m', attempted: 40, total: 50, accuracy: 56, trend: -8, status: 'completed' },
               { id: '10A014', name: 'Divya Krishnan', score: 35, grade: 'F', percentile: 3, time: '1h 45m', attempted: 35, total: 50, accuracy: 50, trend: -12, status: 'completed' }
          ],
          topics: [
               { topic: 'Atomic Structure', score: 92, questionsCount: 5 },
               { topic: 'Chemical Bonding', score: 78, questionsCount: 6 },
               { topic: 'Periodic Table', score: 88, questionsCount: 4 },
               { topic: 'Organic Chemistry', score: 55, questionsCount: 8 },
               { topic: 'Thermodynamics', score: 62, questionsCount: 7 },
               { topic: 'Electrochemistry', score: 75, questionsCount: 5 }
          ],
          insights: [
               { type: 'warning', title: 'Organic Chemistry needs attention', description: '45% success rate - 12 students struggled with this topic', action: 'Schedule review session' },
               { type: 'success', title: 'Atomic Structure well understood', description: '95% success rate - students have strong foundation', action: 'Proceed to advanced topics' },
               { type: 'info', title: '2 students need intervention', description: 'Siddharth Joshi and Divya Krishnan scored below 50%', action: 'Arrange one-on-one sessions' }
          ]
     }
}

const defaultTestData = {
     id: 'default',
     name: 'Test Analytics',
     subject: 'General',
     class: 'Class',
     classId: 'CLS001',
     date: '2024-01-20',
     duration: '2 hours',
     totalMarks: 100,
     passingMarks: 40,
     teacher: 'Teacher',
     stats: {
          classAverage: 75,
          median: 74,
          highest: 95,
          lowest: 35,
          passRate: 85,
          totalEnrolled: 40,
          totalAttempted: 38,
          participationRate: 95,
          previousAverage: 72,
          improvement: 3
     },
     gradeDistribution: [
          { grade: 'A+', count: 5, percentage: 13 },
          { grade: 'A', count: 10, percentage: 26 },
          { grade: 'B+', count: 8, percentage: 21 },
          { grade: 'B', count: 6, percentage: 16 },
          { grade: 'C', count: 5, percentage: 13 },
          { grade: 'D', count: 2, percentage: 5 },
          { grade: 'F', count: 2, percentage: 5 }
     ],
     performanceBands: [
          { band: 'Excellent', range: '85-100%', count: 10, percentage: 26 },
          { band: 'Good', range: '70-84%', count: 12, percentage: 32 },
          { band: 'Average', range: '55-69%', count: 8, percentage: 21 },
          { band: 'Needs Support', range: '40-54%', count: 5, percentage: 13 },
          { band: 'Critical', range: 'Below 40%', count: 3, percentage: 8 }
     ],
     students: [
          { id: 'STU001', name: 'Student 1', score: 95, grade: 'A+', percentile: 100, time: '2h 15m', attempted: 50, total: 50, accuracy: 95, trend: 5, status: 'completed' },
          { id: 'STU002', name: 'Student 2', score: 88, grade: 'A', percentile: 92, time: '2h 20m', attempted: 50, total: 50, accuracy: 88, trend: 3, status: 'completed' },
          { id: 'STU003', name: 'Student 3', score: 82, grade: 'B+', percentile: 85, time: '2h 25m', attempted: 48, total: 50, accuracy: 85, trend: -2, status: 'completed' },
          { id: 'STU004', name: 'Student 4', score: 75, grade: 'B', percentile: 70, time: '2h 30m', attempted: 50, total: 50, accuracy: 75, trend: 4, status: 'completed' },
          { id: 'STU005', name: 'Student 5', score: 68, grade: 'C', percentile: 55, time: '2h 35m', attempted: 45, total: 50, accuracy: 76, trend: -1, status: 'completed' }
     ],
     topics: [
          { topic: 'Topic 1', score: 85, questionsCount: 5 },
          { topic: 'Topic 2', score: 72, questionsCount: 6 },
          { topic: 'Topic 3', score: 68, questionsCount: 4 }
     ],
     insights: [
          { type: 'warning', title: 'Topic 3 needs review', description: '55% success rate - students struggled with this topic', action: 'Schedule review session' },
          { type: 'success', title: 'Topic 1 well understood', description: '90% success rate', action: 'Proceed to advanced topics' }
     ]
}

export default function ClassTestAnalyticsPage() {
     const params = useParams()
     const router = useRouter()
     const { isDarkMode } = useDarkMode()
     const [mounted, setMounted] = useState(false)
     const [searchQuery, setSearchQuery] = useState('')
     const [sortBy, setSortBy] = useState('rank')
     const [selectedBand, setSelectedBand] = useState<string | null>(null)

     const classSlug = params.slug as string
     const testId = params.testId as string
     const test = classTestData[testId as keyof typeof classTestData] || { ...defaultTestData, id: testId }

     useEffect(() => {
          setMounted(true)
     }, [])

     const filteredStudents = useMemo(() => {
          let students = [...test.students]

          if (searchQuery) {
               students = students.filter(s =>
                    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.id.toLowerCase().includes(searchQuery.toLowerCase())
               )
          }

          if (selectedBand) {
               students = students.filter(s => {
                    switch (selectedBand) {
                         case 'Excellent': return s.score >= 85
                         case 'Good': return s.score >= 70 && s.score < 85
                         case 'Average': return s.score >= 55 && s.score < 70
                         case 'Needs Support': return s.score >= 40 && s.score < 55
                         case 'Critical': return s.score < 40
                         default: return true
                    }
               })
          }

          students.sort((a, b) => {
               switch (sortBy) {
                    case 'rank': return b.score - a.score
                    case 'name': return a.name.localeCompare(b.name)
                    case 'score': return a.score - b.score
                    case 'accuracy': return a.accuracy - b.accuracy
                    default: return 0
               }
          })

          return students
     }, [test.students, searchQuery, selectedBand, sortBy])

     if (!mounted) return null

     return (
          <DashboardLayout>
               <div className="max-w-4xl mx-auto space-y-4 px-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-xs">
                         <button
                              onClick={() => router.push('/dashboard/admin/classes')}
                              className={`hover:underline transition-colors ${
                                   isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'
                              }`}
                         >
                              Classes
                         </button>
                         <i className={`ph ph-caret-right text-xs ${
                              isDarkMode ? 'text-zinc-600' : 'text-gray-400'
                         }`} />
                         <button
                              onClick={() => router.push(`/dashboard/admin/classes/${classSlug}`)}
                              className={`hover:underline transition-colors ${
                                   isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'
                              }`}
                         >
                              {test.class}
                         </button>
                         <i className={`ph ph-caret-right text-xs ${
                              isDarkMode ? 'text-zinc-600' : 'text-gray-400'
                         }`} />
                         <span className={`font-medium ${
                              isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                         }`}>{test.name}</span>
                    </nav>

                    {/* Header */}
                    <div className={`p-4 rounded-xl border ${
                         isDarkMode 
                              ? 'bg-zinc-900/80 border-zinc-800/50' 
                              : 'bg-white/90 border-gray-200/50'
                    }`}>
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                   <div className="flex items-center gap-2 mb-2">
                                        <StatusChip status="Class Analytics" variant="info" />
                                        <StatusChip status="Completed" variant="success" />
                                   </div>
                                   <h1 className={`text-lg font-bold mb-1 ${
                                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                                   }`}>{test.name}</h1>
                                   <div className="flex flex-wrap items-center gap-3 text-xs">
                                        <span className={`flex items-center gap-1 ${
                                             isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                        }`}>
                                             <i className="ph ph-book" /> {test.subject}
                                        </span>
                                        <span className={`flex items-center gap-1 ${
                                             isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                        }`}>
                                             <i className="ph ph-users" /> {test.class}
                                        </span>
                                        <span className={`flex items-center gap-1 ${
                                             isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                        }`}>
                                             <i className="ph ph-calendar" /> {new Date(test.date).toLocaleDateString()}
                                        </span>
                                        <span className={`flex items-center gap-1 ${
                                             isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                        }`}>
                                             <i className="ph ph-clock" /> {test.duration}
                                        </span>
                                   </div>
                              </div>
                              <div className="flex items-center gap-2">
                                   <button className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all transform active:scale-95 ${
                                        isDarkMode ? 'bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300 border border-zinc-700 hover:border-zinc-600' : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow'
                                   }`}>
                                        <i className="ph ph-file-pdf" /> Export PDF
                                   </button>
                                   <button className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all transform active:scale-95 ${
                                        isDarkMode ? 'bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300 border border-zinc-700 hover:border-zinc-600' : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow'
                                   }`}>
                                        <i className="ph ph-file-csv" /> Export CSV
                                   </button>
                              </div>
                         </div>
                    </div>

                    {/* Quick Stats - Using same pattern as student test analytics */}
                    <div className={`p-4 rounded-xl border ${
                         isDarkMode 
                              ? 'bg-zinc-900/80 border-zinc-800/50' 
                              : 'bg-white/90 border-gray-200/50'
                    }`}>
                         <h3 className={`text-base font-semibold mb-3 ${
                              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                         }`}>Performance Overview</h3>
                         <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                              {[
                                   { label: 'Class Average', value: `${test.stats.classAverage}%`, icon: 'ph-chart-line', trend: test.stats.improvement },
                                   { label: 'Median Score', value: `${test.stats.median}%`, icon: 'ph-chart-bar' },
                                   { label: 'Highest Score', value: `${test.stats.highest}%`, icon: 'ph-trophy' },
                                   { label: 'Pass Rate', value: `${test.stats.passRate}%`, icon: 'ph-check-circle' },
                                   { label: 'Participation', value: `${test.stats.totalAttempted}/${test.stats.totalEnrolled}`, icon: 'ph-users' }
                              ].map((stat, index) => (
                                   <div key={index} className={`p-3 rounded-lg text-center ${
                                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                                   }`}>
                                        <i className={`${stat.icon} text-lg mb-1 block ${
                                             isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                        }`} />
                                        <div className={`text-xs font-medium ${
                                             isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                        }`}>{stat.label}</div>
                                        <div className={`text-sm font-bold ${
                                             isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                                        }`}>{stat.value}</div>
                                        {stat.trend && (
                                             <div className={`text-xs mt-1 flex items-center justify-center gap-0.5 ${
                                                  stat.trend >= 0 ? 'text-emerald-400' : 'text-red-400'
                                             }`}>
                                                  <i className={`ph ph-trend-${stat.trend >= 0 ? 'up' : 'down'}`} />
                                                  {Math.abs(stat.trend)}%
                                             </div>
                                        )}
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* Performance Bands */}
                    <div className={`p-4 rounded-xl border ${
                         isDarkMode 
                              ? 'bg-zinc-900/60 border-zinc-800/40' 
                              : 'bg-white/80 border-gray-200/60'
                    }`}>
                         <h3 className={`text-base font-semibold mb-3 ${
                              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                         }`}>Performance Bands</h3>
                         <div className="flex flex-wrap gap-2">
                              {test.performanceBands.map((band, index) => (
                                   <button
                                        key={index}
                                        onClick={() => setSelectedBand(selectedBand === band.band ? null : band.band)}
                                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all transform active:scale-95 ${
                                             selectedBand === band.band
                                                  ? isDarkMode ? 'bg-zinc-700/50 text-zinc-200 border-zinc-600 shadow-sm' : 'bg-gray-100 text-gray-800 border-gray-300 shadow-sm'
                                                  : isDarkMode
                                                       ? 'bg-zinc-800/40 text-zinc-300 border-zinc-700 hover:bg-zinc-800/60 hover:border-zinc-600'
                                                       : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300 shadow-sm hover:shadow'
                                        }`}
                                   >
                                        {band.band} ({band.count}) - {band.percentage}%
                                   </button>
                              ))}
                              {selectedBand && (
                                   <button
                                        onClick={() => setSelectedBand(null)}
                                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all transform active:scale-95 ${
                                             isDarkMode ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                   >
                                        Clear filter
                                   </button>
                              )}
                         </div>
                    </div>

                    {/* Grade Distribution Chart */}
                    <div className={`p-4 rounded-xl border ${
                         isDarkMode 
                              ? 'bg-zinc-900/80 border-zinc-800/50' 
                              : 'bg-white/90 border-gray-200/50'
                    }`}>
                         <h3 className={`text-base font-semibold mb-3 ${
                              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                         }`}>Grade Distribution</h3>
                         <div className="h-48">
                              <Chart
                                   options={{
                                        chart: { type: 'bar', toolbar: { show: false }, background: 'transparent' },
                                        plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
                                        dataLabels: { enabled: false },
                                        xaxis: {
                                             categories: test.gradeDistribution.map(g => g.grade),
                                             labels: { style: { colors: isDarkMode ? '#a1a1aa' : '#6b7280', fontSize: '12px' } },
                                             axisBorder: { show: false },
                                             axisTicks: { show: false }
                                        },
                                        yaxis: { 
                                             labels: { style: { colors: isDarkMode ? '#a1a1aa' : '#6b7280', fontSize: '12px' } },
                                             show: false
                                        },
                                        colors: ['#8C7B65'],
                                        grid: { show: false },
                                        theme: { mode: isDarkMode ? 'dark' : 'light' }
                                   }}
                                   series={[{ name: 'Students', data: test.gradeDistribution.map(g => g.count) }]}
                                   type="bar"
                                   height={192}
                              />
                         </div>
                    </div>

                    {/* Student Performance Table */}
                    <div className={`p-4 rounded-xl border ${
                         isDarkMode 
                              ? 'bg-zinc-900/80 border-zinc-800/50' 
                              : 'bg-white/90 border-gray-200/50'
                    }`}>
                         <div className="flex items-center justify-between mb-4">
                              <h3 className={`text-base font-semibold ${
                                   isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                              }`}>Student Performance</h3>
                              <div className="flex items-center gap-2">
                                   <input
                                        type="text"
                                        placeholder="Search student..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`text-xs px-3 py-1.5 rounded-lg border w-40 transition-all focus:outline-none focus:ring-2 ${
                                             isDarkMode ? 'bg-zinc-800/60 border-zinc-700 text-zinc-200 focus:border-zinc-600 focus:ring-zinc-600/20' : 'bg-white border-gray-300 text-gray-700 focus:border-gray-400 focus:ring-gray-400/20'
                                        }`}
                                   />
                                   <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                                             isDarkMode ? 'bg-zinc-800/60 border-zinc-700 text-zinc-200 focus:border-zinc-600 focus:ring-zinc-600/20' : 'bg-white border-gray-300 text-gray-700 focus:border-gray-400 focus:ring-gray-400/20'
                                        }`}
                                   >
                                        <option value="rank">Rank</option>
                                        <option value="name">Name</option>
                                        <option value="score">Score</option>
                                        <option value="accuracy">Accuracy</option>
                                   </select>
                              </div>
                         </div>

                         <div className="overflow-x-auto">
                              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                                   <table className="w-full text-xs">
                                        <thead className={`sticky top-0 z-10 ${
                                             isDarkMode ? 'bg-zinc-900/80' : 'bg-white/90'
                                        }`}>
                                             <tr className={isDarkMode ? 'text-zinc-400' : 'text-gray-500'}>
                                                  <th className="text-left p-2">#</th>
                                                  <th className="text-left p-2">Student</th>
                                                  <th className="text-left p-2">Score</th>
                                                  <th className="text-left p-2">Grade</th>
                                                  <th className="text-left p-2">Accuracy</th>
                                                  <th className="text-left p-2">Time</th>
                                                  <th className="text-left p-2">Trend</th>
                                                  <th className="text-left p-2"></th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {filteredStudents.map((student, index) => (
                                                  <tr
                                                       key={student.id}
                                                       className={`border-t cursor-pointer transition-all transform hover:scale-[1.01] ${
                                                            isDarkMode ? 'border-zinc-800/50 hover:bg-zinc-800/30 hover:shadow-lg' : 'border-gray-100 hover:bg-gray-50/50 hover:shadow-md'
                                                       }`}
                                                       onClick={() => router.push(`/dashboard/admin/students/profile/${student.id}/tests/${testId}`)}
                                                  >
                                                       <td className={`p-2 font-medium ${
                                                            index < 3 ? 'text-gray-900 dark:text-zinc-200' : isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                                       }`}>
                                                            {index + 1}
                                                       </td>
                                                       <td className="p-2">
                                                            <div className="flex items-center gap-2">
                                                                 <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                                                                      isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-600'
                                                                 }`}>
                                                                      {student.name.split(' ').map(n => n[0]).join('')}
                                                                 </div>
                                                                 <div>
                                                                      <p className={`font-medium ${
                                                                           isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                                                                      }`}>{student.name}</p>
                                                                      <p className={`text-xs ${
                                                                           isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                                                                      }`}>{student.id}</p>
                                                                 </div>
                                                            </div>
                                                       </td>
                                                       <td className="p-2">
                                                            <div className="flex items-center gap-2">
                                                                 <div className={`w-16 h-1.5 rounded-full overflow-hidden ${
                                                                      isDarkMode ? 'bg-zinc-700/30' : 'bg-gray-200/50'
                                                                 }`}>
                                                                      <div
                                                                           className={`h-full rounded-full ${
                                                                                student.score >= 75 ? isDarkMode ? 'bg-zinc-400' : 'bg-gray-700' : 
                                                                                student.score >= 50 ? isDarkMode ? 'bg-zinc-500' : 'bg-gray-500' : 
                                                                                isDarkMode ? 'bg-zinc-600' : 'bg-gray-400'
                                                                           }`}
                                                                           style={{ width: `${student.score}%` }}
                                                                      />
                                                                 </div>
                                                                 <span className={`font-medium ${
                                                                      isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                                                                 }`}>{student.score}%</span>
                                                            </div>
                                                       </td>
                                                       <td className="p-2">
                                                            <StatusChip status={student.grade} variant="default" />
                                                       </td>
                                                       <td className={`p-2 ${
                                                            isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                                                       }`}>{student.accuracy}%</td>
                                                       <td className={`p-2 ${
                                                            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                                       }`}>{student.time}</td>
                                                       <td className="p-2">
                                                            <span className={`flex items-center gap-0.5 text-xs ${
                                                                 student.trend >= 0 ? isDarkMode ? 'text-zinc-300' : 'text-gray-600' : isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                                            }`}>
                                                                 <i className={`ph ph-trend-${student.trend >= 0 ? 'up' : 'down'}`} />
                                                                 {Math.abs(student.trend)}%
                                                            </span>
                                                       </td>
                                                       <td className="p-2">
                                                            <i className={`ph ph-caret-right ${
                                                                 isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                                                            }`} />
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </div>

                    {/* Topic Mastery & Insights */}
                    <div className="grid md:grid-cols-2 gap-4">
                         {/* Topic Mastery */}
                         <div className={`p-4 rounded-xl border ${
                              isDarkMode 
                                   ? 'bg-zinc-900/60 border-zinc-800/40' 
                                   : 'bg-white/80 border-gray-200/60'
                         }`}>
                              <h3 className={`text-base font-semibold mb-3 ${
                                   isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                              }`}>Topic Mastery</h3>
                              <div className="space-y-3">
                                   {test.topics.map((topic, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                             <span className={`text-xs w-28 truncate ${
                                                  isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                                             }`}>{topic.topic}</span>
                                             <div className="flex-1 h-2 rounded-full bg-zinc-700/30 overflow-hidden">
                                                  <div
                                                       className="h-full rounded-full bg-[#8C7B65]"
                                                       style={{ width: `${topic.score}%` }}
                                                  />
                                             </div>
                                             <span className={`text-xs font-medium w-12 text-right ${
                                                  isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                                             }`}>{topic.score}%</span>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {/* Insights */}
                         <div className={`p-4 rounded-xl border ${
                              isDarkMode 
                                   ? 'bg-zinc-900/60 border-zinc-800/40' 
                                   : 'bg-white/80 border-gray-200/60'
                         }`}>
                              <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                                   isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                              }`}>
                                   <i className="ph ph-lightbulb" /> Key Insights
                              </h3>
                              <div className="space-y-3">
                                   {test.insights.map((insight, index) => (
                                        <div key={index} className={`p-3 rounded-lg border ${
                                             isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50/50 border-gray-200/50'
                                        }`}>
                                             <div className="flex items-start gap-2">
                                                  <i className="ph ph-lightbulb text-sm mt-0.5 text-[#8C7B65]" />
                                                  <div className="flex-1">
                                                       <p className={`text-xs font-medium mb-1 ${
                                                            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                                                       }`}>{insight.title}</p>
                                                       <p className={`text-xs ${
                                                            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                                                       }`}>{insight.description}</p>
                                                  </div>
                                                  <button className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all transform active:scale-95 ${
                                                       isDarkMode ? 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700/60' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow'
                                                  }`}>
                                                       {insight.action}
                                                  </button>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
               </div>
          </DashboardLayout>
     )
}