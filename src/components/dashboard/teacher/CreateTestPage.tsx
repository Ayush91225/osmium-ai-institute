'use client';

import { useState, useEffect } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import Link from 'next/link';

interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'short-answer' | 'paragraph';
  options?: string[];
  correctAnswer?: string;
  points: number;
  required: boolean;
}

export default function CreateTestPage() {
  const { isDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testTitle, setTestTitle] = useState('Untitled Test');
  const [subject, setSubject] = useState('Physics');
  const [subjectMenuOpen, setSubjectMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      text: '',
      type: 'multiple-choice',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 1',
      points: 1,
      required: false
    };
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  if (!mounted) return null;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/dashboard/teacher/exams" className={`p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/>
            </svg>
          </Link>
          <div className="flex-1">
            <input
              type="text"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              className={`text-3xl font-bold border-none outline-none bg-transparent w-full ${
                isDarkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}
              placeholder="Test Title"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Subject:</span>
              <div className="relative">
                <button
                  onClick={() => setSubjectMenuOpen(!subjectMenuOpen)}
                  className={`px-3 py-1.5 text-sm font-medium border rounded-lg flex items-center gap-2 ${
                    isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {subject}
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                </button>
                {subjectMenuOpen && (
                  <div className={`absolute left-0 z-20 mt-2 w-40 border rounded-lg shadow-lg overflow-hidden ${
                    isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'
                  }`}>
                    {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map(sub => (
                      <button
                        key={sub}
                        onClick={() => { setSubject(sub); setSubjectMenuOpen(false); }}
                        className={`block w-full px-4 py-2 text-sm text-left ${
                          isDarkMode ? 'text-zinc-200 hover:bg-zinc-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              {questions.length} Questions • {totalPoints} Points
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              Save Draft
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-[#8C7B65] rounded-lg hover:bg-[#7A6B58] transition-colors">
              Publish Test
            </button>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id} className={`rounded-xl border p-6 ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold ${
                isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Type your question here..."
                  className={`w-full text-base font-medium border-none outline-none bg-transparent resize-none ${
                    isDarkMode ? 'text-zinc-200 placeholder-zinc-500' : 'text-gray-900 placeholder-gray-400'
                  }`}
                  rows={2}
                  defaultValue={question.text}
                />
              </div>
              <button
                onClick={() => deleteQuestion(question.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
                }`}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            </div>

            {question.type === 'multiple-choice' && (
              <div className="space-y-2 mb-4">
                {question.options?.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`q${question.id}`}
                      className="w-4 h-4 text-[#8C7B65]"
                    />
                    <input
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      defaultValue={option}
                      className={`flex-1 px-3 py-2 text-sm border rounded-lg outline-none ${
                        isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200 placeholder-zinc-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t ${
              isDarkMode ? 'border-zinc-800' : 'border-gray-200'
            }">
              <div className="flex items-center gap-4">
                <select className={`px-3 py-1.5 text-sm border rounded-lg ${
                  isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-200 text-gray-700'
                }`}>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="short-answer">Short Answer</option>
                  <option value="paragraph">Paragraph</option>
                </select>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Points:</span>
                  <input
                    type="number"
                    defaultValue={question.points}
                    min="1"
                    max="100"
                    className={`w-16 px-2 py-1 text-sm text-center border rounded-lg ${
                      isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-200 text-gray-700'
                    }`}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-[#8C7B65] rounded" />
                <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Required</span>
              </label>
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <button
          onClick={addQuestion}
          className={`w-full border-2 border-dashed rounded-xl py-6 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
            isDarkMode ? 'border-zinc-700 text-zinc-400 hover:border-[#8C7B65] hover:text-zinc-300 hover:bg-zinc-900/50' : 'border-gray-300 text-gray-600 hover:border-[#8C7B65] hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Add Question
        </button>
      </div>
    </div>
  );
}
