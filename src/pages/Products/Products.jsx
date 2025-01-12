import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { addToCartApi, addFavouriteApi } from '../../apis/Api';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';

const Products = ({ productInformation, color }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Retrieve the initial favorite status from local storage
  const initialFavoriteStatus = JSON.parse(localStorage.getItem(`favorite_${productInformation._id}`)) || false;
  const [isFavorite, setIsFavorite] = useState(initialFavoriteStatus);

  useEffect(() => {
    // Save the favorite status to local storage whenever it changes
    localStorage.setItem(`favorite_${productInformation._id}`, JSON.stringify(isFavorite));
  }, [isFavorite, productInformation._id]);

  if (!productInformation) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
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
        // Extract the message from the backend error
        const errorMessage = err.response.data.message;
        toast.error(errorMessage);
      } else {
        
        console.log(err);
        toast.error('An unexpected error occurred');
      }
    }
  };
  

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl" data-aos="fade-up">
      <div className="relative">
        <img
          src={`http://localhost:5000/products/${productInformation.productImage}`}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          alt={productInformation.productName}
        />
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start">
          <span className="px-2 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: color, color: 'white' }}>
            {productInformation.productCategory}
          </span>
        </div>
        <button
          onClick={() => toggleFavorite(productInformation._id)}
          className={`absolute top-4 right-4 ${isFavorite ? 'text-red-500' : 'text-gray-600'} hover:text-red-500 transition-colors duration-200`}
        >
          <Heart className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-6">
        <h5 className="text-xl font-bold mb-2 text-gray-900">{productInformation.productName}</h5>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">{productInformation.productCategory}</span>
          <span className="text-lg font-bold text-red-600">${productInformation.productPrice}</span>
        </div>
        <p className="text-sm text-gray-600 mb-6 line-clamp-2">{productInformation.productDescription}</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-green-600 transition-colors duration-200"
            onClick={() => addToCart(productInformation._id)}
          >
            Buy Now
          </button>
          <Link to={`/product/${productInformation._id}`} className="w-full">
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-gray-300 transition-colors duration-200 w-full">
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
