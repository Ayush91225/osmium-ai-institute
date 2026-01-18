'use client';

import { useState, useEffect } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';

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

export default function AIMentorPage() {
  const { isDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('teacherAIMentorHistory');
    if (saved) setChatHistory(JSON.parse(saved));
  }, []);

  const aiResponses = {
    greetings: ["Hello! I'm your AI Teaching Assistant. How can I help you today?"],
    quiz: ["I can help you generate quizzes! What topic and difficulty level would you like?"],
    study: ["I can help you create teaching materials! What subject are you preparing?"],
    default: ["I'm here to assist with your teaching needs. What would you like help with?"]
  };

  const getAIResponse = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) return aiResponses.greetings[0];
    if (lower.includes('quiz') || lower.includes('test')) return aiResponses.quiz[0];
    if (lower.includes('study') || lower.includes('material')) return aiResponses.study[0];
    return aiResponses.default[0];
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    
    const currentInput = chatInput;
    const userMsg: Message = { content: currentInput, isUser: true, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setShowWelcome(false);
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = { content: getAIResponse(currentInput), isUser: false, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const sendSuggestion = (text: string) => {
    setChatInput(text);
    setTimeout(() => sendMessage(), 100);
  };

  if (!mounted) return null;

  return (
    <div className={`h-screen flex flex-col ${
      isDarkMode ? 'bg-zinc-950' : 'bg-[#F8F8F6]'
    }`} style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className={`px-8 py-6 border-b ${
        isDarkMode ? 'border-zinc-800' : 'border-[#e5e5e5]'
      }`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-semibold ${
            isDarkMode ? 'text-zinc-100' : 'text-[#141414]'
          }`}>AI Mentor</h1>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => window.location.reload()} className={`inline-flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode ? 'bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700' : 'bg-[#F3F1EE] border border-[rgba(0,0,0,0.04)] text-[#141414] hover:bg-[#e8e3da]'
            }`}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              New Chat
            </button>
            <button type="button" onClick={() => setShowHistory(true)} aria-label="View chat history" className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700' : 'bg-[#F3F1EE] border-[rgba(0,0,0,0.04)] hover:bg-[#e8e3da]'
            }`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 overflow-hidden">
        {showWelcome ? (
          <>
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-normal mb-2 ${
                isDarkMode ? 'text-zinc-400' : 'text-[#999]'
              }`} style={{ fontFamily: "'Times New Roman', serif" }}>
                Welcome back, <span className={isDarkMode ? 'text-zinc-100' : 'text-[#1a1a1a]'}>Suman</span>
              </h2>
            </div>
            <div className="flex gap-4 flex-wrap justify-center max-w-[720px]">
              <button type="button" onClick={() => sendSuggestion('Generate quiz for my class')} className={`py-3 px-6 rounded-lg text-sm transition-all ${
                isDarkMode ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700' : 'bg-[#F6ECE9] text-[#503D3A] hover:bg-[#f0e0dc]'
              }`}>
                Generate quiz for class
              </button>
              <button type="button" onClick={() => sendSuggestion('Create teaching materials')} className={`py-3 px-6 rounded-lg text-sm transition-all ${
                isDarkMode ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700' : 'bg-[#EDEEE4] text-[#4E5035] hover:bg-[#e3e4da]'
              }`}>
                Create teaching materials
              </button>
              <button type="button" onClick={() => sendSuggestion('Help with lesson planning')} className={`py-3 px-6 rounded-lg text-sm transition-all ${
                isDarkMode ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700' : 'bg-[#E6F0EB] text-[#35483D] hover:bg-[#dce8e1]'
              }`}>
                Help with lesson planning
              </button>
            </div>
          </>
        ) : (
          <div className="w-full max-w-3xl flex-1 overflow-y-auto py-4">
            {messages.map((msg: Message, idx: number) => (
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
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0s]"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`px-6 pt-4 pb-6 flex-shrink-0 ${
        isDarkMode ? 'bg-zinc-950' : 'bg-[#faf8f6]'
      }`}>
        <div className="max-w-[720px] mx-auto w-full">
          <div className={`rounded-2xl px-5 py-4 border ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-[#e5e5e5]'
          }`}>
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className={`w-full border-none outline-none text-sm mb-3 bg-transparent ${
                isDarkMode ? 'text-zinc-200 placeholder-zinc-500' : 'text-[#333] placeholder-gray-400'
              }`}
              placeholder="What's on your mind?"
            />
            <div className="flex gap-3 items-center">
              <button type="button" onClick={() => setChatInput('Notes: ')} className={`flex items-center gap-1 py-1.5 px-2.5 border rounded-md text-xs transition-all ${
                isDarkMode ? 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'border-[#e5e5e5] bg-[#f8f9fa] text-[#666] hover:bg-[#f0f0f0]'
              }`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                Notes
              </button>
              <button type="button" onClick={() => setChatInput('Generate a quiz on ')} className={`flex items-center gap-1 py-1.5 px-2.5 border rounded-md text-xs transition-all ${
                isDarkMode ? 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'border-[#f4d35e] bg-[#fff8e6] text-[#8a7433] hover:bg-[#fff3d6]'
              }`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                Quiz
              </button>
              <button type="button" onClick={sendMessage} aria-label="Send message" className="ml-auto w-8 h-8 rounded-full bg-[#8C7B65] flex items-center justify-center transition-all hover:bg-[#7A6B58] hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20">
                  <line x1="128" y1="216" x2="128" y2="40" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                  <polyline points="56 112 128 40 200 112" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
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
              <button type="button" onClick={() => setShowHistory(false)} aria-label="Close chat history" className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
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
                chatHistory.map((chat: ChatSession) => (
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
  );
}
