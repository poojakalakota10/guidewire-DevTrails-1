import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <FiShield size={20} />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">GigShield AI</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              AI-powered parametric insurance protecting gig workers from income loss caused by external disruptions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="https://github.com/poojakalakota10/guidewire-DevTrails-1" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">How it works</Link></li>
              <li><Link to="/dashboard" className="text-sm hover:text-white transition-colors">Dashboard</Link></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Risk Assessment</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Claims Guide</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
             <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact</h3>
             <ul className="space-y-3">
               <li className="text-sm">support@gigshield.ai</li>
               <li className="text-sm">Hyderabad, Telangana<br/>India</li>
             </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} GigShield AI. Hackathon Prototype.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
