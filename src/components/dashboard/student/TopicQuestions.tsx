'use client'

import { memo, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface TopicQuestionsProps {
  courseId: string
  topicId: string
}

function TopicQuestions({ courseId, topicId }: TopicQuestionsProps) {
  const { isDarkMode } = useDarkMode()
  const [openQuestion, setOpenQuestion] = useState<number>(2)

  const questions = [
    { id: 1, q: 'What Are Arrays and How Are They Used in Java?', a: 'Arrays are a fundamental structure used to store multiple values in a single variable. In Java, they are objects that store a fixed-size sequential collection of elements of the same type.' },
    { id: 2, q: 'What Is a Linked List and How Does It Differ from an Array?', a: 'A linked list is a linear data structure composed of nodes, where each node contains data and a reference (or pointer) to the next node in the sequence. Unlike arrays, linked lists allow dynamic memory allocation and flexible resizing.', detailed: true },
    { id: 3, q: 'What Are Nodes in a Linked List?', a: 'A node is the basic unit of a linked list. It contains the data and a reference to the next node.' },
    { id: 4, q: 'What Is a Stack and How Does It Operate in Java?', a: 'A stack is a linear data structure that follows the LIFO (Last In First Out) principle.' },
    { id: 5, q: 'What Is a Queue and What Are Its Applications in Java?', a: 'A queue follows the FIFO (First In First Out) principle. Used in scheduling and buffering.' },
    { id: 6, q: 'What Is a Tree in Data Structures?', a: 'A tree is a hierarchical data structure consisting of nodes connected by edges.' },
    { id: 7, q: 'What Is a Binary Search Tree and How Does It Enable Efficient Operations?', a: 'A BST is a tree where the left child is smaller and right child is larger than the parent, enabling efficient search.' },
    { id: 8, q: 'What Are Tree Traversals and Their Uses?', a: 'Methods like In-order, Pre-order, and Post-order used to visit all nodes in a tree.' },
    { id: 9, q: 'What Is a Hash Table and Why Is It Useful?', a: 'A data structure that maps keys to values using a hash function for fast access.' },
    { id: 10, q: 'What Are Collisions and How Are They Resolved in Hash Tables?', a: 'When two keys hash to the same index. Resolved using chaining or open addressing.' },
    { id: 11, q: 'What Are Common Sorting Algorithms and Their Characteristics?', a: 'Bubble Sort, Merge Sort, Quick Sort, etc., differing in time complexity and stability.' }
  ]

  return (
    <div className={`flex-1 overflow-y-auto w-full ${isDarkMode ? 'text-zinc-300' : 'text-[#2D2D2D]'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-14 w-full">
        <div className="mb-8 flex items-center gap-3">
          <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${
            isDarkMode ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white'
          }`}>
            ?
          </div>
          <span className={`font-serif text-[22px] md:text-[24px] font-medium tracking-tight ${
            isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
          }`}>Question Bank</span>
        </div>

        <div className="flex flex-col gap-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`border rounded-lg overflow-hidden transition-all duration-200 shadow-sm ${
                openQuestion === q.id
                  ? isDarkMode ? 'border-zinc-700' : 'border-gray-300'
                  : isDarkMode ? 'border-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 hover:border-gray-300'
              } ${isDarkMode ? 'bg-zinc-900/50' : 'bg-white'}`}
            >
              <button
                onClick={() => setOpenQuestion(openQuestion === q.id ? 0 : q.id)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              >
                <h3 className={`font-serif text-[17px] font-semibold pr-4 ${
                  isDarkMode ? 'text-white' : 'text-[#1a1a1a]'
                }`}>
                  {q.q}
                </h3>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === q.id ? 'rotate-180' : ''
                  } ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div
                className={`transition-all duration-300 ${
                  openQuestion === q.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className={`p-5 pt-0 font-sans text-[15px] leading-relaxed ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  {q.detailed ? (
                    <>
                      <p className="mb-5">
                        A <strong className={isDarkMode ? 'text-zinc-200 font-semibold' : 'text-gray-900 font-semibold'}>linked list</strong> is a linear data structure composed of nodes, where each node contains data and a reference (or pointer) to the next node in the sequence. Unlike arrays, linked lists allow dynamic memory allocation and flexible resizing.
                      </p>
                      <h4 className={`font-serif text-[15px] font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
                        Differences Between Arrays and Linked Lists:
                      </h4>
                      <ul className={`list-disc pl-5 space-y-2 mb-5 ${isDarkMode ? 'text-zinc-400 marker:text-zinc-600' : 'text-gray-600 marker:text-gray-400'}`}>
                        <li><strong className={isDarkMode ? 'text-zinc-300' : 'text-gray-800'}>Memory allocation:</strong> Arrays use contiguous memory; linked lists use scattered nodes with pointers.</li>
                        <li><strong className={isDarkMode ? 'text-zinc-300' : 'text-gray-800'}>Size:</strong> Arrays have fixed size; linked lists can grow or shrink dynamically.</li>
                        <li><strong className={isDarkMode ? 'text-zinc-300' : 'text-gray-800'}>Access:</strong> Arrays provide constant-time access by index; linked lists require traversal from the head to reach a node.</li>
                        <li><strong className={isDarkMode ? 'text-zinc-300' : 'text-gray-800'}>Insertion/Deletion:</strong> Linked lists allow efficient insertion and deletion at any position without shifting elements; arrays require shifting elements.</li>
                      </ul>
                      <p>
                        <strong className={`font-serif ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Example Usage:</strong> Maintaining a dynamic to-do list where new tasks can be inserted or removed efficiently at any position.
                      </p>
                    </>
                  ) : (
                    <p>{q.a}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-32"></div>
      </div>
    </div>
  )
}

export default memo(TopicQuestions)
