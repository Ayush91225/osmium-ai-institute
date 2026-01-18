'use client'

import { motion } from 'framer-motion'

export default function StudentsSection() {
  const recentStudents = [
    {
      id: 1,
      name: 'Rahul Sharma',
      class: 'Grade 10 - Math',
      performance: 'Excellent',
      lastActivity: '2 hours ago',
      avatar: '👨‍🎓',
    },
    {
      id: 2,
      name: 'Priya Patel',
      class: 'Grade 11 - Physics',
      performance: 'Good',
      lastActivity: '4 hours ago',
      avatar: '👩‍🎓',
    },
    {
      id: 3,
      name: 'Arjun Kumar',
      class: 'Grade 12 - Chemistry',
      performance: 'Needs Attention',
      lastActivity: '1 day ago',
      avatar: '👨‍🎓',
    },
  ]

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">Recent Student Activity</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {recentStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
              {student.avatar}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-primary">{student.name}</h3>
              <p className="text-sm text-secondary">{student.class}</p>
            </div>
            <div className="text-right">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  student.performance === 'Excellent'
                    ? 'bg-green-100 text-green-600'
                    : student.performance === 'Good'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {student.performance}
              </span>
              <p className="text-xs text-secondary mt-1">{student.lastActivity}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}