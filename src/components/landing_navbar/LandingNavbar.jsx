import React from 'react';
import applogo from '../../assets/images/applogo.png';

const LandingNavbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-gray-900/50 backdrop-blur-lg border-b border-gray-800 animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <a href="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm">
              {/* Replace the URL below with your logo's path */}
              <img 
                src={applogo} 
                alt="GadgetsHub Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white">
              Gadgets<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Hub</span>
            </span>
          </a>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 active:scale-95">
              <a href="/login">Login</a>
            </button>
            
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 border border-blue-500/20 hover:scale-105 active:scale-95">
              <a href="/register">Get Started</a>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      {/* Add the CSS animation */}
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100px); }
          to { transform: translateY(0); }
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default LandingNavbar;