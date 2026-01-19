'use client'

import { useEffect, useState } from 'react'

interface AlertProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  show?: boolean
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

export default function Alert({ 
  message, 
  type = 'info', 
  show = false, 
  onClose, 
  autoClose = true, 
  duration = 4000 
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    setIsVisible(show)
    
    if (show && autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [show, autoClose, duration, onClose])

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'rgba(34, 197, 94, 0.96)'
      case 'error':
        return 'rgba(239, 68, 68, 0.96)'
      case 'warning':
        return 'rgba(245, 158, 11, 0.96)'
      case 'info':
        return 'rgba(59, 130, 246, 0.96)'
      default:
        return 'rgba(10, 10, 10, 0.96)'
    }
  }

  return (
    <div
      className={`alert ${isVisible ? 'show' : ''}`}
      style={{
        position: 'fixed',
        top: '24px',
        right: isVisible ? '24px' : '-400px',
        background: getBackgroundColor(),
        backdropFilter: 'blur(12px)',
        color: '#ffffff',
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 500,
        transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1000,
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        minWidth: '280px',
        cursor: 'pointer'
      }}
      onClick={() => {
        setIsVisible(false)
        onClose?.()
      }}
    >
      {message}
    </div>
  )
}