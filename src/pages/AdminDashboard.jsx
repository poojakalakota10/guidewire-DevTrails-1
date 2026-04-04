import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../api/apiClient';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icon issue in react
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const zoneCoordinates = {
  'Kukatpally': [17.4849, 78.4138],
  'LB Nagar': [17.3457, 78.5522],
  'Uppal': [17.3984, 78.5583],
  'Kondapur': [17.4614, 78.3587],
  'Madhapur': [17.4483, 78.3915],
  'Secunderabad': [17.4399, 78.4983]
};

const mockAnalyticsData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  datasets: [
    {
      label: 'Premium Collected (₹)',
      data: [12000, 15000, 14000, 18000, 21000],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.4
    },
    {
      label: 'Claims Paid (₹)',
      data: [2000, 5000, 1000, 4000, 12000],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
      tension: 0.4
    }
  ]
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  const fetchDashboardData = async () => {
    try {
      const statsRes = await apiClient.get('/admin/stats');
      setStats(statsRes.data);
      
      const claimsRes = await apiClient.get('/admin/claims');
      setClaims(claimsRes.data);
    } catch (err) {
      alert("Error loading admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleClaimAction = async (id, action) => {
    try {
      await apiClient.post(`/admin/claims/${id}/action`, { action });
      fetchDashboardData(); // Refresh list
    } catch (err) {
      alert("Error processing claim");
    }
  };

  if (loading) return <div className="p-8 text-center text-xl bg-slate-900 text-white min-h-screen">Loading Insurer Console...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-1 flex w-full max-w-screen-2xl mx-auto pt-16">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-slate-800 border-r border-slate-700 hidden md:block">
          <div className="p-6">
            <h2 className="text-xl font-bold text-indigo-400">Insurer Console</h2>
            <p className="text-sm text-slate-400 mt-1">GigShield Control Panel</p>
          </div>
          <nav className="mt-4">
            {['Overview', 'Live Map', 'Settlements Queue'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-6 py-4 font-semibold transition ${activeTab === tab ? 'bg-indigo-600 text-white border-l-4 border-indigo-300' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        {/* MOBILE TABS */}
        <div className="md:hidden flex overflow-x-auto bg-slate-800 border-b border-slate-700 w-full mb-4">
          {['Overview', 'Live Map', 'Settlements Queue'].map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 whitespace-nowrap px-4 py-3 font-semibold text-sm ${activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-400 bg-slate-700' : 'text-slate-400'}`}
             >
               {tab}
             </button>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'Overview' && (
            <div className="space-y-8 fade-in">
              <h1 className="text-3xl font-bold">Dashboard Overview</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800 p-6 rounded-xl shadow border-l-4 border-indigo-500 hover:shadow-lg transition">
                  <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Active Policies</h3>
                  <p className="text-3xl font-bold mt-2">{stats.activePolicies}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl shadow border-l-4 border-green-500 hover:shadow-lg transition">
                  <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Weekly Revenue</h3>
                  <p className="text-3xl font-bold text-green-400 mt-2">₹{stats.weeklyPremiumRevenue}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl shadow border-l-4 border-red-500 hover:shadow-lg transition">
                  <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Claims Paid</h3>
                  <p className="text-3xl font-bold text-red-400 mt-2">₹{stats.claimsPaidThisWeek}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl shadow border-l-4 border-yellow-500 hover:shadow-lg transition">
                  <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Loss Ratio</h3>
                  <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.lossRatio}%</p>
                </div>
              </div>

              <div className="bg-orange-900 border-l-4 border-orange-500 text-orange-200 p-5 rounded-lg shadow-lg flex items-center space-x-4">
                  <div className="text-2xl">⚠️</div>
                  <div>
                    <h4 className="font-bold text-lg">Predictive Alert: Storm Front Approaching</h4>
                    <p className="opacity-90">Based on AI forecast, Zone <strong>LB Nagar</strong> has an 78% heavy rain probability next week. Estimated claim exposure is ₹32,000.</p>
                  </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
                <h2 className="text-xl font-bold mb-6">Financial Analytics: Premium vs Payouts</h2>
                <div className="w-full h-80">
                  <Line 
                    data={mockAnalyticsData} 
                    options={{ 
                      maintainAspectRatio: false, 
                      responsive: true,
                      plugins: {
                        legend: { labels: { color: '#cbd5e1' } }
                      },
                      scales: {
                        y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
                        x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* LIVE MAP TAB */}
          {activeTab === 'Live Map' && (
            <div className="space-y-6 fade-in h-full flex flex-col">
              <div>
                 <h1 className="text-3xl font-bold mb-2">Live Operations Map</h1>
                 <p className="text-slate-400">Monitor active delivery zones for environmental disruption risks in real-time.</p>
              </div>

              <div className="flex-1 min-h-[500px] bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden relative z-0">
                 <MapContainer center={[17.4065, 78.4772]} zoom={12} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="&copy; OpenStreetMap contributors &copy; CARTO" />
                    
                    {/* LB Nagar Zone (High Risk - Storm Alert) */}
                    <Circle center={zoneCoordinates['LB Nagar']} radius={1500} pathOptions={{ color: 'red', fillColor: '#ef4444', fillOpacity: 0.3 }}>
                      <Popup><b className="text-slate-900">LB Nagar</b><br/><span className="text-red-600 font-bold">High Risk: Heavy Rain Expected</span></Popup>
                    </Circle>

                    {/* Kukatpally Zone (Medium Risk) */}
                    <Circle center={zoneCoordinates['Kukatpally']} radius={2000} pathOptions={{ color: 'orange', fillColor: '#f97316', fillOpacity: 0.3 }}>
                      <Popup><b className="text-slate-900">Kukatpally</b><br/><span className="text-orange-600 font-bold">Medium Risk: Traffic Congestion</span></Popup>
                    </Circle>

                    {/* Madhapur Zone (Clear) */}
                    <Circle center={zoneCoordinates['Madhapur']} radius={1800} pathOptions={{ color: 'green', fillColor: '#22c55e', fillOpacity: 0.3 }}>
                      <Popup><b className="text-slate-900">Madhapur</b><br/><span className="text-green-600 font-bold">Clear: Operations Normal</span></Popup>
                    </Circle>
                 </MapContainer>
              </div>
            </div>
          )}

          {/* SETTLEMENTS QUEUE TAB */}
          {activeTab === 'Settlements Queue' && (
            <div className="space-y-6 fade-in">
              <h1 className="text-3xl font-bold">Claims Settlements</h1>
              <p className="text-slate-400">Review, flag, and process parametric insurance claims from delivery workers.</p>

              <div className="bg-slate-800 shadow-xl rounded-xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Worker / Zone</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Trigger Event</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Claim Amount</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Fraud Score</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-300 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 bg-slate-800">
                      {claims.length === 0 ? (
                        <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-400 italic">No claims have been filed yet.</td></tr>
                      ) : claims.map((claim) => (
                        <tr key={claim._id} className={`transition hover:bg-slate-700 ${claim.fraudScore > 40 ? 'bg-red-900/10' : ''}`}>
                          <td className="px-6 py-5 whitespace-nowrap">
                              <div className="text-sm font-bold text-white">{claim.user?.name || 'Unknown User'}</div>
                              <div className="text-sm text-slate-400">{claim.triggerZone || 'Unspecified Zone'}</div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-300">
                            <span className="flex items-center space-x-2">
                              <span>🌧️</span> <span>{claim.triggerType}</span>
                            </span>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                             <span className="text-sm font-bold text-green-400 bg-green-900/30 px-3 py-1 rounded-full border border-green-800">
                               ₹{claim.amount}
                             </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${claim.fraudScore > 40 ? 'bg-red-500' : claim.fraudScore > 20 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                              <span className={`text-sm font-bold ${claim.fraudScore > 40 ? 'text-red-400' : claim.fraudScore > 20 ? 'text-yellow-400' : 'text-green-400'}`}>
                                {claim.fraudScore}/100
                              </span>
                            </div>
                            {claim.fraudReasons && claim.fraudReasons.length > 0 && (
                                <div className="text-xs text-slate-500 mt-1 max-w-[150px] truncate" title={claim.fraudReasons.join(', ')}>
                                    {claim.fraudReasons.join(', ')}
                                </div>
                            )}
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full border 
                              ${claim.status === 'Approved' ? 'bg-green-900/50 text-green-400 border-green-700' : 
                                claim.status === 'Rejected' ? 'bg-red-900/50 text-red-400 border-red-700' : 
                                claim.status === 'Flagged' ? 'bg-orange-900/50 text-orange-400 border-orange-700' : 
                                'bg-slate-700 text-slate-300 border-slate-600'}`}>
                              {claim.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                            {(claim.status === 'Pending' || claim.status === 'Flagged') && (
                              <div className="flex justify-end space-x-3">
                                 <button onClick={() => handleClaimAction(claim._id, 'Approved')} className="text-green-400 hover:text-green-300 bg-green-900/20 px-3 py-1 rounded transition border border-green-800/50 hover:bg-green-900/40 font-semibold">Approve</button>
                                 <button onClick={() => handleClaimAction(claim._id, 'Rejected')} className="text-red-400 hover:text-red-300 bg-red-900/20 px-3 py-1 rounded transition border border-red-800/50 hover:bg-red-900/40 font-semibold">Reject</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
