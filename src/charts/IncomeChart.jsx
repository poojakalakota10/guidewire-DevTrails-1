import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { family: "'Inter', sans-serif" }
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleFont: { family: "'Inter', sans-serif", size: 14 },
        bodyFont: { family: "'Inter', sans-serif", size: 13 },
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          drawBorder: false,
        },
        ticks: {
          font: { family: "'Inter', sans-serif" },
          callback: (value) => `₹${value}`
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: { family: "'Inter', sans-serif" }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Earnings (Protected)',
        data: [1200, 1050, 0, 1100, 800, 1400, 950],
        backgroundColor: '#2563eb', // blue-600
        borderRadius: 4,
      },
      {
        label: 'Income Lost',
        data: [0, 0, 1200, 0, 400, 0, 200],
        backgroundColor: '#ef4444', // red-500
        borderRadius: 4,
      },
      {
        label: 'Claim Payout',
        data: [0, 0, 1080, 0, 360, 0, 0], // 90% of lost
        backgroundColor: '#22c55e', // green-500
        borderRadius: 4,
      }
    ],
  };

  return (
    <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm w-full h-[350px]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">Income Overview vs Disruptions</h3>
        <p className="text-sm text-slate-500">Weekly breakdown of earnings, losses, and GigShield protection payouts.</p>
      </div>
      <div className="h-[250px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default IncomeChart;
