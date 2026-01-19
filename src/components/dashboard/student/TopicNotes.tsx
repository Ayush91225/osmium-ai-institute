'use client'

import { memo } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface TopicNotesProps {
  courseId: string
  topicId: string
}

function TopicNotes({ courseId, topicId }: TopicNotesProps) {
  const { isDarkMode } = useDarkMode()

  return (
    <div className={`flex-1 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 w-full h-screen overflow-hidden ${
      isDarkMode ? 'text-zinc-300' : 'text-[#2D2D2D]'
    }`}>
      <div className="mb-6 sm:mb-8 lg:mb-10 flex items-center gap-3 sm:gap-4">
        <div className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center ${
          isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 256 256">
            <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,208H48V48H80Zm96-56H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path>
          </svg>
        </div>
        <span className={`font-serif text-lg sm:text-xl md:text-2xl lg:text-[26px] font-medium leading-tight ${
          isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
        }`}>Notes</span>
      </div>

      <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 font-serif text-sm sm:text-base md:text-[17px] lg:text-[18px] leading-[1.6] sm:leading-[1.7] md:leading-[1.8] tracking-wide">
        <div>
          <h1 className={`font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-5 md:mb-6 leading-tight font-medium ${
            isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
          }`}>
            Foundations of Java Data Structures
          </h1>
        </div>

        <div className={`rounded-xl p-4 sm:p-5 md:p-6 border ${
          isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-[#F9F9F7] border-gray-200'
        }`}>
          <pre className={`font-mono text-xs sm:text-sm overflow-x-auto ${
            isDarkMode ? 'text-zinc-300' : 'text-gray-800'
          }`}>
            <code>{`int[] arr = new int[5];
arr[0] = 10;
arr[1] = 20;
// Constant-time access
int x = arr[1];
System.out.println(x); // prints 20`}</code>
          </pre>
        </div>

        <div>
          <p className="break-words mb-4">
            A single failing test blinks red: <code className={`font-mono text-sm px-1.5 py-0.5 rounded ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-800'
            }`}>arr[5]</code> throws an IndexOutOfBoundsException in a routine that looks up scores by position.
          </p>
        </div>

        <div>
          <p className="break-words mb-4">
            I open the array declaration and see <code className={`font-mono text-sm px-1.5 py-0.5 rounded ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-800'
            }`}>int[] arr = new int[5]</code> and the bug is obvious; arrays reserve contiguous memory for exactly the number of slots you ask for, and that <code className={`font-mono text-sm px-1.5 py-0.5 rounded ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-800'
            }`}>5</code> means valid indices are <code className={`font-mono text-sm px-1.5 py-0.5 rounded ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-800'
            }`}>0</code> through <code className={`font-mono text-sm px-1.5 py-0.5 rounded ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-800'
            }`}>4</code>.
          </p>
        </div>

        <div>
          <p className="break-words mb-4">
            Because each element sits next to the next in memory, the runtime can compute the address of <code className={`font-mono text-sm px-1.5 py-0.5 rounded ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-800'
            }`}>arr[i]</code> with one multiplication and one addition, which is why reading <code className={`font-mono text-sm px-1.5 py-0.5 rounded ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-800'
            }`}>arr[2]</code> is a single constant-time step.
          </p>
        </div>

        <div>
          <p className="break-words mb-4">
            That contiguous layout also means you pay up-front: creating <code className={`font-mono text-sm px-1.5 py-0.5 rounded ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-800'
            }`}>new int[n]</code> allocates a block large enough to hold <code className={`font-mono text-sm px-1.5 py-0.5 rounded ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-200 text-gray-800'
            }`}>n</code> elements and you cannot grow it without allocating a new block and copying.
          </p>
        </div>

        <div>
          <p className="break-words">
            This is the place where predictable, O(1) index access meets the tradeoff of fixed capacity and occasional expensive resizing.
          </p>
        </div>
      </div>

      <div className="h-16 sm:h-24 md:h-32"></div>
    </div>
  )
}

export default memo(TopicNotes)
