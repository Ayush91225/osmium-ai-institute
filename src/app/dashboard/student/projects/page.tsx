'use client'

import { useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'

const projects = [
  { id: 1, category: 'PYTHON ADVANCED', title: 'AI Chatbot Implementation', date: '12 June, 2025', time: '11:59 PM', status: 'due-soon', description: 'Implement a basic chatbot using NLTK or SpaCy. Submit the .py file and a short documentation PDF.', tags: ['PY', 'PDF'] },
  { id: 2, category: 'DATA STRUCTURES', title: 'Binary Tree Visualizer', date: '15 June, 2025', time: '10:00 AM', status: 'upcoming', description: 'Create a React app that visualizes binary tree insertions. Submit the GitHub repo link in a text file.', tags: ['TXT', 'ZIP'] },
  { id: 3, category: 'UI/UX DESIGN', title: 'E-Commerce Mobile App', date: '10 June, 2025', time: '5:00 PM', status: 'submitted', description: 'Design high-fidelity wireframes for a fashion store app. Submit the Figma export.', tags: ['FIG', 'PNG'] },
  { id: 4, category: 'DATABASE MANAGEMENT', title: 'Hospital Management Schema', date: '20 June, 2025', time: '11:59 PM', status: 'pending', description: 'Design a normalized ER diagram and SQL schema for a hospital system.', tags: ['SQL', 'PDF'] }
]

const history = [
  { id: 1, subject: 'Physics', file: 'physics_lab_report_final.pdf', submitted: 'Today, 9:20 AM', score: '95%', feedback: 'Excellent analysis of the error margin. Well done.', status: 'approved' },
  { id: 2, subject: 'Java Core', file: 'java_inheritance_quiz.zip', submitted: 'Yesterday, 4:30 PM', feedback: 'Pending review by Instructor.', status: 'pending' },
  { id: 3, subject: 'Mathematics', file: 'linear_algebra_homework_3.pdf', submitted: '10 June, 2025', score: '40%', feedback: 'Incorrect file format submitted. Please upload a PDF, not a DOCX.', status: 'rejected' }
]

function ProjectSubmissionsContent() {
  const { isDarkMode } = useDarkMode()
  const [activeTab, setActiveTab] = useState('submissions')
  const [filter, setFilter] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.status === filter)

  const getStatusBadge = (status: string) => {
    const styles = {
      'due-soon': isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700',
      'upcoming': isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700',
      'submitted': isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700',
      'pending': isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
    }
    return styles[status as keyof typeof styles] || ''
  }

  const getTagColor = (tag: string) => {
    const colors: any = {
      'PY': 'bg-[#e7f2f1] text-[#2b7b78]',
      'PDF': 'bg-[#ffeee8] text-[#d4622a]',
      'TXT': 'bg-[#f8f6e8] text-[#8f7300]',
      'ZIP': 'bg-[#f8f6e8] text-[#8f7300]',
      'FIG': 'bg-[#f3e5f5] text-[#7b1fa2]',
      'PNG': 'bg-[#e8f5e9] text-[#2f8a48]',
      'SQL': 'bg-[#eadbff] text-[#5e27c8]'
    }
    return colors[tag] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className={`flex-1 h-screen overflow-y-auto scrollbar-hide p-4 sm:p-6 lg:p-8 ${isDarkMode ? 'bg-zinc-950' : 'bg-[#faf8f6]'}`}>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-[#2e2e2e]'}`}>Project Submission</h1>
            <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-[#8b8b8b]'}`}>Manage and submit your academic assignments</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className={`flex rounded-xl p-1 flex-1 sm:flex-initial ${isDarkMode ? 'bg-zinc-800' : 'bg-[#f5f3f0]'}`}>
              <button onClick={() => setActiveTab('submissions')} className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'submissions' ? isDarkMode ? 'bg-zinc-700 text-white' : 'bg-white text-[#2e2e2e]' : isDarkMode ? 'text-zinc-400' : 'text-[#8b8b8b]'}`}>Submissions</button>
              <button onClick={() => setActiveTab('history')} className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'history' ? isDarkMode ? 'bg-zinc-700 text-white' : 'bg-white text-[#2e2e2e]' : isDarkMode ? 'text-zinc-400' : 'text-[#8b8b8b]'}`}>History</button>
            </div>
            <button className={`px-3 sm:px-4 py-2 rounded-lg border text-sm flex items-center gap-2 ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-[#ebe8e2] text-[#5a5a5a]'}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {activeTab === 'submissions' ? (
          <>
            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
              {['all', 'pending', 'submitted', 'due-soon'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === f ? isDarkMode ? 'bg-white text-black' : 'bg-[#2e2e2e] text-white' : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-[#f0ede8] text-[#5a5a5a]'}`}>
                  {f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map(project => (
                <div key={project.id} className={`rounded-2xl border p-4 sm:p-6 flex flex-col ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-[#f5f3f0]'}`}>
                  <p className={`text-xs font-semibold mb-2 tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-[#8b8b8b]'}`}>{project.category}</p>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-[#2e2e2e]'}`}>{project.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-4 text-sm">
                    <span className={`flex items-center gap-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-[#8b8b8b]'}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {project.date}
                    </span>
                    <span className={`flex items-center gap-1.5 ${isDarkMode ? 'text-zinc-400' : 'text-[#8b8b8b]'}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {project.time}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(project.status)}`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-[#666]'}`}>{project.description}</p>
                  <div className="flex gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className={`px-3 py-1 rounded-lg text-xs font-semibold ${getTagColor(tag)}`}>{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <button className={`flex-1 py-2.5 rounded-lg border text-sm font-medium ${isDarkMode ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-[#ebe8e2] text-[#5a5a5a] hover:bg-gray-50'}`}>View Details</button>
                    <button onClick={() => { setSelectedProject(project); setShowUploadModal(true) }} className={`flex-1 py-2.5 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#2e2e2e] text-white hover:bg-black'}`}>Upload</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* History Section */
          <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-[#f5f3f0]'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-zinc-800' : 'border-[#f0f0f0]'}`}>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-[#2e2e2e]'}`}>Submission History</h2>
            </div>
            {history.map((item, idx) => (
              <div key={item.id} className={`p-4 sm:p-6 flex flex-col sm:flex-row gap-4 ${idx < history.length - 1 ? isDarkMode ? 'border-b border-zinc-800' : 'border-b border-[#f0f0f0]' : ''}`}>
                <div className="flex gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.status === 'approved' ? 'bg-[#e7f2f1]' : item.status === 'pending' ? 'bg-[#f8f6e8]' : 'bg-[#ffebee]'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={item.status === 'approved' ? '#73acf7' : item.status === 'pending' ? '#8f7300' : '#d32f2f'}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-[#2e2e2e]'}`}>
                      {item.subject} {item.score && <span className="ml-2 px-2 py-0.5 bg-[#f0ede8] text-[#5a5a5a] text-xs rounded">SCORE: {item.score}</span>}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-[#8b8b8b]'}`}>{item.file}</p>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-[#8b8b8b]'}`}>Submitted: {item.submitted}</p>
                  </div>
                  <div className="flex-1 max-w-full sm:max-w-xs mt-3 sm:mt-0">
                    <p className={`text-xs mb-1 tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-[#8b8b8b]'}`}>INSTRUCTOR FEEDBACK</p>
                    <p className={`text-sm italic ${isDarkMode ? 'text-zinc-300' : 'text-[#2e2e2e]'}`}>&quot;{item.feedback}&quot;</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-xs font-semibold self-start sm:self-center ${item.status === 'approved' ? 'bg-[#e8f5e9] text-[#2f8a48]' : item.status === 'pending' ? 'bg-[#fff8e6] text-[#b98000]' : 'bg-[#ffebee] text-[#d32f2f]'}`}>
                  {item.status === 'rejected' ? 'Resubmit' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-[#2e2e2e]'}`}>Upload Project</h2>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-[#8b8b8b]'}`}>{selectedProject.category}</p>
              </div>
              <button onClick={() => setShowUploadModal(false)} className={`text-2xl ${isDarkMode ? 'text-zinc-400' : 'text-[#8b8b8b]'}`}>&times;</button>
            </div>
            <div className={`rounded-xl p-5 mb-6 ${isDarkMode ? 'bg-zinc-800' : 'bg-[#f5f3f0]'}`}>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-[#2e2e2e]'}`}>{selectedProject.title}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-[#666]'}`}>{selectedProject.description}</p>
              <div className="flex gap-2 mt-3">
                {selectedProject.tags.map((tag: string) => (
                  <span key={tag} className={`px-2 py-1 rounded text-xs font-semibold ${getTagColor(tag)}`}>{tag}</span>
                ))}
              </div>
            </div>
            <div className={`border-2 border-dashed rounded-xl p-10 text-center mb-6 cursor-pointer ${isDarkMode ? 'border-zinc-700 bg-zinc-800/50' : 'border-[#ebe8e2] bg-[#faf8f6]'}`}>
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${isDarkMode ? 'bg-zinc-700' : 'bg-[#f5f3f0]'}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              </div>
              <p className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#2e2e2e]'}`}>Click to upload or drag and drop</p>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-[#8b8b8b]'}`}>PDF, ZIP, PNG, PY (max. 10MB)</p>
            </div>
            <textarea placeholder="Add any specific comments..." className={`w-full p-3 rounded-lg border mb-6 text-sm ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-white border-[#ebe8e2] text-[#2e2e2e] placeholder-[#8b8b8b]'}`} rows={3}/>
            <div className="flex gap-3">
              <button onClick={() => setShowUploadModal(false)} className={`flex-1 py-3 rounded-lg border font-medium ${isDarkMode ? 'border-zinc-700 text-white hover:bg-zinc-800' : 'border-[#ebe8e2] hover:bg-gray-50'}`}>Cancel</button>
              <button onClick={() => setShowUploadModal(false)} className={`flex-1 py-3 rounded-lg font-medium ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#2e2e2e] text-white hover:bg-black'}`}>Submit Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProjectSubmissionsPage() {
  return (
    <DashboardLayout role="student">
      <ProjectSubmissionsContent />
    </DashboardLayout>
  )
}
