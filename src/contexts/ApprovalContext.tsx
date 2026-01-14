'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface ApprovalRequest {
  id: string
  type: 'teacher' | 'student'
  name: string
  email: string
  phone: string
  inviteLink: string
  requestedAt: string
  status: 'pending' | 'approved' | 'rejected'
  approvedAt?: string
  approvedBy?: string
  // Teacher specific fields
  department?: string
  subjects?: string[]
  qualification?: string
  experience?: number
  joiningDate?: string
  employeeId?: string
  address?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  bloodGroup?: string
  emergencyContact?: string
  // Student specific fields
  class?: string
  rollNumber?: string
  admissionDate?: string
  parentName?: string
  parentEmail?: string
  parentContact?: string
  previousSchool?: string
  grade?: string
}

interface ApprovalContextType {
  approvals: ApprovalRequest[]
  pendingApprovals: ApprovalRequest[]
  approvedApprovals: ApprovalRequest[]
  rejectedApprovals: ApprovalRequest[]
  activeTab: 'pending' | 'approved' | 'rejected'
  setActiveTab: (tab: 'pending' | 'approved' | 'rejected') => void
  approveRequest: (id: string) => void
  rejectRequest: (id: string) => void
  filterType: 'all' | 'teacher' | 'student'
  setFilterType: (type: 'all' | 'teacher' | 'student') => void
}

const ApprovalContext = createContext<ApprovalContextType | undefined>(undefined)

const mockApprovals: ApprovalRequest[] = [
  {
    id: 'req-001',
    type: 'teacher',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 234-567-8901',
    inviteLink: 'https://app.osmium.co.in/invite/single/abc123def',
    requestedAt: '2024-01-15T10:30:00Z',
    status: 'pending',
    department: 'Mathematics',
    subjects: ['Calculus', 'Algebra'],
    qualification: 'Ph.D. in Mathematics',
    experience: 8,
    joiningDate: '2024-02-01',
    employeeId: 'EMP001',
    address: '123 Academic Street, Education City',
    dateOfBirth: '1985-03-15',
    gender: 'female',
    bloodGroup: 'A+',
    emergencyContact: '+1 234-567-8999'
  },
  {
    id: 'req-002',
    type: 'student',
    name: 'Alex Chen',
    email: 'alex.chen@student.email.com',
    phone: '+1 234-567-8902',
    inviteLink: 'http://localhost:3000/invite/single/sruzoq4wsn',
    requestedAt: '2024-01-14T15:45:00Z',
    status: 'pending',
    class: 'Grade 11A',
    rollNumber: '11A025',
    admissionDate: '2024-01-20',
    parentName: 'David Chen',
    parentEmail: 'david.chen@email.com',
    parentContact: '+1 234-567-8903',
    previousSchool: 'Central High School',
    grade: '11',
    address: '456 Student Lane, Learning District',
    dateOfBirth: '2007-08-22',
    gender: 'male',
    bloodGroup: 'B+'
  },
  {
    id: 'req-003',
    type: 'teacher',
    name: 'Prof. Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 234-567-8904',
    inviteLink: 'http://10.233.191.17:3000/invite/single/ghi789xyz',
    requestedAt: '2024-01-13T09:15:00Z',
    status: 'approved',
    approvedAt: '2024-01-13T14:20:00Z',
    approvedBy: 'Admin',
    department: 'Physics',
    subjects: ['Quantum Physics', 'Mechanics'],
    qualification: 'M.Sc. Physics',
    experience: 12,
    joiningDate: '2024-01-15',
    employeeId: 'EMP002',
    address: '789 Science Avenue, Research Park',
    dateOfBirth: '1980-11-08',
    gender: 'male',
    bloodGroup: 'O+',
    emergencyContact: '+1 234-567-8998'
  },
  {
    id: 'req-004',
    type: 'student',
    name: 'Emma Wilson',
    email: 'emma.wilson@student.email.com',
    phone: '+1 234-567-8905',
    inviteLink: 'https://app.osmium.co.in/invite/single/jkl012mno',
    requestedAt: '2024-01-12T11:30:00Z',
    status: 'approved',
    approvedAt: '2024-01-12T16:45:00Z',
    approvedBy: 'Admin',
    class: 'Grade 12B',
    rollNumber: '12B018',
    admissionDate: '2024-01-15',
    parentName: 'Robert Wilson',
    parentEmail: 'robert.wilson@email.com',
    parentContact: '+1 234-567-8906',
    previousSchool: 'Westfield Academy',
    grade: '12',
    address: '321 Scholar Road, Academic Heights',
    dateOfBirth: '2006-05-14',
    gender: 'female',
    bloodGroup: 'AB+'
  },
  {
    id: 'req-005',
    type: 'teacher',
    name: 'Dr. Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1 234-567-8907',
    inviteLink: 'http://localhost:8080/invite/single/mno345pqr',
    requestedAt: '2024-01-11T08:00:00Z',
    status: 'rejected',
    department: 'Chemistry',
    subjects: ['Organic Chemistry'],
    qualification: 'Ph.D. in Chemistry',
    experience: 5,
    joiningDate: '2024-02-15',
    employeeId: 'EMP003',
    address: '654 Lab Street, Chemical District',
    dateOfBirth: '1988-07-20',
    gender: 'female',
    bloodGroup: 'A-',
    emergencyContact: '+1 234-567-8997'
  }
]

export function ApprovalProvider({ children }: { children: ReactNode }) {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(mockApprovals)
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [filterType, setFilterType] = useState<'all' | 'teacher' | 'student'>('all')

  const pendingApprovals = approvals.filter(a => a.status === 'pending' && (filterType === 'all' || a.type === filterType))
  const approvedApprovals = approvals.filter(a => a.status === 'approved' && (filterType === 'all' || a.type === filterType))
  const rejectedApprovals = approvals.filter(a => a.status === 'rejected' && (filterType === 'all' || a.type === filterType))

  const approveRequest = (id: string) => {
    setApprovals(prev => prev.map(approval => 
      approval.id === id 
        ? { 
            ...approval, 
            status: 'approved' as const,
            approvedAt: new Date().toISOString(),
            approvedBy: 'Admin'
          }
        : approval
    ))
  }

  const rejectRequest = (id: string) => {
    setApprovals(prev => prev.map(approval => 
      approval.id === id 
        ? { ...approval, status: 'rejected' as const }
        : approval
    ))
  }

  return (
    <ApprovalContext.Provider value={{
      approvals,
      pendingApprovals,
      approvedApprovals,
      rejectedApprovals,
      activeTab,
      setActiveTab,
      approveRequest,
      rejectRequest,
      filterType,
      setFilterType
    }}>
      {children}
    </ApprovalContext.Provider>
  )
}

export function useApprovals() {
  const context = useContext(ApprovalContext)
  if (!context) {
    throw new Error('useApprovals must be used within an ApprovalProvider')
  }
  return context
}