import React from 'react';
import { Headphones, ShoppingBag, Smartphone } from 'lucide-react';
import Image2 from "../../assets/images/iphone16(1).png"
import Image1 from "../../assets/images/earbuds(1).png"
import Image3 from "../../assets/images/earbuds(2).png"
import Background from "../../assets/images/background.jpg"


const ImageList = [
  {
    id: 1,
    img: Background, // Replace with your actual image path
    productImg: Image1, // Replace with your actual product image
    title: 'Experience Wireless Freedom',
    description: 'Immerse yourself in premium sound with our latest collection of wireless earbuds.',
    highlight: 'New Release',
    color: 'from-purple-600 to-blue-600'
  },
  {
    id: 2,
    img: Background, // Replace with your actual image path
    productImg: Image2, // Replace with your actual product image
    title: 'Premium Smartphones',
    description: 'Discover the next generation of mobile technology with cutting-edge features.',
    highlight: 'Best Seller',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 3,
    img: Background, // Replace with your actual image path
    productImg: Image3, // Replace with your actual product image
    title: 'Ultimate Sound Quality',
    description: 'Active noise cancellation and crystal-clear audio for an unmatched listening experience.',
    highlight: 'Featured',
    color: 'from-violet-600 to-purple-600'
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
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {ImageList.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80" />
          </div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${ImageList[currentSlide].color} rounded-full mix-blend-overlay filter blur-3xl animate-pulse opacity-30`} />
        <div className={`absolute -bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r ${ImageList[currentSlide].color} rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-700 opacity-30`} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Highlight Tag */}
            <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${ImageList[currentSlide].color} text-white text-sm font-medium mb-6`}>
              {ImageList[currentSlide].highlight}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {ImageList[currentSlide].title}
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              {ImageList[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className={`group px-8 py-4 bg-gradient-to-r ${ImageList[currentSlide].color} rounded-full font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center`}>
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Shop Now
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Learn More
              </button>
            </div>

            {/* Feature Icons */}
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8">
              <div className="flex items-center space-x-2">
                <Headphones className="w-6 h-6 text-purple-500" />
                <span className="text-gray-400 text-sm">Premium Audio</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="w-6 h-6 text-blue-500" />
                <span className="text-gray-400 text-sm">Latest Tech</span>
              </div>
            </div>
          </div>

          {/* Product Showcase */}
          <div className="flex-1 relative">
            <div className="relative w-full" style={{ paddingBottom: '100%' }}>
              {ImageList.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-700 transform ${
                    index === currentSlide 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95'
                  }`}
                >
                  <div className="relative w-full h-full">
                    {/* Product Image */}
                    <img
                      src={item.productImg}
                      alt={item.title}
                      className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                    />
                    {/* Decorative Ring */}
                    <div className={`absolute inset-0 border-2 border-gradient-to-r ${item.color} rounded-full opacity-20 animate-spin-slow`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {ImageList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? `bg-gradient-to-r ${ImageList[currentSlide].color} w-20` 
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;