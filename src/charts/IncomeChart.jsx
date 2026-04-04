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
        stacked: false,
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
        stacked: false,
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

  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Cost (Premium)',
        data: [30, 30, 30, 30], // Fixed weekly premium
        backgroundColor: '#f43f5e', // rose-500
        borderRadius: 4,
      },
      {
        label: 'Unearned Income (Risk factor)',
        data: [0, 400, 0, 800], // Lost income due to rain/traffic
        backgroundColor: '#94a3b8', // slate-400
        borderRadius: 4,
      },
      {
        label: 'Gain (AI Payout)',
        data: [0, 360, 0, 720], // Payouts received
        backgroundColor: '#10b981', // emerald-500
        borderRadius: 4,
      }
    ],
  };

  return (
    <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm w-full h-[350px]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">Weekly Gain vs Loss Analysis</h3>
        <p className="text-sm text-slate-500">Visualizing premium paid against automated parametric payouts received.</p>
      </div>
      <div className="h-[250px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default IncomeChart;
