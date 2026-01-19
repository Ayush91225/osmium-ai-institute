'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

interface DarkModeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize theme immediately to prevent flash
  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    const savedMode = saved ? JSON.parse(saved) : false
    
    // Apply theme immediately before component mounts
    document.documentElement.classList.toggle('dark', savedMode)
    document.documentElement.setAttribute('data-theme', savedMode ? 'dark' : 'light')
    document.documentElement.style.colorScheme = savedMode ? 'dark' : 'light'
    document.documentElement.style.backgroundColor = savedMode ? 'rgb(9 9 11 / 0.95)' : '#F9F8F6'
    document.body.style.backgroundColor = savedMode ? 'rgb(9 9 11 / 0.95)' : '#F9F8F6'
    
    setIsDarkMode(savedMode)
    setMounted(true)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev: boolean) => {
      const newMode = !prev
      localStorage.setItem('darkMode', JSON.stringify(newMode))
      document.documentElement.classList.toggle('dark', newMode)
      document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light')
      document.documentElement.style.colorScheme = newMode ? 'dark' : 'light'
      document.documentElement.style.backgroundColor = newMode ? 'rgb(9 9 11 / 0.95)' : '#F9F8F6'
      document.body.style.backgroundColor = newMode ? 'rgb(9 9 11 / 0.95)' : '#F9F8F6'
      return newMode
    })
  }, [])

  // Render children immediately with a fallback theme class
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={mounted ? '' : 'opacity-0'}>
        {children}
      </div>
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}