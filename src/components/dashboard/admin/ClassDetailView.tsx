'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useClasses } from '@/contexts/ClassContext'
import { useTeachers } from '@/contexts/TeacherContext'
import { useStudents } from '@/contexts/StudentContext'
import { useUnifiedData } from '@/contexts/UnifiedDataContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StatusChip from './StatusChip'
import AddStudentModal from './AddStudentModal'

export default function ClassDetailView() {
  const params = useParams()
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const { classes, branches, courses, subjects, addSubjectToClass, removeSubjectFromClass, assignTeacherToSubject, removeTeacherFromSubject, updateClass } = useClasses()
  const { teachers } = useTeachers()
  const { students, addStudent } = useStudents()
  const { getClassStats, syncTeacherToClasses } = useUnifiedData()
  
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [studentSearch, setStudentSearch] = useState('')
  const [studentPage, setStudentPage] = useState(1)
  const [notification, setNotification] = useState<{type: 'success' | 'error' | 'info', message: string} | null>(null)
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const studentsPerPage = 12

  const classCode = params.slug as string
  const classData = classes.find(c => c.code === classCode)

  const branch = branches.find(b => b.id === classData?.branchId)
  const course = courses.find(c => c.id === classData?.courseId)
  const classSubjects = subjects.filter(s => classData?.subjects.includes(s.id))
  const availableSubjects = subjects.filter(s => !classData?.subjects.includes(s.id))
  
  const classStudents = useMemo(() => {
    if (!classData) return []
    return students.filter(s => s.class.includes(classData.name) || s.rollNumber.startsWith(classData.code))
  }, [students, classData])

  const filteredStudents = useMemo(() => {
    if (!studentSearch) return classStudents
    return classStudents.filter(s => 
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(studentSearch.toLowerCase())
    )
  }, [classStudents, studentSearch])

  const paginatedStudents = useMemo(() => {
    const start = (studentPage - 1) * studentsPerPage
    return filteredStudents.slice(start, start + studentsPerPage)
  }, [filteredStudents, studentPage, studentsPerPage])

  const totalStudentPages = Math.ceil(filteredStudents.length / studentsPerPage)

  useEffect(() => {
    setMounted(true)
  }, [])

  const generateAvatar = (rollNumber: string) => {
    return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${rollNumber}&radius=0&backgroundType[]&eyes=variant01,variant02,variant03,variant05,variant06,variant04,variant07,variant08,variant09,variant10,variant12,variant11,variant13,variant14,variant15,variant26,variant25,variant24,variant22,variant23,variant21,variant20&glassesProbability=30&mouth=variant01,variant02,variant03,variant04,variant05,variant07,variant08,variant09,variant10,variant11,variant12,variant13,variant14,variant15,variant16,variant17,variant18,variant19,variant20,variant21,variant22,variant23,variant24,variant25,variant26,variant27,variant28,variant29,variant30`
  }

  const generateTeacherAvatar = (teacherId: string) => {
    const seed = encodeURIComponent(teacherId)
    return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=4747eb,4762eb,477eeb,4799eb,47b4eb,47d0eb,47eb47,47eb62,47eb7e,47eb99,47ebb4,47ebd0,47ebeb,6247eb,62eb47,7e47eb,7eeb47,9947eb,99eb47,b447eb,b4eb47,d047eb,d0eb47,eb4747,eb4762,eb477e,eb4799,eb47d0,eb47eb,eb6247,eb7e47,eb9947,ebb447,ebd047,ebeb47,ffd5dc,ffdfbf,b6e3f4,c0aede,d1d4f9&backgroundType=gradientLinear&backgroundRotation=0,360,10,20,30`
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'ph-house' },
    { id: 'students', label: 'Students', icon: 'ph-users', count: classStudents.length },
    { id: 'teachers', label: 'Teachers', icon: 'ph-chalkboard-teacher', count: classData?.subjectTeachers?.length || 0 },
    { id: 'subjects', label: 'Subjects', icon: 'ph-books', count: classData?.subjects.length || 0 },
    { id: 'performance', label: 'Performance', icon: 'ph-chart-line' }
  ]

  if (!mounted) return null

  if (!classData) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <i className={`ph ph-graduation-cap text-2xl ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Class Not Found</h3>
          <button onClick={() => router.push('/dashboard/admin/classes')} className="mt-4 px-4 py-2 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-lg text-sm font-medium">
            Back to Classes
          </button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {notification && (
          <div className={`fixed top-4 right-4 z-[10000] px-4 py-3 rounded-xl shadow-lg border backdrop-blur-xl animate-slide-in ${
            notification.type === 'success' 
              ? 'bg-green-500/90 border-green-400/50 text-white' 
              : notification.type === 'error'
              ? 'bg-red-500/90 border-red-400/50 text-white'
              : 'bg-blue-500/90 border-blue-400/50 text-white'
          }`}>
            <div className="flex items-center gap-2">
              <i className={`ph ph-${notification.type === 'success' ? 'check-circle' : notification.type === 'error' ? 'warning-circle' : 'info'} text-lg`} />
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </div>
        )}
        <nav className="flex items-center gap-2 text-sm px-4 md:px-0">
          <button onClick={() => router.push('/dashboard/admin/classes')} className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
            <i className="ph ph-arrow-left text-sm" />
            Classes
          </button>
          <i className={`ph ph-caret-right text-xs ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
          <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{classData.name}</span>
        </nav>

        {/* Header Card */}
        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                <i className="ph ph-graduation-cap text-3xl text-[#8C7B65]" />
              </div>
              <div>
                <h1 className={`text-2xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
                  {classData.name}
                </h1>
                <div className="flex items-center gap-3 text-sm">
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>{classData.code}</span>
                  <span className={isDarkMode ? 'text-zinc-600' : 'text-gray-400'}>•</span>
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>{branch?.name} • {course?.name}</span>
                  <StatusChip status={classData.status} variant={classData.status === 'active' ? 'success' : 'warning'} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-2xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === tab.id ? 'text-[#8C7B65] border-b-2 border-[#8C7B65] bg-[#8C7B65]/5' : isDarkMode ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'}`}>
                <i className={`${tab.icon} text-sm`} />
                {tab.label}
                {tab.count !== undefined && <span className={`px-2 py-0.5 rounded-full text-xs ${isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-600'}`}>{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Class Information */}
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                <i className="ph ph-info text-sm" />
                Class Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                  <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Academic Year</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{classData.academicYear}</p>
                </div>
                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                  <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Program Type</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{classData.programType.toUpperCase()}</p>
                </div>
                {classData.semester && (
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Semester</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{classData.semester}</p>
                  </div>
                )}
                {classData.section && (
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Section</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{classData.section}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                <i className="ph ph-chart-bar text-sm" />
                Performance Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Avg Attendance', value: '92%', icon: 'ph-check-circle', color: 'emerald' },
                  { label: 'Avg Performance', value: classStudents.length > 0 ? `${(classStudents.reduce((sum, s) => sum + (s.performance || 0), 0) / classStudents.length).toFixed(1)}` : 'N/A', icon: 'ph-chart-line', color: 'blue' },
                  { label: 'Active Assignments', value: '8', icon: 'ph-clipboard-text', color: 'amber' },
                  { label: 'Upcoming Tests', value: '3', icon: 'ph-exam', color: 'purple' }
                ].map((stat, i) => (
                  <div key={i} className={`p-4 rounded-xl ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`${stat.icon} text-lg ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                    </div>
                    <p className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{stat.value}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                <i className="ph ph-clock-clockwise text-sm" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { activity: 'New assignment posted', subject: classSubjects[0]?.name || 'Mathematics', time: '2 hours ago', icon: 'ph-clipboard-text' },
                  { activity: 'Test scheduled', subject: classSubjects[1]?.name || 'Physics', time: '5 hours ago', icon: 'ph-exam' },
                  { activity: 'Study material uploaded', subject: classSubjects[0]?.name || 'Mathematics', time: '1 day ago', icon: 'ph-file-text' },
                  { activity: 'New student enrolled', subject: 'Administration', time: '2 days ago', icon: 'ph-user-plus' }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-200'}`}>
                      <i className={`${item.icon} text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{item.activity}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{item.subject} • {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h3 className={`text-base font-semibold flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                <i className="ph ph-users text-sm" />
                Enrolled Students ({filteredStudents.length})
              </h3>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <i className={`ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`} />
                  <input type="text" placeholder="Search students..." value={studentSearch} onChange={(e) => { setStudentSearch(e.target.value); setStudentPage(1) }} className={`pl-10 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 w-full sm:w-64 ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'}`} />
                </div>
                <button onClick={() => setIsAddStudentModalOpen(true)} className="px-4 py-2 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-medium whitespace-nowrap">
                  <i className="ph ph-plus mr-1" />Add Student
                </button>
              </div>
            </div>
            
            {paginatedStudents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedStudents.map(student => (
                    <button key={student.id} onClick={() => router.push(`/dashboard/admin/students/profile/${student.id}`)} className={`p-4 rounded-xl text-left transition-all hover:shadow-md ${isDarkMode ? 'bg-zinc-800/30 hover:bg-zinc-800/50 border border-zinc-800/50' : 'bg-gray-50 hover:bg-white border border-gray-200'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <img src={generateAvatar(student.rollNumber)} alt={student.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{student.name}</p>
                          <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{student.rollNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-500'}>{student.subjects?.length || 0} subjects</span>
                        {student.performance && <span className={`px-2 py-0.5 rounded ${isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}>{student.performance.toFixed(1)} GPA</span>}
                      </div>
                    </button>
                  ))}
                </div>
                {totalStudentPages > 1 && (
                  <div className={`flex items-center justify-between mt-6 pt-6 border-t ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-200'}`}>
                    <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Showing {((studentPage - 1) * studentsPerPage) + 1} to {Math.min(studentPage * studentsPerPage, filteredStudents.length)} of {filteredStudents.length}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setStudentPage(p => Math.max(1, p - 1))} disabled={studentPage === 1} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${studentPage === 1 ? isDarkMode ? 'bg-zinc-800/30 text-zinc-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed' : isDarkMode ? 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Previous</button>
                      <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Page {studentPage} of {totalStudentPages}</span>
                      <button onClick={() => setStudentPage(p => Math.min(totalStudentPages, p + 1))} disabled={studentPage === totalStudentPages} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${studentPage === totalStudentPages ? isDarkMode ? 'bg-zinc-800/30 text-zinc-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed' : isDarkMode ? 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Next</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
                  <i className={`ph ph-users text-2xl ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`} />
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{studentSearch ? 'No students found' : 'No students enrolled yet'}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <h3 className={`text-base font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
              <i className="ph ph-chalkboard-teacher text-sm" />
              Subject Teachers
            </h3>
            <div className="space-y-4">
              {classSubjects.map(subject => {
                const assignment = classData.subjectTeachers?.find(st => st.subjectId === subject.id)
                const teacher = assignment ? teachers.find(t => t.id === assignment.teacherId) : null
                return (
                  <div key={subject.id} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-800/50' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{subject.name}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{subject.code}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {teacher ? (
                        <>
                          <button onClick={() => router.push(`/dashboard/admin/teachers/profile/${teacher.id}`)} className={`flex-1 flex items-center gap-2 p-2 rounded-lg ${isDarkMode ? 'bg-zinc-700/50 hover:bg-zinc-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img src={generateTeacherAvatar(teacher.id)} alt={teacher.name} className="w-full h-full" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{teacher.name}</p>
                              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{teacher.department}</p>
                            </div>
                          </button>
                          <button onClick={() => {
                            removeTeacherFromSubject(classData.id, subject.id)
                            syncTeacherToClasses(teacher.id)
                          }} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-500'}`}>
                            <i className="ph ph-x text-sm" />
                          </button>
                        </>
                      ) : (
                        <select onChange={(e) => {
                          if (e.target.value) {
                            assignTeacherToSubject(classData.id, subject.id, e.target.value)
                            syncTeacherToClasses(e.target.value)
                          }
                        }} className={`flex-1 px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' : 'bg-white border-gray-200 text-gray-900'}`}>
                          <option value="">Assign Teacher</option>
                          {teachers.map(t => <option key={t.id} value={t.id}>{t.name} - {t.department}</option>)}
                        </select>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <h3 className={`text-base font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
              <i className="ph ph-books text-sm" />
              Subjects ({classSubjects.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {classSubjects.map(subject => (
                <div key={subject.id} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-800/50' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{subject.name}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{subject.code}</p>
                      {subject.credits && <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs ${isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}>{subject.credits} Credits</span>}
                    </div>
                    <button onClick={() => removeSubjectFromClass(classData.id, subject.id)} className={`p-1.5 rounded-lg ${isDarkMode ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-500'}`}>
                      <i className="ph ph-trash text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {availableSubjects.length > 0 && (
              <div>
                <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Add Subjects</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableSubjects.map(subject => (
                    <button key={subject.id} onClick={() => addSubjectToClass(classData.id, subject.id)} className={`p-3 rounded-lg text-left flex items-center justify-between ${isDarkMode ? 'bg-zinc-800/30 hover:bg-zinc-800/50 text-zinc-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'}`}>
                      <span className="text-xs font-medium">{subject.name}</span>
                      <i className="ph ph-plus text-xs" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        onAddStudent={(student) => {
          addStudent(student)
          // Update class student count
          if (classData) {
            updateClass(classData.id, {
              currentStrength: classData.currentStrength + 1
            })
          }
          setNotification({ type: 'success', message: `Student "${student.name}" added successfully!` })
          setTimeout(() => setNotification(null), 3000)
          setIsAddStudentModalOpen(false)
        }}
        prefilledClass={classData?.name}
        prefilledDepartment={branch?.name}
        prefilledCourse={course?.name}
      />
    </DashboardLayout>
  )
}
