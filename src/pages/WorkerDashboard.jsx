import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { fetchSimulatedAPIData } from "../modules/apiSimulator";
import { calculateRiskScore } from "../modules/riskAssessment";
import { processClaim } from "../modules/claimEngine";
import RiskMap from "../components/RiskMap";

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
  const [apiData, setApiData] = useState(null);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [claimStatus, setClaimStatus] = useState(null);
  const [disruptionAlert, setDisruptionAlert] = useState(null);

  const [analytics, setAnalytics] = useState({
    totalEarningsProtected: 12500,
    totalIncomeLost: 3200,
    totalClaimsTriggered: 8,
    weeklyCoverageRemaining: 1200,
  });

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Income Protected",
        data: [2800, 3200, 2900, 3600],
        backgroundColor: "rgba(34,197,94,0.7)",
      },
      {
        label: "Income Lost",
        data: [800, 600, 1200, 600],
        backgroundColor: "rgba(239,68,68,0.7)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Weekly Income Protection Performance",
      },
    },
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("gigshield_current_user");

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(currentUser);
    setWorker(user);

    const savedAnalytics = JSON.parse(
      localStorage.getItem(`gigshield_analytics_${user.email}`) || "null"
    );

    if (savedAnalytics) setAnalytics(savedAnalytics);
  }, [navigate]);

  useEffect(() => {
    const loadAPI = async () => {
      const data = await fetchSimulatedAPIData("hyderabad");
      setApiData(data);
    };

    loadAPI();

    const interval = setInterval(loadAPI, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (apiData && worker) {
      const risk = calculateRiskScore(apiData, worker);
      setRiskAssessment(risk);
    }
  }, [apiData, worker]);

  useEffect(() => {
    if (riskAssessment && riskAssessment.triggers.length > 0) {
      // Show disruption alert
      const triggerMessage = riskAssessment.triggers.includes('Heavy Rain')
        ? 'Heavy rain detected in delivery zones'
        : riskAssessment.triggers.includes('Severe Pollution')
        ? 'Severe pollution levels detected'
        : riskAssessment.triggers.includes('Extreme Heat')
        ? 'Extreme heat conditions detected'
        : 'Environmental disruption detected';

      setDisruptionAlert({
        type: 'warning',
        message: `⚠️ ${triggerMessage}. AI protection activated.`,
        zone: 'Hyderabad',
        timestamp: new Date().toLocaleTimeString()
      });

      // Auto-hide alert after 10 seconds
      setTimeout(() => setDisruptionAlert(null), 10000);
    }
  }, [riskAssessment]);

  const handleAutomaticClaim = async () => {
    setIsProcessingClaim(true);
    setClaimStatus({
      status: "processing",
      message: "AI is processing claim...",
    });

    await new Promise((res) => setTimeout(res, 3000));

    const result = await processClaim(riskAssessment, worker);

    setClaimStatus({
      status: result.status,
      message: result.reason,
      payout: result.payout,
      transferMessage: result.transferMessage,
    });

    if (result.status === "APPROVED") {
      const updated = {
        ...analytics,
        totalEarningsProtected:
          analytics.totalEarningsProtected + result.payout,
        totalClaimsTriggered: analytics.totalClaimsTriggered + 1,
      };

      setAnalytics(updated);

      localStorage.setItem(
        `gigshield_analytics_${worker.email}`,
        JSON.stringify(updated)
      );
    }

    setIsProcessingClaim(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("gigshield_current_user");
    navigate("/login");
  };

  if (!worker) return null;

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto p-4">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Dashboard */}
          <div className="lg:col-span-2">

            <div className="bg-white shadow-xl rounded-xl p-6">

              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">Welcome back</p>
                  <h2 className="text-xl font-bold">{worker.name}</h2>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 text-white px-4 py-1 rounded"
                >
                  Logout
                </button>
              </div>

              {/* Coverage */}
              <div className="bg-indigo-600 text-white p-4 rounded-xl mb-6">
                <h3 className="font-semibold">Coverage Status</h3>
                <p className="text-2xl font-bold">₹800 / day protected</p>
              </div>

              {/* Analytics */}
              <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-white shadow rounded p-3 text-center">
                  <h3 className="text-green-600 text-xl font-bold">
                    ₹{analytics.totalEarningsProtected}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Earnings Protected
                  </p>
                </div>

                <div className="bg-white shadow rounded p-3 text-center">
                  <h3 className="text-red-600 text-xl font-bold">
                    ₹{analytics.totalIncomeLost}
                  </h3>
                  <p className="text-xs text-gray-500">Income Lost</p>
                </div>

                <div className="bg-white shadow rounded p-3 text-center">
                  <h3 className="text-blue-600 text-xl font-bold">
                    {analytics.totalClaimsTriggered}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Claims Triggered
                  </p>
                </div>

                <div className="bg-white shadow rounded p-3 text-center">
                  <h3 className="text-purple-600 text-xl font-bold">
                    ₹{analytics.weeklyCoverageRemaining}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Coverage Remaining
                  </p>
                </div>

              </div>

              {/* Risk Score */}
              <div className="bg-white rounded shadow p-4 mb-6">

                <h3 className="font-semibold mb-3">
                  AI Risk Assessment
                </h3>

                {riskAssessment ? (
                  <div className="text-center">

                    <div className="text-3xl font-bold text-red-500">
                      {riskAssessment.score}
                    </div>

                    <p className="text-gray-500 text-sm">
                      Risk Score
                    </p>

                    <p className="font-semibold">
                      {riskAssessment.level}
                    </p>

                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Calculating risk...
                  </p>
                )}

              </div>

              {/* Disruption Alert */}
              {disruptionAlert && (
                <div className={`p-4 rounded-lg border-l-4 mb-6 animate-slide-in-up ${
                  disruptionAlert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-400 text-yellow-800'
                    : 'bg-red-50 border-red-400 text-red-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        disruptionAlert.type === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        ⚠️
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Disruption Alert</h3>
                        <p className="text-sm">{disruptionAlert.message}</p>
                        <p className="text-xs mt-1 opacity-75">
                          Zone: {disruptionAlert.zone} • {disruptionAlert.timestamp}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDisruptionAlert(null)}
                      className="text-gray-400 hover:text-gray-600 ml-4"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Claim Status */}
              {claimStatus && (
                <div className="p-4 rounded bg-gray-50 border mb-6">
                  <h3 className="font-semibold">
                    Claim Status
                  </h3>
                  <p>{claimStatus.message}</p>

                  {claimStatus.payout && (
                    <p className="text-green-600 font-bold">
                      ₹{claimStatus.payout} credited
                    </p>
                  )}
                </div>
              )}

              {/* Chart */}
              <div className="bg-white p-4 rounded shadow">
                <Bar data={chartData} options={chartOptions} />
              </div>

            </div>
          </div>

          {/* Map */}
          <div className="hidden lg:block">
            <RiskMap
              activeDisruptions={riskAssessment?.triggers || []}
            />
          </div>

        </div>

        {/* Mobile Map */}
        <div className="lg:hidden mt-6">
          <RiskMap
            activeDisruptions={riskAssessment?.triggers || []}
          />
        </div>

      </div>
    </div>
  );
}

export default WorkerDashboard;