'use client'

import { motion } from 'framer-motion'

export default function MyClassesSection() {
  const classes = [
    {
      id: 1,
      name: 'Mathematics - Grade 10',
      students: 28,
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      nextClass: 'Tomorrow 9:00 AM',
      status: 'active',
    },
    {
      id: 2,
      name: 'Physics - Grade 11',
      students: 24,
      schedule: 'Tue, Thu - 10:30 AM',
      nextClass: 'Today 10:30 AM',
      status: 'upcoming',
    },
    {
      id: 3,
      name: 'Chemistry - Grade 12',
      students: 22,
      schedule: 'Mon, Wed, Fri - 2:00 PM',
      nextClass: 'Monday 2:00 PM',
      status: 'active',
    },
  ]

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">My Classes</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {classes.map((classItem, index) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-primary">{classItem.name}</h3>
                <p className="text-secondary text-sm mt-1">{classItem.schedule}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-secondary">
                    👥 {classItem.students} students
                  </span>
                  <span className="text-sm text-blue-600">
                    📅 {classItem.nextClass}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    classItem.status === 'upcoming'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {classItem.status === 'upcoming' ? 'Upcoming' : 'Active'}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}