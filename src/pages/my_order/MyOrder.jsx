import React, { useState, useEffect } from "react";
import { Package, ChevronDown, ChevronUp, Truck, Clock, Check, MapPin, Headphones, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { getOrdersByUserApi } from "../../apis/Api";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const res = await getOrdersByUserApi();
        if (res.data.success && res.data.orders) {
          setOrders(res.data.orders);
        } else {
          toast.error("Error Fetching Orders");
        }
      } catch (error) {
        console.error("Error Fetching Orders:", error);
        setError("Error fetching orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleTrackOrder = async (orderId) => {
    try {
      const response = await getOrdersByUserApi();
      if (response.data.success) {
        const updatedOrder = response.data.orders.find(
          (order) => order._id === orderId
        );
        if (updatedOrder) {
          setOrders(
            orders.map((order) =>
              order._id === orderId ? updatedOrder : order
            )
          );
          toast.success("Order status updated successfully!");
        }
      }
    } catch (error) {
      console.error("Error tracking order:", error);
      toast.error("Failed to track order. Please try again later.");
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-400" />;
      case 'delivered':
        return <Check className="w-5 h-5 text-green-400" />;
      default:
        return <Package className="w-5 h-5 text-purple-400" />;
    }
  };

  const getProductIcon = (productName) => {
    if (productName.toLowerCase().includes('earbud')) {
      return <Headphones className="w-4 h-4 text-blue-400" />;
    }
    return <Smartphone className="w-4 h-4 text-purple-400" />;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <motion.div
          className="text-2xl font-bold text-blue-400 flex items-center space-x-3"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Package className="w-8 h-8" />
          <span>Loading your tech orders...</span>
        </motion.div>
      </div>
    );

    if (!orders || orders.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="p-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
            <p className="text-sm mb-4">
              You haven't placed any orders yet. Start exploring our amazing products and add something to your cart!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/products"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300"
              >
                Browse Products
              </a>
              <a
                href="/cart"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition duration-300"
              >
                View Cart
              </a>
            </div>
          </div>
        </div>
      );
    }
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-white text-center"
        >
          Your Tech Orders
        </motion.h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-xl bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-700/30 transition-colors duration-300"
                onClick={() => toggleOrderExpansion(order._id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-700/50 rounded-xl">
                      <Package className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <span className="text-xl font-semibold text-white">
                        Order #{order._id.slice(-6)}
                      </span>
                      <p className="text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-700/30 rounded-full">
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium text-gray-300">
                        {order.status}
                      </span>
                    </div>
                    {expandedOrder === order._id ? (
                      <ChevronUp className="text-gray-400" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedOrder === order._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="space-y-4 mb-6">
                      {order.carts.map((product) => (
                        <div
                          key={product.productId._id}
                          className="flex items-center p-4 bg-gray-700/30 rounded-xl backdrop-blur-sm"
                        >
                          <div className="relative group">
                            <img
                              src={`https://localhost:5000/products/${product.productId.productImage}`}
                              alt={product.productId.productName}
                              className="w-24 h-24 object-cover rounded-lg border border-gray-600 transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-2 left-2">
                              {getProductIcon(product.productId.productName)}
                            </div>
                          </div>
                          <div className="ml-6 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-lg font-semibold text-white">
                                  {product.productId.productName}
                                </div>
                                <div className="text-sm text-gray-400 mt-1">
                                  Quantity: {product.quantity}
                                </div>
                              </div>
                              <div className="text-lg font-medium text-blue-400">
                                Rs {(product.productId.productPrice * product.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                      <span className="text-xl font-bold text-white">
                        Total: ₹
                        {order.carts
                          .reduce(
                            (total, product) =>
                              total +
                              product.productId.productPrice *
                                product.quantity,
                            0
                          )
                          .toFixed(2)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrackOrder(order._id);
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        Track Order
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;