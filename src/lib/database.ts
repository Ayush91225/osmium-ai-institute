'use client'

import branchesData from '@/data/branches.json'
import coursesData from '@/data/courses.json'
import subjectsData from '@/data/subjects.json'
import classesData from '@/data/classes.json'
import teachersData from '@/data/teachers.json'
import studentsData from '@/data/students.json'

// Type definitions
export interface Branch {
  id: string
  name: string
  code: string
  location: string
  status: 'active' | 'inactive'
  type?: 'campus' | 'branch' | 'center'
}

export interface Course {
  id: string
  name: string
  code: string
  programType: 'school' | 'ug' | 'pg' | 'coaching' | 'custom'
  duration: string
  branchId: string
  status: 'active' | 'inactive'
}

export interface Subject {
  id: string
  name: string
  code: string
  credits?: number
  tags?: string[]
  syllabus?: Array<{ id: string; name: string; topics: string[]; duration: string }>
  curriculumFiles?: Array<{ id: string; name: string; size: string; uploadedAt: string }>
}

export interface SubjectTeacherAssignment {
  subjectId: string
  teacherId: string
}

export interface Class {
  id: string
  name: string
  code: string
  branchId: string
  courseId: string
  department: string
  programType: 'school' | 'ug' | 'pg' | 'coaching' | 'custom'
  academicYear: string
  semester?: string
  section?: string
  capacity: number
  currentStrength: number
  subjects: string[]
  subjectTeachers: SubjectTeacherAssignment[]
  status: 'active' | 'inactive' | 'archived'
  createdAt: string
  createdBy: string
  updatedAt: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  gender?: string
  dateOfBirth?: string
  emergencyContact?: string
  subjects: string[]
  classes: string[]
  department: string
  joiningDate: string
  status: 'active' | 'inactive'
  experience: number
  qualification: string
  performance?: number
}

export interface Student {
  id: string
  name: string
  email: string
  phone: string
  class: string
  rollNumber: string
  admissionDate: string
  status: 'active' | 'inactive'
  subjects: string[]
  performance?: number
  parentContact: string
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

export interface Assignment {
  id: string
  title: string
  description: string
  teacherId: string
  classId: string
  subjectId: string
  dueDate: string
  totalMarks: number
  status: 'draft' | 'published' | 'closed'
  attachments?: string[]
  createdAt: string
  updatedAt: string
}

export interface StudentAssignment {
  id: string
  assignmentId: string
  studentId: string
  submittedAt?: string
  grade?: number
  feedback?: string
  status: 'pending' | 'submitted' | 'graded' | 'late'
  attachments?: string[]
}

export interface Material {
  id: string
  title: string
  description: string
  type: 'page' | 'pdf' | 'video' | 'link'
  teacherId: string
  classId: string
  subjectId: string
  fileUrl?: string
  content?: string
  views: number
  downloads: number
  createdAt: string
  updatedAt: string
}

export interface Test {
  id: string
  title: string
  type: 'exam' | 'quiz' | 'mock'
  teacherId: string
  classId: string
  subjectId: string
  date: string
  duration: number
  totalMarks: number
  status: 'upcoming' | 'ongoing' | 'completed'
  createdAt: string
  paperId?: string
}

export interface TestPaper {
  id: string
  name: string
  paperSubjects: string[]
  questions: Array<{
    id: string
    subject: string
    type: 'mcq' | 'answer'
    question: string
    options: string[]
    correctOption: number
    correctAnswer?: string
    marks: number
  }>
  defaultMarks: number
  negativeMarking: boolean
  negativeMarks: number
  createdAt: string
  updatedAt: string
}

export interface StudentTest {
  id: string
  testId: string
  studentId: string
  score?: number
  grade?: string
  rank?: number
  submittedAt?: string
  status: 'pending' | 'completed'
}

export interface Activity {
  id: string
  userId: string
  userType: 'teacher' | 'student' | 'admin'
  type: 'assignment' | 'material' | 'test' | 'attendance' | 'grade' | 'meeting' | 'other'
  action: string
  description: string
  metadata?: Record<string, any>
  timestamp: string
}

// Database simulation class
class DatabaseSimulator {
  private branches: Branch[]
  private courses: Course[]
  private subjects: Subject[]
  private classes: Class[]
  private teachers: Teacher[]
  private students: Student[]
  private assignments: Assignment[]
  private studentAssignments: StudentAssignment[]
  private materials: Material[]
  private tests: Test[]
  private testPapers: TestPaper[]
  private studentTests: StudentTest[]
  private activities: Activity[]
  private listeners: Map<string, Set<() => void>>

