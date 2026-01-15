'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

function RecentAssignmentsSection() {
  const { isDarkMode } = useDarkMode()

  const assignments = [
    { id: 1, title: 'Calculus Problem Set', subject: 'Mathematics', dueDate: '2 days left', status: 'pending' },
    { id: 2, title: 'Newton\'s Laws Lab Report', subject: 'Physics', dueDate: '5 days left', status: 'pending' },
    { id: 3, title: 'Organic Chemistry Quiz', subject: 'Chemistry', dueDate: 'Submitted', status: 'submitted' },
  ]

  return (
    <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-zinc-900/50 border border-zinc-800/50' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Recent Assignments
        </h2>
        <button className={`text-sm ${isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-900'}`}>
          View All
        </button>
      </div>

      <div className="space-y-3">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className={`p-4 rounded-xl ${isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-800' : 'bg-gray-50 hover:bg-gray-100'} transition-colors cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {assignment.title}
                </h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {assignment.subject}
                </p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${
                assignment.status === 'pending'
                  ? isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-700'
                  : isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
              }`}>
                {assignment.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(RecentAssignmentsSection)
