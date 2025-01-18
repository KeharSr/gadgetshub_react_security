import React, { useState, useEffect } from "react";
import { getCartApi, deleteCartItemApi, updateCartItemApi } from "../../apis/Api";
import Navbar from "../../components/navbar/Navbar";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus, ArrowRight, Trash2, Package } from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [quantityChanged, setQuantityChanged] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [quantityChanged]);

  const fetchCart = async () => {
    try {
      const res = await getCartApi();
      if (res.status === 200 && res.data && res.data.products) {
        const cartItems = res.data.products
          .filter(
            (item) =>
              item &&
              item.productId &&
              item.productId.productName &&
              item.productId.productPrice &&
              item.productId.productQuantity
          )
          .map((item) => ({
            ...item,
            quantity: item.quantity || 1,
          }));
        setCart(cartItems);
        calculateSubtotal(cartItems);
      } else {
        setCart([]);
        setSubtotal(0);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]);
      setSubtotal(0);
    }
  };

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => {
      if (!item?.productId?.productPrice || !item?.quantity) {
        return acc;
      }
      return acc + item.productId.productPrice * item.quantity; // Use price * quantity
    }, 0);
    setSubtotal(total);
  };

  const handleQuantityChange = async (index, change) => {
    try {
      const item = cart[index];
      if (!item || !item.productId) return;

      const newQuantity = item.quantity + change;
      if (newQuantity < 1) {
        toast.error("Quantity cannot be less than 1");
        return;
      }
      if (newQuantity > item.productId.productQuantity) {
        toast.error("Out of Stock");
        return;
      }

      const data = {
        productId: item.productId._id,
        quantity: newQuantity,
        size: item.size || null,
        color: item.color || null,
      };

      const res = await updateCartItemApi(data);
      if (res.status === 200) {
        setQuantityChanged(!quantityChanged);
        toast.success("Cart updated successfully");
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error("Failed to update cart");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await deleteCartItemApi(id);
      if (res.status === 200) {
        toast.success(res.data.message);
        setQuantityChanged(!quantityChanged);
      }
    } catch (err) {
      console.error("Error deleting item from cart:", err);
      toast.error("Failed to remove item from cart");
    }
  };

  const validCart = cart.filter(
    (item) =>
      item &&
      item.productId &&
      item.productId.productName &&
      item.productId.productPrice
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="container mx-auto p-5 pt-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-white mb-8"
        >
          Your Tech Cart
        </motion.h1>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-300 text-xl mb-4">Your cart is empty</p>
            <Link
              to="/homepage"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              <ShoppingCart className="mr-2" />
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-lg bg-gray-800/50 rounded-2xl p-6 shadow-2xl border border-gray-700"
          >
            {cart.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col md:flex-row justify-between items-center py-6 border-b border-gray-700 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-4 md:mb-0">
                  <div className="relative group">
                    <img
                      src={`https://localhost:5000/products/${item.productId.productImage}`}
                      alt={item.productId.productName}
                      className="w-40 h-40 object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 md:mt-0 text-center md:text-left">
                    <h5 className="text-xl font-bold text-white mb-2">
                      {item.productId.productName}
                    </h5>
                    <p className="text-gray-400 mb-2">Rs. {item.productId.productPrice}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-3 bg-gray-700/50 rounded-full p-1">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className="p-2 rounded-full bg-gray-600 text-gray-200 hover:bg-gray-500 transition-colors duration-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-semibold text-white w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className="p-2 rounded-full bg-gray-600 text-gray-200 hover:bg-gray-500 transition-colors duration-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-lg font-bold text-white">
                    Rs. {item.productId.productPrice * item.quantity}
                  </span>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 space-y-6"
            >
              <div className="flex justify-between items-center p-6 bg-gray-700/30 rounded-xl backdrop-blur-sm">
                <span className="text-xl font-bold text-white">Subtotal</span>
                <span className="text-2xl font-bold text-white">Rs. {subtotal}</span>
              </div>

              <Link to={`/placeorder/${JSON.stringify(cart)}`} className="block">
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={20} />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
