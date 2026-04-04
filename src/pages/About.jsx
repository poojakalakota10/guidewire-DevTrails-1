import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">About GigShield AI</h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              GigShield AI is revolutionizing income protection for gig workers by leveraging artificial intelligence
              to provide automatic, parametric insurance coverage. We focus exclusively on income loss protection,
              ensuring that delivery partners, freelancers, and other gig workers never lose earnings due to external
              disruptions they cannot control.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Gig Economy Challenge</h2>
            <p className="text-gray-600 mb-6">
              In cities like Hyderabad, delivery partners face numerous challenges:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Heavy monsoon rains causing 2-3 day work stoppages</li>
              <li>Extreme heat waves reducing delivery capacity</li>
              <li>Severe air pollution affecting health and work ability</li>
              <li>Traffic congestion and road shutdowns</li>
              <li>No traditional insurance coverage for gig workers</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How GigShield AI Works</h2>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-indigo-900 mb-2">Traditional Insurance</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Manual claim filing</li>
                    <li>• Lengthy approval process</li>
                    <li>• Human verification required</li>
                    <li>• 30-60 day payout timeline</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900 mb-2">GigShield AI</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Automatic claim detection</li>
                    <li>• AI-powered verification</li>
                    <li>• Instant payout processing</li>
                    <li>• Same-day compensation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI Workflow Visualization</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Worker Registration</h3>
                  <p className="text-gray-600">Delivery partner creates account with basic details</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Risk Profiling</h3>
                  <p className="text-gray-600">AI analyzes zone, weather patterns, and historical data</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Premium Calculation</h3>
                  <p className="text-gray-600">Dynamic pricing based on risk assessment</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900">External Monitoring</h3>
                  <p className="text-gray-600">Continuous monitoring of weather, pollution, traffic APIs</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Parametric Trigger Detection</h3>
                  <p className="text-gray-600">Automatic detection when thresholds are exceeded</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">6</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fraud Detection & Validation</h3>
                  <p className="text-gray-600">AI verification of worker activity and location</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">7</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Automatic Payout</h3>
                  <p className="text-gray-600">Instant compensation transferred to worker's account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;