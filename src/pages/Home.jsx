import React from 'react';
import { Link } from 'react-router-dom';
import { FiCloudRain, FiAlertTriangle, FiZap, FiShield } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-40 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6">
            DevTrails Hackathon Prototype
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Income Protection</span><br className="hidden md:block" /> for Gig Workers
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Guaranteed compensation when external disruptions like heavy rain, extreme heat, or severe pollution prevent you from working. Protect your daily earnings automatically.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Protected Now
            </Link>
            <Link to="/about" className="px-8 py-3 bg-white text-slate-700 font-semibold rounded-lg shadow-md border border-slate-200 hover:bg-slate-50 transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose GigShield AI?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Our parametric insurance platform uses advanced AI to monitor risks in real-time and trigger automatic payouts without manual claims.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <FiZap size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Risk Prediction</h3>
              <p className="text-slate-600">
                Our AI engine constantly monitors weather, traffic, and pollution APIs to assess the risk level in your specific delivery zone.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                <FiAlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automatic Claims</h3>
              <p className="text-slate-600">
                Parametric triggers mean you never file paperwork. If risk thresholds (e.g., 40mm rain) are met in your zone, a claim is automatically generated.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-green-600">
                <FiShield size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Payout</h3>
              <p className="text-slate-600">
                Once validated by our fraud detection system, compensation for lost income is instantly transferred to your UPI account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Four simple steps to secure your gig income against unpredictable external factors.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-xl font-bold text-blue-600 mx-auto mb-4 border-2 border-blue-100">1</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Sign Up</h4>
              <p className="text-sm text-slate-600">Create an account and set your delivery city and platform.</p>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-xl font-bold text-blue-600 mx-auto mb-4 border-2 border-blue-100">2</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Choose Weekly Plan</h4>
              <p className="text-sm text-slate-600">Select a micro-premium plan tailored to your expected earnings.</p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-xl font-bold text-blue-600 mx-auto mb-4 border-2 border-blue-100">3</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">AI Monitors Disruptions</h4>
              <p className="text-sm text-slate-600">Our AI tracks local weather, heatwaves, and pollution in real-time.</p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">4</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Instant Compensation</h4>
              <p className="text-sm text-slate-600">If you lose work, get instant payout directly to your bank account.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
