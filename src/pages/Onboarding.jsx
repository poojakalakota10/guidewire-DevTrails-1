import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: 'Hyderabad',
    pincode: '',
    platform: 'Swiggy',
    weeklyEarnings: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save to context or local storage
    localStorage.setItem('devtrails_worker', JSON.stringify(formData));
    navigate('/premium');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">GigShield AI</h2>
          <p className="text-indigo-100 text-sm">Protect your income from sudden weather disruptions.</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                required 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Ex. Raju Kumar"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                <select 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 cursor-not-allowed"
                  disabled
                >
                  <option value="Hyderabad">Hyderabad</option>
                </select>
                <p className="text-xs text-slate-400 mt-1">Phase 1 limited</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pincode</label>
                <input 
                  required 
                  type="text" 
                  name="pincode"
                  maxLength="6"
                  pattern="[0-9]{6}"
                  value={formData.pincode} 
                  onChange={handleChange}
                  placeholder="500072"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Platform</label>
                <select 
                  name="platform" 
                  value={formData.platform} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Swiggy">Swiggy</option>
                  <option value="Zomato">Zomato</option>
                  <option value="Zepto">Zepto</option>
                  <option value="Blinkit">Blinkit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Avg Weekly Earnings</label>
                <input 
                  required 
                  type="number" 
                  name="weeklyEarnings" 
                  value={formData.weeklyEarnings} 
                  onChange={handleChange}
                  placeholder="₹ 4500"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full mt-6 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-[0.98]"
            >
              Get My Coverage Quote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
