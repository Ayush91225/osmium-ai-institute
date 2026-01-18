'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function ClassPerformanceChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

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
            backgroundColor: '#1f2937',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#374151',
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
              }
            },
            grid: {
              color: '#f3f4f6'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white border border-[#e8e5e0] rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Class Performances</h2>
          <p className="text-sm text-[#999]">View the Performances of classes</p>
        </div>
        <select className="px-3 py-2 border border-[#e5e5e5] rounded-lg text-sm bg-white cursor-pointer outline-none">
          <option>B.Tech [Sem-3]</option>
          <option>B.Tech [Sem-4]</option>
        </select>
      </div>

      <div className="h-[260px] mt-5">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="flex items-center gap-5 mt-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></div>
          <span className="text-sm text-[#666]">DBMS</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#34d399]"></div>
          <span className="text-sm text-[#666]">DaFSuC</span>
        </div>
      </div>

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="text-[13px] text-[#888] font-medium pb-2.5 text-left border-b border-[#eee]">TEST NAME</th>
            <th className="text-[13px] text-[#888] font-medium pb-2.5 text-left border-b border-[#eee]">ATTEMPT DATE</th>
            <th className="text-[13px] text-[#888] font-medium pb-2.5 text-right border-b border-[#eee]">CLASS ACCURACY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 text-[#222] text-sm border-b border-[#f0f0f0]">Paper 1</td>
            <td className="py-3 text-[#222] text-sm border-b border-[#f0f0f0]">16 Nov, 2025</td>
            <td className="py-3 text-[#222] text-sm border-b border-[#f0f0f0] text-right">
              76.21% <span className="text-[13px] text-[#27ae60] ml-1">+5.6</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
