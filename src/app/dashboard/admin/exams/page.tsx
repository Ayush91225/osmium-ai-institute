'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StatusChip from '@/components/dashboard/admin/StatusChip'

// Types
interface UploadedFile {
  id: number
  name: string
  size: string
  progress: number
}

// Mock data
const mockTests = [
  { id: 1, name: 'JEE Main Physics Mock Test #15', subject: 'Physics', date: '2024-01-20', questions: 30, duration: 90, students: 245, status: 'Published', isAI: true },
  { id: 2, name: 'NEET Biology Practice Test', subject: 'Biology', date: '2024-01-19', questions: 45, duration: 120, students: 189, status: 'Active', isAI: false },
  { id: 3, name: 'Chemistry Organic Compounds', subject: 'Chemistry', date: '2024-01-18', questions: 25, duration: 60, students: 156, status: 'Draft', isAI: true }
]

const upcomingExams = [
  { id: 1, name: 'Mid-Term Physics Exam', date: '2024-01-25T10:00', duration: 180, students: 234, subject: 'Physics', status: 'Scheduled' },
  { id: 2, name: 'Chemistry Final Assessment', date: '2024-01-26T14:00', duration: 120, students: 198, subject: 'Chemistry', status: 'Scheduled' },
  { id: 3, name: 'Mathematics Quiz', date: '2024-01-24T09:00', duration: 45, students: 167, subject: 'Mathematics', status: 'Live' }
]

