'use client'

import { memo } from 'react'

interface MobileToggleProps {
  onClick: () => void
}

function MobileToggle({ onClick }: MobileToggleProps) {
  return (
    <button 
      id="mobile-toggle"
      onClick={onClick}
      className="fixed top-4 left-4 z-40 lg:hidden w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50"
    >
      <i className="fa-solid fa-bars text-sm" />
    </button>
  )
}

export default memo(MobileToggle)