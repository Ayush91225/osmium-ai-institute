'use client'

import { memo, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import Link from 'next/link'

interface TopicSidebarProps {
  courseId: string
  topicId: string
  topicName: string
  activePage?: 'overview' | 'notes' | 'podcast' | 'questions' | 'flashcard' | 'quiz'
}

function TopicSidebar({ courseId, topicId, topicName, activePage = 'overview' }: TopicSidebarProps) {
  const { isDarkMode } = useDarkMode()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const courseTopics = [
    { id: '1', name: 'Introduction to DSA' },
    { id: '2', name: 'Arrays & Strings' },
    { id: '3', name: 'Linked Lists' },
    { id: '4', name: 'Stacks & Queues' },
    { id: '5', name: 'Trees & Graphs' },
    { id: '6', name: 'Sorting Algorithms' },
    { id: '7', name: 'Searching Techniques' },
    { id: '8', name: 'Dynamic Programming' }
  ]

  return (
    <aside className={`w-[360px] border-l flex-shrink-0 hidden lg:block h-screen overflow-y-auto scrollbar-hide ${
      isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-[#F7F5F3] border-gray-200'
    }`}>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="relative mb-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className={`font-sans font-semibold text-[15px] tracking-tight flex-1 truncate ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {topicName}
            </h1>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-9 h-9 flex items-center justify-center border rounded-lg shadow-sm transition-colors ${
                isDarkMode 
                  ? 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700' 
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className={`absolute top-full right-0 mt-2 w-72 rounded-xl shadow-xl border z-50 ${
                isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
              }`}>
                <div className={`p-4 border-b flex items-center justify-between ${
                  isDarkMode ? 'border-zinc-800' : 'border-gray-200'
                }`}>
                  <h3 className={`font-serif text-base font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Data Structures & Algorithms with C++
                  </h3>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className={`w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 ${
                      isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'text-gray-500'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div className="p-2 max-h-80 overflow-y-auto">
                  {courseTopics.map((topic) => (
                    <Link
                      key={topic.id}
                      href={`/dashboard/student/learn/${courseId}/${topic.id}/overview`}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-sm transition-colors ${
                        topic.id === topicId
                          ? isDarkMode
                            ? 'bg-zinc-800 text-white font-medium'
                            : 'bg-gray-100 text-gray-900 font-medium'
                          : isDarkMode
                            ? 'text-zinc-300 hover:bg-zinc-800/50'
                            : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Learn Section */}
        <div className="mb-8">
          <h2 className={`font-serif italic font-medium text-xl mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Learn
          </h2>
          <p className={`text-[13px] mb-5 leading-relaxed ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>
            Start mastering data structures and algorithms in Java now.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href={`/dashboard/student/learn/${courseId}/${topicId}/overview`}
              className={`w-full p-4 rounded-xl border flex items-center justify-between ${
                activePage === 'overview'
                  ? isDarkMode 
                    ? 'bg-zinc-800 border-zinc-700' 
                    : 'bg-white border-gray-200 shadow-sm'
                  : isDarkMode
                    ? 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activePage === 'overview'
                    ? isDarkMode ? 'bg-white text-black' : 'bg-[#1F2937] text-white'
                    : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M210.78,39.25l-130.25-23A16,16,0,0,0,62,29.23l-29.75,169a16,16,0,0,0,13,18.53l130.25,23a16,16,0,0,0,18.54-13l29.75-169A16,16,0,0,0,210.78,39.25ZM135.5,131.56a8,8,0,0,1-7.87,6.61,8.27,8.27,0,0,1-1.4-.12l-41.5-7.33A8,8,0,0,1,87.52,115L129,122.29A8,8,0,0,1,135.5,131.56Zm47-24.18a8,8,0,0,1-7.86,6.61,7.55,7.55,0,0,1-1.41-.13l-83-14.65a8,8,0,0,1,2.79-15.76l83,14.66A8,8,0,0,1,182.53,107.38Zm5.55-31.52a8,8,0,0,1-7.87,6.61,8.36,8.36,0,0,1-1.4-.12l-83-14.66a8,8,0,1,1,2.78-15.75l83,14.65A8,8,0,0,1,188.08,75.86Z"></path>
                  </svg>
                </div>
                <span className={`text-[14px] font-medium truncate ${
                  activePage === 'overview'
                    ? isDarkMode ? 'text-white' : 'text-gray-900'
                    : isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Overview
                </span>
              </div>
              <span className={`text-[11px] px-2 py-1 rounded font-medium flex-shrink-0 ${
                activePage === 'overview'
                  ? isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-100 text-gray-500'
                  : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-500'
              }`}>
                32 min
              </span>
            </Link>

            <Link
              href={`/dashboard/student/learn/${courseId}/${topicId}/notes`}
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${
                activePage === 'notes'
                  ? isDarkMode 
                    ? 'bg-zinc-800 border-zinc-700' 
                    : 'bg-white border-gray-200 shadow-sm'
                  : isDarkMode
                    ? 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activePage === 'notes'
                    ? isDarkMode ? 'bg-white text-black' : 'bg-[#1F2937] text-white'
                    : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,208H48V48H80Zm96-56H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path>
                  </svg>
                </div>
                <span className={`text-[14px] font-medium truncate ${
                  activePage === 'notes'
                    ? isDarkMode ? 'text-white' : 'text-gray-900'
                    : isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Notes
                </span>
              </div>
              <span className={`text-[11px] px-2 py-1 rounded font-medium flex-shrink-0 ${
                activePage === 'notes'
                  ? isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-100 text-gray-500'
                  : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-500'
              }`}>
                12 min
              </span>
            </Link>

            <Link
              href={`/dashboard/student/learn/${courseId}/${topicId}/podcast`}
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${
                activePage === 'podcast'
                  ? isDarkMode 
                    ? 'bg-zinc-800 border-zinc-700' 
                    : 'bg-white border-gray-200 shadow-sm'
                  : isDarkMode
                    ? 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activePage === 'podcast'
                    ? isDarkMode ? 'bg-white text-black' : 'bg-[#1F2937] text-white'
                    : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M159.8,151.82a19.67,19.67,0,0,1,3.58,17.05l-12.18,48A20.17,20.17,0,0,1,131.56,232h-7.12a20.17,20.17,0,0,1-19.64-15.13l-12.18-48a19.67,19.67,0,0,1,3.58-17.05,20.17,20.17,0,0,1,16-7.82h31.5A20.17,20.17,0,0,1,159.8,151.82ZM156,116a28,28,0,1,0-28,28A28,28,0,0,0,156,116Zm26,27a8,8,0,1,0,15.41,4.29,72,72,0,1,0-138.74,0A8,8,0,0,0,74,143,56,56,0,1,1,182,143ZM128,24A104,104,0,0,0,70.18,214.46a8,8,0,1,0,8.9-13.3,88,88,0,1,1,97.84,0,8,8,0,0,0,8.9,13.3A104,104,0,0,0,128,24Z"></path>
                  </svg>
                </div>
                <span className={`text-[14px] font-medium truncate ${
                  activePage === 'podcast'
                    ? isDarkMode ? 'text-white' : 'text-gray-900'
                    : isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Podcast
                </span>
              </div>
              <span className={`text-[11px] px-2 py-1 rounded font-medium flex-shrink-0 ${
                activePage === 'podcast'
                  ? isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-100 text-gray-500'
                  : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-500'
              }`}>
                6 min
              </span>
            </Link>

            <Link
              href={`/dashboard/student/learn/${courseId}/${topicId}/questions`}
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${
                activePage === 'questions'
                  ? isDarkMode 
                    ? 'bg-zinc-800 border-zinc-700' 
                    : 'bg-white border-gray-200 shadow-sm'
                  : isDarkMode
                    ? 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activePage === 'questions'
                    ? isDarkMode ? 'bg-white text-black' : 'bg-[#1F2937] text-white'
                    : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z"></path>
                  </svg>
                </div>
                <span className={`text-[14px] font-medium truncate ${
                  activePage === 'questions'
                    ? isDarkMode ? 'text-white' : 'text-gray-900'
                    : isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Question bank
                </span>
              </div>
              <span className={`text-[11px] px-2 py-1 rounded font-medium flex-shrink-0 ${
                activePage === 'questions'
                  ? isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-100 text-gray-500'
                  : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-500'
              }`}>
                15 min
              </span>
            </Link>
          </div>
        </div>

        {/* Practice Section */}
        <div>
          <h2 className={`font-serif italic font-medium text-xl mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Practice
          </h2>

          <div className="flex flex-col gap-3">
            <Link
              href={`/dashboard/student/learn/${courseId}/${topicId}/quiz`}
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${
                activePage === 'quiz'
                  ? isDarkMode 
                    ? 'bg-zinc-800 border-zinc-700' 
                    : 'bg-white border-gray-200 shadow-sm'
                  : isDarkMode
                    ? 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activePage === 'quiz'
                    ? isDarkMode ? 'bg-white text-black' : 'bg-[#1F2937] text-white'
                    : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-32.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"></path>
                  </svg>
                </div>
                <span className={`text-[14px] font-medium truncate ${
                  activePage === 'quiz'
                    ? isDarkMode ? 'text-white' : 'text-gray-900'
                    : isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Quiz
                </span>
              </div>
              <span className={`text-[11px] px-2 py-1 rounded font-medium flex-shrink-0 ${
                activePage === 'quiz'
                  ? isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-100 text-gray-500'
                  : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-500'
              }`}>
                32 min
              </span>
            </Link>

            <Link
              href={`/dashboard/student/learn/${courseId}/${topicId}/flashcard`}
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${
                activePage === 'flashcard'
                  ? isDarkMode 
                    ? 'bg-zinc-800 border-zinc-700' 
                    : 'bg-white border-gray-200 shadow-sm'
                  : isDarkMode
                    ? 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activePage === 'flashcard'
                    ? isDarkMode ? 'bg-white text-black' : 'bg-[#1F2937] text-white'
                    : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,208H48V48H80Zm96-56H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path>
                  </svg>
                </div>
                <span className={`text-[14px] font-medium truncate ${
                  activePage === 'flashcard'
                    ? isDarkMode ? 'text-white' : 'text-gray-900'
                    : isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Flashcard
                </span>
              </div>
              <span className={`text-[11px] px-2 py-1 rounded font-medium flex-shrink-0 ${
                activePage === 'flashcard'
                  ? isDarkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-100 text-gray-500'
                  : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-500'
              }`}>
                8 min
              </span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default memo(TopicSidebar)
