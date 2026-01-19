'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'
import { getDatabase, Student } from '@/lib/database'

export type { Student } from '@/lib/database'

interface StudentState {
  students: Student[]
  searchTerm: string
  selectedClass: string
  viewMode: 'grid' | 'table'
  selectedStudent: Student | null
  isDetailModalOpen: boolean
  isAddModalOpen: boolean
  isEditModalOpen: boolean
  currentPage: number
  itemsPerPage: number
  loading: boolean
  error: string | null
  filteredStudents: Student[]
  paginatedStudents: Student[]
  totalPages: number
  classes: string[]
  stats: {
    total: number
    active: number
    classes: number
    newThisMonth: number
  }
}

interface StudentActions {
  setStudents: (students: Student[]) => void
  addStudent: (student: Student) => void
  updateStudent: (id: string, updates: Partial<Student>) => void
  deleteStudent: (id: string) => void
  setSearchTerm: (term: string) => void
  setSelectedClass: (cls: string) => void
  resetFilters: () => void
  setViewMode: (mode: 'grid' | 'table') => void
  setSelectedStudent: (student: Student | null) => void
  setIsDetailModalOpen: (open: boolean) => void
  setIsAddModalOpen: (open: boolean) => void
  setIsEditModalOpen: (open: boolean) => void
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
  nextPage: () => void
  prevPage: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  openStudentDetail: (student: Student) => void
  closeAllModals: () => void
}

type StudentContextType = StudentState & StudentActions

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudentsState] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const db = getDatabase()
      setStudentsState(db.getStudents())
      const unsub = db.subscribe('students', () => setStudentsState(db.getStudents()))
      return unsub
    }
  }, [])

  const classes = useMemo(() => 
    [...new Set(students.map(s => s.class))], 
    [students]
  )
  
  const filteredStudents = useMemo(() => {
    if (typeof window === 'undefined') return []
    const db = getDatabase()
    const existingClasses = db.getClasses().map(c => c.name)
    
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesClass = !selectedClass || student.class === selectedClass
      const hasValidClass = existingClasses.includes(student.class)
      
      return matchesSearch && matchesClass && hasValidClass
    })
  }, [students, searchTerm, selectedClass])

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredStudents.slice(startIndex, endIndex)
  }, [filteredStudents, currentPage, itemsPerPage])

  const totalPages = useMemo(() => {
    return Math.ceil(filteredStudents.length / itemsPerPage)
  }, [filteredStudents.length, itemsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedClass])

  const stats = useMemo(() => {
    const now = new Date()
    return {
      total: students.length,
      active: students.filter(s => s.status === 'active').length,
      classes: classes.length,
      newThisMonth: students.filter(s => {
        const admissionDate = new Date(s.admissionDate)
        return admissionDate.getMonth() === now.getMonth() && admissionDate.getFullYear() === now.getFullYear()
      }).length
    }
  }, [students, classes])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedViewMode = localStorage.getItem('student-view-mode')
      if (savedViewMode === 'grid' || savedViewMode === 'table') {
        setViewMode(savedViewMode)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('student-view-mode', viewMode)
    }
  }, [viewMode])

  const actions = useMemo(() => ({
    setStudents: (students: Student[]) => students.forEach(s => getDatabase().addStudent(s)),
    addStudent: (student: Student) => {
      getDatabase().addStudent(student)
      getDatabase().syncStudentSubjects(student.id)
    },
    updateStudent: (id: string, updates: Partial<Student>) => getDatabase().updateStudent(id, updates),
    deleteStudent: (id: string) => getDatabase().deleteStudent(id),
    setSearchTerm,
    setSelectedClass,
    resetFilters: () => {
      setSearchTerm('')
      setSelectedClass('')
    },
    setViewMode,
    setSelectedStudent,
    setIsDetailModalOpen,
    setIsAddModalOpen,
    setIsEditModalOpen,
    setCurrentPage,
    setItemsPerPage,
    nextPage: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)),
    prevPage: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
    setLoading,
    setError,
    openStudentDetail: (student: Student) => {},
    closeAllModals: () => {
      setIsAddModalOpen(false)
      setIsEditModalOpen(false)
      setSelectedStudent(null)
    }
  }), [selectedStudent, totalPages])

  const contextValue = useMemo(() => ({
    students,
    searchTerm,
    selectedClass,
    viewMode,
    selectedStudent,
    isDetailModalOpen,
    isAddModalOpen,
    isEditModalOpen,
    loading,
    error,
    filteredStudents,
    paginatedStudents,
    totalPages,
    currentPage,
    itemsPerPage,
    classes,
    stats,
    ...actions
  }), [
    students,
    searchTerm,
    selectedClass,
    viewMode,
    selectedStudent,
    isDetailModalOpen,
    isAddModalOpen,
    isEditModalOpen,
    loading,
    error,
    filteredStudents,
    paginatedStudents,
    totalPages,
    currentPage,
    itemsPerPage,
    classes,
    stats,
    actions
  ])

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  )
}

export function useStudents() {
  const context = useContext(StudentContext)
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentProvider')
  }
  return context
}
