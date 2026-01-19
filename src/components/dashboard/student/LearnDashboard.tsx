'use client'

import { memo } from 'react'
import LearnHeader from './LearnHeader'
import LearnContent from './LearnContent'

function LearnDashboard() {
  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="space-y-6">
        <LearnHeader />
        <LearnContent />
      </div>
    </div>
  )
}

export default memo(LearnDashboard)
