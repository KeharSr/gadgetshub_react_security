import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllProductsApi } from "../../apis/Api";
import Hero from '../../components/Hero/Hero';
import Products from '../Products/Products';
import Banner from '../../components/Banner/Banner';
import { 
  ArrowRight, Battery, Wifi, Bluetooth, Headphones, 
  Smartphone, Volume2, Music, Shield, Zap 
} from 'lucide-react';
import Footer from '../../components/footer/Footer';
import Navbar from "../../components/landing_navbar/LandingNavbar";

const Onboarding = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomLink, setRandomLink] = useState('');

  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        if (res.status === 201) {
          setProducts(res.data.products);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setRandomLink(generateRandomLink());
  }, []);

  const generateRandomLink = () => {
    const links = ['/smartphones', '/earbuds'];
    return links[Math.floor(Math.random() * links.length)];
  };

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-500/10 rounded-xl">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 blur-xl bg-blue-500/20 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      <Navbar />
      <main className="relative">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <Hero />
        
        {/* Tech Features Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Premium Tech Experience</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover cutting-edge earbuds and smartphones with advanced features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <FeatureCard 
              icon={Battery}
              title="Long Battery Life"
              description="Up to 40 hours of playback"
            />
            <FeatureCard 
              icon={Wifi}
              title="Fast Connectivity"
              description="5G ready & low latency"
            />
            <FeatureCard 
              icon={Volume2}
              title="HD Audio"
              description="Crystal clear sound quality"
            />
            <FeatureCard 
              icon={Shield}
              title="2 Year Warranty"
              description="Complete peace of mind"
            />
          </div>

          {/* Featured Products */}
          <div className="relative backdrop-blur-xl bg-gray-800/30 rounded-3xl border border-gray-700 p-8 mb-16">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Featured Products</h2>
                <p className="text-gray-400">Our most popular tech picks</p>
              </div>
              <div className="flex space-x-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-3 bg-gray-700/50 rounded-xl"
                >
                  <Headphones className="w-6 h-6 text-blue-400" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-3 bg-gray-700/50 rounded-xl"
                >
                  <Smartphone className="w-6 h-6 text-purple-400" />
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 4).map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ y: -5 }}
                  className="transform transition-all duration-300"
                >
                  <Products productInformation={product} color={'blue'} />
                </motion.div>
              ))}
            </div>

            <motion.a 
              href={randomLink}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium group transition-all duration-300"
            >
              <span>Explore All Products</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Tech Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/20 to-blue-800/20 backdrop-blur-xl border border-blue-500/20 p-8"
            >
              <div className="relative z-10">
                <Headphones className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Premium Earbuds</h3>
                <p className="text-gray-300 mb-6">Experience immersive audio with noise cancellation</p>
                <a href="/login" className="text-blue-400 flex items-center group">
                  Shop Earbuds
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600/20 to-purple-800/20 backdrop-blur-xl border border-purple-500/20 p-8"
            >
              <div className="relative z-10">
                <Smartphone className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Latest Smartphones</h3>
                <p className="text-gray-300 mb-6">Cutting-edge technology in your pocket</p>
                <a href="/login" className="text-purple-400 flex items-center group">
                  Shop Smartphones
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </section>

        <Banner />
        <Footer />
      </main>
    </div>
  );
};

export default Onboarding;