'use client'

import { memo, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface TopicFlashcardProps {
  courseId: string
  topicId: string
}

const flashcardData = [
  { q: 'Time Complexity', a: 'A measure of the amount of time an algorithm takes to complete as a function of the length of the input.' },
  { q: 'Space Complexity', a: 'The total amount of memory space used by an algorithm, including the space of input values, for execution.' },
  { q: 'Array', a: 'A collection of items stored at contiguous memory locations.' },
  { q: 'Linked List', a: 'A linear data structure where elements are not stored at contiguous memory locations. The elements are linked using pointers.' },
  { q: 'Stack', a: 'A linear data structure that follows the Last-In-First-Out (LIFO) principle for adding and removing elements.' },
  { q: 'Queue', a: 'A linear data structure that follows the First-In-First-Out (FIFO) principle.' },
  { q: 'Binary Tree', a: 'A tree data structure in which each node has at most two children, referred to as the left child and the right child.' },
  { q: 'Recursion', a: 'A method where the solution to a problem depends on solutions to smaller instances of the same problem.' },
  { q: 'Hash Map', a: 'A data structure that implements an associative array abstract data type, a structure that can map keys to values.' }
]

function TopicFlashcard({ courseId, topicId }: TopicFlashcardProps) {
  const { isDarkMode } = useDarkMode()
  const [currentDeck, setCurrentDeck] = useState([...flashcardData])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = currentIndex < currentDeck.length ? currentDeck[currentIndex] : null
  const cardsRemaining = currentDeck.length - currentIndex

  const flipCard = () => {
    if (currentIndex >= currentDeck.length) return
    setIsFlipped(!isFlipped)
  }

  const gotIt = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1)
    }, 300)
  }

  const askAgain = () => {
    setIsFlipped(false)
    setTimeout(() => {
      const updatedDeck = [...currentDeck]
      const currentCard = updatedDeck[currentIndex]
      updatedDeck.push(currentCard)
      updatedDeck.splice(currentIndex, 1)
      setCurrentDeck(updatedDeck)
    }, 300)
  }

  const resetDeck = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentDeck([...flashcardData])
      setCurrentIndex(0)
    }, 300)
  }

  return (
    <div className={`flex-1 h-screen overflow-y-auto ${isDarkMode ? 'bg-zinc-950' : 'bg-[#F9F8F6]'}`}>
      <div className="flex flex-col items-center pt-8 lg:pt-20 pb-10 px-6">
        <div className="max-w-3xl w-full">
          
          <div className="mb-6 flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill={isDarkMode ? '#ffffff' : '#000000'} viewBox="0 0 256 256">
                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,208H48V48H80Zm96-56H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H112a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path>
              </svg>
            </div>
            <span className={`font-libre text-[24px] font-medium tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
              Flashcards
            </span>
          </div>

          <div className="perspective-1000 w-full h-[400px] mb-6">
            <div 
              className={`relative w-full h-full transition-transform duration-600 ${isFlipped ? 'rotate-y-180' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div 
                className={`absolute w-full h-full rounded-xl shadow-sm border flex flex-col items-center justify-between p-10 ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="flex-1 flex items-center justify-center w-full">
                  <h2 className={`font-libre text-4xl font-bold text-center leading-tight ${
                    isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
                  }`}>
                    {currentCard ? currentCard.q : 'All caught up!'}
                  </h2>
                </div>
                <button 
                  onClick={flipCard}
                  className={`px-5 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode 
                      ? 'border-zinc-700 text-zinc-400 hover:bg-zinc-800' 
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Tap for Answer
                </button>
              </div>

              {/* Back */}
              <div 
                className={`absolute w-full h-full rounded-xl shadow-sm border flex flex-col items-center justify-between p-10 rotate-y-180 ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="flex-1 flex items-center justify-center w-full">
                  <p className={`font-serif text-[20px] text-center leading-[1.6] ${
                    isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
                  }`}>
                    {currentCard ? currentCard.a : 'You have reviewed all cards in this session.'}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between gap-3">
                  <button 
                    onClick={askAgain}
                    className={`px-6 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                      isDarkMode 
                        ? 'border-zinc-700 text-white hover:bg-zinc-800' 
                        : 'border-gray-200 text-[#1a1a1a] hover:bg-gray-50'
                    }`}
                  >
                    Ask again later
                  </button>
                  <button 
                    onClick={gotIt}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isDarkMode 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
              {cardsRemaining} cards remain
            </span>
            <button 
              onClick={resetDeck}
              className={`px-4 py-2 border rounded-lg text-xs font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800' 
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Reset Deck
            </button>
          </div>

        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .duration-600 {
          transition-duration: 0.6s;
        }
      `}</style>
    </div>
  )
}

export default memo(TopicFlashcard)
