'use client'

import { useEffect } from 'react'

interface InstituteTypeStepProps {
  selectedType: string
  onTypeSelect: (type: string) => void
}

export default function InstituteTypeStep({ selectedType, onTypeSelect }: InstituteTypeStepProps) {
  const types = [
    { value: 'school', label: 'School', icon: 'school' },
    { value: 'college', label: 'College', icon: 'building' },
    { value: 'university', label: 'University', icon: 'university' },
    { value: 'coaching', label: 'Coaching', icon: 'users-round' },
    { value: 'other', label: 'Others', icon: 'ellipsis' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).lucide) {
        (window as any).lucide.createIcons()
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [selectedType])

  return (
    <div className="form-step active">
      <div className="input-group">
        <div className="institute-types">
          {types.map((type) => (
            <div
              key={type.value}
              className={`type-card ${selectedType === type.value ? 'selected' : ''}`}
              onClick={() => onTypeSelect(type.value)}
            >
              <i data-lucide={type.icon}></i>
              <span>{type.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}