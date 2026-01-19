'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StatusChip from '@/components/dashboard/admin/StatusChip'
import AIRecommendations from '@/components/dashboard/admin/AIRecommendations'
import QuestionAnalysis from '@/components/QuestionAnalysis'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface TestAnalytics {
  timeSpent?: string
  avgTimePerQuestion?: string
  classRank?: number
  accuracy?: number
  strongTopics?: any[][]
  weakTopics?: any[][]
  topicWise?: Array<{ topic: string; score: number; total: number }>
  sectionWise?: Array<{ section: string; score: number; total: number; time: string }>
  aiSuggestions?: any[][]
}

interface MCQQuestion {
  id: number
  question: string
  options: string[]
  studentAnswer: string
  correctAnswer: string
  isCorrect: boolean
  timeTaken: string
  marks: number
  difficulty: string
  subject?: string
}

interface TestData {
  id: string
  name: string
  type: string
  subject: string
  date: string
  duration: string
  totalMarks?: number
  studentScore?: number
  grade?: string
  teacher?: string
  status: string
  totalQuestions: number
  correctAnswers?: number
  percentile?: number
  attempts?: number
  mcqQuestions?: MCQQuestion[]
  analytics?: TestAnalytics
}

const testData: Record<string, TestData> = {
  'EXM002': {
    id: 'EXM002',
    name: 'Mid-Term Physics Exam',
    type: 'exam',
    subject: 'Physics',
    date: '2024-01-20',
    duration: '3 hours',
    totalMarks: 100,
    studentScore: 88,
    grade: 'A',
    teacher: 'Prof. Michael Chen',
    status: 'completed',
    totalQuestions: 25,
    mcqQuestions: [
      { id: 1, question: 'What is Newton\'s second law of motion? Express it mathematically as \\vec{F} = m\\vec{a}', options: ['\\vec{F} = m\\vec{a}', '\\vec{F} = m\\vec{v}', '\\vec{F} = \\frac{m}{a}', '\\vec{F} = \\frac{a}{m}'], studentAnswer: '\\vec{F} = m\\vec{a}', correctAnswer: '\\vec{F} = m\\vec{a}', isCorrect: true, timeTaken: '45s', marks: 4, difficulty: 'Easy' },
      { id: 2, question: 'The kinetic energy formula is KE = \\frac{1}{2}mv^2. Which law explains rocket propulsion?', options: ['Newton\'s First Law', 'Newton\'s Second Law', 'Newton\'s Third Law', 'Universal Gravitation'], studentAnswer: 'Newton\'s Second Law', correctAnswer: 'Newton\'s Third Law', isCorrect: false, timeTaken: '1m 20s', marks: 4, difficulty: 'Medium' },
      { id: 3, question: 'The SI unit of force is Newton, where 1N = 1kg \\cdot m/s^2', options: ['Newton', 'Joule', 'Watt', 'Pascal'], studentAnswer: 'Newton', correctAnswer: 'Newton', isCorrect: true, timeTaken: '30s', marks: 4, difficulty: 'Easy' },
      { id: 4, question: 'If momentum \\vec{p} = m\\vec{v}, then momentum is conserved in:', options: ['Elastic collisions only', 'Inelastic collisions only', 'All collisions', 'No collisions'], studentAnswer: 'Elastic collisions only', correctAnswer: 'All collisions', isCorrect: false, timeTaken: '2m 10s', marks: 4, difficulty: 'Hard' }
    ],
    analytics: {
      timeSpent: '2h 45m',
      avgTimePerQuestion: '6m 36s',
      classRank: 5,
      accuracy: 88,
      strongTopics: [
        [
          { title: 'Mechanics', description: 'Strong understanding of force and motion concepts', icon: 'ph ph-gear' },
          { title: 'Kinematics', description: 'Excellent grasp of motion equations and graphs', icon: 'ph ph-chart-line' }
        ],
        [
          { title: 'Newton\'s Laws', description: 'Perfect application of all three laws of motion', icon: 'ph ph-atom' },
          { title: 'Energy Conservation', description: 'Strong grasp of kinetic and potential energy', icon: 'ph ph-lightning' }
        ]
      ],
      weakTopics: [
        [
          { title: 'Thermodynamics', description: 'Need more practice with heat transfer and energy concepts', icon: 'ph ph-thermometer' },
          { title: 'Wave Motion', description: 'Requires improvement in wave properties and sound', icon: 'ph ph-waveform' }
        ],
        [
          { title: 'Electromagnetic Induction', description: 'Needs work on Faraday\'s law and Lenz\'s law', icon: 'ph ph-magnet' },
          { title: 'Optics', description: 'Requires practice with reflection and refraction', icon: 'ph ph-eye' }
        ]
      ],
      topicWise: [
        { topic: 'Mechanics', score: 92, total: 40 },
        { topic: 'Thermodynamics', score: 65, total: 30 },
        { topic: 'Waves', score: 80, total: 30 }
      ],
      aiSuggestions: [
        [
          { title: 'Focus on Thermodynamics', description: 'Focus more on thermodynamics concepts, especially heat transfer mechanisms', icon: 'ph ph-lightbulb' },
          { title: 'Wave Motion Practice', description: 'Practice more numerical problems on wave motion and sound', icon: 'ph ph-chart-line' }
        ],
        [
          { title: 'Momentum Review', description: 'Review momentum conservation in different types of collisions', icon: 'ph ph-book-open' },
          { title: 'Study Schedule', description: 'Create a structured study plan for physics concepts', icon: 'ph ph-calendar' }
        ],
        [
          { title: 'Practice Tests', description: 'Take more practice tests to improve time management', icon: 'ph ph-exam' },
          { title: 'Concept Clarity', description: 'Focus on understanding fundamental physics principles', icon: 'ph ph-lightbulb' }
        ]
      ]
    }
  },
  'MCK001': {
    id: 'MCK001',
    name: 'JEE Main Mock Test #15',
    type: 'mock',
    subject: 'Physics, Chemistry, Math',
    date: '2024-01-19',
    duration: '3 hours',
    totalMarks: 300,
    studentScore: 267,
    percentile: 89,
    attempts: 3,
    status: 'completed',
    totalQuestions: 90,
    mcqQuestions: [
      { id: 1, question: 'The dimensional formula of angular momentum L = I\\omega is:', options: ['[ML^2T^{-1}]', '[MLT^{-1}]', '[ML^2T^{-2}]', '[MLT^{-2}]'], studentAnswer: '[ML^2T^{-1}]', correctAnswer: '[ML^2T^{-1}]', isCorrect: true, timeTaken: '1m 15s', marks: 4, difficulty: 'Medium', subject: 'Physics' },
      { id: 2, question: 'Benzene structure \\ce{C6H6} shows resonance. Which compound shows geometrical isomerism?', options: ['\\ce{CH3CH2CH3}', '\\ce{CH3CH=CHCH3}', '\\ce{CH3CH2OH}', '\\ce{CH4}'], studentAnswer: '\\ce{CH3CH=CHCH3}', correctAnswer: '\\ce{CH3CH=CHCH3}', isCorrect: true, timeTaken: '2m 30s', marks: 4, difficulty: 'Hard', subject: 'Chemistry' },
      { id: 3, question: 'The value of \\sin\\left(\\frac{\\pi}{6}\\right) is:', options: ['\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}', '1', '0'], studentAnswer: '\\frac{\\sqrt{3}}{2}', correctAnswer: '\\frac{1}{2}', isCorrect: false, timeTaken: '45s', marks: 4, difficulty: 'Easy', subject: 'Mathematics' }
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
  },
  'QZ001': {
    id: 'QZ001',
    name: 'Calculus - Derivatives',
    type: 'quiz',
    subject: 'Mathematics',
    date: '2024-01-19',
    duration: '15 minutes',
    totalQuestions: 10,
    correctAnswers: 9,
    studentScore: 95,
    status: 'completed',
    mcqQuestions: [
      { id: 1, question: 'Find the derivative \\frac{d}{dx}[f(x)] = \\frac{d}{dx}[x^2]', options: ['2x', 'x^2', '2', 'x'], studentAnswer: '2x', correctAnswer: '2x', isCorrect: true, timeTaken: '25s', marks: 2, difficulty: 'Easy' },
      { id: 2, question: 'What is \\frac{d}{dx}(\\sin x)?', options: ['\\cos x', '-\\cos x', '\\sin x', '-\\sin x'], studentAnswer: '\\cos x', correctAnswer: '\\cos x', isCorrect: true, timeTaken: '30s', marks: 2, difficulty: 'Easy' },
      { id: 3, question: 'Find \\frac{d}{dx}(e^x) using the exponential rule', options: ['e^x', 'xe^{x-1}', '1', 'x'], studentAnswer: 'e^x', correctAnswer: 'e^x', isCorrect: true, timeTaken: '20s', marks: 2, difficulty: 'Easy' },
      { id: 4, question: 'The derivative of \\ln(x) is \\frac{d}{dx}[\\ln(x)] = ?', options: ['\\frac{1}{x}', 'x', '\\ln(x)', '1'], studentAnswer: 'x', correctAnswer: '\\frac{1}{x}', isCorrect: false, timeTaken: '1m 10s', marks: 2, difficulty: 'Medium' }
    ],
    analytics: {
      timeSpent: '8m 32s',
      avgTimePerQuestion: '51s',
      accuracy: 90,
      strongTopics: [
        [
          { title: 'Basic Derivatives', description: 'Excellent speed and accuracy on fundamental rules', icon: 'ph ph-function' },
          { title: 'Trigonometric Functions', description: 'Strong understanding of trig derivatives', icon: 'ph ph-triangle' }
        ],
        [
          { title: 'Power Rule', description: 'Perfect application of power rule derivatives', icon: 'ph ph-mathematic' },
          { title: 'Product Rule', description: 'Strong grasp of product rule applications', icon: 'ph ph-x' }
        ]
      ],
      weakTopics: [
        [
          { title: 'Logarithmic Functions', description: 'Need more practice with ln and log derivatives', icon: 'ph ph-chart-line' }
        ],
        [
          { title: 'Chain Rule', description: 'Requires more practice with composite functions', icon: 'ph ph-link' }
        ]
      ],
      aiSuggestions: [
        [
          { title: 'Logarithmic Rules', description: 'Review logarithmic differentiation rules', icon: 'ph ph-lightbulb' },
          { title: 'Natural Logarithms', description: 'Practice more problems on natural logarithm derivatives', icon: 'ph ph-chart-line' }
        ],
        [
          { title: 'Great Progress', description: 'Great speed and accuracy on basic derivatives!', icon: 'ph ph-trend-up' },
          { title: 'Chain Rule', description: 'Master the chain rule for complex functions', icon: 'ph ph-function' }
        ]
      ]
    }
  }
}

export default function TestAnalyticsPage() {
  const params = useParams()
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)
  const [strongTopicsSlide, setStrongTopicsSlide] = useState(0)
  const [weakTopicsSlide, setWeakTopicsSlide] = useState(0)

  const studentId = params.slug as string
  const testId = params.testId as string
  const test = testData[testId as keyof typeof testData]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!test) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <i className={`ph ph-exam text-4xl mb-4 ${
              isDarkMode ? 'text-zinc-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-zinc-200' : 'text-gray-900'
            }`}>Test Not Found</h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>The test analytics you're looking for doesn't exist.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <>
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-4 px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => router.push('/dashboard/admin/students')}
            className={`hover:underline transition-colors ${
              isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Students
          </button>
          <i className={`ph ph-caret-right text-xs ${
            isDarkMode ? 'text-zinc-600' : 'text-gray-400'
          }`} />
          <button
            onClick={() => router.push(`/dashboard/admin/students/profile/${studentId}`)}
            className={`hover:underline transition-colors ${
              isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {studentId}
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
                {test.studentScore || (test as any).correctAnswers}
                <span className={`text-base font-normal ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>/{(test as any).totalMarks || (test as any).totalQuestions}</span>
              </div>
              <div className={`text-xs ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {(test as any).grade && `Grade ${(test as any).grade} • `}
                {(test as any).percentile && `${(test as any).percentile}th Percentile`}
                {test.studentScore && (test as any).totalMarks && `${Math.round((test.studentScore / (test as any).totalMarks) * 100)}%`}
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
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Time Spent', value: test.analytics?.timeSpent || 'N/A', icon: 'ph-clock' },
              { label: 'Avg Time/Q', value: (test.analytics as any)?.avgTimePerQuestion || 'N/A', icon: 'ph-timer' },
              { label: 'Class Rank', value: (test.analytics as any)?.classRank ? `#${(test.analytics as any).classRank}` : 'N/A', icon: 'ph-trophy' },
              { label: 'Accuracy', value: test.analytics?.accuracy ? `${test.analytics.accuracy}%` : 'N/A', icon: 'ph-target' },
              { label: 'Attempts', value: (test as any).attempts || '1', icon: 'ph-repeat' }
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
        {(test.analytics as any)?.strongTopics && (
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
                    onClick={() => setStrongTopicsSlide(strongTopicsSlide > 0 ? strongTopicsSlide - 1 : (test.analytics as any).strongTopics.length - 1)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                  >
                    <i className="ph ph-caret-left text-xs" />
                  </button>
                  <div className="flex gap-1">
                    {(test.analytics as any).strongTopics.map((_: any, index: number) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full ${
                          index === strongTopicsSlide ? 'bg-[#8C7B65]' : isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setStrongTopicsSlide(strongTopicsSlide < (test.analytics as any).strongTopics.length - 1 ? strongTopicsSlide + 1 : 0)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                  >
                    <i className="ph ph-caret-right text-xs" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {(test.analytics as any).strongTopics[strongTopicsSlide].map((topic: any, index: number) => (
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
                    onClick={() => setWeakTopicsSlide(weakTopicsSlide > 0 ? weakTopicsSlide - 1 : (test.analytics as any).weakTopics.length - 1)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                  >
                    <i className="ph ph-caret-left text-xs" />
                  </button>
                  <div className="flex gap-1">
                    {(test.analytics as any).weakTopics.map((_: any, index: number) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full ${
                          index === weakTopicsSlide ? 'bg-[#8C7B65]' : isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setWeakTopicsSlide(weakTopicsSlide < (test.analytics as any).weakTopics.length - 1 ? weakTopicsSlide + 1 : 0)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                  >
                    <i className="ph ph-caret-right text-xs" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {(test.analytics as any).weakTopics[weakTopicsSlide].map((topic: any, index: number) => (
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
        )}

        {/* AI Recommendations */}
        {(test.analytics as any)?.aiSuggestions && (
          <AIRecommendations recommendations={(test.analytics as any).aiSuggestions} />
        )}

        {/* Performance Charts */}
        {(test.analytics as any)?.topicWise && (
          <div className={`p-4 rounded-xl border ${
            isDarkMode 
              ? 'bg-zinc-900/80 border-zinc-800/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <h3 className={`text-base font-semibold mb-3 ${
              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>Topic Performance</h3>
            <div className="h-48">
              <Chart
                options={{
                  chart: { type: 'bar', toolbar: { show: false }, background: 'transparent' },
                  plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
                  dataLabels: { enabled: false },
                  xaxis: { categories: (test.analytics as any).topicWise.map((item: any) => item.topic), labels: { show: false } },
                  yaxis: { labels: { style: { colors: isDarkMode ? '#a1a1aa' : '#6b7280', fontSize: '12px' } } },
                  colors: ['#8C7B65'],
                  grid: { show: false },
                  theme: { mode: isDarkMode ? 'dark' : 'light' }
                }}
                series={[{ name: 'Score', data: (test.analytics as any).topicWise.map((item: any) => item.score) }]}
                type="bar"
                height={192}
              />
            </div>
          </div>
        )}

        {/* Section Performance */}
        {test.analytics?.sectionWise && (
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
        )}

        {/* Question Analysis */}
        {(test as any).mcqQuestions && (
          <QuestionAnalysis />
        )}
      </div>
    </DashboardLayout>
  </>
  )
}