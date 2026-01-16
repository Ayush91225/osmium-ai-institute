'use client'

import { memo } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'

function MockTestView() {
  const router = useRouter()
  const { isDarkMode } = useDarkMode()

  const handleSubmit = () => {
    router.push('/dashboard/student/exam/mock-test/analytic')
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <div className="text-center py-20">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Mock Test Page</h1>
        <p className={`mt-4 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Mock test interface will be implemented here</p>
        <button
          onClick={handleSubmit}
          className={`mt-8 px-6 py-3 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          Submit Test
        </button>
      </div>
    </div>
  )
}

export default memo(MockTestView)
