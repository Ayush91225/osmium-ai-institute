'use client'

import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'

interface Message {
  content: string
  isUser: boolean
  timestamp: string
}

interface ChatSession {
  id: number
  title: string
  messages: Message[]
  timestamp: string
  preview: string
}

function AIMentorContent() {
  const { isDarkMode } = useDarkMode()
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [showWelcome, setShowWelcome] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('aiMentorHistory')
    if (saved) setChatHistory(JSON.parse(saved))
  }, [])

  const aiResponses = {
    greetings: ["Hello! I'm your AI Mentor. How can I help you with your studies today?"],
    quiz: ["I'd be happy to create a quiz for you! What specific topic would you like the quiz to focus on?"],
    study: ["I can help you create effective study materials! What subject are you focusing on?"],
    weak_areas: ["Let's identify and strengthen your weak areas! What subject would you like to focus on?"],
    default: ["That's an interesting question! Could you tell me more about what specific topic you'd like assistance with?"]
  }

  const getAIResponse = (msg: string) => {
    const lower = msg.toLowerCase()
    if (lower.includes('hello') || lower.includes('hi')) return aiResponses.greetings[0]
    if (lower.includes('quiz') || lower.includes('test')) return aiResponses.quiz[0]
    if (lower.includes('study') || lower.includes('notes')) return aiResponses.study[0]
    if (lower.includes('weak') || lower.includes('review')) return aiResponses.weak_areas[0]
    return aiResponses.default[0]
  }

  const sendMessage = () => {
    if (!chatInput.trim()) return
    
    const userMsg: Message = { content: chatInput, isUser: true, timestamp: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setChatInput('')
    setShowWelcome(false)
    setIsTyping(true)

    setTimeout(() => {
      const aiMsg: Message = { content: getAIResponse(chatInput), isUser: false, timestamp: new Date().toISOString() }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  const sendSuggestion = (text: string) => {
    setChatInput(text)
    setTimeout(() => sendMessage(), 100)
  }

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'bg-zinc-950' : 'bg-[#F9F8F6]'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-6 py-3 border-b ${isDarkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
        <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AI Mentor</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => window.location.reload()} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700' : 'bg-[#F3F1EE] border-gray-200 hover:bg-gray-200'}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">New</span>
          </button>
          <button onClick={() => setShowHistory(true)} className={`w-8 h-8 rounded-lg flex items-center justify-center border ${isDarkMode ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700' : 'bg-[#F3F1EE] border-gray-200 hover:bg-gray-200'}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {showWelcome ? (
          <>
            <h2 className={`text-3xl font-serif mb-8 text-center ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`}>
              Welcome back, <span className={isDarkMode ? 'text-white' : 'text-black'}>Suman</span>
            </h2>
            <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
              <button onClick={() => sendSuggestion('Review my weak areas in recent tests')} className="px-4 py-2 text-sm rounded-lg bg-[#F6ECE9] text-[#503D3A] hover:bg-[#f0e0dc] transition-colors">Review weak areas</button>
              <button onClick={() => sendSuggestion('Help me with challenging topics review')} className="px-4 py-2 text-sm rounded-lg bg-[#EDEEE4] text-[#4E5035] hover:bg-[#e5e6dc] transition-colors">Challenging topics</button>
              <button onClick={() => sendSuggestion('Generate quiz on kinematics')} className="px-4 py-2 text-sm rounded-lg bg-[#E6F0EB] text-[#35483D] hover:bg-[#dce8e3] transition-colors">Generate quiz</button>
            </div>
          </>
        ) : (
          <div className="w-full max-w-3xl h-full overflow-y-auto py-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 mb-4 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${msg.isUser ? 'bg-gradient-to-br from-[#d4a574] to-[#c48a5c] text-white order-2' : 'bg-[#e8e3da] text-[#8b7355]'}`}>
                  {msg.isUser ? 'S' : 'AI'}
                </div>
                <div className={`max-w-[75%] px-4 py-2.5 text-sm rounded-xl ${msg.isUser ? 'bg-[#8b7355] text-white rounded-br-md' : isDarkMode ? 'bg-zinc-800 text-white rounded-bl-md' : 'bg-[#f4f2ef] text-gray-900 rounded-bl-md'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#e8e3da] text-[#8b7355] flex items-center justify-center text-xs font-semibold">AI</div>
                <div className={`px-4 py-2.5 rounded-xl rounded-bl-md ${isDarkMode ? 'bg-zinc-800' : 'bg-[#f4f2ef]'}`}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`px-6 py-4 border-t ${isDarkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
        <div className="max-w-3xl mx-auto">
          <div className={`rounded-xl border p-3 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="What's on your mind?" className={`w-full bg-transparent border-none outline-none mb-2 text-sm ${isDarkMode ? 'text-white placeholder-zinc-500' : 'text-gray-900 placeholder-gray-400'}`} />
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <button onClick={() => setChatInput('Notes: ')} className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
                  <span className="hidden sm:inline">Notes</span>
                  <span className="sm:hidden">📝</span>
                </button>
                <button onClick={() => setChatInput('Generate a quiz on ')} className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#fff8e6] border border-[#f4d35e] text-[#8a7433] hover:bg-[#fff3d6]">
                  <span className="hidden sm:inline">Quiz</span>
                  <span className="sm:hidden">⚡</span>
                </button>
              </div>
              <button onClick={sendMessage} className="w-8 h-8 rounded-full bg-[#8b7355] hover:bg-[#6b5d4f] flex items-center justify-center transition-transform hover:scale-105">
                <svg width="16" height="16" viewBox="0 0 256 256" fill="none">
                  <line x1="128" y1="216" x2="128" y2="40" stroke="white" strokeWidth="20" strokeLinecap="round" />
                  <polyline points="56 112 128 40 200 112" fill="none" stroke="white" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <>
          <div onClick={() => setShowHistory(false)} className="fixed inset-0 bg-black/50 z-40"></div>
          <div className={`fixed top-0 right-0 w-full sm:w-96 h-full z-50 flex flex-col ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
            <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Chat History</h3>
              <button onClick={() => setShowHistory(false)} className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {chatHistory.length === 0 ? (
                <p className={`text-center italic ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>No chat history yet</p>
              ) : (
                chatHistory.map(chat => (
                  <div key={chat.id} className={`p-4 rounded-xl mb-3 cursor-pointer border ${isDarkMode ? 'border-zinc-800 hover:bg-zinc-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{chat.title}</div>
                    <div className={`text-sm mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{chat.preview}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>{new Date(chat.timestamp).toLocaleDateString()}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function AIMentorPage() {
  return (
    <DashboardLayout role="student">
      <AIMentorContent />
    </DashboardLayout>
  )
}