  constructor() {
    this.branches = this.loadFromStorage('branches', branchesData)
    this.courses = this.loadFromStorage('courses', coursesData)
    this.subjects = this.loadFromStorage('subjects', subjectsData)
    this.classes = this.loadFromStorage('classes', classesData)
    this.teachers = this.loadFromStorage('teachers', teachersData)
    this.students = this.loadFromStorage('students', studentsData)
    this.assignments = this.loadFromStorage('assignments', [])
    this.studentAssignments = this.loadFromStorage('studentAssignments', [])
    this.materials = this.loadFromStorage('materials', [])
    this.tests = this.loadFromStorage('tests', [])
    this.testPapers = this.loadFromStorage('testPapers', [])
    this.studentTests = this.loadFromStorage('studentTests', [])
    this.activities = this.loadFromStorage('activities', [])
    this.listeners = new Map()
  }

  private loadFromStorage<T>(key: string, defaultData: any): T[] {
    if (typeof window === 'undefined') return defaultData as T[]
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultData
    } catch (error) {
      console.error(`Error loading ${key} from storage:`, error)
      return defaultData
    }
  }

  private saveToStorage(key: string, data: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }

  private notify(entity: string) {
    const callbacks = this.listeners.get(entity)
    if (callbacks) {
      callbacks.forEach(cb => cb())
    }
  }

  subscribe(entity: string, callback: () => void) {
    if (!this.listeners.has(entity)) {
      this.listeners.set(entity, new Set())
    }
    this.listeners.get(entity)!.add(callback)
    return () => this.listeners.get(entity)?.delete(callback)
  }

  // Branches
  getBranches() { return [...this.branches] }
  addBranch(branch: Branch) {
    this.branches.push(branch)
    this.saveToStorage('branches', this.branches)
    this.notify('branches')
  }
  updateBranch(id: string, updates: Partial<Branch>) {
    const index = this.branches.findIndex(b => b.id === id)
    if (index !== -1) {
      this.branches[index] = { ...this.branches[index], ...updates }
      this.saveToStorage('branches', this.branches)
      this.notify('branches')
    }
  }
  deleteBranch(id: string) {
    this.branches = this.branches.filter(b => b.id !== id)
    this.saveToStorage('branches', this.branches)
    this.notify('branches')
  }

  // Courses
  getCourses() { return [...this.courses] }
  addCourse(course: Course) {
    this.courses.push(course)
    this.saveToStorage('courses', this.courses)
    this.notify('courses')
  }
  updateCourse(id: string, updates: Partial<Course>) {
    const index = this.courses.findIndex(c => c.id === id)
    if (index !== -1) {
      this.courses[index] = { ...this.courses[index], ...updates }
      this.saveToStorage('courses', this.courses)
      this.notify('courses')
    }
  }
  deleteCourse(id: string) {
    this.courses = this.courses.filter(c => c.id !== id)
    this.saveToStorage('courses', this.courses)
    this.notify('courses')
  }

