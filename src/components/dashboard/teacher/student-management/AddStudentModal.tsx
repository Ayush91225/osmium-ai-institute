'use client';

import { useState, useRef } from 'react';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStudentModal({ isOpen, onClose }: AddStudentModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseSelected, setCourseSelected] = useState('');
  const [dobDisplay, setDobDisplay] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setShowSuccess(false);
    onClose();
  };

  const handleCalendarClick = () => {
    dateInputRef.current?.showPicker();
  };

  if (!isOpen && !showSuccess) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm" style={{ zIndex: 10000 }}>
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Student Added!</h2>
          <p className="text-gray-500 text-sm mb-6">The student profile has been successfully created in the system.</p>
          <button onClick={handleReset} className="w-full bg-gray-900 text-white font-medium py-2.5 rounded-lg hover:bg-black transition-all">
            Add Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm p-3 sm:p-5" style={{ zIndex: 9999 }}>
      <div className="bg-white w-full max-w-2xl rounded-2xl p-4 sm:p-8 relative max-h-[95vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="text-xl font-semibold mb-8 text-gray-900">Add Student</div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="text-sm text-gray-600 w-full sm:w-20 flex-shrink-0">Name</label>
            <input type="text" placeholder="Enter Student Name" className="flex-1 h-10 sm:h-12 rounded-lg border border-gray-200 bg-gray-50 text-sm px-3 sm:px-4 outline-none focus:border-gray-300 focus:bg-white" required />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="text-sm text-gray-600 w-full sm:w-20 flex-shrink-0">Class</label>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-sm text-gray-500">Select Course:</span>
              <div className="relative">
                <select onChange={(e) => setCourseSelected(e.target.value)} className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 text-sm text-gray-700 outline-none focus:border-gray-300 focus:bg-white w-full sm:w-auto">
                  <option value="">Select Course</option>
                  <option value="btech">B.Tech</option>
                  <option value="mtech">M.Tech</option>
                  <option value="bca">BCA</option>
                  <option value="bsc">BSc</option>
                </select>
                <svg className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {courseSelected === 'btech' && (
                <div className="relative">
                  <select className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 text-sm text-gray-700 outline-none focus:border-gray-300 focus:bg-white w-full sm:w-auto">
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                  <svg className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="text-sm text-gray-600 w-full sm:w-20 flex-shrink-0">UID</label>
            <input type="text" placeholder="Enter University UID" className="flex-1 h-10 sm:h-12 rounded-lg border border-gray-200 bg-gray-50 text-sm px-3 sm:px-4 outline-none focus:border-gray-300 focus:bg-white" required />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="text-sm text-gray-600 w-full sm:w-20 flex-shrink-0">DOB</label>
            <div className="flex-1 relative">
              <input type="text" value={dobDisplay} placeholder="Enter Date of Birth" className="w-full h-10 sm:h-12 rounded-lg border border-gray-200 bg-gray-50 text-sm px-3 sm:px-4 outline-none focus:border-gray-300 focus:bg-white" readOnly />
              <input 
                ref={dateInputRef}
                type="date" 
                onChange={(e) => setDobDisplay(new Date(e.target.value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
              <button 
                type="button"
                onClick={handleCalendarClick}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="15" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="text-sm text-gray-600 w-full sm:w-20 flex-shrink-0">Email</label>
            <input type="email" placeholder="Enter Email ID" className="flex-1 h-10 sm:h-12 rounded-lg border border-gray-200 bg-gray-50 text-sm px-3 sm:px-4 outline-none focus:border-gray-300 focus:bg-white" required />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="text-sm text-gray-600 w-full sm:w-20 flex-shrink-0">Phone</label>
            <div className="flex-1 flex gap-2 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 bg-gray-50 border border-gray-200 rounded-lg h-10 sm:h-12">
                <span className="text-sm sm:text-lg">🇮🇳</span>
                <span className="text-xs sm:text-sm text-gray-600">+91</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <input type="tel" placeholder="Add Phone number" className="flex-1 h-10 sm:h-12 rounded-lg border border-gray-200 bg-gray-50 text-sm px-3 sm:px-4 outline-none focus:border-gray-300 focus:bg-white" required />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
            <label className="text-sm text-gray-600 w-full sm:w-20 flex-shrink-0 sm:pt-3">Parents</label>
            <div className="flex-1 space-y-3">
              <input type="text" placeholder="Enter Father Name" className="w-full h-10 sm:h-12 rounded-lg border border-gray-200 bg-gray-50 text-sm px-3 sm:px-4 outline-none focus:border-gray-300 focus:bg-white" />
              <input type="text" placeholder="Enter Mother Name" className="w-full h-10 sm:h-12 rounded-lg border border-gray-200 bg-gray-50 text-sm px-3 sm:px-4 outline-none focus:border-gray-300 focus:bg-white" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6">
            <button type="button" onClick={onClose} className="px-3 py-2 sm:py-1.5 min-w-20 rounded-lg text-sm text-gray-600 hover:bg-gray-50 order-2 sm:order-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-3 py-2 sm:py-1.5 min-w-32 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black flex items-center justify-center gap-2 order-1 sm:order-2">
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Student
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
