'use client'

import { memo, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface TopicPodcastProps {
  courseId: string
  topicId: string
}

function TopicPodcast({ courseId, topicId }: TopicPodcastProps) {
  const { isDarkMode } = useDarkMode()
  const [isPlaying, setIsPlaying] = useState(false)

  const podcastLines = [
    { speaker: 'BEAU', color: '#E28B56', text: 'Alright, so you want to talk about data structures and algorithms in Java? I thought that was just, like, the building blocks of computer science.' },
    { speaker: 'JO', color: '#3E6D9C', text: 'It is! But the real magic, the stuff that separates a clunky program from a lightning-fast one, is how you use them. And doing it effectively in Java? That\'s where things get really interesting.', italic: 'how' },
    { speaker: 'BEAU', color: '#E28B56', text: 'So it\'s not just about knowing what an array is, but knowing when to use a linked list instead, right?' },
    { speaker: 'JO', color: '#3E6D9C', text: 'Exactly! And why that choice can make or break your application\'s performance. Today, we\'re diving deep into mastering those fundamental building blocks with Java.' },
    { speaker: 'BEAU', color: '#E28B56', text: 'Let\'s start with a moment I always get stuck on: why do we even care about picking one data structure over another? I mean — both store stuff, right?' },
    { speaker: 'JO', color: '#3E6D9C', text: 'They\'re both stores, but think of them like toolboxes. If you\'re hanging a picture, you reach for a hammer. If you\'re sewing, you need a needle. Arrays, linked lists, trees — each tool has strengths and weaknesses. Picking the right one affects speed, memory, and how easy it is to implement operations like insert, delete, or search.' },
    { speaker: 'BEAU', color: '#E28B56', text: 'Concrete example, please. My brain likes concrete.' },
    { speaker: 'JO', color: '#3E6D9C', text: 'Okay — imagine a to-do list app. If tasks are stored in an array, accessing the 5th task is instant because arrays use contiguous memory and an index jump. But inserting a task in the middle means shifting everything after it — costly. A singly linked list, on the other hand, lets you splice a new task in place by just changing pointers.' }
  ]

  return (
    <>
      <div className={`flex-1 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 w-full overflow-y-auto pb-32 ${
        isDarkMode ? 'text-zinc-300' : 'text-[#2D2D2D]'
      }`}>
        <div className="mb-6 sm:mb-8 lg:mb-10 flex items-center gap-3 sm:gap-4">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center ${
            isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,24A104,104,0,0,0,70.18,214.46a8,8,0,1,0,8.9-13.3,88,88,0,1,1,97.84,0,8,8,0,0,0,8.9,13.3A104,104,0,0,0,128,24Zm0,144a40,40,0,1,1,40-40A40,40,0,0,1,128,168Zm0-64a24,24,0,1,0,24,24A24,24,0,0,0,128,104Z"></path>
            </svg>
          </div>
          <span className={`font-serif text-lg sm:text-xl md:text-2xl lg:text-[26px] font-medium leading-tight ${
            isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
          }`}>Podcast Recording</span>
        </div>

        <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 font-serif text-sm sm:text-base md:text-[17px] lg:text-[18px] leading-[1.6] sm:leading-[1.7] md:leading-[1.8] tracking-wide">
          {podcastLines.map((line, index) => (
            <div key={index} className="podcast-line">
              <span className={`font-bold text-[10px] sm:text-xs md:text-sm tracking-widest uppercase mr-1 sm:mr-2 font-sans`} style={{ color: line.color }}>
                {line.speaker}:
              </span>
              <span className="podcast-text">{line.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audio Player */}
      <div className={`fixed bottom-0 left-0 lg:left-[280px] right-0 lg:right-[360px] border-t px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 z-40 flex items-center font-sans min-w-0 ${
        isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200 shadow-player'
      }`}>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-lg bg-gradient-to-br from-[#E8B998] to-[#9CB8D9] flex-shrink-0 shadow-inner"></div>
          <div className="flex flex-col min-w-0 pr-2">
            <span className={`text-xs sm:text-sm md:text-base font-medium truncate leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Mastering Data Structures and Algorithms with Java</span>
            <span className={`text-[10px] sm:text-xs hidden sm:block mt-0.5 ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}>Introduction to DSA</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 mx-auto">
          <button className={`p-1.5 sm:p-2 transition-colors ${
            isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
          }`}>
            <svg width="14" height="14" className="sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"></path>
            </svg>
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full border transition-colors ${
              isDarkMode 
                ? 'border-zinc-700 text-white hover:bg-zinc-800' 
                : 'border-gray-200 text-gray-800 hover:bg-gray-50'
            }`}
          >
            {isPlaying ? (
              <svg width="16" height="16" className="sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg width="16" height="16" className="sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
            )}
          </button>
          <button className={`p-1.5 sm:p-2 transition-colors ${
            isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
          }`}>
            <svg width="14" height="14" className="sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5"></path>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 justify-end flex-1">
          <button className={`px-2 py-1 rounded border text-xs font-medium hidden md:block transition-colors ${
            isDarkMode 
              ? 'border-zinc-700 text-zinc-400 hover:bg-zinc-800' 
              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}>
            1x
          </button>
          <span className={`text-xs sm:text-sm font-medium tabular-nums ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}>10:50</span>
          <button className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded transition-colors ${
            isDarkMode 
              ? 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300' 
              : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
          }`}>
            <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default memo(TopicPodcast)
