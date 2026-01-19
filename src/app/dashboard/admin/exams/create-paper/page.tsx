'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import { getDatabase } from '@/lib/database'

interface Question {
  id: string
  subject: string
  type: 'mcq' | 'answer'
  question: string
  options: string[]
  correctOption: number
  correctAnswer?: string
  marks: number
}

export default function CreatePaperPage() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const searchParams = useSearchParams()
  const paperId = searchParams.get('id')
  const [mounted, setMounted] = useState(false)
  const [subjects, setSubjects] = useState<any[]>([])
  const [paperName, setPaperName] = useState('')
  const [paperSubjects, setPaperSubjects] = useState<string[]>([])
  const [defaultMarks, setDefaultMarks] = useState(1)
  const [negativeMarking, setNegativeMarking] = useState(false)
  const [negativeMarks, setNegativeMarks] = useState(0.25)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', subject: '', type: 'mcq', question: '', options: ['', '', '', ''], correctOption: 0, marks: 1 }
  ])

  useEffect(() => {
    setMounted(true)
    const db = getDatabase()
    if (db) {
      setSubjects(db.getSubjects())
      
      if (paperId) {
        const paper = db.getTestPaper(paperId)
        if (paper) {
          setPaperName(paper.name)
          setPaperSubjects(paper.paperSubjects || [])
          setDefaultMarks(paper.defaultMarks)
          setNegativeMarking(paper.negativeMarking)
          setNegativeMarks(paper.negativeMarks)
          setQuestions(paper.questions)
        }
      }
    }
  }, [paperId])

  const addQuestion = () => {
    const defaultSubject = paperSubjects.length === 1 ? paperSubjects[0] : paperSubjects[0] || subjects[0]?.id || ''
    setQuestions([...questions, {
      id: Date.now().toString(),
      subject: defaultSubject,
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctOption: 0,
      marks: defaultMarks
    }])
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id))
    }
  }

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q))
  }

  const updateOption = (id: string, index: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        const newOptions = [...q.options]
        newOptions[index] = value
        return { ...q, options: newOptions }
      }
      return q
    }))
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return
    
    const newQuestions = [...questions]
    const draggedItem = newQuestions[draggedIndex]
    newQuestions.splice(draggedIndex, 1)
    newQuestions.splice(index, 0, draggedItem)
    
    setQuestions(newQuestions)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handlePaperSubjectToggle = (subjectId: string) => {
    setPaperSubjects(prev => {
      const newSubjects = prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId) 
        : [...prev, subjectId]
      
      if (newSubjects.length === 1) {
        setQuestions(questions.map(q => ({ ...q, subject: newSubjects[0] })))
      }
      
      return newSubjects
    })
  }

  const applyDefaultMarks = () => {
    setQuestions(questions.map(q => ({ ...q, marks: defaultMarks })))
  }

  const savePaper = () => {
    const db = getDatabase()
    if (!db) return

    const paperData = {
      id: paperId || `PAPER${Date.now()}`,
      name: paperName,
      paperSubjects,
      questions,
      defaultMarks,
      negativeMarking,
      negativeMarks,
      createdAt: paperId ? db.getTestPaper(paperId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (paperId) {
      db.updateTestPaper(paperId, paperData)
    } else {
      db.addTestPaper(paperData)
    }

    router.back()
  }

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0)
  const subjectBreakdown = questions.reduce((acc, q) => {
    if (q.subject) {
      acc[q.subject] = (acc[q.subject] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4 md:mb-6 px-4 md:px-0 mt-12 md:mt-0">
          <button onClick={() => router.back()} className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
            <i className="ph ph-arrow-left text-xl" />
          </button>
          <div className="flex-1">
            <h1 className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.3] tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
              {paperId ? 'Edit Test Paper' : 'Create Test Paper'}
            </h1>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              Build your test with custom questions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                  <i className="ph ph-file-text text-[#8C7B65]" />
                </div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Paper Configuration</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Paper Name</label>
                  <input 
                    type="text" 
                    value={paperName} 
                    onChange={(e) => setPaperName(e.target.value)} 
                    placeholder="e.g., Physics Mock Test 2024" 
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder:text-zinc-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`} 
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Subjects</label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map(sub => (
                      <label 
                        key={sub.id} 
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${paperSubjects.includes(sub.id) ? isDarkMode ? 'bg-[#8C7B65]/20 border-[#8C7B65] text-[#8C7B65]' : 'bg-[#8C7B65]/10 border-[#8C7B65] text-[#8C7B65]' : isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50 text-zinc-400 hover:border-zinc-600' : 'bg-gray-50/50 border-gray-200/50 text-gray-600 hover:border-gray-300'}`}
                      >
                        <input 
                          type="checkbox" 
                          checked={paperSubjects.includes(sub.id)} 
                          onChange={() => handlePaperSubjectToggle(sub.id)} 
                          className="hidden"
                        />
                        {sub.name}
                      </label>
                    ))}
                  </div>
                  <p className={`text-[10px] mt-1.5 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Select one for auto-assignment or multiple for manual selection</p>
                </div>

                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Marking Scheme</span>
                    <button 
                      onClick={applyDefaultMarks}
                      className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${isDarkMode ? 'bg-[#8C7B65]/20 hover:bg-[#8C7B65]/30 text-[#8C7B65]' : 'bg-[#8C7B65]/10 hover:bg-[#8C7B65]/20 text-[#8C7B65]'}`}
                    >
                      <i className="ph ph-check mr-1" />
                      Apply to All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <label className={`block text-[10px] font-medium mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Correct Answer</label>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                          <i className={`ph ph-plus text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                        </div>
                        <input 
                          type="number" 
                          value={defaultMarks} 
                          onChange={(e) => setDefaultMarks(Number(e.target.value))} 
                          min="1" 
                          className={`flex-1 px-2 py-1.5 rounded-md border text-xs ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block text-[10px] font-medium mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Wrong Answer</label>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${negativeMarking ? isDarkMode ? 'bg-red-900/20' : 'bg-red-50' : isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                          <i className={`ph ph-minus text-xs ${negativeMarking ? isDarkMode ? 'text-red-400' : 'text-red-600' : isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
                        </div>
                        <input 
                          type="number" 
                          value={negativeMarks} 
                          onChange={(e) => setNegativeMarks(Number(e.target.value))} 
                          disabled={!negativeMarking}
                          min="0" 
                          step="0.25"
                          className={`flex-1 px-2 py-1.5 rounded-md border text-xs ${negativeMarking ? isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900' : isDarkMode ? 'bg-zinc-800/30 border-zinc-700/30 text-zinc-600' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <label className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors ${isDarkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-gray-100'}`}>
                    <input 
                      type="checkbox" 
                      checked={negativeMarking} 
                      onChange={(e) => setNegativeMarking(e.target.checked)} 
                      className="w-3.5 h-3.5 rounded accent-[#8C7B65]"
                    />
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Enable negative marking for wrong answers</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {questions.map((q, index) => (
                <div 
                  key={q.id} 
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`rounded-xl border p-4 transition-all ${draggedIndex === index ? 'opacity-50' : ''} ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="cursor-grab active:cursor-grabbing">
                        <i className={`ph ph-dots-six-vertical text-lg ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-md ${isDarkMode ? 'bg-[#8C7B65]/20 text-[#8C7B65]' : 'bg-[#8C7B65]/10 text-[#8C7B65]'}`}>
                        Q{index + 1}
                      </span>
                      {paperSubjects.length > 1 && (
                        <select 
                          value={q.subject} 
                          onChange={(e) => updateQuestion(q.id, 'subject', e.target.value)}
                          className={`px-2 py-1 rounded-md border text-xs ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}
                        >
                          <option value="">Select Subject</option>
                          {paperSubjects.map(subId => {
                            const subject = subjects.find(s => s.id === subId)
                            return subject ? <option key={subId} value={subId}>{subject.name}</option> : null
                          })}
                        </select>
                      )}
                      {paperSubjects.length === 1 && (
                        <span className={`text-xs px-2 py-1 rounded-md ${isDarkMode ? 'bg-zinc-800/50 text-zinc-400' : 'bg-gray-100 text-gray-600'}`}>
                          {subjects.find(s => s.id === paperSubjects[0])?.name}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => removeQuestion(q.id)} 
                      disabled={questions.length === 1}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${questions.length === 1 ? 'opacity-30 cursor-not-allowed' : isDarkMode ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                    >
                      <i className="ph ph-trash text-sm" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Question</label>
                      <textarea 
                        value={q.question} 
                        onChange={(e) => updateQuestion(q.id, 'question', e.target.value)} 
                        placeholder="Enter your question here..." 
                        rows={2}
                        className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder:text-zinc-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                      />
                    </div>

                    {q.type === 'mcq' ? (
                      <div>
                        <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Options</label>
                        <div className="space-y-2">
                          {q.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                checked={q.correctOption === optIndex} 
                                onChange={() => updateQuestion(q.id, 'correctOption', optIndex)} 
                                className="w-4 h-4 accent-[#8C7B65]"
                              />
                              <input 
                                type="text" 
                                value={option} 
                                onChange={(e) => updateOption(q.id, optIndex, e.target.value)} 
                                placeholder={`Option ${optIndex + 1}`}
                                className={`flex-1 px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder:text-zinc-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                              />
                            </div>
                          ))}
                        </div>
                        <p className={`text-[10px] mt-1.5 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Select the correct option</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              <button 
                onClick={addQuestion}
                className={`w-full py-3 rounded-xl border-2 border-dashed transition-colors ${isDarkMode ? 'border-zinc-700 hover:border-[#8C7B65] hover:bg-[#8C7B65]/5 text-zinc-400 hover:text-[#8C7B65]' : 'border-gray-300 hover:border-[#8C7B65] hover:bg-[#8C7B65]/5 text-gray-600 hover:text-[#8C7B65]'}`}
              >
                <i className="ph ph-plus mr-2" />
                Add Question
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`rounded-xl border p-5 sticky top-6 ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                  <i className="ph ph-chart-bar text-[#8C7B65]" />
                </div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Overview</h3>
              </div>
              
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Paper Name</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'} truncate ml-2 max-w-[140px]`}>{paperName || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Questions</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{questions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Total Marks</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>{totalMarks}</span>
                </div>
                {negativeMarking && (
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Negative Marks</span>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>-{negativeMarks}</span>
                  </div>
                )}
                
                {Object.keys(subjectBreakdown).length > 0 && (
                  <>
                    <div className={`my-3 border-t ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-200/50'}`} />
                    <div className="space-y-1.5">
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>By Subject</span>
                      {Object.entries(subjectBreakdown).map(([subjectId, count]) => {
                        const subject = subjects.find(s => s.id === subjectId)
                        return subject ? (
                          <div key={subjectId} className="flex justify-between items-center">
                            <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{subject.name}</span>
                            <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>{count}</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  </>
                )}
              </div>

              <div className={`mt-5 pt-5 border-t ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-200/50'}`}>
                <button 
                  onClick={savePaper} 
                  disabled={!paperName || paperSubjects.length === 0 || questions.some(q => !q.subject || !q.question || (q.type === 'mcq' ? q.options.some(o => !o) : !q.correctAnswer))}
                  className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${paperName && paperSubjects.length > 0 && !questions.some(q => !q.subject || !q.question || (q.type === 'mcq' ? q.options.some(o => !o) : !q.correctAnswer)) ? 'bg-[#8C7B65] hover:bg-[#7A6B58] text-white shadow-sm hover:shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  <i className="ph ph-floppy-disk mr-2" />
                  {paperId ? 'Update Paper' : 'Save Paper'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
