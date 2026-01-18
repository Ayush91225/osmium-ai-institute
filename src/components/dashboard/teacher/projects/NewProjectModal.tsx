'use client';

import { useState } from 'react';

interface NewProjectModalProps {
  onClose: () => void;
}

export default function NewProjectModal({ onClose }: NewProjectModalProps) {
  const [files, setFiles] = useState<Array<{ id: string; name: string; size: number }>>([
    { id: 'demo', name: 'JEE_MAINS_26an_2022.pdf', size: 4.6 * 1024 * 1024 }
  ]);
  const [showToast, setShowToast] = useState(false);

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
        <div className="bg-white w-full max-w-[600px] rounded-xl shadow-xl relative overflow-hidden mx-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100/50">
            <h2 className="text-xl font-semibold text-gray-900">Set a New Project</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-center">
                <label className="md:col-span-3 text-gray-500 font-medium text-sm">Name Project</label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter the project name"
                    className="w-full bg-gray-50 border-transparent focus:border-[#ca8a3a] focus:bg-white focus:ring-0 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none transition-all placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-center">
                <label className="md:col-span-3 text-gray-500 font-medium text-sm">Select Class</label>
                <div className="md:col-span-9 grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none appearance-none cursor-pointer focus:border-[#ca8a3a]">
                      <option>B.Tech</option>
                      <option>M.Tech</option>
                      <option>BCA</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none appearance-none cursor-pointer focus:border-[#ca8a3a]">
                      <option>Semester 4</option>
                      <option>Semester 3</option>
                      <option>Semester 2</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-start">
                <label className="md:col-span-3 text-gray-500 font-medium text-sm pt-3">Due Date</label>
                <div className="md:col-span-9 space-y-3">
                  <div className="relative group">
                    <input
                      type="date"
                      placeholder="Starting Submission Date"
                      className="w-full bg-gray-50 border-transparent focus:border-[#ca8a3a] focus:bg-white focus:ring-0 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none transition-all placeholder-gray-400 cursor-pointer"
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="date"
                      placeholder="Last Submission Date"
                      className="w-full bg-gray-50 border-transparent focus:border-[#ca8a3a] focus:bg-white focus:ring-0 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none transition-all placeholder-gray-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-center">
                <label className="md:col-span-3 text-gray-500 font-medium text-sm">Give Marks</label>
                <div className="md:col-span-9">
                  <input
                    type="number"
                    placeholder="Enter Full Marks"
                    className="w-48 bg-gray-50 border-transparent focus:border-[#ca8a3a] focus:bg-white focus:ring-0 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none transition-all placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2 items-start">
                <label className="md:col-span-3 text-gray-500 font-medium text-sm pt-3">Select File</label>
                <div className="md:col-span-9">
                  <div
                    className="border border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors relative"
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <div className="text-center flex items-center gap-2 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm">Browse your file</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-white">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 rounded bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                            <span className="text-xs text-gray-400">{formatBytes(file.size)}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
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
              className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-lg bg-black hover:bg-gray-800 text-white text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
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
