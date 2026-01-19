'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StatusChip from '@/components/dashboard/admin/StatusChip'

const QUESTION_TYPES = [
  { id: 'mcq-single', label: 'Multiple Choice (Single)', icon: 'ph-radio-button' },
  { id: 'mcq-multiple', label: 'Multiple Choice (Multiple)', icon: 'ph-check-square' },
  { id: 'true-false', label: 'True/False', icon: 'ph-toggle-left' },
  { id: 'short-answer', label: 'Short Answer', icon: 'ph-text-aa' },
  { id: 'numerical', label: 'Numerical Answer', icon: 'ph-calculator' }
]

const SUBJECTS = [
  { id: 'physics', label: 'Physics', icon: 'ph-atom' },
  { id: 'chemistry', label: 'Chemistry', icon: 'ph-flask' },
  { id: 'mathematics', label: 'Mathematics', icon: 'ph-function' },
  { id: 'biology', label: 'Biology', icon: 'ph-dna' }
]

export default function TestEditorPage() {
  const router = useRouter()
  const params = useParams()
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  
  const [testData, setTestData] = useState({
    id: params.id || null,
    name: 'Untitled Test',
    subject: '',
    status: 'draft',
    totalMarks: 100,
    duration: { hours: 2, minutes: 0 },
    difficulty: 'medium',
    testType: 'practice',
    passingMarks: 40,
    negativeMarking: false,
    negativeMarksValue: 0.25,
    instructions: '',
    questions: []
  })

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [showResetModal, setShowResetModal] = useState(false)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)

  const autoSaveRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    
    autoSaveRef.current = setInterval(() => {
      if (testData.questions.length > 0) {
        handleAutoSave()
      }
    }, 30000)

    const handleKeyDown = (e) => {
      if (e.key === '?') {
        setShowKeyboardShortcuts(true)
      }
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault()
            handleSave()
            break
          case 'Enter':
            e.preventDefault()
            addQuestion()
            break
          case 'd':
            e.preventDefault()
            duplicateQuestion(activeQuestion)
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [testData])

  const handleAutoSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastSaved(new Date())
    setIsSaving(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLastSaved(new Date())
    setIsSaving(false)
  }

  const handlePublish = async () => {
    if (!validateTest()) return
    
    setIsSaving(true)
    setTestData(prev => ({ ...prev, status: 'published' }))
    await handleSave()
  }

  const validateTest = () => {
    if (!testData.subject) {
      alert('Please select a subject')
      return false
    }
    if (testData.questions.length === 0) {
      alert('Please add at least one question')
      return false
    }
    return true
  }

  const addQuestion = (type = 'mcq-single') => {
    const newQuestion = {
      id: Date.now(),
      type,
      question: '',
      options: type.includes('mcq') ? [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false }
      ] : [],
      correctAnswer: '',
      marks: 1,
      negativeMarks: testData.negativeMarking ? testData.negativeMarksValue : 0,
      difficulty: 'medium',
      tags: [],
      explanation: '',
      timeToSolve: 2
    }
    
    setTestData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }))
    setActiveQuestion(testData.questions.length)
  }

  const updateQuestion = (index, updates) => {
    setTestData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, ...updates } : q
      )
    }))
  }

  const deleteQuestion = (index) => {
    setTestData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }))
    if (activeQuestion >= testData.questions.length - 1) {
      setActiveQuestion(Math.max(0, testData.questions.length - 2))
    }
  }

  const duplicateQuestion = (index) => {
    const question = testData.questions[index]
    const duplicated = { ...question, id: Date.now() }
    setTestData(prev => ({
      ...prev,
      questions: [...prev.questions.slice(0, index + 1), duplicated, ...prev.questions.slice(index + 1)]
    }))
  }

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Sticky Header */}
        <div className={`sticky top-0 z-30 border-b ${
          isDarkMode ? 'bg-zinc-900/95 border-zinc-800 backdrop-blur-sm' : 'bg-white/95 border-gray-200 backdrop-blur-sm'
        }`}>
          <div className="flex items-center justify-between p-4">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/dashboard/admin/exams')}
                className={`p-2 rounded-lg transition-all transform active:scale-95 ${
                  isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <i className="ph ph-arrow-left text-lg" />
              </button>
              
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={testData.name}
                    onChange={(e) => setTestData(prev => ({ ...prev, name: e.target.value }))}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                    className={`text-lg font-semibold bg-transparent border-b-2 border-[#8C7B65] outline-none ${
                      isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                    }`}
                    autoFocus
                  />
                ) : (
                  <h1 
                    className={`text-lg font-semibold cursor-pointer ${
                      isDarkMode ? 'text-zinc-100 hover:text-zinc-200' : 'text-gray-900 hover:text-gray-700'
                    }`}
                    onClick={() => setIsEditing(true)}
                  >
                    {testData.name}
                  </h1>
                )}
                <button 
                  onClick={() => setIsEditing(true)}
                  className={`p-1 rounded transition-all ${
                    isDarkMode ? 'hover:bg-zinc-800 text-zinc-500' : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <i className="ph ph-pencil text-sm" />
                </button>
              </div>
            </div>

            {/* Center */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                {testData.id ? 'Modify Test Paper' : 'Create New Test'}
              </span>
              <StatusChip 
                status={testData.status} 
                variant={testData.status === 'published' ? 'success' : testData.status === 'draft' ? 'warning' : 'default'} 
              />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <select
                value={testData.subject}
                onChange={(e) => setTestData(prev => ({ ...prev, subject: e.target.value }))}
                className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                  isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-700'
                } ${!testData.subject ? 'border-red-300' : ''}`}
              >
                <option value="">Select Subject</option>
                {SUBJECTS.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.label}</option>
                ))}
              </select>

              <button 
                onClick={() => setShowResetModal(true)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all transform active:scale-95 ${
                  isDarkMode ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Reset
              </button>

              <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all transform active:scale-95 ${
                  isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isSaving ? 'Saving...' : 'Save as Draft'}
              </button>

              <button 
                onClick={handlePublish}
                disabled={isSaving || !validateTest()}
                className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all transform active:scale-95 disabled:opacity-50"
              >
                {testData.status === 'published' ? 'Update & Save' : 'Publish'}
              </button>
            </div>
          </div>

          {/* Breadcrumb & Auto-save */}
          <div className="flex items-center justify-between px-4 pb-3">
            <nav className="flex items-center gap-1.5 text-xs">
              <span className={isDarkMode ? 'text-zinc-500' : 'text-gray-400'}>Dashboard</span>
              <i className={`ph ph-caret-right ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
              <span className={isDarkMode ? 'text-zinc-500' : 'text-gray-400'}>Exams & Tests</span>
              <i className={`ph ph-caret-right ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
              <span className={isDarkMode ? 'text-zinc-300' : 'text-gray-700'}>
                {testData.id ? 'Edit Test' : 'Create Test'}
              </span>
            </nav>
            
            {lastSaved && (
              <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                Last saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className={`${leftSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r ${
            isDarkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-gray-200 bg-gray-50/50'
          }`}>
            <div className="p-4 space-y-4 h-full overflow-y-auto">
              {/* Test Configuration */}
              <div className={`p-4 rounded-xl border ${
                isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                  Test Configuration
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Questions</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-zinc-800 text-zinc-200' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {testData.questions.length}
                    </span>
                  </div>

                  <div>
                    <label className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Total Marks</label>
                    <input
                      type="number"
                      value={testData.totalMarks}
                      onChange={(e) => setTestData(prev => ({ ...prev, totalMarks: parseInt(e.target.value) }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-700'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Duration</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="number"
                        value={testData.duration.hours}
                        onChange={(e) => setTestData(prev => ({ 
                          ...prev, 
                          duration: { ...prev.duration, hours: parseInt(e.target.value) }
                        }))}
                        className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                          isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-700'
                        }`}
                        placeholder="Hours"
                      />
                      <input
                        type="number"
                        value={testData.duration.minutes}
                        onChange={(e) => setTestData(prev => ({ 
                          ...prev, 
                          duration: { ...prev.duration, minutes: parseInt(e.target.value) }
                        }))}
                        className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                          isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-700'
                        }`}
                        placeholder="Minutes"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Test Type</label>
                    <select
                      value={testData.testType}
                      onChange={(e) => setTestData(prev => ({ ...prev, testType: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-700'
                      }`}
                    >
                      <option value="practice">Practice Test</option>
                      <option value="mock">Mock Test</option>
                      <option value="final">Final Exam</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Negative Marking</span>
                    <button
                      onClick={() => setTestData(prev => ({ ...prev, negativeMarking: !prev.negativeMarking }))}
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        testData.negativeMarking ? 'bg-[#8C7B65]' : isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform ${
                        testData.negativeMarking ? 'translate-x-5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Navigation */}
              <div className={`p-4 rounded-xl border ${
                isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                  Questions
                </h3>
                
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {testData.questions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => setActiveQuestion(index)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all ${
                        activeQuestion === index
                          ? isDarkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-gray-100 text-gray-900'
                          : isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-300' : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        question.question && question.correctAnswer ? 'bg-green-500' : 
                        question.question ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-sm">Q{index + 1}</span>
                      <span className="text-xs opacity-75 truncate">
                        {question.question || 'Untitled Question'}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => addQuestion()}
                  className="w-full mt-3 px-3 py-2 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-lg text-sm font-medium transition-all transform active:scale-95"
                >
                  <i className="ph ph-plus mr-2" />
                  Add Question
                </button>
              </div>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Action Bar */}
            <div className={`p-4 border-b ${isDarkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => addQuestion()}
                    className="px-3 py-2 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-lg text-sm font-medium transition-all transform active:scale-95"
                  >
                    <i className="ph ph-plus mr-2" />
                    Add Question
                  </button>
                  
                  <button className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all transform active:scale-95 ${
                    isDarkMode ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}>
                    <i className="ph ph-divide mr-2" />
                    Add Section
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                    className={`p-2 rounded-lg transition-all ${
                      isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ph ph-sidebar text-lg" />
                  </button>
                  
                  <button
                    onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                    className={`p-2 rounded-lg transition-all ${
                      isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ph ph-eye text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* Questions Editor */}
            <div className="flex-1 overflow-y-auto p-4">
              {testData.questions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                    isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'
                  }`}>
                    <i className={`ph ph-question text-3xl ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                    Create your first question
                  </h3>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Start building your test by adding questions
                  </p>
                  <button
                    onClick={() => addQuestion()}
                    className="px-4 py-2 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-lg text-sm font-medium transition-all transform active:scale-95"
                  >
                    <i className="ph ph-plus mr-2" />
                    Add Question
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {testData.questions.map((question, index) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      index={index}
                      isActive={activeQuestion === index}
                      isDarkMode={isDarkMode}
                      onUpdate={(updates) => updateQuestion(index, updates)}
                      onDelete={() => deleteQuestion(index)}
                      onDuplicate={() => duplicateQuestion(index)}
                      onClick={() => setActiveQuestion(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Preview */}
          <div className={`${rightSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-l ${
            isDarkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-gray-200 bg-gray-50/50'
          }`}>
            <div className="p-4 space-y-4 h-full overflow-y-auto">
              <div className={`p-4 rounded-xl border ${
                isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                  Test Statistics
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Total Questions</span>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
                      {testData.questions.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Complete</span>
                    <span className={`text-sm font-medium text-green-500`}>
                      {testData.questions.filter(q => q.question && q.correctAnswer).length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Total Marks</span>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
                      {testData.questions.reduce((sum, q) => sum + (q.marks || 0), 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Validation Checklist */}
              <div className={`p-4 rounded-xl border ${
                isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                  Validation Checklist
                </h3>
                
                <div className="space-y-2">
                  {[
                    { label: 'Subject selected', valid: !!testData.subject },
                    { label: 'At least 1 question', valid: testData.questions.length > 0 },
                    { label: 'All questions complete', valid: testData.questions.every(q => q.question && q.correctAnswer) },
                    { label: 'Test duration set', valid: testData.duration.hours > 0 || testData.duration.minutes > 0 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <i className={`ph ${item.valid ? 'ph-check text-green-500' : 'ph-x text-red-500'} text-sm`} />
                      <span className={`text-xs ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showResetModal && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowResetModal(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
              <div className={`w-full max-w-md rounded-xl border shadow-2xl ${
                isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
              }`}>
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                    Reset Test
                  </h3>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Are you sure? All unsaved changes will be lost.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowResetModal(false)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                        isDarkMode ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setTestData({
                          ...testData,
                          name: 'Untitled Test',
                          questions: []
                        })
                        setShowResetModal(false)
                      }}
                      className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {showKeyboardShortcuts && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowKeyboardShortcuts(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
              <div className={`w-full max-w-md rounded-xl border shadow-2xl ${
                isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
              }`}>
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                    Keyboard Shortcuts
                  </h3>
                  <div className="space-y-2">
                    {[
                      { keys: 'Ctrl/Cmd + S', action: 'Save' },
                      { keys: 'Ctrl/Cmd + Enter', action: 'Add Question' },
                      { keys: 'Ctrl/Cmd + D', action: 'Duplicate Question' },
                      { keys: '?', action: 'Show Shortcuts' }
                    ].map((shortcut, index) => (
                      <div key={index} className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          {shortcut.action}
                        </span>
                        <kbd className={`px-2 py-1 rounded text-xs font-mono ${
                          isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {shortcut.keys}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

function QuestionCard({ question, index, isActive, isDarkMode, onUpdate, onDelete, onDuplicate, onClick }) {
  const [showOptions, setShowOptions] = useState(false)

  const addOption = () => {
    const newOption = {
      id: Date.now(),
      text: '',
      isCorrect: false
    }
    onUpdate({
      options: [...question.options, newOption]
    })
  }

  const updateOption = (optionId, updates) => {
    onUpdate({
      options: question.options.map(opt => 
        opt.id === optionId ? { ...opt, ...updates } : opt
      )
    })
  }

  const deleteOption = (optionId) => {
    onUpdate({
      options: question.options.filter(opt => opt.id !== optionId)
    })
  }

  return (
    <div 
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        isActive 
          ? isDarkMode ? 'border-[#8C7B65] bg-zinc-900/80' : 'border-[#8C7B65] bg-white'
          : isDarkMode ? 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80' : 'border-gray-200 bg-white hover:shadow-md'
      }`}
      onClick={onClick}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#8C7B65] text-white rounded-full flex items-center justify-center text-xs font-medium">
            {index + 1}
          </div>
          
          <select
            value={question.type}
            onChange={(e) => onUpdate({ type: e.target.value })}
            className={`px-3 py-1 rounded-lg border text-sm ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-700'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {QUESTION_TYPES.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowOptions(!showOptions)
              }}
              className={`p-1 rounded transition-all ${
                isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <i className="ph ph-dots-three text-lg" />
            </button>
            
            {showOptions && (
              <div className={`absolute right-0 top-8 w-48 rounded-lg border shadow-lg z-10 ${
                isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
              }`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDuplicate()
                    setShowOptions(false)
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-opacity-50 ${
                    isDarkMode ? 'hover:bg-zinc-800 text-zinc-300' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <i className="ph ph-copy mr-2" />
                  Duplicate Question
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                    setShowOptions(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                >
                  <i className="ph ph-trash mr-2" />
                  Delete Question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="space-y-4">
        <div>
          <label className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            Question Text
          </label>
          <textarea
            value={question.question}
            onChange={(e) => onUpdate({ question: e.target.value })}
            placeholder="Enter your question here..."
            className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm resize-none ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-700'
            }`}
            rows={3}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Answer Options based on question type */}
        {question.type.includes('mcq') && (
          <div>
            <label className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              Answer Options
            </label>
            <div className="mt-2 space-y-2">
              {question.options.map((option, optIndex) => (
                <div key={option.id} className="flex items-center gap-3">
                  <input
                    type={question.type === 'mcq-single' ? 'radio' : 'checkbox'}
                    name={`question-${question.id}`}
                    checked={option.isCorrect}
                    onChange={(e) => {
                      if (question.type === 'mcq-single') {
                        onUpdate({
                          options: question.options.map(opt => ({
                            ...opt,
                            isCorrect: opt.id === option.id ? e.target.checked : false
                          }))
                        })
                      } else {
                        updateOption(option.id, { isCorrect: e.target.checked })
                      }
                    }}
                    className="text-[#8C7B65]"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + optIndex)}
                  </span>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => updateOption(option.id, { text: e.target.value })}
                    placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                      isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-700'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {question.options.length > 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteOption(option.id)
                      }}
                      className={`p-1 rounded transition-all ${
                        isDarkMode ? 'hover:bg-zinc-800 text-zinc-500' : 'hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      <i className="ph ph-x text-sm" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  addOption()
                }}
                className={`w-full px-3 py-2 border-2 border-dashed rounded-lg text-sm transition-all ${
                  isDarkMode ? 'border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <i className="ph ph-plus mr-2" />
                Add Option
              </button>
            </div>
          </div>
        )}

        {/* Marks and Settings */}
        <div className="flex items-center gap-4">
          <div>
            <label className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Marks</label>
            <input
              type="number"
              value={question.marks}
              onChange={(e) => onUpdate({ marks: parseInt(e.target.value) })}
              className={`w-20 mt-1 px-2 py-1 rounded border text-sm ${
                isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-700'
              }`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div>
            <label className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Difficulty</label>
            <select
              value={question.difficulty}
              onChange={(e) => onUpdate({ difficulty: e.target.value })}
              className={`mt-1 px-2 py-1 rounded border text-sm ${
                isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-300 text-gray-700'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}