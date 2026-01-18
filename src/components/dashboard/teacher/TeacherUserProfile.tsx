'use client'

import { memo, useState, useEffect } from 'react'
import TeacherSettingsModal from './TeacherSettingsModal'

interface UserData {
  name: string
  email: string
  type: string
  id?: string
}

function TeacherUserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

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

  const getAvatarUrl = (userId: string) => {
    const seed = encodeURIComponent(userId)
    const backgroundColor = '4747eb,4762eb,477eeb,4799eb,47b4eb,47d0eb,47eb47,47eb62,47eb7e,47eb99,47ebb4,47ebd0,47ebeb,6247eb,62eb47,7e47eb,7eeb47,9947eb,99eb47,b447eb,b4eb47,d047eb,d0eb47,eb4747,eb4762,eb477e,eb4799,eb47d0,eb47eb,eb6247,eb7e47,eb9947,ebb447,ebd047,ebeb47,ffd5dc,ffdfbf,b6e3f4,c0aede,d1d4f9'
    const backgroundType = 'gradientLinear'
    const backgroundRotation = '0,360,10,20,30'
    
    return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=${backgroundColor}&backgroundType=${backgroundType}&backgroundRotation=${backgroundRotation}`
  }

  return (
    <>
      <div 
        className="flex items-center cursor-pointer rounded-lg bg-white"
        style={{
          gap: '10px',
          padding: '12px 16px',
          margin: '16px 0 0 0'
        }}
        onClick={handleProfileClick}
      >
        <img 
          src={getAvatarUrl(userData?.id || userData?.name || 'teacher')} 
          alt="" 
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <div 
            className="text-[#2e2e2e]"
            style={{
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            {userData?.name || 'Teacher'}
          </div>
          <div 
            className="text-[#8b8b8b]"
            style={{
              fontSize: '11px',
              marginTop: '2px'
            }}
          >
            Teacher
          </div>
        </div>
        <div 
          className="flex items-center justify-center cursor-pointer flex-shrink-0"
          style={{
            width: '20px',
            height: '20px',
            fontSize: '14px'
          }}
          title="Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#abaaaa" viewBox="0 0 256 256">
            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.62a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.08,8.08,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8.08,8.08,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z" />
          </svg>
        </div>
      </div>
      
      <TeacherSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  )
}

export default memo(TeacherUserProfile)