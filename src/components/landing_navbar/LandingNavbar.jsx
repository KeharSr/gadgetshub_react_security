import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Headphones } from 'lucide-react';

const LandingNavbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed w-full z-50 bg-gray-900/50 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm">
              <Headphones className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-white">
              Tech<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Hub</span>
            </span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <Link to="/login">Login</Link>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 border border-blue-500/20"
            >
              <Link to="/register">Get Started</Link>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </motion.nav>
  );
};

export default LandingNavbar;