export default function ExamsTestsPage() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    setMounted(true)
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
    
    // Simulate upload progress
    newFiles.forEach(file => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadedFiles(prev => 
          prev.map(f => f.id === file.id ? { ...f, progress } : f)
        )
        if (progress >= 100) clearInterval(interval)
      }, 200)
    })
  }

  const removeFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:gap-6 mt-12 md:mt-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 md:mb-6">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 px-4 md:px-0">
                <h1 className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.3] tracking-tight mt-4 transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
                  Exams & Tests
                </h1>
                <StatusChip status="23 Upcoming" variant="info" />
              </div>
              <p className={`text-sm sm:text-base transition-colors duration-200 px-4 md:px-0 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                Manage and monitor all assessments
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button className={`px-4 py-3 rounded-xl text-sm font-medium duration-200 border flex items-center justify-center ${
                isDarkMode
                  ? 'bg-zinc-900/50 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/70 hover:border-zinc-600/70'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
              }`}>
                <i className="ph ph-file-text mr-2 text-sm" />
                Generate Paper Manually
              </button>
              <button className="px-4 py-3 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl text-sm font-medium duration-200 shadow-sm hover:shadow-md flex items-center justify-center">
                <i className="ph ph-plus mr-2 text-sm" />
                Schedule Test
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section - Matching Teachers Page */}
        <div className={`stats transition-colors duration-200 ${
          mounted && isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : ''
        }`}>
          <div className="stat-item">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
                <circle cx="128" cy="128" r="120" fill="#ECE1D1"></circle>
                <polyline points="48 128 72 128 96 64 160 192 184 128 208 128" fill="none" stroke="#8B7355" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <div className={`stat-title transition-colors duration-200 ${
                mounted && isDarkMode ? 'text-zinc-300' : ''
              }`}>
                Total Tests
              </div>
              <div className={`stat-value transition-colors duration-200 ${
                mounted && isDarkMode ? 'text-zinc-100' : ''
              }`}>
                1,247
              </div>
              <span className="stat-extra stat-extra-green transition-colors duration-200">
                +12% vs last month
              </span>
            </div>
          </div>
          <div className={`stat-divider transition-colors duration-200 ${
            mounted && isDarkMode ? 'bg-zinc-700/50' : ''
          }`}></div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
                <circle cx="128" cy="128" r="120" fill="#E8E7D5"></circle>
                <g transform="translate(128,128) scale(0.7) translate(-128,-128)"><path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z" fill="#242929"></path></g>
              </svg>
            </div>
            <div className="stat-content">
              <div className={`stat-title transition-colors duration-200 ${
                mounted && isDarkMode ? 'text-zinc-300' : ''
              }`}>
                Upcoming Tests
              </div>
              <div className={`stat-value transition-colors duration-200 ${
                mounted && isDarkMode ? 'text-zinc-100' : ''
              }`}>
                23
              </div>
              <span className="stat-extra stat-extra-green transition-colors duration-200">
                next 30 days
              </span>
            </div>
          </div>
          <div className={`stat-divider transition-colors duration-200 ${
            mounted && isDarkMode ? 'bg-zinc-700/50' : ''
          }`}></div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
                <circle cx="128" cy="128" r="120" fill="#CFE8E2"></circle>
                <g transform="translate(128,128) scale(0.7) translate(-128,-128)"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208V88H48ZM48,208V104H208V208Z" fill="#89694A"></path></g>
              </svg>
            </div>
            <div className="stat-content">
              <div className={`stat-title transition-colors duration-200 ${
                mounted && isDarkMode ? 'text-zinc-300' : ''
              }`}>
                AI Mock Tests
              </div>
              <div className={`stat-value transition-colors duration-200 ${
                mounted && isDarkMode ? 'text-zinc-100' : ''
              }`}>
                892
              </div>
              <span className="stat-extra stat-extra-green transition-colors duration-200">
                +8% this month
              </span>
            </div>
          </div>
        </div>

        {/* AI-Powered Mock Test Card */}
        <div className={`relative p-6 rounded-xl border overflow-hidden ${
          isDarkMode ? 'bg-gradient-to-r from-amber-900/20 to-orange-900/20 border-amber-800/30' : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200/50'
        }`}>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ph ph-sparkle text-amber-500" />
                  <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded-full">AI-Powered</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>AI-Powered Mock Test</h3>
                <p className={`text-sm mb-4 max-w-md ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                  Just upload your past papers - we'll generate a mock that actually predicts your upcoming exam pattern.
                </p>
                <button 
                  onClick={() => setShowAIModal(true)}
                  className="px-4 py-2 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-all transform active:scale-95"
                >
                  <i className="ph ph-sparkle" />
                  Try now
                </button>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-2 opacity-20">
                  <i className="ph ph-sparkle text-4xl text-amber-500" />
                  <i className="ph ph-sparkle text-2xl text-amber-400" />
                  <i className="ph ph-sparkle text-3xl text-amber-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Generated Mock Tests */}
          <div className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>Generated Mock Tests</h3>
              <button className={`text-sm ${isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-800'}`}>
                View All
              </button>
            </div>

            <div className="space-y-3">
              {mockTests.map(test => (
                <div key={test.id} className={`p-4 rounded-lg border ${
                  isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50/50 border-gray-200/50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium text-sm ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{test.name}</h4>
                      {test.isAI && <i className="ph ph-sparkle text-amber-500 text-xs" />}
                    </div>
                    <StatusChip status={test.status} variant={test.status === 'Published' ? 'success' : test.status === 'Active' ? 'info' : 'default'} />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span>{test.subject}</span>
                    <span>{test.questions} questions</span>
                    <span>{test.duration} min</span>
                    <span>{test.students} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-800'}`}>
                      View
                    </button>
                    <button className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-800'}`}>
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                <i className="ph ph-calendar" />
                Upcoming Scheduled Exams
              </h3>
            </div>

            <div className="space-y-3">
              {upcomingExams.map(exam => (
                <div key={exam.id} className={`p-4 rounded-lg border ${
                  isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50/50 border-gray-200/50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-medium text-sm ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{exam.name}</h4>
                    {exam.status === 'Live' && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-medium">LIVE NOW</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span>{new Date(exam.date).toLocaleDateString()}</span>
                    <span>{exam.duration} min</span>
                    <span>{exam.students} students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <StatusChip status={exam.subject} variant="default" />
                    <div className="flex items-center gap-2">
                      <button className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-800'}`}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal with proper backdrop */}
      {showAIModal && (
        <>
          {/* Backdrop with blur and dim */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowAIModal(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className={`w-full max-w-2xl rounded-xl border ${
              isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
            }`}>
              <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                      <i className="ph ph-sparkle text-amber-500" />
                      AI Mock Test
                    </h3>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Upload at least 5 previous year question papers to generate an AI-powered exam test
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowAIModal(false)}
                    className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'}`}
                  >
                    <i className="ph ph-x" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${
                    dragActive 
                      ? isDarkMode ? 'border-[#8C7B65] bg-[#8C7B65]/5' : 'border-[#8C7B65] bg-[#8C7B65]/5'
                      : isDarkMode ? 'border-zinc-700 bg-zinc-800/30' : 'border-gray-300 bg-gray-50/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <i className={`ph ph-upload text-3xl mb-3 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
                  <p className={`font-medium mb-1 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                    Drag & Drop or Choose file to upload
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Supported format: PDF, DOC, or image files
                  </p>
                  <input 
                    type="file" 
                    multiple 
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label 
                    htmlFor="file-upload"
                    className="inline-block mt-3 px-4 py-2 bg-[#8C7B65] text-white rounded-lg text-sm cursor-pointer hover:bg-[#7A6B58] transition-colors"
                  >
                    Choose Files
                  </label>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mb-6">
                    <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                      Question Papers ({uploadedFiles.length})
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {uploadedFiles.map(file => (
                        <div key={file.id} className={`flex items-center gap-3 p-3 rounded-lg border ${
                          isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50/50 border-gray-200/50'
                        }`}>
                          <i className="ph ph-file-pdf text-red-500" />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                              {file.name}
                            </p>
                            <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                              {file.size}
                            </p>
                            {file.progress < 100 && (
                              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                                <div 
                                  className="bg-[#8C7B65] h-1 rounded-full transition-all"
                                  style={{ width: `${file.progress}%` }}
                                />
                              </div>
                            )}
                          </div>
                          <button 
                            onClick={() => removeFile(file.id)}
                            className={`p-1 rounded ${isDarkMode ? 'text-zinc-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}
                          >
                            <i className="ph ph-trash" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                  <button 
                    onClick={() => setShowAIModal(false)}
                    className={`px-4 py-2 text-sm font-medium ${isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={uploadedFiles.length < 5}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                      uploadedFiles.length >= 5 
                        ? 'bg-[#8C7B65] hover:bg-[#7A6B58] text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <i className="ph ph-sparkle" />
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}