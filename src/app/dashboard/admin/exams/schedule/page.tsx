'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import { getDatabase } from '@/lib/database'

export default function ScheduleTestPage() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const searchParams = useSearchParams()
  const testId = searchParams.get('id')
  const [mounted, setMounted] = useState(false)
  const [subjects, setSubjects] = useState<any[]>([])
  const [classes, setClasses] = useState<any[]>([])
  const [papers, setPapers] = useState<any[]>([])
  
  const [testName, setTestName] = useState('')
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedPaper, setSelectedPaper] = useState('')
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [testDate, setTestDate] = useState('')
  const [testTime, setTestTime] = useState('')
  const [duration, setDuration] = useState(60)
  const [totalMarks, setTotalMarks] = useState(100)
  const [passingMarks, setPassingMarks] = useState(40)
  const [testType, setTestType] = useState('regular')
  const [instructions, setInstructions] = useState('')
  const [negativeMark, setNegativeMark] = useState(false)
  const [negativeMarkValue, setNegativeMarkValue] = useState(0.25)
  const [allowLateSubmission, setAllowLateSubmission] = useState(false)
  const [lateSubmissionPenalty, setLateSubmissionPenalty] = useState(10)
  const [shuffleQuestions, setShuffleQuestions] = useState(true)
  const [showResults, setShowResults] = useState('after_submission')
  const [proctoring, setProctoring] = useState(false)

  useEffect(() => {
    setMounted(true)
    const db = getDatabase()
    if (db) {
      setSubjects(db.getSubjects())
      setClasses(db.getClasses())
      setPapers(db.getTestPapers())
      
      // Load existing test if editing
      if (testId) {
        const test = db.getTests().find(t => t.id === testId)
        if (test) {
          setTestName(test.title)
          setSelectedSubjects([test.subjectId])
          setSelectedClasses([test.classId])
          const [date, time] = test.date.split('T')
          setTestDate(date)
          setTestTime(time || '')
          setDuration(test.duration)
          setTotalMarks(test.totalMarks)
          setTestType(test.type)
        }
      }
    }
  }, [testId])

  const handleClassToggle = (classId: string) => {
    setSelectedClasses(prev => 
      prev.includes(classId) ? prev.filter(id => id !== classId) : [...prev, classId]
    )
  }

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
    )
  }

  const handleSchedule = () => {
    const db = getDatabase()
    if (!db) return

    if (testId) {
      // Update existing test
      db.updateTest(testId, {
        title: testName,
        type: testType as 'exam' | 'quiz' | 'mock',
        subjectId: selectedSubjects[0] || '',
        date: `${testDate}T${testTime}`,
        duration,
        totalMarks,
        status: new Date(`${testDate}T${testTime}`) > new Date() ? 'upcoming' : 'ongoing' as 'upcoming' | 'ongoing' | 'completed'
      })
    } else {
      // Create test for each selected class
      selectedClasses.forEach(classId => {
        const test = {
          id: `TEST${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
          title: testName,
          type: testType as 'exam' | 'quiz' | 'mock',
          teacherId: 'ADMIN001',
          classId,
          subjectId: selectedSubjects[0] || '',
          date: `${testDate}T${testTime}`,
          duration,
          totalMarks,
          status: new Date(`${testDate}T${testTime}`) > new Date() ? 'upcoming' : 'ongoing' as 'upcoming' | 'ongoing' | 'completed',
          createdAt: new Date().toISOString()
        }
        db.addTest(test)
      })
    }

    router.push('/dashboard/admin/exams')
  }

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4 md:mb-6 px-4 md:px-0 mt-12 md:mt-0">
          <button onClick={() => router.back()} className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
            <i className="ph ph-arrow-left text-xl" />
          </button>
          <div className="flex-1">
            <h1 className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.3] tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
              {testId ? 'Edit Test' : 'Schedule Test'}
            </h1>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              {testId ? 'Update test details' : 'Create and schedule a new test for students'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                  <i className="ph ph-info text-[#8C7B65]" />
                </div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Basic Information</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Test Name</label>
                  <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="e.g., Mid-Term Examination 2024" className={`w-full px-3 py-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder:text-zinc-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`} />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Test Type</label>
                  <select value={testType} onChange={(e) => setTestType(e.target.value)} className={`w-full px-3 py-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}>
                    <option value="regular">Regular Test</option>
                    <option value="midterm">Mid-Term Exam</option>
                    <option value="final">Final Exam</option>
                    <option value="quiz">Quiz</option>
                    <option value="mock">Mock Test</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                    <i className="ph ph-book-open text-[#8C7B65]" />
                  </div>
                  <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Subjects</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'}`}>{selectedSubjects.length} selected</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {subjects.map(sub => (
                  <label key={sub.id} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${selectedSubjects.includes(sub.id) ? isDarkMode ? 'bg-[#8C7B65]/20 border-[#8C7B65]' : 'bg-[#8C7B65]/10 border-[#8C7B65]' : isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50 hover:border-zinc-600' : 'bg-gray-50/50 border-gray-200/50 hover:border-gray-300'}`}>
                    <input type="checkbox" checked={selectedSubjects.includes(sub.id)} onChange={() => handleSubjectToggle(sub.id)} className="w-4 h-4 rounded accent-[#8C7B65]" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{sub.name}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                    <i className="ph ph-file-text text-[#8C7B65]" />
                  </div>
                  <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Test Paper</h3>
                </div>
                <button
                  onClick={() => router.push('/dashboard/admin/exams/create-paper')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#8C7B65] hover:bg-[#7A6B58] text-white transition-colors"
                >
                  <i className="ph ph-plus mr-1" />
                  Create
                </button>
              </div>
              
              <div className="space-y-2">
                <label className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${!selectedPaper ? isDarkMode ? 'bg-[#8C7B65]/20 border-[#8C7B65]' : 'bg-[#8C7B65]/10 border-[#8C7B65]' : isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50 hover:border-zinc-600' : 'bg-gray-50/50 border-gray-200/50 hover:border-gray-300'}`}>
                  <input type="radio" checked={!selectedPaper} onChange={() => setSelectedPaper('')} className="w-4 h-4 accent-[#8C7B65]" />
                  <div className="flex-1">
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Manual Entry</p>
                    <p className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Add questions later</p>
                  </div>
                </label>
                
                {papers.map(paper => (
                  <label key={paper.id} className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${selectedPaper === paper.id ? isDarkMode ? 'bg-[#8C7B65]/20 border-[#8C7B65]' : 'bg-[#8C7B65]/10 border-[#8C7B65]' : isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50 hover:border-zinc-600' : 'bg-gray-50/50 border-gray-200/50 hover:border-gray-300'}`}>
                    <input type="radio" checked={selectedPaper === paper.id} onChange={() => setSelectedPaper(paper.id)} className="w-4 h-4 accent-[#8C7B65]" />
                    <div className="flex-1">
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{paper.name}</p>
                      <p className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{paper.questions.length} questions • {paper.questions.reduce((sum: number, q: any) => sum + q.marks, 0)} marks</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        router.push(`/dashboard/admin/exams/create-paper?id=${paper.id}`)
                      }}
                      className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${isDarkMode ? 'hover:bg-zinc-700 text-zinc-400' : 'hover:bg-gray-200 text-gray-600'}`}
                    >
                      <i className="ph ph-pencil" />
                    </button>
                  </label>
                ))}
              </div>
            </div>

            <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                  <i className="ph ph-calendar text-[#8C7B65]" />
                </div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Schedule & Duration</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Date</label>
                  <input type="date" value={testDate} onChange={(e) => setTestDate(e.target.value)} className={`w-full px-3 py-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Time</label>
                  <input type="time" value={testTime} onChange={(e) => setTestTime(e.target.value)} className={`w-full px-3 py-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Duration (min)</label>
                  <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min="15" max="300" className={`w-full px-3 py-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Total Marks</label>
                  <input type="number" value={totalMarks} onChange={(e) => setTotalMarks(Number(e.target.value))} min="10" max="500" className={`w-full px-3 py-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                </div>
              </div>
            </div>

            <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                    <i className="ph ph-users text-[#8C7B65]" />
                  </div>
                  <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Classes</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'}`}>{selectedClasses.length} selected</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {classes.map(cls => (
                  <label key={cls.id} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${selectedClasses.includes(cls.id) ? isDarkMode ? 'bg-[#8C7B65]/20 border-[#8C7B65]' : 'bg-[#8C7B65]/10 border-[#8C7B65]' : isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50 hover:border-zinc-600' : 'bg-gray-50/50 border-gray-200/50 hover:border-gray-300'}`}>
                    <input type="checkbox" checked={selectedClasses.includes(cls.id)} onChange={() => handleClassToggle(cls.id)} className="w-4 h-4 rounded accent-[#8C7B65]" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{cls.name}</p>
                      <p className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{cls.currentStrength} students</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                  <i className="ph ph-gear text-[#8C7B65]" />
                </div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Settings</h3>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Passing %</label>
                    <input type="number" value={passingMarks} onChange={(e) => setPassingMarks(Number(e.target.value))} min="0" max="100" className={`w-full px-3 py-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                  </div>

                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Show Results</label>
                    <select value={showResults} onChange={(e) => setShowResults(e.target.value)} className={`w-full px-3 py-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}>
                      <option value="immediately">Immediately</option>
                      <option value="after_submission">After Submit</option>
                      <option value="after_deadline">After Deadline</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-gray-50'}`}>
                    <input type="checkbox" checked={negativeMark} onChange={(e) => setNegativeMark(e.target.checked)} className="w-4 h-4 rounded accent-[#8C7B65]" />
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Negative Marking</span>
                  </label>

                  <label className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-gray-50'}`}>
                    <input type="checkbox" checked={shuffleQuestions} onChange={(e) => setShuffleQuestions(e.target.checked)} className="w-4 h-4 rounded accent-[#8C7B65]" />
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Shuffle Questions</span>
                  </label>

                  <label className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-gray-50'}`}>
                    <input type="checkbox" checked={allowLateSubmission} onChange={(e) => setAllowLateSubmission(e.target.checked)} className="w-4 h-4 rounded accent-[#8C7B65]" />
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Late Submission</span>
                  </label>

                  <label className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-gray-50'}`}>
                    <input type="checkbox" checked={proctoring} onChange={(e) => setProctoring(e.target.checked)} className="w-4 h-4 rounded accent-[#8C7B65]" />
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Proctoring</span>
                  </label>
                </div>
              </div>
            </div>


          </div>

          <div className="space-y-6">
            <div className={`rounded-xl border p-5 sticky top-6 ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                  <i className="ph ph-check-circle text-[#8C7B65]" />
                </div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Summary</h3>
              </div>
              
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Test Name</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'} truncate ml-2 max-w-[140px]`}>{testName || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Subjects</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{selectedSubjects.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Test Paper</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{selectedPaper ? 'Selected' : 'Manual'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Classes</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{selectedClasses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Date & Time</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{testDate && testTime ? `${testDate} ${testTime}` : '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Duration</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{duration} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Total Marks</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{totalMarks}</span>
                </div>
              </div>

              <div className={`mt-5 pt-5 border-t ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-200/50'}`}>
                <button onClick={handleSchedule} disabled={!testName || selectedSubjects.length === 0 || selectedClasses.length === 0 || !testDate || !testTime} className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${testName && selectedSubjects.length > 0 && selectedClasses.length > 0 && testDate && testTime ? 'bg-[#8C7B65] hover:bg-[#7A6B58] text-white shadow-sm hover:shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  <i className="ph ph-calendar-check mr-2" />
                  {testId ? 'Update Test' : 'Schedule Test'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
