import React from 'react';
import { FiUsers, FiTarget, FiMapPin } from 'react-icons/fi';

const About = () => {
  return (
    <div className="w-full pt-12 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">About GigShield AI</h1>
          <p className="text-xl text-slate-600">
            A proactive solution to protect gig workers' daily income against unpredictable environmental disruptions.
          </p>
        </div>

        {/* The Problem */}
        <div className="glass bg-white p-8 rounded-2xl shadow-sm mb-12 border border-slate-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-red-100 p-3 rounded-lg text-red-600">
              <FiTarget size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">The Problem</h2>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            Gig workers, particularly delivery partners, entirely rely on daily earnings. When extreme weather (like heavy monsoons or severe heatwaves) or public health emergencies (like severe air pollution) disrupt their ability to work, they suffer a total loss of income for that day. Traditional insurance covers health and accidents, but completely ignores <strong>income loss</strong> due to external environmental factors.
          </p>
        </div>

        {/* The Persona Segment */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-lg mb-12 text-white">
          <div className="flex items-center justify-between mb-8 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <FiUsers size={24} />
              </div>
              <h2 className="text-2xl font-bold relative z-10">Our Target Persona</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
              <FiMapPin />
              <span className="text-sm font-medium">Hyderabad, IN</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 relative z-10 text-white">
            <div>
              <h3 className="text-xl font-bold mb-2">Swiggy Delivery Partner</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  <span className="text-blue-200">•</span>
                  <span><strong>City:</strong> Hyderabad</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-200">•</span>
                  <span><strong>Vehicle:</strong> 2-Wheeler (Motorcycle)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-200">•</span>
                  <span><strong>Average Earnings:</strong> ₹800 - ₹1,200 / day</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 p-5 rounded-xl border border-white/20 backdrop-blur-sm">
              <h4 className="font-semibold text-lg mb-2 text-blue-100">Why Hyderabad?</h4>
              <p className="text-blue-50 text-sm">
                Hyderabad faces unpredictable monsoons often resulting in severe waterlogging in areas like HITEC City and Madhapur, bringing food delivery to a standstill. Furthermore, the city experiences intense summer heatwaves, making afternoon deliveries physically hazardous and impacting overall earning potential.
              </p>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="glass bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <FiTarget size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">How We Solve It</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            GigShield AI introduces a <strong>parametric insurance model</strong> explicitly designed for income protection.
          </p>
          <ul className="space-y-4 text-slate-600">
            <li className="flex items-start gap-3">
              <div className="mt-1 w-2 h-2 bg-blue-500 rounded-full"></div>
              <p><strong>Micro-premiums:</strong> Workers pay small weekly amounts (e.g., ₹20-₹50) directly from their platform earnings to access coverage.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-2 h-2 bg-blue-500 rounded-full"></div>
              <p><strong>Parametric Triggers:</strong> Claims are not processed manually. If external API data confirms rainfall over 40mm or AQI over 400 in the worker's zone, the system registers a disruption.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-2 h-2 bg-blue-500 rounded-full"></div>
              <p><strong>Instant Payouts:</strong> Our AI checks the worker's location and active status for fraud prevention. If validated, the estimated lost income is immediately standard to their UPI.</p>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default About;
