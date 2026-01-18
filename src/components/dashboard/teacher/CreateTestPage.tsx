'use client';

import { useState } from 'react';

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subject, setSubject] = useState('Physics');
  const [subjectMenuOpen, setSubjectMenuOpen] = useState(false);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: 'Untitled Question',
      type: 'multiple-choice',
      options: ['Option 1', 'Option 2'],
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

  return (
    <div className="min-h-screen bg-[#F6F2EB] flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className="bg-[#FEFCF8]/80 backdrop-blur-md border-b border-[#E8DCC6]/50 shadow-sm fixed top-0 right-0 left-0 lg:left-[280px] z-20">
        <div className="max-w-full mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <span className="text-lg font-semibold text-[#2D2A24] hidden md:block">Osmium</span>
              <div className="min-w-0 flex-1 hidden md:block">
                <h1 className="text-base lg:text-lg font-semibold text-[#2D2A24] truncate">JEE MAINS Paper 2023</h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#6B5D4F] hidden xl:block">Subject:</span>
                <div className="relative">
                  <button
                    onClick={() => setSubjectMenuOpen(!subjectMenuOpen)}
                    className="inline-flex items-center justify-between px-3 py-1.5 text-sm font-medium text-[#4A3F35] bg-white border border-[#D4C4A8] rounded-md hover:bg-[#F9F6F0] min-w-[90px]"
                  >
                    <span>{subject}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#8B7355" viewBox="0 0 256 256" className="ml-2">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </button>
                  {subjectMenuOpen && (
                    <div className="absolute right-0 z-20 mt-2 w-36 bg-white border border-[#E8DCC6] rounded-lg shadow-lg overflow-hidden">
                      <div className="py-1">
                        {['Physics', 'Chemistry', 'Mathematics'].map(sub => (
                          <button
                            key={sub}
                            onClick={() => { setSubject(sub); setSubjectMenuOpen(false); }}
                            className="block w-full px-4 py-2 text-sm text-[#4A3F35] hover:bg-[#F9F6F0] text-left"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="hidden md:inline-flex items-center px-3 py-2 text-sm font-medium text-[#5A4F40] bg-white border border-[#D4C4A8] rounded-md hover:bg-[#F9F6F0] transition-colors">
                  Reset
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-[#C58F39] border border-transparent rounded-md hover:bg-[#B8832F] transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto" style={{ marginTop: '4rem' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-[#6B5D4F]">Questions: <span>{questions.length}</span></span>
              <span className="text-sm font-medium text-[#6B5D4F]">Total Points: <span>{totalPoints}</span></span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-2xl border border-[#E0D2BD] shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-sm font-semibold text-[#8E806D] flex-shrink-0">Q.{index + 1}</span>
                    <textarea
                      placeholder="Untitled Question"
                      className="flex-1 text-base font-medium border-none outline-none bg-transparent focus:bg-[#F9F6F0] p-2 rounded text-[#4B3F31] resize-none overflow-hidden min-w-0"
                      rows={1}
                      defaultValue={question.text}
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <select className="text-sm border border-[#D9C8B1] rounded px-3 py-1.5 bg-white text-[#5D4C37]">
                      <option value="multiple-choice">MCQ</option>
                      <option value="short-answer">Short</option>
                      <option value="paragraph">Long</option>
                    </select>
                    <button onClick={() => deleteQuestion(question.id)} className="p-2 text-[#B2A28E] hover:text-[#A38F77] hover:bg-[#F2E5D3] rounded">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {question.type === 'multiple-choice' && (
                <div className="ml-7 space-y-3">
                  {question.options?.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-3 group">
                      <input type="radio" name={`q${question.id}`} className="w-4 h-4 text-[#C58F39] flex-shrink-0" />
                      <input
                        type="text"
                        placeholder={`Option ${optIndex + 1}`}
                        defaultValue={option}
                        className="flex-1 text-sm border-none outline-none bg-transparent focus:bg-[#F9F6F0] p-2 rounded text-[#4B4134] min-w-0"
                      />
                      <button className="p-1 text-[#C0AE99] hover:text-[#A38F77] hover:bg-[#F2E5D3] rounded opacity-0 group-hover:opacity-100">
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button className="flex items-center gap-2 text-[#A18C6B] hover:text-[#8D7F6B] p-2 text-sm">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    Add option
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#E8DCC6]">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm text-[#6B5D4F]">
                    <input type="checkbox" className="w-4 h-4 text-[#C58F39]" />
                    Required
                  </label>
                  <div className="flex items-center gap-2 text-sm text-[#6B5D4F]">
                    <span>Points:</span>
                    <input
                      type="number"
                      defaultValue={question.points}
                      min="0"
                      max="100"
                      className="w-16 border border-[#D9C8B1] rounded px-2 py-1 text-center text-sm bg-white"
                    />
                  </div>
                </div>
                <button className="p-2 text-[#B2A28E] hover:text-[#A38F77] hover:bg-[#F2E5D3] rounded">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="w-full border-2 border-dashed border-[#D9C8B1] rounded-2xl py-8 text-base text-[#A18C6B] hover:text-[#8D7F6B] hover:border-[#C58F39] hover:bg-[#F9F2E7] transition-colors flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Add question
          </button>
        </div>
      </div>
    </div>
  );
}
