'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'
import { getDatabase, Class, Branch, Course, Subject } from '@/lib/database'

export type { Branch, Course, Subject, Class, SubjectTeacherAssignment } from '@/lib/database'

interface ClassState {
  classes: Class[]
  branches: Branch[]
  courses: Course[]
  subjects: Subject[]
  searchTerm: string
  selectedBranch: string
  selectedCourse: string
  selectedYear: string
  selectedType: string
  selectedStatus: string
  viewMode: 'grid' | 'table'
  selectedClass: Class | null
  isBranchModalOpen: boolean
  isCourseModalOpen: boolean
  isDeleteModalOpen: boolean
  isClassModalOpen: boolean
  classToDelete: Class | null
  currentPage: number
  itemsPerPage: number
  loading: boolean
  filteredClasses: Class[]
  paginatedClasses: Class[]
  totalPages: number
  stats: {
    total: number
    active: number
    branches: number
    courses: number
  }
}

interface ClassActions {
  setClasses: (classes: Class[]) => void
  addClass: (cls: Class) => void
  updateClass: (id: string, updates: Partial<Class>) => void
  deleteClass: (id: string) => void
  duplicateClass: (id: string) => void
  addBranch: (branch: Branch) => void
  addCourse: (course: Course) => void
  addSubjectToClass: (classId: string, subjectId: string) => void
  removeSubjectFromClass: (classId: string, subjectId: string) => void
  setSearchTerm: (term: string) => void
  setSelectedBranch: (id: string) => void
  setSelectedCourse: (id: string) => void
  setSelectedYear: (year: string) => void
  setSelectedType: (type: string) => void
  setSelectedStatus: (status: string) => void
  setViewMode: (mode: 'grid' | 'table') => void
  setSelectedClass: (cls: Class | null) => void
  setIsBranchModalOpen: (open: boolean) => void
  setIsCourseModalOpen: (open: boolean) => void
  setIsDeleteModalOpen: (open: boolean) => void
  setIsClassModalOpen: (open: boolean) => void
  setClassToDelete: (cls: Class | null) => void
  assignTeacherToSubject: (classId: string, subjectId: string, teacherId: string) => void
  removeTeacherFromSubject: (classId: string, subjectId: string) => void
  setCurrentPage: (page: number) => void
  resetFilters: () => void
  closeAllModals: () => void
}

type ClassContextType = ClassState & ClassActions

const ClassContext = createContext<ClassContextType | undefined>(undefined)

