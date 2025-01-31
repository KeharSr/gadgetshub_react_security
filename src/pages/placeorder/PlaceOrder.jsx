import React, { useEffect, useState } from "react";
import {
  placeOrderApi,
  initializeKhaltiPaymentApi,
  updateStatusApi,
} from "../../apis/Api";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import DOMPurify from "dompurify";

// Keeping the original sanitizeInput utility function
const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true,
  });
  return sanitized
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]*>/g, "");
};

const PlaceOrder = () => {
  // Keeping all the original state and hooks
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    deliveryFee: 40.0,
  });

  // Keeping all the original useEffect and functions
  useEffect(() => {
    if (params.cart) {
      try {
        const carts = JSON.parse(params.cart);
        setCart(carts);
        calculateSubtotal(carts);
      } catch (error) {
        console.error("Invalid cart data:", error);
        toast.error("Invalid cart data.");
      }
    }
  }, [params]);

  const calculateSubtotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.productId.productPrice * item.quantity,
      0
    );
    setSubtotal(total);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const validateOrderData = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "street",
      "city",
      "state",
      "zipCode",
      "country",
      "phone",
    ];

    const emptyFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (emptyFields.length > 0) {
      toast.error(`Please fill in: ${emptyFields.join(", ")}`);
      return false;
    }

    if (
      !cart.length ||
      cart.some(
        (product) =>
          !product.productId || !product.productId._id || product.quantity <= 0
      )
    ) {
      toast.error("Invalid cart data or empty cart.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }

    return true;
  };

  const handlePayment = async (orderId, totalPrice) => {
    try {
      const paymentResponse = await initializeKhaltiPaymentApi({
        orderId: sanitizeInput(orderId),
        totalPrice: Number(totalPrice),
        website_url: window.location.origin,
      });

      if (paymentResponse.data.success) {
        const paymentUrl = paymentResponse.data.payment.payment_url;
        window.location.href = paymentUrl;

        const verifyResponse = await updateStatusApi({ orderId });
        if (verifyResponse.data.success) {
          toast.success("Payment completed and order updated successfully.");
          navigate("/payment-success");
        } else {
          toast.error("Failed to update order status.");
        }
      } else {
        toast.error("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(
        "Payment processing error: " +
          (error.response?.data?.message || error.message || "Unknown error")
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateOrderData()) return;

    const total = subtotal + formData.deliveryFee;

    const orderData = {
      carts: cart,
      totalPrice: total,
      name: `${sanitizeInput(formData.firstName)} ${sanitizeInput(
        formData.lastName
      )}`,
      email: sanitizeInput(formData.email),
      street: sanitizeInput(formData.street),
      city: sanitizeInput(formData.city),
      state: sanitizeInput(formData.state),
      zipCode: sanitizeInput(formData.zipCode),
      country: sanitizeInput(formData.country),
      phone: sanitizeInput(formData.phone),
      payment: false,
    };

    try {
      const response = await placeOrderApi(orderData);
      if (response.data.success) {
        toast.success(response.data.message);
        const orderId = response.data.order_id;
        if (orderId) {
          await handlePayment(orderId, total);
        } else {
          toast.error("Order ID not found in response.");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        "Order placement error: " +
          (error.response?.data?.message || error.message || "Unknown error")
      );
    }
  };

  // New modernized UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8  pt-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
                  1
                </span>
                Order Summary
              </h2>
              <div className="space-y-4">
                {cart.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-50 rounded-xl transition-all hover:shadow-md"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        src={`https://localhost:5000/products/${product.productId.productImage}`}
                        alt={sanitizeInput(product.productId.productName)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium text-gray-800">
                        {sanitizeInput(product.productId.productName)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        Rs {product.productId.productPrice * product.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      Rs {formData.deliveryFee}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>Rs {subtotal + formData.deliveryFee}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Delivery Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
                2
              </span>
              Delivery Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all transform hover:scale-[0.99] flex items-center justify-center space-x-2"
              >
                <span>Place Order and Pay</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
