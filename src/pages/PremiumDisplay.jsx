import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PremiumDisplay() {
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  
  useEffect(() => {
    const data = localStorage.getItem('devtrails_worker');
    if (data) {
      setWorker(JSON.parse(data));
    }
  }, []);

  const handleSubscribe = () => {
    localStorage.setItem('devtrails_active', 'true');
    navigate('/dashboard');
  };

  // Mock calculation based on prompt
  const riskScore = 85; 
  const weeklyPremium = 75; // "₹35 to ₹80 per week"
  const dailyPayout = 800;

  if (!worker) return <div className="p-8 text-center text-slate-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 p-6 text-white pb-12">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => navigate('/')} className="text-indigo-200 hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <span className="font-semibold">{worker.city} Zone Risk</span>
            <div className="w-6"></div> {/* Spacer balance */}
          </div>
          
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold mb-3 shadow-sm border border-red-400">
              High Risk Alert
            </div>
            <h2 className="text-5xl font-bold mb-1">{riskScore}<span className="text-2xl text-indigo-200">/100</span></h2>
            <p className="text-indigo-100 text-sm">Based on active monsoon warnings in {worker.pincode}</p>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 -mt-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-5 mb-6">
            <div className="flex justify-between items-end mb-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-slate-500 text-sm font-medium">Your Weekly Premium</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-slate-800">₹{weeklyPremium}</span>
                  <span className="text-slate-500">/week</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-sm font-medium">Payout / Day</p>
                <div className="text-xl font-bold text-emerald-600 mt-1">₹{dailyPayout}</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Parametric Triggers Active:</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">🌧️</span> Rain {'>'} 50mm / 24hrs
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-slate-500">💨</span> AQI {'>'} 300
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">🚨</span> Red Alert Flood / Curfew
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={handleSubscribe}
            className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold py-4 rounded-xl shadow-md transition-all flex justify-center items-center gap-2"
          >
            <span>Pay ₹{weeklyPremium} via Razorpay</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
          
          <p className="text-center text-xs text-slate-400 mt-4">
            Coverage starts immediately. Income loss ONLY. No vehicle/health cover.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PremiumDisplay;
