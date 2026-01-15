'use client'

import { memo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { getDatabase } from '@/lib/database'

interface AddStudentModalProps {
  isOpen?: boolean
  onClose: () => void
  onAddStudent?: (student: any) => void
  prefilledClass?: string
  prefilledDepartment?: string
  prefilledCourse?: string
}

export default function AddStudentModal({ isOpen = true, onClose, onAddStudent, prefilledClass, prefilledDepartment, prefilledCourse }: AddStudentModalProps) {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'manual' | 'invite'>('manual')
  const [inviteType, setInviteType] = useState<'single' | 'bulk'>('single')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [branches, setBranches] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [classes, setClasses] = useState<any[]>([])
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [filteredClasses, setFilteredClasses] = useState<any[]>([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    bloodGroup: '',
    dob: '',
    admissionDate: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    department: '',
    course: '',
    class: ''
  })

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const db = getDatabase()
      setBranches(db.getBranches())
      setCourses(db.getCourses())
      setClasses(db.getClasses())
    }
    if (prefilledClass || prefilledDepartment || prefilledCourse) {
      setFormData(prev => ({
        ...prev,
        class: prefilledClass || prev.class,
        department: prefilledDepartment || prev.department,
        course: prefilledCourse || prev.course
      }))
    }
  }, [prefilledClass, prefilledDepartment, prefilledCourse])

  useEffect(() => {
    if (formData.department) {
      const branch = branches.find(b => b.name === formData.department)
      if (branch) {
        setFilteredCourses(courses.filter(c => c.branchId === branch.id))
      }
    } else {
      setFilteredCourses(courses)
    }
  }, [formData.department, branches, courses])

  useEffect(() => {
    if (formData.course) {
      const course = courses.find(c => c.name === formData.course)
      if (course) {
        setFilteredClasses(classes.filter(cl => cl.courseId === course.id))
      }
    } else {
      setFilteredClasses(classes)
    }
  }, [formData.course, courses, classes])

  const generatePassword = () => {
    if (!formData.firstName || !formData.dob) return ''
    const namePrefix = formData.firstName.slice(0, 4)
    const dobFormatted = formData.dob.split('-').reverse().join('')
    return `${namePrefix}@${dobFormatted}`
  }

  const generateInviteLink = () => {
    const baseUrl = window.location.origin
    const linkId = Math.random().toString(36).substring(2, 15)
    setGeneratedLink(`${baseUrl}/invite/student/${inviteType}/${linkId}`)
  }

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopiedItem(itemId)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const db = getDatabase()
    const existingStudent = db.getStudents().find(s => s.email === formData.email)
    if (existingStudent) {
      alert(`A student with email "${formData.email}" already exists.`)
      return
    }
    
    // Generate proper roll number from class code
    const classCode = formData.class.match(/\d+[A-Z]/)?.[0] || formData.class.substring(0, 3).toUpperCase()
    const randomNum = String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')
    const rollNumber = `${classCode}${randomNum}`
    
    const newStudent = {
      id: rollNumber,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      class: formData.class,
      rollNumber: rollNumber,
      admissionDate: formData.admissionDate || new Date().toISOString().split('T')[0],
      status: 'active' as const,
      subjects: [],
      parentContact: formData.parentPhone,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      dateOfBirth: formData.dob,
      parentName: formData.parentName,
      parentEmail: formData.parentEmail,
      department: formData.department,
      course: formData.course
    }
    
    if (onAddStudent) {
      onAddStudent(newStudent)
    }
    handleClose()
  }

  if (!mounted || !isOpen) return null

  const password = generatePassword()

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div 
        className={`absolute inset-0 backdrop-blur-md ${
          isDarkMode ? 'bg-black/40' : 'bg-black/20'
        }`}
        onClick={handleClose}
      />
      
      <div className={`relative rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border w-[90vw] max-w-md max-h-[85vh] overflow-hidden backdrop-blur-xl ${
        isDarkMode 
          ? 'bg-zinc-950/95 border-zinc-800/50' 
          : 'bg-white/95 border-gray-100/50'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b backdrop-blur-sm ${
          isDarkMode ? 'border-zinc-800/50' : 'border-gray-100/50'
        }`}>
          <div>
            <h2 className={`text-lg font-semibold tracking-tight ${
              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>Add Student</h2>
            <p className={`text-sm mt-1 ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>Create new student account</p>
          </div>
          <button 
            onClick={handleClose}
            className={`w-8 h-8 flex items-center justify-center rounded-xl  ${
              isDarkMode 
                ? 'hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-300 hover:scale-105' 
                : 'hover:bg-gray-100/80 text-gray-400 hover:text-gray-600 hover:scale-105'
            }`}
          >
            <i className="ph ph-x" style={{ fontSize: '16px' }} />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
          <div className="p-6 pb-8 space-y-6">
            {/* Tabs */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>Method</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab('manual')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl  text-left border ${
                    activeTab === 'manual'
                      ? isDarkMode 
                        ? 'bg-zinc-800/50 border-zinc-700/50' 
                        : 'bg-gray-50/80 border-gray-300/50'
                      : isDarkMode
                        ? 'hover:bg-zinc-800/30 border-zinc-800/30 hover:border-zinc-700/50 hover:scale-[1.02]'
                        : 'hover:bg-gray-50/80 border-gray-200/30 hover:border-gray-300/50 hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`ph ph-user-plus ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                    }`} style={{ fontSize: '16px' }} />
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>Manual Entry</span>
                  </div>
                  <i className={`ph ph-caret-right ${
                    isDarkMode ? 'text-zinc-600' : 'text-gray-400'
                  }`} style={{ fontSize: '12px' }} />
                </button>
                
                <button
                  onClick={() => setActiveTab('invite')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl  text-left border ${
                    activeTab === 'invite'
                      ? isDarkMode 
                        ? 'bg-zinc-800/50 border-zinc-700/50' 
                        : 'bg-gray-50/80 border-gray-300/50'
                      : isDarkMode
                        ? 'hover:bg-zinc-800/30 border-zinc-800/30 hover:border-zinc-700/50 hover:scale-[1.02]'
                        : 'hover:bg-gray-50/80 border-gray-200/30 hover:border-gray-300/50 hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`ph ph-link ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                    }`} style={{ fontSize: '16px' }} />
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>Invite Link</span>
                  </div>
                  <i className={`ph ph-caret-right ${
                    isDarkMode ? 'text-zinc-600' : 'text-gray-400'
                  }`} style={{ fontSize: '12px' }} />
                </button>
              </div>
            </div>
            {/* Content */}
            {activeTab === 'manual' ? (
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Details</h3>
                
                <div className={`p-5 rounded-2xl backdrop-blur-sm border ${
                  isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/80 border-gray-200/30'
                }`}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Personal Information */}
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="First Name*" 
                        required
                        className={`w-full px-3 py-3 rounded-xl border text-sm ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                        }`}
                      />
                      <input 
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Last Name*" 
                        required
                        className={`w-full px-3 py-3 rounded-xl border text-sm ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                        }`}
                      />
                    </div>

                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Email Address*" 
                      required
                      className={`w-full px-3 py-3 rounded-xl border text-sm ${
                        isDarkMode 
                          ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                      }`}
                    />
            
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Phone Number*" 
                      required
                      className={`w-full px-3 py-3 rounded-xl border text-sm ${
                        isDarkMode 
                          ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                      }`}
                    />
                    
                    <textarea 
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Address*"
                      required
                      rows={2}
                      className={`w-full px-3 py-3 rounded-xl border text-sm  ${
                        isDarkMode 
                          ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                      }`}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        required
                        className={`w-full px-3 py-3 rounded-xl border text-sm  ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                            : 'bg-white border-gray-300 text-gray-600 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                        }`}
                      >
                        <option value="">Select Gender*</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      
                      <select
                        value={formData.bloodGroup}
                        onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                        required
                        className={`w-full px-3 py-3 rounded-xl border text-sm  ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                            : 'bg-white border-gray-300 text-gray-600 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                        }`}
                      >
                        <option value="">Blood Group*</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-medium mb-1 ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                        }`}>Date of Birth*</label>
                        <input 
                          type="date" 
                          value={formData.dob}
                          onChange={(e) => handleInputChange('dob', e.target.value)}
                          required
                          className={`w-full px-3 py-3 rounded-xl border text-sm ${
                            isDarkMode 
                              ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                              : 'bg-white border-gray-300 text-gray-600 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-xs font-medium mb-1 ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                        }`}>Date of Admission*</label>
                        <input 
                          type="date" 
                          value={formData.admissionDate}
                          onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                          required
                          className={`w-full px-3 py-3 rounded-xl border text-sm ${
                            isDarkMode 
                              ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                              : 'bg-white border-gray-300 text-gray-600 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                          }`}
                        />
                      </div>
                    </div>

                    <input 
                      type="text" 
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      placeholder="Parent Name*" 
                      required
                      className={`w-full px-3 py-3 rounded-xl border text-sm ${
                        isDarkMode 
                          ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                      }`}
                    />
                      
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="email" 
                        value={formData.parentEmail}
                        onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                        placeholder="Parent Email*" 
                        required
                        className={`w-full px-3 py-3 rounded-xl border text-sm ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                        }`}
                      />
                      
                      <input 
                        type="tel" 
                        value={formData.parentPhone}
                        onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                        placeholder="Parent Phone*" 
                        required
                        className={`w-full px-3 py-3 rounded-xl border text-sm ${
                          isDarkMode 
                            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder-zinc-400 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                        }`}
                      />
                    </div>
            
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        required
                        disabled={!!prefilledDepartment}
                        className={`w-full px-3 py-3 rounded-xl border text-sm ${
                          prefilledDepartment
                            ? isDarkMode
                              ? 'bg-zinc-800/30 border-zinc-700/50 text-zinc-300 cursor-not-allowed'
                              : 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed'
                            : isDarkMode 
                              ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                        }`}
                      >
                        <option value="">Select Department*</option>
                        {branches.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                      </select>
                      
                      <select
                        value={formData.course}
                        onChange={(e) => handleInputChange('course', e.target.value)}
                        required
                        disabled={!!prefilledCourse || !formData.department}
                        className={`w-full px-3 py-3 rounded-xl border text-sm ${
                          prefilledCourse || !formData.department
                            ? isDarkMode
                              ? 'bg-zinc-800/30 border-zinc-700/50 text-zinc-300 cursor-not-allowed'
                              : 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed'
                            : isDarkMode 
                              ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                        }`}
                      >
                        <option value="">Select Course*</option>
                        {filteredCourses.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                      
                      <select
                        value={formData.class}
                        onChange={(e) => handleInputChange('class', e.target.value)}
                        required
                        disabled={!!prefilledClass || !formData.course}
                        className={`w-full px-3 py-3 rounded-xl border text-sm ${
                          prefilledClass || !formData.course
                            ? isDarkMode
                              ? 'bg-zinc-800/30 border-zinc-700/50 text-zinc-300 cursor-not-allowed'
                              : 'bg-gray-100 border-gray-300 text-gray-700 cursor-not-allowed'
                            : isDarkMode 
                              ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-gray-600 focus:ring-2 focus:ring-gray-200'
                        }`}
                      >
                        <option value="">Select Class*</option>
                        {filteredClasses.map(cl => <option key={cl.id} value={cl.name}>{cl.name}</option>)}
                      </select>
                    </div>
                    
                    {password && (
                      <div className="relative">
                        <input 
                          type="text" 
                          value={password}
                          readOnly
                          placeholder="Auto-generated Password"
                          className={`w-full px-3 py-3 pr-10 rounded-xl border text-sm font-mono cursor-pointer ${
                            isDarkMode 
                              ? 'bg-zinc-800/30 border-zinc-700/50 text-zinc-300'
                              : 'bg-gray-50 border-gray-300 text-gray-800'
                          }`}
                          onClick={() => copyToClipboard(password, 'password')}
                          title="Click to copy password"
                        />
                        <button
                          type="button"
                          onClick={() => copyToClipboard(password, 'password')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 "
                        >
                          {copiedItem === 'password' ? (
                            <i className="ph ph-check text-xs text-green-500" />
                          ) : (
                            <i className={`ph ph-copy text-xs ${
                              isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-500 hover:text-gray-700'
                            }`} />
                          )}
                        </button>
                      </div>
                    )}
                    
                    <button 
                      type="submit"
                      className="w-full bg-[#8C7B65] hover:bg-[#7A6B58] text-white py-3 rounded-xl text-sm font-medium "
                    >
                      Create Student Account
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>Invite Type</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setInviteType('single')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl  text-left border ${
                      inviteType === 'single'
                        ? isDarkMode 
                          ? 'bg-zinc-800/50 border-zinc-700/50' 
                          : 'bg-gray-50/80 border-gray-300/50'
                        : isDarkMode
                          ? 'hover:bg-zinc-800/30 border-zinc-800/30 hover:border-zinc-700/50 hover:scale-[1.02]'
                          : 'hover:bg-gray-50/80 border-gray-200/30 hover:border-gray-300/50 hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`ph ph-user-plus ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                      }`} style={{ fontSize: '16px' }} />
                      <div>
                        <span className={`text-sm font-medium block ${
                          isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                        }`}>Single Invite</span>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Direct registration</span>
                      </div>
                    </div>
                    <i className={`ph ph-caret-right ${
                      isDarkMode ? 'text-zinc-600' : 'text-gray-400'
                    }`} style={{ fontSize: '12px' }} />
                  </button>
                  
                  <button
                    onClick={() => setInviteType('bulk')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl  text-left border ${
                      inviteType === 'bulk'
                        ? isDarkMode 
                          ? 'bg-zinc-800/50 border-zinc-700/50' 
                          : 'bg-gray-50/80 border-gray-300/50'
                        : isDarkMode
                          ? 'hover:bg-zinc-800/30 border-zinc-800/30 hover:border-zinc-700/50 hover:scale-[1.02]'
                          : 'hover:bg-gray-50/80 border-gray-200/30 hover:border-gray-300/50 hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`ph ph-users-three ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                      }`} style={{ fontSize: '16px' }} />
                      <div>
                        <span className={`text-sm font-medium block ${
                          isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                        }`}>Bulk Invite</span>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Requires approval</span>
                      </div>
                    </div>
                    <i className={`ph ph-caret-right ${
                      isDarkMode ? 'text-zinc-600' : 'text-gray-400'
                    }`} style={{ fontSize: '12px' }} />
                  </button>
                </div>
                
                {generatedLink ? (
                  <div className={`p-4 rounded-2xl border ${
                    isDarkMode 
                      ? 'bg-zinc-900/50 border-zinc-800/30' 
                      : 'bg-gray-50/80 border-gray-200/30'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <i className={`ph ph-check-circle text-green-500`} style={{ fontSize: '16px' }} />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-zinc-200' : 'text-gray-800'
                      }`}>Link Generated</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={generatedLink}
                        readOnly
                        className={`w-full px-3 py-3 pr-10 rounded-xl border text-xs font-mono cursor-pointer select-all ${
                          isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100' : 'bg-white border-gray-300 text-gray-800'
                        }`}
                        onClick={() => copyToClipboard(generatedLink, 'link')}
                      />
                      <button
                        onClick={() => copyToClipboard(generatedLink, 'link')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 "
                      >
                        {copiedItem === 'link' ? (
                          <i className="ph ph-check text-xs text-green-500" />
                        ) : (
                          <i className={`ph ph-copy text-xs ${
                            isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-500 hover:text-gray-700'
                          }`} />
                        )}
                      </button>
                    </div>
                    <button 
                      onClick={() => setGeneratedLink('')}
                      className={`mt-3 text-xs ${
                        isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Generate New Link
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={generateInviteLink}
                    className="w-full bg-[#8C7B65] hover:bg-[#7A6B58] text-white py-3 rounded-xl text-sm font-medium "
                  >
                    Generate {inviteType === 'single' ? 'Single' : 'Bulk'} Invite Link
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}