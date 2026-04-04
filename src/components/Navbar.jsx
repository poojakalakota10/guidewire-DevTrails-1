import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShield, FiBell } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userStr = localStorage.getItem('gigshield_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAuthenticated = !!user;

  const handleLogout = () => {
    localStorage.removeItem('gigshield_token');
    localStorage.removeItem('gigshield_user');
    navigate('/');
  };

  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');
  const navClass = isDashboard 
    ? "fixed w-full z-50 glass-dark border-b border-white/10 shadow-2xl transition-all duration-300" 
    : "fixed w-full z-50 glass border-b border-slate-200/50 shadow-sm transition-all duration-300";

  const textColor = isDashboard ? "text-slate-100" : "text-slate-800";
  const linkColor = (path) => {
    if (location.pathname === path) return isDashboard ? "text-indigo-400 font-bold" : "text-blue-600 font-bold";
    return isDashboard ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-blue-500";
  };

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg text-white">
              <FiShield size={24} />
            </div>
            <span className={`font-bold text-xl tracking-tight ${textColor}`}>
              GigShield <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">AI</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkColor('/')}>Home</Link>
            <Link to="/about" className={linkColor('/about')}>About</Link>
            <Link to="/contact" className={linkColor('/contact')}>Contact</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-6">
                <button className={`relative p-2 transition ${isDashboard ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-600'}`}>
                  <FiBell size={22} />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-800"></span>
                </button>
                <div className={`flex items-center space-x-2 mr-2 border-l pl-4 ${isDashboard ? 'border-white/10' : 'border-slate-200'}`}>
                   <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                   </div>
                   <div className="hidden lg:flex flex-col text-sm">
                      <span className={`font-bold leading-tight ${isDashboard ? 'text-white' : 'text-slate-800'}`}>{user.name}</span>
                      <span className="text-xs text-indigo-400 font-bold uppercase">{user.role}</span>
                   </div>
                </div>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="px-4 py-2 bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-6">
                <Link to="/login" className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:opacity-90 transition-all font-medium">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none p-2 transition-colors ${isDashboard ? 'text-slate-100 hover:text-indigo-400' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className={`md:hidden border-t ${isDashboard ? 'glass-dark border-white/10' : 'glass border-slate-200'}`}>
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isDashboard ? 'text-slate-100 hover:bg-white/10' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'}`}>Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isDashboard ? 'text-slate-100 hover:bg-white/10' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'}`}>About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isDashboard ? 'text-slate-100 hover:bg-white/10' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'}`}>Contact</Link>
            
            <div className={`border-t pt-4 mt-2 ${isDashboard ? 'border-white/10' : 'border-slate-200'}`}>
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 flex items-center space-x-3 mb-2">
                     <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                        {user.name.charAt(0).toUpperCase()}
                     </div>
                     <span className={`font-bold ${isDashboard ? 'text-white' : 'text-slate-800'}`}>{user.name}</span>
                  </div>
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50">Dashboard</Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 mt-1 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Log in</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-blue-600 text-white text-center">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
