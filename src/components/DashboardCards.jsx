import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiShield, FiDollarSign, FiPlusCircle, FiMinusCircle } from 'react-icons/fi';

const DashboardCards = ({ 
  premiumPaid = 120, // Example: 4 weeks * 30 rs
  claimPayouts = 1080, // Example: 3 claims
  incomeLostToRisk = 1200, 
  coverageRemaining = 7 
}) => {
  const netBenefit = claimPayouts - premiumPaid;
  const isPositive = netBenefit >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* User Gain (Payouts) */}
      <div className="glass p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -z-10"></div>
        <div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Gain (Payouts)</p>
          <h3 className="text-2xl font-black text-emerald-600">₹{claimPayouts.toLocaleString()}</h3>
          <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-medium bg-emerald-50 px-2 py-1 rounded inline-flex">
            <FiPlusCircle /> Auto-credited to UPI
          </p>
        </div>
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <FiTrendingUp size={24} />
        </div>
      </div>

      {/* User Loss (Premium Cost) */}
      <div className="glass p-6 rounded-2xl border border-rose-100 shadow-sm flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -z-10"></div>
        <div>
           <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Loss (Premium)</p>
          <h3 className="text-2xl font-black text-rose-600">₹{premiumPaid.toLocaleString()}</h3>
          <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium bg-rose-50 px-2 py-1 rounded inline-flex">
             <FiMinusCircle /> Deducted auto-weekly
          </p>
        </div>
        <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
          <FiTrendingDown size={24} />
        </div>
      </div>

      {/* Net Benefit */}
      <div className={`glass p-6 rounded-2xl border shadow-sm flex items-center justify-between relative overflow-hidden ${isPositive ? 'border-blue-200' : 'border-slate-200'}`}>
        <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full -z-10 ${isPositive ? 'bg-blue-50' : 'bg-slate-50'}`}></div>
        <div>
           <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Net User Benefit</p>
          <h3 className={`text-2xl font-black ${isPositive ? 'text-blue-600' : 'text-slate-700'}`}>₹{Math.abs(netBenefit).toLocaleString()}</h3>
          <p className={`text-xs mt-2 font-medium px-2 py-1 rounded inline-flex ${isPositive ? 'text-blue-700 bg-blue-50' : 'text-slate-600 bg-slate-100'}`}>
             {isPositive ? 'You are ahead of costs!' : 'Costs exceed payouts'}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPositive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
          <FiDollarSign size={24} />
        </div>
      </div>

       {/* Income at Risk / Lost */}
       <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
           <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Unearned Income</p>
          <h3 className="text-2xl font-black text-slate-900">₹{incomeLostToRisk.toLocaleString()}</h3>
          <p className="text-xs text-slate-500 mt-2 font-medium bg-slate-100 px-2 py-1 rounded inline-flex">
             Income lost to weather/traffic
          </p>
        </div>
        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
          <FiShield size={24} />
        </div>
      </div>

    </div>
  );
};

export default DashboardCards;