  // Subjects
  getSubjects() { return [...this.subjects] }
  addSubject(subject: Subject) {
    this.subjects.push(subject)
    this.saveToStorage('subjects', this.subjects)
    this.notify('subjects')
  }
  updateSubject(id: string, updates: Partial<Subject>) {
    const index = this.subjects.findIndex(s => s.id === id)
    if (index !== -1) {
      this.subjects[index] = { ...this.subjects[index], ...updates }
      this.saveToStorage('subjects', this.subjects)
      this.notify('subjects')
    }
  }
  deleteSubject(id: string) {
    // Cascade: Remove subject from all classes
    this.classes.forEach(c => {
      if (c.subjects.includes(id)) {
        this.updateClass(c.id, {
          subjects: c.subjects.filter(s => s !== id),
          subjectTeachers: c.subjectTeachers?.filter(st => st.subjectId !== id) || []
        })
      }
    })
    
    // Cascade: Remove subject from students
    this.students.forEach(s => {
      const subjectName = this.subjects.find(sub => sub.id === id)?.name
      if (subjectName && s.subjects.includes(subjectName)) {
        this.updateStudent(s.id, {
          subjects: s.subjects.filter(sub => sub !== subjectName)
        })
      }
    })
    
    // Cascade: Remove subject from teachers
    this.teachers.forEach(t => {
      const subjectName = this.subjects.find(sub => sub.id === id)?.name
      if (subjectName && t.subjects.includes(subjectName)) {
        this.updateTeacher(t.id, {
          subjects: t.subjects.filter(sub => sub !== subjectName)
        })
      }
    })
    
    // Cascade: Delete related assignments, materials, tests, and test papers
    this.assignments = this.assignments.filter(a => a.subjectId !== id)
    this.materials = this.materials.filter(m => m.subjectId !== id)
    this.tests = this.tests.filter(t => t.subjectId !== id)
    this.testPapers = this.testPapers.filter(p => !p.paperSubjects.includes(id))
    
    this.subjects = this.subjects.filter(s => s.id !== id)
    this.saveToStorage('subjects', this.subjects)
    this.saveToStorage('assignments', this.assignments)
    this.saveToStorage('materials', this.materials)
    this.saveToStorage('tests', this.tests)
    this.saveToStorage('testPapers', this.testPapers)
    this.notify('subjects')
    this.notify('classes')
    this.notify('students')
    this.notify('teachers')
    this.notify('testPapers')
  }
  
  // Subject helpers
  updateSubjectSyllabus(id: string, syllabus: Array<{ id: string; name: string; topics: string[]; duration: string }>) {
    this.updateSubject(id, { syllabus })
  }
  
  updateSubjectCurriculum(id: string, curriculumFiles: Array<{ id: string; name: string; size: string; uploadedAt: string }>) {
    this.updateSubject(id, { curriculumFiles })
  }
  
  // Get classes for a subject
  getSubjectClasses(subjectId: string) {
    return this.classes.filter(c => c.subjects.includes(subjectId))
  }
  
  // Get students enrolled in a subject
  getSubjectStudents(subjectId: string) {
    const subjectClasses = this.getSubjectClasses(subjectId)
    const classNames = subjectClasses.map(c => c.name)
    return this.students.filter(s => classNames.includes(s.class))
  }
  
  // Get teachers teaching a subject
  getSubjectTeachers(subjectId: string) {
    const teacherIds = new Set<string>()
    this.classes.forEach(c => {
      c.subjectTeachers?.forEach(st => {
        if (st.subjectId === subjectId) {
          teacherIds.add(st.teacherId)
        }
      })
    })
    return this.teachers.filter(t => teacherIds.has(t.id))
  }

  // Classes
  getClasses() { return [...this.classes] }
  addClass(cls: Class) {
    this.classes.push(cls)
    this.saveToStorage('classes', this.classes)
    this.notify('classes')
  }
  updateClass(id: string, updates: Partial<Class>) {
    const index = this.classes.findIndex(c => c.id === id)
    if (index !== -1) {
      this.classes[index] = { ...this.classes[index], ...updates, updatedAt: new Date().toISOString() }
      this.saveToStorage('classes', this.classes)
      this.notify('classes')
    }
  }
  deleteClass(id: string) {
    const cls = this.classes.find(c => c.id === id)
    if (cls) {
      // Cascade: Remove class from students
      this.students.forEach(s => {
        if (s.class === cls.name) {
          this.updateStudent(s.id, { class: '', subjects: [] })
        }
      })
      // Cascade: Remove class from teachers
      this.teachers.forEach(t => {
        if (t.classes.includes(cls.name)) {
          this.updateTeacher(t.id, { classes: t.classes.filter(c => c !== cls.name) })
        }
      })
    }
    this.classes = this.classes.filter(c => c.id !== id)
    this.saveToStorage('classes', this.classes)
    this.notify('classes')
  }

  // Teachers
  getTeachers() { return [...this.teachers] }
  addTeacher(teacher: Teacher) {
    this.teachers.push(teacher)
    this.saveToStorage('teachers', this.teachers)
    this.notify('teachers')
  }
  updateTeacher(id: string, updates: Partial<Teacher>) {
    const index = this.teachers.findIndex(t => t.id === id)
    if (index !== -1) {
      this.teachers[index] = { ...this.teachers[index], ...updates }
      this.saveToStorage('teachers', this.teachers)
      this.notify('teachers')
    }
  }
  deleteTeacher(id: string) {
    // Cascade: Remove teacher from classes
    this.classes.forEach(c => {
      if (c.subjectTeachers?.some(st => st.teacherId === id)) {
        this.updateClass(c.id, {
          subjectTeachers: c.subjectTeachers.filter(st => st.teacherId !== id)
        })
      }
    })
    this.teachers = this.teachers.filter(t => t.id !== id)
    this.saveToStorage('teachers', this.teachers)
    this.notify('teachers')
  }

