import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Income Protection
            <span className="text-indigo-600 block">for Gig Workers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Protect your weekly earnings from external disruptions. Our AI monitors weather, pollution, and traffic to automatically compensate you when deliveries are affected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose GigShield AI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Risk Prediction</h3>
              <p className="text-gray-600">Advanced AI analyzes weather patterns, pollution levels, and traffic data to predict income disruptions.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatic Claims</h3>
              <p className="text-gray-600">No paperwork required. Claims are processed automatically when parametric triggers are met.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Delivery Partners in Hyderabad?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">The Persona</h3>
              <p className="text-gray-300">Swiggy/Zomato delivery partners working 6-8 hours daily, earning ₹200-400 per day, with no safety net for weather disruptions.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">The Problem</h3>
              <p className="text-gray-300">Heavy monsoon rains, extreme heat, and pollution cause 2-3 day income losses monthly, with zero financial protection.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">The Solution</h3>
              <p className="text-gray-300">GigShield AI provides automatic income protection, paying out ₹1,500-2,500 when disruptions occur, ensuring financial stability.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;