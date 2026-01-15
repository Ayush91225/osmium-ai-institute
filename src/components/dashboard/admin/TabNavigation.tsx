'use client'

import { useDarkMode } from '@/contexts/DarkModeContext'

interface Tab {
  id: string
  label: string
  icon: string
}

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tabId: string) => void
  type?: 'student' | 'teacher' | 'subject'
}

export default function TabNavigation({ activeTab, onTabChange, type = 'student' }: TabNavigationProps) {
  const { isDarkMode } = useDarkMode()

  const studentTabs: Tab[] = [
    { id: 'overview', label: 'Overview', icon: 'ph-user' },
    { id: 'academic', label: 'Academic', icon: 'ph-book-open' },
    { id: 'activities', label: 'Activities', icon: 'ph-clock-clockwise' },
    { id: 'wellness', label: 'Mental Health', icon: 'ph-heart' },
    { id: 'career', label: 'Career Path', icon: 'ph-path' },
    { id: 'tests', label: 'Tests', icon: 'ph-exam' }
  ]

  const teacherTabs: Tab[] = [
    { id: 'overview', label: 'Overview', icon: 'ph-user' },
    { id: 'academic', label: 'Academic', icon: 'ph-book-open' },
    { id: 'assignments', label: 'Assignments', icon: 'ph-clipboard-text' },
    { id: 'materials', label: 'Study Material', icon: 'ph-file-text' },
    { id: 'tests', label: 'Exams', icon: 'ph-exam' },
    { id: 'activities', label: 'Activities', icon: 'ph-clock-clockwise' }
  ]

  const subjectTabs: Tab[] = [
    { id: 'overview', label: 'Overview', icon: 'ph-info' },
    { id: 'academic', label: 'Academic', icon: 'ph-book-open' }
  ]

  const tabs = type === 'subject' ? subjectTabs : type === 'teacher' ? teacherTabs : studentTabs

  return (
    <div className={`rounded-2xl border ${
      isDarkMode 
        ? 'bg-zinc-900/60 border-zinc-800/40' 
        : 'bg-white/80 border-gray-200/60'
    }`}>
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium  whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-[#8C7B65] border-b-2 border-[#8C7B65] bg-[#8C7B65]/5'
                : isDarkMode 
                  ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
            }`}
          >
            <i className={`${tab.icon} text-sm`} />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}