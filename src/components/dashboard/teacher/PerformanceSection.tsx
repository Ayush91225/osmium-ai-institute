'use client'

import { motion } from 'framer-motion'

export default function PerformanceSection() {
  const performanceData = [
    {
      class: 'Grade 10 - Math',
      avgScore: 78,
      improvement: '+5%',
      topPerformer: 'Rahul Sharma',
      needsAttention: 2,
    },
    {
      class: 'Grade 11 - Physics',
      avgScore: 82,
      improvement: '+3%',
      topPerformer: 'Priya Patel',
      needsAttention: 1,
    },
    {
      class: 'Grade 12 - Chemistry',
      avgScore: 75,
      improvement: '-2%',
      topPerformer: 'Arjun Kumar',
      needsAttention: 4,
    },
  ]

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">Class Performance</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium">View Details</button>
      </div>

      <div className="space-y-6">
        {performanceData.map((performance, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-100 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-primary">{performance.class}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  performance.improvement.startsWith('+')
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {performance.improvement}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{performance.avgScore}%</p>
                <p className="text-xs text-secondary">Avg Score</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-green-600">⭐</p>
                <p className="text-xs text-secondary">{performance.topPerformer}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{performance.needsAttention}</p>
                <p className="text-xs text-secondary">Need Help</p>
              </div>
              <div className="text-center">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Report
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${performance.avgScore}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}