'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react'

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  subjects: string[]
  classes: string[]
  department: string
  joiningDate: string
  status: 'active' | 'inactive'
  experience: number
  qualification: string
  performance?: number
}

interface TeacherState {
  // Data
  teachers: Teacher[]
  
  // Filters
  searchTerm: string
  selectedDepartment: string
  selectedExperience: string
  
  // UI State
  viewMode: 'grid' | 'table'
  selectedTeacher: Teacher | null
  isDetailModalOpen: boolean
  isAddModalOpen: boolean
  isEditModalOpen: boolean
  
  // Pagination
  currentPage: number
  itemsPerPage: number
  
  // App State
  loading: boolean
  error: string | null
  
  // Computed
  filteredTeachers: Teacher[]
  paginatedTeachers: Teacher[]
  totalPages: number
  departments: string[]
  stats: {
    total: number
    active: number
    departments: number
    newThisMonth: number
  }
}

interface TeacherActions {
  // Data Actions
  setTeachers: (teachers: Teacher[]) => void
  addTeacher: (teacher: Teacher) => void
  updateTeacher: (id: string, updates: Partial<Teacher>) => void
  deleteTeacher: (id: string) => void
  
  // Filter Actions
  setSearchTerm: (term: string) => void
  setSelectedDepartment: (dept: string) => void
  setSelectedExperience: (exp: string) => void
  resetFilters: () => void
  
  // UI Actions
  setViewMode: (mode: 'grid' | 'table') => void
  setSelectedTeacher: (teacher: Teacher | null) => void
  setIsDetailModalOpen: (open: boolean) => void
  setIsAddModalOpen: (open: boolean) => void
  setIsEditModalOpen: (open: boolean) => void
  
  // Pagination Actions
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
  nextPage: () => void
  prevPage: () => void
  
  // App Actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Combined Actions
  openTeacherDetail: (teacher: Teacher) => void
  closeAllModals: () => void
}

type TeacherContextType = TeacherState & TeacherActions

const TeacherContext = createContext<TeacherContextType | undefined>(undefined)

