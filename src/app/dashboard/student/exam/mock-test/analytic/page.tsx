'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StatusChip from '@/components/dashboard/admin/StatusChip'
import AIRecommendations from '@/components/dashboard/admin/AIRecommendations'
import QuestionAnalysis from '@/components/QuestionAnalysis'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function MockTestAnalyticsPage() {
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [strongTopicsSlide, setStrongTopicsSlide] = useState(0)
  const [weakTopicsSlide, setWeakTopicsSlide] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const test = {
    name: 'JEE Main Mock Test #15',
    type: 'mock',
    subject: 'Physics, Chemistry, Math',
    date: '2024-01-19',
    duration: '3 hours',
    totalMarks: 300,
    studentScore: 267,
    percentile: 89,
    status: 'completed',
    totalQuestions: 90,
    mcqQuestions: [
      { id: 1, question: 'The dimensional formula of angular momentum L = I\\omega is:', options: ['[ML^2T^{-1}]', '[MLT^{-1}]', '[ML^2T^{-2}]', '[MLT^{-2}]'], studentAnswer: '[ML^2T^{-1}]', correctAnswer: '[ML^2T^{-1}]', isCorrect: true, timeTaken: '1m 15s', marks: 4, difficulty: 'Medium', subject: 'Physics' },
      { id: 2, question: 'Benzene structure \\ce{C6H6} shows resonance. Which compound shows geometrical isomerism?', options: ['\\ce{CH3CH2CH3}', '\\ce{CH3CH=CHCH3}', '\\ce{CH3CH2OH}', '\\ce{CH4}'], studentAnswer: '\\ce{CH3CH=CHCH3}', correctAnswer: '\\ce{CH3CH=CHCH3}', isCorrect: true, timeTaken: '2m 30s', marks: 4, difficulty: 'Hard', subject: 'Chemistry' },
      { id: 3, question: 'The value of \\sin\\left(\\frac{\\pi}{6}\\right) is:', options: ['\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}', '1', '0'], studentAnswer: '\\frac{\\sqrt{3}}{2}', correctAnswer: '\\frac{1}{2}', isCorrect: false, timeTaken: '45s', marks: 4, difficulty: 'Easy', subject: 'Mathematics' },
      { id: 4, question: 'Find the derivative \\frac{d}{dx}[x^3]', options: ['3x^2', 'x^3', '3x', 'x^2'], studentAnswer: '3x^2', correctAnswer: '3x^2', isCorrect: true, timeTaken: '1m 5s', marks: 4, difficulty: 'Easy', subject: 'Mathematics' }
    ],
    analytics: {
      timeSpent: '2h 58m',
      avgTimePerQuestion: '1m 58s',
      accuracy: 89,
      strongTopics: [
        [
          { title: 'Organic Chemistry', description: 'Excellent performance in reaction mechanisms', icon: 'ph ph-flask' },
          { title: 'Calculus', description: 'Strong foundation in differentiation and integration', icon: 'ph ph-function' }
        ],
        [
          { title: 'Algebra', description: 'Perfect understanding of quadratic equations', icon: 'ph ph-equals' },
          { title: 'Chemical Bonding', description: 'Strong grasp of ionic and covalent bonds', icon: 'ph ph-atom' }
        ]
      ],
      weakTopics: [
        [
          { title: 'Trigonometry', description: 'Need practice with sine, cosine, and tangent functions', icon: 'ph ph-triangle' },
          { title: 'Thermodynamics', description: 'Requires more work on heat and energy problems', icon: 'ph ph-thermometer' }
        ],
        [
          { title: 'Coordinate Geometry', description: 'Needs improvement in analytical geometry', icon: 'ph ph-chart-scatter' },
          { title: 'Electrochemistry', description: 'Requires practice with redox reactions', icon: 'ph ph-battery-charging' }
        ]
      ],
      sectionWise: [
        { section: 'Physics', score: 88, total: 100, time: '58m' },
        { section: 'Chemistry', score: 92, total: 100, time: '62m' },
        { section: 'Mathematics', score: 87, total: 100, time: '58m' }
      ],
      aiSuggestions: [
        [
          { title: 'Trigonometry Basics', description: 'Strengthen trigonometry basics - practice more problems on sine, cosine values', icon: 'ph ph-lightbulb' },
          { title: 'Organic Chemistry', description: 'Excellent performance in organic chemistry, maintain this momentum', icon: 'ph ph-trend-up' }
        ],
        [
          { title: 'Time Management', description: 'Time management is good, but can be improved in mathematics section', icon: 'ph ph-clock' },
          { title: 'Formula Practice', description: 'Regular practice of key formulas will boost confidence', icon: 'ph ph-function' }
        ],
        [
          { title: 'Mock Tests', description: 'Take more full-length mock tests to improve stamina', icon: 'ph ph-exam' },
          { title: 'Weak Areas', description: 'Focus extra time on identified weak topics', icon: 'ph ph-target' }
        ]
      ]
    }
  }

  return (
    <DashboardLayout role="student">
      <div className="h-screen overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => router.push('/dashboard/student/exam')}
              className={`hover:underline transition-colors ${
                isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Exams
            </button>
            <i className={`ph ph-caret-right text-xs ${
              isDarkMode ? 'text-zinc-600' : 'text-gray-400'
            }`} />
            <span className={`font-medium ${
              isDarkMode ? 'text-zinc-200' : 'text-gray-900'
            }`}>{test.name}</span>
          </nav>

          {/* Header */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode 
              ? 'bg-zinc-900/80 border-zinc-800/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <StatusChip status={test.type.toUpperCase()} variant="info" />
                  <StatusChip status={test.status} variant="success" />
                </div>
                <h1 className={`text-lg font-bold mb-1 ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>{test.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className={`flex items-center gap-1 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>
                    <i className="ph ph-book" />
                    {test.subject}
                  </span>
                  <span className={`flex items-center gap-1 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>
                    <i className="ph ph-calendar" />
                    {new Date(test.date).toLocaleDateString()}
                  </span>
                  <span className={`flex items-center gap-1 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>
                    <i className="ph ph-clock" />
                    {test.duration}
                  </span>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  {test.studentScore}
                  <span className={`text-base font-normal ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>/{test.totalMarks}</span>
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  {test.percentile}th Percentile • {Math.round((test.studentScore / test.totalMarks) * 100)}%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode 
              ? 'bg-zinc-900/80 border-zinc-800/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <h3 className={`text-base font-semibold mb-3 ${
              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>Quick Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Time Spent', value: test.analytics.timeSpent, icon: 'ph-clock' },
                { label: 'Avg Time/Q', value: test.analytics.avgTimePerQuestion, icon: 'ph-timer' },
                { label: 'Accuracy', value: `${test.analytics.accuracy}%`, icon: 'ph-target' },
                { label: 'Questions', value: test.totalQuestions, icon: 'ph-list' }
              ].map((stat, index) => (
                <div key={index} className={`p-3 rounded-lg text-center ${
                  isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50/50'
                }`}>
                  <i className={`${stat.icon} text-lg mb-1 block ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`} />
                  <div className={`text-xs font-medium ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>{stat.label}</div>
                  <div className={`text-sm font-bold ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Strong & Weak Topics */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border ${
              isDarkMode 
                ? 'bg-zinc-900/60 border-zinc-800/40' 
                : 'bg-white/80 border-gray-200/60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-base font-semibold flex items-center gap-2 ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  <i className="ph ph-trend-up text-sm" />
                  Strong Topics
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStrongTopicsSlide(strongTopicsSlide > 0 ? strongTopicsSlide - 1 : test.analytics.strongTopics.length - 1)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                  >
                    <i className="ph ph-caret-left text-xs" />
                  </button>
                  <div className="flex gap-1">
                    {test.analytics.strongTopics.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full ${
                          index === strongTopicsSlide ? 'bg-[#8C7B65]' : isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setStrongTopicsSlide(strongTopicsSlide < test.analytics.strongTopics.length - 1 ? strongTopicsSlide + 1 : 0)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                  >
                    <i className="ph ph-caret-right text-xs" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {test.analytics.strongTopics[strongTopicsSlide].map((topic, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50/50 border-gray-200/50'
                  }`}>
                    <div className="flex items-start gap-2">
                      <i className={`${topic.icon} text-sm mt-0.5 text-[#8C7B65]`} />
                      <div>
                        <p className={`text-xs font-medium mb-1 ${
                          isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                        }`}>{topic.title}</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                        }`}>{topic.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`p-4 rounded-xl border ${
              isDarkMode 
                ? 'bg-zinc-900/60 border-zinc-800/40' 
                : 'bg-white/80 border-gray-200/60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-base font-semibold flex items-center gap-2 ${
                  isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  <i className="ph ph-trend-down text-sm" />
                  Areas for Improvement
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setWeakTopicsSlide(weakTopicsSlide > 0 ? weakTopicsSlide - 1 : test.analytics.weakTopics.length - 1)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                  >
                    <i className="ph ph-caret-left text-xs" />
                  </button>
                  <div className="flex gap-1">
                    {test.analytics.weakTopics.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full ${
                          index === weakTopicsSlide ? 'bg-[#8C7B65]' : isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setWeakTopicsSlide(weakTopicsSlide < test.analytics.weakTopics.length - 1 ? weakTopicsSlide + 1 : 0)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                  >
                    <i className="ph ph-caret-right text-xs" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {test.analytics.weakTopics[weakTopicsSlide].map((topic, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50/50 border-gray-200/50'
                  }`}>
                    <div className="flex items-start gap-2">
                      <i className={`${topic.icon} text-sm mt-0.5 text-[#8C7B65]`} />
                      <div>
                        <p className={`text-xs font-medium mb-1 ${
                          isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                        }`}>{topic.title}</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                        }`}>{topic.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <AIRecommendations recommendations={test.analytics.aiSuggestions} />

          {/* Section Performance */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode 
              ? 'bg-zinc-900/80 border-zinc-800/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <h3 className={`text-base font-semibold mb-3 ${
              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>Section Performance</h3>
            <div className="h-48">
              <Chart
                options={{
                  chart: { type: 'bar', toolbar: { show: false }, background: 'transparent' },
                  plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
                  dataLabels: { enabled: false },
                  xaxis: { categories: test.analytics.sectionWise.map((item) => item.section), labels: { show: false } },
                  yaxis: { labels: { style: { colors: isDarkMode ? '#a1a1aa' : '#6b7280', fontSize: '12px' } } },
                  colors: ['#8C7B65', '#7A6B58', '#6B5A47'],
                  grid: { show: false },
                  theme: { mode: isDarkMode ? 'dark' : 'light' }
                }}
                series={[{ name: 'Score', data: test.analytics.sectionWise.map((item) => item.score) }]}
                type="bar"
                height={192}
              />
            </div>
          </div>

          {/* Question Analysis */}
          <QuestionAnalysis />
        </div>
      </div>
    </DashboardLayout>
  )
}
