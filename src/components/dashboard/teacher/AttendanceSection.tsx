'use client'

import { motion } from 'framer-motion'

export default function AttendanceSection() {
  const attendanceData = [
    {
      class: 'Grade 10 - Math',
      date: '2024-01-12',
      present: 25,
      total: 28,
      percentage: 89,
    },
    {
      class: 'Grade 11 - Physics',
      date: '2024-01-12',
      present: 22,
      total: 24,
      percentage: 92,
    },
    {
      class: 'Grade 12 - Chemistry',
      date: '2024-01-11',
      present: 19,
      total: 22,
      percentage: 86,
    },
  ]

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">Recent Attendance</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium">Take Attendance</button>
      </div>

      <div className="space-y-4">
        {attendanceData.map((attendance, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
          >
            <div>
              <h3 className="font-medium text-primary">{attendance.class}</h3>
              <p className="text-sm text-secondary mt-1">
                {new Date(attendance.date).toLocaleDateString()}
              </p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-secondary">
                  {attendance.present}/{attendance.total}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    attendance.percentage >= 90
                      ? 'bg-green-100 text-green-600'
                      : attendance.percentage >= 80
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {attendance.percentage}%
                </span>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    attendance.percentage >= 90
                      ? 'bg-green-500'
                      : attendance.percentage >= 80
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${attendance.percentage}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}