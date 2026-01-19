'use client'

import { createContext, useContext, ReactNode, useEffect } from 'react'
import { useClasses } from './ClassContext'
import { useStudents } from './StudentContext'
import { useTeachers } from './TeacherContext'
import { useApprovals } from './ApprovalContext'

interface UnifiedDataContextType {
  syncTeacherToClasses: (teacherId: string) => void
  syncStudentToClasses: (studentId: string) => void
  syncClassDeletion: (classId: string) => void
  syncTeacherDeletion: (teacherId: string) => void
  syncStudentDeletion: (studentId: string) => void
  syncApprovalToEntity: (approvalId: string) => void
  getTeacherWorkload: (teacherId: string) => { classes: number; subjects: number; students: number }
  getClassStats: (classId: string) => { students: number; teachers: number; subjects: number }
  getStudentTeachers: (studentId: string) => string[]
}

const UnifiedDataContext = createContext<UnifiedDataContextType | undefined>(undefined)

export function UnifiedDataProvider({ children }: { children: ReactNode }) {
  const { classes, updateClass, subjects } = useClasses()
  const { students, updateStudent } = useStudents()
  const { teachers, updateTeacher } = useTeachers()
  const { approvals, approveRequest } = useApprovals()

  // Sync teacher assignments to classes
  const syncTeacherToClasses = (teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId)
    if (!teacher) return

    const teacherClasses = classes.filter(c => 
      c.subjectTeachers?.some(st => st.teacherId === teacherId)
    )

    updateTeacher(teacherId, {
      classes: teacherClasses.map(c => c.name),
      subjects: [...new Set(
        teacherClasses.flatMap(c => 
          c.subjectTeachers
            ?.filter(st => st.teacherId === teacherId)
            .map(st => subjects.find(s => s.id === st.subjectId)?.name || '')
            .filter(Boolean)
        )
      )]
    })
  }

  // Sync student to classes
  const syncStudentToClasses = (studentId: string) => {
    const student = students.find(s => s.id === studentId)
    if (!student) return

    const studentClass = classes.find(c => c.name === student.class)
    if (studentClass) {
      const classSubjects = studentClass.subjects
        .map(sid => subjects.find(s => s.id === sid)?.name)
        .filter(Boolean) as string[]
      
      updateStudent(studentId, { subjects: classSubjects })
    }
  }

  // Handle class deletion cascading
  const syncClassDeletion = (classId: string) => {
    const classData = classes.find(c => c.id === classId)
    if (!classData) return

    // Update students - remove class reference
    students
      .filter(s => s.class === classData.name)
      .forEach(s => updateStudent(s.id, { class: '', subjects: [] }))

    // Update teachers - remove class from their list
    teachers.forEach(t => {
      if (t.classes.includes(classData.name)) {
        updateTeacher(t.id, {
          classes: t.classes.filter(c => c !== classData.name)
        })
      }
    })
  }

  // Handle teacher deletion cascading
  const syncTeacherDeletion = (teacherId: string) => {
    classes.forEach(c => {
      const hasTeacher = c.subjectTeachers?.some(st => st.teacherId === teacherId)
      if (hasTeacher) {
        updateClass(c.id, {
          subjectTeachers: c.subjectTeachers?.filter(st => st.teacherId !== teacherId) || []
        })
      }
    })
  }

  // Handle student deletion cascading
  const syncStudentDeletion = (studentId: string) => {
    const student = students.find(s => s.id === studentId)
    if (!student) return

    const studentClass = classes.find(c => c.name === student.class)
    if (studentClass) {
      updateClass(studentClass.id, {
        currentStrength: Math.max(0, studentClass.currentStrength - 1)
      })
    }
  }

  // Sync approved requests to create actual entities
  const syncApprovalToEntity = (approvalId: string) => {
    const approval = approvals.find(a => a.id === approvalId)
    if (!approval || approval.status !== 'approved') return

    if (approval.type === 'teacher') {
      // Auto-create teacher from approval
      const newTeacher = {
        id: `TCH${Date.now()}`,
        name: approval.name,
        email: approval.email,
        phone: approval.phone,
        subjects: approval.subjects || [],
        classes: [],
        department: approval.department || '',
        joiningDate: approval.joiningDate || new Date().toISOString().split('T')[0],
        status: 'active' as const,
        experience: approval.experience || 0,
        qualification: approval.qualification || '',
        performance: 0
      }
      // This would call addTeacher from TeacherContext
    } else if (approval.type === 'student') {
      // Auto-create student from approval
      const newStudent = {
        id: approval.rollNumber || `STU${Date.now()}`,
        name: approval.name,
        email: approval.email,
        phone: approval.phone,
        class: approval.class || '',
        rollNumber: approval.rollNumber || '',
        admissionDate: approval.admissionDate || new Date().toISOString().split('T')[0],
        status: 'active' as const,
        subjects: [],
        parentContact: approval.parentContact || ''
      }
      // This would call addStudent from StudentContext
    }
  }

  // Get teacher workload
  const getTeacherWorkload = (teacherId: string) => {
    const teacherClasses = classes.filter(c => 
      c.subjectTeachers?.some(st => st.teacherId === teacherId)
    )
    
    const subjectCount = new Set(
      teacherClasses.flatMap(c => 
        c.subjectTeachers
          ?.filter(st => st.teacherId === teacherId)
          .map(st => st.subjectId) || []
      )
    ).size

    const studentCount = teacherClasses.reduce((sum, c) => sum + c.currentStrength, 0)

    return {
      classes: teacherClasses.length,
      subjects: subjectCount,
      students: studentCount
    }
  }

  // Get class statistics
  const getClassStats = (classId: string) => {
    const classData = classes.find(c => c.id === classId)
    if (!classData) return { students: 0, teachers: 0, subjects: 0 }

    const studentCount = students.filter(s => s.class === classData.name).length
    const teacherCount = new Set(classData.subjectTeachers?.map(st => st.teacherId) || []).size

    return {
      students: studentCount,
      teachers: teacherCount,
      subjects: classData.subjects.length
    }
  }

  // Get student's teachers
  const getStudentTeachers = (studentId: string) => {
    const student = students.find(s => s.id === studentId)
    if (!student) return []

    const studentClass = classes.find(c => c.name === student.class)
    if (!studentClass) return []

    return [...new Set(studentClass.subjectTeachers?.map(st => st.teacherId) || [])]
  }

  // Auto-sync on data changes
  useEffect(() => {
    // Sync all teachers when classes change
    teachers.forEach(t => syncTeacherToClasses(t.id))
  }, [classes])

  useEffect(() => {
    // Sync all students when classes change
    students.forEach(s => syncStudentToClasses(s.id))
  }, [classes, subjects])

  const value = {
    syncTeacherToClasses,
    syncStudentToClasses,
    syncClassDeletion,
    syncTeacherDeletion,
    syncStudentDeletion,
    syncApprovalToEntity,
    getTeacherWorkload,
    getClassStats,
    getStudentTeachers
  }

  return (
    <UnifiedDataContext.Provider value={value}>
      {children}
    </UnifiedDataContext.Provider>
  )
}

export function useUnifiedData() {
  const context = useContext(UnifiedDataContext)
  if (!context) throw new Error('useUnifiedData must be used within UnifiedDataProvider')
  return context
}