  // Students
  getStudents() { return [...this.students] }
  addStudent(student: Student) {
    this.students.push(student)
    // Auto-update class strength
    const cls = this.classes.find(c => c.name === student.class)
    if (cls) {
      this.updateClass(cls.id, { currentStrength: cls.currentStrength + 1 })
    }
    this.saveToStorage('students', this.students)
    this.notify('students')
  }
  updateStudent(id: string, updates: Partial<Student>) {
    const index = this.students.findIndex(s => s.id === id)
    if (index !== -1) {
      const oldClass = this.students[index].class
      this.students[index] = { ...this.students[index], ...updates }
      
      // Update class strength if class changed
      if (updates.class && updates.class !== oldClass) {
        const oldCls = this.classes.find(c => c.name === oldClass)
        const newCls = this.classes.find(c => c.name === updates.class)
        if (oldCls) this.updateClass(oldCls.id, { currentStrength: Math.max(0, oldCls.currentStrength - 1) })
        if (newCls) this.updateClass(newCls.id, { currentStrength: newCls.currentStrength + 1 })
      }
      
      this.saveToStorage('students', this.students)
      this.notify('students')
    }
  }
  deleteStudent(id: string) {
    const student = this.students.find(s => s.id === id)
    if (student) {
      const cls = this.classes.find(c => c.name === student.class)
      if (cls) {
        this.updateClass(cls.id, { currentStrength: Math.max(0, cls.currentStrength - 1) })
      }
    }
    this.students = this.students.filter(s => s.id !== id)
    this.saveToStorage('students', this.students)
    this.notify('students')
  }

  // Sync operations
  syncStudentSubjects(studentId: string) {
    const student = this.students.find(s => s.id === studentId)
    if (!student) return
    
    const cls = this.classes.find(c => c.name === student.class)
    if (cls) {
      const subjectNames = cls.subjects
        .map(sid => this.subjects.find(s => s.id === sid)?.name)
        .filter(Boolean) as string[]
      this.updateStudent(studentId, { subjects: subjectNames })
    }
  }

  syncTeacherAssignments(teacherId: string) {
    const teacher = this.teachers.find(t => t.id === teacherId)
    if (!teacher) return

    const teacherClasses = this.classes.filter(c => 
      c.subjectTeachers?.some(st => st.teacherId === teacherId)
    )

    const classNames = teacherClasses.map(c => c.name)
    const subjectNames = [...new Set(
      teacherClasses.flatMap(c => 
        c.subjectTeachers
          ?.filter(st => st.teacherId === teacherId)
          .map(st => this.subjects.find(s => s.id === st.subjectId)?.name || '')
          .filter(Boolean)
      )
    )]

    this.updateTeacher(teacherId, { classes: classNames, subjects: subjectNames })
  }

  // Query helpers
  getClassStudents(className: string) {
    return this.students.filter(s => s.class === className)
  }

  getClassTeachers(classId: string) {
    const cls = this.classes.find(c => c.id === classId)
    if (!cls) return []
    const teacherIds = [...new Set(cls.subjectTeachers?.map(st => st.teacherId) || [])]
    return this.teachers.filter(t => teacherIds.includes(t.id))
  }

  getTeacherWorkload(teacherId: string) {
    const teacherClasses = this.classes.filter(c => 
      c.subjectTeachers?.some(st => st.teacherId === teacherId)
    )
    
    const subjectCount = new Set(
      teacherClasses.flatMap(c => 
        c.subjectTeachers
          ?.filter(st => st.teacherId === teacherId)
          .map(st => st.subjectId) || []
      )
    ).size

    const studentCount = teacherClasses.reduce((sum, c) => 
      sum + this.getClassStudents(c.name).length, 0
    )

    return {
      classes: teacherClasses.length,
      subjects: subjectCount,
      students: studentCount
    }
  }