export function ClassProvider({ children }: { children: ReactNode }) {
  const [classes, setClassesState] = useState<Class[]>([])
  const [branches, setBranches] = useState<Branch[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false)
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isClassModalOpen, setIsClassModalOpen] = useState(false)
  const [classToDelete, setClassToDelete] = useState<Class | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const db = getDatabase()
      setClassesState(db.getClasses())
      setBranches(db.getBranches())
      setCourses(db.getCourses())
      setSubjects(db.getSubjects())
      
      const unsubClasses = db.subscribe('classes', () => setClassesState(db.getClasses()))
      const unsubBranches = db.subscribe('branches', () => setBranches(db.getBranches()))
      const unsubCourses = db.subscribe('courses', () => setCourses(db.getCourses()))
      const unsubSubjects = db.subscribe('subjects', () => setSubjects(db.getSubjects()))
      
      return () => {
        unsubClasses()
        unsubBranches()
        unsubCourses()
        unsubSubjects()
      }
    }
  }, [])

  const filteredClasses = useMemo(() => {
    const filtered = classes.filter(cls => {
      const matchesSearch = 
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.code.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesBranch = !selectedBranch || cls.branchId === selectedBranch
      const matchesCourse = !selectedCourse || cls.courseId === selectedCourse
      const matchesYear = !selectedYear || cls.academicYear === selectedYear
      const matchesType = !selectedType || cls.programType === selectedType
      const matchesStatus = !selectedStatus || cls.status === selectedStatus
      
      return matchesSearch && matchesBranch && matchesCourse && matchesYear && matchesType && matchesStatus
    })
    
    // Reset to page 1 when filters change
    setCurrentPage(1)
    return filtered
  }, [classes, searchTerm, selectedBranch, selectedCourse, selectedYear, selectedType, selectedStatus])

  const paginatedClasses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredClasses.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredClasses, currentPage, itemsPerPage])

  const totalPages = useMemo(() => {
    return Math.ceil(filteredClasses.length / itemsPerPage)
  }, [filteredClasses.length, itemsPerPage])

  const stats = useMemo(() => ({
    total: classes.length,
    active: classes.filter(c => c.status === 'active').length,
    branches: branches.length,
    courses: courses.length
  }), [classes, branches, courses])

  const actions = useMemo(() => ({
    setClasses: (classes: Class[]) => classes.forEach(c => getDatabase().addClass(c)),
    addClass: (cls: Class) => getDatabase().addClass(cls),
    updateClass: (id: string, updates: Partial<Class>) => getDatabase().updateClass(id, updates),
    deleteClass: (id: string) => getDatabase().deleteClass(id),
    duplicateClass: (id: string) => {
      const cls = classes.find(c => c.id === id)
      if (cls) {
        const newClass: Class = {
          ...cls,
          id: `CLS${Date.now()}`,
          name: `${cls.name} (Copy)`,
          code: `${cls.code}-COPY-${Date.now().toString().slice(-4)}`,
          currentStrength: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        getDatabase().addClass(newClass)
      }
    },
    addBranch: (branch: Branch) => getDatabase().addBranch(branch),
    addCourse: (course: Course) => getDatabase().addCourse(course),
    addSubjectToClass: (classId: string, subjectId: string) => {
      const cls = classes.find(c => c.id === classId)
      if (cls && !cls.subjects.includes(subjectId)) {
        getDatabase().updateClass(classId, { subjects: [...cls.subjects, subjectId] })
      }
    },
    removeSubjectFromClass: (classId: string, subjectId: string) => {
      const cls = classes.find(c => c.id === classId)
      if (cls) {
        getDatabase().updateClass(classId, {
          subjects: cls.subjects.filter(s => s !== subjectId),
          subjectTeachers: (cls.subjectTeachers || []).filter(st => st.subjectId !== subjectId)
        })
      }
    },
    assignTeacherToSubject: (classId: string, subjectId: string, teacherId: string) => {
      const cls = classes.find(c => c.id === classId)
      if (cls) {
        const subjectTeachers = cls.subjectTeachers || []
        const existing = subjectTeachers.find(st => st.subjectId === subjectId)
        if (existing) {
          getDatabase().updateClass(classId, {
            subjectTeachers: subjectTeachers.map(st => 
              st.subjectId === subjectId ? { ...st, teacherId } : st
            )
          })
        } else {
          getDatabase().updateClass(classId, {
            subjectTeachers: [...subjectTeachers, { subjectId, teacherId }]
          })
        }
        getDatabase().syncTeacherAssignments(teacherId)
      }
    },
    removeTeacherFromSubject: (classId: string, subjectId: string) => {
      const cls = classes.find(c => c.id === classId)
      if (cls) {
        const assignment = cls.subjectTeachers?.find(st => st.subjectId === subjectId)
        getDatabase().updateClass(classId, {
          subjectTeachers: (cls.subjectTeachers || []).filter(st => st.subjectId !== subjectId)
        })
        if (assignment) {
          getDatabase().syncTeacherAssignments(assignment.teacherId)
        }
      }
    },
    setSearchTerm,
    setSelectedBranch,
    setSelectedCourse,
    setSelectedYear,
    setSelectedType,
    setSelectedStatus,
    setViewMode,
    setSelectedClass,
    setIsBranchModalOpen,
    setIsCourseModalOpen,
    setIsDeleteModalOpen,
    setIsClassModalOpen,
    setClassToDelete,
    setCurrentPage,
    resetFilters: () => {
      setSearchTerm('')
      setSelectedBranch('')
      setSelectedCourse('')
      setSelectedYear('')
      setSelectedType('')
      setSelectedStatus('')
    },
    closeAllModals: () => {
      setIsBranchModalOpen(false)
      setIsCourseModalOpen(false)
      setIsDeleteModalOpen(false)
      setIsClassModalOpen(false)
      setSelectedClass(null)
      setClassToDelete(null)
    }
  }), [classes])

  const contextValue = useMemo(() => ({
    classes,
    branches,
    courses,
    subjects,
    searchTerm,
    selectedBranch,
    selectedCourse,
    selectedYear,
    selectedType,
    selectedStatus,
    viewMode,
    selectedClass,
    isBranchModalOpen,
    isCourseModalOpen,
    isDeleteModalOpen,
    isClassModalOpen,
    classToDelete,
    currentPage,
    itemsPerPage,
    loading,
    filteredClasses,
    paginatedClasses,
    totalPages,
    stats,
    ...actions
  }), [
    classes, branches, courses, subjects, searchTerm, selectedBranch, selectedCourse,
    selectedYear, selectedType, selectedStatus, viewMode, selectedClass,
    isBranchModalOpen, isCourseModalOpen, isDeleteModalOpen, isClassModalOpen, classToDelete,
    currentPage, itemsPerPage, loading, filteredClasses, paginatedClasses, totalPages, stats, actions
  ])

  return (
    <ClassContext.Provider value={contextValue}>
      {children}
    </ClassContext.Provider>
  )
}

export function useClasses() {
  const context = useContext(ClassContext)
  if (!context) throw new Error('useClasses must be used within ClassProvider')
  return context
}
