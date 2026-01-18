'use client';

import { useState } from 'react';

interface DateRangePickerProps {
  onClose: () => void;
}

export default function DateRangePicker({ onClose }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1));

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    for (let i = prevMonthDays; i > 0; i--) days.push({ date: new Date(year, month - 1, prevMonthLastDay - i + 1), isCurrentMonth: false });
    for (let i = 1; i <= daysInMonth; i++) days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) { setStartDate(date); setEndDate(null); }
    else { if (date < startDate) { setEndDate(startDate); setStartDate(date); } else { setEndDate(date); } }
  };

  const isInRange = (date: Date) => !startDate || !endDate ? false : date > startDate && date < endDate;
  const isSameDay = (date1: Date, date2: Date | null) => date2 ? date1.toDateString() === date2.toDateString() : false;

  const leftMonth = currentMonth;
  const rightMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40" onClick={onClose}>
      <div className="bg-white w-[920px] max-w-[95vw] rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div className="text-xl font-semibold text-[#1a1a1a]">Select date range</div>
          <div className="flex gap-2">
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="w-9 h-9 rounded-lg border border-[#f0f0f0] bg-white hover:bg-[#f5f5f5] flex items-center justify-center text-lg text-[#666]">‹</button>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="w-9 h-9 rounded-lg border border-[#f0f0f0] bg-white hover:bg-[#f5f5f5] flex items-center justify-center text-lg text-[#666]">›</button>
          </div>
        </div>
        <div className="flex gap-8 mb-6">
          {[leftMonth, rightMonth].map((month, idx) => (
            <div key={idx} className="flex-1">
              <div className="text-center font-semibold text-[#1a1a1a] mb-4 text-lg">{monthNames[month.getMonth()]} / {month.getFullYear()}</div>
              <table className="w-full border-collapse">
                <thead><tr>{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (<th key={day} className="text-[#666] font-semibold text-[13px] pb-3 text-center">{day}</th>))}</tr></thead>
                <tbody>
                  {Array.from({ length: 6 }).map((_, weekIdx) => (
                    <tr key={weekIdx}>
                      {getDaysInMonth(month).slice(weekIdx * 7, weekIdx * 7 + 7).map((day, dayIdx) => {
                        const isStart = isSameDay(day.date, startDate);
                        const isEnd = isSameDay(day.date, endDate);
                        const inRange = isInRange(day.date);
                        return (
                          <td key={dayIdx} className={`text-center p-1.5 h-10 ${inRange ? 'bg-[#f0ede8] rounded-[20px]' : ''} ${!day.isCurrentMonth ? 'text-[#ccc]' : ''}`} onClick={() => handleDateClick(day.date)}>
                            <span className={`inline-block w-7 h-7 leading-7 text-center rounded-full text-sm cursor-pointer ${isStart || isEnd ? 'bg-[#c79647] text-white' : 'hover:bg-gray-100'}`}>{day.date.getDate()}</span>
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
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg bg-[#f5f5f5] text-[#666] border border-[#e0e0e0] hover:bg-[#eeeeee] font-medium text-sm">Cancel</button>
          <button onClick={() => { if (startDate) { alert(`Selected: ${startDate.toISOString().slice(0, 10)} → ${endDate ? endDate.toISOString().slice(0, 10) : startDate.toISOString().slice(0, 10)}`); onClose(); } else alert('Select start date.'); }} className="px-5 py-2.5 rounded-lg bg-[#c79647] text-white hover:bg-[#b58840] font-medium text-sm">Apply</button>
        </div>
      </div>
    </div>
  );
}
