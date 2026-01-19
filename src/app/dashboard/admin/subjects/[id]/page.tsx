'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { getDatabase, Subject, Class } from '@/lib/database'
import TabNavigation from '@/components/dashboard/admin/TabNavigation'

export default function SubjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const [subject, setSubject] = useState<Subject | null>(null)
  const [classes, setClasses] = useState<Class[]>([])
  const [assignedClasses, setAssignedClasses] = useState<Class[]>([])
  const [availableClasses, setAvailableClasses] = useState<Class[]>([])
  const [subjectStats, setSubjectStats] = useState({ students: 0, teachers: 0, assignments: 0, tests: 0 })
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', code: '', credits: 3 })
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [chapters, setChapters] = useState<Array<{ id: string; name: string; topics: string[]; duration: string }>>([])
  const [showAddChapter, setShowAddChapter] = useState(false)
  const [bulkMode, setBulkMode] = useState(false)
  const [bulkText, setBulkText] = useState('')
  const [newChapter, setNewChapter] = useState({ name: '', topics: '', duration: '' })
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ id: string; name: string; size: string; uploadedAt: string }>>([])

  useEffect(() => {
    const db = getDatabase()
    const foundSubject = db.getSubjects().find(s => s.id === params.id)
    const allClasses = db.getClasses()
    
    if (foundSubject) {
      setSubject(foundSubject)
      setEditForm({ name: foundSubject.name, code: foundSubject.code, credits: foundSubject.credits || 3 })
      setTags(foundSubject.tags || [])
      setChapters(foundSubject.syllabus || [])
      setUploadedFiles(foundSubject.curriculumFiles || [])
      
      // Find classes that have this subject
      const assigned = allClasses.filter(c => c.subjects.includes(foundSubject.id))
      const available = allClasses.filter(c => !c.subjects.includes(foundSubject.id))
      setAssignedClasses(assigned)
      setAvailableClasses(available)
      
      // Calculate real statistics
      const students = db.getSubjectStudents(foundSubject.id)
      const teachers = db.getSubjectTeachers(foundSubject.id)
      const assignments = db.getAssignments().filter(a => a.subjectId === foundSubject.id)
      const tests = db.getTests().filter(t => t.subjectId === foundSubject.id)
      
      setSubjectStats({
        students: students.length,
        teachers: teachers.length,
        assignments: assignments.length,
        tests: tests.length
      })
    }
    
    setClasses(allClasses)
  }, [params.id])

  const handleSave = () => {
    if (subject) {
      getDatabase().updateSubject(subject.id, editForm)
      setSubject({ ...subject, ...editForm })
      setIsEditing(false)
    }
  }

  const saveChapters = (newChapters: typeof chapters) => {
    if (subject) {
      getDatabase().updateSubjectSyllabus(subject.id, newChapters)
      setChapters(newChapters)
    }
  }

  const saveFiles = (newFiles: typeof uploadedFiles) => {
    if (subject) {
      getDatabase().updateSubjectCurriculum(subject.id, newFiles)
      setUploadedFiles(newFiles)
    }
  }

  if (!subject) return null

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 mt-12 md:mt-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm">
          <button onClick={() => router.back()} className={`flex items-center gap-1 px-2 py-1 rounded-md ${isDarkMode ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
            <i className="ph ph-arrow-left text-sm" />
            Subjects
          </button>
          <i className={`ph ph-caret-right text-xs ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
          <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{subject.name}</span>
        </nav>

        {/* Header Card */}
        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                <i className="ph ph-book-open text-3xl text-[#8C7B65]" />
              </div>
              <div>
                <h1 className={`text-2xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
                  {subject.name}
                </h1>
                <div className="flex items-center gap-3 text-sm">
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>{subject.code}</span>
                  <span className={isDarkMode ? 'text-zinc-600' : 'text-gray-400'}>•</span>
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>{subject.credits}h per week</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className={`px-4 py-2.5 rounded-xl text-sm font-medium ${isEditing ? isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700' : 'bg-[#8C7B65] text-white hover:bg-[#7A6B58]'}`}>
              <i className={`ph ${isEditing ? 'ph-x' : 'ph-pencil-simple'} mr-1`} />
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} type="subject" />

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-base font-semibold flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                      <i className="ph ph-info text-sm" />
                      Basic Information
                    </h3>
                    {isEditing && (
                      <button onClick={handleSave} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#8C7B65] hover:bg-[#7A6B58] text-white">
                        Save Changes
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { label: 'Subject Name', value: subject.name, field: 'name' },
                      { label: 'Subject Code', value: subject.code, field: 'code' },
                      { label: 'Hours/Week', value: subject.credits, field: 'credits', type: 'number' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
                          <i className={`ph ph-${i === 0 ? 'book' : i === 1 ? 'hash' : 'clock'} text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{item.label}</p>
                          {isEditing ? (
                            <input
                              type={item.type || 'text'}
                              value={(editForm as any)[item.field]}
                              onChange={(e) => setEditForm({ ...editForm, [item.field]: item.type === 'number' ? parseInt(e.target.value) : e.target.value })}
                              className={`w-full px-2 py-1 rounded border text-xs font-medium ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-900'}`}
                            />
                          ) : (
                            <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{item.value}{item.type === 'number' ? 'h' : ''}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                    <i className="ph ph-graduation-cap text-sm" />
                    Assigned Classes ({assignedClasses.length})
                  </h3>
                  {assignedClasses.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      {assignedClasses.map(cls => (
                        <div key={cls.id} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                          <div>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{cls.name}</p>
                            <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{cls.code} • {cls.currentStrength} students</p>
                          </div>
                          <button
                            onClick={() => {
                              const db = getDatabase()
                              db.updateClass(cls.id, { subjects: cls.subjects.filter(s => s !== subject?.id) })
                              setAssignedClasses(assignedClasses.filter(c => c.id !== cls.id))
                              setAvailableClasses([...availableClasses, cls])
                            }}
                            className="text-red-500 hover:text-red-600"
                          >
                            <i className="ph ph-x text-sm" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Not assigned to any class yet</p>
                  )}
                  
                  {availableClasses.length > 0 && (
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Add to Classes</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {availableClasses.map(cls => (
                          <button
                            key={cls.id}
                            onClick={() => {
                              const db = getDatabase()
                              db.updateClass(cls.id, { subjects: [...cls.subjects, subject?.id || ''] })
                              setAvailableClasses(availableClasses.filter(c => c.id !== cls.id))
                              setAssignedClasses([...assignedClasses, cls])
                            }}
                            className={`p-2 rounded-lg text-left flex items-center justify-between text-xs ${isDarkMode ? 'bg-zinc-800/30 hover:bg-zinc-800/50 text-zinc-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'}`}
                          >
                            <span className="font-medium">{cls.name}</span>
                            <i className="ph ph-plus text-xs" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                    <i className="ph ph-tag text-sm" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map(tag => (
                      <span key={tag} className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700'}`}>
                        {tag}
                        <button onClick={() => {
                          const updated = tags.filter(t => t !== tag)
                          setTags(updated)
                          if (subject) getDatabase().updateSubject(subject.id, { tags: updated })
                        }} className="hover:text-red-500">
                          <i className="ph ph-x text-xs" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newTag.trim()) {
                          const updated = [...tags, newTag.trim()]
                          setTags(updated)
                          if (subject) getDatabase().updateSubject(subject.id, { tags: updated })
                          setNewTag('')
                        }
                      }}
                      placeholder="Add tag..."
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                    />
                    <button onClick={() => {
                      if (newTag.trim()) {
                        const updated = [...tags, newTag.trim()]
                        setTags(updated)
                        if (subject) getDatabase().updateSubject(subject.id, { tags: updated })
                        setNewTag('')
                      }
                    }} className="px-4 py-2 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-lg text-sm font-medium">
                      Add
                    </button>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                    <i className="ph ph-chart-bar text-sm" />
                    Subject Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: 'Total Students', value: subjectStats.students, icon: 'ph-users' },
                      { label: 'Teachers', value: subjectStats.teachers, icon: 'ph-chalkboard-teacher' },
                      { label: 'Assignments', value: subjectStats.assignments, icon: 'ph-file-text' },
                      { label: 'Tests', value: subjectStats.tests, icon: 'ph-exam' }
                    ].map((stat, i) => (
                      <div key={i} className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'}`}>
                        <i className={`ph ${stat.icon} text-xl mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                        <p className={`text-lg font-bold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{stat.value}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'academic' && (
              <>
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-base font-semibold flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                      <i className="ph ph-list-bullets text-sm" />
                      Syllabus & Chapters
                    </h3>
                    <button onClick={() => setShowAddChapter(true)} className="px-3 py-1.5 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-lg text-sm font-medium">
                      <i className="ph ph-plus mr-1" />
                      Add Chapter
                    </button>
                  </div>

                  {showAddChapter && (
                    <div className={`p-4 rounded-xl border mb-3 ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex gap-2 mb-3">
                        <button
                          onClick={() => setBulkMode(false)}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${!bulkMode ? 'bg-[#8C7B65] text-white' : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-200 text-gray-600'}`}
                        >
                          <i className="ph ph-plus mr-1" />
                          Single
                        </button>
                        <button
                          onClick={() => setBulkMode(true)}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${bulkMode ? 'bg-[#8C7B65] text-white' : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-200 text-gray-600'}`}
                        >
                          <i className="ph ph-list-dashes mr-1" />
                          Bulk Add
                        </button>
                      </div>

                      {!bulkMode ? (
                        <>
                          <input
                            type="text"
                            value={newChapter.name}
                            onChange={(e) => setNewChapter({ ...newChapter, name: e.target.value })}
                            placeholder="Chapter name..."
                            className={`w-full px-3 py-2 rounded-lg border text-sm mb-2 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                          />
                          <input
                            type="text"
                            value={newChapter.topics}
                            onChange={(e) => setNewChapter({ ...newChapter, topics: e.target.value })}
                            placeholder="Topics (comma separated)..."
                            className={`w-full px-3 py-2 rounded-lg border text-sm mb-2 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                          />
                          <input
                            type="text"
                            value={newChapter.duration}
                            onChange={(e) => setNewChapter({ ...newChapter, duration: e.target.value })}
                            placeholder="Duration (e.g., 2 weeks)..."
                            className={`w-full px-3 py-2 rounded-lg border text-sm mb-2 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                          />
                        </>
                      ) : (
                        <>
                          <textarea
                            value={bulkText}
                            onChange={(e) => setBulkText(e.target.value)}
                            placeholder={`Paste your syllabus here. Format:\n\nChapter 1: Introduction | 2 weeks | Topic1, Topic2\nChapter 2: Advanced Concepts | 3 weeks | Topic3, Topic4`}
                            rows={8}
                            className={`w-full px-3 py-2 rounded-lg border text-sm mb-2 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                          />
                          <p className={`text-xs mb-2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                            Format: Chapter Name | Duration | Topics (comma separated)
                          </p>
                        </>
                      )}

                      <div className="flex gap-2">
                        <button onClick={() => (setShowAddChapter(false), setBulkMode(false), setBulkText(''), setNewChapter({ name: '', topics: '', duration: '' }))} className={`flex-1 px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}>
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (bulkMode && bulkText.trim()) {
                              const lines = bulkText.trim().split('\n').filter(l => l.trim())
                              const newChapters = lines.map((line, idx) => {
                                const parts = line.split('|').map(p => p.trim())
                                return {
                                  id: `CH${Date.now()}_${idx}`,
                                  name: parts[0] || `Chapter ${chapters.length + idx + 1}`,
                                  duration: parts[1] || '1 week',
                                  topics: parts[2] ? parts[2].split(',').map(t => t.trim()).filter(Boolean) : []
                                }
                              })
                              const updated = [...chapters, ...newChapters]
                              saveChapters(updated)
                              setBulkText('')
                              setShowAddChapter(false)
                              setBulkMode(false)
                            } else if (!bulkMode && newChapter.name.trim()) {
                              const updated = [...chapters, { id: `CH${Date.now()}`, name: newChapter.name, topics: newChapter.topics.split(',').map(t => t.trim()).filter(Boolean), duration: newChapter.duration }]
                              saveChapters(updated)
                              setNewChapter({ name: '', topics: '', duration: '' })
                              setShowAddChapter(false)
                            }
                          }}
                          className="flex-1 px-3 py-1.5 bg-[#8C7B65] text-white rounded-lg text-sm"
                        >
                          {bulkMode ? 'Add All' : 'Add'}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {chapters.map((chapter, i) => (
                      <div key={chapter.id} className={`p-3 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                              {i + 1}. {chapter.name}
                            </h4>
                            <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Duration: {chapter.duration}</p>
                          </div>
                          <button onClick={() => saveChapters(chapters.filter(c => c.id !== chapter.id))} className="text-red-500 hover:text-red-600">
                            <i className="ph ph-trash text-sm" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {chapter.topics.map((topic, j) => (
                            <span key={j} className={`px-2 py-0.5 rounded text-xs ${isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-700'}`}>
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                    <i className="ph ph-file-pdf text-sm" />
                    Curriculum Files
                  </h3>
                  {uploadedFiles.length === 0 ? (
                    <label className={`block p-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition-colors ${isDarkMode ? 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50' : 'border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-100/50'}`}>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          const newFiles = files.map(f => ({
                            id: `file_${Date.now()}_${Math.random()}`,
                            name: f.name,
                            size: `${(f.size / 1024).toFixed(1)} KB`,
                            uploadedAt: new Date().toLocaleString()
                          }))
                          saveFiles([...uploadedFiles, ...newFiles])
                        }}
                      />
                      <i className={`ph ph-upload-simple text-3xl mb-2 ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
                      <p className={`text-sm mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Click to upload or drag and drop</p>
                      <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>PDF, DOC, DOCX, TXT (Max 10MB)</p>
                    </label>
                  ) : (
                    <div className="space-y-2">
                      {uploadedFiles.map(file => (
                        <div key={file.id} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                          <div className="flex items-center gap-2 flex-1">
                            <i className={`ph ph-file-pdf text-lg ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{file.name}</p>
                              <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{file.size} • {file.uploadedAt}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => saveFiles(uploadedFiles.filter(f => f.id !== file.id))}
                            className="text-red-500 hover:text-red-600 ml-2"
                          >
                            <i className="ph ph-trash text-sm" />
                          </button>
                        </div>
                      ))}
                      <label className={`block p-3 rounded-lg border-2 border-dashed text-center cursor-pointer transition-colors ${isDarkMode ? 'border-zinc-800 hover:border-zinc-700' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || [])
                            const newFiles = files.map(f => ({
                              id: `file_${Date.now()}_${Math.random()}`,
                              name: f.name,
                              size: `${(f.size / 1024).toFixed(1)} KB`,
                              uploadedAt: new Date().toLocaleString()
                            }))
                            saveFiles([...uploadedFiles, ...newFiles])
                          }}
                        />
                        <i className={`ph ph-plus mr-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Add more files</span>
                      </label>
                    </div>
                  )}
                  <div className={`mt-3 p-2.5 rounded-lg border ${isDarkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                    <p className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                      <i className="ph ph-sparkle mr-1" />
                      <strong>Coming Soon:</strong> Quaternion - Educational browser by Osmium AI
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'View Students', icon: 'ph-users' },
                  { label: 'Create Assignment', icon: 'ph-file-plus' },
                  { label: 'Schedule Test', icon: 'ph-calendar-plus' },
                  { label: 'Upload Material', icon: 'ph-upload' }
                ].map((action, i) => (
                  <button key={i} className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${isDarkMode ? 'bg-zinc-800/30 hover:bg-zinc-800/50 text-zinc-300' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
                    <i className={`ph ${action.icon}`} />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>Recent Activity</h3>
              <div className="space-y-2">
                {[
                  { text: 'Assignment graded', time: '2h ago' },
                  { text: 'Material uploaded', time: '1d ago' },
                  { text: 'Test scheduled', time: '2d ago' }
                ].map((activity, i) => (
                  <div key={i} className={`p-2 rounded-lg text-xs ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                    <p className={isDarkMode ? 'text-zinc-300' : 'text-gray-700'}>{activity.text}</p>
                    <p className={isDarkMode ? 'text-zinc-500' : 'text-gray-500'}>{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
