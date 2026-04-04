import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../api/apiClient';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icon issue in react
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const zoneCoordinates = {
  'Kukatpally': [17.4849, 78.4138],
  'LB Nagar': [17.3457, 78.5522],
  'Uppal': [17.3984, 78.5583],
  'Kondapur': [17.4614, 78.3587],
  'Madhapur': [17.4483, 78.3915],
  'Secunderabad': [17.4399, 78.4983]
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [activePolicy, setActivePolicy] = useState(null);
  const [claims, setClaims] = useState([]);
  const [weather, setWeather] = useState({ rainfall: 0, temp: 30, aqi: 100, curfew: false });
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    loadData();
    // Removed the harsh interval polling to avoid UI layout disturbances during review
  }, [profile?.zone]);

  const loadData = async () => {
    try {
      const [profRes, polRes, claimsRes] = await Promise.all([
        apiClient.get('/worker/risk-score'),
        apiClient.get('/policy/active'),
        apiClient.get('/claims/my-claims')
      ]);
      setProfile(profRes.data);
      setActivePolicy(polRes.data);
      setClaims(claimsRes.data);
      if(profRes.data.zone) fetchWeather(profRes.data.zone);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWeather = async (zone) => {
    try {
      const res = await apiClient.get(`/triggers/status/${zone}`);
      setWeather(res.data);
    } catch (err) {
      console.error("Weather fetch failed");
    }
  };

  const handleBuyPolicy = async (planName, weeklyPremium, payoutPerDay, maxDays) => {
    setLoadingAction(true);
    try {
      await apiClient.post('/policy/create', { planName, weeklyPremium, payoutPerDay, maxDays });
      setShowPlanModal(false);
      alert(`${planName} Activated successfully!`);
      loadData();
    } catch (err) {
      alert("Failed to buy policy");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleSimulateDisruption = async () => {
    setLoadingAction(true);
    try {
      const triggerDetails = { triggerType: 'Rain Trigger', triggerZone: profile.zone, snapshotData: weather };
      await apiClient.post('/claims/trigger-demo', triggerDetails);
      alert('Mock Rain Trigger Fired! Evaluating claim...');
      loadData();
    } catch (err) {
      alert("Simulation failed (Do you have an active policy?)");
    } finally {
      setLoadingAction(false);
    }
  };

  if (!profile) return <div className="p-10 text-center">Loading Dashboard...</div>;

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Earnings (₹)',
        data: [2500, 2400, 2100, 2600],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Disruption Loss (₹)',
        data: [0, 500, 1000, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 pt-24 pb-8 space-y-6">
        <h1 className="text-3xl font-bold">Worker Dashboard</h1>

        {/* TOP SECTION: Policy and Risk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Policy Card */}
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold mb-4">Coverage Status</h2>
            {activePolicy ? (
              <div className="space-y-4">
                 <div className="flex justify-between items-center bg-slate-700 p-4 rounded text-green-400">
                   <div className="font-bold">{activePolicy.planName}</div>
                   <div className="px-3 py-1 bg-green-900 text-green-400 rounded-full text-sm">Active</div>
                 </div>
                 <p>Premium: ₹{activePolicy.weeklyPremium}/week</p>
                 <p>Coverage: ₹{activePolicy.payoutPerDay}/day (Max {activePolicy.maxDays} days)</p>
                 <p className="text-sm text-slate-400">Expires: {new Date(activePolicy.expiryDate).toLocaleDateString()}</p>
                 <button onClick={() => setShowPlanModal(true)} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-white transition">Upgrade / Renew Policy</button>
              </div>
            ) : (
              <div className="space-y-4">
                 <div className="p-4 bg-slate-700 text-slate-400 rounded">No Active Policy</div>
                 <button onClick={() => setShowPlanModal(true)} className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded text-white font-bold transition">Buy Policy Now</button>
              </div>
            )}
          </div>

          {/* Risk Card */}
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col items-center justify-center">
             <h2 className="text-xl font-bold mb-4 w-full text-left">Your AI Risk Profile</h2>
             <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-indigo-500 mb-4">
                <div className="text-center">
                    <span className="text-3xl font-bold">{profile.riskScore}</span>
                    <span className="block text-xs uppercase text-slate-400">Score</span>
                </div>
             </div>
             <p className={`font-bold py-1 px-3 rounded-full mb-4 ${profile.riskTier === 'High Risk' ? 'bg-red-900 text-red-400' : profile.riskTier === 'Medium Risk' ? 'bg-yellow-900 text-yellow-400' : 'bg-green-900 text-green-400'}`}>{profile.riskTier}</p>
             <div className="w-full text-sm text-slate-400 space-y-1">
                 {profile.factors?.map((f, i) => <p key={i}>• {f}</p>)}
             </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Live Trigger & Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold">Live Disruption Monitor ({profile.zone})</h2>
                 <button onClick={handleSimulateDisruption} disabled={loadingAction} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm font-bold shadow-lg transition">Simulate Disruption</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-700 rounded text-center">
                    <p className="text-2xl font-bold">{weather.rainfall}mm</p>
                    <p className="text-sm text-slate-400">Rainfall/Hr</p>
                    <div className={`mt-2 h-2 rounded ${weather.rainfall > 15 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                 </div>
                 <div className="p-4 bg-slate-700 rounded text-center">
                    <p className="text-2xl font-bold">{weather.temp}°C</p>
                    <p className="text-sm text-slate-400">Temperature</p>
                    <div className={`mt-2 h-2 rounded ${weather.temp > 43 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                 </div>
                 <div className="p-4 bg-slate-700 rounded text-center">
                    <p className="text-2xl font-bold">{weather.aqi}</p>
                    <p className="text-sm text-slate-400">AQI</p>
                    <div className={`mt-2 h-2 rounded ${weather.aqi > 300 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                 </div>
                 <div className="p-4 bg-slate-700 rounded text-center">
                    <p className="text-xl font-bold uppercase">{weather.curfew ? 'Active' : 'Clear'}</p>
                    <p className="text-sm text-slate-400">Curfew Status</p>
                    <div className={`mt-2 h-2 rounded ${weather.curfew ? 'bg-red-500' : 'bg-green-500'}`}></div>
                 </div>
              </div>
           </div>

           <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col">
               <h2 className="text-xl font-bold mb-4">Earnings vs Disruptions</h2>
               <div className="relative flex-1" style={{ minHeight: '250px' }}>
                 <Bar data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
               </div>
           </div>
        </div>

        {/* MAP SECTION: Risk Area */}
        {profile?.zone && zoneCoordinates[profile.zone] && (
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
            <div className="p-6 pb-4">
              <h2 className="text-xl font-bold">Your Risk Zone: {profile.zone}</h2>
              <p className="text-sm text-slate-400">Live monitoring enabled for environmental disruptions.</p>
            </div>
            <div className="h-64 w-full bg-slate-700 relative z-0">
               <MapContainer center={zoneCoordinates[profile.zone]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={zoneCoordinates[profile.zone]}>
                    <Popup>
                      <b>{profile.zone}</b><br/>
                      Live Weather Monitoring Active
                    </Popup>
                  </Marker>
               </MapContainer>
            </div>
        </div>
        )}

        {/* BOTTOM SECTION: Claims Table */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Claims History</h2>
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                   <th className="py-3">Date</th>
                   <th className="py-3">Trigger Type</th>
                   <th className="py-3">Amount</th>
                   <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((c) => (
                  <tr key={c._id} className="border-b border-slate-700">
                    <td className="py-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="py-4">{c.triggerType}</td>
                    <td className="py-4 font-bold text-green-400">₹{c.amount}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'Approved' ? 'bg-green-900 text-green-400' : c.status === 'Rejected' ? 'bg-red-900 text-red-400' : 'bg-yellow-900 text-yellow-400'}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>

      </main>

      {/* Plan Selection Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl max-w-4xl w-full p-6 text-white border border-slate-700">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Select Your Shield Plan</h2>
              <button onClick={() => setShowPlanModal(false)} className="text-slate-400 text-xl font-bold">X</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[{ name: 'Basic Shield', price: 29 + profile.basePremium, payout: 300, max: 2 },
                { name: 'Pro Shield', price: 49 + profile.basePremium, payout: 500, max: 3 },
                { name: 'Max Shield', price: 69 + profile.basePremium, payout: 700, max: 5 }].map((plan, idx) => (
                <div key={idx} className="bg-slate-700 p-6 rounded text-center border border-indigo-500 flex flex-col">
                   <h3 className="text-xl font-bold text-indigo-400">{plan.name}</h3>
                   <div className="my-4 text-3xl font-bold">₹{plan.price}<span className="text-sm font-normal text-slate-400">/wk</span></div>
                   <p className="text-sm text-slate-300 mb-2">Payout: ₹{plan.payout}/day</p>
                   <p className="text-sm text-slate-300 mb-6">Max Coverage: {plan.max} days</p>
                   <p className="text-xs text-yellow-500 mb-4">(Includes AI risk adjustment)</p>
                   <button onClick={() => handleBuyPolicy(plan.name, plan.price, plan.payout, plan.max)} disabled={loadingAction} className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-bold transition">Activate</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default WorkerDashboard;