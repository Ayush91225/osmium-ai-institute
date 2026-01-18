'use client';

import { useState, useEffect } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface NewProjectModalProps {
  onClose: () => void;
}

export default function NewProjectModal({ onClose }: NewProjectModalProps) {
  const { isDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [files, setFiles] = useState<Array<{ id: string; name: string; size: number }>>([
    { id: 'demo', name: 'JEE_MAINS_26an_2022.pdf', size: 4.6 * 1024 * 1024 }
  ]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles([...files, { id: Date.now().toString(), name: file.name, size: file.size }]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1000);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/50" onClick={onClose}>
        <div className={`w-full max-w-[600px] rounded-xl shadow-xl relative overflow-hidden mx-4 ${
          isDarkMode ? 'bg-zinc-900' : 'bg-white'
        }`} onClick={(e) => e.stopPropagation()}>
          <div className={`flex justify-between items-center px-6 py-4 border-b ${
            isDarkMode ? 'border-zinc-800' : 'border-gray-100/50'
          }`}>
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>Set a New Project</h2>
            <button onClick={onClose} className={`transition-colors text-xl ${
              isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-400 hover:text-gray-600'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-center">
                <label className={`md:col-span-3 font-medium text-sm ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>Name Project</label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter the project name"
                    className={`w-full border-transparent focus:ring-0 rounded-lg px-4 py-3 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-800 text-zinc-200 placeholder-zinc-500 focus:border-[#ca8a3a] focus:bg-zinc-800' 
                        : 'bg-gray-50 text-gray-700 placeholder-gray-400 focus:border-[#ca8a3a] focus:bg-white'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-center">
                <label className={`md:col-span-3 font-medium text-sm ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>Select Class</label>
                <div className="md:col-span-9 grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none appearance-none cursor-pointer focus:border-[#ca8a3a] ${
                      isDarkMode 
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-200' 
                        : 'bg-white border-gray-200 text-gray-700'
                    }`}>
                      <option>B.Tech</option>
                      <option>M.Tech</option>
                      <option>BCA</option>
                    </select>
                    <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                    }`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none appearance-none cursor-pointer focus:border-[#ca8a3a] ${
                      isDarkMode 
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-200' 
                        : 'bg-white border-gray-200 text-gray-700'
                    }`}>
                      <option>Semester 4</option>
                      <option>Semester 3</option>
                      <option>Semester 2</option>
                    </select>
                    <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                    }`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-start">
                <label className={`md:col-span-3 font-medium text-sm pt-3 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>Due Date</label>
                <div className="md:col-span-9 space-y-3">
                  <div className="relative group">
                    <input
                      type="date"
                      placeholder="Starting Submission Date"
                      className={`w-full border-transparent focus:ring-0 rounded-lg px-4 py-3 text-sm outline-none transition-all cursor-pointer ${
                        isDarkMode 
                          ? 'bg-zinc-800 text-zinc-200 placeholder-zinc-500 focus:border-[#ca8a3a] focus:bg-zinc-800' 
                          : 'bg-gray-50 text-gray-700 placeholder-gray-400 focus:border-[#ca8a3a] focus:bg-white'
                      }`}
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="date"
                      placeholder="Last Submission Date"
                      className={`w-full border-transparent focus:ring-0 rounded-lg px-4 py-3 text-sm outline-none transition-all cursor-pointer ${
                        isDarkMode 
                          ? 'bg-zinc-800 text-zinc-200 placeholder-zinc-500 focus:border-[#ca8a3a] focus:bg-zinc-800' 
                          : 'bg-gray-50 text-gray-700 placeholder-gray-400 focus:border-[#ca8a3a] focus:bg-white'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-center">
                <label className={`md:col-span-3 font-medium text-sm ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>Give Marks</label>
                <div className="md:col-span-9">
                  <input
                    type="number"
                    placeholder="Enter Full Marks"
                    className={`w-48 border-transparent focus:ring-0 rounded-lg px-4 py-3 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-800 text-zinc-200 placeholder-zinc-500 focus:border-[#ca8a3a] focus:bg-zinc-800' 
                        : 'bg-gray-50 text-gray-700 placeholder-gray-400 focus:border-[#ca8a3a] focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2 items-start">
                <label className={`md:col-span-3 font-medium text-sm pt-3 ${
                  isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                }`}>Select File</label>
                <div className="md:col-span-9">
                  <div
                    className={`border border-dashed rounded-lg p-4 flex justify-center items-center cursor-pointer transition-colors relative ${
                      isDarkMode 
                        ? 'border-zinc-700 hover:bg-zinc-800/50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <div className={`text-center flex items-center gap-2 ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm">Browse your file</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    {files.map((file) => (
                      <div key={file.id} className={`flex items-center justify-between border rounded-lg p-3 ${
                        isDarkMode ? 'border-zinc-700 bg-zinc-800' : 'border-gray-200 bg-white'
                      }`}>
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                            isDarkMode ? 'bg-teal-900/30 text-teal-400' : 'bg-teal-50 text-teal-600'
                          }`}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className={`text-sm font-medium truncate ${
                              isDarkMode ? 'text-zinc-200' : 'text-gray-700'
                            }`}>{file.name}</span>
                            <span className={`text-xs ${
                              isDarkMode ? 'text-zinc-500' : 'text-gray-400'
                            }`}>{formatBytes(file.size)}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className={`transition-colors p-2 ${
                            isDarkMode ? 'text-zinc-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-end items-center px-6 py-4 gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'border-zinc-700 text-zinc-400 hover:bg-zinc-800' 
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2 shadow-sm ${
                isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-black hover:bg-gray-800'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Project
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white px-6 py-3 rounded shadow-lg flex items-center gap-3 z-[1001]">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Project created successfully!</span>
        </div>
      )}
    </>
  );
}
