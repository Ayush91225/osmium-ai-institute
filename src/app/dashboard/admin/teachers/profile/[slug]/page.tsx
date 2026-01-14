'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useTeachers } from '@/contexts/TeacherContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import TeacherProfileHeader from '@/components/dashboard/admin/TeacherProfileHeader'
import TabNavigation from '@/components/dashboard/admin/TabNavigation'

export default function TeacherProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const { teachers } = useTeachers()
  const [teacher, setTeacher] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const teacherId = params.slug as string
    const foundTeacher = teachers.find(t => t.id === teacherId)
    
    if (foundTeacher) {
      const enhancedTeacher = {
        ...foundTeacher,
        dateOfBirth: '1985-03-12',
        gender: 'Female',
        address: '123 Academic Street, Education City',
        emergencyContact: '+1 234-567-8999',
        description: `Experienced ${foundTeacher.department.toLowerCase()} educator with expertise in ${foundTeacher.subjects.join(', ')}. Passionate about making complex concepts accessible to students.`,
        specialities: foundTeacher.subjects.concat(['Research Methodology', 'Student Mentoring']),
        totalStudents: 120,
        totalExams: 45,
        totalMaterials: 78,
        totalAssignments: 156
      }
      setTeacher(enhancedTeacher)
    } else {
      setTeacher(null)
    }
  }, [params.slug, teachers])

  if (!mounted) return null

  if (!teacher) {
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
          }`}>Teacher Not Found</h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>The teacher profile you're looking for doesn't exist.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Teacher Header Card */}
        <TeacherProfileHeader teacher={teacher} />

        {/* Navigation Tabs */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} type="teacher" />

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
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-address-book text-sm" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: 'Email', value: teacher.email, icon: 'ph ph-envelope' },
                      { label: 'Phone', value: teacher.phone, icon: 'ph ph-phone' },
                      { label: 'Address', value: teacher.address || 'Not provided', icon: 'ph ph-map-pin' },
                      { label: 'Gender', value: teacher.gender || 'Not specified', icon: 'ph ph-user' },
                      { label: 'Date of Birth', value: new Date(teacher.dateOfBirth).toLocaleDateString(), icon: 'ph ph-cake' },
                      { label: 'Emergency Contact', value: teacher.emergencyContact || 'Not provided', icon: 'ph ph-phone-call' },
                      { label: 'Department', value: teacher.department, icon: 'ph ph-buildings' },
                      { label: 'Joining Date', value: new Date(teacher.joiningDate).toLocaleDateString(), icon: 'ph ph-calendar' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
                        }`}>
                          <i className={`${item.icon} text-xs ${
                            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                          }`} />
                        </div>
                        <div>
                          <p className={`text-xs font-medium ${
                            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                          }`}>{item.label}</p>
                          <p className={`text-xs font-medium ${
                            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                          }`}>{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Classes */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-chalkboard-teacher text-sm" />
                    Current Classes
                  </h3>
                  <div className="space-y-2">
                    {teacher.classes.map((classItem: string, index: number) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className={`text-xs font-medium ${
                              isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                            }`}>{classItem}</p>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                            }`}>{teacher.subjects[index % teacher.subjects.length]}</p>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            isDarkMode ? 'bg-zinc-700/50 text-zinc-300' : 'bg-gray-200 text-gray-700'
                          }`}>Active</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-clock-clockwise text-sm" />
                    Recent Activities
                  </h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {[
                      { activity: 'Conducted Physics Lab Exam', date: '2024-01-15', type: 'exam' },
                      { activity: 'Uploaded Study Material - Wave Motion', date: '2024-01-12', type: 'material' },
                      { activity: 'Graded Mathematics Assignment', date: '2024-01-10', type: 'assignment' },
                      { activity: 'Parent-Teacher Meeting', date: '2024-01-08', type: 'meeting' },
                      { activity: 'Created Quiz - Calculus Basics', date: '2024-01-05', type: 'quiz' }
                    ].map((activity, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-200'
                          }`}>
                            <i className={`ph ${
                              activity.type === 'exam' ? 'ph-exam' :
                              activity.type === 'material' ? 'ph-file-text' :
                              activity.type === 'assignment' ? 'ph-clipboard-text' :
                              activity.type === 'meeting' ? 'ph-users' : 'ph-question'
                            } text-xs ${
                              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                            }`} />
                          </div>
                          <div>
                            <p className={`text-xs font-medium ${
                              isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                            }`}>{activity.activity}</p>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                            }`}>{new Date(activity.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'academic' && (
              <>
                {/* Teaching Performance */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-chart-line text-sm" />
                    Teaching Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { subject: 'Mathematics', avgScore: 87, students: 45, satisfaction: 4.6 },
                      { subject: 'Physics', avgScore: 84, students: 38, satisfaction: 4.4 },
                      { subject: 'Chemistry', avgScore: 89, students: 37, satisfaction: 4.7 }
                    ].map((perf, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <h4 className={`text-sm font-semibold mb-2 ${
                          isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                        }`}>{perf.subject}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className={`${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Avg Score:</span>
                            <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{perf.avgScore}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={`${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Students:</span>
                            <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{perf.students}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={`${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Rating:</span>
                            <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{perf.satisfaction}/5.0</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Materials */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-file-text text-sm" />
                    Course Materials
                  </h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Advanced Calculus Notes', subject: 'Mathematics', downloads: 156, date: '2024-01-15' },
                      { name: 'Physics Lab Manual', subject: 'Physics', downloads: 89, date: '2024-01-12' },
                      { name: 'Organic Chemistry Guide', subject: 'Chemistry', downloads: 134, date: '2024-01-10' }
                    ].map((material, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`text-xs font-medium ${
                              isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                            }`}>{material.name}</h4>
                            <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                              {material.subject} • {material.downloads} downloads
                            </p>
                          </div>
                          <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                            {new Date(material.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'activities' && (
              <>
                {/* Teaching Schedule */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-calendar text-sm" />
                    Today's Schedule
                  </h3>
                  <div className="space-y-3">
                    {[
                      { time: '09:00 AM', class: 'Grade 10A', subject: 'Mathematics', room: 'Room 201', status: 'completed' },
                      { time: '11:00 AM', class: 'Grade 11B', subject: 'Physics', room: 'Lab 1', status: 'ongoing' },
                      { time: '02:00 PM', class: 'Grade 12A', subject: 'Chemistry', room: 'Lab 2', status: 'upcoming' },
                      { time: '03:30 PM', class: 'Grade 10B', subject: 'Mathematics', room: 'Room 203', status: 'upcoming' }
                    ].map((schedule, index) => (
                      <div key={index} className={`p-3 rounded-lg border-l-4 ${
                        schedule.status === 'completed' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' :
                        schedule.status === 'ongoing' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' :
                        'border-amber-500 bg-amber-50/50 dark:bg-amber-900/10'
                      } ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-semibold ${
                                isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                              }`}>{schedule.time}</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                schedule.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                                schedule.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>{schedule.status}</span>
                            </div>
                            <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                              {schedule.class} • {schedule.subject} • {schedule.room}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Teaching Activities */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-zinc-900/60 border-zinc-800/40' 
                    : 'bg-white/80 border-gray-200/60'
                }`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                    <i className="ph ph-clock-clockwise text-sm" />
                    Recent Teaching Activities
                  </h3>
                  <div className="space-y-2">
                    {[
                      { activity: 'Graded Physics Lab Reports', class: 'Grade 11B', time: '2 hours ago', type: 'grading' },
                      { activity: 'Uploaded Chemistry Notes', class: 'Grade 12A', time: '4 hours ago', type: 'material' },
                      { activity: 'Conducted Mathematics Quiz', class: 'Grade 10A', time: '1 day ago', type: 'assessment' },
                      { activity: 'Parent Meeting - Student Progress', class: 'Grade 11B', time: '2 days ago', type: 'meeting' },
                      { activity: 'Created Assignment - Calculus', class: 'Grade 12A', time: '3 days ago', type: 'assignment' }
                    ].map((activity, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-200'
                          }`}>
                            <i className={`ph ${
                              activity.type === 'grading' ? 'ph-check-circle' :
                              activity.type === 'material' ? 'ph-file-text' :
                              activity.type === 'assessment' ? 'ph-exam' :
                              activity.type === 'meeting' ? 'ph-users' : 'ph-clipboard-text'
                            } text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                          </div>
                          <div className="flex-1">
                            <p className={`text-xs font-medium ${
                              isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                            }`}>{activity.activity}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                                {activity.class}
                              </span>
                              <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                                • {activity.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Teaching Statistics */}
            <div className={`p-4 rounded-xl border ${
              isDarkMode 
                ? 'bg-zinc-900/60 border-zinc-800/40' 
                : 'bg-white/80 border-gray-200/60'
            }`}>
              <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                <i className="ph ph-chart-bar text-sm" />
                Teaching Statistics
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Total Students', value: teacher.totalStudents, icon: 'ph ph-users' },
                  { label: 'Exams Conducted', value: teacher.totalExams, icon: 'ph ph-exam' },
                  { label: 'Materials Created', value: teacher.totalMaterials, icon: 'ph ph-file-text' },
                  { label: 'Assignments Given', value: teacher.totalAssignments, icon: 'ph ph-clipboard-text' }
                ].map((stat, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${
                    isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                  }`}>
                    <div className="flex items-center gap-2">
                      <i className={`${stat.icon} text-sm ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                      }`} />
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                      }`}>{stat.label}</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                    }`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialities */}
            <div className={`p-4 rounded-xl border ${
              isDarkMode 
                ? 'bg-zinc-900/60 border-zinc-800/40' 
                : 'bg-white/80 border-gray-200/60'
            }`}>
              <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                <i className="ph ph-star text-sm" />
                Specialities
              </h3>
              <div className="flex flex-wrap gap-2">
                {teacher.specialities.map((speciality: string, index: number) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full border ${
                      isDarkMode 
                        ? 'bg-zinc-800/50 text-zinc-300 border-zinc-700/50' 
                        : 'bg-gray-50 text-gray-600 border-gray-200/50'
                    }`}
                  >
                    {speciality}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}