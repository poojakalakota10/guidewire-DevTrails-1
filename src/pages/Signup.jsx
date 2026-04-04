import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../api/apiClient';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    role: 'worker',
    platform: '',
    zone: '',
    avgDailyEarnings: '',
    hoursPerDay: 8,
    yearsOnPlatform: 2
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post('auth/register', formData);
      const user = response.data.user;
      localStorage.setItem('gigshield_token', response.data.token);
      localStorage.setItem('gigshield_user', JSON.stringify(user));
      alert(`Registration successful! Role: ${user.role}`);
      
      console.log('Signup success:', user);

      // Explicit Redirect based on role
      if (user.role === 'admin') {
        console.log('Navigating to Admin Dashboard');
        navigate('/admin');
      } else {
        console.log('Navigating to Worker Dashboard');
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to register. Server may be down.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Join GigShield</h1>

          {/* Role Selection Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button 
              type="button" 
              onClick={() => setFormData({...formData, role: 'worker'})}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                formData.role === 'worker' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Worker
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, role: 'admin'})}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                formData.role === 'admin' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring-indigo-500" required />
            </div>

            <div className="flex gap-4">
               <div className="flex-1">
                 <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                 <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring-indigo-500" required />
               </div>
               <div className="flex-1">
                 <label className="block text-sm font-medium text-gray-700">Email</label>
                 <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring-indigo-500" required />
               </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring-indigo-500" required />
            </div>

            {formData.role === 'worker' && (
              <>
                <div className="flex gap-4">
                   <div className="flex-1">
                     <label className="block text-sm font-medium text-gray-700">Platform</label>
                     <select value={formData.platform} onChange={(e) => setFormData({...formData, platform: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded focus:ring-indigo-500" required>
                       <option value="">Select</option>
                       <option value="Zomato">Zomato</option>
                       <option value="Swiggy">Swiggy</option>
                       <option value="Zepto">Zepto</option>
                       <option value="Blinkit">Blinkit</option>
                       <option value="Amazon">Amazon</option>
                     </select>
                   </div>
                   <div className="flex-1">
                     <label className="block text-sm font-medium text-gray-700">Zone</label>
                     <select value={formData.zone} onChange={(e) => setFormData({...formData, zone: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded focus:ring-indigo-500" required>
                       <option value="">Select</option>
                       <option value="Kukatpally">Kukatpally</option>
                       <option value="Kondapur">Kondapur</option>
                       <option value="Madhapur">Madhapur</option>
                       <option value="LB Nagar">LB Nagar</option>
                       <option value="Uppal">Uppal</option>
                       <option value="Secunderabad">Secunderabad</option>
                     </select>
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Avg Daily Earnings (₹)</label>
                  <input type="number" value={formData.avgDailyEarnings} onChange={(e) => setFormData({...formData, avgDailyEarnings: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring-indigo-500" required />
                </div>

                <div>
                 <label className="block text-sm font-medium text-gray-700">Working Hours/Day ({formData.hoursPerDay} hrs)</label>
                 <input type="range" min="4" max="12" value={formData.hoursPerDay} onChange={(e) => setFormData({...formData, hoursPerDay: e.target.value})} className="mt-2 w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Years on Platform ({formData.yearsOnPlatform} yrs)</label>
                  <input type="range" min="0" max="10" value={formData.yearsOnPlatform} onChange={(e) => setFormData({...formData, yearsOnPlatform: e.target.value})} className="mt-2 w-full" />
                </div>
              </>
            )}

            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg flex justify-center items-center font-bold text-lg">
              {loading ? <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></span> : `Sign Up as ${formData.role === 'admin' ? 'Admin' : 'Worker'}`}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button onClick={() => navigate('/login')} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">Already have an account? Login</button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;