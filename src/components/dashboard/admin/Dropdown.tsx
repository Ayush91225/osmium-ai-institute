'use client'

import { memo, useState, useEffect, useRef } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

function Dropdown({ options, value, onChange, placeholder = "Select option", className = "" }: DropdownProps) {
  const { isDarkMode } = useDarkMode()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)

  if (!mounted) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">{placeholder}</span>
            <i className="ph ph-caret-down text-xs text-gray-400" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl border text-sm text-left  duration-200 focus:outline-none focus:ring-2 focus:ring-[#8C7B65]/20 ${
          isDarkMode 
            ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-100 hover:bg-zinc-800' 
            : 'bg-gray-50 border-gray-200 text-gray-900 hover:bg-white'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? '' : isDarkMode ? 'text-zinc-400' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <i className={`ph ph-caret-down text-xs transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`} />
        </div>
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-lg z-50 transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-zinc-800 border-zinc-700/50' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2.5 text-sm text-left transition-colors duration-200 ${
                  value === option.value
                    ? isDarkMode
                      ? 'bg-zinc-700/50 text-zinc-100'
                      : 'bg-gray-100 text-gray-900'
                    : isDarkMode
                      ? 'text-zinc-300 hover:bg-zinc-700/30'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(Dropdown)