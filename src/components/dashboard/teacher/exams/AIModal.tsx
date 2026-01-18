'use client';

import { useState } from 'react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadedFile {
  name: string;
  size: number;
  progress: number;
}

export default function AIModal({ isOpen, onClose }: AIModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).slice(0, 10 - uploadedFiles.length).map(file => ({
      name: file.name,
      size: file.size,
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach((_, index) => {
      const fileIndex = uploadedFiles.length + index;
      animateProgress(fileIndex);
    });
  };

  const animateProgress = (index: number) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index].progress += Math.random() * 15 + 5;
          if (updated[index].progress >= 100) {
            updated[index].progress = 100;
            clearInterval(interval);
          }
        }
        return updated;
      });
    }, 200);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = () => {
    if (uploadedFiles.length >= 5) {
      alert('AI Mock Test Generated Successfully!');
      setUploadedFiles([]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6 sm:p-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">AI Mock Test</h1>
              <p className="text-sm text-[#787878] max-w-lg leading-relaxed">
                Upload at least 5 previous year question papers to generate an AI-powered exam test that matches your exam's pattern and difficulty level.
              </p>
            </div>
            <div className="text-4xl opacity-25">✨</div>
          </div>

          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors mb-8 ${
              isDragging ? 'border-[#C2BEB8] bg-[#F8F6F3]' : 'border-[#D5D2CD] bg-[#FBFAF7]'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileSelect(e.dataTransfer.files);
            }}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <div className="w-11 h-11 rounded-lg mx-auto flex items-center justify-center text-xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#c7c7c7" viewBox="0 0 256 256">
                <path d="M223.16,68.42l-16-32A8,8,0,0,0,200,32H56a8,8,0,0,0-7.16,4.42l-16,32A8.08,8.08,0,0,0,32,72V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V72A8.08,8.08,0,0,0,223.16,68.42Zm-57.5,73.24a8,8,0,0,1-11.32,0L136,123.31V184a8,8,0,0,1-16,0V123.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,165.66,141.66ZM52.94,64l8-16H195.06l8,16Z" />
              </svg>
            </div>
            <div className="text-sm text-[#555] mb-1">
              Drag & Drop or <span className="text-[#BE8741] cursor-pointer font-medium">Choose file</span> to upload
            </div>
            <div className="text-xs text-[#9A9A9A]">Supported format: PDF, DOC, or image files</div>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-base font-semibold text-[#1A1A1A] mb-4">Uploaded Question Papers</h3>
              <div className="max-h-64 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D3D1CD transparent' }}>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="bg-white rounded-lg border border-[#ECEAE6] p-3 flex items-center gap-3 mb-3 shadow-sm">
                    <div className="bg-[#F3F8FF] w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5d9f9f" viewBox="0 0 256 256">
                        <path d="M44,120H212a4,4,0,0,0,4-4V88a8,8,0,0,0-2.34-5.66l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v76A4,4,0,0,0,44,120ZM152,44l44,44H152Zm72,108.53a8.18,8.18,0,0,1-8.25,7.47H192v16h15.73a8.17,8.17,0,0,1,8.25,7.47,8,8,0,0,1-8,8.53H192v15.73a8.17,8.17,0,0,1-7.47,8.25,8,8,0,0,1-8.53-8V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152.53ZM64,144H48a8,8,0,0,0-8,8v55.73A8.17,8.17,0,0,0,47.47,216,8,8,0,0,0,56,208v-8h7.4c15.24,0,28.14-11.92,28.59-27.15A28,28,0,0,0,64,144Zm-.35,40H56V160h8a12,12,0,0,1,12,13.16A12.25,12.25,0,0,1,63.65,184ZM128,144H112a8,8,0,0,0-8,8v56a8,8,0,0,0,8,8h15.32c19.66,0,36.21-15.48,36.67-35.13A36,36,0,0,0,128,144Zm-.49,56H120V160h8a20,20,0,0,1,20,20.77C147.58,191.59,138.34,200,127.51,200Z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#1E1E1E] mb-1 truncate">{file.name}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#8B8B8B] flex-shrink-0">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                        <div className="flex-1 h-1.5 bg-[#EAE8E4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#A6AE86] rounded-full transition-all duration-300" style={{ width: `${file.progress}%` }}></div>
                        </div>
                        <span className="text-xs text-[#7D7D7D] flex-shrink-0 w-8 text-right">{Math.floor(file.progress)}%</span>
                      </div>
                    </div>
                    <button onClick={() => removeFile(index)} className="text-[#A8A8A8] hover:text-[#C45353] text-lg transition-colors flex-shrink-0 p-1">
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              onClick={onClose}
              className="bg-white border border-[#E3E1DD] px-8 py-3 rounded-xl text-sm text-[#666] hover:bg-[#F5F3EF] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              disabled={uploadedFiles.length < 5}
              className="bg-[#C58A36] text-white px-8 py-3 rounded-xl text-base font-semibold hover:bg-[#B97E2D] transition-colors shadow-lg flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox="0 0 256 256">
                <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z" />
              </svg>
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
