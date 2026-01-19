'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDarkMode } from '@/contexts/DarkModeContext'
import LaTeX from '@/components/LaTeX'
import StatusChip from '@/components/dashboard/admin/StatusChip'

interface QuestionAnalysisExpandedProps {
  onClose: () => void
}

const questions = [
  { 
    id: 1, 
    status: 'correct', 
    text: 'The\\,dimensional\\,formula\\,of\\,angular\\,momentum\\,L=I\\omega\\,is:', 
    marks: 4, 
    obtained: 4,
    selectedOption: 'A',
    correctOption: 'A',
    options: [
      { label: 'A', text: '[ML^2T^{-1}]' },
      { label: 'B', text: '[MLT^{-1}]' },
      { label: 'C', text: '[ML^2T^{-2}]' },
      { label: 'D', text: '[MLT^{-2}]' }
    ]
  },
  { 
    id: 2, 
    status: 'correct', 
    text: 'In\\,the\\,Suzuki-Miyaura\\,cross-coupling\\,reaction,\\,the\\,aryl\\,halide\\,substrate\\,is:', 
    marks: 4, 
    obtained: 4,
    selectedOption: 'B',
    correctOption: 'B',
    options: [
      { label: 'A', text: 'Oxidized' },
      { label: 'B', text: 'Reduced' },
      { label: 'C', text: 'Hydrolyzed' },
      { label: 'D', text: 'Neutralized' }
    ]
  },
  { 
    id: 3, 
    status: 'incorrect', 
    text: 'A\\,3\\,m\\,long\\,wire\\,of\\,radius\\,3\\,mm\\,shows\\,an\\,extension\\,of\\,0.1\\,mm\\,when\\,loaded\\,vertically\\,by\\,a\\,mass\\,of\\,50\\,kg\\,in\\,an\\,experiment\\,to\\,determine\\,Young\'s\\,modulus.\\,The\\,value\\,of\\,Young\'s\\,modulus\\,of\\,the\\,wire\\,as\\,per\\,this\\,experiment\\,is\\,N/m^2,\\,where\\,the\\,value\\,of\\,g\\,is\\,10\\,m/s^2', 
    marks: 4, 
    obtained: -1,
    selectedOption: 'C',
    correctOption: 'A',
    options: [
      { label: 'A', text: '5.3 × 10^{10}' },
      { label: 'B', text: '4.5 × 10^{9}' },
      { label: 'C', text: '2.8 × 10^{8}' },
      { label: 'D', text: '1.2 × 10^{11}' }
    ]
  },
  { 
    id: 4, 
    status: 'correct', 
    text: 'Calculate\\,Young\'s\\,modulus\\,of\\,wire\\,with\\,given\\,parameters', 
    marks: 4, 
    obtained: 4,
    selectedOption: 'D',
    correctOption: 'D',
    options: [
      { label: 'A', text: '100' },
      { label: 'B', text: '200' },
      { label: 'C', text: '300' },
      { label: 'D', text: '400' }
    ]
  },
  { 
    id: 5, 
    status: 'incorrect', 
    text: 'Water\\,falls\\,from\\,height\\,200m,\\,calculate\\,temperature\\,rise', 
    marks: 4, 
    obtained: -1,
    selectedOption: 'B',
    correctOption: 'C',
    options: [
      { label: 'A', text: '0.2°C' },
      { label: 'B', text: '0.3°C' },
      { label: 'C', text: '0.47°C' },
      { label: 'D', text: '0.5°C' }
    ]
  },
  { 
    id: 6, 
    status: 'correct', 
    text: 'Determine\\,the\\,electric\\,field\\,intensity\\,at\\,a\\,given\\,point', 
    marks: 4, 
    obtained: 4,
    selectedOption: 'A',
    correctOption: 'A',
    options: [
      { label: 'A', text: '5000 N/C' },
      { label: 'B', text: '3000 N/C' },
      { label: 'C', text: '2000 N/C' },
      { label: 'D', text: '1000 N/C' }
    ]
  },
  { 
    id: 7, 
    status: 'correct', 
    text: 'Calculate\\,the\\,wavelength\\,of\\,light\\,in\\,a\\,medium', 
    marks: 4, 
    obtained: 4,
    selectedOption: 'C',
    correctOption: 'C',
    options: [
      { label: 'A', text: '400 nm' },
      { label: 'B', text: '500 nm' },
      { label: 'C', text: '600 nm' },
      { label: 'D', text: '700 nm' }
    ]
  },
  { 
    id: 8, 
    status: 'incorrect', 
    text: 'Find\\,the\\,moment\\,of\\,inertia\\,of\\,a\\,solid\\,sphere', 
    marks: 4, 
    obtained: 0,
    selectedOption: 'D',
    correctOption: 'B',
    options: [
      { label: 'A', text: '(1/2)MR²' },
      { label: 'B', text: '(2/5)MR²' },
      { label: 'C', text: '(3/5)MR²' },
      { label: 'D', text: '(2/3)MR²' }
    ]
  },
  { 
    id: 9, 
    status: 'correct', 
    text: 'Placeholder\\,question\\,9', 
    marks: 4, 
    obtained: 4,
    selectedOption: 'A',
    correctOption: 'A',
    options: [
      { label: 'A', text: 'Option A' },
      { label: 'B', text: 'Option B' },
      { label: 'C', text: 'Option C' },
      { label: 'D', text: 'Option D' }
    ]
  },
  { 
    id: 10, 
    status: 'incorrect', 
    text: 'Placeholder\\,question\\,10', 
    marks: 4, 
    obtained: -1,
    selectedOption: 'B',
    correctOption: 'C',
    options: [
      { label: 'A', text: 'Option A' },
      { label: 'B', text: 'Option B' },
      { label: 'C', text: 'Option C' },
      { label: 'D', text: 'Option D' }
    ]
  },
  { 
    id: 11, 
    status: 'correct', 
    text: 'Placeholder\\,question\\,11', 
    marks: 4, 
    obtained: 4,
    selectedOption: 'D',
    correctOption: 'D',
    options: [
      { label: 'A', text: 'Option A' },
      { label: 'B', text: 'Option B' },
      { label: 'C', text: 'Option C' },
      { label: 'D', text: 'Option D' }
    ]
  },
  { 
    id: 12, 
    status: 'incorrect', 
    text: 'Placeholder\\,question\\,12', 
    marks: 4, 
    obtained: 0,
    selectedOption: 'A',
    correctOption: 'B',
    options: [
      { label: 'A', text: 'Option A' },
      { label: 'B', text: 'Option B' },
      { label: 'C', text: 'Option C' },
      { label: 'D', text: 'Option D' }
    ]
  },
  { 
    id: 13, 
    status: 'correct', 
    text: 'Placeholder\\,question\\,13', 
    marks: 4, 
    obtained: 4,
    selectedOption: 'C',
    correctOption: 'C',
    options: [
      { label: 'A', text: 'Option A' },
      { label: 'B', text: 'Option B' },
      { label: 'C', text: 'Option C' },
      { label: 'D', text: 'Option D' }
    ]
  },
  { 
    id: 14, 
    status: 'correct', 
    text: 'Placeholder\\,question\\,14', 
    marks: 4, 
    obtained: 4,
    selectedOption: 'A',
    correctOption: 'A',
    options: [
      { label: 'A', text: 'Option A' },
      { label: 'B', text: 'Option B' },
      { label: 'C', text: 'Option C' },
      { label: 'D', text: 'Option D' }
    ]
  },
  { 
    id: 15, 
    status: 'incorrect', 
    text: 'Placeholder\\,question\\,15', 
    marks: 4, 
    obtained: -1,
    selectedOption: 'D',
    correctOption: 'B',
    options: [
      { label: 'A', text: 'Option A' },
      { label: 'B', text: 'Option B' },
      { label: 'C', text: 'Option C' },
      { label: 'D', text: 'Option D' }
    ]
  }
]

