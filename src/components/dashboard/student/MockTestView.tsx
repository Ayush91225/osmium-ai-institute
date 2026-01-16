'use client'

import { memo } from 'react'

function MockTestView() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Mock Test Page</h1>
        <p className="text-gray-600 mt-4">Mock test interface will be implemented here</p>
      </div>
    </div>
  )
}

export default memo(MockTestView)