  // Department helpers
  getDepartments() {
    return [...new Set(this.classes.map(c => c.department))]
  }

  getClassesByDepartment(department: string) {
    return this.classes.filter(c => c.department === department)
  }

  getTeachersByDepartment(department: string) {
    return this.teachers.filter(t => t.department === department)
  }

  getStudentsByDepartment(department: string) {
    return this.students.filter(s => s.department === department)
  }

  // Validation: Check if student's department matches their class department
  validateStudentDepartment(studentId: string): boolean {
    const student = this.students.find(s => s.id === studentId)
    if (!student) return false
    const cls = this.classes.find(c => c.name === student.class)
    if (!cls) return true // No class assigned yet
    return student.department === cls.department
  }

  // Validation: Check if teacher's department matches their assigned classes
  validateTeacherDepartment(teacherId: string): boolean {
    const teacher = this.teachers.find(t => t.id === teacherId)
    if (!teacher) return false
    const teacherClasses = this.classes.filter(c => 
      c.subjectTeachers?.some(st => st.teacherId === teacherId)
    )
    return teacherClasses.every(c => c.department === teacher.department)
  }

  // Assignments
  getAssignments() { return [...this.assignments] }
  getTeacherAssignments(teacherId: string) {
    return this.assignments.filter(a => a.teacherId === teacherId)
  }
  getClassAssignments(classId: string) {
    return this.assignments.filter(a => a.classId === classId)
  }
  addAssignment(assignment: Assignment) {
    this.assignments.push(assignment)
    this.saveToStorage('assignments', this.assignments)
    this.logActivity({
      id: `ACT${Date.now()}`,
      userId: assignment.teacherId,
      userType: 'teacher',
      type: 'assignment',
      action: 'Created assignment',
      description: `Created assignment: ${assignment.title}`,
      metadata: { assignmentId: assignment.id, classId: assignment.classId },
      timestamp: new Date().toISOString()
    })
    this.notify('assignments')
  }
  updateAssignment(id: string, updates: Partial<Assignment>) {
    const index = this.assignments.findIndex(a => a.id === id)
    if (index !== -1) {
      this.assignments[index] = { ...this.assignments[index], ...updates, updatedAt: new Date().toISOString() }
      this.saveToStorage('assignments', this.assignments)
      this.notify('assignments')
    }
  }
  deleteAssignment(id: string) {
    this.assignments = this.assignments.filter(a => a.id !== id)
    this.studentAssignments = this.studentAssignments.filter(sa => sa.assignmentId !== id)
    this.saveToStorage('assignments', this.assignments)
    this.saveToStorage('studentAssignments', this.studentAssignments)
    this.notify('assignments')
  }

  // Student Assignments
  getStudentAssignments(studentId: string) {
    return this.studentAssignments.filter(sa => sa.studentId === studentId)
  }
  submitAssignment(studentAssignment: StudentAssignment) {
    this.studentAssignments.push(studentAssignment)
    this.saveToStorage('studentAssignments', this.studentAssignments)
    this.logActivity({
      id: `ACT${Date.now()}`,
      userId: studentAssignment.studentId,
      userType: 'student',
      type: 'assignment',
      action: 'Submitted assignment',
      description: 'Submitted assignment',
      metadata: { assignmentId: studentAssignment.assignmentId },
      timestamp: new Date().toISOString()
    })
    this.notify('studentAssignments')
  }
  gradeAssignment(id: string, grade: number, feedback: string) {
    const index = this.studentAssignments.findIndex(sa => sa.id === id)
    if (index !== -1) {
      this.studentAssignments[index] = { 
        ...this.studentAssignments[index], 
        grade, 
        feedback, 
        status: 'graded' 
      }
      this.saveToStorage('studentAssignments', this.studentAssignments)
      this.notify('studentAssignments')
    }
  }

