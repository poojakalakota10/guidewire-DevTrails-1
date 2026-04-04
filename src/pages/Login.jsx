import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../api/apiClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('worker'); // For UI selection
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      localStorage.setItem('gigshield_token', response.data.token);
      localStorage.setItem('gigshield_user', JSON.stringify(response.data.user));
      
      // The backend returns the actual role, but we use navigate based on it
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 pt-20">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Login to GigShield</h2>

          {/* Role Selection Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button 
              type="button" 
              onClick={() => setRole('worker')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                role === 'worker' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Worker
            </button>
            <button 
              type="button" 
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                role === 'admin' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Admin
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500"
                required 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all font-bold text-lg shadow-lg flex justify-center"
            >
              {loading ? 'Logging in...' : `Login as ${role === 'admin' ? 'Admin' : 'Worker'}`}
            </button>

          </form>

          <div className="mt-6 text-center">
            <button onClick={() => navigate('/signup')} className="text-sm text-indigo-600 hover:underline">
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;