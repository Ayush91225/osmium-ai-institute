'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { getDatabase } from '@/lib/database'
import type { Student } from '@/lib/database'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StudentProfileHeader from '@/components/dashboard/admin/StudentProfileHeader'
import AIRecommendations from '@/components/dashboard/admin/AIRecommendations'
import StatusChip from '@/components/dashboard/admin/StatusChip'
import StudentSidebar from '@/components/dashboard/admin/StudentSidebar'
import TabNavigation from '@/components/dashboard/admin/TabNavigation'
import TestCard from '@/components/dashboard/admin/TestCard'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function StudentProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const [student, setStudent] = useState<Student | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [testTab, setTestTab] = useState('exams')
  const [currentPage, setCurrentPage] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ email: '', phone: '', address: '', gender: '', bloodGroup: '', dateOfBirth: '', parentName: '', parentEmail: '', parentContact: '', department: '', course: '' })
  const itemsPerPage = 4
  const recommendations = [
    [
      { title: 'Focus on Chemistry', description: 'Recent test scores suggest more practice needed in organic chemistry concepts', icon: 'ph ph-lightbulb' },
      { title: 'Excellent Progress', description: 'Mathematics and Physics scores show consistent improvement', icon: 'ph ph-trend-up' }
    ],
    [
      { title: 'Time Management', description: 'Consider creating a study schedule for better assignment completion', icon: 'ph ph-clock' },
      { title: 'Group Study', description: 'Join study groups for Chemistry to improve understanding', icon: 'ph ph-users' }
    ],
    [
      { title: 'Goal Setting', description: 'Set specific targets for upcoming semester examinations', icon: 'ph ph-target' },
      { title: 'Extra Reading', description: 'Explore advanced topics in Mathematics to maintain excellence', icon: 'ph ph-book-open' }
    ]
  ]

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const studentId = params.slug as string
      const db = getDatabase()
      const foundStudent = db.getStudents().find(s => s.rollNumber === studentId || s.id === studentId)
      setStudent(foundStudent || null)
      if (foundStudent) {
        setEditForm({
          email: foundStudent.email,
          phone: foundStudent.phone,
          address: foundStudent.address || '',
          gender: foundStudent.gender || '',
          bloodGroup: foundStudent.bloodGroup || '',
          dateOfBirth: foundStudent.dateOfBirth || '',
          parentName: foundStudent.parentName || '',
          parentEmail: foundStudent.parentEmail || '',
          parentContact: foundStudent.parentContact,
          department: foundStudent.department || '',
          course: foundStudent.course || ''
        })
      }
    }
  }, [params.slug])

  const handleSaveEdit = () => {
    if (student) {
      const db = typeof window !== 'undefined' ? require('@/lib/database').getDatabase() : null
      if (db) {
        db.updateStudent(student.id, editForm)
      }
      setStudent({ ...student, ...editForm })
      setIsEditing(false)
    }
  }

  if (!mounted) return null

  if (!student) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'
          }`}>
            <i className={`ph ph-user-x text-2xl ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`} />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${
            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
          }`}>Student Not Found</h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>The student profile you're looking for doesn't exist.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm">
          <button
            onClick={() => router.push('/dashboard/admin/students')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              isDarkMode 
                ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <i className="ph ph-arrow-left text-sm" />
            Students
          </button>
          <i className={`ph ph-caret-right text-xs ${
            isDarkMode ? 'text-zinc-600' : 'text-gray-400'
          }`} />
          <span className={`font-medium ${
            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
          }`}>{student.name}</span>
        </nav>

        {/* Student Header Card */}
        <StudentProfileHeader student={student} onEditClick={() => setIsEditing(!isEditing)} />

        {/* Navigation Tabs */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Contact Information */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-base font-semibold flex items-center gap-2 ${
                      isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                    }`}>
                      <i className="ph ph-address-book text-sm" />
                      Contact Information
                    </h3>
                    {isEditing && (
                      <button onClick={handleSaveEdit} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#8C7B65] hover:bg-[#7A6B57] text-white">
                        Save Changes
                      </button>
                    )}
                  </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  {[
    { label: 'Email', value: editForm.email, icon: 'ph ph-envelope', editable: true, field: 'email', type: 'email' },
    { label: 'Phone', value: editForm.phone, icon: 'ph ph-phone', editable: true, field: 'phone', type: 'tel' },
    { label: 'Address', value: editForm.address || 'Not provided', icon: 'ph ph-map-pin', editable: true, field: 'address', type: 'text' },
    { label: 'Gender', value: editForm.gender || 'Not specified', icon: 'ph ph-user', editable: true, field: 'gender', type: 'text' },
    { label: 'Blood Group', value: editForm.bloodGroup || 'Not specified', icon: 'ph ph-drop', editable: true, field: 'bloodGroup', type: 'text' },
    { label: 'Date of Birth', value: editForm.dateOfBirth ? new Date(editForm.dateOfBirth).toLocaleDateString() : 'Not provided', icon: 'ph ph-cake', editable: true, field: 'dateOfBirth', type: 'date' },
    { label: 'Parent Name', value: editForm.parentName || 'Not provided', icon: 'ph ph-user-circle', editable: true, field: 'parentName', type: 'text' },
    { label: 'Parent Email', value: editForm.parentEmail || 'Not provided', icon: 'ph ph-envelope', editable: true, field: 'parentEmail', type: 'email' },
    { label: 'Parent Contact', value: editForm.parentContact, icon: 'ph ph-phone', editable: true, field: 'parentContact', type: 'tel' },
    { label: 'Department', value: editForm.department || 'Not specified', icon: 'ph ph-buildings', editable: true, field: 'department', type: 'text' },
    { label: 'Course', value: editForm.course || 'Not specified', icon: 'ph ph-book', editable: true, field: 'course', type: 'text' },
    { label: 'Admission Date', value: new Date(student.admissionDate).toLocaleDateString(), icon: 'ph ph-calendar', editable: false }
  ].map((item, index) => (
    <div key={index} className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
      }`}>
        <i className={`${item.icon} text-xs ${
          isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`} />
      </div>
      <div className="flex-1">
        <p className={`text-xs font-medium ${
          isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`}>{item.label}</p>
        {isEditing && item.editable ? (
          item.type === 'date' ? (
            <input
              type="date"
              value={typeof item.value === 'string' && item.value.includes('/') ? item.value.split('/').reverse().join('-') : (typeof item.value === 'string' ? item.value : '')}
              onChange={(e) => setEditForm({...editForm, [item.field!]: e.target.value})}
              className={`text-xs font-medium w-full px-2 py-1 rounded border ${
                isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          ) : (
            <input
              type={item.type}
              value={item.value}
              onChange={(e) => setEditForm({...editForm, [item.field!]: e.target.value})}
              className={`text-xs font-medium w-full px-2 py-1 rounded border ${
                isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          )
        ) : (
          <p className={`text-xs font-medium ${
            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
          }`}>{item.value}</p>
        )}
      </div>
    </div>
  ))}
