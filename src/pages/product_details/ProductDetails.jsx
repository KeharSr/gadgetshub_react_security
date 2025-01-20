import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleProductApi,
  addToCartApi,
  addReviewApi,
  getReviewsApi,
  getReviewsByProductAndUserApi,
  getAverageRatingApi,
  updateReviewApi,
} from "../../apis/Api";
import toast from "react-hot-toast";
import Navbar from "../../components/navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
  CreditCard,
  X,
  Edit,
  Plus,
  Minus,
  Battery,
  Wifi,
  Bluetooth,
  Volume2,
  Smartphone,
  Headphones
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");
    const [isOutStock, setIsOutStock] = useState(false);
  
    const [mainImage, setMainImage] = useState("");
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewChange, setReviewChange] = useState(false);
    const [ownReview, setOwnReview] = useState(null);
    const [productsRatings, setProductsRatings] = useState({});
  
    useEffect(() => {
      getSingleProductApi(id)
        .then((res) => {
          if (res.status === 200) {
            setProduct(res.data.product);
            setMainImage(res.data.product.productImage);
            updateStockStatus(res.data.product, quantity);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to load product details");
        });
    }, [id]);
  
    useEffect(() => {
      getReviewsApi(id)
        .then((res) => {
          if (res.status === 200) {
            setReviews(res.data.reviews);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id, reviewChange]);
  
    useEffect(() => {
      getReviewsByProductAndUserApi(id)
        .then((res) => {
          if (res.status === 200) {
            setOwnReview(res.data.review);
            if (res.data.review) {
              setRating(res.data.review.rating);
              setReview(res.data.review.review);
            }
          } else {
            setOwnReview(null);
            setRating(5);
            setReview("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id, reviewChange]);
  
    useEffect(() => {
      getAverageRatingApi(id)
        .then((res) => {
          if (res.status === 200) {
            const ratings = res.data.averageRating;
            const productId = res.data.productId;
  
            setProductsRatings((prev) => {
              return { ...prev, [productId]: ratings };
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id, reviewChange]);
  
    const updateStockStatus = (product, quantity) => {
      if (product.productQuantity < quantity) {
        setError("Out of Stock");
        setIsOutStock(true);
      } else {
        setError("");
        setIsOutStock(false);
      }
    };
  
    const handleQuantityChange = (newQuantity) => {
      newQuantity = parseInt(newQuantity, 10);
      if (newQuantity > quantity && isOutStock) {
        return;
      }
      setQuantity(newQuantity);
      if (product) {
        updateStockStatus(product, newQuantity);
      }
    };
  
    const addToCart = () => {
      if (!isOutStock && product && quantity > 0) {
        addToCartApi({ productId: product._id, quantity: quantity })
          .then((res) => {
            if (res.status === 201) {
              toast.success("Product added to cart");
            } else {
              toast.error(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to add to cart");
          });
      }
    };
  
    const buyNow = () => {
      addToCart();
    };
  
    const handleReviewSubmit = async (event) => {
      event.preventDefault();
  
      if (!rating || !review) {
        toast.error("Please ensure all fields are filled correctly.");
        return;
      }
  
      addReviewApi({ productId: product._id, rating, review })
        .then((response) => {
          if (response.status === 201) {
            toast.success(response.data.message);
            setShowReviewForm(false);
            setReviewChange(!reviewChange);
          } else {
            return Promise.reject(
              response.data.message || "Unexpected error occurred"
            );
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Error Occurred");
            }
          }
        });
    };
  
    const handleReviewUpdate = async (event) => {
      event.preventDefault();
  
      if (!rating || !review) {
        toast.error("Please ensure all fields are filled correctly.");
        return;
      }
  
      updateReviewApi(product._id, { rating, review })
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data.message);
            setShowReviewForm(false);
            setReviewChange(!reviewChange);
          } else {
            return Promise.reject(
              response.data.message || "Unexpected error occurred"
            );
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Error Occurred");
            }
          }
        });
    };

  const getProductIcon = () => {
    if (product?.productCategory.toLowerCase().includes('earbud')) {
      return <Headphones className="w-8 h-8 text-blue-400" />;
    }
    return <Smartphone className="w-8 h-8 text-purple-400" />;
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const TechSpec = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-3 bg-gray-800/50 rounded-xl p-3 backdrop-blur-sm">
      <Icon className="w-5 h-5 text-blue-400" />
      <div>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="text-white font-medium">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative pb-[100%] mb-6 rounded-xl overflow-hidden border border-gray-700 group"
              >
                <img
                  src={`https://localhost:5000/products/${mainImage}`}
                  alt={product.productName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 p-2 bg-gray-900/70 rounded-xl backdrop-blur-sm">
                  {getProductIcon()}
                </div>
              </motion.div>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={`https://localhost:5000/products/${product.productImage}`}
                  alt={product.productName}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer border border-gray-700 hover:border-blue-500 transition duration-300"
                  onClick={() => setMainImage(product.productImage)}
                />
                {product.additionalImages?.map((img, index) => (
                  <motion.img
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    src={`http://localhost:5000/products/${img}`}
                    alt={`Additional ${index}`}
                    className="w-24 h-24 object-cover rounded-lg cursor-pointer border border-gray-700 hover:border-blue-500 transition duration-300"
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-4 text-white"
              >
                {product.productName}
              </motion.h1>
              
              <div className="flex items-center mb-6 bg-gray-700/30 rounded-xl p-3 w-fit">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= productsRatings[product._id]
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-300 font-medium">
                  {productsRatings[product._id]?.toFixed(1) || "No ratings"}
                </span>
              </div>

              <div className="text-4xl font-bold text-blue-400 mb-6">
                Rs{product.productPrice}
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed">
                {product.productDescription}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <TechSpec 
                  icon={Battery} 
                  label="Battery Life" 
                  value={product.productCategory.toLowerCase().includes('earbud') ? "40 Hours" : "5000mAh"}
                />
                <TechSpec 
                  icon={Bluetooth} 
                  label="Connectivity" 
                  value="Bluetooth 5.2"
                />
                <TechSpec 
                  icon={Volume2} 
                  label="Audio" 
                  value={product.productCategory.toLowerCase().includes('earbud') ? "HD Audio" : "Stereo Speakers"}
                />
                <TechSpec 
                  icon={Wifi} 
                  label="Wireless" 
                  value={product.productCategory.toLowerCase().includes('earbud') ? "Low Latency" : "5G Ready"}
                />
              </div>

              {isOutStock && (
                <div className="text-red-400 text-xl mb-6 font-semibold bg-red-500/10 p-3 rounded-xl">
                  {error}
                </div>
              )}

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quantity
                </label>
                <div className="flex items-center bg-gray-700/30 rounded-xl p-2 w-fit">
                  <button
                    onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition duration-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min="1"
                    className="w-16 px-3 py-2 text-center bg-transparent text-white border-none focus:outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                  disabled={isOutStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={buyNow}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
                  disabled={isOutStock}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-8 text-white">Customer Reviews</h2>
          
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="mb-8 pb-8 border-b border-gray-700 last:border-b-0"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center bg-gray-700/30 rounded-full px-4 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-400">
                      {review.date}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{review.review}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 italic">
              No reviews yet. Be the first to review this product!
            </p>
          )}

          <button
            onClick={() => {
              setShowReviewForm(true);
              if (ownReview) {
                setRating(ownReview.rating);
                setReview(ownReview.review);
              }
            }}
            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
          >
            <Edit className="w-5 h-5 mr-2" />
            {ownReview ? "Update Review" : "Write a Review"}
          </button>

          <AnimatePresence>
            {showReviewForm && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={ownReview ? handleReviewUpdate : handleReviewSubmit}
                className="mt-8 bg-gray-700/30 p-8 rounded-xl backdrop-blur-sm border border-gray-600"
              >
                <h3 className="text-2xl font-semibold mb-6 text-white">
                  {ownReview ? "Update Your Review" : "Write Your Review"}
                </h3>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-1 bg-gray-800/50 p-3 rounded-xl w-fit">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                          star <= rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600 hover:text-yellow-300"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Review
                  </label>
                  <textarea
                    rows="4"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full px-4 py-3 text-gray-300 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    placeholder="Share your thoughts about this product..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Submit Review
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;