const recommendations = [
  { icon: 'ph-lightbulb', title: 'Review Angular Momentum Concepts', description: 'Focus on rotational dynamics and moment of inertia calculations' },
  { icon: 'ph-clock', title: 'Improve Time Management', description: 'You took 80 seconds more than expected. Practice similar problems' },
  { icon: 'ph-book-open', title: 'Practice More Problems', description: 'Solve 5-10 similar questions to strengthen your understanding' }
]

export default function QuestionAnalysisExpanded({ onClose }: QuestionAnalysisExpandedProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [selectedQuestion, setSelectedQuestion] = useState(1)
  const [currentRecommendation, setCurrentRecommendation] = useState(0)

  const formatQuestionText = (text: string) => {
    // Replace LaTeX spacing with regular spaces and split into words
    const cleanText = text.replace(/\\\\/g, ' ')
    const words = cleanText.split(' ')
    const maxCharsPerLine = 80 // Approximate characters per line
    
    let result = ''
    let currentLine = ''
    
    words.forEach((word, index) => {
      if ((currentLine + word).length > maxCharsPerLine && currentLine.length > 0) {
        result += currentLine.trim() + '\n'
        currentLine = word + ' '
      } else {
        currentLine += word + ' '
      }
    })
    
    result += currentLine.trim()
    return result
  }

  return (
    <>
      <style jsx global>{`
        .question-text {
          white-space: normal !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        .question-text .katex-html {
          white-space: normal !important;
          display: inline !important;
        }
        .question-text .katex-html .base {
          display: inline !important;
          white-space: normal !important;
        }
      `}</style>
      {/* Desktop Only - Show content */}
      <div className={`hidden lg:flex h-screen ${
        isDarkMode ? 'bg-zinc-950' : 'bg-gray-50'
      }`}>
      {/* Sidebar */}
      <aside className={`w-64 h-screen overflow-y-auto border-r ${
        isDarkMode ? 'bg-zinc-950/95 border-zinc-800/50' : 'bg-[#f9f9f7] border-gray-200'
      }`}>
        <div className={`p-4 border-b ${
          isDarkMode ? 'border-zinc-800/50' : 'border-gray-200'
        }`}>
          <h3 className={`text-sm font-semibold ${
            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
          }`}>Questions</h3>
          <select className={`mt-2 w-full px-2 py-1.5 text-xs rounded-lg border outline-none transition-colors ${
            isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-300' : 'bg-white border-gray-300 text-gray-700'
          }`}>
            <option value="all">All Subjects</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="maths">Maths</option>
          </select>
        </div>

        <div>
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQuestion(q.id)}
              className={`flex w-full items-center space-x-3 border-b px-4 py-3 text-left transition-colors ${
                selectedQuestion === q.id
                  ? isDarkMode
                    ? 'bg-zinc-800/50 font-semibold'
                    : 'bg-[#e8e5de] font-semibold'
                  : isDarkMode
                  ? 'hover:bg-zinc-800/30'
                  : 'hover:bg-gray-100'
              } ${
                isDarkMode ? 'border-zinc-800/50' : 'border-gray-200'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <i className={`ph ${
                      q.status === 'correct' ? isDarkMode ? 'ph-check text-green-600' : 'ph-check text-green-500' : isDarkMode ? 'ph-x text-red-600' : 'ph-x text-red-500'
                    } text-sm flex-shrink-0`} />
                    <p className={`text-xs font-medium ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>Q. {q.id}</p>
                  </div>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                  }`}></span>
                </div>
                <div className={`text-xs line-clamp-1 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  <LaTeX>{q.text}</LaTeX>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`relative flex-1 h-screen overflow-y-auto ${
        isDarkMode ? 'bg-zinc-950/95' : 'bg-[#f9f9f7]'
      }`}>
        <div className="relative h-full">
          <div className="flex flex-col h-full">
            {/* Top Row - Modern Card Layout */}
            <div className={`p-8 border-b relative ${
              isDarkMode ? 'border-zinc-800/50' : 'border-gray-200'
            }`}>
              {/* Close Button - Top Right */}
              <button onClick={onClose} className={`absolute top-6 right-6 w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                isDarkMode ? 'bg-zinc-900/40 border-zinc-800/50 hover:bg-zinc-800/50 text-zinc-400' : 'bg-white/60 border-gray-200/50 hover:bg-gray-100 text-gray-600'
              }`}>
                <i className="ph ph-x text-sm" />
              </button>
              
              <div className="flex items-center gap-6">
                {/* Left: Score Card */}
                <div className={`flex items-center gap-6 p-5 rounded-xl border flex-1 ${
                  isDarkMode ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white/60 border-gray-200/50'
                }`}>
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-[3px] border-[#8C7B65] flex items-center justify-center">
                      <span className={`text-xl font-bold ${
                        questions[selectedQuestion - 1].obtained > 0 ? isDarkMode ? 'text-green-600' : 'text-green-500' : 
                        questions[selectedQuestion - 1].obtained === 0 ? isDarkMode ? 'text-blue-600' : 'text-blue-500' : isDarkMode ? 'text-red-600' : 'text-red-500'
                      }`}>{questions[selectedQuestion - 1].obtained}</span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                      isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700'
                    }`}>{questions[selectedQuestion - 1].marks}</div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div>
                      <div className={`text-[10px] uppercase tracking-wide mb-1.5 font-medium ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                      }`}>Marking</div>
                      <div className="flex gap-1.5">
                        <StatusChip status="+4" variant="success" />
                        <StatusChip status="-1" variant="danger" />
                      </div>
                      <div className={`px-3 py-2 mt-2 rounded-lg border flex items-center gap-2.5 ${
                        isDarkMode ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white/60 border-gray-200/50'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <i className={`ph ph-timer text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>260s</span>
                        </div>
                        <div className={`w-px h-4 ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'}`} />
                        <div className="flex items-center gap-1.5">
                          <i className={`ph ph-target text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
                          <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>180s</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'}`} />
                    
                    <div>
                      <div className={`text-[10px] uppercase tracking-wide mb-1.5 font-medium ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                      }`}>Topics</div>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {['Mechanics', 'Rotation', 'Physics', 'Momentum', 'Angular', 'Inertia'].map(topic => (
                          <span key={topic} className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            isDarkMode ? 'bg-zinc-800/50 text-zinc-400' : 'bg-gray-100 text-gray-600'
                          }`}>{topic}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Recommendations Card */}
                  <div className={`p-4 rounded-xl border flex-1 flex flex-col ${
                    isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'
                  }`}>
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className={`text-sm font-semibold flex items-center gap-2 ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}>
                        <img src="https://osmium.co.in/cdnLogo" alt="Osmium AI" className="w-3 h-auto" />
                        AI Recommendations
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentRecommendation(currentRecommendation > 0 ? currentRecommendation - 1 : recommendations.length - 1)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                          }`}>
                          <i className="ph ph-caret-left text-xs" />
                        </button>
                        <div className="flex gap-1">
                          {recommendations.map((_, index) => (
                            <div
                              key={index}
                              className={`w-1.5 h-1.5 rounded-full ${
                                index === currentRecommendation ? 'bg-[#8C7B65]' : isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setCurrentRecommendation(currentRecommendation < recommendations.length - 1 ? currentRecommendation + 1 : 0)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isDarkMode ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                          }`}>
                          <i className="ph ph-caret-right text-xs" />
                        </button>
                      </div>
                    </div>
                    <div className={`flex-1 p-3 rounded-lg border ${
                      isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-gray-50/50 border-gray-200/50'
                    }`}>
                      <div className="flex items-start gap-2">
                        <i className={`ph ${recommendations[currentRecommendation].icon} text-sm mt-0.5 text-[#8C7B65]`} />
                        <div>
                          <p className={`text-xs font-medium mb-1 ${
                            isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                          }`}>{recommendations[currentRecommendation].title}</p>
                          <p className={`text-xs ${
                            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                          }`}>{recommendations[currentRecommendation].description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Row - Content */}
            <div className={`w-full p-8 flex-1 overflow-hidden`}>
              <div className="flex gap-6 h-full">
                {/* Left Column - Question (2.75/4) - Scrollable */}
                <div className="w-[68.75%] min-w-0 overflow-y-auto h-full">
                  <div className={`flex items-center gap-2 text-xs mb-4 ${
                    isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                  }`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8C7B65]" />
                    <span>Question {selectedQuestion}</span>
                  </div>
                  
                  <div className={`question-text text-sm leading-relaxed mb-4 ${
                    isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                  }`} style={{ width: '100%', maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                    <LaTeX>{questions[selectedQuestion - 1].text.replace(/\\\\/g, ' ')}</LaTeX>
                  </div>

                  {/* Answer Chip */}
                  <div className={`px-3 py-2 mb-6 rounded-lg border flex items-center gap-2.5 w-fit ${
                    isDarkMode ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white/60 border-gray-200/50'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Selected:</span>
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-red-600' : 'text-red-500'}`}>{questions[selectedQuestion - 1].selectedOption}</span>
                    </div>
                    <div className={`w-px h-4 ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'}`} />
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Correct:</span>
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-green-600' : 'text-green-500'}`}>{questions[selectedQuestion - 1].correctOption}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {questions[selectedQuestion - 1].options.map((option) => {
                      const isCorrect = option.label === questions[selectedQuestion - 1].correctOption
                      const isSelected = option.label === questions[selectedQuestion - 1].selectedOption
                      const isWrong = isSelected && !isCorrect
                      
                      return (
                        <div key={option.label} className={`rounded-xl border p-4 backdrop-blur-sm transition-all ${
                          isCorrect
                            ? isDarkMode ? 'border-green-900/40 bg-green-950/20' : 'border-green-300 bg-gradient-to-r from-green-100 to-green-50'
                            : isWrong
                            ? isDarkMode ? 'border-red-900/40 bg-red-950/20' : 'border-red-300 bg-gradient-to-r from-red-100 to-red-50'
                            : isDarkMode ? 'border-zinc-800/40 bg-zinc-900/30' : 'border-gray-300 bg-gray-50'
                        }`}>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                                isCorrect
                                  ? isDarkMode ? 'bg-green-900/40 text-green-600' : 'bg-green-200 text-green-700'
                                  : isWrong
                                  ? isDarkMode ? 'bg-red-900/40 text-red-600' : 'bg-red-200 text-red-700'
                                  : isDarkMode ? 'bg-zinc-800/50 text-zinc-500' : 'bg-gray-200 text-gray-600'
                              }`}>{option.label}</div>
                              <span className={`text-sm break-words ${isCorrect || isWrong ? 'font-medium' : ''} ${
                                isCorrect
                                  ? isDarkMode ? 'text-green-600' : 'text-green-800'
                                  : isWrong
                                  ? isDarkMode ? 'text-red-600' : 'text-red-800'
                                  : isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                              }`}><LaTeX>{option.text}</LaTeX></span>
                            </div>
                            {(isCorrect || isWrong) && (
                              <i className={`ph flex-shrink-0 ${isCorrect ? 'ph-check-circle' : 'ph-x-circle'} text-base ${
                                isCorrect
                                  ? isDarkMode ? 'text-green-600' : 'text-green-700'
                                  : isDarkMode ? 'text-red-600' : 'text-red-700'
                              }`} />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right Column - Solution (1.25/4) */}
                <div className="w-[31.25%] min-w-0 h-full">
                  <div className={`rounded-xl border h-full flex flex-col ${
                    isDarkMode ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white/60 border-gray-200/50'
                  }`}>
                    <div className="flex items-center gap-2 p-5 pb-3">
                      <i className={`ph ph-lightbulb text-base ${
                        isDarkMode ? 'text-[#8C7B65]' : 'text-[#8C7B65]'
                      }`} />
                      <h3 className={`text-sm font-semibold ${
                        isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                      }`}>Solution</h3>
                    </div>
                    
                    <div className={`flex-1 overflow-y-auto px-5 pb-12 space-y-4 text-sm ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      <div>
                        <p className={`text-xs font-medium mb-2 uppercase tracking-wide ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Approach</p>
                        <p className="leading-relaxed">
                          To find Young's modulus, we use the formula Y = (F × L) / (A × ΔL), where F is the force applied, L is the original length, A is the cross-sectional area, and ΔL is the extension. First, calculate the force from the mass: F = mg = 50 × 10 = 500 N. Then find the area: A = πr² = π(3×10⁻³)² = 2.827×10⁻⁵ m². The extension is ΔL = 0.1 mm = 1×10⁻⁴ m.
                        </p>
                      </div>
                      
                      <div>
                        <p className={`text-xs font-medium mb-2 uppercase tracking-wide ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Formula</p>
                        <div className={`p-3 mb-6 rounded-lg border max-h-48 overflow-y-auto ${
                          isDarkMode ? 'bg-zinc-800/30 border-zinc-700/50 shadow-[inset_0_-8px_12px_-8px_rgba(0,0,0,0.3)]' : 'bg-gray-50 border-gray-200 shadow-[inset_0_-8px_12px_-8px_rgba(0,0,0,0.1)]'
                        }`}>
                          <div className="space-y-3">
                            <LaTeX>{`Y = \\frac{F \\times L}{A \\times \\Delta L}`}</LaTeX>
                            <LaTeX>{`Y = \\frac{500 \\times 3}{2.827 \\times 10^{-5} \\times 10^{-4}}`}</LaTeX>
                            <LaTeX>{`Y = \\frac{1500}{2.827 \\times 10^{-9}}`}</LaTeX>
                            <LaTeX>{`Y = 5.3 \\times 10^{10} \\, N/m^2`}</LaTeX>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className={`text-xs font-medium mb-2 uppercase tracking-wide ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Key Concept</p>
                        <p className="leading-relaxed">
                          Young's modulus is a measure of the stiffness of a material. It represents the ratio of stress (force per unit area) to strain (relative deformation). A higher value indicates a stiffer material that resists deformation more effectively. The calculation involves converting all units to SI base units before substitution.
                        </p>
                      </div>
                      
                      <div>
                        <p className={`text-xs font-medium mb-2 uppercase tracking-wide ${
                          isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                        }`}>Common Mistakes</p>
                        <ul className="list-disc list-inside space-y-1 leading-relaxed">
                          <li>Forgetting to convert mm to meters</li>
                          <li>Using diameter instead of radius for area calculation</li>
                          <li>Not squaring the radius in πr²</li>
                          <li>Incorrect unit conversions leading to wrong powers of 10</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pagination with Theme Toggle */}
          <div className="fixed bottom-4 right-4">
            <div className={`flex items-center gap-2 rounded-xl p-1.5 border backdrop-blur-xl ${
              isDarkMode ? 'bg-zinc-900/90 border-zinc-800/50' : 'bg-white/90 border-gray-200/50'
            }`}>
              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <motion.div 
                  className={`flex items-center rounded-lg p-1 ${
                    isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100/50'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <button
                    onClick={toggleDarkMode}
                    className={`relative flex items-center justify-center rounded-md px-2 py-1 text-sm font-medium transition-all duration-200 ${
                      !isDarkMode ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-label="Switch to Light theme"
                  >
                    {!isDarkMode && (
                      <motion.div 
                        className={`absolute inset-0 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-zinc-700/50' : 'bg-white/80'
                        }`}
                        layoutId="theme-toggle"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <i className="ph ph-sun relative h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative flex items-center justify-center rounded-md px-2 py-1 text-sm font-medium transition-all duration-200 ${
                      isDarkMode ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-label="Switch to Dark theme"
                  >
                    {isDarkMode && (
                      <motion.div 
                        className={`absolute inset-0 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-zinc-700/50' : 'bg-white/80'
                        }`}
                        layoutId="theme-toggle"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <i className="ph ph-moon relative h-3.5 w-3.5" />
                  </button>
                </motion.div>
              </div>
              
              <div className={`w-px h-6 ${
                isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'
              }`} />
              
              <button
                onClick={() => setSelectedQuestion(prev => Math.max(1, prev - 1))}
                disabled={selectedQuestion === 1}
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
                  selectedQuestion === 1
                    ? isDarkMode ? 'text-zinc-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                    : isDarkMode ? 'text-zinc-300 hover:bg-zinc-800/50' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className="ph ph-caret-left text-sm" />
              </button>
              <span className={`text-sm font-medium px-2 ${
                isDarkMode ? 'text-zinc-200' : 'text-gray-700'
              }`}>
                {selectedQuestion} of {questions.length}
              </span>
              <button
                onClick={() => setSelectedQuestion(prev => Math.min(questions.length, prev + 1))}
                disabled={selectedQuestion === questions.length}
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
                  selectedQuestion === questions.length
                    ? isDarkMode ? 'text-zinc-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                    : isDarkMode ? 'text-zinc-300 hover:bg-zinc-800/50' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className="ph ph-caret-right text-sm" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    {/* Mobile/Tablet - Show message */}
    <div className={`lg:hidden h-screen flex items-center justify-center p-6 ${
      isDarkMode ? 'bg-zinc-950' : 'bg-gray-50'
    }`}>
      <div className={`text-center max-w-md p-8 rounded-xl border ${
        isDarkMode ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white/60 border-gray-200/50'
      }`}>
        <i className={`ph ph-desktop text-4xl mb-4 ${
          isDarkMode ? 'text-zinc-400' : 'text-gray-500'
        }`} />
        <h2 className={`text-lg font-semibold mb-2 ${
          isDarkMode ? 'text-zinc-100' : 'text-gray-900'
        }`}>Desktop Only</h2>
        <p className={`text-sm mb-4 ${
          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
        }`}>This page is optimized for desktop viewing. Please access it from a larger screen.</p>
        <button onClick={onClose} className={`px-4 py-2 rounded-lg border ${
          isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-200 hover:bg-zinc-800' : 'bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200'
        }`}>Go Back</button>
      </div>
    </div>
    </>
  )
}
