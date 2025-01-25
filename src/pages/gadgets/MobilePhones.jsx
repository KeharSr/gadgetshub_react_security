import React, { useEffect, useState } from "react";
import { getAverageRatingApi, getProductsByCategoryApi } from "../../apis/Api";
import Products from "../Products/Products";
import toast from "react-hot-toast";
import Navbar from "../../components/navbar/Navbar";
import { motion } from "framer-motion";
import { Smartphone, Loader, ChevronRight, ChevronLeft,  Camera, Cpu, Battery } from "lucide-react";

const MobilePhones = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 8;
  const [productsRatings, setProductsRatings] = useState({});

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = () => {
    setLoading(true);
    getProductsByCategoryApi("Mobile Phones", currentPage, limit)
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.products);
          setTotalPages(Math.ceil(res.data.totalCount / limit));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response?.status === 400) {
          toast.error(err.response.data.message);
          setProducts([]);
        }
      });
  };

  useEffect(() => {
    const fetchRatings = async () => {
      const ratings = {};
      for (const product of products) {
        try {
          const res = await getAverageRatingApi(product._id);
          if (res.status === 200) {
            ratings[product._id] = res.data.averageRating;
          }
        } catch (err) {
          console.log(err);
        }
      }
      setProductsRatings(ratings);
    };
    
    if (products.length > 0) {
      fetchRatings();
    }
  }, [products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="relative">
          <Loader className="w-12 h-12 text-purple-500 animate-spin" />
          <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
        </div>
        <p className="mt-4 text-xl font-semibold text-gray-300">Loading flagship smartphones...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center space-x-6 mb-8">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm"
            >
              <Camera className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-sm text-gray-400">108MP Camera</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm"
            >
              <Cpu className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-sm text-gray-400">5G Ready</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm"
            >
              <Battery className="w-8 h-8 text-green-400 mb-2" />
              <span className="text-sm text-gray-400">5000mAh</span>
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-clip-text">
            Flagship Smartphones
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Discover our collection of premium smartphones featuring cutting-edge technology,
            stunning cameras, and powerful performance.
          </p>
        </motion.div>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700"
          >
            <Smartphone className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-white mb-4">
              No smartphones available at the moment
            </h2>
            <p className="text-xl text-gray-400">
              Our next-gen devices are coming soon. Stay tuned!
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="transform transition-all duration-300"
                >
                  <Products productInformation={product} color={"purple"} />
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-gray-700 transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-gray-300 bg-gray-800/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-gray-700 transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobilePhones;