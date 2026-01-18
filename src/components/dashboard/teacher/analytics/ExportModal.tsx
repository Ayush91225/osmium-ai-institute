'use client';

import { useState } from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [exportType, setExportType] = useState<'pdf' | 'excel'>('pdf');
  const [includeStudents, setIncludeStudents] = useState(true);
  const [includePerformance, setIncludePerformance] = useState(true);
  const [includeTests, setIncludeTests] = useState(true);

  if (!isOpen) return null;

  const handleExport = () => {
    console.log('Exporting...', { exportType, includeStudents, includePerformance, includeTests });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[1000] flex items-start justify-end p-20 pt-20">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-[#1a1a1a] mb-1">Export Report</h3>
          <p className="text-sm text-[#666]">Download class analytics</p>
        </div>

        <div className="h-px bg-[#f0f0f0] my-4"></div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setExportType('pdf')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              exportType === 'pdf'
                ? 'bg-[#f0ede8] border-[#c79647] text-[#c79647] border font-semibold'
                : 'bg-[#f8f9fa] border-[#e0e0e0] text-[#666] border'
            }`}
          >
            📄 PDF
          </button>
          <button
            onClick={() => setExportType('excel')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              exportType === 'excel'
                ? 'bg-[#f0ede8] border-[#c79647] text-[#c79647] border font-semibold'
                : 'bg-[#f8f9fa] border-[#e0e0e0] text-[#666] border'
            }`}
          >
            📊 Excel
          </button>
        </div>

        <div className="space-y-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium text-[#1a1a1a]">📚 Students Data</span>
            </div>
            <input
              type="checkbox"
              checked={includeStudents}
              onChange={(e) => setIncludeStudents(e.target.checked)}
              className="w-[18px] h-[18px] cursor-pointer accent-[#c79647]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium text-[#1a1a1a]">📈 Performance</span>
            </div>
            <input
              type="checkbox"
              checked={includePerformance}
              onChange={(e) => setIncludePerformance(e.target.checked)}
              className="w-[18px] h-[18px] cursor-pointer accent-[#c79647]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium text-[#1a1a1a]">📝 Test Results</span>
            </div>
            <input
              type="checkbox"
              checked={includeTests}
              onChange={(e) => setIncludeTests(e.target.checked)}
              className="w-[18px] h-[18px] cursor-pointer accent-[#c79647]"
            />
          </div>
        </div>

        <button
          onClick={handleExport}
          className="w-full bg-[#c79647] text-white py-2.5 text-sm font-medium rounded-xl mt-4 hover:bg-[#b58840] transition-all"
        >
          Download Report
        </button>

        <button
          onClick={onClose}
          className="w-full bg-[#f8f9fa] border border-[#e5e5e5] text-[#666] py-3 text-sm font-medium rounded-xl mt-3 hover:bg-[#e9ecef] transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
