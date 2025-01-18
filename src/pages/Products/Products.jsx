import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Star } from 'lucide-react';
import { addToCartApi, addFavouriteApi, getAverageRatingApi } from '../../apis/Api';
import toast from 'react-hot-toast';

const Products = ({ productInformation }) => {
  const initialFavoriteStatus = JSON.parse(localStorage.getItem(`favorite_${productInformation._id}`)) || false;
  const [isFavorite, setIsFavorite] = useState(initialFavoriteStatus);
  const [productRating, setProductRating] = useState(null);
  const [isLoadingRating, setIsLoadingRating] = useState(true);

  useEffect(() => {
    localStorage.setItem(`favorite_${productInformation._id}`, JSON.stringify(isFavorite));
  }, [isFavorite, productInformation._id]);

  // Fetch rating for this specific product
  useEffect(() => {
    const fetchProductRating = async () => {
      try {
        const res = await getAverageRatingApi(productInformation._id);
        if (res.status === 200) {
          setProductRating(res.data.averageRating);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadingRating(false);
      }
    };

    fetchProductRating();
  }, [productInformation._id]);

  if (!productInformation) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-900/80 rounded-3xl">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-purple-300/20"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  const addToCart = async (productId) => {
    addToCartApi({ productId })
      .then((res) => {
        if (res.status === 201) {
          toast.success('Product added to cart');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to add to cart');
      });
  };

  const toggleFavorite = async (productId) => {
    try {
      const res = await addFavouriteApi({ productId });
      if (res.status === 200) {
        setIsFavorite(true);
        toast.success('Product added to favorites');
      } else {
        const errorMessage = res.data.message;
        toast.error(errorMessage);
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        toast.error(errorMessage);
      } else {
        console.log(err);
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="relative bg-[#1C2027] rounded-3xl overflow-hidden group">
      {/* Top Section */}
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          {/* Category */}
          <div className="px-4 py-1.5 rounded-full bg-[#282D39] text-gray-300 text-sm">
            {productInformation.productCategory}
          </div>
          
          {/* Rating and Favorite */}
          <div className="flex items-center gap-3">
            {/* Rating Display */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#282D39]">
              <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
              <span className="text-sm font-medium text-gray-300">
                {isLoadingRating ? (
                  <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  productRating ? productRating.toFixed(1) : 'N/A'
                )}
              </span>
            </div>
            
            <button
              onClick={() => toggleFavorite(productInformation._id)}
              className="p-1.5 rounded-full bg-[#282D39] text-gray-300 hover:text-white transition-colors"
            >
              <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative aspect-square rounded-2xl bg-[#282D39] p-4 flex items-center justify-center">
          <img
            src={`https://localhost:5000/products/${productInformation.productImage}`}
            className="w-4/5 h-4/5 object-contain transition-transform duration-300 group-hover:scale-110"
            alt={productInformation.productName}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        {/* Title and Price */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-medium text-white">
            {productInformation.productName}
          </h3>
          <span className="text-xl font-bold text-white">
            Rs {productInformation.productPrice}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2">
          {productInformation.productDescription}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => addToCart(productInformation._id)}
            className="flex-1 py-3 bg-[#282D39] text-white rounded-xl hover:bg-[#323845] transition-colors"
          >
            Add to Cart
          </button>
          
          <Link 
            to={`/product/${productInformation._id}`}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;