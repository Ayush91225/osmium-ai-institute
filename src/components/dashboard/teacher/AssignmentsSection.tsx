'use client'

import { motion } from 'framer-motion'

export default function AssignmentsSection() {
  const assignments = [
    {
      id: 1,
      title: 'Quadratic Equations Practice',
      class: 'Grade 10 - Math',
      dueDate: '2024-01-15',
      submitted: 18,
      total: 28,
      status: 'active',
    },
    {
      id: 2,
      title: 'Newton\'s Laws Lab Report',
      class: 'Grade 11 - Physics',
      dueDate: '2024-01-18',
      submitted: 12,
      total: 24,
      status: 'active',
    },
    {
      id: 3,
      title: 'Organic Chemistry Quiz',
      class: 'Grade 12 - Chemistry',
      dueDate: '2024-01-12',
      submitted: 22,
      total: 22,
      status: 'completed',
    },
  ]

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">Assignments</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create New
        </button>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-100 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-primary">{assignment.title}</h3>
                <p className="text-secondary text-sm mt-1">{assignment.class}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-sm text-secondary">
                    📅 Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-secondary">
                    📊 {assignment.submitted}/{assignment.total} submitted
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assignment.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {assignment.status === 'completed' ? 'Completed' : 'Active'}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}