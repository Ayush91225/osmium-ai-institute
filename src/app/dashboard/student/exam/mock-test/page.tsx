'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'

export default function MockTestPage() {
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const [currentSubject, setCurrentSubject] = useState('Physics')
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(45 * 60 + 48)
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({})
  const [markedQuestions, setMarkedQuestions] = useState<Set<string>>(new Set())
  const [showDropdown, setShowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const selectOption = (option: number) => {
    const key = `${currentSubject}_${currentQuestion}`
    setUserAnswers(prev => ({ ...prev, [key]: option }))
  }

  const markForReview = () => {
    const key = `${currentSubject}_${currentQuestion}`
    setMarkedQuestions(prev => new Set(prev).add(key))
    if (currentQuestion < 25) setCurrentQuestion(prev => prev + 1)
  }

  const clearAnswer = () => {
    const key = `${currentSubject}_${currentQuestion}`
    setUserAnswers(prev => {
      const newAnswers = { ...prev }
      delete newAnswers[key]
      return newAnswers
    })
    setMarkedQuestions(prev => {
      const newMarked = new Set(prev)
      newMarked.delete(key)
      return newMarked
    })
  }

  const getQuestionStatus = (qNum: number) => {
    const key = `${currentSubject}_${qNum}`
    if (markedQuestions.has(key)) return 'marked'
    if (userAnswers[key]) return 'answered'
    return 'not-answered'
  }

  const currentKey = `${currentSubject}_${currentQuestion}`
  const selectedOption = userAnswers[currentKey]

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-zinc-950' : 'bg-[#f8fafc]'}`}>
      {/* Header */}
      <div className={`px-5 py-4 flex justify-between items-center ${isDarkMode ? 'bg-zinc-900 border-b border-zinc-800' : 'bg-white border-b border-gray-200'}`}>
        <div className="flex items-center gap-5">
          <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <div className="flex flex-col gap-1">
              <span className={`w-5 h-0.5 ${isDarkMode ? 'bg-zinc-400' : 'bg-gray-800'}`}></span>
              <span className={`w-5 h-0.5 ${isDarkMode ? 'bg-zinc-400' : 'bg-gray-800'}`}></span>
              <span className={`w-5 h-0.5 ${isDarkMode ? 'bg-zinc-400' : 'bg-gray-800'}`}></span>
            </div>
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7">
              <img src="https://osmium.co.in/cdnLogo" alt="Osmium Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`text-lg sm:text-[19px] font-medium tracking-tight font-sans ${isDarkMode ? 'text-white' : 'text-black'}`}>Osmium</span>
            <span className={`text-xs hidden sm:inline ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>JEE Mains Mock Test</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right">
            <div className={`text-sm hidden sm:block ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Time Remaining:</div>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatTime(timeRemaining)}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Shristi Patel</div>
              <div className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>24BTCSE046</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">SP</div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Question Area */}
        <div className="flex-1 flex flex-col">
          {/* Sub-header */}
          <div className={`p-4 m-4 mt-4 mb-0 rounded-t-lg border flex justify-between items-center ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className={`px-4 py-2 border rounded-lg flex items-center gap-2 hover:border-[#C58F39] ${isDarkMode ? 'border-zinc-700 text-white' : 'border-gray-300'}`}>
                <span className="font-medium">{currentSubject}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {showDropdown && (
                <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg z-10 ${isDarkMode ? 'bg-zinc-800 border border-zinc-700' : 'bg-white border border-gray-200'}`}>
                  {['Physics', 'Chemistry', 'Mathematics'].map(subject => (
                    <div key={subject} onClick={() => { setCurrentSubject(subject); setCurrentQuestion(1); setShowDropdown(false) }} className={`px-4 py-2 cursor-pointer ${isDarkMode ? 'hover:bg-zinc-700 text-white' : 'hover:bg-gray-50'}`}>{subject}</div>
                  ))}
                </div>
              )}
            </div>
            <div className={`flex items-center gap-6 text-sm ${isDarkMode ? 'text-zinc-300' : 'text-gray-900'}`}>
              <div>Marks <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>+4</span><span className={`font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>-1</span></div>
              <div>Time <span className="font-semibold">5:48</span></div>
            </div>
          </div>

          {/* Question Card */}
          <div className={`border border-t-0 rounded-b-lg m-4 mt-0 mb-4 flex-1 flex flex-col ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
            <div className="flex-1 p-6 overflow-y-auto">
              <div className={`text-base mb-5 font-serif leading-relaxed ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <strong>{currentQuestion}.</strong> A 3 m long wire of radius 3 mm shows an extension of 0.1 mm when loaded vertically by a mass of 50 kg in an experiment to determine Young's modulus.
              </div>
              <div className="space-y-3">
                {['2.5', '25', '10', '5'].map((option, idx) => (
                  <div key={idx} onClick={() => selectOption(idx + 1)} className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-50'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                      selectedOption === idx + 1 ? 'border-[#C58F39] bg-[#f5f0e8]' : isDarkMode ? 'border-zinc-600' : 'border-gray-300'
                    }`}>
                      {selectedOption === idx + 1 && <div className="w-2 h-2 rounded-full bg-[#C58F39]"></div>}
                    </div>
                    <div className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{option}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={`border-t p-4 flex justify-between items-center ${isDarkMode ? 'border-zinc-800 bg-zinc-800/50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex gap-3">
                <button onClick={markForReview} className={`px-5 py-2 border rounded-lg text-sm font-medium ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'}`}>Mark for Review & Next</button>
                <button onClick={clearAnswer} className={`px-5 py-2 border rounded-lg text-sm font-medium ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'}`}>Clear</button>
              </div>
              <button onClick={() => currentQuestion < 25 && setCurrentQuestion(prev => prev + 1)} className={`px-5 py-2 rounded-lg text-sm font-medium w-36 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-900'}`}>Save & Next</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`w-80 border-l flex flex-col ${
          sidebarOpen ? 'fixed right-0 top-0 h-full z-50' : 'hidden lg:flex'
        } ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className={`absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-gray-100'}`}>×</button>
          )}
          <div className={`p-5 border-b ${isDarkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentSubject}</div>
          </div>
          <div className={`px-5 py-4 border-b flex justify-between text-xs font-semibold ${isDarkMode ? 'bg-zinc-800/50 border-zinc-800 text-zinc-300' : 'bg-gray-50 border-gray-100'}`}>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#4A8C53]"></div>8 Answered</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#6F6CBF]"></div>6 Marked</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gray-200 border border-gray-300"></div>6 Not Answered</div>
          </div>
          <div className="p-5 flex-1 overflow-y-auto">
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 25 }, (_, i) => i + 1).map(num => {
                const status = getQuestionStatus(num)
                return (
                  <button key={num} onClick={() => setCurrentQuestion(num)} className={`w-10 h-10 rounded-full font-bold text-sm ${
                    num === currentQuestion ? 'bg-[#C58F39] text-white scale-110' :
                    status === 'answered' ? 'bg-[#4A8C53] text-white' :
                    status === 'marked' ? 'bg-[#6F6CBF] text-white' :
                    isDarkMode ? 'bg-zinc-800 border border-zinc-700 text-zinc-300' : 'bg-gray-100 border border-gray-300'
                  }`}>{num}</button>
                )
              })}
            </div>
          </div>
          <div className={`p-5 border-t ${isDarkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
            <button onClick={() => setShowModal(true)} className={`w-full py-3 border rounded-lg font-semibold text-sm ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}`}>Submit Test</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`rounded-2xl p-6 w-full max-w-md ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Are you sure want to submit?</h2>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>After submitting test, you won't be able to re-attempt</p>
            <div className={`border rounded-2xl p-5 space-y-5 mb-8 ${isDarkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center font-semibold">8</div><div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>ANSWERED</div></div>
              <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center font-semibold">6</div><div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>MARKED FOR REVIEW</div></div>
              <div className="flex items-center gap-3"><div className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold ${isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-300 text-gray-700'}`}>11</div><div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>NOT ANSWERED</div></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className={`flex-1 py-3 border rounded-lg font-medium ${isDarkMode ? 'border-zinc-700 text-white hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-50'}`}>Cancel</button>
              <button onClick={() => router.push('/dashboard/student/exam/mock-test/analytic')} className={`flex-1 py-3 rounded-lg font-medium ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-900'}`}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>}
    </div>
  )
}
