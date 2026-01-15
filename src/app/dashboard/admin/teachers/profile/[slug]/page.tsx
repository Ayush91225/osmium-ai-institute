'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useTeachers } from '@/contexts/TeacherContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import TeacherProfileHeader from '@/components/dashboard/admin/TeacherProfileHeader'
import TabNavigation from '@/components/dashboard/admin/TabNavigation'
import BlurredImage from '@/components/BlurredImage'

export default function TeacherProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const { teachers } = useTeachers()
  const [teacher, setTeacher] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [testTab, setTestTab] = useState('exams')
  const [currentPage, setCurrentPage] = useState(1)
  const [assignmentsPage, setAssignmentsPage] = useState(1)
  const [materialsPage, setMaterialsPage] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ email: '', phone: '', address: '', gender: '', dateOfBirth: '', emergencyContact: '', department: '' })
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<{ id: string, title: string, type: 'assignment' | 'material' } | null>(null)
  const itemsPerPage = 4
  const fileItemsPerPage = 6

  // Exam filtering and sorting state
  const [examClassFilter, setExamClassFilter] = useState('all')
  const [examStatusFilter, setExamStatusFilter] = useState('all')
  const [examSortBy, setExamSortBy] = useState('date')
  const [examSortOrder, setExamSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    setMounted(true)
    const teacherId = params.slug as string
    const foundTeacher = teachers.find(t => t.id === teacherId)

    if (foundTeacher) {
      // Calculate real student count from classes
      const db = typeof window !== 'undefined' ? require('@/lib/database').getDatabase() : null
      const allStudents = db ? db.getStudents() : []
      const teacherStudentCount = allStudents.filter((s: any) =>
        foundTeacher.classes.some((c: string) => s.class === c)
      ).length

      const enhancedTeacher = {
        ...foundTeacher,
        dateOfBirth: (foundTeacher as any).dateOfBirth || '1985-03-12',
        gender: (foundTeacher as any).gender || 'Female',
        address: (foundTeacher as any).address || '123 Academic Street, Education City',
        emergencyContact: (foundTeacher as any).emergencyContact || '+1 234-567-8999',
        description: `Experienced ${foundTeacher.department.toLowerCase()} educator with expertise in ${foundTeacher.subjects.join(', ')}. Passionate about making complex concepts accessible to students.`,
        specialities: foundTeacher.subjects.concat(['Research Methodology', 'Student Mentoring']),
        totalStudents: teacherStudentCount,
        totalExams: 45,
        totalMaterials: 78,
        totalAssignments: 156
      }
      setTeacher(enhancedTeacher)
      setEditForm({
        email: enhancedTeacher.email,
        phone: enhancedTeacher.phone,
        address: enhancedTeacher.address,
        gender: enhancedTeacher.gender,
        dateOfBirth: enhancedTeacher.dateOfBirth,
        emergencyContact: enhancedTeacher.emergencyContact,
        department: enhancedTeacher.department
      })
    } else {
      setTeacher(null)
    }
  }, [params.slug, teachers])

  const handleSaveEdit = () => {
    const db = typeof window !== 'undefined' ? require('@/lib/database').getDatabase() : null
    if (db) {
      db.updateTeacher(teacher.id, editForm)
    }
    setTeacher({ ...teacher, ...editForm })
    setIsEditing(false)
  }

  const handleDeleteFile = () => {
    if (fileToDelete) {
      // Delete logic here - would integrate with database
      console.log(`Deleting ${fileToDelete.type}: ${fileToDelete.id}`)
      setDeleteModalOpen(false)
      setFileToDelete(null)
    }
  }

  if (!mounted) return null

  if (!teacher) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'
            }`}>
            <i className={`ph ph-user-x text-2xl ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`} />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'
            }`}>Teacher Not Found</h3>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>The teacher profile you're looking for doesn't exist.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <>
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && fileToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl border p-6 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <i className="ph ph-warning text-2xl text-red-500" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>Delete {fileToDelete.type === 'assignment' ? 'Assignment' : 'Material'}?</h3>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>This action cannot be undone</p>
              </div>
            </div>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'
              }`}>
              Are you sure you want to delete <span className="font-semibold">"{fileToDelete.title}"</span>?
              {fileToDelete.type === 'assignment' && ' All student submissions will also be deleted.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false)
                  setFileToDelete(null)
                }}
                className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFile}
                className="flex-1 px-4 py-2 rounded-xl text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <DashboardLayout>
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Teacher Header Card */}
          <TeacherProfileHeader teacher={teacher} onEditClick={() => setIsEditing(!isEditing)} />

          {/* Navigation Tabs */}
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} type="teacher" />

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Contact Information */}
                  <div className={`p-4 rounded-xl border ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800/40'
                    : 'bg-white/80 border-gray-200/60'
                    }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-base font-semibold flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
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
                        { label: 'Date of Birth', value: editForm.dateOfBirth ? new Date(editForm.dateOfBirth).toLocaleDateString() : 'Not provided', icon: 'ph ph-cake', editable: true, field: 'dateOfBirth', type: 'date' },
                        { label: 'Emergency Contact', value: editForm.emergencyContact || 'Not provided', icon: 'ph ph-phone-call', editable: true, field: 'emergencyContact', type: 'tel' },
                        { label: 'Department', value: editForm.department, icon: 'ph ph-buildings', editable: true, field: 'department', type: 'text' },
                        { label: 'Joining Date', value: new Date(teacher.joiningDate).toLocaleDateString(), icon: 'ph ph-calendar', editable: false }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
                            }`}>
                            <i className={`${item.icon} text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                              }`} />
                          </div>
                          <div className="flex-1">
                            <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                              }`}>{item.label}</p>
                            {isEditing && item.editable ? (
                              item.type === 'date' ? (
                                <input
                                  type="date"
                                  value={typeof item.value === 'string' && item.value.includes('/') ? item.value.split('/').reverse().join('-') : (typeof item.value === 'string' ? item.value : '')}
                                  onChange={(e) => setEditForm({ ...editForm, [item.field!]: e.target.value })}
                                  className={`text-xs font-medium w-full px-2 py-1 rounded border ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                />
                              ) : (
                                <input
                                  type={item.type}
                                  value={item.value}
                                  onChange={(e) => setEditForm({ ...editForm, [item.field!]: e.target.value })}
                                  className={`text-xs font-medium w-full px-2 py-1 rounded border ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                />
                              )
                            ) : (
                              <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                                }`}>{item.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Classes */}
                  <div className={`p-4 rounded-xl border ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800/40'
                    : 'bg-white/80 border-gray-200/60'
                    }`}>
                    <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>
                      <i className="ph ph-chalkboard-teacher text-sm" />
                      Current Classes
                    </h3>
                    <div className="space-y-2">
                      {teacher.classes.map((classItem: string, index: number) => (
                        <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                          }`}>
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                                }`}>{classItem}</p>
                              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                }`}>{teacher.subjects[index % teacher.subjects.length]}</p>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDarkMode ? 'bg-zinc-700/50 text-zinc-300' : 'bg-gray-200 text-gray-700'
                              }`}>Active</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className={`p-4 rounded-xl border ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800/40'
                    : 'bg-white/80 border-gray-200/60'
                    }`}>
                    <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
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
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                          }`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-200'
                              }`}>
                              <i className={`ph ${activity.type === 'exam' ? 'ph-exam' :
                                activity.type === 'material' ? 'ph-file-text' :
                                  activity.type === 'assignment' ? 'ph-clipboard-text' :
                                    activity.type === 'meeting' ? 'ph-users' : 'ph-question'
                                } text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                                }`} />
                            </div>
                            <div>
                              <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                                }`}>{activity.activity}</p>
                              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'
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
                  <div className={`p-4 rounded-xl border ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800/40'
                    : 'bg-white/80 border-gray-200/60'
                    }`}>
                    <h3 className={`text-base font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>
                      <i className="ph ph-chart-line text-sm" />
                      Teaching Performance
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teacher.subjects.slice(0, 3).map((subject: string, index: number) => {
                        const avgScore = 85 + Math.floor(Math.random() * 10)
                        const students = 35 + Math.floor(Math.random() * 15)
                        const satisfaction = 4.3 + Math.random() * 0.6
                        return (
                          <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                            }`}>
                            <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                              }`}>{subject}</h4>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className={`${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Avg Score:</span>
                                <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{avgScore}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className={`${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Students:</span>
                                <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{students}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className={`${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Rating:</span>
                                <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{satisfaction.toFixed(1)}/5.0</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Course Materials */}
                  <div className={`p-4 rounded-xl border ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800/40'
                    : 'bg-white/80 border-gray-200/60'
                    }`}>
                    <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>
                      <i className="ph ph-file-text text-sm" />
                      Course Materials
                    </h3>
                    <div className="space-y-2">
                      {teacher.subjects.slice(0, 3).map((subject: string, index: number) => {
                        const downloads = 80 + Math.floor(Math.random() * 100)
                        const daysAgo = index * 2 + 3
                        const date = new Date()
                        date.setDate(date.getDate() - daysAgo)
                        const material = {
                          name: `${subject} Study Guide`,
                          subject: subject,
                          downloads: downloads,
                          date: date.toISOString().split('T')[0]
                        }
                        return (
                          <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                            }`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'
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
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'assignments' && (
                <>
                  {/* Assignments - Premium File Manager */}
                  <div className={`p-6 rounded-xl border ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800/40'
                    : 'bg-white/80 border-gray-200/60'
                    }`}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                        }`}>
                        <i className="ph ph-clipboard-text text-lg" />
                        Assignments
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { id: 'ASG001', title: 'Calculus Problem Set #15', class: 'Grade 12A', dueDate: '2024-01-25', submitted: 38, total: 42, status: 'active' },
                        { id: 'ASG002', title: 'Wave Motion Analysis', class: 'Grade 11B', dueDate: '2024-01-22', submitted: 35, total: 40, status: 'active' },
                        { id: 'ASG003', title: 'Organic Chemistry Lab', class: 'Grade 10A', dueDate: '2024-01-20', submitted: 45, total: 45, status: 'completed' },
                        { id: 'ASG004', title: 'Trigonometry Practice', class: 'Grade 11A', dueDate: '2024-01-18', submitted: 32, total: 35, status: 'grading' },
                        { id: 'ASG005', title: 'Physics Mechanics', class: 'Grade 12A', dueDate: '2024-01-15', submitted: 40, total: 42, status: 'completed' },
                        { id: 'ASG006', title: 'Algebra Worksheet', class: 'Grade 10A', dueDate: '2024-01-12', submitted: 43, total: 45, status: 'completed' },
                        { id: 'ASG007', title: 'Chemistry Equations', class: 'Grade 11B', dueDate: '2024-01-10', submitted: 38, total: 40, status: 'completed' },
                        { id: 'ASG008', title: 'Math Quiz Prep', class: 'Grade 9B', dueDate: '2024-01-08', submitted: 30, total: 32, status: 'completed' }
                      ].slice((assignmentsPage - 1) * fileItemsPerPage, assignmentsPage * fileItemsPerPage).map((assignment, index) => (
                        <div 
                          key={index} 
                          onClick={() => router.push(`/dashboard/admin/teachers/profile/${teacher.id}/assignments/${assignment.id}`)}
                          className={`group relative p-4 rounded-xl border text-left transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer ${isDarkMode ? 'bg-zinc-800/40 border-zinc-800/60 hover:bg-zinc-800/60 hover:border-zinc-700' : 'bg-gray-50/80 border-gray-200/80 hover:bg-white hover:border-gray-300'
                          }`}>
                          <button
                            onClick={() => {
                              setFileToDelete({ id: assignment.id, title: assignment.title, type: 'assignment' })
                              setDeleteModalOpen(true)
                            }}
                            className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ${isDarkMode ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'
                              }`}
                          >
                            <i className="ph ph-trash text-sm" />
                          </button>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110 ${isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-200'
                            }`}>
                            <i className={`ph ph-clipboard-text text-xl ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                              }`} />
                          </div>
                          <h4 className={`text-sm font-semibold mb-2 line-clamp-2 min-h-[2.5rem] ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                            }`}>{assignment.title}</h4>
                          <p className={`text-xs mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                            {assignment.class}
                          </p>
                          <div className={`flex items-center justify-between pt-2 border-t ${isDarkMode ? 'border-zinc-700/50' : 'border-gray-200'
                            }`}>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-zinc-700/50 text-zinc-300' : 'bg-gray-200 text-gray-700'
                              }`}>{assignment.submitted}/{assignment.total}</span>
                            <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                              {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-6">
                      <button onClick={() => setAssignmentsPage(p => Math.max(1, p - 1))} disabled={assignmentsPage === 1} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${assignmentsPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${isDarkMode ? 'bg-zinc-800/60 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}>
                        <i className="ph ph-caret-left" />
                      </button>
                      <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Page {assignmentsPage} of 2</span>
                      <button onClick={() => setAssignmentsPage(p => Math.min(2, p + 1))} disabled={assignmentsPage === 2} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${assignmentsPage === 2 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${isDarkMode ? 'bg-zinc-800/60 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}>
                        <i className="ph ph-caret-right" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'materials' && (
                <>
                  {/* Study Materials - Premium File Manager */}
                  <div className={`p-6 rounded-xl border ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800/40'
                    : 'bg-white/80 border-gray-200/60'
                    }`}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                        }`}>
                        <i className="ph ph-folder-open text-lg" />
                        Study Materials
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {teacher.subjects.map((subject: string, idx: number) => [
                        { id: `MAT${idx}01`, title: `${subject} - Chapter Notes`, type: 'Page', views: 156 + idx * 20, uploadDate: `2024-01-${20 - idx * 3}` },
                        { id: `MAT${idx}02`, title: `${subject} - Practice Problems`, type: 'Page', views: 134 + idx * 15, uploadDate: `2024-01-${18 - idx * 3}` },
                        { id: `MAT${idx}03`, title: `${subject} - Study Guide.pdf`, type: 'PDF', size: '2.4 MB', views: 98 + idx * 10, uploadDate: `2024-01-${15 - idx * 3}` },
                        { id: `MAT${idx}04`, title: `${subject} - Complete Course`, type: 'Page', views: 112 + idx * 12, uploadDate: `2024-01-${12 - idx * 3}` }
                      ]).flat().slice((materialsPage - 1) * fileItemsPerPage, materialsPage * fileItemsPerPage).map((material: any, index: number) => (
                        <div 
                          key={index} 
                          onClick={() => router.push(`/dashboard/admin/teachers/profile/${teacher.id}/materials/${material.id}`)}
                          className={`group relative p-4 rounded-xl border text-left transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer ${isDarkMode ? 'bg-zinc-800/40 border-zinc-800/60 hover:bg-zinc-800/60 hover:border-zinc-700' : 'bg-gray-50/80 border-gray-200/80 hover:bg-white hover:border-gray-300'
                          }`}>
                          <button
                            onClick={() => {
                              setFileToDelete({ id: material.id, title: material.title, type: 'material' })
                              setDeleteModalOpen(true)
                            }}
                            className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ${isDarkMode ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'
                              }`}
                          >
                            <i className="ph ph-trash text-sm" />
                          </button>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110 ${isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-200'
                            }`}>
                            <i className={`ph ${material.type === 'Page' ? 'ph-file-text' : 'ph-file-pdf'
                              } text-xl ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                              }`} />
                          </div>
                          <h4 className={`text-sm font-semibold mb-2 line-clamp-2 min-h-[2.5rem] ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                            }`}>{material.title}</h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                              }`}>{material.size || `${material.views} views`}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isDarkMode ? 'bg-zinc-700/50 text-zinc-300' : 'bg-gray-200 text-gray-700'
                              }`}>{material.type}</span>
                          </div>
                          <div className={`flex items-center justify-between pt-2 border-t ${isDarkMode ? 'border-zinc-700/50' : 'border-gray-200'
                            }`}>
                            <div className="flex items-center gap-1">
                              <i className={`ph ${material.type === 'Page' ? 'ph-eye' : 'ph-download-simple'} text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
                              <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{material.views}</span>
                            </div>
                            <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                              {new Date(material.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-6">
                      <button onClick={() => setMaterialsPage(p => Math.max(1, p - 1))} disabled={materialsPage === 1} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${materialsPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${isDarkMode ? 'bg-zinc-800/60 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}>
                        <i className="ph ph-caret-left" />
                      </button>
                      <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Page {materialsPage} of 2</span>
                      <button onClick={() => setMaterialsPage(p => Math.min(2, p + 1))} disabled={materialsPage === 2} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${materialsPage === 2 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${isDarkMode ? 'bg-zinc-800/60 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}>
                        <i className="ph ph-caret-right" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'tests' && (
                <>
                  {/* Filter/Sort Controls */}
                  <div className={`p-4 rounded-xl border mb-4 ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800/40'
                    : 'bg-white/80 border-gray-200/60'
                    }`}>
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Class Filter */}
                      <div className="flex items-center gap-2">
                        <label className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Class:</label>
                        <select
                          value={examClassFilter}
                          onChange={(e) => setExamClassFilter(e.target.value)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${isDarkMode
                            ? 'bg-zinc-800/60 border-zinc-700 text-zinc-200 focus:border-zinc-600'
                            : 'bg-white border-gray-300 text-gray-700 focus:border-gray-400'
                            }`}
                        >
                          <option value="all">All Classes</option>
                          {teacher?.classes?.map((cls: string) => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                      </div>

                      {/* Status Filter */}
                      <div className="flex items-center gap-2">
                        <label className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Status:</label>
                        <select
                          value={examStatusFilter}
                          onChange={(e) => setExamStatusFilter(e.target.value)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${isDarkMode
                            ? 'bg-zinc-800/60 border-zinc-700 text-zinc-200 focus:border-zinc-600'
                            : 'bg-white border-gray-300 text-gray-700 focus:border-gray-400'
                            }`}
                        >
                          <option value="all">All Status</option>
                          <option value="upcoming">Upcoming</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      {/* Sort By */}
                      <div className="flex items-center gap-2">
                        <label className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Sort:</label>
                        <select
                          value={examSortBy}
                          onChange={(e) => setExamSortBy(e.target.value)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${isDarkMode
                            ? 'bg-zinc-800/60 border-zinc-700 text-zinc-200 focus:border-zinc-600'
                            : 'bg-white border-gray-300 text-gray-700 focus:border-gray-400'
                            }`}
                        >
                          <option value="date">Date</option>
                          <option value="name">Name</option>
                          <option value="class">Class</option>
                          <option value="score">Avg Score</option>
                        </select>
                        <button
                          onClick={() => setExamSortOrder(examSortOrder === 'asc' ? 'desc' : 'asc')}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isDarkMode
                            ? 'bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300 border border-zinc-700'
                            : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-300'
                            }`}
                          title={examSortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        >
                          <i className={`ph ph-sort-${examSortOrder === 'asc' ? 'ascending' : 'descending'} text-sm`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Exams Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(() => {
                      const allExams = [
                        { id: 'EXM001', name: 'Mid-Term Examination', class: 'Grade 12A', classSlug: 'CLS003', subject: teacher?.subjects?.[0] || 'Mathematics', date: '2024-01-28', duration: '3 hours', status: 'upcoming', totalStudents: 42 },
                        { id: 'EXM002', name: 'Unit Test - Chapter 5', class: 'Grade 11B', classSlug: 'CLS002', subject: teacher?.subjects?.[0] || 'Physics', date: '2024-01-24', duration: '1 hour', status: 'upcoming', totalStudents: 40 },
                        { id: 'EXM003', name: 'Final Examination', class: 'Grade 10A', classSlug: 'CLS001', subject: teacher?.subjects?.[0] || 'Chemistry', date: '2024-01-20', duration: '2.5 hours', score: 87, status: 'completed', totalStudents: 40, passRate: 92 },
                        { id: 'EXM004', name: 'Weekly Assessment', class: 'Grade 11A', classSlug: 'CLS005', subject: teacher?.subjects?.[0] || 'Mathematics', date: '2024-01-18', duration: '45 min', score: 82, status: 'completed', totalStudents: 40, passRate: 88 },
                        { id: 'EXM005', name: 'Physics Practical Exam', class: 'Grade 12A', classSlug: 'CLS003', subject: teacher?.subjects?.[0] || 'Physics', date: '2024-01-15', duration: '2 hours', score: 85, status: 'completed', totalStudents: 42, passRate: 90 },
                        { id: 'EXM006', name: 'Chemistry Lab Test', class: 'Grade 11B', classSlug: 'CLS002', subject: teacher?.subjects?.[0] || 'Chemistry', date: '2024-01-12', duration: '1.5 hours', score: 88, status: 'completed', totalStudents: 40, passRate: 95 },
                        { id: 'EXM007', name: 'Mathematics Quiz', class: 'Grade 10A', classSlug: 'CLS001', subject: teacher?.subjects?.[0] || 'Mathematics', date: '2024-01-10', duration: '30 min', score: 90, status: 'completed', totalStudents: 40, passRate: 97 },
                        { id: 'EXM008', name: 'Theory Examination', class: 'Grade 9B', classSlug: 'CLS004', subject: teacher?.subjects?.[0] || 'Science', date: '2024-01-08', duration: '2 hours', score: 84, status: 'completed', totalStudents: 35, passRate: 86 }
                      ]

                      // Filter
                      let filtered = allExams.filter(exam => {
                        if (examClassFilter !== 'all' && exam.class !== examClassFilter) return false
                        if (examStatusFilter !== 'all' && exam.status !== examStatusFilter) return false
                        return true
                      })

                      // Sort
                      filtered.sort((a, b) => {
                        let comparison = 0
                        switch (examSortBy) {
                          case 'date':
                            comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
                            break
                          case 'name':
                            comparison = a.name.localeCompare(b.name)
                            break
                          case 'class':
                            comparison = a.class.localeCompare(b.class)
                            break
                          case 'score':
                            comparison = (a.score || 0) - (b.score || 0)
                            break
                        }
                        return examSortOrder === 'asc' ? comparison : -comparison
                      })

                      // Paginate
                      const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      const totalPages = Math.ceil(filtered.length / itemsPerPage)

                      return paginated.map((exam, index) => (
                        <div key={exam.id} className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/70' : 'bg-white/50 border-gray-200/50 hover:border-gray-300/70'
                          }`}>
                          <div className={`w-full h-32 relative overflow-hidden rounded-t-2xl border-b ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/50 border-gray-200/30'
                            }`}>
                            <BlurredImage className="w-full h-full object-cover" />
                            {/* Status Badge */}
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-medium ${exam.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              }`}>
                              {exam.status === 'completed' ? 'Completed' : 'Upcoming'}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="mb-3">
                              <h3 className={`text-base font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exam.name}</h3>
                              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{exam.class} • {exam.subject}</p>
                            </div>
                            <div className={`grid grid-cols-2 gap-px rounded-xl overflow-hidden mb-3 ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-200/30'}`}>
                              <div className={`p-2.5 flex items-start gap-2 ${isDarkMode ? 'bg-zinc-900/60' : 'bg-white/60'}`}>
                                <i className={`ph ph-calendar text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
                                <div>
                                  <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Date</p>
                                  <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </p>
                                </div>
                              </div>
                              <div className={`p-2.5 flex items-start gap-2 ${isDarkMode ? 'bg-zinc-900/60 border-l border-zinc-800/30' : 'bg-white/60 border-l border-gray-200/30'}`}>
                                <i className={`ph ph-${exam.score ? 'chart-bar' : 'clock'} text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
                                <div>
                                  <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                                    {exam.score ? 'Avg Score' : 'Duration'}
                                  </p>
                                  <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {exam.score ? `${exam.score}%` : exam.duration}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <i className={`ph ph-users text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
                                <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                                  {exam.totalStudents} students
                                </span>
                              </div>
                              {exam.status === 'completed' && (
                                <button
                                  onClick={() => router.push(`/dashboard/admin/classes/${exam.classSlug}/tests/${exam.id}`)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${isDarkMode
                                    ? 'bg-[#8C7B65] hover:bg-[#7A6B58] text-white'
                                    : 'bg-[#8C7B65] hover:bg-[#7A6B58] text-white'
                                    }`}
                                >
                                  <i className="ph ph-chart-line text-xs" />
                                  View Analytics
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    })()}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center items-center gap-3 mt-6">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                        } ${isDarkMode ? 'bg-zinc-800/60 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}
                    >
                      <i className="ph ph-caret-left" />
                    </button>
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Page {currentPage}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => p + 1)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 ${isDarkMode ? 'bg-zinc-800/60 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}
                    >
                      <i className="ph ph-caret-right" />
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'activities' && (
                <>
                  {/* Teaching Schedule */}
                  <div className={`p-4 rounded-xl border ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800/40'
                    : 'bg-white/80 border-gray-200/60'
                    }`}>
                    <h3 className={`text-base font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
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
                        <div key={index} className={`p-3 rounded-lg border-l-4 ${schedule.status === 'completed' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' :
                          schedule.status === 'ongoing' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' :
                            'border-amber-500 bg-amber-50/50 dark:bg-amber-900/10'
                          } ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                                  }`}>{schedule.time}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${schedule.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
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
                  <div className={`p-4 rounded-xl border ${isDarkMode
                    ? 'bg-zinc-900/60 border-zinc-800/40'
                    : 'bg-white/80 border-gray-200/60'
                    }`}>
                    <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
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
                        <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                          }`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
                              }`}>
                              <i className={`ph ${activity.type === 'grading' ? 'ph-check-circle' :
                                activity.type === 'material' ? 'ph-file-text' :
                                  activity.type === 'assessment' ? 'ph-exam' :
                                    activity.type === 'meeting' ? 'ph-users' : 'ph-clipboard-text'
                                } text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                            </div>
                            <div className="flex-1">
                              <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                                }`}>{activity.activity}</p>
                              <div className="flex items-center gap-2">
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
              <div className={`p-4 rounded-xl border ${isDarkMode
                ? 'bg-zinc-900/60 border-zinc-800/40'
                : 'bg-white/80 border-gray-200/60'
                }`}>
                <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
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
                    <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                      }`}>
                      <div className="flex items-center gap-2">
                        <i className={`${stat.icon} text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                          }`} />
                        <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                          }`}>{stat.label}</span>
                      </div>
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                        }`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialities */}
              <div className={`p-4 rounded-xl border ${isDarkMode
                ? 'bg-zinc-900/60 border-zinc-800/40'
                : 'bg-white/80 border-gray-200/60'
                }`}>
                <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>
                  <i className="ph ph-star text-sm" />
                  Specialities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {teacher.specialities.map((speciality: string, index: number) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full border ${isDarkMode
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
    </>
  )
}