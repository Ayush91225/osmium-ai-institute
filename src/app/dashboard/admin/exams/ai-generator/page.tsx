'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import { getDatabase } from '@/lib/database'
import '@/assets/css/dashboard/admin.css'

type Tab = 'upload' | 'syllabus' | 'topics'

interface UploadedFile {
  id: number
  name: string
  size: string
  progress: number
}

export default function AIGeneratorPage() {
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('upload')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [subjects, setSubjects] = useState<any[]>([])
  
  const [selectedSubject, setSelectedSubject] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [questionCount, setQuestionCount] = useState(30)
  const [duration, setDuration] = useState(60)
  const [negativeMark, setNegativeMark] = useState(true)
  const [negativeMarkValue, setNegativeMarkValue] = useState(0.25)
  const [shuffleQuestions, setShuffleQuestions] = useState(true)
  const [showSolutions, setShowSolutions] = useState(true)
  const [marksPerQuestion, setMarksPerQuestion] = useState(4)
  
  const [manualTopics, setManualTopics] = useState('')
  const [topicsList, setTopicsList] = useState<string[]>([])
  const [testName, setTestName] = useState('')
  const [completion, setCompletion] = useState('')
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
    const db = getDatabase()
    if (db) {
      setSubjects(db.getSubjects())
    }
  }, [])

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    const newFiles: UploadedFile[] = Array.from(files).map((file: File) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      progress: 0
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
    newFiles.forEach(file => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadedFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress } : f))
        if (progress >= 100) clearInterval(interval)
      }, 200)
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files)
  }

  const addTopic = () => {
    if (manualTopics.trim()) {
      setTopicsList(prev => [...prev, manualTopics.trim()])
      setManualTopics('')
      setCompletion('')
    }
  }

  const handleTopicInput = (value: string) => {
    setManualTopics(value)
    
    if (debounceTimer) clearTimeout(debounceTimer)
    
    if (value.trim().length > 1) {
      const timer = setTimeout(async () => {
        try {
          const response = await fetch(`https://api.datamuse.com/sug?s=${encodeURIComponent(value)}&max=5`)
          const data = await response.json()
          console.log('API response:', data)
          if (data.length > 0) {
            const match = data.find((item: any) => 
              item.word.toLowerCase().startsWith(value.toLowerCase())
            )
            if (match) {
              const capitalized = match.word.charAt(0).toUpperCase() + match.word.slice(1)
              setCompletion(capitalized)
            } else {
              setCompletion('')
            }
          } else {
            setCompletion('')
          }
        } catch (error) {
          console.error('API error:', error)
          setCompletion('')
        }
      }, 300)
      setDebounceTimer(timer)
    } else {
      setCompletion('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && completion) {
      e.preventDefault()
      setManualTopics(completion)
      setCompletion('')
    } else if (e.key === 'Enter') {
      addTopic()
    }
  }

  if (!mounted) return null

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4 md:mb-6 px-4 md:px-0 mt-12 md:mt-0">
          <button onClick={() => router.back()} className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
            <i className="ph ph-arrow-left text-xl" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.3] tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
                AI Test Generator
              </h1>
              <i className="ph ph-sparkle text-amber-500 text-2xl" />
            </div>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              Generate intelligent MCQ tests powered by AI
            </p>
          </div>
        </div>

        <div className={`rounded-2xl border p-6 ${isDarkMode ? 'bg-[#EBEBE2]/5 border-zinc-800/40' : 'bg-[#EBEBE2]/30 border-gray-200/60'}`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
              <i className="ph ph-lightbulb text-[#8C7B65] text-2xl" />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>AI-Powered MCQ Generation</h3>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Our AI analyzes patterns from previous papers or syllabus to generate high-quality multiple-choice questions with intelligent distractors and detailed solutions.
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <div className={`flex border-b ${isDarkMode ? 'border-zinc-800/40' : 'border-gray-200/60'}`}>
            {[
              { id: 'upload', label: 'Upload PYQs', icon: 'ph-upload', desc: 'From past papers' },
              { id: 'syllabus', label: 'From Syllabus', icon: 'ph-book-open', desc: 'Subject-based' },
              { id: 'topics', label: 'Custom Topics', icon: 'ph-list-bullets', desc: 'Manual entry' }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as Tab)} className={`flex-1 px-4 py-4 text-sm font-medium transition-all ${activeTab === tab.id ? isDarkMode ? 'text-[#8C7B65] border-b-2 border-[#8C7B65] bg-zinc-800/30' : 'text-[#8C7B65] border-b-2 border-[#8C7B65] bg-gray-50/50' : isDarkMode ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/30'}`}>
                <div className="flex flex-col items-center gap-1">
                  <i className={`ph ${tab.icon} text-xl`} />
                  <span className="font-medium">{tab.label}</span>
                  <span className={`text-xs ${activeTab === tab.id ? 'opacity-70' : 'opacity-50'}`}>{tab.desc}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Test Name</label>
                  <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="e.g., JEE Main Mock Test 2024" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder:text-zinc-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`} />
                </div>

                <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive ? isDarkMode ? 'border-[#8C7B65] bg-[#8C7B65]/5' : 'border-[#8C7B65] bg-[#8C7B65]/5' : isDarkMode ? 'border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700/50' : 'border-gray-200/50 bg-gray-50/30 hover:border-gray-300/50'}`}>
                  <i className={`ph ph-upload-simple text-3xl mb-3 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
                  <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Drop files or click to upload</p>
                  <p className={`text-xs mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>PDF, DOC, or images • Min 5 files</p>
                  <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => handleFileUpload(e.target.files)} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="inline-flex items-center gap-2 px-4 py-2 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-lg text-xs font-medium cursor-pointer transition-all">
                    <i className="ph ph-plus" />
                    Choose Files
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <>
                    <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Uploaded Files</h3>
                        <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{uploadedFiles.length} files</span>
                      </div>
                      <div className="space-y-2">
                        {uploadedFiles.map(file => (
                          <div key={file.id} className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800/50 border-zinc-800/50 hover:border-zinc-700/50' : 'bg-gray-50/50 border-gray-200/50 hover:border-gray-300/50'}`}>
                            <i className="ph ph-file-pdf text-red-500 text-lg" />
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>{file.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{file.size}</p>
                                {file.progress === 100 && (
                                  <span className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>• Ready</span>
                                )}
                              </div>
                              {file.progress < 100 && (
                                <div className={`w-full rounded-full h-1 mt-1.5 ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'}`}>
                                  <div className="bg-[#8C7B65] h-1 rounded-full transition-all" style={{ width: `${file.progress}%` }} />
                                </div>
                              )}
                            </div>
                            <button onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))} className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'text-zinc-500 hover:text-red-400 hover:bg-red-500/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}>
                              <i className="ph ph-x text-sm" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          <i className="ph ph-target mr-1" />
                          Difficulty Level
                        </label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                          <option value="mixed">Mixed (Recommended)</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          <i className="ph ph-question mr-1" />
                          Number of MCQs
                        </label>
                        <input type="number" value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} min="10" max="100" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          <i className="ph ph-clock mr-1" />
                          Duration (minutes)
                        </label>
                        <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min="30" max="180" step="15" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                      </div>
                    </div>

                    <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                      <h4 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                        <i className="ph ph-gear-six" />
                        Advanced Settings
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Marks per Question</label>
                          <input type="number" value={marksPerQuestion} onChange={(e) => setMarksPerQuestion(Number(e.target.value))} min="1" max="10" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Negative Marking</label>
                          <div className="flex gap-2">
                            <select value={negativeMark ? 'yes' : 'no'} onChange={(e) => setNegativeMark(e.target.value === 'yes')} className={`flex-1 px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                            {negativeMark && (
                              <input type="number" value={negativeMarkValue} onChange={(e) => setNegativeMarkValue(Number(e.target.value))} min="0" max="1" step="0.25" className={`w-24 px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={shuffleQuestions} onChange={(e) => setShuffleQuestions(e.target.checked)} className="w-5 h-5 rounded accent-[#8C7B65]" />
                          <div>
                            <span className={`text-sm font-medium block ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Shuffle Questions</span>
                            <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Randomize question order</span>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={showSolutions} onChange={(e) => setShowSolutions(e.target.checked)} className="w-5 h-5 rounded accent-[#8C7B65]" />
                          <div>
                            <span className={`text-sm font-medium block ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Include Solutions</span>
                            <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Show detailed explanations</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={`flex items-center justify-between gap-3 pt-6 border-t ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-200/50'}`}>
                      <div className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                        Total Marks: <span className="font-semibold">{questionCount * marksPerQuestion}</span>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setUploadedFiles([])} className={`px-4 py-3 rounded-xl text-sm font-medium border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/70' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                          <i className="ph ph-trash mr-2" />
                          Clear All
                        </button>
                        <button disabled={uploadedFiles.length < 5} className={`px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition-all ${uploadedFiles.length >= 5 ? 'bg-[#8C7B65] hover:bg-[#7A6B58] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'}`}>
                          <i className="ph ph-sparkle" />
                          Generate MCQ Test
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Test Name</label>
                    <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="e.g., Physics Chapter 1 Test" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder:text-zinc-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      <i className="ph ph-book-open mr-1" />
                      Select Subject
                    </label>
                    <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}>
                      <option value="">Choose a subject...</option>
                      {subjects.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                    </select>
                  </div>
                </div>

                {selectedSubject && selectedSubjectData?.syllabus && (
                  <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                    <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                      <i className="ph ph-list-checks" />
                      Syllabus Topics ({selectedSubjectData.syllabus.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubjectData.syllabus.map((topic: any, i: number) => (
                        <span key={i} className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${isDarkMode ? 'bg-zinc-700/50 text-zinc-300' : 'bg-white text-gray-700 border border-gray-200'}`}>
                          <i className="ph ph-check-circle text-green-500" />
                          {topic.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSubject && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          <i className="ph ph-target mr-1" />
                          Difficulty Level
                        </label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                          <option value="mixed">Mixed (Recommended)</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          <i className="ph ph-question mr-1" />
                          Number of MCQs
                        </label>
                        <input type="number" value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} min="10" max="100" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          <i className="ph ph-clock mr-1" />
                          Duration (minutes)
                        </label>
                        <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min="30" max="180" step="15" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                      </div>
                    </div>

                    <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                      <h4 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                        <i className="ph ph-gear-six" />
                        Advanced Settings
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Marks per Question</label>
                          <input type="number" value={marksPerQuestion} onChange={(e) => setMarksPerQuestion(Number(e.target.value))} min="1" max="10" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Negative Marking</label>
                          <div className="flex gap-2">
                            <select value={negativeMark ? 'yes' : 'no'} onChange={(e) => setNegativeMark(e.target.value === 'yes')} className={`flex-1 px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                            {negativeMark && (
                              <input type="number" value={negativeMarkValue} onChange={(e) => setNegativeMarkValue(Number(e.target.value))} min="0" max="1" step="0.25" className={`w-24 px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={shuffleQuestions} onChange={(e) => setShuffleQuestions(e.target.checked)} className="w-5 h-5 rounded accent-[#8C7B65]" />
                          <div>
                            <span className={`text-sm font-medium block ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Shuffle Questions</span>
                            <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Randomize question order</span>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={showSolutions} onChange={(e) => setShowSolutions(e.target.checked)} className="w-5 h-5 rounded accent-[#8C7B65]" />
                          <div>
                            <span className={`text-sm font-medium block ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Include Solutions</span>
                            <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Show detailed explanations</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={`flex items-center justify-between gap-3 pt-6 border-t ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-200/50'}`}>
                      <div className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                        Total Marks: <span className="font-semibold">{questionCount * marksPerQuestion}</span>
                      </div>
                      <button className="px-6 py-3 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                        <i className="ph ph-sparkle" />
                        Generate from Syllabus
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'topics' && (
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Test Name</label>
                  <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="e.g., Custom Topic Test" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder:text-zinc-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`} />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                    Enter Topics <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>(Press Tab to autocomplete)</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        value={manualTopics} 
                        onChange={(e) => handleTopicInput(e.target.value)} 
                        onKeyDown={handleKeyDown}
                        placeholder="Start typing..." 
                        className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200 placeholder:text-zinc-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`} 
                      />
                      {completion && manualTopics && (
                        <div className={`absolute left-4 top-3 pointer-events-none text-sm ${isDarkMode ? 'text-zinc-600' : 'text-gray-300'}`}>
                          <span className="invisible">{manualTopics}</span><span className="font-medium">{completion.slice(manualTopics.length)}</span>
                        </div>
                      )}
                    </div>
                    <button onClick={addTopic} disabled={!manualTopics.trim()} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${manualTopics.trim() ? 'bg-[#8C7B65] hover:bg-[#7A6B58] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                      <i className="ph ph-plus" />
                      Add
                    </button>
                  </div>
                </div>

                {topicsList.length > 0 && (
                  <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                    <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                      <i className="ph ph-list-checks" />
                      Selected Topics ({topicsList.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {topicsList.map((topic, i) => (
                        <span key={i} className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${isDarkMode ? 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700' : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'}`}>
                          {topic}
                          <button onClick={() => setTopicsList(prev => prev.filter((_, idx) => idx !== i))} className="hover:text-red-500 transition-colors">
                            <i className="ph ph-x text-sm" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {topicsList.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          <i className="ph ph-target mr-1" />
                          Difficulty Level
                        </label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                          <option value="mixed">Mixed (Recommended)</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          <i className="ph ph-question mr-1" />
                          Number of MCQs
                        </label>
                        <input type="number" value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} min="10" max="100" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          <i className="ph ph-clock mr-1" />
                          Duration (minutes)
                        </label>
                        <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min="30" max="180" step="15" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                      </div>
                    </div>

                    <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50 border-gray-200'}`}>
                      <h4 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                        <i className="ph ph-gear-six" />
                        Advanced Settings
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Marks per Question</label>
                          <input type="number" value={marksPerQuestion} onChange={(e) => setMarksPerQuestion(Number(e.target.value))} min="1" max="10" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Negative Marking</label>
                          <div className="flex gap-2">
                            <select value={negativeMark ? 'yes' : 'no'} onChange={(e) => setNegativeMark(e.target.value === 'yes')} className={`flex-1 px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`}>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                            {negativeMark && (
                              <input type="number" value={negativeMarkValue} onChange={(e) => setNegativeMarkValue(Number(e.target.value))} min="0" max="1" step="0.25" className={`w-24 px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200' : 'bg-white border-gray-200 text-gray-900'}`} />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={shuffleQuestions} onChange={(e) => setShuffleQuestions(e.target.checked)} className="w-5 h-5 rounded accent-[#8C7B65]" />
                          <div>
                            <span className={`text-sm font-medium block ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Shuffle Questions</span>
                            <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Randomize question order</span>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={showSolutions} onChange={(e) => setShowSolutions(e.target.checked)} className="w-5 h-5 rounded accent-[#8C7B65]" />
                          <div>
                            <span className={`text-sm font-medium block ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Include Solutions</span>
                            <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Show detailed explanations</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={`flex items-center justify-between gap-3 pt-6 border-t ${isDarkMode ? 'border-zinc-800/50' : 'border-gray-200/50'}`}>
                      <div className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                        Total Marks: <span className="font-semibold">{questionCount * marksPerQuestion}</span>
                      </div>
                      <button className="px-6 py-3 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                        <i className="ph ph-sparkle" />
                        Generate from Topics
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
