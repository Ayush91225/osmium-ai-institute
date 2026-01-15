'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StatusChip from '@/components/dashboard/admin/StatusChip'

export default function AssignmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('submissions')

  const teacherId = params.slug as string
  const assignmentId = params.assignmentId as string

  const assignment = {
    id: assignmentId,
    title: 'Calculus Problem Set #15',
    class: 'Grade 12A',
    subject: 'Mathematics',
    dueDate: '2024-01-25',
    totalMarks: 100,
    description: 'Complete problems 1-20 from Chapter 5. Show all work and include graphs where necessary.',
    instructions: '• Use proper mathematical notation\n• Show all steps clearly\n• Submit as PDF\n• Late submissions will incur 10% penalty per day',
    attachments: [
      { name: 'Problem_Set_15.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'Reference_Material.pdf', size: '1.8 MB', type: 'pdf' }
    ],
    submissions: [
      { id: 'S001', studentName: 'Arjun Sharma', studentId: '10A001', submittedAt: '2024-01-24 14:30', status: 'graded', score: 95, feedback: 'Excellent work! Clear explanations.' },
      { id: 'S002', studentName: 'Priya Patel', studentId: '10A002', submittedAt: '2024-01-24 16:45', status: 'graded', score: 88, feedback: 'Good effort. Review problem 15.' },
      { id: 'S003', studentName: 'Rahul Kumar', studentId: '10A003', submittedAt: '2024-01-25 09:15', status: 'pending', score: null, feedback: null },
      { id: 'S004', studentName: 'Sneha Singh', studentId: '10A004', submittedAt: '2024-01-25 11:20', status: 'pending', score: null, feedback: null }
    ],
    stats: {
      submitted: 38,
      total: 42,
      graded: 25,
      pending: 13,
      avgScore: 87,
      onTime: 35,
      late: 3
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <button onClick={() => router.push('/dashboard/admin/teachers')} className={`hover:underline ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Teachers</button>
          <i className={`ph ph-caret-right ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
          <button onClick={() => router.push(`/dashboard/admin/teachers/profile/${teacherId}`)} className={`hover:underline ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Profile</button>
          <i className={`ph ph-caret-right ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
          <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{assignment.title}</span>
        </nav>

        <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <StatusChip status={assignment.class} variant="default" />
                <StatusChip status={assignment.subject} variant="info" />
              </div>
              <h1 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{assignment.title}</h1>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <button className={`px-4 py-2 rounded-xl text-sm font-medium ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
              <i className="ph ph-pencil mr-2" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Submitted', value: `${assignment.stats.submitted}/${assignment.stats.total}`, icon: 'ph-check-circle' },
              { label: 'Graded', value: assignment.stats.graded, icon: 'ph-clipboard-text' },
              { label: 'Avg Score', value: `${assignment.stats.avgScore}%`, icon: 'ph-chart-line' },
              { label: 'On Time', value: assignment.stats.onTime, icon: 'ph-clock' }
            ].map((stat, i) => (
              <div key={i} className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                <i className={`${stat.icon} text-lg mb-1 block ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{stat.label}</p>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`flex gap-1 p-1 rounded-xl ${isDarkMode ? 'bg-zinc-900/60' : 'bg-gray-100'}`}>
          {['submissions', 'details', 'analytics'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? isDarkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-white text-gray-900 shadow-sm' : isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-900'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'submissions' && (
          <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <div className="space-y-3">
              {assignment.submissions.map(sub => (
                <div key={sub.id} className={`p-4 rounded-lg border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-600'}`}>
                          {sub.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{sub.studentName}</p>
                          <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{sub.studentId} • {new Date(sub.submittedAt).toLocaleString()}</p>
                        </div>
                      </div>
                      {sub.feedback && (
                        <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{sub.feedback}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {sub.score !== null && (
                        <div className="text-right">
                          <p className={`text-lg font-bold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{sub.score}</p>
                          <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>/{assignment.totalMarks}</p>
                        </div>
                      )}
                      <button className={`px-3 py-1.5 rounded-lg text-xs font-medium ${sub.status === 'graded' ? isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-700' : 'bg-[#8C7B65] text-white hover:bg-[#7A6B58]'}`}>
                        {sub.status === 'graded' ? 'View' : 'Grade'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <div className="space-y-4">
              <div>
                <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Description</h3>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{assignment.description}</p>
              </div>
              <div>
                <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Instructions</h3>
                <pre className={`text-sm whitespace-pre-wrap ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{assignment.instructions}</pre>
              </div>
              <div>
                <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Attachments</h3>
                <div className="space-y-2">
                  {assignment.attachments.map((file, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2">
                        <i className="ph ph-file-pdf text-red-500" />
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{file.name}</p>
                          <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{file.size}</p>
                        </div>
                      </div>
                      <button className={`px-3 py-1.5 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                        <i className="ph ph-download-simple mr-1" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Submission Timeline</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>On Time</span>
                    <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{assignment.stats.onTime}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Late</span>
                    <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{assignment.stats.late}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Not Submitted</span>
                    <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{assignment.stats.total - assignment.stats.submitted}</span>
                  </div>
                </div>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Grading Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Graded</span>
                    <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{assignment.stats.graded}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Pending</span>
                    <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{assignment.stats.pending}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Average Score</span>
                    <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{assignment.stats.avgScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
