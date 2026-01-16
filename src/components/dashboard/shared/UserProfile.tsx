'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import SettingsModal from './SettingsModal'

interface UserData {
  name: string
  email: string
  type: string
  id?: string
}

interface UserProfileProps {
  role?: 'admin' | 'student' | 'teacher'
}

function UserProfile({ role = 'admin' }: UserProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('user_data')
      if (data) {
        try {
          setUserData(JSON.parse(data))
        } catch {
          // Handle invalid JSON
        }
      }
    }
  }, [])

  const handleProfileClick = () => {
    setIsSettingsOpen(true)
  }

  const getStudentAvatar = () => {
    return 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=12A008&radius=0&backgroundType[]&eyes=variant01,variant02,variant03,variant05,variant06,variant04,variant07,variant08,variant09,variant10,variant12,variant11,variant13,variant14,variant15,variant26,variant25,variant24,variant22,variant23,variant21,variant20&glassesProbability=30&mouth=variant01,variant02,variant03,variant04,variant05,variant07,variant08,variant09,variant10,variant11,variant12,variant13,variant14,variant15,variant16,variant17,variant18,variant19,variant20,variant21,variant22,variant23,variant24,variant25,variant26,variant27,variant28,variant29,variant30'
  }

  const getAvatarUrl = (userId: string) => {
    if (role === 'student') {
      return getStudentAvatar()
    }
    const seed = encodeURIComponent(userId)
    const backgroundColor = '4747eb,4762eb,477eeb,4799eb,47b4eb,47d0eb,47eb47,47eb62,47eb7e,47eb99,47ebb4,47ebd0,47ebeb,6247eb,62eb47,7e47eb,7eeb47,9947eb,99eb47,b447eb,b4eb47,d047eb,d0eb47,eb4747,eb4762,eb477e,eb4799,eb47d0,eb47eb,eb6247,eb7e47,eb9947,ebb447,ebd047,ebeb47,ffd5dc,ffdfbf,b6e3f4,c0aede,d1d4f9'
    const backgroundType = 'gradientLinear'
    const backgroundRotation = '0,360,10,20,30'
    
    return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=${backgroundColor}&backgroundType=${backgroundType}&backgroundRotation=${backgroundRotation}`
  }

  const getUserLabel = () => {
    if (role === 'student') return userData?.id || '9B022'
    if (role === 'teacher') return 'Teacher'
    return 'Administrator'
  }

  const getUserName = () => {
    if (role === 'student') return userData?.name || 'Sneha Singh'
    return userData?.name || 'Admin User'
  }

  return (
    <>
      <div className={`flex-shrink-0 sticky bottom-0 p-3 border-t ${
        mounted && isDarkMode 
          ? 'bg-zinc-950/95 border-zinc-800/50' 
          : 'bg-[#f9f9f7] border-gray-200'
      }`} suppressHydrationWarning>
        <div 
          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer  ${
            mounted && isDarkMode 
              ? 'hover:bg-zinc-800/30' 
              : 'hover:bg-gray-100'
          }`}
          onClick={handleProfileClick}
        >
          <img 
            src={getAvatarUrl(userData?.id || userData?.name || 'admin')} 
            alt="" 
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className={`text-sm font-medium truncate ${
              mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>
              {getUserName()}
            </div>
            <div className={`text-xs truncate ${
              mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>
              {getUserLabel()}
            </div>
          </div>
          <div className={`flex-shrink-0 ${
            mounted && isDarkMode ? 'text-zinc-500' : 'text-[#abaaaa]'
          }`} title="Settings" suppressHydrationWarning>
            <i className="ph ph-gear text-lg" />
          </div>
        </div>
      </div>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        role={role}
      />
    </>
  )
}

export default memo(UserProfile)