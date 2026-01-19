'use client'

import { useState, useEffect } from 'react'

interface RoleSelectorProps {
  currentRole: string
  onRoleChange: (role: string) => void
}

export default function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  const [showRoleOptions, setShowRoleOptions] = useState(false)

  const roles = [
    { value: 'admin', text: 'Admin' },
    { value: 'teacher', text: 'Teacher' },
    { value: 'student', text: 'Student' }
  ]

  const currentRoleText = roles.find(role => role.value === currentRole)?.text || 'Admin'

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons()
    }
  }, [showRoleOptions])

  const toggleDropdown = () => {
    setShowRoleOptions(!showRoleOptions)
  }

  const selectRole = (value: string, text: string) => {
    setShowRoleOptions(false)
    onRoleChange(value)
  }

  return (
    <div className={`custom-select ${showRoleOptions ? 'open' : ''}`}>
      <div className="select-display" onClick={toggleDropdown}>
        <span>{currentRoleText}</span>
        <i data-lucide="chevron-down" className="chevron-icon"></i>
      </div>
      <div className={`select-options ${showRoleOptions ? 'show' : ''}`}>
        {roles.map((role) => (
          <div
            key={role.value}
            className="select-option"
            onClick={() => selectRole(role.value, role.text)}
          >
            {role.text}
          </div>
        ))}
      </div>
    </div>
  )
}