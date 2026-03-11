import React, { useState, useEffect } from 'react';
import DashboardCards from '../components/DashboardCards';
import RiskAlert from '../components/RiskAlert';
import ClaimModal from '../components/ClaimModal';
import IncomeChart from '../charts/IncomeChart';
import { fetchSimulatedAPIData } from '../modules/apiSimulator';
import { calculateRiskScore } from '../modules/riskAssessment';
import { processClaim } from '../modules/claimEngine';
import { FiRefreshCw, FiUser, FiMapPin, FiActivity } from 'react-icons/fi';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [riskData, setRiskData] = useState({ score: 10, level: 'Low Risk', triggers: [], profileMap: { zoneRisk: 'Low', rainRisk: 'Low', pollutionRisk: 'Low' } });
  const [apiState, setApiState] = useState({ weather: { rainfall: 0, temperature: 30 }, aqi: 80, traffic: 'Normal' });
  
  // Claim Process State
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimResult, setClaimResult] = useState(null);

  // Financial Stats
  const [stats, setStats] = useState({
    earningsProtected: 12500,
    incomeLost: 1200,
    claimsTriggered: 3,
    coverageRemaining: 7
  });

  useEffect(() => {
    // Load user data
    const stored = localStorage.getItem('gigshield_user_data');
    if (stored) {
      setUserData(JSON.parse(stored));
    } else {
      setUserData({
        name: 'Demo Worker',
        platform: 'Swiggy',
        city: 'Hyderabad'
      });
    }
  }, []);

  const runSimulationRound = async () => {
    setIsSimulating(true);
    
    try {
      // 1. Fetch Mock API Data
      const data = await fetchSimulatedAPIData(userData?.city || 'Hyderabad');
      setApiState(data);

      // 2. Run AI Risk Assessment
      const assessment = calculateRiskScore(data, userData || { city: 'Hyderabad' });
      setRiskData(assessment);

      // 3. Process Claim if Triggers are met
      if (assessment.triggers.length > 0) {
        const claim = await processClaim(assessment, userData || { email: 'demo@gigshield.ai', city: 'Hyderabad' });
        setClaimResult(claim);
        setShowClaimModal(true);

        // Update stats superficially if approved
        if (claim.status === 'APPROVED') {
          setStats(prev => ({
            ...prev,
            incomeLost: prev.incomeLost + 400, // mock loss
            claimsTriggered: prev.claimsTriggered + 1
          }));
        }
      }

    } catch (error) {
      console.error("Simulation error", error);
    } finally {
      setIsSimulating(false);
    }
  };

  if (!userData) return <div className="p-8 text-center pt-24"><FiRefreshCw className="animate-spin mx-auto text-blue-600" size={32} /></div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Worker Dashboard</h1>
            <p className="text-slate-500 mt-1">Real-time risk monitoring & auto-claims</p>
          </div>
          
          <button 
            onClick={runSimulationRound}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all ${isSimulating ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <FiRefreshCw className={isSimulating ? 'animate-spin' : ''} />
            {isSimulating ? 'Running AI Check...' : 'Simulate Live API Check'}
          </button>
        </div>

        {/* Top Cards */}
        <DashboardCards {...stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left Column - Real-time Risk & APIs */}
          <div className="lg:col-span-1 space-y-6">
            
            <RiskAlert riskLevel={riskData.level} triggers={riskData.triggers} />

            {/* AI Risk Profile */}
            <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full mix-blend-multiply opacity-50"></div>
              
              <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <FiUser className="text-blue-600" /> Worker Risk Profile
              </h3>
              
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-100 flex justify-between items-center">
                  <span className="text-sm text-slate-500">Platform</span>
                  <span className="font-semibold text-slate-800">{userData.platform}</span>
                </div>
                <div className="pb-3 border-b border-slate-100 flex justify-between items-center">
                  <span className="text-sm text-slate-500">City/Zone</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1"><FiMapPin size={14} className="text-slate-400" /> {userData.city}</span>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">AI Dynamic Scoring (0-100)</h4>
                  
                  {/* Score bar */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-extrabold text-blue-600 w-16">{riskData.score}</div>
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${riskData.score > 60 ? 'bg-red-500' : (riskData.score > 30 ? 'bg-orange-500' : 'bg-green-500')}`}
                        style={{ width: `${riskData.score}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded-md">
                      <span className="text-slate-500 block mb-1">Zone Risk</span>
                      <span className={`font-semibold ${riskData.profileMap.zoneRisk === 'High' ? 'text-red-600' : 'text-slate-700'}`}>{riskData.profileMap.zoneRisk}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-md">
                      <span className="text-slate-500 block mb-1">Rain Risk</span>
                      <span className={`font-semibold ${riskData.profileMap.rainRisk === 'High' ? 'text-red-600' : 'text-slate-700'}`}>{riskData.profileMap.rainRisk}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live API Feed Mock */}
            <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <FiActivity className="text-indigo-600" /> Live API Feed
                </h3>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex justify-between">
                  <span className="text-sm font-medium text-blue-800">Weather API (Rain)</span>
                  <span className="text-sm font-bold text-blue-900">{apiState.weather.rainfall} mm</span>
                </div>
                <div className="bg-orange-50/50 p-3 rounded-lg border border-orange-100 flex justify-between">
                  <span className="text-sm font-medium text-orange-800">Weather API (Temp)</span>
                  <span className="text-sm font-bold text-orange-900">{apiState.weather.temperature} °C</span>
                </div>
                <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100 flex justify-between">
                  <span className="text-sm font-medium text-purple-800">Pollution API (AQI)</span>
                  <span className="text-sm font-bold text-purple-900">{apiState.aqi}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Analytics and Chart */}
          <div className="lg:col-span-2 space-y-6">
            <IncomeChart />
            
            <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm mt-6">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Coverage Status</h3>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FiCheckCircle className="text-green-600" size={20} />
                    <span className="font-bold text-green-900 text-lg">Active Premium Plan</span>
                  </div>
                  <p className="text-sm text-green-700">₹30/week auto-deducted from platform earnings.</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-600 uppercase font-bold tracking-wider mb-1">Max Daily Cover</p>
                  <p className="text-2xl font-black text-green-800">₹800</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {showClaimModal && claimResult && (
        <ClaimModal claimResult={claimResult} onClose={() => setShowClaimModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
