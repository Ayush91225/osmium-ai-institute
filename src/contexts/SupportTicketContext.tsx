'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SupportTicket {
  id: string
  category: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  subject: string
  description: string
  status: 'pending' | 'in-progress' | 'resolved' | 'closed'
  attachments: File[]
  createdAt: Date
  updatedAt: Date
}

interface SupportTicketContextType {
  tickets: SupportTicket[]
  createTicket: (ticket: Omit<SupportTicket, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void
}

const SupportTicketContext = createContext<SupportTicketContextType | undefined>(undefined)

export function SupportTicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      category: 'Platform Access & Authentication',
      severity: 'high',
      subject: 'Unable to login to admin panel',
      description: 'Getting authentication error when trying to access the dashboard',
      status: 'resolved',
      attachments: [],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16')
    },
    {
      id: '2', 
      category: 'Student & Faculty Management',
      severity: 'medium',
      subject: 'Student profile not updating',
      description: 'Changes to student information are not being saved properly',
      status: 'in-progress',
      attachments: [],
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    }
  ])

  const createTicket = (ticketData: Omit<SupportTicket, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: SupportTicket = {
      ...ticketData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setTickets(prev => [newTicket, ...prev])
  }

  const updateTicketStatus = (id: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id 
        ? { ...ticket, status, updatedAt: new Date() }
        : ticket
    ))
  }

  return (
    <SupportTicketContext.Provider value={{ tickets, createTicket, updateTicketStatus }}>
      {children}
    </SupportTicketContext.Provider>
  )
}

export function useSupportTickets() {
  const context = useContext(SupportTicketContext)
  if (!context) {
    throw new Error('useSupportTickets must be used within SupportTicketProvider')
  }
  return context
}