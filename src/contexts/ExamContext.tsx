'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'

export interface Exam {
  id: string
  name: string
  subject: string
  subjectId?: string
  classId?: string
  className?: string
  teacherId?: string
  teacherName?: string
  date: string
  questions: number
  duration: number
  students: number
  totalMarks: number
  status: 'Published' | 'Active' | 'Draft' | 'Scheduled' | 'Live' | 'Completed'
  isAI: boolean
  type: 'exam' | 'quiz' | 'mock' | 'assignment'
  createdAt: string
  createdBy: string
  updatedAt: string
}

interface ExamState {
  exams: Exam[]
  searchTerm: string
  selectedSubject: string
  selectedStatus: string
  selectedClass: string
  viewMode: 'grid' | 'table'
  currentPage: number
  itemsPerPage: number
  filteredExams: Exam[]
  paginatedExams: Exam[]
  totalPages: number
  stats: {
    total: number
    upcoming: number
    aiGenerated: number
    totalParticipants: number
  }
}

interface ExamActions {
  addExam: (exam: Exam) => void
  updateExam: (id: string, updates: Partial<Exam>) => void
  deleteExam: (id: string) => void
  setSearchTerm: (term: string) => void
  setSelectedSubject: (subject: string) => void
  setSelectedStatus: (status: string) => void
  setSelectedClass: (cls: string) => void
  setViewMode: (mode: 'grid' | 'table') => void
  setCurrentPage: (page: number) => void
  resetFilters: () => void
}

type ExamContextType = ExamState & ExamActions

const ExamContext = createContext<ExamContextType | undefined>(undefined)

const mockExams: Exam[] = [
  { id: '1', name: 'JEE Main Physics Mock Test #15', subject: 'Physics', date: '2024-01-20', questions: 30, duration: 90, students: 245, totalMarks: 120, status: 'Published', isAI: true, type: 'mock', createdAt: '2024-01-15', createdBy: 'Admin', updatedAt: '2024-01-15' },
  { id: '2', name: 'NEET Biology Practice Test', subject: 'Biology', date: '2024-01-19', questions: 45, duration: 120, students: 189, totalMarks: 180, status: 'Active', isAI: false, type: 'exam', createdAt: '2024-01-14', createdBy: 'Admin', updatedAt: '2024-01-14' },
  { id: '3', name: 'Chemistry Organic Compounds', subject: 'Chemistry', date: '2024-01-18', questions: 25, duration: 60, students: 156, totalMarks: 100, status: 'Draft', isAI: true, type: 'quiz', createdAt: '2024-01-13', createdBy: 'Admin', updatedAt: '2024-01-13' },
  { id: '4', name: 'Mid-Term Physics Exam', subject: 'Physics', date: '2024-01-25', questions: 50, duration: 180, students: 234, totalMarks: 200, status: 'Scheduled', isAI: false, type: 'exam', createdAt: '2024-01-12', createdBy: 'Admin', updatedAt: '2024-01-12' },
  { id: '5', name: 'Mathematics Quiz', subject: 'Mathematics', date: '2024-01-24', questions: 20, duration: 45, students: 167, totalMarks: 80, status: 'Live', isAI: false, type: 'quiz', createdAt: '2024-01-11', createdBy: 'Admin', updatedAt: '2024-01-11' },
  { id: '6', name: 'Chemistry Final Assessment', subject: 'Chemistry', date: '2024-01-26', questions: 40, duration: 120, students: 198, totalMarks: 160, status: 'Scheduled', isAI: true, type: 'exam', createdAt: '2024-01-10', createdBy: 'Admin', updatedAt: '2024-01-10' }
]

export function ExamProvider({ children }: { children: ReactNode }) {
  const [exams, setExams] = useState<Exam[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('exams')
      setExams(stored ? JSON.parse(stored) : mockExams)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && exams.length > 0) {
      localStorage.setItem('exams', JSON.stringify(exams))
    }
  }, [exams])

  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSubject = !selectedSubject || exam.subject === selectedSubject
      const matchesStatus = !selectedStatus || exam.status === selectedStatus
      const matchesClass = !selectedClass || exam.className === selectedClass
      
      return matchesSearch && matchesSubject && matchesStatus && matchesClass
    })
  }, [exams, searchTerm, selectedSubject, selectedStatus, selectedClass])

  const paginatedExams = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredExams.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredExams, currentPage, itemsPerPage])

  const totalPages = useMemo(() => {
    return Math.ceil(filteredExams.length / itemsPerPage)
  }, [filteredExams.length, itemsPerPage])

  const stats = useMemo(() => ({
    total: exams.length,
    upcoming: exams.filter(e => e.status === 'Scheduled' || e.status === 'Active').length,
    aiGenerated: exams.filter(e => e.isAI).length,
    totalParticipants: exams.reduce((sum, e) => sum + e.students, 0)
  }), [exams])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedSubject, selectedStatus, selectedClass])

  const actions = useMemo(() => ({
    addExam: (exam: Exam) => setExams(prev => [...prev, exam]),
    updateExam: (id: string, updates: Partial<Exam>) => {
      setExams(prev => prev.map(e => e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e))
    },
    deleteExam: (id: string) => setExams(prev => prev.filter(e => e.id !== id)),
    setSearchTerm,
    setSelectedSubject,
    setSelectedStatus,
    setSelectedClass,
    setViewMode,
    setCurrentPage,
    resetFilters: () => {
      setSearchTerm('')
      setSelectedSubject('')
      setSelectedStatus('')
      setSelectedClass('')
    }
  }), [])

  const contextValue = useMemo(() => ({
    exams,
    searchTerm,
    selectedSubject,
    selectedStatus,
    selectedClass,
    viewMode,
    currentPage,
    itemsPerPage,
    filteredExams,
    paginatedExams,
    totalPages,
    stats,
    ...actions
  }), [exams, searchTerm, selectedSubject, selectedStatus, selectedClass, viewMode, currentPage, itemsPerPage, filteredExams, paginatedExams, totalPages, stats, actions])

  return (
    <ExamContext.Provider value={contextValue}>
      {children}
    </ExamContext.Provider>
  )
}

export function useExams() {
  const context = useContext(ExamContext)
  if (!context) throw new Error('useExams must be used within ExamProvider')
  return context
}