</div>
                </div>

                {/* AI Recommendations */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-robot text-sm" />
                    AI Recommendations
                  </h3>
                  <div className="space-y-2">
                    {[
                      'Focus on strengthening calculus fundamentals, especially integration techniques',
                      'Increase practice time for organic chemistry reaction mechanisms',
                      'Review wave motion concepts and numerical problem-solving approaches',
                      'Consider scheduling additional study sessions for thermodynamics'
                    ].map((recommendation, index) => (
                      <div key={index} className={`p-3 rounded-lg flex items-start gap-2 ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'
                      }`}>
                        <i className={`ph ph-lightbulb text-sm mt-0.5 ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm ${
                          isDarkMode ? 'text-zinc-300' : 'text-gray-600'
                        }`}>{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <AIRecommendations recommendations={recommendations} />

                {/* Current Studies */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-book-open text-sm" />
                    Currently Studying
                  </h3>
                  <div className="space-y-2">
                    {[
                      { topic: 'Calculus - Integration by Parts', subject: 'Mathematics', score: 75, total: 100 },
                      { topic: 'Wave Motion & Sound', subject: 'Physics', score: 60, total: 100 },
                      { topic: 'Organic Chemistry Reactions', subject: 'Chemistry', score: 45, total: 100 }
                    ].map((study, index) => (
                      <div key={index} className={`p-2 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className={`text-xs font-medium ${
                              isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                            }`}>{study.topic}</p>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                            }`}>{study.subject}</p>
                          </div>
                          <span className={`text-xs font-medium ${
                            isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                          }`}>{study.score}%</span>
                        </div>
                        {mounted && (
                          <div className="h-16">
                            <Chart
                              options={{
                                chart: { 
                                  type: 'bar', 
                                  toolbar: { show: false }, 
                                  background: 'transparent',
                                  sparkline: { enabled: true }
                                },
                                plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '30%' } },
                                dataLabels: { enabled: false },
                                xaxis: { 
                                  categories: [study.topic], 
                                  labels: { show: false }, 
                                  max: 100,
                                  axisBorder: { show: false },
                                  axisTicks: { show: false }
                                },
                                yaxis: { 
                                  labels: { show: false },
                                  axisBorder: { show: false },
                                  axisTicks: { show: false }
                                },
                                colors: ['#8C7B65'],
                                grid: { show: false },
                                theme: { mode: isDarkMode ? 'dark' : 'light' }
                              }}
                              series={[{ name: 'Progress', data: [study.score] }]}
                              type="bar"
                              height={64}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Tests */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-exam text-sm" />
                    Recent Test Results
                  </h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {[
                      { test: 'Physics Unit Test', score: 88, date: '2024-01-15', trend: 'up' },
                      { test: 'Math Quiz - Calculus', score: 92, date: '2024-01-12', trend: 'up' },
                      { test: 'Chemistry Lab Exam', score: 78, date: '2024-01-10', trend: 'down' },
                      { test: 'English Literature Test', score: 85, date: '2024-01-08', trend: 'up' },
                      { test: 'Physics Mechanics Quiz', score: 90, date: '2024-01-05', trend: 'up' },
                      { test: 'Math Algebra Test', score: 94, date: '2024-01-03', trend: 'up' },
                      { test: 'Chemistry Organic Test', score: 72, date: '2024-01-01', trend: 'down' },
                      { test: 'English Grammar Quiz', score: 88, date: '2023-12-28', trend: 'up' }
                    ].map((test, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div>
                          <p className={`text-xs font-medium ${
                            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                          }`}>{test.test}</p>
                          <p className={`text-xs ${
                            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                          }`}>{new Date(test.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className={`ph ph-trend-${test.trend} text-xs ${
                            test.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                          }`} />
                          <span className={`text-sm font-bold ${
                            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                          }`}>{test.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mental Health Status */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-heart text-sm" />
                    Wellbeing Status
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { metric: 'Stress Level', status: 'Low', color: 'emerald' },
                      { metric: 'Study Motivation', status: 'High', color: 'blue' },
                      { metric: 'Social Activity', status: 'High', color: 'emerald' },
                      { metric: 'Study Balance', status: 'Fair', color: 'amber' }
                    ].map((item, index) => (
                      <div key={index} className={`p-3 rounded-lg text-center ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <p className={`text-xs font-medium mb-1 ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                        }`}>{item.metric}</p>
                        <p className={`text-xs font-bold ${
                          isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                        }`}>{item.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'academic' && (
              <>
                {/* Performance Overview */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-chart-line text-sm" />
                    Academic Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { subject: 'Mathematics', score: 92, trend: 'up', change: '+5%', grade: 'A+', rank: 2 },
                      { subject: 'Physics', score: 88, trend: 'up', change: '+3%', grade: 'A', rank: 5 },
                      { subject: 'Chemistry', score: 85, trend: 'down', change: '-2%', grade: 'A', rank: 8 },
                      { subject: 'English', score: 90, trend: 'up', change: '+7%', grade: 'A+', rank: 3 }
                    ].map((perf, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className={`text-sm font-semibold ${
                            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                          }`}>{perf.subject}</h4>
                          <div className={`flex items-center gap-1 text-xs font-medium ${
                            perf.trend === 'up' 
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            <i className={`ph ph-trend-${perf.trend} text-xs`} />
                            {perf.change}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xl font-bold ${
                            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                          }`}>{perf.score}%</span>
                          <div className="text-right">
                            <p className={`text-xs font-medium ${
                              isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                            }`}>Grade: {perf.grade}</p>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                            }`}>Rank: #{perf.rank}</p>
                          </div>
                        </div>
                        <div className={`w-full h-1.5 rounded-full ${
                          isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'
                        }`}>
                          <div 
                            className="h-1.5 rounded-full bg-[#8C7B65] transition-all duration-1000"
                            style={{ width: `${perf.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Assignments */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-file-text text-sm" />
                    Recent Assignments
                  </h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Physics Lab Report - Wave Motion', subject: 'Physics', status: 'Graded', grade: 'A+', score: 95, date: '2024-01-15', feedback: 'Excellent analysis and presentation' },
                      { name: 'Calculus Problem Set #12', subject: 'Mathematics', status: 'Submitted', grade: null, score: null, date: '2024-01-12', feedback: 'Under review' },
                      { name: 'Organic Chemistry Analysis', subject: 'Chemistry', status: 'Pending', grade: null, score: null, date: '2024-01-10', feedback: 'Submission deadline: Jan 20' },
                      { name: 'Literature Essay - Shakespeare', subject: 'English', status: 'Graded', grade: 'A', score: 88, date: '2024-01-08', feedback: 'Good insights, improve structure' }
                    ].map((assignment, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className={`text-xs font-medium mb-1 ${
                              isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                            }`}>{assignment.name}</h4>
                            <div className="flex items-center gap-2 text-xs">
                              <StatusChip status={assignment.subject} variant="default" />
                              <span className={`${
                                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                              }`}>{new Date(assignment.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <StatusChip 
                              status={assignment.status} 
                              variant={
                                assignment.status === 'Graded' ? 'success' :
                                assignment.status === 'Submitted' ? 'info' :
                                'warning'
                              }
                            />
                            {assignment.grade && (
                              <p className={`text-sm font-bold mt-1 ${
                                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                              }`}>{assignment.grade} ({assignment.score}%)</p>
                            )}
                          </div>
                        </div>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                        }`}>{assignment.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attendance & Participation */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-calendar-check text-sm" />
                    Attendance & Participation
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                    }`}>
                      <p className={`text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                      }`}>Overall Attendance</p>
                      <p className={`text-lg font-bold ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>96%</p>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                      }`}>185/193 days</p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                    }`}>
                      <p className={`text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                      }`}>Class Participation</p>
                      <p className={`text-lg font-bold ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>Excellent</p>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                      }`}>Active in discussions</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'tests' && (
              <>
                {/* Test Navigation */}
                <div className="flex gap-6 mb-6">
                  {[
                    { id: 'exams', label: 'Exams' },
                    { id: 'mocks', label: 'Mock Tests' },
                    { id: 'quizzes', label: 'Quizzes' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setTestTab(tab.id)}
                      className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                        testTab === tab.id
                          ? 'border-[#8C7B65] text-[#8C7B65]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Test Content */}
                {testTab === 'exams' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'EXM001', name: 'English Literature Exam', date: '2024-01-25', score: undefined, grade: undefined, status: 'upcoming', duration: '2 hours', teacher: 'Dr. Sarah Johnson' },
                        { id: 'EXM002', name: 'Mid-Term Physics Exam', date: '2024-01-20', score: 88, grade: 'A', status: 'completed', duration: '3 hours', teacher: 'Prof. Michael Chen' },
                        { id: 'EXM003', name: 'Mathematics Unit Test', date: '2024-01-18', score: 92, grade: 'A+', status: 'completed', duration: '2 hours', teacher: 'Dr. Emily Rodriguez' },
                        { id: 'EXM004', name: 'Chemistry Lab Practical', date: '2024-01-15', score: 85, grade: 'A', status: 'completed', duration: '2.5 hours', teacher: 'Prof. David Kim' },
                        { id: 'EXM005', name: 'Biology Test', date: '2024-01-12', score: 90, grade: 'A+', status: 'completed', duration: '2 hours', teacher: 'Dr. Lisa Wang' },
                        { id: 'EXM006', name: 'History Exam', date: '2024-01-10', score: 87, grade: 'A', status: 'completed', duration: '2.5 hours', teacher: 'Prof. John Smith' }
                      ].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((exam, index) => (
                        <TestCard key={index} test={exam} type="exam" studentId={student.rollNumber} />
                      ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-6">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded text-sm ${
                          currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#8C7B65] hover:bg-[#8C7B65]/10'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-500">Page {currentPage} of 2</span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, 2))}
                        disabled={currentPage === 2}
                        className={`px-3 py-1 rounded text-sm ${
                          currentPage === 2
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#8C7B65] hover:bg-[#8C7B65]/10'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {testTab === 'mocks' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'MCK001', name: 'JEE Main Mock Test #15', subject: 'Physics, Chemistry, Math', score: 89, attempts: 3, bestScore: 89, date: '2024-01-19' },
                        { id: 'MCK002', name: 'NEET Biology Mock', subject: 'Biology', score: 76, attempts: 2, bestScore: 82, date: '2024-01-17' },
                        { id: 'MCK003', name: 'SAT Math Practice', subject: 'Mathematics', score: 94, attempts: 1, bestScore: 94, date: '2024-01-16' },
                        { id: 'MCK004', name: 'Physics Mechanics Mock', subject: 'Physics', score: 87, attempts: 4, bestScore: 91, date: '2024-01-14' },
                        { id: 'MCK005', name: 'Chemistry Mock Test', subject: 'Chemistry', score: 82, attempts: 2, bestScore: 85, date: '2024-01-12' },
                        { id: 'MCK006', name: 'Math Advanced Mock', subject: 'Mathematics', score: 91, attempts: 3, bestScore: 93, date: '2024-01-10' }
                      ].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((mock, index) => (
                        <TestCard key={index} test={mock} type="mock" studentId={student.rollNumber} />
                      ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-6">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded text-sm ${
                          currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#8C7B65] hover:bg-[#8C7B65]/10'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-500">Page {currentPage} of 2</span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, 2))}
                        disabled={currentPage === 2}
                        className={`px-3 py-1 rounded text-sm ${
                          currentPage === 2
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#8C7B65] hover:bg-[#8C7B65]/10'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {testTab === 'quizzes' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'QZ001', name: 'Calculus - Derivatives', lesson: 'Calculus - Derivatives', subject: 'Mathematics', score: 95, total: 10, correct: 9, date: '2024-01-19', time: '8 min' },
                        { id: 'QZ002', name: 'Wave Motion Basics', lesson: 'Wave Motion Basics', subject: 'Physics', score: 80, total: 15, correct: 12, date: '2024-01-18', time: '12 min' },
                        { id: 'QZ003', name: 'Organic Reactions', lesson: 'Organic Reactions', subject: 'Chemistry', score: 73, total: 11, correct: 8, date: '2024-01-17', time: '15 min' },
                        { id: 'QZ004', name: 'Shakespeare Sonnets', lesson: 'Shakespeare Sonnets', subject: 'English', score: 90, total: 8, correct: 7, date: '2024-01-16', time: '6 min' },
                        { id: 'QZ005', name: 'Trigonometry Identities', lesson: 'Trigonometry Identities', subject: 'Mathematics', score: 88, total: 12, correct: 10, date: '2024-01-15', time: '10 min' },
                        { id: 'QZ006', name: 'Atomic Structure', lesson: 'Atomic Structure', subject: 'Chemistry', score: 82, total: 9, correct: 7, date: '2024-01-14', time: '7 min' }
                      ].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((quiz, index) => (
                        <TestCard key={index} test={quiz} type="quiz" studentId={student.rollNumber} />
                      ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-6">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded text-sm ${
                          currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#8C7B65] hover:bg-[#8C7B65]/10'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-500">Page {currentPage} of 2</span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, 2))}
                        disabled={currentPage === 2}
                        className={`px-3 py-1 rounded text-sm ${
                          currentPage === 2
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#8C7B65] hover:bg-[#8C7B65]/10'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === 'activities' && (
              <>
                {/* Recent Activities */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-clock-clockwise text-sm" />
                    Recent Activities
                  </h3>
                  <div className="max-h-64 overflow-y-auto space-y-3">
                    {[
                      { activity: 'Submitted Physics Assignment', time: '2 hours ago', icon: 'ph ph-upload', type: 'Academic', details: 'Wave Motion Lab Report - 95% score' },
                      { activity: 'Attended Chemistry Lab Session', time: '1 day ago', icon: 'ph ph-flask', type: 'Lab', details: 'Organic Chemistry Synthesis - Group A' },
                      { activity: 'Participated in Math Quiz', time: '2 days ago', icon: 'ph ph-trophy', type: 'Competition', details: 'Inter-class Mathematics Quiz - 2nd place' },
                      { activity: 'Accessed Digital Library', time: '3 days ago', icon: 'ph ph-book-open', type: 'Study', details: 'Downloaded 3 research papers on Quantum Physics' },
                      { activity: 'Completed Literature Essay', time: '4 days ago', icon: 'ph ph-pencil', type: 'Academic', details: 'Shakespeare Analysis - A grade received' },
                      { activity: 'Joined Study Group', time: '5 days ago', icon: 'ph ph-users', type: 'Collaboration', details: 'Calculus Study Group - 5 members' },
                      { activity: 'Attended Workshop', time: '6 days ago', icon: 'ph ph-presentation', type: 'Learning', details: 'Advanced Physics Concepts Workshop' },
                      { activity: 'Submitted Chemistry Report', time: '1 week ago', icon: 'ph ph-upload', type: 'Academic', details: 'Inorganic Chemistry Lab Report - 82% score' },
                      { activity: 'Participated in Debate', time: '1 week ago', icon: 'ph ph-microphone', type: 'Competition', details: 'School Debate Competition - Finalist' },
                      { activity: 'Library Research', time: '1 week ago', icon: 'ph ph-magnifying-glass', type: 'Study', details: 'Research for English Literature project' }
                    ].map((item, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
                          }`}>
                            <i className={`${item.icon} text-xs ${
                              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className={`text-xs font-medium ${
                                isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                              }`}>{item.activity}</p>
                              <StatusChip status={item.type} variant="default" />
                            </div>
                            <p className={`text-xs mb-1 ${
                              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                            }`}>{item.details}</p>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                            }`}>{item.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extracurricular Activities */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-star text-sm" />
                    Extracurricular Activities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { activity: 'Robotics Club', role: 'Team Leader', achievement: 'Regional Competition - 1st Place', status: 'Active' },
                      { activity: 'Photography Society', role: 'Member', achievement: 'School Magazine Cover Photo', status: 'Active' },
                      { activity: 'Science Olympiad', role: 'Participant', achievement: 'State Level Qualifier', status: 'Completed' },
                      { activity: 'Debate Team', role: 'Speaker', achievement: 'Inter-school Debate - 2nd Place', status: 'Active' }
                    ].map((item, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`text-xs font-medium ${
                            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                          }`}>{item.activity}</h4>
                          <StatusChip 
                            status={item.status} 
                            variant={item.status === 'Active' ? 'success' : 'default'}
                          />
                        </div>
                        <p className={`text-xs mb-1 ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                        }`}>Role: {item.role}</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                        }`}>{item.achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'wellness' && (
              <div className={`p-4 rounded-xl border ${
                isDarkMode 
                  ? 'bg-zinc-900/60 border-zinc-800/40' 
                  : 'bg-white/80 border-gray-200/60'
              }`}>
                <h3 className={`text-base font-semibold mb-4 flex items-center gap-2 ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  <i className="ph ph-heart text-sm" />
                  Mental Health & Wellbeing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { metric: 'Stress Level', value: 'Low', score: 85, icon: 'ph ph-heart', description: 'Managing academic pressure well', recommendation: 'Continue current stress management techniques' },
                    { metric: 'Study Motivation', value: 'High', score: 88, icon: 'ph ph-fire', description: 'Shows enthusiasm for learning', recommendation: 'Channel motivation into challenging subjects' },
                    { metric: 'Social Engagement', value: 'High', score: 92, icon: 'ph ph-users', description: 'Active in group activities', recommendation: 'Great social connections' },
                    { metric: 'Academic Pressure', value: 'Moderate', score: 65, icon: 'ph ph-brain', description: 'Balanced approach to studies', recommendation: 'Consider time management techniques' }
                  ].map((metric, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-200'
                        }`}>
                          <i className={`${metric.icon} text-xs ${
                            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-medium ${
                            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                          }`}>{metric.metric}</p>
                          <p className={`text-sm font-bold ${
                            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                          }`}>{metric.value}</p>
                        </div>
                        <span className={`text-xs font-medium ${
                          isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                        }`}>{metric.score}%</span>
                      </div>
                      <p className={`text-xs mb-2 ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                      }`}>{metric.description}</p>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-[#8C7B65]' : 'text-[#8C7B65]'
                      }`}>{metric.recommendation}</p>
                      <div className={`w-full h-1.5 rounded-full mt-2 ${
                        isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'
                      }`}>
                        <div 
                          className="h-1.5 rounded-full bg-[#8C7B65] transition-all duration-1000"
                          style={{ width: `${metric.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'career' && (
              <>
                {/* Career Recommendations */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-path text-sm" />
                    Career Recommendations
                  </h3>
                  <div className="space-y-3">
                    {[
                      { 
                        career: 'Software Engineer', 
                        match: 95, 
                        description: 'Strong coding skills and mathematical aptitude', 
                        skills: ['Programming', 'Problem Solving', 'Mathematics'],
                        icon: 'ph ph-code',
                        salary: '$85,000 - $150,000',
                        growth: 'High',
                        education: 'Bachelor\'s in Computer Science'
                      },
                      { 
                        career: 'Data Scientist', 
                        match: 88, 
                        description: 'Excellent analytical and statistical abilities', 
                        skills: ['Statistics', 'Analysis', 'Mathematics'],
                        icon: 'ph ph-chart-line',
                        salary: '$90,000 - $160,000',
                        growth: 'Very High',
                        education: 'Bachelor\'s in Statistics/Math'
                      },
                      { 
                        career: 'Robotics Engineer', 
                        match: 82, 
                        description: 'Interest in robotics and strong physics knowledge', 
                        skills: ['Physics', 'Engineering', 'Robotics'],
                        icon: 'ph ph-robot',
                        salary: '$75,000 - $130,000',
                        growth: 'High',
                        education: 'Bachelor\'s in Mechanical/Electrical Engineering'
                      }
                    ].map((career, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-200'
                          }`}>
                            <i className={`${career.icon} text-xs ${
                              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`text-sm font-semibold ${
                                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                              }`}>{career.career}</h4>
                              <span className="text-xs font-bold text-[#8C7B65]">{career.match}% match</span>
                            </div>
                            <p className={`text-xs mb-2 ${
                              isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                            }`}>{career.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 text-xs">
                              <div>
                                <span className={`font-medium ${
                                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                                }`}>Salary: </span>
                                <span className={`${
                                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                                }`}>{career.salary}</span>
                              </div>
                              <div>
                                <span className={`font-medium ${
                                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                                }`}>Growth: </span>
                                <span className={`${
                                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                                }`}>{career.growth}</span>
                              </div>
                              <div>
                                <span className={`font-medium ${
                                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                                }`}>Education: </span>
                                <span className={`${
                                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                                }`}>{career.education}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {career.skills.map((skill, skillIndex) => (
                                <StatusChip key={skillIndex} status={skill} variant="default" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Development */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-rocket text-sm" />
                    Career Development
                  </h3>
                  <div className="space-y-3">
                    {[
                      { activity: 'Coding Bootcamp', status: 'In Progress', progress: 75, description: 'Python and Web Development - 6 weeks remaining' },
                      { activity: 'Internship Application', status: 'Applied', progress: 50, description: 'Applied to 5 tech companies for summer internship' },
                      { activity: 'Portfolio Development', status: 'Ongoing', progress: 60, description: 'Building personal website and project showcase' },
                      { activity: 'LinkedIn Profile', status: 'Completed', progress: 100, description: 'Professional profile created and optimized' }
                    ].map((item, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`text-xs font-medium ${
                            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                          }`}>{item.activity}</h4>
                          <StatusChip 
                            status={item.status} 
                            variant={
                              item.status === 'Completed' ? 'success' :
                              item.status === 'In Progress' ? 'info' :
                              item.status === 'Applied' ? 'warning' :
                              'default'
                            }
                          />
                        </div>
                        <p className={`text-xs mb-2 ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                        }`}>{item.description}</p>
                        <div className="flex items-center gap-2">
                          <div className={`flex-1 h-1.5 rounded-full ${
                            isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'
                          }`}>
                            <div 
                              className="h-1.5 rounded-full bg-[#8C7B65] transition-all duration-1000"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                          }`}>{item.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <StudentSidebar />
        </div>
      </div>
    </DashboardLayout>
  )
}