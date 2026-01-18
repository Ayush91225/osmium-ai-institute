'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useDarkMode } from '@/contexts/DarkModeContext';

Chart.register(...registerables);

export default function ClassPerformanceChart() {
  const { isDarkMode } = useDarkMode();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [
          {
            label: 'DBMS',
            data: [65, 72, 78, 75, 82, 85],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'DaFSuC',
            data: [58, 68, 75, 80, 78, 88],
            borderColor: '#34d399',
            backgroundColor: 'rgba(52, 211, 153, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: isDarkMode ? '#27272a' : '#1f2937',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: isDarkMode ? '#3f3f46' : '#374151',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: (value) => value + '%',
              font: {
                size: 11
              },
              color: isDarkMode ? '#a1a1aa' : '#6b7280'
            },
            grid: {
              color: isDarkMode ? '#27272a' : '#f3f4f6'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              },
              color: isDarkMode ? '#a1a1aa' : '#6b7280'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [mounted, isDarkMode]);

  if (!mounted) return null;

  return (
    <div className={`rounded-xl border p-4 ${
      isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Class Performances</h2>
          <p className={`text-sm ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>View the Performances of classes</p>
        </div>
        <select className={`px-3 py-2 border rounded-lg text-sm outline-none transition-colors ${
          isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-white border-gray-200 text-gray-700'
        }`}>
          <option>B.Tech [Sem-3]</option>
          <option>B.Tech [Sem-4]</option>
        </select>
      </div>

      <div className="h-[260px] mt-5">
        <canvas ref={chartRef} key={`class-performance-chart-${isDarkMode}`}></canvas>
      </div>

      <div className="flex items-center gap-5 mt-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></div>
          <span className={`text-sm ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}>DBMS</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#34d399]"></div>
          <span className={`text-sm ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}>DaFSuC</span>
        </div>
      </div>

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className={`text-[13px] font-medium pb-2.5 text-left border-b ${
              isDarkMode ? 'text-zinc-500 border-zinc-800' : 'text-gray-500 border-gray-200'
            }`}>TEST NAME</th>
            <th className={`text-[13px] font-medium pb-2.5 text-left border-b ${
              isDarkMode ? 'text-zinc-500 border-zinc-800' : 'text-gray-500 border-gray-200'
            }`}>ATTEMPT DATE</th>
            <th className={`text-[13px] font-medium pb-2.5 text-right border-b ${
              isDarkMode ? 'text-zinc-500 border-zinc-800' : 'text-gray-500 border-gray-200'
            }`}>CLASS ACCURACY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`py-3 text-sm border-b ${
              isDarkMode ? 'text-zinc-300 border-zinc-800/50' : 'text-gray-700 border-gray-100'
            }`}>Paper 1</td>
            <td className={`py-3 text-sm border-b ${
              isDarkMode ? 'text-zinc-300 border-zinc-800/50' : 'text-gray-700 border-gray-100'
            }`}>16 Nov, 2025</td>
            <td className={`py-3 text-sm border-b text-right ${
              isDarkMode ? 'text-zinc-300 border-zinc-800/50' : 'text-gray-700 border-gray-100'
            }`}>
              76.21% <span className="text-[13px] text-green-500 ml-1">+5.6</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
