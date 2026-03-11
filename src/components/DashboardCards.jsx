import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiShield, FiClock } from 'react-icons/fi';

const DashboardCards = ({ 
  earningsProtected = 12500, 
  incomeLost = 1200, 
  claimsTriggered = 3, 
  coverageRemaining = 7 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Earnings Protected */}
      <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Protected Earnings</p>
          <h3 className="text-2xl font-bold text-slate-900">₹{earningsProtected.toLocaleString()}</h3>
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
            <FiTrendingUp /> +15% this week
          </p>
        </div>
        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
          <FiShield size={24} />
        </div>
      </div>

      {/* Total Income Lost */}
      <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Income Lost (Due to Risks)</p>
          <h3 className="text-2xl font-bold text-slate-900">₹{incomeLost.toLocaleString()}</h3>
          <p className="text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
            <FiTrendingDown /> -₹400 today
          </p>
        </div>
        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
          <FiTrendingDown size={24} />
        </div>
      </div>

      {/* Claims Triggered */}
      <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Claims Triggered</p>
          <h3 className="text-2xl font-bold text-slate-900">{claimsTriggered}</h3>
          <p className="text-xs text-blue-600 mt-2 font-medium">Auto-processed</p>
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
          <FiShield size={24} />
        </div>
      </div>

      {/* Coverage Remaining */}
      <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Weekly Coverage Left</p>
          <h3 className="text-2xl font-bold text-slate-900">{coverageRemaining} Days</h3>
          <p className="text-xs text-slate-500 mt-2 font-medium">Renews automatically</p>
        </div>
        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
          <FiClock size={24} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
