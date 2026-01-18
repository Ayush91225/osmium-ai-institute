'use client';

import { useState, useEffect } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface DateRangePickerProps {
  onClose: () => void;
}

export default function DateRangePicker({ onClose }: DateRangePickerProps) {
  const { isDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // November 2025

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    for (let i = prevMonthDays; i > 0; i--) {
      days.push({ date: new Date(year, month - 1, prevMonthLastDay - i + 1), isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const isSameDay = (date1: Date, date2: Date | null) => {
    if (!date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const handlePrev = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleApply = () => {
    if (startDate) {
      alert(`Selected range: ${startDate.toISOString().slice(0, 10)} → ${endDate ? endDate.toISOString().slice(0, 10) : startDate.toISOString().slice(0, 10)}`);
      onClose();
    } else {
      alert('Please select a start date.');
    }
  };

  const leftMonth = currentMonth;
  const rightMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div className={`w-[920px] max-w-[95vw] rounded-2xl p-6 shadow-2xl ${
        isDarkMode ? 'bg-zinc-900' : 'bg-white'
      }`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div className={`text-xl font-semibold ${
            isDarkMode ? 'text-zinc-100' : 'text-[#1a1a1a]'
          }`}>Select date range</div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center text-lg transition-all ${
                isDarkMode 
                  ? 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 hover:border-zinc-600 text-zinc-400' 
                  : 'border-[#f0f0f0] bg-white hover:bg-[#f5f5f5] hover:border-[#e0e0e0] text-[#666]'
              }`}
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center text-lg transition-all ${
                isDarkMode 
                  ? 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 hover:border-zinc-600 text-zinc-400' 
                  : 'border-[#f0f0f0] bg-white hover:bg-[#f5f5f5] hover:border-[#e0e0e0] text-[#666]'
              }`}
            >
              ›
            </button>
          </div>
        </div>

        <div className="flex gap-8 mb-6">
          {[leftMonth, rightMonth].map((month, idx) => (
            <div key={idx} className="flex-1">
              <div className={`text-center font-semibold mb-4 text-lg ${
                isDarkMode ? 'text-zinc-100' : 'text-[#1a1a1a]'
              }`}>
                {monthNames[month.getMonth()]} / {month.getFullYear()}
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                      <th key={day} className={`font-semibold text-[13px] pb-3 text-center ${
                        isDarkMode ? 'text-zinc-400' : 'text-[#666]'
                      }`}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }).map((_, weekIdx) => (
                    <tr key={weekIdx}>
                      {getDaysInMonth(month).slice(weekIdx * 7, weekIdx * 7 + 7).map((day, dayIdx) => {
                        const isStart = isSameDay(day.date, startDate);
                        const isEnd = isSameDay(day.date, endDate);
                        const inRange = isInRange(day.date);
                        
                        return (
                          <td
                            key={dayIdx}
                            className={`text-center p-1.5 h-10 relative ${
                              inRange ? (isDarkMode ? 'bg-zinc-800' : 'bg-[#f0ede8]') : ''
                            } ${!day.isCurrentMonth ? (isDarkMode ? 'text-zinc-700' : 'text-[#ccc]') : ''}`}
                            onClick={() => handleDateClick(day.date)}
                          >
                            <span
                              className={`inline-block w-7 h-7 leading-7 text-center rounded-full text-sm cursor-pointer transition-all ${
                                isStart || isEnd 
                                  ? 'bg-[#c79647] text-white' 
                                  : (isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-100')
                              }`}
                            >
                              {day.date.getDate()}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-lg border font-medium text-sm transition-all ${
              isDarkMode 
                ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700' 
                : 'bg-[#f5f5f5] text-[#666] border-[#e0e0e0] hover:bg-[#eeeeee]'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2.5 rounded-lg bg-[#c79647] text-white hover:bg-[#b58840] font-medium text-sm transition-all"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