const initialTeachers: Teacher[] = [
  {
    id: 'TCH001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@osmium.edu',
    phone: '+1 234-567-8901',
    subjects: ['Mathematics', 'Statistics', 'Calculus'],
    classes: ['Grade 10A', 'Grade 11B', 'Grade 12A'],
    department: 'Mathematics',
    joiningDate: '2022-08-15',
    status: 'active',
    experience: 8,
    qualification: 'PhD in Mathematics',
    performance: 4.9
  },
  {
    id: 'TCH002',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@osmium.edu',
    phone: '+1 234-567-8902',
    subjects: ['Physics', 'Chemistry'],
    classes: ['Grade 11A', 'Grade 12B'],
    department: 'Science',
    joiningDate: '2021-01-10',
    status: 'active',
    experience: 12,
    qualification: 'MSc in Physics',
    performance: 4.7
  },
  {
    id: 'TCH003',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@osmium.edu',
    phone: '+1 234-567-8904',
    subjects: ['Biology', 'Environmental Science'],
    classes: ['Grade 11C', 'Grade 12C'],
    department: 'Science',
    joiningDate: '2020-06-01',
    status: 'active',
    experience: 15,
    qualification: 'PhD in Biology',
    performance: 4.8
  },
  {
    id: 'TCH004',
    name: 'Ms. Lisa Anderson',
    email: 'lisa.anderson@osmium.edu',
    phone: '+1 234-567-8905',
    subjects: ['History', 'Geography'],
    classes: ['Grade 9B', 'Grade 10C'],
    department: 'Social Studies',
    joiningDate: '2023-01-15',
    status: 'active',
    experience: 6,
    qualification: 'MA in History',
    performance: 4.6
  },
  {
    id: 'TCH005',
    name: 'Mr. David Wilson',
    email: 'david.wilson@osmium.edu',
    phone: '+1 234-567-8906',
    subjects: ['Computer Science', 'Programming'],
    classes: ['Grade 11D', 'Grade 12D'],
    department: 'Technology',
    joiningDate: '2019-09-01',
    status: 'active',
    experience: 10,
    qualification: 'MSc in Computer Science',
    performance: 4.9
  },
  {
    id: 'TCH006',
    name: 'Ms. Emily Davis',
    email: 'emily.davis@osmium.edu',
    phone: '+1 234-567-8903',
    subjects: ['English Literature', 'Creative Writing'],
    classes: ['Grade 9A', 'Grade 10B'],
    department: 'Languages',
    joiningDate: '2023-03-20',
    status: 'active',
    experience: 5,
    qualification: 'MA in English Literature',
    performance: 4.5
  }
]

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teachers, setTeachersState] = useState<Teacher[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedExperience, setSelectedExperience] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load teachers from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTeachers = localStorage.getItem('teachers')
      if (savedTeachers) {
        try {
          setTeachersState(JSON.parse(savedTeachers))
        } catch {
          setTeachersState(initialTeachers)
        }
      } else {
        setTeachersState(initialTeachers)
      }
    }
  }, [])

  // Save teachers to localStorage whenever teachers change
  useEffect(() => {
    if (typeof window !== 'undefined' && teachers.length > 0) {
      localStorage.setItem('teachers', JSON.stringify(teachers))
    }
  }, [teachers])

  // Memoized computed values
  const departments = useMemo(() => 
    [...new Set(teachers.map(t => t.department))], 
    [teachers]
  )
  
  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = !selectedDepartment || teacher.department === selectedDepartment
      
      let matchesExperience = true
      if (selectedExperience) {
        switch (selectedExperience) {
          case '0-2':
            matchesExperience = teacher.experience <= 2
            break
          case '3-5':
            matchesExperience = teacher.experience >= 3 && teacher.experience <= 5
            break
          case '6-10':
            matchesExperience = teacher.experience >= 6 && teacher.experience <= 10
            break
          case '10+':
            matchesExperience = teacher.experience > 10
            break
        }
      }
      
      return matchesSearch && matchesDepartment && matchesExperience
    })
  }, [teachers, searchTerm, selectedDepartment, selectedExperience])

  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredTeachers.slice(startIndex, endIndex)
  }, [filteredTeachers, currentPage, itemsPerPage])

  const totalPages = useMemo(() => {
    return Math.ceil(filteredTeachers.length / itemsPerPage)
  }, [filteredTeachers.length, itemsPerPage])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedDepartment, selectedExperience])

  const stats = useMemo(() => {
    const now = new Date()
    return {
      total: teachers.length,
      active: teachers.filter(t => t.status === 'active').length,
      departments: departments.length,
      newThisMonth: teachers.filter(t => {
        const joinDate = new Date(t.joiningDate)
        return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
      }).length
    }
  }, [teachers, departments])

  // Persist view mode to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedViewMode = localStorage.getItem('teacher-view-mode')
      if (savedViewMode === 'grid' || savedViewMode === 'table') {
        setViewMode(savedViewMode)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('teacher-view-mode', viewMode)
    }
  }, [viewMode])
  // Memoized actions
  const actions = useMemo(() => ({
    // Data Actions
    setTeachers: setTeachersState,
    
    addTeacher: (teacher: Teacher) => {
      setTeachersState(prev => [...prev, teacher])
    },
    
    updateTeacher: (id: string, updates: Partial<Teacher>) => {
      setTeachersState(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
    },
    
    deleteTeacher: (id: string) => {
      setTeachersState(prev => prev.filter(t => t.id !== id))
      if (selectedTeacher?.id === id) {
        setSelectedTeacher(null)
        setIsDetailModalOpen(false)
      }
    },
    
    // Filter Actions
    setSearchTerm,
    setSelectedDepartment,
    setSelectedExperience,
    
    resetFilters: () => {
      setSearchTerm('')
      setSelectedDepartment('')
      setSelectedExperience('')
    },
    
    // UI Actions
    setViewMode,
    setSelectedTeacher,
    setIsDetailModalOpen,
    setIsAddModalOpen,
    setIsEditModalOpen,
    
    // Pagination Actions
    setCurrentPage,
    setItemsPerPage,
    
    nextPage: () => {
      setCurrentPage(prev => Math.min(prev + 1, totalPages))
    },
    
    prevPage: () => {
      setCurrentPage(prev => Math.max(prev - 1, 1))
    },
    
    // App Actions
    setLoading,
    setError,
    
    // Combined Actions
    openTeacherDetail: (teacher: Teacher) => {
      // Navigate to profile page instead of modal
    },
    
    closeAllModals: () => {
      setIsDetailModalOpen(false)
      setIsAddModalOpen(false)
      setIsEditModalOpen(false)
      setSelectedTeacher(null)
    }
  }), [selectedTeacher, totalPages])

  const contextValue = useMemo(() => ({
    // State
    teachers,
    searchTerm,
    selectedDepartment,
    selectedExperience,
    viewMode,
    selectedTeacher,
    isDetailModalOpen,
    isAddModalOpen,
    isEditModalOpen,
    loading,
    error,
    // Computed
    filteredTeachers,
    paginatedTeachers,
    totalPages,
    currentPage,
    itemsPerPage,
    departments,
    stats,
    // Actions
    ...actions
  }), [
    teachers,
    searchTerm,
    selectedDepartment,
    selectedExperience,
    viewMode,
    selectedTeacher,
    isDetailModalOpen,
    isAddModalOpen,
    isEditModalOpen,
    loading,
    error,
    filteredTeachers,
    departments,
    stats,
    actions
  ])

  return (
    <TeacherContext.Provider value={contextValue}>
      {children}
    </TeacherContext.Provider>
  )
}

export function useTeachers() {
  const context = useContext(TeacherContext)
  if (context === undefined) {
    throw new Error('useTeachers must be used within a TeacherProvider')
  }
  return context
}