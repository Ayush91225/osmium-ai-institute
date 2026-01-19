'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { getDatabase, Teacher } from '@/lib/database'

export type { Teacher } from '@/lib/database'

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const db = getDatabase()
      setTeachersState(db.getTeachers())
      const unsub = db.subscribe('teachers', () => setTeachersState(db.getTeachers()))
      return unsub
    }
  }, [])

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
  const actions = useMemo(() => ({
    setTeachers: (teachers: Teacher[]) => teachers.forEach(t => getDatabase().addTeacher(t)),
    addTeacher: (teacher: Teacher) => getDatabase().addTeacher(teacher),
    updateTeacher: (id: string, updates: Partial<Teacher>) => getDatabase().updateTeacher(id, updates),
    deleteTeacher: (id: string) => {
      getDatabase().deleteTeacher(id)
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