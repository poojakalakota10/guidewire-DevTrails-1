import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-in-up">
            AI-Powered Income Protection
            <span className="text-gradient block">for Gig Workers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            Protect your weekly earnings from external disruptions. Our AI monitors weather, pollution, and traffic to automatically compensate you when deliveries are affected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{animationDelay: '0.4s'}}>
            <button className="btn-gradient text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Get Started
            </button>
            <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 card-hover">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 animate-slide-in-up">Why Choose GigShield AI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-6 rounded-2xl card-hover animate-slide-in-up" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Risk Prediction</h3>
              <p className="text-gray-600">Advanced AI analyzes weather patterns, pollution levels, and traffic data to predict income disruptions.</p>
            </div>
            <div className="glass p-6 rounded-2xl card-hover animate-slide-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{animationDelay: '0.5s'}}>
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatic Claims</h3>
              <p className="text-gray-600">No paperwork required. Claims are processed automatically when parametric triggers are met.</p>
            </div>
            <div className="glass p-6 rounded-2xl card-hover animate-slide-in-up" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{animationDelay: '1s'}}>
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Payout</h3>
              <p className="text-gray-600">Get compensated within minutes of disruption detection. Money goes directly to your account.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account and tell us about your delivery work.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Weekly Plan</h3>
              <p className="text-gray-600">Select your coverage amount based on your average earnings.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Monitors Disruptions</h3>
              <p className="text-gray-600">Our AI continuously monitors weather, pollution, and traffic in your area.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Compensation</h3>
              <p className="text-gray-600">Get paid automatically when disruptions affect your deliveries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Persona Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Delivery Partners in Hyderabad?</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">👤 The Persona</h3>
              <p className="text-gray-300 mb-4">Ravi Kumar, 28-year-old Swiggy delivery partner in Kukatpally, Hyderabad</p>
              <ul className="text-gray-300 space-y-2">
                <li>• Works 6-8 hours daily, 6 days a week</li>
                <li>• Average daily earnings: ₹350-450</li>
                <li>• Weekly earnings: ₹2,100-2,700</li>
                <li>• No savings or insurance coverage</li>
                <li>• Family of 4 depends on daily income</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-red-400">⚠️ The Problem</h3>
              <p className="text-gray-300 mb-4">External disruptions cause unpredictable income loss</p>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Weather Risk:</strong> Monsoon floods cancel 2-3 days monthly</li>
                <li>• <strong>Pollution Impact:</strong> AQI &gt;300 reduces delivery capacity by 40%</li>
                <li>• <strong>Traffic Disruptions:</strong> Strikes/curfews cause complete shutdown</li>
                <li>• <strong>Zero Safety Net:</strong> No government aid or platform support</li>
                <li>• <strong>Monthly Loss:</strong> ₹1,500-3,000 in lost earnings</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-400">✅ The Solution</h3>
              <p className="text-gray-300 mb-4">AI-powered parametric insurance for gig workers</p>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Weekly Premium:</strong> ₹45-80 based on risk zone</li>
                <li>• <strong>Coverage:</strong> ₹1,800-2,400 weekly protection</li>
                <li>• <strong>Automatic Payout:</strong> Instant compensation on disruption</li>
                <li>• <strong>AI Monitoring:</strong> Real-time weather/pollution tracking</li>
                <li>• <strong>No Claims Process:</strong> Parametric triggers = automatic payout</li>
              </ul>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-indigo-600 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold mb-2">₹2,500</div>
              <div className="text-indigo-100">Average Weekly Earnings</div>
            </div>
            <div className="bg-red-600 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold mb-2">40%</div>
              <div className="text-red-100">Income Loss During Monsoon</div>
            </div>
            <div className="bg-yellow-600 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold mb-2">310</div>
              <div className="text-yellow-100">Average AQI in Hyderabad</div>
            </div>
            <div className="bg-green-600 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold mb-2">₹55</div>
              <div className="text-green-100">Weekly Premium Cost</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;