  // Materials
  getMaterials() { return [...this.materials] }
  getTeacherMaterials(teacherId: string) {
    return this.materials.filter(m => m.teacherId === teacherId)
  }
  getClassMaterials(classId: string) {
    return this.materials.filter(m => m.classId === classId)
  }
  addMaterial(material: Material) {
    this.materials.push(material)
    this.saveToStorage('materials', this.materials)
    this.logActivity({
      id: `ACT${Date.now()}`,
      userId: material.teacherId,
      userType: 'teacher',
      type: 'material',
      action: 'Uploaded material',
      description: `Uploaded: ${material.title}`,
      metadata: { materialId: material.id, classId: material.classId },
      timestamp: new Date().toISOString()
    })
    this.notify('materials')
  }
  updateMaterial(id: string, updates: Partial<Material>) {
    const index = this.materials.findIndex(m => m.id === id)
    if (index !== -1) {
      this.materials[index] = { ...this.materials[index], ...updates, updatedAt: new Date().toISOString() }
      this.saveToStorage('materials', this.materials)
      this.notify('materials')
    }
  }
  incrementMaterialViews(id: string) {
    const material = this.materials.find(m => m.id === id)
    if (material) {
      this.updateMaterial(id, { views: material.views + 1 })
    }
  }
  incrementMaterialDownloads(id: string) {
    const material = this.materials.find(m => m.id === id)
    if (material) {
      this.updateMaterial(id, { downloads: material.downloads + 1 })
    }
  }

  // Test Papers
  getTestPapers() { return [...this.testPapers] }
  getTestPaper(id: string) { return this.testPapers.find(p => p.id === id) }
  addTestPaper(paper: TestPaper) {
    this.testPapers.push(paper)
    this.saveToStorage('testPapers', this.testPapers)
    this.notify('testPapers')
  }
  updateTestPaper(id: string, updates: Partial<TestPaper>) {
    const index = this.testPapers.findIndex(p => p.id === id)
    if (index !== -1) {
      this.testPapers[index] = { ...this.testPapers[index], ...updates, updatedAt: new Date().toISOString() }
      this.saveToStorage('testPapers', this.testPapers)
      this.notify('testPapers')
    }
  }
  deleteTestPaper(id: string) {
    this.testPapers = this.testPapers.filter(p => p.id !== id)
    this.saveToStorage('testPapers', this.testPapers)
    this.notify('testPapers')
  }

  // Tests
  getTests() { return [...this.tests] }
  getTeacherTests(teacherId: string) {
    return this.tests.filter(t => t.teacherId === teacherId)
  }
  getClassTests(classId: string) {
    return this.tests.filter(t => t.classId === classId)
  }
  addTest(test: Test) {
    this.tests.push(test)
    this.saveToStorage('tests', this.tests)
    this.logActivity({
      id: `ACT${Date.now()}`,
      userId: test.teacherId,
      userType: 'teacher',
      type: 'test',
      action: 'Created test',
      description: `Created ${test.type}: ${test.title}`,
      metadata: { testId: test.id, classId: test.classId },
      timestamp: new Date().toISOString()
    })
    this.notify('tests')
  }
  updateTest(id: string, updates: Partial<Test>) {
    const index = this.tests.findIndex(t => t.id === id)
    if (index !== -1) {
      this.tests[index] = { ...this.tests[index], ...updates }
      this.saveToStorage('tests', this.tests)
      this.notify('tests')
    }
  }

  // Student Tests
  getStudentTests(studentId: string) {
    return this.studentTests.filter(st => st.studentId === studentId)
  }
  recordTestResult(studentTest: StudentTest) {
    this.studentTests.push(studentTest)
    this.saveToStorage('studentTests', this.studentTests)
    this.logActivity({
      id: `ACT${Date.now()}`,
      userId: studentTest.studentId,
      userType: 'student',
      type: 'test',
      action: 'Completed test',
      description: 'Completed test',
      metadata: { testId: studentTest.testId, score: studentTest.score },
      timestamp: new Date().toISOString()
    })
    this.notify('studentTests')
  }

  // Activities
  getActivities(userId?: string, userType?: 'teacher' | 'student' | 'admin') {
    let filtered = [...this.activities]
    if (userId) filtered = filtered.filter(a => a.userId === userId)
    if (userType) filtered = filtered.filter(a => a.userType === userType)
    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }
  logActivity(activity: Activity) {
    this.activities.push(activity)
    this.saveToStorage('activities', this.activities)
    this.notify('activities')
  }
  getRecentActivities(limit: number = 10) {
    return this.activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }
}

// Singleton instance
let dbInstance: DatabaseSimulator | null = null

export function getDatabase(): DatabaseSimulator {
  if (!dbInstance) {
    dbInstance = new DatabaseSimulator()
  }
  return dbInstance
}

export const db = typeof window !== 'undefined' ? getDatabase() : null
