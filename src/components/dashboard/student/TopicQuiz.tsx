'use client'

import { memo, useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import TopicSidebar from '@/components/dashboard/student/TopicSidebar'

interface TopicQuizProps {
  courseId: string
  topicId: string
}

const questions = [
  { id: 1, text: 'Which statement about constructors in inheritance is true?', options: ['Parent class constructor is never called.', 'Only the child constructor executes.', 'Parent class constructor executes before the child constructor.', 'super keyword is mandatory in C++.'], correct: 2 },
  { id: 2, text: 'What happens if a constructor is defined as private?', options: ['The class cannot be instantiated from outside.', 'It allows inheritance but not instantiation.', 'The compiler throws a syntax error immediately.', 'It can only be accessed by friend functions.'], correct: 0 },
  { id: 3, text: 'Which constructor is called when an object is passed by value?', options: ['Default Constructor', 'Copy Constructor', 'Parameterized Constructor', 'Move Constructor'], correct: 1 },
  { id: 4, text: 'Can a constructor be virtual in C++?', options: ['Yes, for polymorphic behavior.', 'No, because the VTable is not initialized yet.', 'Yes, but only in abstract classes.', 'No, unless it is a pure virtual constructor.'], correct: 1 },
  { id: 5, text: 'What is the role of an initializer list?', options: ['To initialize static members.', 'To call the destructor explicitly.', 'To initialize const or reference members.', 'To allocate memory on the heap.'], correct: 2 },
  { id: 6, text: 'When is the destructor called?', options: ['When object goes out of scope', 'Before main()', 'Manually only', 'Never'], correct: 0 },
  { id: 7, text: 'What is a deep copy?', options: ['Copying pointers only', 'Copying data pointed to', 'Using memcpy', 'Default assignment'], correct: 1 },
  { id: 8, text: 'Can we overload constructors?', options: ['No', 'Yes', 'Only default', 'Only copy'], correct: 1 },
  { id: 9, text: 'What is a converting constructor?', options: ['Takes one argument', 'Takes zero arguments', 'Converts int to float', 'Is static'], correct: 0 },
  { id: 10, text: 'Which keyword prevents implicit conversion?', options: ['static', 'explicit', 'const', 'virtual'], correct: 1 }
]

function TopicQuiz({ courseId, topicId }: TopicQuizProps) {
  const { isDarkMode } = useDarkMode()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (!showResults) {
      const timer = setInterval(() => setSecondsElapsed(s => s + 1), 1000)
      return () => clearInterval(timer)
    }
  }, [showResults])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleSkip = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const answeredCount = answers.filter(a => a !== null).length
  const progress = ((currentIndex + 1) / questions.length) * 100
  const currentQuestion = questions[currentIndex]
  const selectedAnswer = answers[currentIndex]

  const score = answers.reduce((acc, answer, idx) => {
    return acc + (answer === questions[idx].correct ? 1 : 0)
  }, 0)

  if (showResults) {
    return (
      <DashboardLayout role="student">
        <div className="flex h-screen overflow-hidden">
          <div className={`flex-1 h-screen overflow-y-auto ${isDarkMode ? 'bg-zinc-950' : 'bg-[#F9F8F6]'}`}>
            <div className="max-w-4xl mx-auto px-6 py-16">
              <div className="text-center mb-16">
                <h1 className={`font-serif text-4xl italic mb-3 ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  You're doing good.
                </h1>
                <p className={`text-[15px] mb-8 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                  You completed the "C++ Constructor" quiz
                </p>

                <div className="flex flex-col items-center gap-1 mb-8">
                  <span className={`text-xs font-semibold tracking-wide uppercase ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                    You Scored
                  </span>
                  <div className={`font-serif text-[64px] leading-none ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    {score}<span className={`text-[32px] ${isDarkMode ? 'text-zinc-600' : 'text-gray-300'}`}>/{questions.length}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {answers.map((answer, idx) => {
                    const isCorrect = answer === questions[idx].correct
                    return (
                      <div
                        key={idx}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {isCorrect ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-end justify-between mb-4">
                <h2 className={`text-[17px] font-normal ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  Detailed Question Analysis
                </h2>
                <div className="flex items-center gap-3">
                  <button className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                    isDarkMode 
                      ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}>
                    Re-Attempt
                  </button>
                  <div className={`px-4 py-2 border rounded-lg text-sm ${
                    isDarkMode ? 'border-zinc-700 bg-zinc-900 text-zinc-400' : 'border-gray-200 bg-white text-gray-600'
                  }`}>
                    Time: {formatTime(secondsElapsed)}
                  </div>
                </div>
              </div>

              {questions.map((q, idx) => {
                const userAnswer = answers[idx]
                const isCorrect = userAnswer === q.correct
                return (
                  <div
                    key={q.id}
                    className={`border rounded-xl p-8 shadow-sm mb-4 ${
                      isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {isCorrect ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Question {q.id}
                      </span>
                    </div>

                    <h3 className={`text-[17px] mb-5 leading-relaxed ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
                      {q.id}. {q.text}
                    </h3>

                    <div className="flex items-center gap-4 mb-8 text-[13px] font-medium font-serif italic">
                      <div className="flex items-center gap-2">
                        <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-500'}>Your Answer:</span>
                        <span className={`px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {userAnswer !== null ? String.fromCharCode(65 + userAnswer) : '-'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-500'}>Correct:</span>
                        <span className="px-2 py-0.5 rounded bg-green-100 text-green-700">
                          {String.fromCharCode(65 + q.correct)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {q.options.map((opt, optIdx) => {
                        const isUserAnswer = userAnswer === optIdx
                        const isCorrectAnswer = q.correct === optIdx
                        return (
                          <div
                            key={optIdx}
                            className={`p-4 border rounded-lg text-sm ${
                              isCorrectAnswer
                                ? isDarkMode
                                  ? 'border-green-700 border-dashed bg-green-950/30 text-zinc-200'
                                  : 'border-green-400 border-dashed bg-green-50/30 text-gray-700'
                                : isUserAnswer
                                ? isDarkMode
                                  ? 'border-red-700 bg-red-950/30 text-zinc-200'
                                  : 'border-red-300 bg-red-50/30 text-gray-700'
                                : isDarkMode
                                ? 'border-zinc-800 bg-zinc-900/50 text-zinc-300'
                                : 'border-gray-200 bg-white text-gray-700'
                            }`}
                          >
                            {opt}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <TopicSidebar 
            courseId={courseId} 
            topicId={topicId} 
            topicName="Introduction to DSA"
            activePage="quiz"
          />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-[#F9FAFB] text-gray-900'}`}>
      <header className={`border-b sticky top-0 z-20 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img src="https://osmium.co.in/cdnLogo" alt="Osmium Logo" className="w-7 h-7 object-contain" />
              <span className={`text-lg font-medium tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>Osmium</span>
            </div>
            <div className={`h-5 w-px ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'}`}></div>
            <span className={`font-medium text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>C++ Constructor Quiz</span>
          </div>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-all ${
            isDarkMode 
              ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300' 
              : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
          }`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span>Back</span>
          </button>
        </div>
      </header>

      <main className="flex-grow p-8 flex justify-center items-start pt-12">
        <div className={`w-full max-w-[1100px] rounded-xl shadow-card border overflow-hidden flex flex-col min-h-[600px] ${
          isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
        }`}>
          <div className={`px-10 py-6 border-b ${isDarkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
            <div className="flex items-center gap-12">
              <div className="flex items-start gap-3 min-w-[120px]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDarkMode ? 'text-zinc-500' : 'text-gray-400'}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className={`text-lg font-semibold tabular-nums ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {formatTime(secondsElapsed)}
                  </span>
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                    Time passed
                  </span>
                </div>
              </div>
              <div className="flex-grow flex items-center gap-4 w-full">
                <div className={`relative h-2 w-full rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                  <div 
                    className="absolute left-0 top-0 h-full bg-[#ECAE2C] rounded-full transition-all duration-600"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium whitespace-nowrap ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                  {answeredCount}/{questions.length} Answered
                </span>
              </div>
            </div>
          </div>

          <div className="flex-grow px-12 py-10 flex flex-col justify-center">
            <h2 className={`text-[28px] font-medium leading-snug mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentQuestion.text}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx
                return (
                  <div
                    key={idx}
                    onClick={() => selectAnswer(idx)}
                    className={`relative p-5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-4 group select-none ${
                      isSelected
                        ? isDarkMode
                          ? 'border-[#9E7724] shadow-sm bg-[#9E7724]/10'
                          : 'border-[#F3E0B9] shadow-sm bg-[rgba(255,252,245,0.6)]'
                        : isDarkMode
                        ? 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'border-[#9E7724] bg-white'
                        : isDarkMode
                        ? 'border-zinc-600 group-hover:border-zinc-500 bg-zinc-800'
                        : 'border-gray-300 group-hover:border-gray-400 bg-white'
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-[#9E7724]"></div>}
                    </div>
                    <span className={`text-[17px] font-normal leading-relaxed break-words ${
                      isSelected
                        ? isDarkMode ? 'text-white font-medium' : 'text-gray-900 font-medium'
                        : isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      {option}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-4 mt-auto">
              {currentIndex === questions.length - 1 ? (
                <button 
                  onClick={handleSubmit}
                  className={`px-10 py-3.5 rounded-lg font-medium text-sm shadow-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-white hover:bg-gray-200 text-black shadow-zinc-900/50' 
                      : 'bg-[#111827] hover:bg-black text-white shadow-gray-200/50'
                  }`}
                >
                  Submit
                </button>
              ) : (
                <button 
                  onClick={handleNext}
                  className={`px-10 py-3.5 rounded-lg font-medium text-sm shadow-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-white hover:bg-gray-200 text-black shadow-zinc-900/50' 
                      : 'bg-[#111827] hover:bg-black text-white shadow-gray-200/50'
                  }`}
                >
                  Next
                </button>
              )}
              <button 
                onClick={handleSkip}
                className={`px-10 py-3.5 rounded-lg font-medium text-sm transition-colors ${
                  isDarkMode 
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' 
                    : 'bg-[#F3F4F6] hover:bg-gray-200 text-gray-700'
                }`}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default memo(TopicQuiz)
