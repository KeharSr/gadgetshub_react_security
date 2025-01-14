import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, Instagram, Twitter, Youtube, Linkedin,
  Smartphone, Headphones, Mail,  Phone,
  Clock, Battery, Wifi, Bluetooth, Shield
} from 'lucide-react';

const Footer = () => {
  const socialIcons = [
    { Icon: Facebook, color: 'hover:text-blue-400' },
    { Icon: Instagram, color: 'hover:text-pink-400' },
    { Icon: Twitter, color: 'hover:text-blue-400' },
    { Icon: Youtube, color: 'hover:text-red-400' },
    { Icon: Linkedin, color: 'hover:text-blue-500' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm">
                <Headphones className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Tech<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Hub</span>
              </h2>
            </div>
            
            <p className="text-gray-400">
              Experience premium audio and cutting-edge mobile technology with our curated collection of earbuds and smartphones.
            </p>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">Premium Tech Support Available 24/7</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Products</h3>
            <ul className="space-y-3">
              {[
                { text: 'Premium Earbuds', icon: Headphones },
                { text: 'Latest Smartphones', icon: Smartphone },
                { text: 'Wireless Charging', icon: Battery },
                { text: '5G Devices', icon: Wifi },
                { text: 'Audio Gear', icon: Bluetooth }
              ].map((item) => (
                <li key={item.text}>
                  <a href="#" className="group flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    <item.icon className="w-4 h-4" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Support Hotline</p>
                    <p className="text-sm text-gray-400">1-800-TECH-HUB</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-400">support@techhub.com</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="text-sm text-gray-400">24/7 Customer Support</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Connect</h3>
            <div className="grid grid-cols-3 gap-4">
              {socialIcons.map(({ Icon, color }, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className={`p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 ${color} transition-colors duration-300 flex items-center justify-center group`}
                >
                  <Icon className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />
                </motion.a>
              ))}
            </div>
            
            
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400">
            <div className="flex items-center space-x-4">
              <p>&copy; 2024 TechHub</p>
              <span className="h-4 w-px bg-gray-700"></span>
              <p>Premium Tech Experience</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;