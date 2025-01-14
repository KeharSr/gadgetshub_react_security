import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, Bluetooth, Shield, Truck, 
  Headphones, Wifi, Battery, Zap 
} from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative min-h-[600px] flex justify-center items-center py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            <div className="relative">
              {/* Main Product Images */}
              <div className="relative flex justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-8 top-10 z-10"
                >
                  <img
                    src="/api/placeholder/200/200"
                    alt="Wireless Earbuds"
                    className="w-40 h-40 rounded-2xl object-cover shadow-2xl border border-gray-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-2xl"></div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-20"
                >
                  <img
                    src="/api/placeholder/300/300"
                    alt="Latest Smartphone"
                    className="w-64 h-64 rounded-2xl object-cover shadow-2xl border border-gray-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-2xl"></div>
                </motion.div>
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ rotate: 12 }}
                whileHover={{ rotate: 0 }}
                className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-4 shadow-lg backdrop-blur-sm border border-gray-700"
              >
                <span className="text-lg font-bold">50% OFF</span>
              </motion.div>

              {/* Tech Spec Badges */}
              <div className="absolute -left-4 bottom-12 bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2"
                >
                  <Battery className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">40Hr Battery</span>
                </motion.div>
              </div>

              <div className="absolute -right-4 bottom-20 bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2"
                >
                  <Wifi className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-300">5G Ready</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text details section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center gap-8"
          >
            <div className="space-y-6">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-1 bg-blue-500/10 text-blue-400 rounded-xl text-sm font-medium border border-blue-500/20"
              >
                Limited Time Offer
              </motion.span>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Next-Gen Tech at 
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Unbeatable Prices</span>
              </h1>
              
              <p className="text-gray-400 leading-relaxed text-lg">
                Experience premium audio and cutting-edge mobile technology with our exclusive collection of earbuds and smartphones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Feature Cards */}
              {[
                { icon: Headphones, title: 'HD Audio', desc: 'Crystal clear sound', color: 'blue' },
                { icon: Smartphone, title: '5G Ready', desc: 'Lightning-fast speeds', color: 'purple' },
                { icon: Shield, title: '2 Year Warranty', desc: 'Extended coverage', color: 'green' },
                { icon: Bluetooth, title: 'Bluetooth 5.2', desc: 'Seamless connectivity', color: 'indigo' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700"
                >
                  <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-${feature.color}-500/10`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}-400`} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{feature.title}</p>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group border border-blue-500/20"
            >
              <span>Explore Collection</span>
              <Zap className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Banner;