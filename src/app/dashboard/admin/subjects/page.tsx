'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { getDatabase, Subject, Class } from '@/lib/database'
import AddSubjectModal from '@/components/dashboard/admin/AddSubjectModal'

export default function SubjectsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isDarkMode } = useDarkMode()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  useEffect(() => {
    const db = getDatabase()
    setSubjects(db.getSubjects())
    setClasses(db.getClasses())
    const unsub1 = db.subscribe('subjects', () => setSubjects(db.getSubjects()))
    const unsub2 = db.subscribe('classes', () => setClasses(db.getClasses()))
    
    if (searchParams.get('openModal') === 'true') {
      setIsAddModalOpen(true)
      router.replace('/dashboard/admin/subjects')
    }
    
    return () => { unsub1(); unsub2() }
  }, [searchParams, router])

  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {
      const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) || subject.code.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesClass = !selectedClass || classes.find(c => c.id === selectedClass)?.subjects.includes(subject.id)
      return matchesSearch && matchesClass
    })
  }, [subjects, searchTerm, selectedClass, classes])
  
  const stats = useMemo(() => {
    const total = subjects.length
    const complete = subjects.filter(s => s.syllabus?.length && s.curriculumFiles?.length).length
    const incomplete = total - complete
    return { total, complete, incomplete }
  }, [subjects])

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 mt-12 md:mt-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Libre Baskerville, serif' }}>Subjects</h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{stats.total} total • {stats.complete} complete • {stats.incomplete} incomplete</p>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2.5 bg-gradient-to-r from-[#8C7B65] to-[#A0906F] hover:from-[#7A6B58] hover:to-[#8E7E5F] text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg shadow-[#8C7B65]/20 flex items-center gap-2">
            <i className="ph ph-plus" />Add Subject
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Subjects', value: stats.total, icon: 'ph-book-open' },
            { label: 'Complete', value: stats.complete, icon: 'ph-check-circle' },
            { label: 'Incomplete', value: stats.incomplete, icon: 'ph-warning-circle' }
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
                  <i className={`ph ${stat.icon} text-xl ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <div className="p-4 space-y-4">
            <div className="relative">
              <i className={`ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`} />
              <input type="text" placeholder="Search subjects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'}`} />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className={`px-3 py-2 rounded-lg border text-sm focus:outline-none ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' : 'bg-gray-50 border-gray-200 text-gray-900'}`}>
                <option value="">All Classes</option>
                {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
              </select>
              <div className={`flex rounded-lg border overflow-hidden ${isDarkMode ? 'border-zinc-700/50 bg-zinc-800/30' : 'border-gray-200 bg-gray-50'}`}>
                <button onClick={() => setViewMode('grid')} className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-[#8C7B65] text-white' : isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-900'}`}>
                  <i className="ph ph-squares-four" />
                </button>
                <button onClick={() => setViewMode('table')} className={`px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-[#8C7B65] text-white' : isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-900'}`}>
                  <i className="ph ph-table" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubjects.map(subject => {
              const subjectClasses = classes.filter(c => c.subjects.includes(subject.id))
              const isIncomplete = !subject.syllabus?.length || !subject.curriculumFiles?.length
              return (
                <div key={subject.id} onClick={() => router.push(`/dashboard/admin/subjects/${subject.id}`)} className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 hover:shadow-md group ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900/70 hover:border-zinc-700/70' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                        <i className="ph ph-book-open text-lg text-[#8C7B65]" />
                      </div>
                      <div>
                        <h3 className={`font-medium text-sm ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{subject.name}</h3>
                        <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{subject.code}</p>
                      </div>
                    </div>
                    {isIncomplete && <span className={`px-2 py-0.5 text-xs rounded-md ${isDarkMode ? 'bg-yellow-500/10 text-yellow-500' : 'bg-yellow-50 text-yellow-600'}`}>Incomplete</span>}
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {subjectClasses.slice(0, 2).map(cls => <span key={cls.id} className={`px-2 py-1 text-xs rounded-md ${isDarkMode ? 'bg-zinc-800/50 text-zinc-300' : 'bg-gray-100 text-gray-600'}`}>{cls.name}</span>)}
                      {subjectClasses.length > 2 && <span className={`px-2 py-1 text-xs rounded-md ${isDarkMode ? 'bg-zinc-800/50 text-zinc-300' : 'bg-gray-100 text-gray-600'}`}>+{subjectClasses.length - 2}</span>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-500'}>{subjectClasses.length} class{subjectClasses.length !== 1 ? 'es' : ''}</span>
                    <i className="ph ph-arrow-right text-xs" />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
            <table className="w-full">
              <thead className={`text-xs font-medium ${isDarkMode ? 'bg-zinc-800/50 text-zinc-400' : 'bg-gray-50 text-gray-600'}`}>
                <tr>
                  <th className="text-left px-4 py-3">Subject</th>
                  <th className="text-left px-4 py-3">Code</th>
                  <th className="text-left px-4 py-3">Hours/Week</th>
                  <th className="text-left px-4 py-3">Classes</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredSubjects.map(subject => {
                  const subjectClasses = classes.filter(c => c.subjects.includes(subject.id))
                  const isIncomplete = !subject.syllabus?.length || !subject.curriculumFiles?.length
                  return (
                    <tr key={subject.id} className={`border-t cursor-pointer ${isDarkMode ? 'border-zinc-800/40 hover:bg-zinc-800/30' : 'border-gray-200/60 hover:bg-gray-50'}`} onClick={() => router.push(`/dashboard/admin/subjects/${subject.id}`)}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#8C7B65]/20' : 'bg-[#8C7B65]/10'}`}>
                            <i className="ph ph-book-open text-sm text-[#8C7B65]" />
                          </div>
                          <span className={`font-medium ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{subject.name}</span>
                        </div>
                      </td>
                      <td className={`px-4 py-3 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{subject.code}</td>
                      <td className={`px-4 py-3 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{subject.credits}h</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {subjectClasses.slice(0, 2).map(cls => <span key={cls.id} className={`px-2 py-0.5 text-xs rounded ${isDarkMode ? 'bg-zinc-800/50 text-zinc-300' : 'bg-gray-100 text-gray-600'}`}>{cls.name}</span>)}
                          {subjectClasses.length > 2 && <span className={`px-2 py-0.5 text-xs rounded ${isDarkMode ? 'bg-zinc-800/50 text-zinc-300' : 'bg-gray-100 text-gray-600'}`}>+{subjectClasses.length - 2}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {isIncomplete ? (
                          <span className={`px-2 py-0.5 text-xs rounded ${isDarkMode ? 'bg-yellow-500/10 text-yellow-500' : 'bg-yellow-50 text-yellow-600'}`}>Incomplete</span>
                        ) : (
                          <span className={`px-2 py-0.5 text-xs rounded ${isDarkMode ? 'bg-green-500/10 text-green-500' : 'bg-green-50 text-green-600'}`}>Complete</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/admin/subjects/${subject.id}`) }} className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'hover:bg-zinc-700/50 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                          <i className="ph ph-arrow-right" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <AddSubjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </DashboardLayout>
  )
}
