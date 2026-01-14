'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'

export interface Student {
  id: string
  name: string
  email: string
  phone: string
  class: string
  rollNumber: string
  admissionDate: string
  status: 'active' | 'inactive'
  grade: string
  subjects: string[]
  performance?: number
  parentContact: string
  // Additional fields from AddStudentModal
  firstName?: string
  lastName?: string
  address?: string
  gender?: string
  bloodGroup?: string
  dateOfBirth?: string
  parentName?: string
  parentEmail?: string
  department?: string
  course?: string
}

interface StudentState {
  students: Student[]
  searchTerm: string
  selectedClass: string
  selectedGrade: string
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
  setSelectedGrade: (grade: string) => void
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

const initialStudents: Student[] = [
  {
    id: '10A001',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@student.osmium.edu',
    phone: '+1 234-567-8901',
    class: 'Grade 10A',
    rollNumber: '10A001',
    admissionDate: '2023-04-15',
    status: 'active',
    grade: '10',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
    performance: 4.2,
    parentContact: '+1 234-567-8900'
  },
  {
    id: '11B015',
    name: 'Priya Patel',
    email: 'priya.patel@student.osmium.edu',
    phone: '+1 234-567-8902',
    class: 'Grade 11B',
    rollNumber: '11B015',
    admissionDate: '2022-04-10',
    status: 'active',
    grade: '11',
    subjects: ['Biology', 'Chemistry', 'Physics', 'English'],
    performance: 4.6,
    parentContact: '+1 234-567-8903'
  },
  {
    id: '12A008',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@student.osmium.edu',
    phone: '+1 234-567-8904',
    class: 'Grade 12A',
    rollNumber: '12A008',
    admissionDate: '2021-04-05',
    status: 'active',
    grade: '12',
    subjects: ['Computer Science', 'Mathematics', 'Physics', 'English'],
    performance: 4.8,
    parentContact: '+1 234-567-8905'
  },
  {
    id: '9B022',
    name: 'Sneha Singh',
    email: 'sneha.singh@student.osmium.edu',
    phone: '+1 234-567-8906',
    class: 'Grade 9B',
    rollNumber: '9B022',
    admissionDate: '2024-04-01',
    status: 'active',
    grade: '9',
    subjects: ['Mathematics', 'Science', 'Social Studies', 'English'],
    performance: 4.1,
    parentContact: '+1 234-567-8907'
  },
  {
    id: '11A012',
    name: 'Vikram Reddy',
    email: 'vikram.reddy@student.osmium.edu',
    phone: '+1 234-567-8908',
    class: 'Grade 11A',
    rollNumber: '11A012',
    admissionDate: '2022-04-12',
    status: 'active',
    grade: '11',
    subjects: ['Commerce', 'Economics', 'Accountancy', 'English'],
    performance: 4.3,
    parentContact: '+1 234-567-8909'
  },
  {
    id: '10C018',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@student.osmium.edu',
    phone: '+1 234-567-8910',
    class: 'Grade 10C',
    rollNumber: '10C018',
    admissionDate: '2023-04-20',
    status: 'active',
    grade: '10',
    subjects: ['Arts', 'History', 'Geography', 'English'],
    performance: 4.4,
    parentContact: '+1 234-567-8911'
  }
]

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudentsState] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load students from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStudents = localStorage.getItem('students')
      if (savedStudents) {
        try {
          setStudentsState(JSON.parse(savedStudents))
        } catch {
          setStudentsState(initialStudents)
        }
      } else {
        setStudentsState(initialStudents)
      }
    }
  }, [])

  // Save students to localStorage whenever students change
  useEffect(() => {
    if (typeof window !== 'undefined' && students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students))
    }
  }, [students])

  const classes = useMemo(() => 
    [...new Set(students.map(s => s.class))], 
    [students]
  )
  
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesClass = !selectedClass || student.class === selectedClass
      const matchesGrade = !selectedGrade || student.grade === selectedGrade
      
      return matchesSearch && matchesClass && matchesGrade
    })
  }, [students, searchTerm, selectedClass, selectedGrade])

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
  }, [searchTerm, selectedClass, selectedGrade])

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
    setStudents: setStudentsState,
    addStudent: (student: Student) => setStudentsState(prev => [...prev, student]),
    updateStudent: (id: string, updates: Partial<Student>) => 
      setStudentsState(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s)),
    deleteStudent: (id: string) => {
      setStudentsState(prev => prev.filter(s => s.id !== id))
      if (selectedStudent?.id === id) {
        setSelectedStudent(null)
        setIsDetailModalOpen(false)
      }
    },
    setSearchTerm,
    setSelectedClass,
    setSelectedGrade,
    resetFilters: () => {
      setSearchTerm('')
      setSelectedClass('')
      setSelectedGrade('')
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
    openStudentDetail: (student: Student) => {
      // Navigate to profile page instead of modal
    },
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
    selectedGrade,
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
    selectedGrade,
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