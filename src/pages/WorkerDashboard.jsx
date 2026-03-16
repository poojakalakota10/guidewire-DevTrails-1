import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WorkerDashboard() {
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalEarningsProtected: 12500,
    totalIncomeLost: 3200,
    totalClaimsTriggered: 8,
    weeklyCoverageRemaining: 1200
  });

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Income Gained (₹)',
        data: [2800, 3200, 2900, 3600],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Income Lost (₹)',
        data: [800, 600, 1200, 600],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Income Protection Performance',
      },
    },
  };
  
  useEffect(() => {
    // Check if worker data is saved and coverage is active
    const data = localStorage.getItem('devtrails_worker');
    const isActive = localStorage.getItem('devtrails_active');
    
    if (!data || !isActive) {
      navigate('/');
      return;
    }
    setWorker(JSON.parse(data));
  }, [navigate]);

  if (!worker) return null;

  const handleLogout = () => {
    localStorage.removeItem('devtrails_worker');
    localStorage.removeItem('devtrails_active');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-xl relative pb-20">
        <div className="bg-indigo-600 p-6 pt-10 text-white pb-16 rounded-b-3xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-indigo-200 text-sm">Welcome back,</p>
              <h2 className="text-xl font-bold">{worker.name}</h2>
            </div>
            <button onClick={handleLogout} className="text-xs bg-indigo-500/50 hover:bg-indigo-500 px-3 py-1.5 rounded-full transition">
              Exit
            </button>
          </div>
          
          {/* Active Coverage Status */}
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-indigo-100 text-sm">Active Coverage</span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div className="text-2xl font-bold flex items-baseline gap-1">
              ₹800 <span className="text-sm font-normal text-indigo-100">/day protected limit</span>
            </div>
            <div className="mt-3 text-xs text-indigo-200">
              Valid until Sunday, 11:59 PM • Zone: {worker.city} ({worker.pincode})
            </div>
          </div>
        </div>

        <div className="px-5 -mt-8 space-y-4">
          
          {/* Analytics Cards */}
          <h3 className="text-sm font-bold text-slate-700 pl-1">Performance Analytics</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{analytics.totalEarningsProtected.toLocaleString()}</div>
              <div className="text-xs text-slate-500">Total Earnings Protected</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{analytics.totalIncomeLost.toLocaleString()}</div>
              <div className="text-xs text-slate-500">Total Income Lost</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{analytics.totalClaimsTriggered}</div>
              <div className="text-xs text-slate-500">Claims Triggered</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{analytics.weeklyCoverageRemaining.toLocaleString()}</div>
              <div className="text-xs text-slate-500">Weekly Coverage Left</div>
            </div>
          </div>

          {/* Risk Profiling */}
          <h3 className="text-sm font-bold text-slate-700 pl-1">Worker Risk Profile</h3>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Zone Risk:</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">Medium</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Rain Risk:</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">High</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Pollution Risk:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Low</span>
              </div>
            </div>
          </div>
          
          {/* Alerts / Disruption Triggers */}
          <h3 className="text-sm font-bold text-slate-700 pl-1">Live Zone Monitoring</h3>
          
          <div className="space-y-3">
            <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] p-4 border-l-4 border-emerald-500 flex gap-4 items-center">
              <div className="bg-emerald-100 p-2.5 rounded-full text-xl h-12 w-12 flex items-center justify-center">
                ☀️
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 text-sm">Normal Operations</h4>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold">SAFE</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Weather clear. AQI 85. No disruptions detected in Kukatpally.</p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl shadow-sm p-4 border border-amber-200 flex gap-4 items-center opacity-70 grayscale">
              <div className="bg-amber-100 p-2.5 rounded-full text-xl h-12 w-12 flex items-center justify-center">
                🌧️
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-700 text-sm">Rainfall Monitor</h4>
                  <span className="text-xs text-amber-600">INACTIVE</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{width: '20%'}}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 text-right">10mm / 50mm trigger</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 cursor-pointer hover:bg-slate-100 transition">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-slate-700 text-sm">Claims History</h4>
                  <p className="text-xs text-slate-500">View past automatic payouts</p>
                </div>
                <div className="text-slate-400">→</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerDashboard;
