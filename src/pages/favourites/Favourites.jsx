import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Heart, Loader, Headphones, Smartphone, Battery, Wifi } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { deleteFavouriteApi, getFavouritesApi, getAverageRatingApi } from '../../apis/Api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsRatings, setProductsRatings] = useState({});

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await getFavouritesApi();
      if (res.status === 200) {
        setFavorites(res.data.favorites);
        fetchRatings(res.data.favorites);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  };

  const fetchRatings = async (favorites) => {
    try {
      const ratingsPromises = favorites.map(fav => getAverageRatingApi(fav.product._id));
      const ratings = await Promise.all(ratingsPromises);
      const ratingsMap = {};
      ratings.forEach((res, index) => {
        if (res.status === 200) {
          ratingsMap[favorites[index].product._id] = res.data.averageRating;
        }
      });
      setProductsRatings(ratingsMap);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch ratings');
    }
  };

  const removeFromFavorites = async (id, productId) => {
    try {
      const res = await deleteFavouriteApi(id);
      if (res.status === 200) {
        setFavorites((prevFavorites) => prevFavorites.filter(item => item._id !== id));
        localStorage.setItem(`favorite_${productId}`, JSON.stringify(false));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove from favorites');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="relative">
          <Loader className="w-12 h-12 text-blue-500 animate-spin" />
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Tech Wishlist
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your curated collection of premium earbuds and smartphones.
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-xl"
          >
            <div className="flex justify-center space-x-4 mb-6">
              <Headphones className="w-8 h-8 text-blue-400" />
              <Smartphone className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Your wishlist is waiting to be filled</h2>
            <p className="mt-2 text-gray-400">Discover our premium collection of earbuds and smartphones</p>
            <Link to="/homepage" className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              Explore Tech
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {favorites.map((favorite) => (
                <motion.div 
                  key={favorite._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`http://localhost:5000/products/${favorite.product.productImage}`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={favorite.product.productName}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 backdrop-blur-sm border border-blue-500/20">
                        {favorite.product.productCategory}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                      {favorite.product.productName}
                    </h5>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        {favorite.product.productCategory.toLowerCase().includes('earbud') ? (
                          <Headphones className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Smartphone className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-400">{favorite.product.productCategory}</span>
                      </div>
                      <span className="text-lg font-bold text-blue-400">₹{favorite.product.productPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-6 line-clamp-2">{favorite.product.productDescription}</p>
                    <div className="flex items-center mb-6 bg-gray-700/30 rounded-full px-3 py-1 w-fit">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                      <span className="text-sm font-semibold text-gray-300">
                        {productsRatings[favorite.product._id] ? productsRatings[favorite.product._id].toFixed(1) : 'N/A'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Link to={`/product/${favorite.product._id}`} className="w-full">
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300">
                          View Details
                        </button>
                      </Link>
                      <button
                        onClick={() => removeFromFavorites(favorite._id, favorite.product._id)}
                        className="w-full px-4 py-2 border border-red-500/50 bg-red-500/10 text-red-400 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-red-500/20 transition-all duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;