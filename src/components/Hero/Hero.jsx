


import React from 'react';
import Image1 from "../../assets/images/image1.jpg";
import Image2 from "../../assets/images/image2.jpg";
import Image3 from "../../assets/images/image3.jpg";
import { Sliders, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageList = [
  {
    id: 1,
    img: Image3,
    title: 'Up to 50% off on all Power Glasses',
    description: 'Upgrade your vision with our premium selection of power glasses. Limited time offer!'
  },
  {
    id: 2,
    img: Image2,
    title: 'Stylish Frames for Every Face',
    description: 'Discover the perfect pair that complements your unique style and personality.'
  },
  {
    id: 3,
    img: Image1,
    title: 'Advanced Lens Technology',
    description: 'Experience crystal-clear vision with our cutting-edge lens innovations.'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ImageList.length);
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex justify-center items-center transition-colors duration-500">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-lime-200 dark:bg-lime-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
              {ImageList[currentSlide].title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {ImageList[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shop Now
              </button>
              <button className="px-8 py-3 bg-white text-gray-800 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center">
                <Sliders className="w-5 h-5 mr-2" />
                Customize
              </button>
            </div>
          </motion.div>

          {/* Image Carousel */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full" style={{ paddingBottom: '75%' }}> {/* 4:3 aspect ratio */}
              {ImageList.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="absolute top-0 left-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {ImageList.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;