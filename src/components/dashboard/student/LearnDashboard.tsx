'use client'

import { memo } from 'react'
import LearnHeader from './LearnHeader'
import LearnContent from './LearnContent'

function LearnDashboard() {
  return (
    <div className="space-y-6">
      <LearnHeader />
      <LearnContent />
    </div>
  )
}

export default memo(LearnDashboard)
